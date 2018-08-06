import { SubmissionError } from 'redux-form'
import { apiPrefix } from '../../../server/config.json';
import axios from 'axios';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
    console.log(values);
    return axios.post(`${apiPrefix}/tasks`, values)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default submit;