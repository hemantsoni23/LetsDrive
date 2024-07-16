const User = require('./user');
const Learner = require('./learner');

User.hasOne(Learner, { foreignKey: 'userId' });
Learner.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    User,
    Learner
};
