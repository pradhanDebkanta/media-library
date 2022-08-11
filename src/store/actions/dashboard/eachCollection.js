import * as c from '../../constants/dashboard/eachCollection';

export const getSpcColItem = (data) => {
    // console.log(data, "getSpcColItem action");
    return {
        type: c.GET_SPECIFIC_COLLECTION_ITEM,
        payload: data
    }
}

export const getSpcColItemSucc = (data) => {
    // console.log('getSpcColItemSucc success');
    return {
        type: c.GET_SPECIFIC_COLLECTION_ITEM_SUCCESS,
        payload: data
    }
}

export const getSpcColItemFail = (data) => {
    return {
        type: c.GET_SPECIFIC_COLLECTION_ITEM_FAILURE,
        payload: data
    }
}

// FOR MEDIA CARD CURD


export const createMedia = (data) => {
    return {
        type: c.CREATE_MEDIA,
        payload: data
    };

}
export const editMedia = (data) => {
    return {
        type: c.EDIT_MEDIA,
        payload: data
    };
}

export const deleteMedia = (data) => {
    return {
        type: c.DELETE_MEDIA,
        payload: data
    };
}

export const moveMedia = (data) => {
    return {
        type: c.MOVE_MEDIA,
        payload: data
    };
}

export const mediaError = (err) => {
    return {
        type: c.EDIT_MEDIA,
        payload: err
    }
}

export const createMediaSuccess = (data) => {
    return {
        type: c.CREATE_MEDIA_SUCCESS,
        payload: data
    };
}

export const editMediaSuccess = (data) => {
    return {
        type: c.EDIT_MEDIA_SUCCESS,
        payload: data
    };
}

export const deleteMediaSuccess = (data) => {
    return {
        type: c.DELETE_MEDIA_SUCCESS,
        payload: data
    };
}

export const moveMediaSuccess = (data) => {
    return {
        type: c.MOVE_MEDIA_SUCCESS,
        payload: data
    };
}