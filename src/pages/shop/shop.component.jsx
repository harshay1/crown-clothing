import React from 'react';
import { Route } from "react-router-dom";
import './shop.styles.scss';
import CollectionsOverview from "../../components/collection-overview/collection-overview.component";
import Collection from '../collection/collection.component';

const ShopPage =({match}) => {
    console.log(match);
    return (
        <div className='shopPage'>
            <Route exact path={`${match.path}`} component={CollectionsOverview} />
            <Route path={`${match.path}/:collectionId`}  component={Collection} />
        </div>
    );
};

export default ShopPage;