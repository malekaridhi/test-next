const express = require('express');
const router = express.Router();
const TacheController = require('./tache.controller')

router.get('/tache', TacheController.getAllTache);

router.post('/tache', TacheController.addTache);
router.get('/tache/:id', TacheController.getTAchById);
router.put('/tache/:id', TacheController.UpdateTache);
router.delete('/tache/:id', TacheController.DeleteTache);

/* 


router.put('/tache', async (req, res) => {
  try {
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/tache', async (req, res) => {
  try {
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); */

module.exports = router;
