import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

/* Components */
import Header from './Pages/Header';
import Main from './Pages/Main';
import About from './Pages/About';
import Delivery from './Pages/Delivery';
import Promotions from './Pages/Promotions';
import Contacts from './Pages/Contacts';
import GoodPage from './Pages/GoodPage';
import Admin from './Pages/Admin/Admin';
import Cart from './Pages/Cart';
import AddProduct from './Pages/Admin/AddProduct';
import UsersList from './Pages/Admin/UserList';

/* Global Styles */


export default class App extends Component {
	render() {
		return (
			<div className="site">
				<div className="site-content">
					<Header />
					<Switch>
						<Route exact path="/" component={Main} />
						<Route exact path="/main" component={Main} />
						<Route path="/good/:id" component={GoodPage} />
						<Route exact path="/about" component={About} />
						<Route exact path="/delivery" component={Delivery} />
						<Route exact path="/promotions" component={Promotions} />
						<Route exact path="/contacts" component={Contacts} />
						<Route exact path="/admin" component={Admin} />
						<Route exact path="/admin/products" component={Admin} />
						<Route exact path="/admin/users/" component={UsersList} />
						<Route exact path="/cart" component={Cart} />
					</Switch>
				</div>

			</div>
		);
	}
}
