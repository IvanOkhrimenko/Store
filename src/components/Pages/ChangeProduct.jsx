import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiPrefix } from '../../../server/config.json';
import { Field, reduxForm } from 'redux-form'
import axios from 'axios';
import {
    goodsChange
} from '../../actions/goods';
class ChangeProduct extends Component {

    submit(values, id) {
        console.log(values);
        return axios.put(`${apiPrefix}/tasks/:${id}`, values)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        console.log(this.props);
        const { changeProduct } = this.props;
        const { id } = this.props.match.params;
        const product = this.props.goods[`${id}`];
        const { error, handleSubmit, pristine, reset, submitting, values } = this.props
        return (
            <form onSubmit={handleSubmit(this.submit)}>

                <Field
                    name="name"
                    type="text"

                    component={renderField}
                    label="Username"
                />
                <Field
                    name="price"
                    type="text"
                    component={renderField}
                    label="Password"
                />
                <Field
                    name="img"
                    type="number"
                    component={renderField}
                    label="Image"
                />
                <Field
                    name="role"
                    type="text"
                    component={renderField}
                    label="Role"
                />
                {error &&
                    <strong>
                        {error}
                    </strong>}
                <div>
                    <button type="submit" disabled={submitting} onClick={this.submit(null, id)}>
                        Log In
    </button>
                    <button type="button" disabled={pristine || submitting} onClick={reset}>
                        Clear Values
    </button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    goods: state.goodsState.goods,
    hasErrored: state.goodsState.hasErrored,
    isLoading: state.goodsState.isLoading,
});

const mapDispatchToProps = dispatch => ({
    changeProduct: (event, id) => dispatch(goodsChange(event, id))
});

ChangeProduct = connect(mapStateToProps, mapDispatchToProps)(ChangeProduct);


const renderField = ({ input, label, type, meta: { touched, error } }) =>

    < div >
        <label>

        </label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {
                touched &&
                error &&
                <span>
                    {error}
                </span>}
        </div>
    </div >


export default reduxForm({
    form: 'submitValidation' // a unique identifier for this form
})(ChangeProduct)
