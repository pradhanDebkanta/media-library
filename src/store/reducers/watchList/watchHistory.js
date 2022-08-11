import * as wh from '../../constants/watchList/watchHistory';

const initialState = {
    historyList: [],
    totalHistory: 0,
    perPageItem: 10,
    loading: false,
    error: false,
    errormessage: '',
}

const watchHistoryReducer = (state = initialState, action) => {
    const { type, payload } = action;
    let collArr = [...state.historyList];
    let currTColl = state.totalHistory;

    switch (type) {
        case wh.GET_LIMIT_WATCH_HISTORY_SUCCESS:
            return {
                ...state,
                historyList: payload.data,
                totalHistory: payload.totalItem,
                perPageItem: payload.perPageItem,
                loading: false,
                error: false,
                errormessage: ''
            }

        case wh.CREATE_WATCH_HISTORY_SUCCESS:
            if (collArr.length < state.perPageItem) {
                collArr.unshift(payload);
            } else {
                collArr.pop();
                collArr.unshift(payload);
            }
            currTColl++;
            // console.log(collArr, "reducer create");
            return {
                ...state,
                historyList: collArr,
                totalHistory: currTColl,
                loading: false,
                error: false,
                errormessage: ''
            }
        default:
            return state;

    }
}

export default watchHistoryReducer;

