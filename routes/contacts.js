const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const {check, validationResult} = require('express-validator');

const user = require('../models/User');
const Contact = require('../models/Contact');

//@route get contacts/api
//@desc Get all user contacts
//@access Private
router.get('/', auth, async (req, res) => {
   try {
            const contacts = await Contact.find({ user: req.user.id}).sort({ date: -1});
            res.json(contacts);
        } catch (err) {
       console.error(err.message);
       res.status(500).send('server Error');
   }
});

//@route Post contacts/api
//@desc Add Contact
//@access Private
router.post('/', [auth, [
    check('name', 'name is required').not().isEmpty()
]],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(401).json({errors: errors.array()});
    }
    const{ name, email, phone, type} = req.body

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user:req.user.id
        });
        const contact = await newContact.save();

        res.json( contact );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

//@route put contacts/api
//@desc Update contact
//@access Private
router.put('/:id', auth, async (req, res) => {
    const {name, email, phone, type} = req.body;
// Build contact object
 let  ContactFields = {};

 if(name) ContactFields.name =name;
 if(email) ContactFields.email=email;
 if(phone) ContactFields.phone=phone;
 if(type) ContactFields.type=type;
 try {
        let contact = await Contact.findById(req.params.id)
        if(!contact) res.status(404).json({msg: 'contact not found'});

        //make sure user own contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'not authorized '});
        }
        contact = await Contact.findByIdAndUpdate(req.params.id,
        { $set :ContactFields },
        { new: true});
        res.json(contact)

    } catch (err) {
        console.error(err.message);
        res.status(500).json('server error');
        
    }
});

//@route Delete contacts/api
//@desc Delete contact
//@access Private
router.delete('/:id', auth, async (req, res) => {
    
    try {
        let contact = await Contact.findById(req.params.id)
        if(!contact) res.status(404).json({msg: 'contact not found'});

        //make sure user own contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'not authorized '});
        }
        await Contact.findByIdAndRemove(req.params.id);  
        res.json({msg:'contact removed'});

    } catch (err) {
        console.error(err.message);
        res.status(500).json('server error');   
    }
});

module.exports = router;