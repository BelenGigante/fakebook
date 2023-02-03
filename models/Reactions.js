const { Types } = require('mongoose');
const { Schema, model } = require('mongoose');

const ReactionsSchema = new Schema(
    {
        reactionsId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
    },
    {
        reactionsBody: {
            type: String,
            required: true,
            maxlenght: 280,
        },
    },
    {
        username: {
            type: String,
            required: true,
        },
    },
    {
        //missing getter to format timestamp 
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters:true
        }
    },
);

const Reactions = model('Reactions', ReactionsSchema);

module.exports = Reactions;