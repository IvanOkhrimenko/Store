import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { apiPrefix } from '../../../../server/config.json';
import AdminNav from './AdminNav';
import './Admin.scss';
import axios from 'axios';
import { goodsChangeData, goodsSearch, goodsFetchData, } from '../../../actions/goods';

class Admin extends Component {

    componentDidMount() {
        if (this.props.goods.length === 0) {
            this.props.fetchData(`${apiPrefix}/tasks`);
        }
    }
    render() {
        const { goods } = this.props;
        console.log(this.state);
        return (
            <div >
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
                <AdminNav />
                <div className='admin'>
                    <table className='admin-product'>
                        <thead>
                            <tr>

                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Change</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                goods.map((good, i) => (
                                    <tr key={i} >
                                        <th className='admin-product-img'>
                                            <img src={good.img} alt="" />
                                        </th>
                                        <th className="admin-product-descript">
                                            <Link to={{
                                                pathname: `/good/${i}/`,
                                                state: { name: good.name }
                                            }}>


                                                <p> {good.name}</p></Link>
                                        </th>
                                        <th className='admin-product-price'>
                                            {good.price}
                                        </th>
                                        <th>
                                            Description
                                </th>
                                        <th className='admin-product-change'>
                                            <Link to={{
                                                pathname: `/admin/product/${good._id}/`,
                                                params: {
                                                    name: good.name,
                                                    id: good._id,
                                                    price: good.price,
                                                    img: good.img,
                                                    role: good.role
                                                }
                                            }}><p>CHANGE</p></Link>
                                        </th>
                                        <th className='admin-product-delete'>
                                            <button>delete</button>
                                        </th>
                                    </tr>

                                ))}
                        </tbody>
                    </table>

                </div>
            </div >
        )
    }
}
Admin.propTypes = {
    goodsPostData: PropTypes.func,
    fetchData: PropTypes.func,
    searchGoods: PropTypes.func,
    hasErrored: PropTypes.bool,
    isLoading: PropTypes.bool,
    goods: PropTypes.array,
};

// Posts being filtered before passing to props
const mapStateToProps = state => ({
    goods: state.goodsState.goods
        .filter(good => good.name.toLowerCase().includes(state.goodsState.searchFilter.toLowerCase())),
    hasErrored: state.goodsState.hasErrored,
    isLoading: state.goodsState.isLoading,
});


const mapDispatchToProps = dispatch => ({
    changeProduct: (url, values) => dispatch(goodsChangeData(url, values)),
    searchGoods: searchFilter => dispatch(goodsSearch(searchFilter)),
    fetchData: url => dispatch(goodsFetchData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
