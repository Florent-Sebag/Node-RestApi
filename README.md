# Node-RestApi

Very simple API using Node.js and MongoDB, you can try it with postman on https://guarded-waters-77123.herokuapp.com/

## URL
  - POST /api/token :
      * REQUIRED HEADER
        Content-Type: application/json

      * REQUIRED PARAMETERS
        {"email":"example@example.fr"}

      * RESPONSE
        200 if success with the new account + token
        else error

  - POST /api/justify :
      * REQUIRED HEADER\n
        Content-Type: text/plain

      * REQUIRED PARAMETERS
        The text you want to justify

      * RESPONSE
        200 if success with a justified text
        else error
