import React, { Component } from 'react';
import { connect } from 'react-redux';

class RenderTasks extends Component {
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
                    <span>           delete</span>
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

export default connect(mapStateToProps, null)(RenderTasks);