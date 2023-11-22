import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addtask } from '../redux/slices/taskSlice';
import "../componentstyles/addtask.css"
const AddTask = () => {
  const dispatch = useDispatch();

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  const handleInputChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addtask(taskData));
    setTaskData({
      title: '',
      description: '',
      deadline: '',
    });
  };

  return (
    <div className='addtasksbackground'>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleInputChange}
          className="title-style" 

        />
        <label>Description:</label>
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleInputChange}
          className="textarea-style" 

        />
        <label>Deadline:</label>
        <input
          type="date"
          name="deadline"
          value={taskData.deadline}
          onChange={handleInputChange}
          className="date-style" 

        />
        {/*  */}
        <button className='button-addtask' type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
