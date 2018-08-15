import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { apiPrefix } from '../../../../server/config.json';
import AdminNav from './AdminNav';
import AddUser from './AddUser';
import ChangeUser from './ChangeUser';
import './Admin.scss';
import {
    usersFetchData,
    usersSearch,
    usersSetFilter,
    serChangeData,
    deleteUser,
    visibleUserOperationForm
} from '../../../actions/UserActions';


class UsersList extends Component {
    componentDidMount() {

        if (this.props.users.length === 0) {
            this.props.fetchData(`${apiPrefix}/users`);
        }
    }
    onVisibleForm = (addForm, changeForm) => {
        const { visibleUserOperationForm } = this.props;
        console.log(addForm, changeForm)
        visibleUserOperationForm(addForm, changeForm);
    }
    // onDelete = id => {
    //     console.log(id);
    //     const { deleteUser } = this.props;
    //     deleteUser(`${apiPrefix}/tasks/${id}`, id);
    // }
    render() {
        const { users, changeForm } = this.props;
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

                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Created data</th>
                                <th>Change</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, i) => (

                                    < tr key={i} >
                                        <th className='admin-product-img'>
                                            <p>{user.name} {user.last_name}</p>
                                        </th>
                                        <th className="admin-product-descript">
                                            <Link to={{
                                                pathname: `/good/${user._id}/`
                                            }}>
                                                {user.email}</Link>
                                        </th>
                                        <th className='admin-product-price'>
                                            {user.role}
                                        </th>
                                        <th>
                                            {user.Created_date}
                                        </th>
                                        <th className='admin-product-change'>

                                            <input type="button" value="Изменить" onClick={() => this.onVisibleForm({ addForm: false }, { changeForm: true, id: user._id })} />
                                        </th>

                                        <th className='admin-product-delete'>
                                            <input type="button" value="Delete" />
                                        </th>
                                    </tr>

                                ))}
                        </tbody>
                    </table>

                    {changeForm.changeForm ?
                        <div>
                            <ChangeUser id={changeForm.id} />
                        </div> : <AddUser />}

                    <input type="button" value="Добавить" onClick={() => this.onVisibleForm({ addForm: true }, { changeForm: false, id: null })} />

                </div>

            </div >
        )
    }
}
UsersList.propTypes = {
    fetchData: PropTypes.func,
    searchGoods: PropTypes.func,
    hasErrored: PropTypes.bool,
    isLoading: PropTypes.bool,
    users: PropTypes.array,


};

// Posts being filtered before passing to props
const mapStateToProps = state => ({
    users: Object.values(state.usersState.users)
        .filter(user => user.name.toLowerCase().includes(state.usersState.searchFilter.toLowerCase())),
    hasErrored: state.usersState.hasErrored,
    isLoading: state.usersState.isLoading,
    addForm: state.usersState.addForm,
    changeForm: state.usersState.changeForm
});


const mapDispatchToProps = dispatch => ({
    changeUser: (url, values) => dispatch(userChangeData(url, values)),
    searchGoods: searchFilter => dispatch(usersSearch(searchFilter)),
    fetchData: url => dispatch(usersFetchData(url)),
    deleteUser: id => dispatch(deleteUser(id)),
    visibleUserOperationForm: (addForm, changeForm) => dispatch(visibleUserOperationForm(addForm, changeForm))
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
