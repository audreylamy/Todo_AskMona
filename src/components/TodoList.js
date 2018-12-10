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
            value: '',
            errorMessage: ''
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
        if (this.state.value && this.state.value.length < 30) {
            await axios.post("https://todo-test-mona.herokuapp.com/tasks", { name: this.state.value, done: false });
            this.props.alltasksAction();
            this.setState({ errorMessage: '' });
        } else {
            this.setState({ errorMessage: "Please add a valid task" });
        }
    }

    renderNbTasks() {
        if (this.props.allTasks) {
            return (
                <div className="todo_footer-nb">{this.props.allTasks.length} TASKS</div>
            )
        } else {
            return (
                <div className="todo_footer-nb">0 TASK</div>
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
                    <div className="todo_footer-nb">
                        <form onSubmit={this.handleSubmit}>
                            <input className="input" type="text" placeholder="New Task" value={this.state.value} onChange={this.handleChange}></input>
                            <input className="button" type="submit" value="Submit"/>
                        </form>
                        <span>{this.state.errorMessage}</span>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        allTasks: state.tasks.allTasks
    }
}

function mapDispatchToProps(dispatch) { 
    return bindActionCreators({ 
        alltasksAction: alltasksAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);