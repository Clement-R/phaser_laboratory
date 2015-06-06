class Group:
    def __init__(self):
        self.characters = []

    def add(self, character):
        self.characters.append(character)

    def get_next_ready(self):
        # Reset charachters if needed
        if len([c for c in self.characters if c.ready]) == 0:
            self.reset_characters()
        # Get all ready characters
        for character in self.characters:
            if character.ready:
                return character

    def reset_characters(self):
        pass


class Character:
    def __init__(self, name, weapon):
        self.name = name
        self.weapon = weapon
        self.health = 10
        self.head_armor_slot = None
        self.ready = True

    def attack(self):
        """
        Attack logic
        Find opponent, choose best strategy, action !
        """
        pass

    def hit(self, target):
        target.lose_health(self.weapon.damage)

    def equip_weapon(self, weapon):
        self.weapon = weapon

    def lose_health(self, amount):
        if self.health - amount <= 0:
            self.health = 0
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
