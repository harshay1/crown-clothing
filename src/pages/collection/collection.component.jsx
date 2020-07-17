import React from 'react';
import './collection.styles.scss';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from '../../redux/shop/shop.selector';
import { connect } from 'react-redux';

const Collection = ({match, collection}) => {
    // console.log(match.params.collectionId);
    // console.log(collection);
    return (
        <div className='collection-page'>
            <h2>Category</h2>
            {/* <CollectionItem /> */}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(Collection);