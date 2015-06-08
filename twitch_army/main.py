"""
https://github.com/justintv/Twitch-API
https://github.com/justintv/Twitch-API/blob/master/authentication.md#auth-code
"""

import requests
import json


def get_viewers_number(user):
    url_user_stream = '{}/streams/{}'.format(url_base, user)
    r = requests.get(url_user_stream)
    infos = json.loads(r.text)
    return infos['stream']['viewers']

url_base = 'https://api.twitch.tv/kraken/'
print(get_viewers_number('imaqtpie'))
print(get_viewers_number('Voyboy'))
