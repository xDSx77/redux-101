import {all, cancel, fork, put, select, take} from "redux-saga/effects";
import {delay} from "redux-saga";

let TIME_INTERVAL = 1000;

function* targetDecay() {
    while (true) {
        yield delay(TIME_INTERVAL);
        yield put({ type: 'UPDATE_TARGETS' });
        const targets = yield select((state) => state.targets);
        const targetsDead = targets.filter(target => target.value <= 0);
        const deleteTargetsTask = targetsDead.map(target => put({type: 'DELETE_TARGET', id: target.id}));
        yield all(deleteTargetsTask);
        const game = yield select((state) => state.game);
        if (game.lives > 0) {
            yield put({type: 'LOST_LIVES', value: targetsDead.length});
        }
        else
            yield put({type: 'GAME_STOP_REQUESTED'});
    }
}

function* targetSaga(id) {
    while (true) {
        yield take('GAME_START');

        const taskTarget = yield fork(targetDecay);
        yield take('GAME_STOP_REQUESTED');
        yield cancel(taskTarget);
    }
}

export default targetSaga;