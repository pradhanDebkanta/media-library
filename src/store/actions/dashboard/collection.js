import * as collection from "../../constants/dashboard/collection";

export const getAllCollection = () => {
    return {
        type: collection.GET_ALL_COLLECTION_NAME
    }
}

export const getLimitCollection = (data) => {
    return {
        type: collection.GET_LIMIT_COLLECTION_NAME,
        payload: data
    }
}

export const editCollection = (data) => {
    return {
        type: collection.EDIT_COLLECTION_NAME,
        payload: data
    }
}

export const createCollection = (data) => {
    // console.log('createCollection action call');
    return {
        type: collection.CREATE_COLLECTION_NAME,
        payload: data
    }
}

export const getAllCollectionSuccess = (data) => {
    return {
        type: collection.GET_ALL_COLLECTION_NAME_SUCCESS,
        payload: data
    }
}

export const getLimitCollectionSuccess = (data) => {
    return {
        type: collection.GET_LIMIT_COLLECTION_NAME_SUCCESS,
        payload: data
    }
}


export const editCollectionSuccess = (data) => {
    console.log(data, "editCollectionSuccess");

    return {
        type: collection.EDIT_COLLECTION_NAME_SUCCESS,
        payload: data
    }
}

export const createCollectionSuccess = (data) => {
    // console.log(data, "createCollectionSuccess");
    return {
        type: collection.CREATE_COLLECTION_NAME_SUCCES,
        payload: data
    }
}

export const getAllCollectionFailure = (data) => {
    return {
        type: collection.GET_ALL_COLLECTION_NAME_FAILURE,
        payload: data
    }
}

export const getLimitCollectionFailure = (data) => {
    return {
        type: collection.GET_LIMIT_COLLECTION_NAME_FAILURE,
        payload: data
    }
}


export const editCollectionFailure = (data) => {
    return {
        type: collection.EDIT_COLLECTION_NAME_FAILURE,
        payload: data
    }
}

export const createCollectionFailure = (data) => {
    return {
        type: collection.CREATE_COLLECTION_NAME_FAILURE,
        payload: data
    }
}

