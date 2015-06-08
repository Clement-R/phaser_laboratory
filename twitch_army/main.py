"""
https://github.com/justintv/Twitch-API
https://github.com/justintv/Twitch-API/blob/master/authentication.md#auth-code
"""

import requests

url_base = 'https://api.twitch.tv/kraken/'
url = '{}/streams/imaqtpie'.format(url_base)
# headers = {'Authorization: OAuth {}'.format()}
headers = {}

r = requests.get(url, headers=headers)

print(r.text)
