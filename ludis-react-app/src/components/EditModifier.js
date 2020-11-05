import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

 
const useStyles = makeStyles((theme) => ({
    drillHeader: {
        fontSize: 10,
        boxShadow: "0 2px 4px #00000044",
        borderRadius: "20px",
        height: "30px"
    },
    modifierInput: {
        height: "100%",
        maxWidth: "100px",
        marginRight: "20px"
    }
}));

function toCapitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const units = {
    "weight": ["lb", "kg"],
    "time": ["hours", "minutes", "seconds"],
    "distance": ["miles", "kilometers", "meters", "laps"],
    "intensity": null
}

function EditModifier(props) {
    const type = props.type.toLowerCase();
    const classes = useStyles();

    if (type != "intensity") {
        return (
            <ListItem>
                    <TextField type="number" label={toCapitalize(type)} className={classes.modifierInput} />
                    <div className="modifier-input">
                    <InputLabel>Unit</InputLabel>
                    <NativeSelect>
                        {units[type].map((unit) => (
                            <option value={10}>{unit}</option>
                        ))}
                    </NativeSelect>
                    </div>
            </ListItem>
        )
    }

    else if (type == "intensity") {
        return (
            <ListItem>
                <TextField type="number" label={toCapitalize(type)} className={classes.modifierInput} />
                %
            </ListItem>
        );
    }

    else return null;
}
 
export default EditModifier;