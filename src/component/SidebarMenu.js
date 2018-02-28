import React, { Component } from 'react'
import { Menu } from 'antd';

export default class SidebarMenu extends Component {
   
    render() {
        const {handleMenuClick, types} = this.props

        return(
            <Menu
            style={{width: '200', height: '100%'}}
            mode='inline'
            onClick={handleMenuClick}>
                <Menu.SubMenu title='Devices'>
                    {types.map((item) => {
                        return <Menu.Item key={item}>{item}</Menu.Item>
                    })}
                </Menu.SubMenu>
                <Menu.SubMenu title='Manage'>
                <Menu.Item key='devices'>Devices</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        )
    }
}
