import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
      flexGrow: 1,
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
    },
    appBar: {
      position: 'absolute',
    },
    content: {
      height: '100%',
      width: '100%',
      marginTop: 64,
      backgroundColor: theme.palette.background.default,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  });

class Topbar extends React.Component {

    render() {
        const {classes} = this.props;
        return(
            <AppBar className={classes.AppBar}>
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        Aviana
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

Topbar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Topbar);