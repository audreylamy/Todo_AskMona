import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alltasksAction } from '../../reducers/reducer_todo';
import Checkbox from './Checkbox';
import axios from 'axios';
import { ReactComponent as Cross} from '../../assets/img/cross.svg';

class RenderTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  
  //delete task
  async deleteTask(id) {
    await axios.delete("https://todo-test-mona.herokuapp.com/tasks/" + id);
    this.props.alltasksAction();
  }

  //update name task
  async updateTask(event, id, done) {
    event.preventDefault();
    if (this.state.value) {
      await axios.put("https://todo-test-mona.herokuapp.com/tasks/" + id, { name: this.state.value, done: done });
      this.props.alltasksAction();
    } 
  }

  render() {
    if (this.props.allTasks) {
      return this.props.allTasks.map((task, i) => {
        return (
          <div key={i} className='task'>
            <Checkbox
              id={task.id}
              check={task.done}
              name={task.name}
              onClick={(e) => this.taskDone(task.id, task.name, task.done)}
            />
            <Cross className="task_icon" fill='#8A2BE2' onClick={(e) => this.deleteTask(task.id)}/>
          </div>
        );
      })
    } else {
      return (
        <div className="App">
          Please add a task
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

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ 
      alltasksAction: alltasksAction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderTasks);