import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { apiPrefix } from '../../../../server/config.json';
import { EDITABLE_USERS_FIELDS } from '../../../config';
import { usersSearch, usersFetchData, userChangeData, userChangeInput } from '../../../actions/UserActions';

class ChangeUser extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props)
        if (this.props.users.length === 0) {
            this.props.fetchData(`${apiPrefix}/users`);
        }
    }
    handleSubmit(e) {

        const { userChangeData } = this.props;
        const { id } = this.props;

        e.preventDefault();

        const values = {
            name: e.target.elements[0].value,
            last_name: e.target.elements[1].value,
            email: e.target.elements[2].value,
            password: e.target.elements[3].value,
            role: e.target.elements[4].value
        }
        console.log(values);
        userChangeData(`${apiPrefix}/users/${id}`, values);
    }

    onInputChange = event => {
        const { id } = this.props;
        const { userChangeInput } = this.props;
        const inputName = event.target.name;

        userChangeInput(inputName, event.target.value, id)
    };

    render() {

        const { id } = this.props;
        const { users } = this.props;
        if (users[id] == undefined) {
            return (
                <main >
                    loading.....
                </main>
            );
        }
        let userss = users[id];
        let userKeys = Object.keys(userss).filter(field => EDITABLE_USERS_FIELDS.includes(field));
        console.log(userKeys)
        return (
            <div>
                <div className='row'>
                    <div className='col-md-12'>
                        <form className='form-inline' onSubmit={this.handleSubmit.bind(this)}>
                            {userKeys.map((key, i) => {
                                const props = {
                                    name: key,
                                    value: userss[key],
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

ChangeUser.propTypes = {
    goodsPostData: PropTypes.func,
    fetchData: PropTypes.func,
    searchGoods: PropTypes.func,
    hasErrored: PropTypes.bool,
    isLoading: PropTypes.bool,

};

// Posts being filtered before passing to props
const mapStateToProps = state => ({
    users: state.usersState.users,
    hasErrored: state.usersState.hasErrored,
    isLoading: state.usersState.isLoading,
});


const mapDispatchToProps = dispatch => ({
    userChangeData: (url, values) => dispatch(userChangeData(url, values)),
    searchGoods: searchFilter => dispatch(usersSearch(searchFilter)),
    fetchData: url => dispatch(usersFetchData(url)),
    userChangeInput: (inputName, value, id) => dispatch(userChangeInput(inputName, value, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeUser);
