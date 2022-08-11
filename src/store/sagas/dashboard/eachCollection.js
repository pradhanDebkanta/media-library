import { takeEvery, all, put, takeLatest } from "redux-saga/effects";
import * as c from '../../constants/dashboard/eachCollection';
import { getSpcColItemSucc, getSpcColItemFail, createMediaSuccess, editMediaSuccess, deleteMediaSuccess, mediaError, moveMediaSuccess } from '../../actions/dashboard/eachCollection';
import ApiService from "../../../services/apiService";
import { customNotification, msgType } from "../../../utils/notification/customNotification";

function* getSpcColItemSaga() {
    yield takeLatest(c.GET_SPECIFIC_COLLECTION_ITEM, function* (action) {
        // yield put(startLoading());
        const { payload } = action;
        try {
            const { data, headers, status } = yield ApiService.get(`/eachCollection`, {}, { collectionId: payload });
            console.log(data, "from getSpcColItemSaga res");
            let payloadData = {
                collectionId: payload,
                data,
                totalItem: headers["x-total-count"],
            };
            if (status === 200 || status < 400) {
                customNotification({ status, message: "successfully fetch media card.", type: msgType.success });
                yield put(getSpcColItemSucc(payloadData));
            }
        } catch (e) {
            console.log(e);
            customNotification({ message: e.message, type: msgType.error });
            yield put(getSpcColItemFail(e.message));
        } finally {
            // yield put(endLoading());
        }
    })
}

// for media card CURD saga

function* createMediaSaga() {
    yield takeEvery(c.CREATE_MEDIA, function* (action) {
        // console.log("createMediaSaga call");
        const { payload } = action;
        try {
            const { data, status } = yield ApiService.post(`/eachCollection`, {}, payload);
            console.log(data, "from createMediaSaga", status);
            if (status >= 200 && status < 300) {
                customNotification({ status, message: "media created successfully.", type: msgType.success });
                yield put(createMediaSuccess(data));
            }

        } catch (e) {
            console.log(e);
            customNotification({ message: e.message, type: msgType.error });
            yield put(mediaError(e.message))
        }

    })
}

function* editMediaSaga() {
    yield takeEvery(c.EDIT_MEDIA, function* (action) {
        const { payload: { id }, payload } = action;
        try {
            const { data, status } = yield ApiService.patch(`/eachCollection/${id}`, {}, payload);
            console.log(data, "from editMediaSaga", status);
            if (status >= 200 && status < 300) {
                customNotification({ status, message: "Media edited successfully.", type: msgType.success });
                yield put(editMediaSuccess(data));
            }

        } catch (e) {
            console.log(e);
            customNotification({ message: e.message, type: msgType.error });
            yield put(mediaError(e.message))
        }
    })
}

function* deleteMediaSaga() {
    yield takeEvery(c.DELETE_MEDIA, function* (action) {
        const { payload } = action;
        // console.log("deleteMediaSaga call", payload);
        try {
            const { status } = yield ApiService.delete(`/eachCollection/${payload.id}`, {});
            // console.log(status, "from deleteOrderSaga");
            if (status >= 200 && status < 300) {
                customNotification({ status, message: "Media deleted successfully.", type: msgType.success });
                yield put(deleteMediaSuccess(payload));
            }
        } catch (e) {
            console.log(e);
            customNotification({ message: e.message, type: msgType.error });
            yield put(mediaError(e.message))
        }

    })
}

function* moveMediaSaga() {
    yield takeEvery(c.MOVE_MEDIA, function* (action) {
        const { payload } = action;
        console.log(payload, "moveMediaSaga");
        try {
            const { data, status } = yield ApiService.patch(`/eachCollection/${payload.current.id}`, {}, payload.current);
            console.log(data, "from moveMediaSaga", status);
            let prevData = {
                id: payload.current.id,
                collectionId: payload.prev
            }

            if (status >= 200 && status < 300) {
                customNotification({ status, message: "Media moved successfully.", type: msgType.success });
                yield put(moveMediaSuccess(prevData));
            }

        } catch (e) {
            console.log(e);
            customNotification({ message: e.message, type: msgType.error });
            yield put(mediaError(e.message))
        }
    })
}

export default function* rootSaga() {
    yield all([
        getSpcColItemSaga(),
        createMediaSaga(),
        editMediaSaga(),
        deleteMediaSaga(),
        moveMediaSaga()
    ]);
}