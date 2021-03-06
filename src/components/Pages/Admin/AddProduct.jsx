import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { apiPrefix } from '../../../../server/config.json';
import { EDITABLE_PRODUCT_FIELDS } from '../../../config';
import { goodAdd } from '../../../actions/adminAction';
import { goodsFetchData } from '../../../actions/goods';


class AddProduct extends Component {

    componentDidMount() {
        console.log(this.props)
        if (this.props.goods.length === 0) {
            this.props.fetchData(`${apiPrefix}/tasks`);
        }
    }
    handleSubmit(e) {
        const { goodAdd } = this.props;
        e.preventDefault();
        console.log(e.target.elements);



        const values = {

            name: e.target.elements[0].value,
            price: e.target.elements[1].value,
            img: e.target.elements[2].value,
            role: e.target.elements[3].value
        }
        goodAdd(`${apiPrefix}/tasks/`, values);
        console.log();
        Object.values(values).map((key, i) => {
            return e.target.elements[i].value = ''
        })
    }
    render() {
        return (
            <div className='main-addproduct'>
                <form className='form-addproduct' onSubmit={this.handleSubmit.bind(this)}>
                    {EDITABLE_PRODUCT_FIELDS.map((key, i) => {
                        const props = {
                            name: key,
                            placeholder: key
                        };
                        return (
                            <input
                                key={i}
                                className=''
                                type='text'
                                {...props}
                            />
                        );
                    })}
                    <input type='button' className='submit-addproduct' type='submit' value='Добавить' />
                </form>
            </div >
        )
    }
}

AddProduct.propTypes = {
    // goodsPostData: PropTypes.func,
    fetchData: PropTypes.func,
    // searchGoods: PropTypes.func,
    hasErrored: PropTypes.bool,
    isLoading: PropTypes.bool,
    goodAdd: PropTypes.func,
};

// Posts being filtered before passing to props
const mapStateToProps = state => ({
    goods: state.goodsState.goods,
    hasErrored: state.goodsState.hasErrored,
    isLoading: state.goodsState.isLoading,
});


const mapDispatchToProps = dispatch => ({
    fetchData: url => dispatch(goodsFetchData(url)),
    goodAdd: (url, values) => dispatch(goodAdd(url, values))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
