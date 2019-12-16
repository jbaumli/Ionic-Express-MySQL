# Ionic 4 + Express + MySQL

This project is a mobile application that allows an admin, once authenticated, to collect and submit onsite user data.<br/>
An example of this would be a kiosk mounted tablet that collects a user's agreement that they read a legal notice.<br/>
An admin user must first register and log in, then the application is ready to collect the input data.<br/>
The project as its laid out here will run on a Windows PC.  Moving the individual parts to a cloud based environment will require some conversion.<br/>

### Project Structure

This project is made up of 3 distinct parts:<br/>
- [ ] frontend - Using Ionic 4 (mobile app framework)<br/>
- [ ] backend - Using Express (web application framework for Node.js)<br/>
- [ ] database - Using MySQL (relational database management system)<br/>

### Initial Project Setup

Create a new directory for the project, open a command prompt, and go to it<br/>
C:\>`mkdir Ionic-Express-MySQL`<br/>

Change to the new directory:<br/>
C:\>`cd C:\Ionic-Express-MySQL`

Verify pre-requisites:<br/>
C:\Ionic-Express-MySQL>`npm --version`<br/>
*6.11.3*<br/>
C:\Ionic-Express-MySQL>`node --version`<br/>
*v10.16.2*

### Ionic 4 Install and Setup
C:\Ionic-Express-MySQL>`npm install -g ionic cordova`<br/>
C:\Ionic-Express-MySQL>`ionic start IonicForm blank --type=angular`<br/>
C:\Ionic-Express-MySQL>`cd .\IonicForm`<br/>
C:\Ionic-Express-MySQL\IonicForm>`npm install @ionic/storage`<br/>
C:\Ionic-Express-MySQL\IonicForm>`npm install @ionic-native/file`<br/>
C:\Ionic-Express-MySQL\IonicForm>`npm install @swimlane/ngx-datatable`<br/>
C:\Ionic-Express-MySQL\IonicForm>`ionic generate interface public/user`<br/>
C:\Ionic-Express-MySQL\IonicForm>`ionic generate interface public/auth-response`<br/>
C:\Ionic-Express-MySQL\IonicForm>`ionic generate page public/login`<br/>
C:\Ionic-Express-MySQL\IonicForm>`ionic generate page public/register`<br/>
C:\Ionic-Express-MySQL\IonicForm>`ionic generate page members/dashboard`<br/>
C:\Ionic-Express-MySQL\IonicForm>`ionic generate page members/disclaimer`<br/>
C:\Ionic-Express-MySQL\IonicForm>`ionic generate page members/download`<br/>
C:\Ionic-Express-MySQL\IonicForm>`ionic generate page members/license`<br/>
C:\Ionic-Express-MySQL\IonicForm>`ionic generate page members/signature`<br/>
C:\Ionic-Express-MySQL\IonicForm>`ionic generate service services/authentication`<br/>
C:\Ionic-Express-MySQL\IonicForm>`ionic generate guard guards/auth`<br/>
*(\* Use CanActivate as the option)*<br/>
C:\Ionic-Express-MySQL\IonicForm>`ionic generate guard guards/nonauth`<br/>
*(\* Use CanActivate as the option)*<br/>
C:\Ionic-Express-MySQL\IonicForm>`ionic generate module members/member-routing –flat`<br/>
C:\Ionic-Express-MySQL\IonicForm>`mkdir src\assets\img`<br/>
C:\Ionic-Express-MySQL-Node\IonicForm>`ionic cordova plugin add cordova-plugin-file`<br/>
*(\* Overwrite: y)*<br/>

### Express Install and Setup
C:\Ionic-Express-MySQL>`mkdir ExpressServer`<br/>
C:\Ionic-Express-MySQL>`cd .\ExpressServer`<br/>
C:\Ionic-Express-MySQL\ExpressServer>`npm init –y`<br/>
C:\Ionic-Express-MySQL\ExpressServer>`npm install express body-parser mysql bcryptjs jsonwebtoken cors compression helmet dotenv-safe fs`<br/>
Create and edit *C:\Ionic-Express-MySQL\ExpressServer\jwt-module.js*<br/>
Create *C:\Ionic-Express-MySQL\ExpressServer\index.js* file and define database connection and routes<br/>
Edit *C:\Ionic-Express-MySQL\ExpressServer\package.json* to add start script:<br/>
```javascript
  "scripts": {
    "start": "node index.js"
  },
```  
A .env file will need to be created based off of .env.example with your own values.<br/>
Create a 1024 bit key, copy contents into files public.key and private.key in the root express directory.<br/>

