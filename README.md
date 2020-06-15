## Sample Node.js Restful API
##### Node.js, Express, Moongoose, Jest / ES6 with Babel
------------
#### Public Url
Since it is hosted in heroku, first request may take time.
> no authentication method required

https://restfull-api-template.herokuapp.com/

------------
#### Endpoints
 ##### /records (POST)
###### Sample request body
   

    {
    	"startDate":"2016-07-06",
    	"endDate":"2016-07-07",
    	"minCount":2700,
    	"maxCount":3000
    }
    
###### Sample success response
    
    {
        "code": 200,
        "msg": "Success",
        "records": [
            {                
                "totalCount": 2700,
                "createdAt": "2016-07-06T06:54:46.169Z",
                "key": "xqT9N0XwJ4qwU0GQ"
            }]
    }
    

###### Sample error responses
*Bad Request*
    
    {
        "code": 400,
        "msg": "Please check your request payload.",
    }
    
*Internal Server Error*
    
    {
        "code": 500,
        "msg": "We are having problems on our server now. Please try again later.",
    }
    


------------
#### Libraries Used
**"body-parser":** json response handling middleware

**"dotenv":** handles environment variables

**"express":** node.js web server

**"express-async-errors":** async error handler

**"moment":** used for date format validation

**"mongoose":** MongoDB interface

**"nodemon":** just for development purposes

**"jest":** unit testing

**"mongodb-memory-server":** used for mock mongodb database for tests

------------
####  Usage
**Start server:** npm start

**Run tests:** npm test

You can also find test postman collection in /assets/postman folder.
