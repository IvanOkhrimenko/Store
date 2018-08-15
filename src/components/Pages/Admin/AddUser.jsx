import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { apiPrefix } from '../../../../server/config.json';
import { EDITABLE_USERS_FIELDS } from '../../../config';

import { usersFetchData, userAdd } from '../../../actions/UserActions';


class AddUser extends Component {

    componentDidMount() {
        console.log(this.props)
        if (this.props.users.length === 0) {
            this.props.fetchData(`${apiPrefix}/users`);
        }
    }
    handleSubmit(e) {
        const { userAdd } = this.props;
        e.preventDefault();
        console.log(e.target.elements);

        const values = {
            name: e.target.elements[0].value,
            last_name: e.target.elements[1].value,
            email: e.target.elements[2].value,
            password: e.target.elements[3].value,
            role: e.target.elements[4].value
        }
        userAdd(`${apiPrefix}/users/`, values);
        console.log();
        Object.values(values).map((key, i) => {
            return e.target.elements[i].value = ''
        })
    }
    render() {
        return (
            <div className='main-addproduct'>
                <form className='form-addproduct' onSubmit={this.handleSubmit.bind(this)}>
                    {EDITABLE_USERS_FIELDS.map((key, i) => {
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

AddUser.propTypes = {
    // goodsPostData: PropTypes.func,
    fetchData: PropTypes.func,
    // searchGoods: PropTypes.func,
    hasErrored: PropTypes.bool,
    isLoading: PropTypes.bool,
    userAdd: PropTypes.func,
};

// Posts being filtered before passing to props
const mapStateToProps = state => ({
    users: state.usersState.users,
    hasErrored: state.usersState.hasErrored,
    isLoading: state.usersState.isLoading,
});


const mapDispatchToProps = dispatch => ({
    fetchData: url => dispatch(usersFetchData(url)),
    userAdd: (url, values) => dispatch(userAdd(url, values))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
