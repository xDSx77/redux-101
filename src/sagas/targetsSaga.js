import {take, select, put, call, takeEvery, fork, race} from "redux-saga/effects";
import {delay} from "redux-saga";

let TIME_INTERVAL = 1000;

function* handleClick(id) {
    yield put({ type: 'DELETE_TARGET', id: id});
    yield put({ type: 'SCORE_INCREMENT'});
    const game = yield select((state) => state.game);
    console.log("Score: " + game.score);
}

function* targetSaga(id) {
    let targets = yield select((state) => state.targets);
    //console.log(targets);
    while (true) {
        yield delay(TIME_INTERVAL);
        if (targets[id].value > 0)
            yield put({ type: 'UPDATE_TARGET', id: id});
        else if (targets[id].value <= 0) {
            yield put({ type: 'DELETE_TARGET', id: id});
            return;
        }
        targets = yield select((state) => state.targets);
    }
}

function* targetsSaga() {
    let game = yield select((state) => state.game);
    let targets = yield select((state) => state.targets);
    let id = 0;
    //console.log(game);
    //console.log(targets);

    yield take('GAME_START');

    while (true) {
        yield take('ADD_TARGET');

        const { timeout, click } = yield race({
            targetDead: call(targetSaga, id),
            click: take(action => action.type === 'TARGET_CLICKED')
        });

        if (timeout)
        {
            console.log("target timeout");
            if (game.lives > 0) {
                yield put({type: 'LOST_1_LIFE'});
                console.log("user lost 1 life");
            }
            else {
                yield put({type: 'GAME_STOP_REQUESTED'});
                console.log("game lost");
            }
        }
        else if (click)
            yield call(handleClick, click.id);

        game = yield select((state) => state.game);
        targets = yield select((state) => state.targets);
        id++;
    }

}

export default targetsSaga;