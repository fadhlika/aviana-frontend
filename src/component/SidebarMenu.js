import React, { Component } from 'react'
import { Menu, Icon, Button } from 'semantic-ui-react'

export default class SidebarMenu extends Component {
   
    render() {
        const {handleMenuClick, activeItem, types, handleModal} = this.props
        return(
            <Menu vertical fixed='left' inverted>
                <Menu.Item>
                    <Menu.Header>Aviana</Menu.Header>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Devices</Menu.Header>
                    <Menu.Menu>
                        {types.map(item => {
                            return <Menu.Item key={item} name={item} active={activeItem === item} onClick={handleMenuClick}/>
                        })}
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                        <Menu.Header>Manage</Menu.Header>
                        <Menu.Menu>
                            <Menu.Item name='Device List' onClick={handleMenuClick}/>
                            <Menu.Item name='Add Device' onClick={handleModal}/>
                        </Menu.Menu>
                    </Menu.Item>
            </Menu>
        )
    }
}
