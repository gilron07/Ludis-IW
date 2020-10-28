from enum import Enum, auto


class Modifier(Enum):
    Sets = 'Sets'
    Reps = 'Reps'
    Weight = 'Weight'
    Time = 'Time'
    Rest_Between_Sets = 'Rest_Between_Sets'
    Rest_Between_Reps = 'Rest_Between_Reps'
    Distance = 'Distance'
    Intensity = 'Intensity'

    @classmethod
    def choices(cls):
        return ((key.value, key.name) for key in cls)


class Role(Enum):
    COACH = 'Coach'
    ATHLETE = 'Athlete'

    @classmethod
    def choices(cls):
        return ((item.name, item.value) for item in cls)





