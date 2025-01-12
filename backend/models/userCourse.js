const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const UserCourse = sequelize.define('UserCourse', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'users',
            key: 'email',
        },
    },
    courseName: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'courses',
            key: 'course_name',
        },
    },
    paymentId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'payments',
            key: 'payment_id',
        },
    },
  enrolledDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Active', 
  },
}, {
  tableName: 'user_courses',
  timestamps: true, 
});

module.exports = UserCourse;
