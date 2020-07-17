import React from 'react';
import './shop.styles.scss';
import CollectionsOverview from "../../components/collection-overview/collection-overview.component";

const ShopPage =({collections}) => {

    return (
        <div className='shopPage'>
            <CollectionsOverview />
        </div>
    );
};

export default ShopPage;