import { all } from "redux-saga/effects";
import authSaga from "./auth";
import collectionNameSaga from './dashboard/collection'
import eachCollectionSaga from './dashboard/eachCollection';
import watchHistorySaga from './watchList/watchHistory'

export default function* rootSaga() {
    yield all([
        authSaga(),
        collectionNameSaga(),
        eachCollectionSaga(),
        watchHistorySaga()
    ]);
}