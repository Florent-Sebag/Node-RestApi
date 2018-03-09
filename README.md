# Node-RestApi

Very simple API to justify a text using Node.js and MongoDB. You can try it with postman on https://guarded-waters-77123.herokuapp.com/

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
      * REQUIRED HEADER
        Content-Type: text/plain
        Authorization: Bearer [Token]

      * REQUIRED PARAMETERS
        The text you want to justify

      * RESPONSE
        200 if success with a justified text (There is a usage limit per token, 80,000 words/day)
        else error
