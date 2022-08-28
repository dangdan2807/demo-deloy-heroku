const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        _id: { type: Number },
        firstName: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 255,
            default: 'Anonymous'
        },
        lastName: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 255,
            default: ''
        },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isActive: { type: Boolean, default: true },
        deleted: { type: Boolean, default: false },
    },
    {
        _id: false,
        timestamps: true,
    },
);

UserSchema.plugin(AutoIncrement, {
    id: 'user_id',
    inc_field: '_id',
});

module.exports = mongoose.model('User', UserSchema);
