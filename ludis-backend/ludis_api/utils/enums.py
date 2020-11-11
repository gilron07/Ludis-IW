from enum import Enum, auto


class Modifier(Enum):
    sets = 'sets'
    reps = 'reps'
    weight = 'weight'
    time = 'time'
    rest_between_sets = 'rest_between_sets'
    rest_between_reps = 'rest_between_reps'
    distance = 'distance'
    intensity = 'intensity'

    @classmethod
    def choices(cls):
        return ((key.value, key.name) for key in cls)


class Role(Enum):
    COACH = 'Coach'
    ATHLETE = 'Athlete'

    @classmethod
    def choices(cls):
        return ((item.name, item.value) for item in cls)





