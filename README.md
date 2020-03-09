# Project Title

Ectosense Backend Developer Assignment 

### Prerequisites

What things you need to install the software and how to install them

```
nodeJS
An account in the cloudinary to upload the records of the patients 
An account in the mongodb.com/local mongo setup 
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
npm install 
create a .env file 
copy the contents of .env.exampls & replace with your coludinary details
npm start
```

## Deployment

Application has been hosted on heroku `https://ectosense.herokuapp.com/`

All the data is being stored on `https://cloud.mongodb.com/`

### Project Structure

- config 
    - acl.json - This file is being used to manage all the permissions for different roles  (admin, doctor, patient, assistant)
    - database.js - This file contains the DB URL 
    - jwtConfig.js - This has the secret key required for jwt token

- controllers 
    - This folder has the relevant files where the core logic is residing in 

- middlewares
    - auth.js - This is the middleware to authenticate all the requests coming in 

- models 
    - This folder contains the DB schemas for the collections 

- routes
    - This folder contains the relevant routes 

- .env 
    - This file contains the configuration details for the cloudinary integration 

- app.js 
    - This is the starting point of the application