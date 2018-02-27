import React, { Component } from 'react';
import DataTable from './DataTable'
import Topbar from './Topbar'
import SidebarMenu from './SidebarMenu'
import { Modal, Container, Grid, Form, Dropdown, Button } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
        keys: [],
        devices: [],
        data: [],
        types: [],
        options: [],
        newdevicename: '',
        newdevicetype: '',
        newdevice: {},
        open : false,
        register: false,
        activeItem: 'weather-station'
    }
  }

  handleMenuClick = (e, {name})  => {
    if(name == 'Device List') {
      if(this.state.devices.length < 1) {
        this.setState({data: [], keys: []})
         return;
       }
      this.setState({activeItem : name, keys: Object.keys(this.state.devices[0]),data: this.state.devices})  
      return
    }
    this.setState({activeItem : name}, this.getData(name))
  }

  handleModal = (e) => {
    this.setState({open: true})
  }

  handleClose = (e) => {
    this.setState({open: false, register: false})
  }

  handleRegister = (e) => {
    const { newdevicename, newdevicetype } = this.state;
    fetch('http://aviana.fadhlika.com/device', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({name: newdevicename, type: newdevicetype})
    }).then(res => res.json())
    .then(response => {
      this.setState({register: true, newdevice: response}, this.getDevice())
    })    
  }

  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options],
    })
  }

  handleChange = (e, { value }) => {
    this.setState({ newdevicetype: value })
  }

  handleDeviceName = (e) => {
    this.setState({newdevicename: e.target.value})
  }

  getData = (name) => {
    fetch('http://aviana.fadhlika.com/data/' + name)
    .then(response => response.json())
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
        keys.unshift("date")
        this.setState({data: responsejson, keys: keys})
    });
  }

  getDevice = () => {
    fetch('http://aviana.fadhlika.com/device')
    .then(response => response.json())
    .then(responsejson => {
      if(responsejson == null) {
        this.setState({data: [], keys: []})
         return;
       }

        var lookup = {}
        var result = []
        var list = []
        for(var i=0; i < responsejson.length; i++) {
            var _type = responsejson[i]["type"]
            if(!(_type in lookup)){
                lookup[_type] = 1
                result.push(_type)
            }
        }
        for(var i in result) {
          list.push({key: result[i], text: result[i], value: result[i]})
        }
        this.setState({types: result, options: list, devices: responsejson})
    });
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    this.getDevice();
    this.getData('weather-station'); 
    this.ws = new WebSocket('ws://aviana.fadhlika.com/websocket')
    this.ws.onopen = e => { console.log('websocket open' + e) }
    this.ws.onclose = e => { console.log('websocket close' + e) }
    this.ws.onmessage = e => { 
      let newdata = [JSON.parse(e.data)];
      if(newdata[0]["type"] === this.state.activeItem)
        this.setState({ data: this.state.data.concat(newdata) })
    }
    this.ws.onerror = e => { console.log('websocket error ' + e)}
  }

  render() {
    const {
      activeItem, keys, data, open, 
      register, types, options, 
      currentValue, newdevicename, 
      newdevicetype, newdevice
    } = this.state;
    
    return (
      <div>
      <Grid>
        <Grid.Column width={3}>  
          <SidebarMenu 
            activeItem={activeItem} 
            handleMenuClick={this.handleMenuClick} 
            handleModal={this.handleModal}
            types={types}/>
        </Grid.Column>
        <Grid.Column>  
          <DataTable keys={keys} data={data}/>
        </Grid.Column>  
      </Grid>
      <Modal 
        style={{ margin: 'auto', marginTop: 'auto' }}
        size={'mini'} 
        open={open} 
        dimmer={false}
        onClose={this.handleClose}>
        <Modal.Header>New Device</Modal.Header>
        <Modal.Content>
          {register ? 
            'New device ' + newdevice["name"] +' successfully added, save this id to upload data from the device: ' 
            + newdevice["_id"]
           : 
          <Form>
            <Form.Field>
              <label>Name</label>
              <input placeholder='Device Name' onChange={this.handleDeviceName}/>
            </Form.Field>
            <Form.Field>
              <label>Type</label>
              <Dropdown
                options={options}
                placeholder='Choose Type'
                search
                selection
                fluid
                allowAdditions
                value={newdevicetype}
                onAddItem={this.handleAddition}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button onClick={this.handleRegister} >Submit</Button>
            <Button onClick={this.handleClose} >Cancel</Button>
          </Form>
        }
        </Modal.Content>
      </Modal>
      </div>
    );
  }
}

export default App;
