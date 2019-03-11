import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';
import store from './store';
import { getInputChangeAction, getAddItemAction, getDeleteItemAction } from './store/actionsCreators';
// import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './store/actionTypes'


class Todolist extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        /* 只要store中的数据发生改变，subscribe函数就会被调用 */
        store.subscribe(this.handleStoreChange);
    }
    render() {
        return (
            <div style={{ margin: '10px' }}>
                <Input
                    value={this.state.inputValue}
                    placeholder="todo info"
                    style={{ width: '300px', marginRight: '10px' }}
                    onChange={this.handleInputChange}
                />
                <Button type="primary" onClick={this.handleBtnClick}>提交</Button>
                <List
                    style={{ marginTop: '10px', width: '300px' }}
                    bordered
                    dataSource={this.state.list}
                    renderItem={(item, index) => (<List.Item onClick={this.handleItemClick.bind(this, index)}>{item}</List.Item>)}
                />
            </div>
        )
    }

    handleInputChange(e) {
        /* const action = {
            type: CHANGE_INPUT_VALUE,
            value: e.target.value
        } */
        const action = getInputChangeAction(e.target.value);
        store.dispatch(action);
    }

    handleBtnClick() {
        /* const action = {
            type: ADD_TODO_ITEM
        } */
        const action = getAddItemAction();
        store.dispatch(action);
    }

    handleItemClick(index) {
        /* const action = {
            type: DELETE_TODO_ITEM,
            index
        } */
        const action = getDeleteItemAction(index);
        store.dispatch(action);
    }

    handleStoreChange() {
        this.setState(store.getState());
    }
}

export default Todolist;