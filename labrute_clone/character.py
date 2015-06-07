import random


class Group:

    def __init__(self):
        self.characters = []

    def add(self, character):
        self.characters.append(character)

    def get_next_ready(self):
        # Reset characters if needed
        if len([c for c in self.characters if c.ready]) == 0:
            self.reset_characters()

        # Return first ready character
        for character in self.characters:
            if character.ready:
                character.ready = False
                return character

    def reset_characters(self):
        for character in self.characters:
            character.ready = True

    def alive(self):
        """
        Return True if at least one character is alive,
        else it returns False.
        """
        for character in self.characters:
            if character.health > 0:
                return True
        return False


class Character:

    def __init__(self, name, weapon):
        self.name = name
        self.weapon = weapon
        self.health = 10
        self.head_armor_slot = None
        self.ready = True
        self.dead = False

    def attack(self, group):
        """
        Attack logic
        Find opponent, choose best strategy, action !
        """
        ran = random.randint(0, len(group.characters) - 1)
        opponent = group.characters[ran]
        print("{} hit {} with {} for {} hit points".format(
              self.name, opponent.name, self.weapon.name, self.weapon.damage))
        self.hit(opponent)
        print('-' * 50)

    def hit(self, target):
        target.get_hit(self.weapon.damage)

    def equip_weapon(self, weapon):
        self.weapon = weapon

    def get_hit(self, amount):
        if self.health - amount <= 0:
            self.health = 0
            self.dead = True
        else:
            self.health -= amount


class Weapon:

    def __init__(self, name, damage=1):
        self.name = name
        self.damage = damage


class Armor:

    def __init__(self, name, armor=1):
        self.name = name
        self.armor = armor


class HeadArmor(Armor):

    def __init__(self, name, armor=1):
        super().__init__(name, armor)


class TorsoArmor(Armor):

    def __init__(self, name, armor=1):
        super().__init__(name, armor)
