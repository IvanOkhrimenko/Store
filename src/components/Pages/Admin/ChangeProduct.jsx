import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { apiPrefix } from '../../../../server/config.json';
import AdminNav from './AdminNav'
import axios from 'axios';
import { goodsChangeData, goodsSearch, goodsFetchData, } from '../../../actions/goods';

class ChangeProduct extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props)
        if (this.props.goods.length === 0) {
            this.props.fetchData(`${apiPrefix}/tasks`);
        }
    }
    handleSubmit(e) {
        console.log(this.props)
        const { changeProduct } = this.props;
        const { id } = this.props.match.params;

        console.log(id);
        e.preventDefault();
        console.log(e.target.elements);
        const values = {
            name: e.target.elements[0].value,
            price: e.target.elements[1].value,
            img: e.target.elements[2].value,
            role: e.target.elements[3].value
        }
        changeProduct(`${apiPrefix}/tasks/${id}`, values);
    }
    onInputChange = event => {
        const inputName = event.target.name;
        this.setState({
            [inputName]: event.target.value
        });
    };

    render() {

        const { id } = this.props.match.params;
        const { goods } = this.props;
        let result = goods.find(good => good._id === id);
        if (result == undefined) {
            return (
                <main >
                    loading.....
                </main>
            );
        }
        return (
            <div>
                <AdminNav />
                <div className='row'>
                    <div className='col-md-12'>
                        <form className='form-inline' onSubmit={this.handleSubmit.bind(this)}>

                            <input name='name' className='form-control' type='text' placeholder='Name'
                                onChange={this.onInputChange}
                                value={this.state ? this.state.name : result.name} />

                            <input name='price' className='form-control' type='text' placeholder='Price'
                                onChange={this.onInputChange}
                                value={this.state ? this.state.price : result.price} />

                            <input name='img' className='form-control' type='text' placeholder='Image'
                                onChange={this.onInputChange}
                                value={this.state ? this.state.img : result.img} />

                            <input name='role' className='form-control' type='text' placeholder='Role'
                                onChange={this.onInputChange}
                                value={this.state ? this.state.role : result.role} />
                            <button className='btn btn-primary' type='submit'>Войти</button>
                        </form>
                    </div>
                </div >
            </div >
        )
    }
}

ChangeProduct.propTypes = {
    goodsPostData: PropTypes.func,
    fetchData: PropTypes.func,
    searchGoods: PropTypes.func,
    hasErrored: PropTypes.bool,
    isLoading: PropTypes.bool,
    goods: PropTypes.array,
};

// Posts being filtered before passing to props
const mapStateToProps = state => ({
    goods: state.goodsState.goods,
    hasErrored: state.goodsState.hasErrored,
    isLoading: state.goodsState.isLoading,
});


const mapDispatchToProps = dispatch => ({
    changeProduct: (url, values) => dispatch(goodsChangeData(url, values)),
    searchGoods: searchFilter => dispatch(goodsSearch(searchFilter)),
    fetchData: url => dispatch(goodsFetchData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeProduct);
