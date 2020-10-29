import React from 'react';

// list imports
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import '../css/LeaderboardComponent.css';

class LeaderboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleClick() {
       this.setState({
           open: !this.state.open
        });
    }

    render() {
        return(
            <List >
                <div className="drill-header">
                <ListItem button onClick={() => this.handleClick()} >
                <ListItemText primary={this.props.title}/>
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                </div>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem>
                <ListItemText primary="Henry Herrington" />
                <ListItemText primary="9.99 seconds" />
                </ListItem>
                <ListItem>
                <ListItemText primary="Gilron Tsabkevich" />
                <ListItemText primary="10.00 seconds" />
                </ListItem>
            </List>
            </Collapse>
        </List>
        )
    }
}

export default LeaderboardComponent;