import { combineReducers } from "redux";
import auth from "./auth";
import collectionReducer from "./dashboard/collection";
import eachCollection from "./dashboard/eachCollection";
import watchHistoryReducer from "./watchList/watchHistory";


const rootReducer = combineReducers(
    {
        auth,
        collections: collectionReducer,
        eachCollection,
        watchHistory: watchHistoryReducer

    }
);
export default rootReducer;