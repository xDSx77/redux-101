import {put} from "redux-saga/effects";
import {delay} from "redux-saga";

let TIME_INTERVAL = 1000;

function* spawnTargetsSaga() {

    while(true) {
        yield delay(TIME_INTERVAL);
        yield put({type: 'ADD_TARGET'});
    }
}

export default spawnTargetsSaga;