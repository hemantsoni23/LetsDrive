const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Learner = sequelize.define('Learner', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    test_result: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    license_approved: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    reminder_sent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'learners'
});

module.exports = Learner;
