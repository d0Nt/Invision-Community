const express = require('./index');
const forumApi = require('./forumInfraService');
const users = require('./userRepository');
const bodyParser = require('body-parser')
express.app.use(bodyParser.json());
express.app.use(bodyParser.urlencoded({extended: true})); 

express.app.get('/api/user/:id', (req,res) => {
    apiResponse(users.getUserById(req.params.id), res)
});

express.app.get('/api/users/:page',(req,res) => {
    apiResponse(users.usersList(parseInt(req.params.page)), res);
});

express.app.post('/api/user',(req,res) => {
    apiResponse(users.createUser(req.body), res)
});

express.app.put('/api/user/:id',(req,res) => {
    apiResponse(users.updateUser(req.params.id, req.body), res)
});

express.app.delete('/api/user/:id',(req,res) => {
    apiResponse(users.deleteUser(req.params.id), res)
});

function apiResponse(promise, res){
    promise
    .then(function(response){
        if(typeof response.error === 'undefined'){
            res.status(200).send(response);
        }
        else
            apiError(response, res);
    })
}

function apiError(response, res){
    switch(response.error){
        case 'user_exist':
            res.status(400).send({
                error: 'User already exist'
            });
            break;
        case 'no_user':
            res.status(404).send({
                error: 'No user found'
            });
            break;
        case 'no_data':
            res.status(400).send({
                error: 'Bad request body'
            });
            break;
        case 'bad_request':
            res.status(400).send({
                error: 'Bad request to server'
            });
            break;
        case 'bad_id':
            res.status(400).send({
                error: 'Bad user id'
            });
            break;
        case 'bad_page':
            res.status(400).send({
                error: 'Bad page number'
            });
            break;
        case 'invalid_data':
            res.status(400).send({
                error: 'Bad user data'
            });
            break;
        case 'no_response':
            res.status(500).send({
                error: 'Could not connect to remote server'
            });
            break;
        case 'forbidden_change':
            res.status(400).send({
                error: response.param+' is forbidden to change'
            });
            break;
        default:
            res.status(500).send({
                error: 'Unknown error'
            });
            break;
    }
}

express.listen = 3000;