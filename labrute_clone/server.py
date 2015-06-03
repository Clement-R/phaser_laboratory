from flask import Flask
import sqlite3
app = Flask(__name__)


"""
modules :
    users :
        login, logout, register, update profil, view profil

        Model :
        name, xp, password, 

    users_characters
    
    characters :
        view character, delete character, create character
"""

def connect_db():
    return sqlite3.connect(app.config['DATABASE'])

def init_db():
    with closing(connect_db()) as db:
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/fight')
def fight():
    return "Fight !"

if __name__ == '__main__':
    app.run()
