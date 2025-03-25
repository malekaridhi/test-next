import React from 'react'

function Tascks() {
  return (
    <div className="row mt-4">
      <div className="row ">
        <div className="col-md-4 d-flex gap-3">
          <div className="container-left px-4 py-3 rounded w-50">Box 1</div>
          <div className="container-left px-4 py-3 rounded w-50">Box 2</div>
        </div>
        <div className="col-md-8 d-flex justify-content-end">
          <div className="input-group">
            <input
              type="text"
              className="form-control border-0 rounded-start px-3"
              placeholder="Search"
              
            />
            <span className="input-group-text bg-white border-0">
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12 py-5">
        </div>
      </div>

      <style jsx>{`
        .container-left {
          background-color: #F0D1A8;
          color: #4B332F;
        }
      `}</style>
    </div>
  );
}

export default Tascks;
