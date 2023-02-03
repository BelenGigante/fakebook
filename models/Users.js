const {Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {

    }
);

const Users = model('Users',usersSchema)