import { takeEvery, all, put, takeLatest } from "redux-saga/effects";
import * as wh from '../../constants/watchList/watchHistory';
import { getLimitHistorySucc, getLimitHistoryFail, createWatchHistorySucc } from "../../actions/watchList/WatchHistory";
import ApiService from "../../../services/apiService";
import { customNotification, msgType } from "../../../utils/notification/customNotification";

function* getLimitedHistorySaga() {
    yield takeLatest(wh.GET_LIMIT_WATCH_HISTORY, function* (action) {
        // console.log("getLimitedHistorySaga call", action);
        // yield put(startLoading());
        const { payload: { pageNo, itemCount } } = action;
        try {
            const { data, headers, status } = yield ApiService.get(`/watchHistory?_page=${pageNo}&_limit=${itemCount}`);
            // console.log(data, "from get limit order res");
            let payloadData = {
                data,
                totalItem: headers["x-total-count"],
                perPageItem: itemCount
            };
            if (status === 200 || status < 400) {
                customNotification({ status, message: "successfully fetch.", type: msgType.success });
                yield put(getLimitHistorySucc(payloadData));
            }
        } catch (e) {
            console.log(e);
            customNotification({ message: e.message, type: msgType.error });
            yield put(getLimitHistoryFail(e.message));
        } finally {
            // yield put(endLoading());
        }
    })
}

function* createHistorySaga() {
    yield takeEvery(wh.CREATE_WATCH_HISTORY, function* (action) {
        // console.log("createHistorySaga call", action);
        const { payload } = action;
        try {
            const { data, status } = yield ApiService.post(`/watchHistory`, {}, payload);
            // console.log(data, "from createCollectionSaga", status);

            if (status === 200 || status < 400) {
                customNotification({ status, message: "history recoard successfully.", type: msgType.success });
                yield put(createWatchHistorySucc(data));
            }


        } catch (e) {
            console.log(e);
            customNotification({ message: e.message, type: msgType.error });
            yield put(getLimitHistoryFail(e.message))
        }

    })
}


export default function* rootSaga() {
    yield all([
        getLimitedHistorySaga(),
        createHistorySaga()

    ]);
}
