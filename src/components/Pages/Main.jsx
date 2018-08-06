import React, { Component } from 'react';
import GoodsList from './GoodsList';


export default class Main extends Component {
    render() {
        return (
            <div>
                <h1>Главная</h1>
                <GoodsList />
            </div>
        );
    }
}

