const mongoose = require('mongoose')
const validator = require('validator')



const User = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true, 
            unique: true
        },
        email: {
            type: String,
            required: true, 
             unique: true,
             //validating the email id of the user
            validator(value){
                if(!validator.isEmail(value)){
                    throw new error("Email is invalid");
                }
            }
            },
        password: { 
            type: String, 
            required: true 
        },
        role: {
             type: String,
              required: true 
            },
        coursescompleted: {
             type: Number, 
             required: true
            },
        coursespending: { 
            type: Number, 
            required: true 
        }
    },
    { collection: 'user' }

)

   const model = mongoose.model('UserData', User)

   module.exports = model
