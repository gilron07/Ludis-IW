import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  modalPaper: {
    position: 'absolute',
    width: "80vw",
    maxWidth: 530,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll"
  },
 
}));

const columns = [
  { field: 'athlete_name', headerName: 'Athlete', width: 175 },
  { field: 'duration', headerName: 'Duration', width: 110 },
  { field: 'effort', headerName: 'Effort', width: 100 },
  { field: 'satisfaction', headerName: 'Satisfaction', width: 135 }
];

export default function AllReportsModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.modalPaper}>
      <h2>All Athlete Responses</h2>
      <div style={{ minHeight: 200, height: "60vh", width: '100%' }}>
        <DataGrid rows={props.reports} columns={columns} />
      </div>
    </div>
  );

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        size="small"
        style={{
          marginTop: 30
        }}
      >
        View All Reports
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
}