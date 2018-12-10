import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alltasksAction } from '../../reducers/reducer_todo';
import axios from 'axios';

class Checkbox extends Component {

    //update status task
    async taskDone(name, id, check) {
        if (check !== false) {
            await axios.put("https://todo-test-mona.herokuapp.com/tasks/" + id, {name: name, done: false})
            this.props.alltasksAction()
        } else {
            await axios.put("https://todo-test-mona.herokuapp.com/tasks/" + id, {name: name, done: true})
            this.props.alltasksAction()
        }
    }

    render() {
        const { id, name, check } = this.props
        if (check) {
            return (
                <input onClick={(e) => this.taskDone(name, id, check)} type="checkbox" id="horns" name="horns" defaultChecked/>
            )
        } else {
            return (
                <input onClick={(e) => this.taskDone(name, id, check)} type="checkbox" id="horns" name="horns"/>
            )
        }
    }
    
}

function mapDispatchToProps(dispatch, props) { 
    return bindActionCreators({ 
        alltasksAction: alltasksAction
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Checkbox);