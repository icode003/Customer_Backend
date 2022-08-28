const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const UserSchema = new Schema({
    full_name: {
        type: String,
        required: true,
        default: '',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    user_type: {
        type: String,
        enum: ['shop', 'customer']
    },
    mobile_number: {
        type: Number,
        default: null
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: '',
        trim: true,
    },
    token: {
        type: String
    },
    isSuspended: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    },
    id: false,
    toJSON: {
        getters: true
    },
    toObject: {
        getters: true
    },
});

module.exports = mongoose.model('User', UserSchema);