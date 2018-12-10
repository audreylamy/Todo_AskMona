import React, { Component } from 'react';
import TodoList from '../components/TodoList';

class Landing extends Component {
    render() {
        return (
            <div className="container">               
                <TodoList />
            </div>
        );
    }
}

export default Landing;