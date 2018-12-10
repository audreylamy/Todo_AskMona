import React, { Component } from 'react';

class RenderTasks extends Component {
    render() {
        const { allTasks } = this.props;
        if (allTasks != null) {
            return allTasks.map((tasks, i) => {
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
}

export default RenderTasks;