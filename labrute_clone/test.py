from character import Character
from character import Group
from character import Weapon
from character import HeadArmor

if __name__ == '__main__':
    hands = Weapon('hands', 3)
    iron_helmet = HeadArmor('iron helmet', 2)

    character_1 = Character('character_1', hands)
    character_2 = Character('character_2', hands)
    # characters = [character_1, character_2]
    group_1 = Group()
    group_2 = Group()

    group_1.add(character_1)
    group_2.add(character_2)

    groups = [group_1, group_2]

    """
    Make group fight, scalable for later ideas, even if each group is
    made of one character.

    groups = [group_1, group_2]

    group_1 -> one attack
    group_2 -> one attack
    ...
    one group win !

    Need a boolean for each characters to know if they have already
    played or not.
    """

    turn = 1
    fight_ended = False
    while fight_ended is not True:
        atk = 1 if turn % 2 == 0 else 0
        dfn = 0 if turn % 2 == 0 else 1

        groups[atk].get_next_ready()

        # characters[atk].hit(characters[dfn])
        # print(characters[atk].name)
        # print(characters[atk].health)
        # print(characters[dfn].health)
        # if characters[dfn].health <= 0:
        #     print('Character {} win'.format(atk + 1))
        #     fight_ended = True

        # turn += 1
