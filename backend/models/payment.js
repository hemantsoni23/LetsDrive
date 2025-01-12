const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    payment_id: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    order_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    receipt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'users',
            key: 'email',
        },
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'INR',
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'created', 
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    razorpay_signature: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    failure_reason: {
        type: DataTypes.TEXT,
        allowNull: true, 
    },
    customization: {
        type: DataTypes.JSON, 
        allowNull: true,
    },
}, {
    tableName: 'payments',
    timestamps: true, 
});


module.exports = Payment;
