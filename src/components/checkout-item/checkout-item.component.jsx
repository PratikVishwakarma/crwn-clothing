import React from 'react'
import { connect } from 'react-redux'

import moduleName from './checkout-item.styles.scss'

export const CheckoutItem = ({cartItem}) => (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={cartItem.imageUrl} alt='item'/>
        </div>
        <span className='name'>{cartItem.name}</span>
        <span className='quantity'>{cartItem.quantity}</span>
        <span className='price'>{cartItem.price}</span>
        <div className='remove-button'>&#10005;</div>
    </div>
)

export default CheckoutItem