from flask import Flask, request, Response, render_template
import requests
import itertools
from flask_wtf.csrf import CSRFProtect
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import Regexp
import re
import json

def apiCall(word):
    dictKey = "2e9aa897-6153-4c7b-8405-459143beb67e"
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
