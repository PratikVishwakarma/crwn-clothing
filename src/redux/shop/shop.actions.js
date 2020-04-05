import ShopActionTypes from './shop.types'
import { firestore, convertColletionsSnapshotToMap } from '../../firebase/firebase.utils'
import { CartActionTypes } from '../cart/cart.types'

export const fetchCollectionStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTION_START
})

export const fetchCollectionSuccess = collectionMap => ({
    type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: collectionMap
})

export const fetchCollectionFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTION_FAILURE,
    payload: errorMessage
})

export const fetchCollectionStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections')
        dispatch(fetchCollectionStart())
        collectionRef.get().then(snapshot => {
            const collectionMap = convertColletionsSnapshotToMap(snapshot)
            dispatch(fetchCollectionSuccess(collectionMap))
        }).catch(error => {
            dispatch(fetchCollectionFailure(error.message))
        });
    }
}

export const updateCollections = (collectionMap) => ({
    type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: collectionMap
})