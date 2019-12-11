# Ionic 4 + Express + MySQL

This project is a mobile application that allows an admin, once authenticated, to collect and submit onsite user data.<br/>
An example of this would be a kiosk mounted tablet that collects a user's agreement that they read a legal notice.<br/>
An admin user must first register and log in, then the application is ready to collect the input data.<br/>

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
C:\Ionic-Express-MySQL>`npm install -g ionic cordova`
C:\Ionic-Express-MySQL>`ionic start IonicForm blank --type=angular`
C:\Ionic-Express-MySQL>`cd .\IonicForm`
C:\Ionic-Express-MySQL\IonicForm>`npm install --save @ionic/storage`
C:\Ionic-Express-MySQL\IonicForm>`npm install @ionic-native/file`
C:\Ionic-Express-MySQL\IonicForm>`ionic generate interface public/user`
C:\Ionic-Express-MySQL\IonicForm>`ionic generate interface public/auth-response`
C:\Ionic-Express-MySQL\IonicForm>`ionic generate page public/login`
C:\Ionic-Express-MySQL\IonicForm>`ionic generate page public/register`
C:\Ionic-Express-MySQL\IonicForm>`ionic generate page members/dashboard`
C:\Ionic-Express-MySQL\IonicForm>`ionic generate page members/disclaimer`
C:\Ionic-Express-MySQL\IonicForm>`ionic generate page members/download`
C:\Ionic-Express-MySQL\IonicForm>`ionic generate page members/license`
C:\Ionic-Express-MySQL\IonicForm>`ionic generate page members/signature`
C:\Ionic-Express-MySQL\IonicForm>`ionic generate service services/authentication`
C:\Ionic-Express-MySQL\IonicForm>`ionic generate guard guards/auth`
*(\* Use CanActivate as the option)*
C:\Ionic-Express-MySQL\IonicForm>`ionic generate guard guards/nonauth`
*(\* Use CanActivate as the option)*
C:\Ionic-Express-MySQL\IonicForm>`ionic generate module members/member-routing –flat`
C:\Ionic-Express-MySQL\IonicForm>`mkdir src\assets\img`
C:\Ionic-Express-MySQL-Node\IonicForm>`ionic cordova plugin add cordova-plugin-file`
*(\*Overwrite: y)*

