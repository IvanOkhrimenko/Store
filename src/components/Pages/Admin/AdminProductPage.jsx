import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { apiPrefix } from '../../../../server/config.json';
import { goodsFetchData } from '../../actions/goods';
class AdminProductPage extends Component {

    componentDidMount() {
        if (this.props.goods.length === 0) {
            this.props.fetchData(`${apiPrefix}/tasks`);
        }
    }
    render() {
        const { id } = this.props.match.params;
        console.log("props", this.props);
        const good = this.props.goods[`${id}`];
        if (!good) {
            return (
                <main >
                    loading.....
                </main>
            );
        }
        return (

            <div className="posts-page">
                <div key={good.id} className="post-page">
                    <h2>{good.name.toUpperCase()}</h2>
                    <img className="post-img" src={good.img} alt="" />
                    <p>{good.last}</p>
                </div>
            </div>
        );
    }
}

AdminProductPage.propTypes = {
    fetchData: PropTypes.func,
    hasErrored: PropTypes.bool,
    isLoading: PropTypes.bool,
    goods: PropTypes.any,
    match: PropTypes.object,
};

const mapStateToProps = state => ({
    goods: state.goodsState.goods,
    hasErrored: state.goodsState.hasErrored,
    isLoading: state.goodsState.isLoading,
});

const mapDispatchToProps = dispatch => ({
    fetchData: url => dispatch(goodsFetchData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductPage);
