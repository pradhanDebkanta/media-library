import { takeEvery, all, put, takeLatest } from "redux-saga/effects";
import * as collection from '../../constants/dashboard/collection';
import {
    getAllCollectionSuccess,
    getAllCollectionFailure,
    getLimitCollectionSuccess,
    getLimitCollectionFailure,
    editCollectionSuccess,
    editCollectionFailure,
    createCollectionSuccess,
    createCollectionFailure
} from "../../actions/dashboard/collection";
import ApiService from "../../../services/apiService";
import { customNotification, msgType } from "../../../utils/notification/customNotification";


export async function checkIfCollectionNameExist(name) {
    try {
        let { data } = await ApiService.get(`/collectionNames`, {}, { name });
        // console.log(data, "filter check")
        return data;

    } catch (e) {
        console.log(e);
        customNotification({ message: e.message, type: msgType.error });
    }

}

function* getAllCollectionSaga() {
    yield takeEvery(collection.GET_ALL_COLLECTION_NAME, function* () {
        try {
            const { data, headers, status } = yield ApiService.get("/collectionNames");
            let payloadData = {
                data,
                totalItem: headers["x-total-count"]
            };
            if (status === 200 || status < 400) {
                customNotification({ status, message: "successfully fetch.", type: msgType.success });
                yield put(getAllCollectionSuccess(payloadData));
            }

        } catch (e) {
            console.log(e);
            customNotification({ message: e.message, type: msgType.error });
            yield put(getAllCollectionFailure(e.message));
        }
    })
}

function* getLimitedCollectionSaga() {
    yield takeLatest(collection.GET_LIMIT_COLLECTION_NAME, function* (action) {
        // console.log("getLimitedOrderSaga call", action);
        // yield put(startLoading());
        const { payload: { pageNo, itemCount } } = action;
        try {
            const { data, headers, status } = yield ApiService.get(`/collectionNames?_page=${pageNo}&_limit=${itemCount}`);
            // console.log(data, "from get limit order res");
            let payloadData = {
                data,
                totalItem: headers["x-total-count"],
                perPageItem: itemCount
            };
            if (status === 200 || status < 400) {
                customNotification({ status, message: "successfully fetch.", type: msgType.success });
                yield put(getLimitCollectionSuccess(payloadData));
            }
        } catch (e) {
            console.log(e);
            customNotification({ message: e.message, type: msgType.error });
            yield put(getLimitCollectionFailure(e.message));
        } finally {
            // yield put(endLoading());
        }
    })
}


function* createCollectionSaga() {
    yield takeEvery(collection.CREATE_COLLECTION_NAME, function* (action) {
        // console.log("createOrderSaga call", action);
        const { payload } = action;
        try {
            const isExist = yield checkIfCollectionNameExist(payload.name);
            if (isExist.length === 0) {
                const { data, status } = yield ApiService.post(`/collectionNames`, {}, payload);
                // console.log(data, "from createCollectionSaga", status);

                if (status === 200 || status < 400) {
                    customNotification({ status, message: "collection created successfully.", type: msgType.success });
                    yield put(createCollectionSuccess(data));
                }
            } else {
                customNotification({ status: 400, message: `${isExist[0]?.name} already exist. choose another name`, type: msgType.error });

            }

        } catch (e) {
            console.log(e);
            customNotification({ message: e.message, type: msgType.error });
            yield put(createCollectionFailure(e.message))
        }

    })
}

function* editCollectionSaga() {
    yield takeEvery(collection.EDIT_COLLECTION_NAME, function* (action) {
        const { payload: { id }, payload } = action;
        try {
            const isExist = yield checkIfCollectionNameExist(payload.name);
            if (isExist.length === 0) {
                const { data, status } = yield ApiService.patch(`/collectionNames/${id}`, {}, payload);
                // console.log(data, "from createOrder", status);
                if (status === 200 || status < 400) {
                    customNotification({ status, message: "collection edited successfully.", type: msgType.success });
                    yield put(editCollectionSuccess(data));
                }
            } else {
                customNotification({ status: 400, message: `${isExist[0]?.name} already exist. choose another name`, type: msgType.error });

            }

        } catch (e) {
            console.log(e);
            customNotification({ message: e.message, type: msgType.error });
            yield put(editCollectionFailure(e.message))
        }
    })
}


export default function* rootSaga() {
    yield all([
        getAllCollectionSaga(),
        getLimitedCollectionSaga(),
        createCollectionSaga(),
        editCollectionSaga()

    ]);
}