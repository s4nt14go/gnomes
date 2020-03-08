import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  image: {
    maxWidth: '-webkit-fill-available',
    margin: 'auto',
    minHeight: '50vh',
    display: 'flex'
  }
}));

const DialogTitle = props => {
  const classes = useStyles();
  const { onClose, children } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

export default function DialogImage( props ) {
  const { onClose, open, gnome } = props;
  const classes = useStyles();

  return (
    <div>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open} fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          {gnome.name}
        </DialogTitle>
        <MuiDialogContent dividers>
          <Typography gutterBottom>
            Friends: {gnome.friends && (gnome.friends.join(',') || 'Nobody')}
          </Typography>
            <img className={classes.image} alt={gnome.name} src={gnome.thumbnail} />
        </MuiDialogContent>
        <MuiDialogActions>
          <Button autoFocus onClick={onClose} color="primary">
            OK
          </Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
}

DialogImage.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  gnome: PropTypes.object.isRequired,
};