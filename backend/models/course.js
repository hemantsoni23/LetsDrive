const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Course = sequelize.define('courses', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    course_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    practical_session: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: false
    },
    simulation_session: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: false
    },
    theory_session: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        unsigned: true,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Two', 'Four', 'Both']]
        }
    }
}, {
    createdAt: false,
    updatedAt: false
});

module.exports = Course;