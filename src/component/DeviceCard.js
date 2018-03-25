import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { Link } from "react-router-dom";

const styles = theme => ({
  card: {
    width: 250,
    margin: 10,
    display: 'inline-block',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});



class DeviceCard extends React.Component {

  download = (name) => {
    let download = require('downloadjs');
    fetch('https://api.aviana.fadhlika.com/download/data/' + this.props.device._id)
    .then((resp) => resp.blob())
    .then((blob) => download(blob, this.props.device._id));
  }

  render() {
    const { classes, device, NewDevice } = this.props;

    return (
      <Card className={classes.card}>
        {NewDevice?
        <CardContent>
          <Typography className={classes.title}>-</Typography>
          <Typography variant="headline" component="h2">
            New Device
          </Typography>
          <Typography className={classes.pos}>-</Typography>
        </CardContent>
        :
        <CardContent>
          <Typography className={classes.title}>{device.type}</Typography>
          <Typography variant="headline" component="h2">
            {device.name}
          </Typography>
          <Typography className={classes.pos}>{device._id}</Typography>
        </CardContent>
        }
        {NewDevice?
        <CardActions>
          <Button size="small">Add</Button>
        </CardActions>
        :
        <CardActions>
          <Button size="small"  component={Link} to={"/device/" + device._id}>View</Button>
          <Button size="small"  onClick={this.download}>Download</Button>
        </CardActions>
        }
      </Card>
    );
  }
}

DeviceCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceCard);
