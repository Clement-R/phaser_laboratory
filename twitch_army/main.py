"""
https://github.com/justintv/Twitch-API
https://github.com/justintv/Twitch-API/blob/master/authentication.md#auth-code
"""

import requests
import json


"""
Need to add an IRC bot
"""


def get_viewers_number(user):
    url_user_stream = '{}/streams/{}'.format(url_base, user)
    r = requests.get(url_user_stream)
    infos = json.loads(r.text)
    if infos['stream']:
        return infos['stream']['viewers']
    else:
        return False

url_base = 'https://api.twitch.tv/kraken/'
viewers = get_viewers_number('imaqtpie')
if viewers:
    print(viewers)
else:
    print('Stream is offline')

viewers = get_viewers_number('lachhhandfriends')
if viewers:
    print(viewers)
else:
    print('Stream is offline')
