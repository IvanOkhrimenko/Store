import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../../actions/UserActions'
console.log(UserActions);

class LoginPage extends Component {

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props);
        this.props.actions.login({ name: e.target.elements[0].value })
    }
    render() {
        console.log(this.props);
        return (
            <div className='row'>
                <div className='col-md-12'>
                    <form className='form-inline' onSubmit={this.handleSubmit.bind(this)}>
                        <input className='form-control' type='text' placeholder='login' />{' '}
                        <button className='btn btn-primary' type='submit'>Войти</button>
                    </form>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(UserActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
