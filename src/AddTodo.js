import React, { useState } from 'react';
import uuid from 'react-uuid';
import './styles.css';

const AddTodo = ({ createTodo }) => {
    const [task, setTask] = useState('');

    const handleChange = (evt) => {
        setTask(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        createTodo({ task, id: uuid(), completed: false });
        setTask('');
    }

    return (
        <form className='NewTodoForm' onSubmit={handleSubmit}>
            <label htmlFor='task'>New Todo</label>
            <input
                type='text'
                placeholder='New Todo'
                id='task'
                name='task'
                value={task}
                onChange={handleChange}
            />
            <button className='button addtodobutton'>Add Todo</button>
        </form>
    );
}

export default AddTodo;
