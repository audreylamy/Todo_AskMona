import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alltasksAction } from '../../reducers/reducer_todo';
import axios from 'axios';

class Checkbox extends Component {

    //update status task
    async taskDone(id, name, check) {
        if (check) {
            await axios.put("https://todo-test-mona.herokuapp.com/tasks/" + id, { name: name, done: false });
        } else {
            await axios.put("https://todo-test-mona.herokuapp.com/tasks/" + id, { name: name, done: true });
        }
        this.props.alltasksAction();
      }

    render() {
        const { id, name, check } = this.props;
        if (check) {
            return (
                <div className="task_checkbox">
                    <input className="checkbox" onClick={(e) => this.taskDone(id, name, check)} value={name} type="checkbox" defaultChecked/>
                    <span id={"name" + id} className="label">{name}</span>
                </div>
            )
        } else if (!check) {
            return (
                <div className="task_checkbox">
                    <input className="checkbox" onClick={(e) => this.taskDone(id, name, check)} value={name} type="checkbox"/>
                    <span id={"name" + id} className="label">{name}</span>
                </div>
            )
        } else {
            return (
                <div className="task_checkbox">
                    <input className="checkbox" onClick={(e) => this.taskDone(id, name, check)} value={name} type="checkbox"/>
                    <span id={"name" + id}>{name}</span>
                </div>
            )
        }
    }
}

function mapDispatchToProps(dispatch) { 
    return bindActionCreators({ 
        alltasksAction: alltasksAction
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Checkbox);