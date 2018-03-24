import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import DeviceGrid from './DeviceGrid';
import ChartGrid from './ChartGrid';
import { Route } from "react-router-dom";

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

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
        keys: [],
        devices: [],
        data: [],
        newdevice: {},
    }
  }

  handleRegister = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      fetch('https://api.aviana.fadhlika.com/device', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({name: values["name"], type: values["type"]})
      }).then(res => res.json())
      .then(response => {
        this.setState({open: false}, this.getDevice())
      }) 
    })
  }

  getDevice = () => {
    fetch('https://api.aviana.fadhlika.com/device')
    .then(response => {
      return response.json();
    })
    .then(responsejson => {
      if(responsejson == null) {
        this.setState({data: [], keys: []})
         return;
       }
        this.setState({devices: responsejson})
    });
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    this.getDevice();
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  render() {
    const {classes} = this.props;
    const {devices} = this.state;
    return (
    <div className={classes.root}>
      <AppBar className={classes.AppBar}>
        <Toolbar>
          <Typography variant="title" color="inherit">
            Aviana
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Route exact path="/" render={()=><DeviceGrid tes devices={devices} handleViewData={this.handleViewData}/>} />
        <Route path="/device/:id" render={({match}) =><ChartGrid match={match} {...this.props} />} />
      </main>
    </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

