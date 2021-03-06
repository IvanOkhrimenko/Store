import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { apiPrefix } from '../../../../server/config.json';
import { EDITABLE_PRODUCT_FIELDS } from '../../../config';
import AdminNav from './AdminNav'
import { goodsSearch, goodsFetchData } from '../../../actions/goods';
import { goodsChangeData, productChangeInput } from '../../../actions/adminAction';
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
        const { id } = this.props;

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
        const { id } = this.props;
        const { productChangeInput } = this.props;
        const inputName = event.target.name;
        productChangeInput(inputName, event.target.value, id)
    };

    render() {
        console.log(this.props)
        const { id } = this.props;
        const { goods } = this.props;
        if (goods[id] == undefined) {
            return (
                <main >
                    loading.....
                </main>
            );
        }
        let products = goods[id];
        let productKeys = Object.keys(products).filter(field => EDITABLE_PRODUCT_FIELDS.includes(field));
        return (
            <div>
                <div className='row'>
                    <div className='col-md-12'>
                        <form className='form-inline' onSubmit={this.handleSubmit.bind(this)}>
                            {productKeys.map((key, i) => {
                                const props = {
                                    name: key,
                                    value: products[key],
                                };
                                return (
                                    <input
                                        key={i}
                                        className=''
                                        type='text'
                                        {...props}
                                        onChange={this.onInputChange}
                                    />
                                );
                            })}
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
    productChangeInput: (inputName, value, id) => dispatch(productChangeInput(inputName, value, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeProduct);
