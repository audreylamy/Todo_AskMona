import React, { Component } from 'react';
import { connect } from 'react-redux';

class Checkbox extends Component {

    render() {
        const { key, onClick, name, check } = this.props
        if (check === true) {
            return (
                <label key={key}>
                     <input onClick={onClick} value={name} type="checkbox" defaultChecked/>
                     <span>{name}</span>
                </label>
            )
        } else if (check === false) {
            return (
                <label key={key}>
                     <input onClick={onClick} value={name} type="checkbox"/>
                     <span>{name}</span>
                </label>
            )
        }
    }
    
}

export default connect(null, null)(Checkbox);