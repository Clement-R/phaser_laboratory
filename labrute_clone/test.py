from character import Character
from character import Group
from character import Weapon
from character import HeadArmor

if __name__ == '__main__':
    hands = Weapon('hands', 3)
    iron_helmet = HeadArmor('iron helmet', 2)

    character_1 = Character('character_1', hands)
    character_2 = Character('character_2', hands)
    character_3 = Character('character_3', hands)

    group_1 = Group()
    group_2 = Group()

    group_1.add(character_1)
    group_1.add(character_3)
    group_2.add(character_2)

    groups = [group_1, group_2]

    turn = 1
    fight_ended = False
    while not fight_ended:
        atk = 1 if turn % 2 == 0 else 0
        dfn = 0 if turn % 2 == 0 else 1

        attacker = groups[atk].get_next_ready()
        attacker.attack(groups[dfn])

        turn += 1
        if not groups[dfn].alive():
            fight_ended = True
            print("Win")
        elif not groups[atk].alive():
            fight_ended = True
            print("Win")
