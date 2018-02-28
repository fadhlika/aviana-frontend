import React, { Component } from 'react';
import DataTable from './DataTable';
import SidebarMenu from './SidebarMenu';
import { Layout, Button, Form } from 'antd';
import NewDevice from './NewDevice';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
        keys: [],
        devices: [],
        data: [],
        types: [],
        newdevice: {},
        open : false,
        activeItem: 'weather-station'
    }
  }

  handleMenuClick = ({item})  => {
    const {children} = item.props;
    const {devices} = this.state;
    console.log(children);
    if(children === 'Devices') {
      if(devices.length < 1) {
        this.setState({data: [], keys: []})
      } else {
        let keys = Object.keys(devices[0]);
        let columns = [];
        for(let i in keys) {
          columns.push({title: keys[i], dataIndex: keys[i], key: i})
        }
        for(let i in devices) {
          devices[i]["key"] = i;
        }
        this.setState({activeItem : children, keys: columns, data: devices})  
       }
    } else {
      this.setState({activeItem : children}, this.getData(children))
    }
  }

  handleModal = (e) => {
    this.setState({open: true})
  }

  handleClose = (e) => {
    this.setState({open: false, register: false})
  }

  handleRegister = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      fetch('http://aviana.fadhlika.com/device', {
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
        let columns = [];
        for(let i in keys) {
          columns.push({title: keys[i], dataIndex: keys[i], key: keys[i]})
        }

        for(let i in responsejson) {
          responsejson[i]["key"] = i;
        }

        this.setState({data: responsejson, keys: columns})
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
        for(let i=0; i < responsejson.length; i++) {
            var _type = responsejson[i]["type"];
            if(!(_type in lookup)){
                lookup[_type] = 1
                result.push(_type)
            }
        }
        for(let i in result) {
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
        newdata[0]["key"] = this.state.data.length;
        this.setState({ data: this.state.data.concat(newdata) })
    }
    this.ws.onerror = e => { console.log('websocket error ' + e)}
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  render() {
    const {
      keys, data, 
      open, types, 
      activeItem
    } = this.state;

    const NewDeviceForm = Form.create()(NewDevice);
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Sider>
          <div style={{height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}} />
          <SidebarMenu types={types} handleMenuClick={this.handleMenuClick}/>
        </Layout.Sider>
        <Layout>
          <Layout.Header style={{ background: '#fff', padding: 0 }} />
          <Layout.Content style={{ background: '#fff', padding: 24, margin: 0 }}>
            {activeItem === 'Devices'? 
            <Button type='default' onClick={this.handleModal}>New Device</Button> : null}
            <NewDeviceForm 
              ref={this.saveFormRef} 
              visible={open} 
              onRegister={this.handleRegister} 
              onCancel={this.handleClose} 
              types={types}/>
            <DataTable keys={keys} data={data} title={activeItem}/>
          </Layout.Content>
          </Layout>
          
      </Layout>
    );
  }
}

export default App;
