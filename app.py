from flask import Flask, request, Response, render_template
from flask import redirect, url_for
from flask import make_response
import requests
import itertools
from flask_wtf.csrf import CSRFProtect
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import Regexp
import re
import json

class WordForm(FlaskForm):
    avail_letters = StringField("Letters", validators= [
        Regexp(r'(^[a-z]+$)|^$', message="must contain letters only")
    ])
    submit = SubmitField("Go")


csrf = CSRFProtect()
app = Flask(__name__)
app.config["SECRET_KEY"] = "row the boat"
csrf.init_app(app)
dictKey = "2e9aa897-6153-4c7b-8405-459143beb67e"

@app.route('/apicall', methods=['GET', 'POST'])
def apiCall(word):

    response = requests.get("https://www.dictionaryapi.com/api/v3/references/collegiate/json/"+word+"?key="+dictKey)
    item = response.json()
    #print(item)
    if(len(item)>0):
        text = json.dumps(item[0], sort_keys=True, indent=4)
        data = json.loads(str(text))
        definition = data['def'][0]['sseq'][0][0][1]['dt'][0][1]
        definition = definition[4:]
        return definition
    else:
        return "Word not found"

@app.route('/')
def index():
    form = WordForm()
    return render_template("index.html", form=form)


@app.route('/words', methods=['POST','GET'])
def letters_2_words():
    length = int(request.form.get('wordLen'))
    pattern = str(request.form.get('pattern'))
    #pattern = "..g"
    #print(pattern)



    print(length)
    form = WordForm()
    if form.validate_on_submit():
        letters = form.avail_letters.data
    else:
        return render_template("index.html", form=form)

    with open('sowpods.txt') as f:
        good_words = set(x.strip().lower() for x in f.readlines())


    word_set = set()
    if(len(pattern)==0 and len(letters)==0):
        word_set.add("ERROR: Input either a pattern or length.")
        return render_template('wordlist.html',
            wordlist=sorted(sorted(word_set), key=len),
            dictKey = dictKey,
            name="alphalen")

    print("String length:")
    print(len(letters))
    if(len(letters)==0):
        if (length != 0):
            for w in good_words:
                if(len(w) == length):
                    if(len(pattern)>0):
                        regW = re.findall(pattern,w)
                        if(len(regW)!=0):
                            word_set.add(w)
                    else:
                        word_set.add(w)
        else:
            for w in good_words:
                if(len(pattern)>0):
                    regW = re.findall(pattern,w)
                    if(len(regW)!=0):
                        word_set.add(w)
                else:
                    word_set.add(w)


    else:
        if (length != 0):
            for l in range(3,len(letters)+1):
                for word in itertools.permutations(letters,l):
                    w = "".join(word)
                    if w in good_words and len(w) == length:
                        if(len(pattern)>0):
                            regW = re.findall(pattern,w)
                            if(len(regW)!=0):
                                word_set.add(w)
                        else:
                            word_set.add(w)
        else:
            for l in range(3,len(letters)+1):
                for word in itertools.permutations(letters,l):
                    w = "".join(word)
                    if w in good_words:
                        if(len(pattern)>0):
                            regW = re.findall(pattern,w)
                            if(len(regW)!=0):
                                word_set.add(w)
                        else:
                            word_set.add(w)

    return render_template('wordlist.html',
        wordlist=sorted(sorted(word_set), key=len),
        dictKey = dictKey,
        name="alphalen")




@app.route('/proxy')
def proxy():
    result = requests.get(request.args['url'])
    resp = Response(result.text)
    resp.headers['Content-Type'] = 'application/json'
    return resp
