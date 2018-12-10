import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alltasksAction } from '../reducers/reducer_todo';
import axios from "axios";
import RenderTasks from './tasks/RenderTasks';

class TodoList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        this.props.alltasksAction()
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        await axios.post("https://todo-test-mona.herokuapp.com/tasks", {name: this.state.value, done: false});
        this.props.alltasksAction()
    }

    renderNbTasks() {
        const {allTasks} = this.props
        if (allTasks != null) {
            return (
                <div>{allTasks.length} tasks</div>
            )
        } else {
            return (
                <div>0 task</div>
            )
        }
    }

    render() {
        return (
            <div className="todo">
                <div className="todo_header">
                    <h3>My Todo List</h3>
                </div>
                <div className="todo_body">
                    <RenderTasks />
                </div>
                <div className="todo_footer">
                    {this.renderNbTasks()}
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        allTasks: state.tasks.allTasks.data
    }
  }

function mapDispatchToProps(dispatch, props) { 
    return bindActionCreators({ 
        alltasksAction: alltasksAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);