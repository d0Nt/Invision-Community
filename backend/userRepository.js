const userEntity = require('../lib/userEntity');
const forumApi = require('./forumInfraService');
const database = require('./userDatabase');

function getUserById(id){
    return new Promise(async function(resolve){
        if(!userEntity.validateFields({id: id})){
            resolve({error: "bad_id"});
            return;
        }
        let databaseUser = await database.getById(parseInt(id));
        if(databaseUser !== null){
            resolve(databaseUser);
            return;
        }
        let forumUser = await forumApi.userById(parseInt(id));
        if(typeof forumUser.error === 'undefined')
            console.log(await createUser(forumUser));
        resolve(forumUser);
    });
}

function usersList(page){
    return new Promise(async function(resolve){
        resolve(await database.usersList(page));
    });
}

function updateUser(id, userData){
    return new Promise(async function(resolve){
        if(!userEntity.validateFields({id: id})){
            resolve({error: "bad_id"});
            return;
        }
        if(typeof userData === 'undefined'){
            resolve({error: 'no_data'});
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
        if(typeof userData.id !== 'undefined' && user.id !== userData.id){
            resolve({
                error: 'forbidden_change',
                param: 'id'
            });
            return;
        }
        resolve(await database.update(id, userData));
    });
}

function createUser(userData){
    return new Promise(async function(resolve, reject){
        if(!userEntity.validate(userData)){
            resolve({error: 'invalid_data'});
            return;
        }
        let user = await database.getById(userData.id);
        if(user !== null){
            resolve({error: 'user_exist'});
            return;
        }
        user = forumApi.userById(userData.id);
        if(typeof user.error !== 'undefined'){
            resolve({error: user.error});
            return;
        }
        resolve(await database.insert(userData));
    });
}
function deleteUser(id){
    return new Promise(async function(resolve){
        if(!userEntity.validateFields({id: id})){
            resolve({error: "bad_id"});
            return;
        }
        let user = await database.user(id);
        if(user === null){
            resolve({error: "no_user"});
            return;
        }
        resolve(await database.deleteUser(id));
    }); 
}
module.exports = {
    deleteUser,
    getUserById,
    updateUser,
    usersList,
    createUser
};