const sequelize = require('./index');
const { User, Learner, Payment, Course, UserCourse } = require('./associations');

const sync = (async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synced');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
})();

module.exports = sync;
