"use strict";
const  express  =  require('express');
const  bodyParser  =  require('body-parser');
const cors = require('cors')
const mysql = require('mysql');
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs');

const SECRET_KEY = "secretkey23456";

const  app  =  express();
const  router  =  express.Router();

app.use(cors());

router.use(bodyParser.urlencoded({ extended:  true }));
router.use(bodyParser.json());

// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'TestDatabase1!',
    database: 'mysql',
	port: 2001
});


const  findUserByEmail  = (email, cb) => {
    return  mc.query('SELECT * FROM user_login WHERE email = ?',[email], (err, row) => {
        cb(err, row);
    });
}


const createUser  = (user, cb) => {
    return  mc.query('INSERT INTO user_login (name, email, password) VALUES (?,?,?)',user, (err) => {
        cb(err)
    });
}


router.get('/', (req, res) => {
    res.status(200).send('This is an authentication server');
});


router.post('/register', (req, res) => {
    //Values from form http://localhost:8100/register
    const  name  =  req.body.name;
    const  email  =  req.body.email;
    const  password  =  bcrypt.hashSync(req.body.password);
    //Works with hardcoded values
    //const  name  =  'Admin';
    //const  email  =  'Admin@test.com';
    //const  password  =  bcrypt.hashSync('test');

    createUser([name, email, password], (err)=>{
        if(err) return  res.status(500).send("Server error!");
        findUserByEmail(email, (err, user)=>{
            if (err) return  res.status(500).send('Server error!');  
            const  expiresIn  =  24  *  60  *  60;
            const  accessToken  =  jwt.sign({ id:  user[0].id }, SECRET_KEY, {
                expiresIn:  expiresIn
            });
            res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn});
        });
    });
});


router.post('/login', (req, res) => {
    const email = req.body.email;
    const form_password = req.body.password;
    //console.log(form_password );
    findUserByEmail(email, (err, user) => {
        if (err) return res.status(500).send({ "message": 'Server error!', "status": '500' });
        if (!user[0]) return res.status(404).send({ "message": 'User not found!', "status": '404' });
        const result = bcrypt.compareSync(form_password, user[0].password);
        if (!result) return res.status(401).send({ "message": 'Password not valid!', "status": '401' });
        //const expiresIn = 24 * 60 * 60;
		const expiresIn = 1;
        const accessToken = jwt.sign({ id: user[0].id }, SECRET_KEY, {
            expiresIn: expiresIn
        });
        res.status(200).send({ "user": user, "access_token": accessToken, "expires_in": expiresIn, "message": 'Success!', "status": '200' });
    });
});


const insertCustomer  = (customer, cb) => {
    return  mc.query('INSERT INTO customer_checkin (firstname, lastname, email, birthday, cellphone, status) VALUES (?,?,?,?,?,?)',customer, (err) => {
        cb(err)
    });
}


router.post('/signature', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const birthday = new Date(req.body.birthday);
    const cellphone = req.body.cellphone;	
    const terms = req.body.terms;
    insertCustomer([firstname, lastname, email, birthday, cellphone, terms], (err, customer) => {
        if (err) return res.status(500).send({ "message": 'Server error!', "status": '500' });
        res.status(200).send({ "message": 'Success!', "status": '200' });
    });
});


app.use(router);
const  port  =  process.env.PORT  ||  3000;
const  server  =  app.listen(port, () => {
    console.log('Server listening at http://localhost:'  +  port);
});