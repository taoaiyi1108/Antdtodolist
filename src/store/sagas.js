import { takeEvery, put } from "redux-saga/effects";
import { GET_INIT_LIST } from './actionTypes';
import axios from 'axios';
import { initListAction } from './actionsCreators';

function* getInitList() {
    try {
        const res = yield axios.get('/todolist.json');
        const action = initListAction(res.data);
        yield put(action);
    } catch (e) {
        console.log("网络请求失败");
    }

}

// generator 函数
function* mySaga() {
    yield takeEvery(GET_INIT_LIST, getInitList);
    /* takeEvery捕获到 GET_INIT_LIST这一个类型的action，就会执行 getInitList这个方法 */
}
export default mySaga;