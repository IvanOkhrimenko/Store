import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import NumericInput from 'react-numeric-input';
import { removeItem, updateCart } from '../../actions/cartAction';

import './Сart.scss';

class Cart extends Component {

    // _removeFromCart(item) {
    //     this.props.dispatch(removeItem(item));
    //     this.props.dispatch(syncQuantity({ "item": item, "quantity": 0 }));
    // }
    handleChange(e) {
        const { value } = e.target;
        console.log(value);
        // this.setState({ [field]: value });
    }
    render() {

        const { itemsList, removeFromCart, updateValue } = this.props;
        let subTotals = [];
        if (itemsList.length !== 0) {
            itemsList.map((item) => {
                console.log('items', item.quantity);
                subTotals.push(item.quantity * item.price);
            });
        }

        // if (itemsList.length) {
        //     console.log('items',itemsList);
        //     itemsList.map((item) => {
        //         console.log('items',item);
        //         // subTotals.push(item.quantity * item.price);
        //     });

        // }
        console.log(itemsList, subTotals);
        return (
            <div className="cart">
                {itemsList.length !== 0 ? (
                    <div className="contains-items">
                        <h3>Your Cart Summary</h3>

                        <div className="cart-overview">
                            <div className="item-count">
                                <span>Item(s) in cart</span>
                                <span className="count-meter">{itemsList.length}</span>
                            </div>

                            <div className="grand-total">
                                <span>Grand Total (INR)</span>
                                <span className="total-amount">{subTotals.reduce((accumulator, currentValue) => accumulator + currentValue)}</span>
                            </div>
                        </div>

                        <hr />

                        <div className="cart-header">
                            <div className="cart-item-title">Item</div>
                            <div className="cart-quantity-title">Quantity</div>
                            <div className="cart-total-title">Total (INR)</div>
                        </div>

                        {itemsList && itemsList.map((item, i) => (
                            console.log(item),
                            <div className="item-row" key={i}>
                                <div className="cart-item-title">{item.brand}<br />{item.item}</div>
                                <div className="cart-quantity-title">{item.quantity}</div>
                                <div className="cart-total-title">{item.quantity * item.price}</div>

                                <div className="remove-item" onClick={() => { removeFromCart(item.id) }}>x</div>
                                <div>
                                    <input type="number" class='input-number' min="1" step="1" value={item.quantity} onChange={(e) => { updateValue(item.item, e.target.value, item.id) }} />
                                </div>
                            </div>

                        ))}
                    </div>
                ) : (
                        <div className="contains-no-items">
                            <h3>Oops! Your cart is empty!</h3>
                            <h4>Add items to proceed</h4>
                        </div>
                    )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    itemsList: Object.values(state.cartState),

});
const mapDispatchToProps = dispatch => ({
    removeFromCart: item => dispatch(removeItem(item)),
    updateValue: (name, value, id) => dispatch(updateCart(name, value, id)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Cart);