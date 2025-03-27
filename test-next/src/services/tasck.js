import axios from "axios";

const API_URL = "http://localhost:4000/api";

export const getAllTaches = async () => {
    try {
        const response = await axios.get(`${API_URL}/tache`);
        console.log("data", response);
        return response.data;
    } catch (error) {
        console.log("Error fetching tasks:", error);

    }
};
export const addTache = async (taskData) => {
    try {
        const response = await axios.post(`${API_URL}/tache`, taskData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("data", response.data);
        return response.data;
    } catch (error) {
        console.log("Error adding task:", error);

    }
};
export const getTacheById = async (taskId) => {
    try {
        const response = await axios.get(`${API_URL}/tache/${taskId}`);
        console.log("data", response.date);
        return response.data;
    } catch (error) {
        console.log("Error fetching task by ID:", error);

    }
};
export const updateTache = async (taskId, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/tache/${taskId}`, updatedData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("data", response.data);
        return response.data;
    } catch (error) {
        console.log("Error updating task:", error);

    }
};
export const deleteTache = async (taskId) => {
    try {
        const response = await axios.delete(`${API_URL}/tache/${taskId}`);
        console.log(" deleted:", response.data);
        return response.data;
    } catch (error) {
        console.log(" deleting task:", error);
    }
};