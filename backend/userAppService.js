const express = require('./index');
const forumApi = require('./forumInfraService');
const users = require('./userRepository');
const bodyParser = require('body-parser')
express.app.use(bodyParser.json());
express.app.use(bodyParser.urlencoded({extended: true})); 

function apiError(response, res){
    console.log(response);
    switch(response.error){
        case 'user_exist':
            res.status(400).send({
                success:false,
                text: 'User already exist'
            });
            break;
        case 'no_user':
            res.status(404).send({
                success:false,
                text: 'No user found'
            });
            break;
        case 'no_data':
            res.status(400).send({
                success:false,
                text: 'Bad request body'
            });
            break;
        case 'bad_request':
            res.status(400).send({
                success:false,
                text: 'Bad request to server'
            });
            break;
        case 'bad_id':
            res.status(400).send({
                success:false,
                text: 'Bad user id'
            });
            break;
        case 'bad_page':
            res.status(400).send({
                success:false,
                text: 'Bad page number'
            });
            break;
        case 'invalid_data':
            res.status(400).send({
                success:false,
                text: 'Bad user data'
            });
            break;
        case 'no_response':
            res.status(500).send({
                success:false,
                text: 'Could not connect to remote server'
            });
            break;
        case 'forbidden_change':
            res.status(400).send({
                success: false,
                text: response.param+' is forbidden to change'
            });
            break;
        default:
            res.status(500).send({
                success:false,
                text: 'Unknown error'
            });
            break;
    }
}

express.app.get('/api/user/:id',(req,res) => {
    users.getUserById(req.params.id)
    .then(function(response){
        response.success = true;
        res.status(200).send(response);
    }).catch(function(response){
        apiError(response, res);
    });
});

express.app.get('/api/users/:page',(req,res) => {
    forumApi.userList(parseInt(req.params.page))
    .then(function(response){
        response.success = true;
        res.status(200).send(response);
    })
    .catch(function(response){
        response.success = false;
        let status = response.code;
        delete response.code;
        res.status(status).send(response);
    });
});

express.app.post('/api/user',(req,res) => {
    users.createUser(req.body)
    .then(function(response){
        res.status(200).send(response);
    })
    .catch(function(response){
        apiError(response, res);
    });
});

express.app.put('/api/user/:id',(req,res) => {
    users.updateUser(req.params.id, req.body)
    .then(function(response){
        res.status(200).send(response);
    })
    .catch(function(response){
        apiError(response, res);
    });
});

express.app.delete('/user/:id',(req,res) => {
    res.status(200).send('delete user '+req.params.id);
});

express.listen = 3000;