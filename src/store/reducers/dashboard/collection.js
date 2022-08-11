import * as collection from '../../constants/dashboard/collection';

const initialState = {
    collectionName: [],
    totalCollection: 0,
    perPageItem: 10,
    loading: false,
    error: false,
    errormessage: '',
}

const collectionReducer = (state = initialState, action) => {
    const { type, payload } = action;
    let collArr = [...state.collectionName];
    let currTColl = state.totalCollection;

    switch (type) {
        case collection.GET_ALL_COLLECTION_NAME_SUCCESS:
            return {
                ...state,
                collectionName: payload.data,
                totalCollection: payload.totalItem,
                perPageItem: payload.totalItem,
                loading: false,
                error: false,
                errormessage: ''
            }

        case collection.GET_LIMIT_COLLECTION_NAME_SUCCESS:
            return {
                ...state,
                collectionName: payload.data,
                totalCollection: payload.totalItem,
                perPageItem: payload.perPageItem,
                loading: false,
                error: false,
                errormessage: ''
            }

        case collection.EDIT_COLLECTION_NAME_SUCCESS:
            collArr = Array.isArray(collArr) && collArr.map(item => item.id === payload.id ? payload : item);
            console.log(collArr, "reducer edit");
            return {
                ...state,
                collectionName: collArr,
                loading: false,
                error: false,
                errormessage: ''
            }

        case collection.CREATE_COLLECTION_NAME_SUCCES:
            
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
                collectionName: collArr,
                totalCollection: currTColl,
                loading: false,
                error: false,
                errormessage: ''
            }

        case collection.CREATE_COLLECTION_NAME_FAILURE:
        case collection.EDIT_COLLECTION_NAME_FAILURE:
        case collection.GET_LIMIT_COLLECTION_NAME_FAILURE:
        case collection.GET_ALL_COLLECTION_NAME_FAILURE:
            return {
                ...state,
                error: true,
                errormessage: payload
            }

        default:
            return state
    }

}

export default collectionReducer;