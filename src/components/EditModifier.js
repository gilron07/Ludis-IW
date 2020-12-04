import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import ListItem from '@material-ui/core/ListItem';
 
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
        marginRight: "20px",
    },
}));

function toCapitalize(string) {
    if (string === "rest_between_reps") return "Reps rest";
    else if (string === "rest_between_sets") return "Sets rest";
    else return string.charAt(0).toUpperCase() + string.slice(1);
}

const units = {
    "weight": ["lb", "kg"],
    "time": ["hours", "minutes", "seconds"],
    "distance": ["miles", "kilometers", "meters", "laps"],
    "intensity": null,
    "reps": null,
    "sets": null,
    "rest_between_reps": ["minutes", "seconds"],
    "rest_between_sets": ["minutes", "seconds"]
}

function EditModifier(props) {
    const type = props.modifier["modifier"].toLowerCase();
    const classes = useStyles();

    const handleInputChange = (e) => {
        const modifierName = props.modifier["modifier"];
        const drillId = props.drillId;
        const sectionId = props.sectionId;
        const newQuantity = e.target.value;

        console.log(newQuantity);
        props.updateModifierQuantity(modifierName, drillId, sectionId, newQuantity);
    }

    const handleUnitChange = (e) => {
        const modifierName = props.modifier["modifier"];
        const drillId = props.drillId;
        const sectionId = props.sectionId;
        const newUnit= e.target.value;

        console.log(newUnit);
        props.updateModifierUnit(modifierName, drillId, sectionId, newUnit);
    }

    if ((type === "weight") || (type === "distance") || (type === "time") || (type === "rest_between_reps") || (type === "rest_between_sets")) {
        return (
            <ListItem>
                    <TextField
                        type="number"
                        label={toCapitalize(type)}
                        value = {props.modifier["quantity"]}
                        onChange = {handleInputChange}
                        className={classes.modifierInput}
                    />
                    <div className="modifier-input">
                        <InputLabel>Unit</InputLabel>
                        <NativeSelect
                            defaultValue = {props.modifier["unit".toLowerCase()]}
                            onChange = {handleUnitChange}
                        >
                            {console.log(type)}
                            {units[type].map((unit) => (
                                <option value={unit.toLowerCase()}>{unit}</option>
                            ))}
                        </NativeSelect>
                    </div>
            </ListItem>
        )
    }
    else {
        return (
            <ListItem>
                <TextField
                    type="number"
                    label={toCapitalize(type)}
                    value = {props.modifier["quantity"]}
                    onChange = {handleInputChange}
                    className={classes.modifierInput}
                />
                {type === "intensity" ? "%" : null}
            </ListItem>
        );
    }
}
 
export default EditModifier;