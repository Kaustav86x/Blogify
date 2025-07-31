const Contact = require('../models/contactSchema')
const validator = require('validator')

const contactUs = async(req, res) => {

    const {name, email, message} = req.body;

    try {
        if(!validator.isEmail(email)){
            throw new Error('Invalid email');
        }

        const mail = await Contact.findOne({ email });

        if(mail) {
            throw new Error('Email already exists');
        }

        const user = await Contact.create({ name: name, email: email, message: message });

        // await contactUs(user)

        //saving the user data
        res.status(200).json({ message: 'Details saved'});

    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { contactUs }