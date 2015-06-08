"""
https://github.com/justintv/Twitch-API
https://github.com/justintv/Twitch-API/blob/master/authentication.md#auth-code
"""

import requests

url_base = 'https://api.twitch.tv/kraken/'
url = '{}/streams'.format(url_base)
headers = {'user-agent': 'my-app/0.0.1'}
r = requests.get(url, headers=headers)

print(r.text)
