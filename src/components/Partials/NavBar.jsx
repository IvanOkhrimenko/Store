import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';


export default class NavBar extends Component {

	render() {
		return (
			<div className="col-md-8 col-lg-8 col-sm-6 col-xs-6">
				<nav className="mainmenu__nav hidden-xs hidden-sm">
					<ul className="main__menu">
						<li className="drop"><Link to="/main">Главная</Link></li>
						<li className="drop"><Link to="/about">О нас</Link></li>
						<li className="drop"><Link to="/delivery">Доставка</Link></li>
						<li className="drop"><Link to="/promotions">Акции</Link></li>
						<li className="drop"><Link to="/contacts">Контакты</Link></li>
						
					</ul>
				</nav >
			</div >
		);
	}
}

