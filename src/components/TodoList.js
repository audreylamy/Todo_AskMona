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
   
                </div>
            </div>
        );
    }
}

export default TodoList;