import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectDirectorySections } from '../../redux/directory/directory.selectors'

import MenuItem from '../../components/menu-item/menu-item.component.jsx'

import { DirectoryMenuContainer } from './directory.styles'
const Direcotry = ({ sections }) => (
    <DirectoryMenuContainer>
        {
            sections.map(({ id, ...otherSectionProp }) =>
                <MenuItem key={id} {...otherSectionProp} />)
        }
    </DirectoryMenuContainer>
)

const mapStateToProp = createStructuredSelector({
    sections: selectDirectorySections
})
export default connect(mapStateToProp)(Direcotry)