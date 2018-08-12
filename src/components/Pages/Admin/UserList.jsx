import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import axios from 'axios';
import { apiPrefix } from '../../../../server/config.json';


export default class Admin extends Component {
    render() {
        return (
            <div className="col-md-8 col-lg-8 col-sm-6 col-xs-6">
               Привет
            </div >
        );
    }
}