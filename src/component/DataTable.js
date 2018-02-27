import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

export default class DataTable extends Component {
        
    render() {
        const {keys, data} = this.props;
        return (    
            <div>
                {keys.length > 0 ? 
                <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        {keys.map(key => {
                            return <Table.HeaderCell key={key}>{key.replace(/(^|\s)\S/g, l => l.toUpperCase())}</Table.HeaderCell>
                        })}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data.map(item => {
                        return <Table.Row key={item["_id"]}>{ keys.map(key => {
                            return <Table.Cell key={key}>{item[key]}</Table.Cell>
                        }) }</Table.Row>
                    })}
                </Table.Body>
            </Table> : 'No data'}
            </div>
        );
    }
}