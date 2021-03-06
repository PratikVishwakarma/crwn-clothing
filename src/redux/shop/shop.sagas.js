import { takeEvery, call, put, all } from 'redux-saga/effects'
import ShopActionTypes from './shop.types'

import { firestore, convertColletionsSnapshotToMap } from '../../firebase/firebase.utils'
import { fetchCollectionSuccess, fetchCollectionFailure } from './shop.actions'


export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');

        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertColletionsSnapshotToMap, snapshot)
        yield put(fetchCollectionSuccess(collectionsMap))
    } catch (error) {
        yield put(fetchCollectionFailure(error.message))
    }
}

export function* fetchCollectionsStart() {
    yield takeEvery(
        ShopActionTypes.FETCH_COLLECTION_START,
        fetchCollectionsAsync
    )
}

export function* shopSagas(){
    yield all([
        call(fetchCollectionsStart)
    ])
}