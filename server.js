const express = require("express");
const msal = require('@azure/msal-node');

const SERVER_PORT = process.env.PORT || 3000;

// Create Express App and Routes
const app = express();


// Before running the sample, you will need to replace the values in the config,
// including the clientSecret
const config = {
    auth: {
        clientId: "Enter_the_Application_Id",
        authority: "Enter_the_Cloud_Instance_Id_Here/Enter_the_Tenant_Id_here",
        clientSecret: "Enter_the_Client_secret"
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};


// Create msal application object
const cca = new msal.ConfidentialClientApplication(config);

app.get('/', (req, res) => {
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: "http://localhost:3000/redirect",
    };

    // get url to sign user in and consent to scopes needed for application
    cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));
});

app.get('/redirect', (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri: "http://localhost:3000/redirect",
    };

    cca.acquireTokenByCode(tokenRequest).then((response) => {
        console.log("\nResponse: \n:", response);
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    }); 1
});






const axios = require("axios");

app.get('/register', (req, res) => {

    // Request API.
    // Add your own code here to customize or restrict how the public can register new users.
    axios
    .post('http://localhost:1337/api/auth/local/register', {
        username:'cc@cc.io',
        identifier: 'cc1@cc.io',
        email:'cc@cc.io',
        password: 'cC123456',
    })
    .then((response) => {
        // Handle success.
        // console.log('Well done!');
        // console.log('User profile', response.data.user);
        // console.log('User token', response.data.jwt);
        res.status(200).send("ok");  
    })
    .catch((error) => {
        // Handle error.
        // console.log('An error occurred:', error.response);
        res.status(200).send("error");  
    });


})






app.get('/login', (req, res) => {

    axios.post('http://localhost:1337/api/auth/local', {
        identifier: 'cc@cc.io',
        password: 'cC123456',
    }).then((response) => {
            // Handle success.
            console.log('Well done!');
            // console.log('User profile', response.data.user);
            // console.log('User token', response.data.jwt);
            res.status(200).send(JSON.stringify(response.data));  
        })
        .catch((error) => {
            // Handle error.
            // console.log('An error occurred:', error.response);
            res.status(200).send(JSON.stringify(error.response.data));
        });


})





app.listen(SERVER_PORT, () => console.log(`Msal Node Auth Code Sample app listening on port ${SERVER_PORT}!`))



// https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-nodejs-webapp-msal