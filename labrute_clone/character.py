class Character:
    def __init__(self, name, weapon):
        self.name = name
        self.weapon = weapon
        self.head_armor_slot = None

    def hit(self):
        pass

    def equipWeapon(self):
        pass


class Weapon:
    def __init__(self, name, damage = 1):
        self.name = name
        self.damage = damage

class Armor:
    def __init__(self, name, armor = 1):
        self.name = name
        self.armor = armor

class HeadArmor(Armor):
    def __init__(self, name, armor = 1):
        super().__init__(name, armor)

class TorsoArmor(Armor):
    def __init__(self, name, armor = 1):
        super().__init__(name, armor)