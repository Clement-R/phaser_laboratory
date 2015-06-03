from bottle import route, run, template, view
import dataset


run(reloader=True)
db = dataset.connect('sqlite:///mydatabase.db')

@route('/')
@view('index')
def hello(name='World'):
    table = db['user']
    return dict(name=name)

@route('/users/register', method = 'GET')
def register():
    pass

@route('/users/register', method = 'POST')
def register():
    pass

@route('/users/login', method = 'GET')
def login():
    pass

@route('/users/login', method = 'POST')
def login():
    pass

@route('/users/logout')
def logout():
    pass

@route('/users/<id>')
def view_profil(id = 0):
    if id == 0:
        # List all users
        pass
    else:
        # Display one user profil
        pass

run(host='localhost', port=8090, debug=True)
