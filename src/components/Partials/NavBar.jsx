import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { apiPrefix } from '../../../server/config.json';
import {
	goodsSearch,
} from '../../actions/goods';

class NavBar extends Component {
	render() {
		const { searchGoods } = this.props;
		return (
			<div className="col-md-8 col-lg-8 col-sm-6 col-xs-6">
				<nav className="mainmenu__nav hidden-xs hidden-sm">
					<ul className="main__menu">
						<li className="drop"><Link to="/main">Главная</Link></li>
						<li className="drop"><Link to="/about">О нас</Link></li>
						<li className="drop"><Link to="/delivery">Доставка</Link></li>
						<li className="drop"><Link to="/promotions">Акции</Link></li>
						<li className="drop"><Link to="/contacts">Контакты</Link></li>
						<li className="drop"><Link to="/cart">Cart</Link></li>
						<div className="search-bar">
							<input type="text"
								placeholder="Type here to search"
								ref={(input) => { this.searchInput = input; }}
								onChange={() => {
									searchGoods(this.searchInput.value);
								}}
							/>
						</div>
					</ul>
				</nav >
			</div >
		);
	}
}
const mapDispatchToProps = dispatch => ({
	searchGoods: searchFilter => dispatch(goodsSearch(searchFilter)),
});
export default connect(null, mapDispatchToProps)(NavBar);
