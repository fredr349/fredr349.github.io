"""
from flask import Flask
from markupsafe import escape

app = Flask(__name__)

@app.route("/")
def hello_world():
    return f"<p>Hello world!</p>"
"""
