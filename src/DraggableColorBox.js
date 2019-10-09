import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/DraggableColorBoxStyles';


function DraggableColorBox(props) {
  const { classes, handleClick, name, color } = props;
  return (
    <div
      className={classes.root}
      style={{ backgroundColor: color }}>
      {name}
      <div className={classes.boxContent}>
        <span>{name}</span>
        <span>
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={handleClick}
          />
        </span>
      </div>
    </div>
  );
}

export default withStyles(styles)(DraggableColorBox);
