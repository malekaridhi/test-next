import React, { useState } from 'react'
import { addTache } from "@/services/tasck.js"
function SearchBar({ reload, ...props }) {
  const [taskName, setTaskName] = useState("");
  const [taskDetail, setTaskDetail] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName.trim() || !taskDetail.trim()) return;
    const newTask = { taskName, taskDetail };

    const result = await addTache(newTask);
    if (result) {
      console.log("task added success");
      reload(true)
      setTaskName("");
      setTaskDetail("");
    } else {
      console.log("failed");
    }
  };

  return (
    <div className='row'>
      <div className="col-md-3">
        <input type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="form-control w-100 search-input border-0 rounded-2 px-3 py-3" placeholder=" type Title of task" />
      </div>
      <div className="col-md-7">
        <input type="text"
          value={taskDetail}
          onChange={(e) => setTaskDetail(e.target.value)}
          className="form-control w-100 search-input border-0 rounded-2 px-3 py-3" placeholder="Detail of your task" />
      </div>
      <div className="col-md-2 custom-btn d-flex justify-content-center align-items-center custom-rdus">
        <button onClick={handleSubmit} className='btn w-100 py-2 text-white '>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='white'>
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
          </svg>
        </button>
      </div>
      <style jsx>{`
        .search-input {
        
          background-color: #DBE2EF;
        
        }

        .search-input:focus {
          outline: none;
          box-shadow: none;
        }
          .custom-btn{
          background-color: #4B7F57;
        }
          .custom-rdus{
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 10px; 
  border-bottom-right-radius: 10px; 
}
      `}</style>
    </div>
  )
}

export default SearchBar