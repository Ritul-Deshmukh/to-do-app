import React, { useState } from 'react';
import AddTodo from './AddTodo';
import UpdateTodo from './UpdateTodo';
import './styles.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const create = (newTodo) => {
        setTodos([...todos, newTodo]);
    };

    const remove = (id) => {
        setTodos(todos.filter((t) => t.id !== id));
    };

    const update = (id, updatedTask) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, task: updatedTask };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const toggleComplete = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const changeFilter = (filter) => {
        setFilterStatus(filter);
    };

    const filteredTodos = todos.filter((todo) =>
        todo.task.toLowerCase().includes(search.toLowerCase())
    );

    const filteredAndSortedTodos = filteredTodos.filter((todo) => {
        if (filterStatus === 'active') {
            return !todo.completed;
        } else if (filterStatus === 'completed') {
            return todo.completed;
        }
        return true;
    });

    const todosToRender = filteredAndSortedTodos.map((todo) => (
        <UpdateTodo
            key={todo.id}
            id={todo.id}
            task={todo.task}
            completed={todo.completed}
            removeTodo={remove}
            updateTodo={update}
            toggleComplete={toggleComplete}
        />
    ));

    return (
        <div className='TodoList'>
            <h1>Todo List</h1>
            <AddTodo createTodo={create} />
            <input
                className='search'
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearch}
            />
            <div>
                <label>Filter by: </label>
                <select value={filterStatus} onChange={(e) => changeFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <ul>{todosToRender}</ul>
        </div>
    );
};

export default TodoList;