### MySQL Setup
Create mysql database and customer_checkin, user_login, and license_details tables<br/>
*(Steps to install MySQL have been left out of this guide.)*
```sql
CREATE TABLE `customer_checkin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(75) NOT NULL,
  `lastname` varchar(75) NOT NULL,
  `email` varchar(125) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `cellphone` varchar(15) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `comments` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
CREATE TABLE `user_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(75) NOT NULL,
  `email` varchar(125) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
CREATE TABLE `license_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` varchar(75) NOT NULL,
  `site_key` varchar(125) NOT NULL,
  `email_domain` varchar(75) NOT NULL,
  `license_limit` INT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
```  

### Running the Application

Start express (In first command window):<br/>
C:\>`cd C:\Ionic-Express-MySQL\ExpressServer`<br/>
C:\Ionic-Express-MySQL\ExpressServer>`npm start`<br/><br/>
Start ionic (In second command window):<br/>
C:\>`cd C:\Ionic-Express-MySQL\IonicForm`<br/>
C:\Ionic-ExpressMySQL\IonicForm>`ionic serve`<br/>
Open browser to [http://localhost:8100](http://localhost:8100) (may open by default)<br/>

### Functional Notes

For an admin to register an account, several values must be in place in the license_details table.<br/>
* site_id: must match value in Ionic's /src/environments files.
* site_key: must match value in Express's .env file.
* email_domain: must match the domain of the email that is being input into Ionic's registration form.
* license_limit: the number of users in the user_login table with a matching email domain of the one being registered, must not exceed this value. 

### Deploying the frontend (Ionic) to AWS Amplify

Condensed instructions using AWS CLI - use your environment settings for all prompts<br/>
In a Windows Command Prompt window<br/>
C:\>`cd C:\Ionic-Express-MySQL\IonicForm`<br/>
<br/>
C:\Ionic-Express-MySQL\IonicForm>`npm install -g @aws-amplify/cli`<br/>
<br/>
<br/>
C:\Ionic-Express-MySQL\IonicForm>`amplify configure`<br/>
Follow these steps to set up access to your AWS account:<br/>
<br/>
Specify the AWS Region<br/>
? region:  `< >`<br/>
Specify the username of the new IAM user:<br/>
? user name:  `< >`<br/>
<br/>
Enter the access key of the newly created user:<br/>
? accessKeyId:  `< >`<br/>
? secretAccessKey:  `< >`<br/>
This would update/create the AWS Profile in your local machine<br/>
? Profile Name:  `amplify`<br/>
<br/>
<br/>
C:\Ionic-Express-MySQL\IonicForm>`ionic build --prod`<br/>
<br/>
C:\Ionic-Express-MySQL\IonicForm>`amplify init`<br/>
Note: It is recommended to run this command from the root of your app directory<br/>
? Enter a name for the project `Ionic-Amplify`<br/>
? Enter a name for the environment `prod`<br/>
? Choose your default editor: `Visual Studio Code`<br/>
? Choose the type of app that you're building `javascript`<br/>
Please tell us about your project<br/>
? What javascript framework are you using `ionic`<br/>
? Source Directory Path:  `src`<br/>
? Distribution Directory Path: `www`<br/>
? Build Command:  `npm.cmd run-script build`<br/>
? Start Command: `ionic serve`<br/>
<br/>
? Do you want to use an AWS profile? `Yes`<br/>
? Please choose the profile you want to use `amplify`<br/>
<br/>
<br/>
C:\Ionic-Express-MySQL\IonicForm>`amplify hosting add`<br/>
? Select the environment setup: `< >`<br/>
? hosting bucket name `< >`<br/>
<br/>
<br/>
C:\Ionic-Express-MySQL\IonicForm>`amplify publish`<br/>
<br/>
<br/>
Open published endpoint URL in browser on the device<br/>
