from character import Character
from character import Weapon
from character import HeadArmor

if __name__ == '__main__':
    hands = Weapon('hands', 3)
    iron_helmet = HeadArmor('iron helmet', 2)

    character_1 = Character('character_1', hands)
    character_2 = Character('character_2', hands)
    characters = [character_1, character_2]

    """
    Make group fight, scalable for later ideas, even if each group is
    made of one character.

    groups = [group1, group2]

    group1 -> one attack
    group2 -> one attack
    ...
    one group win !
    """

    turn = 1
    fight_ended = False
    while fight_ended is not True:
        atk = 1 if turn % 2 == 0 else 0
        dfn = 0 if turn % 2 == 0 else 1

        characters[atk].hit(characters[dfn])
        print(characters[atk].name)
        print(characters[atk].health)
        print(characters[dfn].health)
        if characters[dfn].health <= 0:
            print('Character {} win'.format(atk + 1))
            fight_ended = True

        turn += 1
        # groups[atk].attack(groups[dfn])
