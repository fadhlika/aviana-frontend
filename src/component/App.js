import React, { Component } from 'react';
import Sockette from 'sockette';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';
import PropTypes from 'prop-types';
import DataTable from './DataTable';
import DeviceGrid from './DeviceGrid';
import ChartGrid from './ChartGrid';

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
        viewData: false,
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

  handleViewData = (e) => {
    const id = e.currentTarget.getAttribute('device-id');

    this.setState({viewData: true}, this.getData(id));
  }

  handleBack = (e) => {
    this.setState({viewData: false});
  }

  getData = (name) => {
    fetch('https://api.aviana.fadhlika.com/data/' + name + '/100')
    .then(response => {
      //console.log(response);
      return response.json()
    })
    .then(responsejson => {
       if(responsejson == null) {
        this.setState({data: [], keys: []})
         return;
       }
       let keys = Object.keys(responsejson[0])
       let fields = ["_id", "device_id", "device_name", "type", "date"]
        for(var field in fields){
            let index = keys.indexOf(fields[field])
            keys.splice(index, 1)
        }
        keys.unshift("date");
        for(var r in responsejson) {
          delete responsejson[r]._id;
          delete responsejson[r].device_id;
          delete responsejson[r].device_name;
          delete responsejson[r].type;
        }
        this.setState({data: responsejson, keys: keys});
    });
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
    this.ws = new Sockette('wss://api.aviana.fadhlika.com/websocket', {
      timeout: 5e3,
      maxAttempts: 10,
      onopen: e => { console.log('websocket open' + e) },
      onclose: e => { console.log('websocket close' + e) },
      onmessage: e => { 
      let newdata = [JSON.parse(e.data)];
      if(newdata[0]["type"] === this.state.activeItem)
        newdata[0]["key"] = this.state.data.length;
        this.setState({ data: this.state.data.concat(newdata) })
      },
      onerror: e => { console.log('websocket error ' + e)}
    })
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  render() {
    const {classes} = this.props;
    const {
      keys, data,
      devices, viewData
    } = this.state;
    return (
    <div className={classes.root}>
      <AppBar className={classes.AppBar}>
        <Toolbar>
          {
            viewData?  
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
              onClick={this.handleBack}>
              <ArrowBack />
            </IconButton>
            : null
          }
          <Typography variant="title" color="inherit">
            Aviana
          </Typography>
        </Toolbar>
      </AppBar>
      {viewData ? 
        <main className={classes.content}>
          <ChartGrid keys={keys} data={data} />
        </main>
        :
        <main className={classes.content}>
          <DeviceGrid tes devices={devices} handleViewData={this.handleViewData}/>
        </main>
        }
    </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

