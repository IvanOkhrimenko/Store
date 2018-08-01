import React, { Component } from 'react';
import axios from "axios";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: {},
            searchQuery: ""
        };
    }


    componentDidMount() {
        axios
            .get(`http://localhost:3000/tasks`)
            .then(res => {
                const tasks = res;
                this.setState({
                    tasks: tasks
                });
            });
    }
    sendRequest() {
        console.log('request');
        axios.post(`http://localhost:3000/tasks`, {
            name: 'Fred',
            last: 'Flintstone',
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {

        console.log(this.state);

        return (
            <div >
                <button onClick={this.sendRequest}>REQUEST</button>
            </div >
        );
    }
}
