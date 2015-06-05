from character import Character
from character import Weapon
from character import HeadArmor

if __name__ == '__main__':
    hands = Weapon('hands', 3)
    iron_helmet = HeadArmor('iron helmet', 2)

    character_1 = Character('character_1', hands)
    character_2 = Character('character_2', hands)

    """
    Make group fight, scalable for later ideas, even if each group is
    made of one character.
    """
 
    i = 1
    fight_ended = False
    while fight_ended is not True:
        if i == 1:
            character_1.hit(character_2)
            if character_2.health <= 0:
                print('Character 1 win')
                fight_ended = True
            i += 1
        else :
            character_2.hit(character_1)
            if character_1.health <= 0:
                print('Character 2 win')
                fight_ended = True
            i = 1
