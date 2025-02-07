const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller for user registration
const register = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    // Add validations for email, password, first_name, last_name, phone_number, dob
    if (!email || !password ) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        // Password hashing
        const hashPass = await bcrypt.hash(password, 10);

        const authUser = { email: email, role:'user' };
         // Generate tokens
        const accessToken = jwt.sign(authUser, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign(authUser, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        // Example code to create a new user using the User model
        const newUser = await User.create({
            email,
            password: hashPass,
            refresh_token: refreshToken
        });
        
        res.status(200).json({accessToken, refreshToken, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'User Already Exist !!' });
    }
};

// Controller for user login
const login = async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);

    // Add validation for email and password
    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password' });
    }

    try {
        // Check if the user exists in the database
        const existingUser = await User.findOne({ where:{email} });
        if (!existingUser) {
            return res.status(400).json({ error: 'User does not exist' });
        }
        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Incorrect password' });
        }
        const authUser = { email: existingUser.email, role:existingUser.role };

        // Generate tokens
        const accessToken = jwt.sign(authUser, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign(authUser, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        // Store refresh token in database
        existingUser.refresh_token = refreshToken;
        await existingUser.save();

        res.status(200).json({ accessToken:accessToken, refreshToken:refreshToken, role:existingUser.role, message: 'User logged in successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const profile = async (req, res) => {
    try {
        console.log(req.user);
        // Find the user based on req.user.email
        const user = await User.findOne({ where: { email: req.user.email }, attributes: { exclude: ['password'] } });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the user details
        res.status(200).send( user );
    } catch (error) {
        res.status(500).json({ error:error });
    }
};

//Update user profile route
const updateProfile = async (req, res) => {
    const { first_name, last_name, phone_number, dob, address } = req.body;

    // Add validation for email, first_name, last_name, phone_number, dob
    if (!first_name || !last_name || !phone_number || !dob) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        // Find the user based on req.user.email
        const user = await User.findOne({ where: { email: req.user.email } });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user's profile
        user.first_name = first_name;
        user.last_name = last_name;
        user.phone_number = phone_number;
        user.dob = new Date(dob);
        user.address = address;

        await user.save();

        // Return a success message
        res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user profile' });
    }
}

// Controller for resetting user password
const resetPassword = async (req, res) => {
    const email = req.user.email;
    const newPassword = req.body.newPassword;

    // Add validation for email and newPassword
    if (!email || !newPassword) {
        return res.status(400).json({ error: 'Please provide email and new password' });
    }

    try {
        // Check if the user exists in the database
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        // Update the user's password
        const hashPass = await bcrypt.hash(newPassword, 10);
        existingUser.password = hashPass;
        await existingUser.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reset password' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        // Find all users
        const users = await User.findAll({ attributes: { exclude: ['password'] } });

        // Return the users
        res.status(200).send(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
}

const updateStatus = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the user with the given ID
        const user = await User.findByPk(id);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user's status
        user.status = user.status === 'active' ? 'inactive' : 'active';
        await user.save();

        // Return a success message
        res.status(200).json({ message: 'User status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user status' });
    }

}

const checkAdmin = async (req, res) => {
    try {
        const isAdmin = req.user.role === 'admin';
        // Return true if the user is an admin, else return false
        res.status(200).send( isAdmin );
    } catch (error) {
        res.status(500).json({ error: 'Failed to check admin status' });
    }
}

const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(403).json({ error: 'Refresh token required' });

    try {
        const user = await User.findOne({ where: { refresh_token: refreshToken } });
        if (!user) return res.status(403).json({ error: 'Invalid refresh token' });

        // Verify refresh token
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, authUser) => {
            if (err) return res.status(403).json({ error: 'Token expired' });

            // Generate a new access token
            const newAccessToken = jwt.sign({ email: authUser.email, role: authUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('accessToken', newAccessToken, { httpOnly: true, maxAge: 60 * 60 * 1000 });
            res.cookie('role', authUser.role, { maxAge: 7 * 24 * 60 * 60 * 1000 });
            res.cookie('email', authUser.email, { maxAge: 7 * 24 * 60 * 60 * 1000 });
            res.status(200).json({ message: 'Token refreshed' });
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const logout = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) return res.status(400).json({ error: 'No token found' });

        try {
        const user = await User.findOne({ where: { refresh_token: refreshToken } });
        if (user) {
            user.refresh_token = null;
            await user.save();
        }

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
};



module.exports = {
    register,
    login,
    profile,
    updateProfile,
    resetPassword,
    getAllUsers,
    updateStatus,
    checkAdmin,
    refreshToken,
    logout
};