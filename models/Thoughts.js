const {Schema, model } = require('mongoose');


const thoughtsSchema = new Schema(
    {

    }
);

const Thoughts = model ('Thoughts', thoughtsSchema);
