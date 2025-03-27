"use client";
import React, { useState } from "react";

const generateCalendar = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDate = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
    const totalDays = lastDayOfMonth.getDate();

    let days = [];
    let week = [];

    const prevMonthDays = new Date(year, month, 0).getDate();
    let prevMonthDaysToShow = startDate;

    for (let i = prevMonthDays - prevMonthDaysToShow + 1; i <= prevMonthDays; i++) {
        week.push({
            day: i,
            isPrevMonth: true,
            actualDate: new Date(year, month - 1, i)
        });
    }

    for (let i = 1; i <= totalDays; i++) {
        week.push({
            day: i,
            isPrevMonth: false,
            actualDate: new Date(year, month, i)
        });

        if (week.length === 7) {
            days.push(week);
            week = [];
        }
    }

    const nextMonthDaysToShow = 7 - week.length;
    for (let i = 1; i <= nextMonthDaysToShow; i++) {
        week.push({
            day: i,
            isPrevMonth: true,
            actualDate: new Date(year, month + 1, i)
        });
    }

    if (week.length) {
        days.push(week);
    }

    return days;
};

const Calendar = ({ taches, ...props }) => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);
    const [selectedDate, setSelectedDate] = useState(null);
    const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);

    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const days = generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    const dayName = currentDate.toLocaleString('en-US', { weekday: 'long' });
    const handleDateClick = (date) => {

        if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
            setSelectedDate(null);
            setTasksForSelectedDate([]);
        } else {

            setSelectedDate(date);
            const tasksForDate = taches.filter(task => {
                const taskDate = new Date(task.startDate);
                return taskDate.toDateString() === date.toDateString();
            });
            setTasksForSelectedDate(tasksForDate);
        }
    };

    return (
        <div className="container mt-5 card-costum">
            <div className="card-header card-custom border-0 text-black d-flex mb-4 ">
                <h2 className="mb-0 text-center fs-2 text-f mb-2">
                    {dayName}
                </h2>
            </div>
            <div className="card-header card-custom border-0 text-black d-flex justify-content-center align-items-center">
                <h2 className="mb-0 text-center fw-bold fs-2 text-font mb-2">
                    {currentDate.getDate()} , {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
            </div>

            <div className="bg-white border-0 mb-0 mt-4">
                <h2 className="margin-mportant mb-0 text-center fw-small fs-4 mb-4">
                    {months[currentDate.getMonth()]}
                </h2>
            </div>

            <table className="table bg-white border-0">
                <thead>
                    <tr>
                        {daysOfWeek.map((day) => (
                            <th className="border-0" key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {days.map((week, weekIndex) => (
                        <tr key={weekIndex}>
                            {week.map((dayObj, dayIndex) => {
                                const { day, isPrevMonth, actualDate } = dayObj;
                                const isToday = actualDate &&
                                    actualDate.toDateString() === today.toDateString();
                                const isWeekend = dayIndex === 5 || dayIndex === 6; // Sat/Sun
                                const isStartDate = taches.some(task => {
                                    const taskStartDate = new Date(task.startDate);
                                    return taskStartDate.toDateString() === actualDate.toDateString();
                                });

                                return (
                                    <td
                                        key={dayIndex}
                                        className={`day border-0 
                                            ${!day ? 'bg-light' : ''} 
                                            ${isWeekend ? 'weekend' : ''} 
                                            ${isToday ? 'card-today rounded-1 text-white' : ''} 
                                            ${isPrevMonth ? 'prev-month' : ''}`}
                                        onClick={() => handleDateClick(actualDate)} // Handle date click
                                    >
                                        {day}
                                        {isStartDate && <div className="start-dot"></div>}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedDate && (
                <div className="tasks-list mt-4">
                    <h4>Tasks for {selectedDate.toDateString()}</h4>
                    {tasksForSelectedDate.length === 0 ? (
                        <p>No tasks for this day.</p>
                    ) : (
                        <ul>
                            {tasksForSelectedDate.map((task, index) => (
                                <li key={index}>
                                    <strong>{task.taskName}</strong>: {task.taskDetail}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            <style jsx>{`
                .text-font {
                    font-family: Abhaya Libre SemiBold;
                }
                .text-f {
                    color: #F87777;
                    font-family: Island Moments;
                }
                .card-costum {
                    background: transparent !important;
                }
                .card-today {
                    background: #F87777 !important;
                }
                .margin-mportant {
                    margin-bottom: 0 !important;
                }
                .weekend {
                    color: red;
                }
                .prev-month {
                    color: gray;
                    font-style: italic;
                }
                .start-dot {
                    width: 8px;
                    height: 8px;
                    background-color: #F87777;
                    border-radius: 50%;
                    margin: 5px auto 0;
                }
                .day {
                    height: 50px;
                    vertical-align: middle;
                    text-align: center;
                    cursor: pointer;
                }
                .tasks-list {
                    margin-top: 20px;
                    padding: 10px;
                    background-color: #f8f9fa;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
            `}</style>
        </div>
    );
};

export default Calendar;
