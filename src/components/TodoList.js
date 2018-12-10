import React, { Component } from 'react';
import axios from "axios";
import RenderTasks from './tasks/RenderTasks';

class TodoList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allTasks: null
          }
    }

    async componentDidMount() {
        const allTasks = await axios.get("https://todo-test-mona.herokuapp.com/tasks")
        this.setState({
            allTasks: allTasks.data
        })
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
                        <button >Add a new task</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoList;