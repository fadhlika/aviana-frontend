import React, { Component } from 'react'
import { Table } from 'antd'

export default class DataTable extends Component {
        
    render() {
        const {keys, data, title} = this.props;
        return (    
            <Table bordered title={() => title} dataSource={data} columns={keys} />
        );
    }
}