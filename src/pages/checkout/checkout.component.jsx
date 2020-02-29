import React from 'react'

import './checkout.styles.scss'
import { connect } from 'react-redux'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors'
import { createStructuredSelector } from 'reselect'


const CheckoutPage = ({ cartItems, total }) => {
    return cartItems.length ? (
        <div className='checkout-page'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map(cartItem =>
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                )
            }
            <div className='total'>
                <span>Total:${total}</span>
            </div>
            <StripeCheckoutButton price={total}/>
        </div>
    )
        : (<div className='checkout-page'>
            <span className='empty-message'>Your cart is empty</span>
        </div>
        )

}


export const mapStateToProp = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})
export default connect(mapStateToProp)(CheckoutPage)