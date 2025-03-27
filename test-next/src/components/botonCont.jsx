
"use client";
import React from 'react'
import Image from "next/image";

function Container({ Tascks, complete, pending, ...props }) {
    return (
        <div className='row gap-5 '>
            <div className="box-1 d-flex flex-column  col-md-2 border-0 shadow p-4 mb-5 bg-body rounded-4  align-items-center justify-content-center">
                <p className='fw-medium fs-4 text-uppercase'>COMPLETED TASKS</p>
                <p className='fw-bold fs-1'>{complete}</p>
            </div>
            <div className=" box-2 d-flex  flex-column col-md-2 border-0 shadow p-4 mb-5 bg-body rounded-4  align-items-center justify-content-center">
                <p className='fw-medium fs-4 text-uppercase'>Pending TASKS</p>
                <p className='fw-bold fs-1'>{pending}</p>
            </div>
            <div className=" box-3  gap-5 d-flex flex-row col-md-7 border-0 shadow p-2 mb-5 bg-body rounded-4  align-items-center justify-content-center">
                <p className='box-text fw-medium fs-4 text-uppercase'>TASKS CREATED</p>
                <p className='fw-bold fs-1'>{Tascks}</p>
            </div>
            <style jsx>{`
        .box-3 {
         min-height: 102px;
        }
         .box-2 {
         min-height: 102px;
         background-color:#C4A49F !important;
        }
         .box-1 {
         min-height: 102px;
         background-color: #F0D1A8 !important;
        }
        .box-text{
            color: #0B87AC !important;
        }
      `}</style>
        </div>

    )
}

export default Container