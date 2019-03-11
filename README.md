### 学习笔记

#### UI框架
- Ant Design `npm install antd --save`

#### Todolist
```javascript
import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';
import store from './store';
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './store/actionTypes'


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
        const action = {
            type: CHANGE_INPUT_VALUE,
            value: e.target.value
        }
        store.dispatch(action);
    }

    handleStoreChange() {
        this.setState(store.getState());
    }

    handleBtnClick() {
        const action = {
            type: ADD_TODO_ITEM
        }
        store.dispatch(action);
    }

    handleItemClick(index) {
        const action = {
            type: DELETE_TODO_ITEM,
            index
        }
        store.dispatch(action);
    }
}

export default Todolist;
```

#### 数据框架 Redux
- 使用前 `npm install redux --save`
- 设计和使用的原则
    - store是唯一的
    - 只有store能够改变自己的内容
    - Reducer必须是纯函数
        - 纯函数：给定固定的输入，就一定有固定的输出，而且不会有任何副作用
- 核心API
    - createStore
    - store.dispatch
    - store.getState
    - sotre.subscribe
- store
```javascript
    import { createStore } from 'redux';
    import reducer from './reducer';
    /*  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() Chrome浏览器redux调试插件 redux devtools */
    const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    export default store;
```
- reducer
```javascript
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './actionTypes'
const defaultState = {
    inputValue: '',
    list: []
};
/* reducer 可以接收state，但绝不能修改state */
export default (state = defaultState, action) => {
    if (action.type === CHANGE_INPUT_VALUE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }
    if (action.type === ADD_TODO_ITEM) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue);
        newState.inputValue = '';
        return newState;
    }
    if (action.type === DELETE_TODO_ITEM) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.index, 1);
        return newState;
    }
    return state;
}
```

#### 拆封actionTypes 
```javascript
/* 目的是为了在写错 action的type时准确定位报错 */
 export const CHANGE_INPUT_VALUE = "change_input_value";
 export const ADD_TODO_ITEM = "add_todo_item";
 export const DELETE_TODO_ITEM = "delete_todo_item";
```