import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchCollectionStart } from '../../redux/shop/shop.actions'

import CollectionsOverviewContainer from '../../components/collections-overview/collection-overview.container'
import CollectionPageContainer from '../../pages/collection/collection.container'


class ShopPage extends React.Component {

    componentDidMount() {
        const { fetchCollectionStart } = this.props
        fetchCollectionStart();
    }

    render() {
        
        const { match } = this.props;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer}/>
                <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
            </div>
        )
    }
}

export const mapDispatchToProp = dispatch => ({
    fetchCollectionStart: () => dispatch(fetchCollectionStart())
})



export default connect(null, mapDispatchToProp)(ShopPage)