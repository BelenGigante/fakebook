const { Schema,Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionsId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionsBody: {
            type: String,
            required: true,
            maxlenght: 280,
        },
        username: {
            type: String,
            required: true,
        },
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


module.exports = reactionSchema;