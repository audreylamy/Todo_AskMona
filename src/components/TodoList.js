import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alltasksAction } from '../reducers/reducer_todo';
import axios from "axios";
import RenderTasks from './TodoList/RenderTasks';
import CountTasks from './TodoList/CountTasks';
import UpdateTasks from './TodoList/UpdateTasks';
// import { ReactComponent as Edit} from '../assets/img/edit.svg';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            errorMessage: '',
            isEditing: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.alltasksAction();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.value && this.state.value.length < 50) {
            await axios.post("https://todo-test-mona.herokuapp.com/tasks", { name: this.state.value, done: false });
            this.props.alltasksAction();
            this.setState({ errorMessage: '' });
        } else {
            this.setState({ errorMessage: "Please add a valid task (max 50)" });
        }
    }

    renderBody() {
        if (this.state.isEditing) {
            return (
                <div className="todo_body">
                    <UpdateTasks />
                </div>
            )
        } else {
            return (
                <div className="todo_body">
                    <RenderTasks />
                </div>
            )
        }
    }

    render() {
        return (
            <div className="todo">
                <div className="todo_header">
                    <h3>My Todo List</h3>
                    <span className="todo_header-edit" onClick={() => this.setState({isEditing: !this.state.isEditing})}>
                        {/* <Edit className="todo_header-edit--icon" fill='#8A2BE2'/> */}
                        Edit tasks
                    </span>
                </div>
                {this.renderBody()}
                <div className="todo_footer">
                    <CountTasks />
                    <div className="todo_footer-new">
                        <form onSubmit={this.handleSubmit}>
                            <input className="inputAdd" type="text" placeholder="New Task" value={this.state.value} onChange={this.handleChange}></input>
                            <input className="button" type="submit" value="Submit"/>
                        </form>
                        <span className="todo_footer-new--error">{this.state.errorMessage}</span>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) { 
    return bindActionCreators({ 
        alltasksAction: alltasksAction
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(TodoList);