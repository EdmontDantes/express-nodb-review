const express = require('express');
const router = express.Router();
const users = require('../models/Users')

//sends string to browser
router.get('/', (req, res) => {
    if( users.length === 0) {
    return res.status(404).json({ confirmation: 'fail', message: 'No Users Found' });
    }
    return res.status(200).json({ confirmation: 'success', users });
});

router.get('/:id', (req, res) => {
    const user = users.filter((user) => user.id === req.params.id);
    if(user.length === 0) {
        return res
            .status(404)
            .json({ confirmation: 'failed', message: 'User Not Found' });
    }
    return res.status(200).json({ confirmation: 'success', user });
});


//create user think about it post body | post body
router.post('/', (req, res) => {
    // return res.json(req.body); using Postman imitating
    
    if(!req.body.name || !req.body.email || !req.body.password) {
        return res
        .status(400)
        .json({confirmation: 'failed', message: 'You must fill in all inputs' });
    }
    
    const user = users.filter((user) => user.email === req.body.email);
    
    if(user.length > 0) {
        return res
        .status(400)
            .json({ confirmation: 'fail', message: 'User Already exists'});
        } else {
            let newUser = {};
            
            newUser.id = Date.now().toString();
            newUser.name = req.body.name
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            users.push(newUser);
    
            return res.status(201).json({ message: 'User Created', users });
    }
    

    
})

//update user
router.put('/:id', (req, res) => {
    const user = users.filter((user) => user.id === req.body.id);
    let updatedUser = req.body;
    if(user.length > 0) {
        user.name = updatedUser.name ? updatedUser.name :  user.name;
        user.email = updatedUser.email ? updatedUser.email : user.email;
    }
    return res.json({ message: 'User Updated', updatedUser});
    
});



// //delete user
router.delete('/:id', (req, res) => {
    const user = users.filter((user) => user.id !== req.params.id)
    return res.status(200).json({message: 'User Deleted' , user})
})


module.exports = router;