import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { apiPrefix } from '../../../../server/config.json';
import { EDITABLE_FIELDS } from '../../../config';
import AdminNav from './AdminNav'
import { goodAdd } from '../../../actions/adminAction';
import { goodsFetchData } from '../../../actions/goods';


// function submit(values) {
//     console.log(values);
//     return axios.post(`${apiPrefix}/tasks`, values)
//         .then(function (response) {
//             console.log(response);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }
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
        // goodAdd(`${apiPrefix}/tasks/`, values);
        console.log();
        Object.values(values).map((key, i) => {
            return e.target.elements[i].value = ''
        })
        // e.target.elements[0].value = '';
        // e.target.elements[1].value = '';
        // e.target.elements[2].value = '';
        // e.target.elements[3].value = '';
    }
    render() {
        return (
            <div>
                <AdminNav />
                <div className='row'>
                    <div className='col-md-12'>
                        <form className='form-inline' onSubmit={this.handleSubmit.bind(this)}>
                            {EDITABLE_FIELDS.map((key, i) => {
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
                            <button className='btn btn-primary' type='submit'>Добавить</button>
                        </form>
                    </div>
                </div >
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
    // changeProduct: (url, values) => dispatch(goodsChangeData(url, values)),
    // searchGoods: searchFilter => dispatch(goodsSearch(searchFilter)),
    fetchData: url => dispatch(goodsFetchData(url)),
    // changeInp: (inputName, value, id) => dispatch(changeInput(inputName, value, id))
    goodAdd: (url, values) => dispatch(goodAdd(url, values))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
