const {User, Learner} = require('../models/associations');

const createLicense = async (req, res) => {
    try {
        // Get the license data from the request body
        const { test_result, type } = req.body;
        
        //User
        const user = await User.findOne({ where: { email: req.user.email }, attributes: { exclude: ['password'] } });

        // Check if the user exists
        if (!user || user.status === 'inactive') {
            return res.status(404).json({ error: 'User not found or User is inactive' });
        }

        const existingLicense = await Learner.findOne({ where: { userId: user.id } });
        if (existingLicense) {
            return res.status(400).json({ error: 'License already exists' });
        }

        // Create a new license
        const newEntry = await Learner.create({
            userId: user.id,
            test_result,
            type
        });

        // Return a success message
        res.status(201).json({ message: 'License created successfully' });
    } catch (error) {
        // Return an error message
        res.status(500).json({ error: 'Failed to create license' });
    }
};

const updateLicense = async (req, res) => {
    try {
        // Get the license ID from the request parameters
        const { id } = req.params;

        // Get the updated license data from the request body
        const { test_result,  type } = req.body;

        // Find the license with the given ID
        const license = await Learner.findByPk(id);

        // Check if the license exists
        if (!license) {
            return res.status(404).json({ error: 'License not found' });
        }

        license.test_result = test_result;
        license.type = type;

        // Save the updated license data
        await license.save();

        // Return a success message
        res.json({ message: 'License updated successfully' });
    } catch (error) {
        // Return an error message
        res.status(500).json({ error: 'Failed to update license' });
    }
}

const manageLicenseApproval = async (req, res) => {
    try {
        const { id } = req.params;
        const { action } = req.body;

        const license = await Learner.findByPk(id);

        if (!license) {
            return res.status(404).json({ error: 'License not found' });
        }

        if (action === 'approve') {
            license.license_approved = true;
        } else if (action === 'reject') {
            license.license_approved = false;
        } else {
            return res.status(400).json({ error: 'Invalid action' });
        }

        await license.save();

        res.json({ message: `License ${action}d successfully` });
    } catch (error) {
        res.status(500).json({ error: `Failed to ${action} license` });
    }
};

const getLicense = async (req, res) => {
    try {
        // Get the license ID from the request parameters
        const { id } = req.params;

        // Find the license with the given ID
        const licenseData = await Learner.findByPk(id);

        // Return the license data
        res.json({ licenseData });
    } catch (error) {
        // Return an error message
        res.status(500).json({ error: 'Failed to fetch license' });
    }
}

module.exports = {
    createLicense,
    updateLicense,
    getLicense,
    manageLicenseApproval
};