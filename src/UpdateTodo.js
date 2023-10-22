import React, { useState } from 'react';

const UpdateTodo = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [task, setTask] = useState(props.task);

    const handleRemove = () => {
        props.removeTodo(props.id);
    };

    const toggleForm = () => {
        setIsEditing(!isEditing);
    };

    const handleUpdate = (evt) => {
        evt.preventDefault();
        props.updateTodo(props.id, task);
        setIsEditing(false);
    };

    const handleChange = (evt) => {
        setTask(evt.target.value);
    };

    return (
        <div>
            {isEditing ? (
                <form onSubmit={handleUpdate}>
                    <input
                        type='text'
                        value={task}
                        name='task'
                        onChange={handleChange}
                    />
                    <button>Save</button>
                </form>
            ) : (
                <div>
                    <button onClick={toggleForm}>Edit</button>
                    <button onClick={handleRemove}>Delete</button>
                    <input
                        type="checkbox"
                        checked={props.completed}
                        onChange={() => props.toggleComplete(props.id)}
                    />
                    <li
                        style={{
                            textDecoration: props.completed ? 'line-through' : 'none',
                        }}
                    >
                        {props.task}
                    </li>
                </div>
            )}
        </div>
    );
};

export default UpdateTodo;
