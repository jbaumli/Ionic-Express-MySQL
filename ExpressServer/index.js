"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcryptjs');
var compression = require('compression');
var helmet = require('helmet');

const app = express();
const router = express.Router();

var privateKEY = fs.readFileSync('./private.key', 'utf8');
var publicKEY = fs.readFileSync('./public.key', 'utf8');

app.use(cors());
app.use(compression()); //Compress all routes
app.use(helmet());
require('dotenv-safe').config();
router.use(bodyParser.urlencoded({ extended:  true }));
router.use(bodyParser.json());


const mc = mysql.createConnection({
    host: process.env.dbhost,
    user: process.env.dbuser,
    password: process.env.dbpassword,
    database: process.env.dbdatabase,
    port: process.env.dbport
});


const findUserByEmail  = (email, cb) => {
    return  mc.query('SELECT * FROM user_login WHERE email = ?',[email], (err, row) => {
        cb(err, row);
    });
}


const verifyLicenseDetails  = (email, site_id, cb) => {
	var domain = email.substring(email.lastIndexOf("@") +1).toLowerCase();
    return  mc.query('SELECT * FROM license_details WHERE email_domain = ? AND site_id = ? and site_key = ?', [domain, site_id, process.env.site_key], (err, row) => {
        cb(err, row);
    });
}


const verifyLicenseCount  = (email, cb) => {
	var domain = email.substring(email.lastIndexOf("@"));
    return  mc.query('SELECT COUNT(*) as EMAIL_COUNT FROM user_login WHERE email LIKE ?', ['%' + domain], (err, row) => {
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


router.get('/license', (req, res) => {
	res.status(200).send({ "site_id":  "HwXaSFuv", "site_key":  "GWA9TjApcyAKEhnx", "license_limit":  1});
});


router.post('/register', (req, res) => {
	const name  =  req.body.name;
	const email  =  req.body.email;
	const site_id = req.query.site_id; // $_GET["site_id"]
	const password  =  bcrypt.hashSync(req.body.password);
	findUserByEmail(email, (err, user)=>{
		if (user[0]) return res.status(404).send({ "message": 'User already exists!', "status": '404' });	
		verifyLicenseDetails(email, site_id, (err, license) => {
			if (err) return res.status(500).send({ "message": 'License check error!', "status": '500' });	
			if (!license[0]) return res.status(404).send({ "message": 'License not found! Please contact support!', "status": '404' });
			verifyLicenseCount(email, (err, license_count) => {		
				if (license_count[0].EMAIL_COUNT >= license[0].license_limit ) return res.status(404).send({ "message": 'License limit exceeded! Please contact support!', "status": '404' });
				createUser([name, email, password], (err)=>{
					if(err) return  res.status(500).send("Server error!");
					findUserByEmail(email, (err, user)=>{
						if (err) return  res.status(500).send('Server error!');  
						var signOptions = {
							issuer: process.env.site_key,
							subject: "Test",
							//audience: user[0].email,
							expiresIn:  "12h",
							algorithm:  "RS512"
						};
						var token = jwt.sign({ id: user[0].id }, privateKEY, signOptions);			
						user[0].access_token = token;						
						res.status(200).send({ "user": user, "message": 'Success!', "status": '200' });
					});
				});
			});
		});		
	});
});


router.post('/login', (req, res) => {
    const email = req.body.email;
    const form_password = req.body.password;
    findUserByEmail(email, (err, user) => {
        if (err) return res.status(500).send({ "message": 'Server error!', "status": '500' });
        if (!user[0]) return res.status(404).send({ "message": 'User not found!', "status": '404' });
        const result = bcrypt.compareSync(form_password, user[0].password);
        if (!result) return res.status(401).send({ "message": 'Password not valid!', "status": '401' });
		var signOptions = {
			issuer: process.env.site_key,
			subject: "Test",
			//audience: user[0].email,
			expiresIn:  "12h",
			algorithm:  "RS512"
		};
		var token = jwt.sign({ id: user[0].id }, privateKEY, signOptions);			
		user[0].access_token = token;
        res.status(200).send({ "user": user, "message": 'Success!', "status": '200' });
    });
});


const insertCustomer  = (customer, cb) => {
    return  mc.query('INSERT INTO customer_checkin (firstname, lastname, email, birthday, cellphone, status) VALUES (?,?,?,?,?,?)',customer, (err) => {
        cb(err)
    });
}


router.post('/signature', (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).send({ error: 'No credentials sent!', "message": 'Missing credentials, log out and back in!', "status": '403' });
	}
	let token;
	if (req.headers.authorization) {
		let type = req.headers.authorization.split(" ")[0];
		if (type === "Token" || type === "Bearer")
			token = req.headers.authorization.split(" ")[1];
	}
	var verifyOptions = {
		issuer: process.env.site_key,
		subject: "Test",
		//audience: user[0].email,
		expiresIn:  "12h",
		algorithm:  "RS512"
	};
	var legit = jwt.verify(token, publicKEY, verifyOptions);
	if (!legit) {
		return res.status(403).send({ error: 'No credentials sent!', "message": 'Missing credentials, log out and back in!', "status": '403' });
	}
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