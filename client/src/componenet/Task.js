import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gettask, deletetask, updateTask } from "../redux/slices/taskSlice";
import "../componentstyles/task.css";
export const Task = () => {
  const dispatch = useDispatch();
  const [updatedData, setUpdatedData] = useState({
    taskId: "",
    title: "",
    description: "",
    status: "Pending",
    deadline: "",
    priority: "Medium", // Added priority field with a default value
  });
  const [editingTaskId, setEditingTaskId] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all"); // Separate priority filter

  useEffect(() => {
    dispatch(gettask());
  }, [dispatch]);

  const { isLoading, userdata, error } = useSelector((state) => state.task);

  const sortedUserData = [...userdata].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

  const filteredAndSortedData = sortedUserData.filter((el) => {
    const statusFilter =
      filter === "all" || el.status.toLowerCase() === filter.toLowerCase();
    const searchFilter =
      el.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      el.description.toLowerCase().includes(searchTerm.toLowerCase());
    const priorityFilterCondition =
      priorityFilter === "all" ||
      el.priority.toLowerCase() === priorityFilter.toLowerCase();

    return statusFilter && searchFilter && priorityFilterCondition;
  });

  const handleDeleteTask = (taskId) => {
    console.log("Deleting task with taskId:", taskId);
    dispatch(deletetask(taskId));
  };

  const handleUpdateTask = () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    dispatch(
      updateTask({
        taskId: updatedData.taskId,
        title: updatedData.title,
        description: updatedData.description,
        status: updatedData.status,
        deadline: updatedData.deadline,
        priority: updatedData.priority,
        token: token,
      })
    )
      .then((result) => {
        console.log("Update Task Result:", result);
      })
      .catch((error) => {
        console.error("Update Task Error:", error);
      });

    setUpdatedData({
      taskId: "",
      title: "",
      description: "",
      status: "Pending",
      deadline: "",
      priority: "Medium", // Reset priority to default
    });
    setEditingTaskId("");
  };

  const handleEdit = (taskId) => {
    setEditingTaskId(taskId);
    const taskToEdit = userdata.find((task) => task._id === taskId);
    if (taskToEdit) {
      setUpdatedData({
        taskId: taskToEdit._id,
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
        deadline: taskToEdit.deadline,
        priority: taskToEdit.priority || "Medium",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId("");
    setUpdatedData({
      taskId: "",
      title: "",
      description: "",
      status: "Pending",
      deadline: "",
      priority: "Medium",
    });
  };

  const handleStatusChange = (e, taskId) => {
    const newStatus = e.target.checked ? "Completed" : "Pending";
    setUpdatedData({ ...updatedData, status: newStatus });

    const token = localStorage.getItem("token");

    dispatch(
      updateTask({
        taskId,
        title: updateTask.title,
        description: updateTask.description,
        status: newStatus,
        deadline: updateTask.deadline,
        priority: updateTask.priority,
        token: token,
      })
    )
      .then((result) => {
        console.log("Update Task Result:", result);
      })
      .catch((error) => {
        console.error("Update Task Error:", error);
      });
  };

  const handleDeadlineChange = (e) => {
    setUpdatedData({ ...updatedData, deadline: e.target.value });
  };

  const handlePriorityChange = (e, taskId) => {
    const newPriority = e.target.value;

    // Update priority directly without editing
    const token = localStorage.getItem("token");

    dispatch(
      updateTask({
        taskId,
        title: updateTask.title,
        description: updateTask.description,
        status: updateTask.status,
        deadline: updateTask.deadline,
        priority: newPriority,
        token: token,
      })
    )
      .then((result) => {
        console.log("Update Priority Result:", result);

        // Update local state separately
        updateLocalPriority(taskId, newPriority);
      })
      .catch((error) => {
        console.error("Update Priority Error:", error);
      });
  };

  const updateLocalPriority = (taskId, newPriority) => {
    setUpdatedData((prevData) => {
      const updatedUserData = prevData.userdata.map((task) =>
        task._id === taskId ? { ...task, priority: newPriority } : task
      );

      return { ...prevData, userdata: updatedUserData };
    });
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriorityFilterChange = (newPriorityFilter) => {
    setPriorityFilter(newPriorityFilter);
  };

  return (
    <div>
      <div className="addtasksbackground">
        <h2 className="filter">Filter</h2>
        <div className="filer-style">
          <div>
            {/* Priority select for tasks */}
            <div>
              <label>Filter by Priority:</label>
              <select
                value={priorityFilter}
                onChange={(e) => handlePriorityFilterChange(e.target.value)}
              >
                <option className="title-style2" value="all">
                  All
                </option>
                <option className="title-style2" value="High">
                  High
                </option>
                <option className="title-style2" value="Medium">
                  Medium
                </option>
                <option className="title-style2" value="Low">
                  Low
                </option>
              </select>
            </div>
          </div>
          {/* Filter buttons */}
          <div className="button-filter">
            <button
              className="button-addtask3"
              onClick={() => handleFilterChange("all")}
            >
              All Tasks
            </button>
            <button
              className="button-addtask3"
              onClick={() => handleFilterChange("completed")}
            >
              Completed
            </button>
            <button
              className="button-addtask3"
              onClick={() => handleFilterChange("pending")}
            >
              Pending
            </button>
          </div>
          <div>
            {/* Search input */}
            <input
              type="text"
              placeholder="Search by title or description"
              value={searchTerm}
              onChange={handleSearchTermChange}
              className="title-style2"
            />
          </div>
        </div>
      </div>
  
      <div className="cartecontainer ">
        {filteredAndSortedData.map((el) => (
          <div className="cartinnerbackgrounf" >

          
          <div className="cartinner glassmorphism" key={el._id}>
            {editingTaskId === el._id ? (
              // Render input fields for editing task
              <div className="statusstyle2">
                <input
                  type="text"
                  placeholder="Title"
                  value={updatedData.title}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, title: e.target.value })
                  }
                />
                <textarea                   className="inputp"

                  placeholder="Description"
                  value={updatedData.description}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      description: e.target.value,
                    })
                    
                  }
                />
                <input
                  type="date"
                  name="deadline"
                  value={updatedData.deadline}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, deadline: e.target.value })
                  }
                />
  
                <button
                  className="button-addtask3"
                  onClick={handleUpdateTask}
                >
                  Save
                </button>
                <button
                  className="button-addtask3"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            ) : (
              // Render task details and actions
              <div className="statusstyle">
                <div className="innercarttitle">
                <h1 className={el.status === "Completed" ? "crossed-out" : ""}>
                  {el.title}
                </h1>
                </div>
                <div className="inputdescription">

                
                <h2 className={el.status === "Completed" ? "crossed-out" : ""}>
                  {el.description}
                </h2>
                </div>
                <p>Deadline: {new Date(el.deadline).toLocaleDateString()}</p>
  
                <p className="pa">
                  Status:{" "}
                  <input
                    type="checkbox"
                    checked={el.status === "Completed"}
                    onChange={(e) => handleStatusChange(e, el._id)}
                  />
                </p>
                <div className="prioritystyler ">
                  <label className="labelselcet">Priority:</label>
  
                  {/* Priority select for viewing task */}
                  <select
                    value={el.priority}
                    onChange={(e) => handlePriorityChange(e, el._id)}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <button
                  className="button-addtask4"
                  onClick={() => handleDeleteTask(el._id)}
                >
                  Delete
                </button>
                <button
                  className="button-addtask3"
                  onClick={() => handleEdit(el._id)}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
          </div>

          

        ))}
      </div>
    </div>
  );
            }  