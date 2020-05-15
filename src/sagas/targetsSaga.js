import {cancel, put, select, take, takeEvery} from "redux-saga/effects";

function* handleClick({id}) {
    yield put({ type: 'DELETE_TARGET', id: id});
    yield put({ type: 'SCORE_INCREMENT'});
}

function* targetsSaga() {
    while (true) {
        yield take('GAME_START');
        const targetClick = yield takeEvery('TARGET_CLICKED', handleClick)

        yield take('GAME_STOP_REQUESTED');
        yield cancel(targetClick);

    }
}

export default targetsSaga;