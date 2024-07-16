const express = require('express');
const authUser = require('../middlewares/authUser');
const licenseController = require('../controllers/licenseControllers');


const router = express.Router();

// Create a new license
router.post('/create', authUser, licenseController.createLicense);

// Update an existing license
router.put('/update/:id', licenseController.updateLicense);

// Approve or reject license
router.put('/approve/:id', licenseController.manageLicenseApproval);

// Read a license
router.get('/get/:id', licenseController.getLicense);

module.exports = router;