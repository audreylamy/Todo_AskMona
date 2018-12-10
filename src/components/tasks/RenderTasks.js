import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alltasksAction } from '../../reducers/reducer_todo';
import Checkbox from './Checkbox';
import axios from 'axios';

class RenderTasks extends Component {
  
    //delete task
    async deleteTask(id) {
      console.log(id)
      await axios.delete("https://todo-test-mona.herokuapp.com/tasks/" + id)
      this.props.alltasksAction()
    }

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
        if (this.props.allTasks) {
          console.log(this.props.allTasks)
            return this.props.allTasks.map((tasks, i) => {
              return (
                <div key={i} className='task'>
                    <Checkbox
                      check={tasks.done}
                      name={tasks.name}
                      onClick={(e) => this.taskDone(tasks.id, tasks.name, tasks.done)}
                    />
                    <span onClick={(e) => this.deleteTask(tasks.id)}>delete this task</span>
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