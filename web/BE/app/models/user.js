const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { 
        type: String, 
        required: true 
    },
    _id: mongoose.Schema.Types.ObjectId
    // username: {
    //     type: String,
    //     required :true
    // },
    // fullname: {
    //     type: String,
    //     required: true
    // },
    // phone: {
    //     type: String,
    //     required: true
    // },
    // address: {
    //     type: String, 
    //     required: true
    // }

});

module.exports = mongoose.model('User', userSchema);