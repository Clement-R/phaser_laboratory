from bottle import route, run, template, view


run(reloader=True)


@route('/')
@route('/hello')
@route('/hello/<name>')
@view('index')
def hello(name='World'):
    return dict(name=name)

run(host='localhost', port=8080, debug=True)


"""
to read : http://dataset.readthedocs.org/en/latest/
"""
