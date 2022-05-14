const express = require('express');
const router = express.Router();
const app = require('../app')
const database = require('../db/db.js');

class UserDetails {
    findUser(req, res) {
        console.log("in find user")
        //what we need
        let userID = req.query.id;
        let query = "";
        if(userID){
            query = `SELECT full_name, email, username, bio FROM users WHERE users.id = '` + userID + `'`;
        }
        //JOIN posts ON posts.user_id = users.id 
        //JOIN messages ON messages.receiver_id = users.id
        //JOIN images ON images.user_id = posts.id

        database.query(query, (err, results, next) => {
            console.log(results)
            if (err){
                res.json({});
            } else{
                res.json({
                    userInfo:results
                });
            }
        });
    }
}

const User = new UserDetails();

router.get('/', (req,res)=>{
    res.render('user');
});
router.get('/json', User.findUser);

module.exports = router;