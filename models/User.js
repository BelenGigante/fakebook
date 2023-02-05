const { Schema, Types , model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Must match email add'],
        },
        thoughts:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
            {
                type: Schema.Types.ObjectId,
                ref: 'reactionSchema',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const User = model('User', userSchema);

module.exports = User;