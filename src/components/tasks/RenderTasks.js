import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alltasksAction } from '../../reducers/reducer_todo';
import Checkbox from './Checkbox';
import axios from 'axios';

class RenderTasks extends Component {

  constructor(props) {
    super(props);

    this.state = {
        value: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
    //delete task
    async deleteTask(id) {
      await axios.delete("https://todo-test-mona.herokuapp.com/tasks/" + id)
      this.props.alltasksAction()
    }

    //update name task
    async updateTask(e, id, done) {
      console.log(id)
      e.preventDefault();
      await axios.put("https://todo-test-mona.herokuapp.com/tasks/" + id, {name: this.state.value, done: done})
      this.props.alltasksAction()
    }

    render() {
        if (this.props.allTasks) {
          console.log(this.props.allTasks)
            return this.props.allTasks.map((tasks, i) => {
              return (
                <div key={i} className='task'>
                    <Checkbox
                      id={tasks.id}
                      check={tasks.done}
                      name={tasks.name}
                      onClick={(e) => this.taskDone(tasks.id, tasks.name, tasks.done)}
                    />
                    <div className="task_update">
                      <form onSubmit={(e) => this.updateTask(e, tasks.id, tasks.name, tasks.done)}>
                        <input type="text" onChange={this.handleChange}></input>
                        <input type="submit" value="Submit"/>
                      </form>
                    </div>
                    <span onClick={(e) => this.deleteTask(tasks.id)}>Delete</span>
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
}

function mapStateToProps(state) {
  return {
      allTasks: state.tasks.allTasks
  }
}

function mapDispatchToProps(dispatch, props) { 
  return bindActionCreators({ 
      alltasksAction: alltasksAction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderTasks);