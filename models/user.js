const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: String,
    name: String
})

userSchema.plugin(uniqueValidator)


userSchema.set('toJSON', {
    transform: (document, returedObject) => {
        returedObject.id = returedObject._id.toString()
        delete returedObject._id
        delete returedObject.__v
        delete returedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User