const { Types } = require('mongoose');
const {Schema, model} = require('mongoose');

const ReactionsSchema = new Schema(
    {
        reactionsId:{
            type: Schema.Types.ObjectId,
            default:()=> new Types.ObjectId()
        },
    },
    {
        
    },
)