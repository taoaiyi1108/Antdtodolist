import React, { Component } from "react";
import 'antd/dist/antd.css';
import store from './store';
import { getInputChangeAction, getAddItemAction, getDeleteItemAction, getInitList } from './store/actionsCreators';
// import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './store/actionTypes'
import TodoListUI from './TodoListUI';




class Todolist extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleDeleteItemClick = this.handleDeleteItemClick.bind(this);
        /* 只要store中的数据发生改变，subscribe函数就会被调用 */
        store.subscribe(this.handleStoreChange);
    }
    render() {
        return <TodoListUI
            inputValue={this.state.inputValue}
            list={this.state.list}
            handleInputChange={this.handleInputChange}
            handleBtnClick={this.handleBtnClick}
            handleDeleteItemClick={this.handleDeleteItemClick}
        />
    }

    componentDidMount() {
        const action = getInitList();
        store.dispatch(action);
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

    handleDeleteItemClick(index) {
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