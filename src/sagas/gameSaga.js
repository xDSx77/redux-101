import {call, cancel, fork, put, take} from "redux-saga/effects";
import spawnTargetsSaga from "./spawnTargetsSaga";

function* startGame() {
    yield put({ type: 'GAME_START' });
}

function* stopGame() {
    yield put({ type: 'CLEAN_TARGET' });
    yield put({ type: 'GAME_STOP' });
}

function* gameSaga() {
    while (true) {
        yield take('GAME_START_REQUESTED');
        yield call(startGame);
        const spawn = yield fork(spawnTargetsSaga);

        yield take('GAME_STOP_REQUESTED');
        yield cancel(spawn);
        yield call(stopGame);
    }
}

export default gameSaga;