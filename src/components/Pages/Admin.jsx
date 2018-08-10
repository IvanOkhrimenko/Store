import React from 'react'
import { Field, reduxForm } from 'redux-form'
import submit from './submit'

const renderField = ({ input, label, type, meta: { touched, error } }) =>

    < div >
        <label>
            {console.log(input)}
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

const SubmitValidationForm = props => {
    const { error, handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit(submit)}>

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
                <button type="submit" disabled={submitting}>
                    Log In
        </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
        </button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'submitValidation' // a unique identifier for this form
})(SubmitValidationForm)
