const User = require('./user');
const Learner = require('./learner');
const Payment = require('./payment');
const UserCourse = require('./userCourse');
const Course = require('./course');

// User and Learner Association
User.hasOne(Learner, { foreignKey: 'userId' });
Learner.belongsTo(User, { foreignKey: 'userId' });

// User and Payment Association
Payment.belongsTo(User, { foreignKey: 'user_email', targetKey: 'email', as: 'user' });
User.hasMany(Payment, { foreignKey: 'user_email', sourceKey: 'email', as: 'payments' });

// UserCourse Associations
// User.hasMany(UserCourse, { foreignKey: 'userEmail', sourceKey: 'email', as: 'appliedCourses' });
// UserCourse.belongsTo(User, { foreignKey: 'userEmail', targetKey: 'email', as: 'user' });

// Course.hasMany(UserCourse, { foreignKey: 'courseName', sourceKey:"course_name", as: 'enrolledUsers' });
// UserCourse.belongsTo(Course, { foreignKey: 'courseName',targetKey:"course_name", as: 'course' });

// Payment.hasOne(UserCourse, { foreignKey: 'paymentId', sourceKey: 'payment_id', as: 'userCourse' });
// UserCourse.belongsTo(Payment, { foreignKey: 'paymentId', targetKey: 'payment_id', as: 'payment' });

module.exports = {
  User,
  Learner,
  Payment,
  UserCourse,
  Course,
};
