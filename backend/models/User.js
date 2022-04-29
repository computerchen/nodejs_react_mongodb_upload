const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema(
    {
        profileImg: {
            type:String
        }
    },{
        collation:'users'
    }
)

module.exports = mongoose.model('User',userSchema)