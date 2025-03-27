const { insertDataToJson, getDataByIdFromJson, getDataFromJson, updateDataByIdInJson, deleteDataByIdInJson } = require('./utils/db_manager')
const path = require('path');
const fs = require('fs');  // Fixed: properly require fs module
const os = require('os');

function findDbFile() {
  const possiblePaths = [

    process.env.DB_JSON_PATH,

    path.join(process.cwd(), 'db.json'),

    path.join(__dirname, 'db.json'),

    path.join(__dirname, 'data', 'db.json'),

    path.join(os.homedir(), '.your-app', 'db.json')
  ];

  for (const filePath of possiblePaths) {
    if (filePath && fs.existsSync(filePath)) {
      return filePath;
    }
  }

  return path.join(process.cwd(), 'db.json');
}

const dbFilePath = findDbFile();
console.log(`Using DB file at: ${dbFilePath}`);


const filePath = dbFilePath
// const filePath = 'C:\\Users\\PC\\Downloads\\malekk\\test-malek\\test-next\\server\\db.json';
const TacheController = {
  getAllTache: async (req, res) => {
    try {
      const tache = await getDataFromJson(filePath);
      res.status(200).json(tache);
    }
    catch (error) {
      res.status(500).json({ error: "Error in getting task" });
    }
  },

  addTache: async (req, res) => {
    try {
      const today = new Date();
      const endDate = new Date();
      endDate.setMonth(today.getMonth() + 1)
      const newTask = {
        ...req.body,
        startDate: today.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      };
      const tache = await insertDataToJson(filePath, newTask);
      res.status(201).json(tache);
    } catch (error) {
      res.status(500).json({ error: "Error in adding task", e: error });
      console.log("error", error);
    }
  },

  getTAchById: async (req, res) => {
    try {
      const tache = await getDataByIdFromJson(filePath, req.params.id);
      res.status(200).json(tache);
    } catch (error) {
      res.status(500).json({ error: "Error in getting task" });
    }
  },
  UpdateTache: async (req, res) => {
    try {
      const tache = await updateDataByIdInJson(filePath, req.params.id, req.body);
      res.status(200).json(tache);
    } catch (error) {
      res.status(500).json({ error: "Error in updating task" });
    }
  },
  DeleteTache: async (req, res) => {
    try {
      const deletedTache = await deleteDataByIdInJson(filePath, req.params.id);
      if (!deletedTache) {
        return res.status(404).json({ error: " not found" });
      }
      res.status(200).json({ message: " deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "error " });
    }
  },

}
module.exports = TacheController;