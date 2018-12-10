import React, { Component } from 'react';
import axios from "axios";

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

    rendertasks() {
        console.log(this.state.allTasks)
        if (this.state.allTasks != null) {
            return this.state.allTasks.map((tasks, i) => {
              return (
                <div key={i} className="todo_body">
                    <input type="checkbox" id="horns" name="horns"/>
                    <div className="App">
                        {tasks.name}
                    </div>
                </div>
              );
            })
          } else {
            return (
              <div className="App">
                not
              </div>
            );
          }
    }

    render() {
        return (
            <div className="todo">
                <div className="todo_header">
                    <h3>My Todo List</h3>
                </div>
                {this.rendertasks()}
                <div className="todo_footer">
   
                </div>
            </div>
        );
    }
}

export default TodoList;