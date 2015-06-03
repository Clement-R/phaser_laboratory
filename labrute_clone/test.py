from character import Character
from character import Weapon
from character import HeadArmor

if __name__ == '__main__':
    hands = Weapon('hands')
    iron_helmet = HeadArmor('iron helmet', 2)

    character_1 = Character('character_1', hands)
    character_2 = Character('character_2', hands)
    print(iron_helmet.labite)
