import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alltasksAction } from '../../reducers/reducer_todo';
import Axios from 'axios';

class RenderTasks extends Component {

  constructor(props) {
    super(props);
      this.deleteTask = this.deleteTask.bind(this);
    }

    async deleteTask(id) {
      console.log(id)
      await Axios.delete("https://todo-test-mona.herokuapp.com/tasks/" + id)
      this.props.alltasksAction()
    }

    render() {
       const {allTasks} = this.props
       console.log(allTasks)
        if (allTasks != null) {
            return allTasks.map((tasks, i) => {
              return (
                <div key={i} className="todo_body">
                    <input type="checkbox" id="horns" name="horns"/>
                    <div className="App">
                        {tasks.name}
                    </div>
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
      allTasks: state.tasks.allTasks.data
  }
}

function mapDispatchToProps(dispatch, props) { 
  return bindActionCreators({ 
      alltasksAction: alltasksAction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderTasks);