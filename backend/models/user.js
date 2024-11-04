const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING,
    },
    phone_number: {
        type: DataTypes.STRING,
        unique: true,
    },
    dob: {
        type: DataTypes.DATEONLY,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active'
    },
    address: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'users',
    createdAt: false,
    updatedAt: false
});

module.exports = User;
