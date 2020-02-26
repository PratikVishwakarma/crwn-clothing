import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectDirectorySections } from '../../redux/directory/directory.selectors'

import './directory.styles.scss'

import MenuItem from '../../components/menu-item/menu-item.component.jsx'

const Direcotry = ({sections}) => (
    <div className='directory-menu'>
        {
            sections.map(({ id, ...otherSectionProp }) =>
                <MenuItem key={id} {...otherSectionProp} />)
        }
    </div>
)

const mapStateToProp = createStructuredSelector({
    sections : selectDirectorySections
})
export default connect(mapStateToProp)(Direcotry)