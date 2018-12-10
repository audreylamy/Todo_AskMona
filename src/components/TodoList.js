import React, { Component } from 'react';
import axios from "axios";
import RenderTasks from './tasks/RenderTasks';

class TodoList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allTasks: null,
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const allTasks = await axios.get("https://todo-test-mona.herokuapp.com/tasks")
        this.setState({
            allTasks: allTasks.data
        })
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        await axios.post("https://todo-test-mona.herokuapp.com/tasks", {name: this.state.value, done: false});
        const allTasks = await axios.get("https://todo-test-mona.herokuapp.com/tasks")
        console.log(allTasks)
    }

    renderNbTaks() {
        if (this.state.allTasks != null) {
            return (
                <div>{this.state.allTasks.length} tasks</div>
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
                <RenderTasks
                    allTasks={this.state.allTasks}
                />
                <div className="todo_footer">
                    {this.renderNbTaks()}
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

export default TodoList;