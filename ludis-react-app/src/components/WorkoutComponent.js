import React from 'react';
import '../css/CalendarWorkout.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// icons
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import FileCopyIcon from '@material-ui/icons/FileCopy';

class CalendarWorkout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="workout-item">
                <ListItem button>
                    <ListItemText primary={this.props.title} secondary={"Created by " + this.props.creator + " at " + this.props.created_at} />
                    <ListItem>
                        {
                            this.props.tags.map((tag) =>(
                                <Chip label= {tag.name}/>
                            ))
                        }
                    </ListItem>
                    {/* <FileCopyIcon></FileCopyIcon> */}
                    <div class="workout-delete"><DeleteIcon></DeleteIcon></div>
                    <div class="workout-chevron"><ChevronRightIcon></ChevronRightIcon></div>
                </ListItem>

            </div>
        )
    }
}

export default CalendarWorkout;