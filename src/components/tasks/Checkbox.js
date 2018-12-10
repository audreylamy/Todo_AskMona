import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alltasksAction } from '../../reducers/reducer_todo';
import axios from 'axios';

class Checkbox extends Component {

    //update status task
    async taskDone(id, name, check) {
        if (check === true) {
            console.log('here')
            await axios.put("https://todo-test-mona.herokuapp.com/tasks/" + id, {name: name, done: false})
        } else {
            console.log('yo')
            await axios.put("https://todo-test-mona.herokuapp.com/tasks/" + id, {name: name, done: true})
        }
        this.props.alltasksAction()
      }

    render() {
        const { id, name, check } = this.props
        if (check === true) {
            return (
            <div>
                <input onClick={(e) => this.taskDone(id, name, check)} value={name} type="checkbox" defaultChecked/>
                <span>{name}</span>
            </div>
            )
        } else if (check === false) {
            return (
                <div>
                    <input onClick={(e) => this.taskDone(id, name, check)} value={name} type="checkbox"/>
                    <span>{name}</span>
                </div>
            )
        } else {
            return (
                <div>
                    <input onClick={(e) => this.taskDone(id, name, check)} value={name} type="checkbox"/>
                    <span>{name}</span>
                </div>
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