import React, { Component } from 'react'
import AddTodo from './AddTodo';
import UpdateTodo from './UpdateTodo';

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            search: '',
            filterStatus: 'all'
        };
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.search = this.search.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
    }

    create(newTodo) {
        this.setState({
            todos: [...this.state.todos, newTodo]
        });
    }

    remove(id) {
        this.setState({
            todos: this.state.todos.filter(t => t.id !== id)
        })
    }

    update(id, updatedTask) {
        const updatedTodos = this.state.todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, task: updatedTask };
            }
            return todo;
        });
        this.setState({ todos: updatedTodos });
    }

    search(event) {
        this.setState({ search: event.target.value });
    }

    toggleComplete(id) {
        const updatedTodos = this.state.todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        this.setState({ todos: updatedTodos });
    }

    changeFilter(filter) {
        this.setState({ filterStatus: filter });
    }

    render() {
        const filteredTodos = this.state.todos.filter((todo) =>
            todo.task.toLowerCase().includes(this.state.search.toLowerCase())
        );

        const filteredAndSortedTodos = filteredTodos.filter((todo) => {
            if (this.state.filterStatus === 'active') {
                return !todo.completed;
            } else if (this.state.filterStatus === 'completed') {
                return todo.completed;
            }
            return true;
        });

        const todos = filteredAndSortedTodos.map(todo => {
            return <UpdateTodo
                key={todo.id}
                id={todo.id}
                task={todo.task}
                completed={todo.completed}
                removeTodo={this.remove}
                updateTodo={this.update}
                toggleComplete={this.toggleComplete}
            />
        })
        return (
            <div>
                <h1>Todo List</h1>
                <AddTodo createTodo={this.create} />
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.state.search}
                    onChange={this.search}
                />
                <div>
                    <label>Filter by: </label>
                    <select value={this.state.filterStatus} onChange={(e) => this.changeFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <ul>
                    {todos}
                </ul>
            </div>
        )
    }
}

export default TodoList;