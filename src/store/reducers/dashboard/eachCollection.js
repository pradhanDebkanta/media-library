import * as c from '../../constants/dashboard/eachCollection';

const initialState = {
    loading: false,
    error: false,
    errormessage: '',
};

const eachCollection = (state = initialState, action) => {
    const { type, payload } = action;


    switch (type) {
        case c.GET_SPECIFIC_COLLECTION_ITEM_SUCCESS:
            return {
                [payload.collectionId]: payload.data,
                loading: false,
                error: false,
                errormessage: ''
            };

        case c.GET_SPECIFIC_COLLECTION_ITEM_FAILURE:
        case c.ERROR_IN_MEDIA:
            return {
                ...state,
                loading: false,
                error: true,
                errormessage: payload
            };

        case c.CREATE_MEDIA_SUCCESS:
            let mediaArr = [...state[payload?.collectionId]] || [];
            // console.log(mediaArr, "media arr")

            mediaArr.unshift(payload);
            return {
                ...state,
                [payload.collectionId]: mediaArr,
                loading: false,
                error: false,
                errormessage: ''
            }

        case c.EDIT_MEDIA_SUCCESS:
            let mediaArr1 = [...state[payload?.collectionId]] || [];
            mediaArr1 = mediaArr1.map((item) => item.id === payload.id ? payload : item)
            // console.log(mediaArr1, "media arr");

            return {
                ...state,
                [payload.collectionId]: mediaArr1,
                loading: false,
                error: false,
                errormessage: ''
            };

        case c.DELETE_MEDIA_SUCCESS:
            // console.log(payload," deleter scc red");
            let mediaArr2 = [...state[payload?.collectionId]] || [];
            mediaArr2 = mediaArr2.filter((item) => item.id !== payload.id)
            // console.log(mediaArr2, "media arr");

            return {
                ...state,
                [payload.collectionId]: mediaArr2,
                loading: false,
                error: false,
                errormessage: ''
            }

        case c.MOVE_MEDIA_SUCCESS:
            // console.log(payload," deleter scc red");
            let mediaArr3 = [...state[payload?.collectionId]] || [];
            mediaArr3 = mediaArr3.filter((item) => item.id !== payload.id)
            // console.log(mediaArr3, "media arr");

            return {
                ...state,
                [payload.collectionId]: mediaArr3,
                loading: false,
                error: false,
                errormessage: ''
            }

        default:
            return state;
    }

}

export default eachCollection;


// payload={
//     collectionId: 12,
//     data
// }