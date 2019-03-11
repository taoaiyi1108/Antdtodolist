import React/* , { Component } */ from "react";
import { Input, Button, List } from 'antd';

/* 无状态组件 */
const TodoListUI = (props) => {
    return (
        <div style={{ margin: '10px' }}>
            <Input
                value={props.inputValue}
                placeholder="todo info"
                style={{ width: '300px', marginRight: '10px' }}
                onChange={props.handleInputChange}
            />
            <Button type="primary" onClick={props.handleBtnClick}>提交</Button>
            <List
                style={{ marginTop: '10px', width: '300px' }}
                bordered
                dataSource={props.list}
                renderItem={(item, index) => (<List.Item onClick={() => { props.handleDeleteItemClick(index) }}>{item}</List.Item>)}
            />
        </div>
    )
}

/* class TodoListUI extends Component {
    render() {
        return (
            <div style={{ margin: '10px' }}>
                <Input
                    value={this.props.inputValue}
                    placeholder="todo info"
                    style={{ width: '300px', marginRight: '10px' }}
                    onChange={this.props.handleInputChange}
                />
                <Button type="primary" onClick={this.props.handleBtnClick}>提交</Button>
                <List
                    style={{ marginTop: '10px', width: '300px' }}
                    bordered
                    dataSource={this.props.list}
                    renderItem={(item, index) => (<List.Item onClick={(index) => { this.props.handleDeleteItemClick(index) }}>{item}</List.Item>)}
                />
            </div>
        )
    }
} */

export default TodoListUI;