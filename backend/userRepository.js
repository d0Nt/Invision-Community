const userEntity = require('../lib/userEntity');
const forumApi = require('./forumInfraService');
const database = require('./userDatabase');

function getUserById(id){
    return new Promise(async function(resolve, reject){
        if(!userEntity.validateFields({id: id})){
            resolve({error: "bad_id"});
            return;
        }
        let data = {};
        let forumUser = await forumApi.userById(parseInt(id));
        let databaseUser = await database.getById(parseInt(id));
        if(typeof forumUser.error !== 'undefined'  && databaseUser === null){
            resolve(forumUser);
            return;
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
    });
}

function updateUser(id, userData){
    return new Promise(async function(resolve, reject){
        if(!userEntity.validateFields({id: id})){
            resolve({error: "bad_id"});
            return;
        }
        if(!userEntity.validateFields(userData)){
            resolve({error: 'invalid_data'});
            return;
        }
        let user = await getUserById(id);
        if(typeof user.error !== 'undefined'){
            resolve(user);
            return;
        }
        if(typeof userData === 'undefined'){
            resolve({error: 'no_data'});
            return;
        }
        if(typeof userData.id !== 'undefined' && user.id !== userData.id){
            resolve({
                error: 'forbidden_change',
                param: 'id'
            });
            return;
        }
        let dbUser = await database.getById(id);
        if(dbUser === null){//insert if not exist
            await database.insert(user);
        }
        let result = await database.update(id, userData);
        resolve(result);
    });
}

function createUser(userData){
    return new Promise(async function(resolve, reject){
        if(!userEntity.validate(userData)){
            resolve({error: 'invalid_data'});
            return;
        }
        let user = await getUserById(userData.id);
        if(typeof user.error !== 'undefined' && user.error !== 'no_user'){
            resolve({error: user.error});
            return;
        }
        if(typeof user.id !== 'undefined'){
            resolve({error: 'user_exist'});
            return;
        }
        let result = await database.insert(userData);
        if(typeof result.error === 'undefined'){
            result.success = true;
            resolve(result);
        }
        else{
            response.success = false;
            resolve(result);
        }
    });
}
module.exports = {
    getUserById,
    updateUser,
    createUser
};