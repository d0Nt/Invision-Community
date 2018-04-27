const request = require('request');
const userEntity = require("../lib/userEntity");

function userFromForum(object){
    let user = new userEntity.userClass(object.id, object.name, object.primaryGroup.id,
    object.joined, object.lastVisit, object.posts, object.photoUrl, object.coverPhotoUrl);
    if(!userEntity.validate(user))
        return null;
    return user;
}

function user(userId){
    return new Promise(function(resolve, reject){
        request.get("https://forumas.rls.lt/api/index.php?core/members/"+userId+"/&key=cf493945637f05c7b9c4ad2ad7b74737",
            function(error, respose, body){
                if(error === null){
                    let data = JSON.parse(body);
                    if(typeof data.errorMessage !== undefined){
                        reject({
                            text: 'user not found'
                        });
                        return;
                    }
                    let userData = userFromForum(data);
                    if(userData === null){
                        reject({
                            text: 'user not found'
                        });
                        return;
                    }
                    resolve(userData);
                }
                else
                    reject({
                        text: 'user not found'
                    });
        });
    });
}
function userList(page){
    return new Promise(function(resolve, reject){
        request.get("https://forumas.rls.lt/api/index.php?core/members/&key=cf493945637f05c7b9c4ad2ad7b74737",
            function(error, respose, body){
                if(error === null){
                    let data = JSON.parse(body);
                    console.log(typeof data.errorMessage);
                    if(typeof data.errorMessage != undefined){
                        reject({
                            text: 'failed to read users list'
                        });
                        return;
                    }
                    let list = data.results;
                    data.results = [];
                    list.forEach(function(element){
                        let user = userFromForum(element);
                        data.results.push(user);
                    });
                    resolve(data);
                }
                else
                    reject({
                        text: 'failed to read users list'
                    });
        });
    });
}
module.exports = {
    user,
    userList
};