import * as wh from '../../constants/watchList/watchHistory';

export const getLimitHistory = (data) => {
    return {
        type: wh.GET_LIMIT_WATCH_HISTORY,
        payload: data
    }
}
export const getLimitHistorySucc = (data) => {
    return {
        type: wh.GET_LIMIT_WATCH_HISTORY_SUCCESS,
        payload: data
    }
}
export const getLimitHistoryFail = (data) => {
    return {
        type: wh.GET_LIMIT_WATCH_HISTORY_FAILURE,
        payload: data
    }
}

export const createWatchHistory = (data) => {
    return {
        type: wh.CREATE_WATCH_HISTORY,
        payload: data
    }
}

export const createWatchHistorySucc = (data) => {
    return {
        type: wh.CREATE_WATCH_HISTORY_SUCCESS,
        payload: data
    }
}

