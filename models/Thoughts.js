const { Schema, model } = require('mongoose');


const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlenght: 280,
            minlenght: 1,
        },
    },
    {
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        username: {
            type: String,
            required: true,
        },
    },
    {
        reactions: [ReactionsSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    },
);

const Thoughts = model('Thoughts', thoughtsSchema);
module.exports = Thoughts;