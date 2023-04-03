## Procedure and Frameworks required for this Project

### Stacks/Frameworks used:
1. expressJs latest version "^4.18.2"
    * To store environment variable here used "dotenv" modulea and its version "^16.0.3"
2. database here used is mongodb
    *  Here i used mongodb library i.e mongoose ,version "^6.0.9"
    * To add the id's in sequential order i have used mongoose-sequence library,its version "^5.3.1"

### Endpoint used and Request Parameters
### 1. Camera field (Api Endpoints)
        1. POST: http://localhost:3000/camera/addcamera
            * Request Body is:
                {
                    "name": "",
                    "desc": "",
                    "url": "",
                    "price": ""
                }
            * Response:
                {
                    "status": 200,
                    "msg": "camera added successfully"
                }
        2. POST: http://localhost:3000/camera/readCamera/{id}
            * Request:
                You can send with id and without id
            * Response:
                If you send the request(in the path parameter {id}) without id then it will show all the data based on your request.
                If you send the request with id then it will responded back with the respective collections based on the request.

        3. POST: http://localhost:3000/camera/updateCamera{id}
            * Request Body is:
                 Note: Always send the path parameter followed by id
                {
                    "name": "",
                    "desc": "",
                    "url": "",
                    "price": ""
                }
            * Response:
                {
                    "status": 200,
                    "msg": "camera Updated successfully"
                }

        4. POST: http://localhost:3000/camera/deleteCamera/{id}
            * Request:
                Always send the request parameters with id to perform delete operation
            * Response:
                {
                    "status": 200,
                    "msg": "camera deleted successfully"
                }  


### 2. Camera Network field (Api Endpoints)
        1. POST: http://localhost:3000/cameraNetwork/addCameraNetworks
            * Request Body is:
                {
                    "name": "",
                    "desc": "",
                    "details": [
                        {
                            "name": "",
                            "desc": "",
                            "url": "",
                            "price": ""
                        },
                        {
                            "name": "",
                            "desc": "",
                            "url": "",
                            "price": ""
                        }
                    ]
                }
            * Response:
                {
                    "status": 200,
                    "msg": "camera network added successfully"
                }
        2. POST: http://localhost:3000/cameraNetwork/readCameraNetwork/{id}
            * Request:
                You can send with id and without id
            * Response:
                If you send the request(in the path parameter {id}) without id then it will show all the data based on your request.
                If you send the request with id then it will responded back with the respective collections based on the request.

        3. POST: http://localhost:3000/cameraNetwork/updateCameraNetwork/{id}
            * Request Body is:
                 Note: Always send the path parameter followed by id
                {
                    "name": "",
                    "desc": "",
                    "details": [
                        {
                            "name": "",
                            "desc": "",
                            "url": "",
                            "price": ""
                        },
                        {
                            "name": "",
                            "desc": "",
                            "url": "",
                            "price": ""
                        }
                    ]
                }
            * Response:
                {
                    "status": 200,
                    "msg": "camera network updated successfully"
                }

        4. POST: http://localhost:3000/cameraNetwork/deleteCameraNetwork/{id}
            * Request:
                Always send the request parameters with id to perform delete operation
            * Response:
                {
                    "status": 200,
                    "msg": "camera network deleted successfully"
                }              


### Note: To run these API Used tool is POSTMAN

### How to Run:
1. To clone the project use command git clone on your command terminal
2. To initialize the project use the command "npm init -y" then press enter.
3. Then install the necessary dependencies such as,
    * expressjs ,to install this use command "npm i express"
    * mongoose, to install this use command "npm i mongoose@6.0.9"
    #### Note: To install mongoose please install the version which is shown
    * dotenv, to install this module use command "npm i dotenv"
    * mongoose-sequence, to install this module use command "npm i mongoose-sequence"
4. Then finally to run the project use the command "node index" and here we go..
5. To check the rest API's please switch to the POSTMAN,use the above API's with the accurate requests on body or path parameter.
    #### Note: To get the response from the database through localhost or the local server always keep the node application program (node index) live.


