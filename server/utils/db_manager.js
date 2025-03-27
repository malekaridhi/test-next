const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const checkDateColor = require('./validate');
async function insertDataToJson(filePath, data) {
    try {
        let id = uuidv4();
        let existingData = [];
        if (fs.existsSync(filePath)) {
            const fileContent = await fs.promises.readFile(filePath, 'utf8');
            existingData = fileContent.trim() ? JSON.parse(fileContent) : [];
        } else {
            await fs.promises.writeFile(filePath, '[]');
        }
        const color = checkDateColor(data.date_end);
        existingData.push({ color, id, ...data, status: "open" });
        await fs.promises.writeFile(filePath, JSON.stringify(existingData, null, 2));
        return { color, id, ...data };
    } catch (error) {
        throw new Error(`Error inserting data: ${error.message}`);
    }
}


async function getDataFromJson(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            return [];
        }
        const fileContent = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        throw new Error(`Error reading data: ${error.message}`);
    }
}
async function getDataByIdFromJson(filePath, id) {
    try {
        if (!fs.existsSync(filePath)) {
            return null;
        }
        const fileContent = await fs.promises.readFile(filePath, 'utf8');
        const data = JSON.parse(fileContent);


        const item = data.find(item => item.id === id);
        return item || null;
    } catch (error) {
        throw new Error(`Error reading data by id: ${error.message}`);
    }
}
async function updateDataByIdInJson(filePath, id, updatedData) {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error('File does not exist');
        }
        const fileContent = await fs.promises.readFile(filePath, 'utf8');
        const data = JSON.parse(fileContent);
        const index = data.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error('Item with specified ID not found');
        }
        data[index] = { ...data[index], ...updatedData };
        const color = checkDateColor(data[index].date_end);
        data[index].color = color;
        await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));

        return data[index];
    } catch (error) {
        throw new Error(`Error updating data: ${error.message}`);
    }
}
async function deleteDataByIdInJson(filePath, id) {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error('File does not exist');
        }

        const fileContent = await fs.promises.readFile(filePath, 'utf8');
        const data = JSON.parse(fileContent);

        const index = data.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error('Item with specified ID not found');
        }

        const deletedItem = data.splice(index, 1)[0];

        await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));

        return deletedItem;
    } catch (error) {
        throw new Error(`Error deleting data: ${error.message}`);
    }
}


module.exports = {
    insertDataToJson,
    getDataFromJson,
    getDataByIdFromJson,
    updateDataByIdInJson,
    deleteDataByIdInJson
};
