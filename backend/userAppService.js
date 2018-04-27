const express = require('./index');
const forumApi = require('./forumInfraService');

express.app.get('/users',(req,res) => {
    forumApi.userList(1)
    .then(function(response){
        response.success = true;
        res.status(200).send(response);
    })
    .catch(function(response){
        response.success = false;
        res.status(404).send(response);
    });
});

express.app.get('/users/:id',(req,res) => {
    if(!Number.isInteger(parseInt(req.params.id))){
        response = false;
        res.status(404).send({
            text: 'user not found'
        });
        return;
    }
    forumApi.user(parseInt(parseInt(req.params.id))).then(function(response){
        response.success = true;
        res.status(200).send(response);
    }).catch(function(response){
        response.success = false;
        res.status(404).send(response);
    });
});

express.app.post('/users',(req,res) => {
    res.status(200).send('create new user');
});

express.app.put('/users/:id',(req,res) => {
    res.status(200).send('update user '+req.params.id);
});

express.app.delete('/users/:id',(req,res) => {
    res.status(200).send('delete user '+req.params.id);
});

express.listen = 3000;