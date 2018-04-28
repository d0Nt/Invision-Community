const userEntity = require('../lib/userEntity');
const forumApi = require('./forumInfraService');
const database = require('./userDatabase');

function getUserById(id){
    return new Promise(function(resolve, reject){
        Promise.all([forumApi.userById(parseInt(id)), database.getById(parseInt(id))])
        .then(function(result){
            let forumUser = result[0];
            let databaseUser = result[1];
            if(typeof forumUser.error !== 'undefined'  && databaseUser === null){
                reject(forumUser);
            }
            else{
                if(databaseUser === null){
                    resolve(forumUser);
                }
                else{
                    if(typeof forumUser.error === 'undefined'){
                        databaseUser.joined=forumUser.joined;
                        if(databaseUser.lastVisit<forumUser.lastVisit)
                            databaseUser.lastVisit = forumUser.lastVisit;
                        databaseUser.posts += forumUser.posts;
                        databaseUser.photoUrl = forumUser.photoUrl;
                    }
                    resolve(databaseUser);
                }
            }
            
        })
        .catch(function(result){
            reject({
                success: true,
                text: result.text
            });
        });
    });
}

function updateUser(id, userData){

    /*
    return new Promise(function(resolve, reject){
        getUserById(id)
        .then(function(user){
            if(typeof user.error !== 'undefined'){
                reject({error: user.error});
                return;
            }
            if(typeof userData === 'undefined'){
                reject({error: 'no_data'});
                return;
            }
            if(typeof userData.id !== 'undefined'){
                reject({
                    error: 'forbidden_change',
                    param: 'id'
                });
                return;
            }
            if(!userEntity.validateFields(userData)){
                reject({error: 'invalid_data'});
                return;
            }
            database.getById(id)
            .then(function(dbUser){
                if(dbUser != null){// user already exist in our database
                    database.update(id, dbUser)
                    .then(function(response){
                        response.success = true;
                        resolve(response);
                    })
                    .catch(function(response){
                        response.success = false;
                        reject(response);
                    });   
                } 
                else{// when user not exit yet
                    database.insert(userData);
                }
            }).catch(function(response){
            });         
        })
        .catch(function(data){
            reject({error: data});
        });
    });*/
}

function createUser(userData){
    return new Promise(function(resolve, reject){
        if(!userEntity.validate(userData)){
            reject({error: 'invalid_data'});
            return;
        }
        getUserById(userData.id)
        .then(function(result){         
            reject({error: 'user_exist'});                  
        })
        .catch(function(data){
            if(data.error !== 'no_user'){
                reject({error: data.error});
                return;
            }
            database.insert(userData)
            .then(function(response){
                response.success = true;
                resolve(response);
            })
            .catch(function(response){
                response.success = false;
                reject(response);
            });
        });
    });
}
module.exports = {
    getUserById,
    updateUser,
    createUser
};