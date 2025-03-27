import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { deleteTache, updateTache } from '@/services/tasck';

function Tascks({ taches, reload, ...props }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTaches, setFilteredTaches] = useState(taches);
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredTaches(taches);
    } else {
      const filtered = taches.filter(task =>
        task.taskName.toLowerCase().includes(term.toLowerCase()) ||
        (task.taskDetail && task.taskDetail.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredTaches(filtered);
    }
  };
  useEffect(() => {
    setFilteredTaches(taches);
    handleSearch(searchTerm);
  }, [taches]);
  const handleSaveChanges = async () => {
    try {
      await updateTache(selectedTask.id, selectedTask);
      reload(true);
      setShowModal(false);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTache(taskId);
      reload(true)
      console.log(" deleting task: sucess");
    } catch (error) {
      console.log("err deleting task:", error);
    }
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };



  return (
    <div className=" mt-4">

      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: '#F0D1A8', color: '#4B332F' }}>
              <h5 className="modal-title">Edit Task</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              {selectedTask && (
                <form>
                  <div className="mb-3">
                    <label htmlFor="taskName" className="form-label">Task Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="taskName"
                      value={selectedTask.taskName || ''}
                      onChange={(e) => setSelectedTask({ ...selectedTask, taskName: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="taskDetail" className="form-label">Task Details</label>
                    <textarea
                      className="form-control"
                      id="taskDetail"
                      rows="3"
                      value={selectedTask.taskDetail || ''}
                      onChange={(e) => setSelectedTask({ ...selectedTask, taskDetail: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="startDate" className="form-label">Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="startDate"
                        value={selectedTask.startDate || ''}
                        onChange={(e) => setSelectedTask({ ...selectedTask, startDate: e.target.value })}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="endDate" className="form-label">Due Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="endDate"
                        value={selectedTask.endDate || ''}
                        onChange={(e) => setSelectedTask({ ...selectedTask, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                      className="form-select"
                      id="status"
                      value={selectedTask.status || ''}
                      onChange={(e) => setSelectedTask({ ...selectedTask, status: e.target.value })}
                    >
                      <option value="Not Started">complete</option>
                      <option value="In Progress">open</option>
                      <option value="Completed">pending</option>
                    </select>
                  </div>
                </form>
              )}
            </div>
            <div className="modal-footer" style={{ backgroundColor: '#F0D1A8' }}>
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              <button type="button" className="btn btn-primary" style={{ backgroundColor: '#4B332F', borderColor: '#4B332F' }} onClick={handleSaveChanges}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}

      {/* Rest of your existing code */}
      <div className="row ">
        <div className="col-md-5 d-flex gap-3">
          <div className="w-75 container-left px-2 py-2 rounded d-flex rounded-0 flex-row justify-content-between align-items-center">
            <div className='fs-6 text-center fw-bold bg-text'>By category</div>
            <span className="border-0 ">
              <Image src="image/Vector (1).svg" alt="Logo" width={24} height={24} />
            </span>
          </div>
          <div className="w-75 container-left  rounded-0 px-1 py-1 rounded d-flex flex-row justify-content-between align-items-center">
            <div className='fs-6 text-center fw-bold bg-text'>By priority</div>
            <span className="border-0 ">
              <Image src="image/Vector (1).svg" alt="Logo" width={24} height={24} />
            </span>
          </div>
        </div>
        <div className="col-md-4 d-flex gap-3">

        </div>
        <div className="col-md-3 d-flex container-r" >
          <div className="input-group search-r">
            <input
              type="text"
              className="form-control border-0"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <span className="input-group-text bg-white border-0 pe-2">
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 py-5">
          <div className="row g-3">
            {filteredTaches.map((task, index) => (
              <div key={index} className="col-md-6">
                <div className="container-all px-3 py-2 rounded-2 d-flex justify-content-between align-items-center align-items-stretch h-100" style={{ backgroundColor: `${task.color}` }}  >
                  <div className='d-flex flex-column align-items-start justify-content-between py-3'>

                    <div className='text-start fw-bold bg-text-tasck mb-3' >{task.taskName}</div>
                    <div className='text-start mb-3 bg-desc flex-grow-1'>{task.taskDetail}</div>
                    <div className='text-start fw-bold bg-text-tasck '>Start date : {task.startDate}</div>
                    <div className='text-start fw-bold mb-3 bg-text-tasck '>Due date : {task.endDate}</div>
                    <div className='text-start fw-bold bg-text-tasck '>{task.status}</div>

                  </div>
                  <div>
                    <div className='d-flex flex-column align-items-start py-3'>
                      <div className='mb-3' ><svg
                        width="20" height="20" fill='#4B332F' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" /></svg></div>
                      <div className=' mb-3' onClick={() => handleEditClick(task)}>
                        <Image src="/image/Group 127.svg" alt="Logo" width={24} height={24} />
                      </div>
                      <div className='' onClick={() => handleDelete(task.id)}>
                        <Image src="/image/Vector (2).svg" alt="Logo" width={24} height={24} />
                      </div>
                      <div className=''></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .container-left {
          background-color: #F0D1A8;
          color: #4B332F;
        }
        .container-all {
          background-color: #F0D1A8;
          color: #4B332F;
        }
        .search-r {
          border: 2px solid #F0D1A8;
          border-radius: 24px;
          padding: 4px 8px;
          height: 40px;
        }
        .search-r .form-control {
          height: 100%;
          padding: 0 12px;
          background: transparent;
        }
        .search-r .input-group-text {
          padding: 0;
          background: transparent !important;
        }
        .search-r:focus-within {
          border-color: #4B332F;
          box-shadow: none;
        }
        .bg-text{
          color:#4B332F
        }
        .bg-text-tasck{
          color:#3A3A36
        }
        .bg-desc{
          color:#5C5C57E5
        }
        .task-details {
          height: 200px; 
          overflow-y: auto; 
        }
        .modal-content {
          border: 2px solid #4B332F;
        }
      `}</style>
    </div>
  );
}

export default Tascks;