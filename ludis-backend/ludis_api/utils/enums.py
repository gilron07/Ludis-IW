from enum import Enum, auto


class Modifier(Enum):
    Sets = auto()
    Reps = auto()
    Weight = auto()
    Time = auto()
    Rest_Between_Sets = auto()
    Rest_Between_Reps = auto()
    Distance = auto()
    Intensity = auto()

    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]





