import React, { Component } from 'react';
import { connect } from 'react-redux';

class CountTasks extends Component {
	render () {
		if (this.props.allTasks) {
			return (
				<div className="todo_footer-nb">{this.props.allTasks.length} TASKS</div>
			)
		} else {
			return (
				<div className="todo_footer-nb">0 TASK</div>
			)
		}
	}
}

function mapStateToProps(state) {
	return {
		allTasks: state.tasks.allTasks
	}
}

export default connect(mapStateToProps, null)(CountTasks);