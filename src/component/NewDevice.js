import React from 'react';
import { Form, Button, Input, Modal } from 'antd';

export default class NewDevice extends React.Component {
        
    render() {
        const { visible, onCancel, onRegister, form} = this.props;
        const { getFieldDecorator } = form;
        
        return (
            <Modal
            title="New Device"
            visible={visible}
            okText="Add"
            onCancel={onCancel}
            onOk={onRegister}
            >
            <Form onSubmit={this.handleSubmit} layout='vertical'>
                <Form.Item label='Name'>
                {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the device\'s name!' }],
                })(
                    <Input />
                )}
                </Form.Item>
                <Form.Item label='Type'>
                {getFieldDecorator('type', {
                rules: [{ required: true, message: 'Please input the device\'s type!' }],
                })(
                    <Input />
                )}
                </Form.Item>
              </Form>
            </Modal>
        );
    }
}