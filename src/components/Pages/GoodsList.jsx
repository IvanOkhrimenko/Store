import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
// import PostPreview from './PostPreview';
import { apiPrefix } from '../../../server/config.json';
import {
    goodsFetchData,
    goodsLoadMore,
    goodsSearch,
    goodsResetLimit,
} from '../../actions/goods';
// import '../../css/loader.css';
// import '../../css/goods.css';

class GoodsList extends Component {
    componentDidMount() {
        if (this.props.goods.length === 0) {
            this.props.fetchData(`${apiPrefix}/tasks`);
            console.log(this.props);
        }
    }

    componentWillUnmount() {
        this.props.resetLimit();
    }

    getVisibleGoods() {
        const { goods, limit } = this.props;
        const visibleGoods = [...goods];
        // Cutting off only goods we need to render
        visibleGoods.length = limit;
        return visibleGoods;
    }

    scrollToTop() {
        this.goodsSection.scroll({
            top: 0,
            behavior: 'smooth',
        });
    }

    render() {
        const {
            goods,
            loadMore,
            limit,
            searchGoods,
        } = this.props;

        // Variable for later checking if limit is bigger than actual number of goods
        const initialLength = goods.length;
        const visibleGoods = this.getVisibleGoods();

        return (
            <div>
                <div className="search-bar">
                    <input type="text"
                        placeholder="Type here to search"
                        ref={(input) => { this.searchInput = input; }}
                        onChange={() => {
                            searchGoods(this.searchInput.value);
                            this.scrollToTop();
                        }}
                    />
                </div>
                <main className="main-goods">
                    {
                        this.props.hasErrored ?
                            <p>Sorry! There was an error loading the goods</p>
                            : null}
                    {
                        this.props.isLoading ?
                            <div className="sk-folding-cube">
                                <div className="sk-cube1 sk-cube"></div>
                                <div className="sk-cube2 sk-cube"></div>
                                <div className="sk-cube4 sk-cube"></div>
                                <div className="sk-cube3 sk-cube"></div>
                            </div>
                            : null
                    }

                    <section className='goods' ref={(section) => { this.goodsSection = section; }}>
                        {

                            visibleGoods.map((good, i) => (
                                <div key={i} className='post'>
                                    <div className="postList-content">
                                        <div className='postList-text'>
                                            <Link to={{
                                                pathname: `/good/${i}/`
                                            }}><h2>{good.name}</h2></Link>
                                            <p className="post-description">{i}</p>
                                        </div>
                                        <div className="post-footer">
                                        </div>
                                    </div>
                                </div>
                            ))}


                        {/* If all goods were rendered, button will be removed */}
                        {
                            initialLength > limit && initialLength > 10 ?
                                <div className="load-more" onClick={(e) => {
                                    e.preventDefault();
                                    loadMore(30);
                                }}>Load more</div>
                                :
                                <div className="load-more" onClick={(e) => {
                                    e.preventDefault();
                                    this.scrollToTop();
                                }}>Back To Top
                </div>
                        }
                    </section>
                </main>
            </div>
        );
    }
}

GoodsList.propTypes = {
    fetchData: PropTypes.func,
    loadMore: PropTypes.func,
    resetLimit: PropTypes.func,
    searchGoods: PropTypes.func,
    hasErrored: PropTypes.bool,
    isLoading: PropTypes.bool,
    goods: PropTypes.array,
    limit: PropTypes.number,
};

// Posts being filtered before passing to props
const mapStateToProps = state => ({
    goods: Object.values(state.goodsState.goods)
        .filter(good => good.name.toLowerCase().includes(state.goodsState.searchFilter.toLowerCase())),
    hasErrored: state.goodsState.hasErrored,
    isLoading: state.goodsState.isLoading,
    limit: state.goodsState.limit,

});

const mapDispatchToProps = dispatch => ({
    fetchData: url => dispatch(goodsFetchData(url)),
    loadMore: limit => dispatch(goodsLoadMore(limit)),
    resetLimit: () => dispatch(goodsResetLimit()),
    searchGoods: searchFilter => dispatch(goodsSearch(searchFilter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoodsList);
