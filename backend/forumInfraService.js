const request = require('request');
const userEntity = require("../lib/userEntity");

function userFromForum(object){
    let user = new userEntity.userClass(object.id, object.name, object.primaryGroup.id,
    object.joined, object.lastVisit, object.posts, object.photoUrl, object.coverPhotoUrl);
    if(!userEntity.validate(user))
        return null;
    return user;
}

function userById(userId){
    return new Promise(function(resolve, reject){
        if(!Number.isInteger(userId) || userId < 1){
            resolve({error:"bad_id"});
            return;
        }
        request.get("https://forumas.rls.lt/api/index.php?core/members/"+userId+"/&key=cf493945637f05c7b9c4ad2ad7b74737",
            function(error, respose, body){
                if(error === null){
                    let data = JSON.parse(body);
                    if(typeof data.errorMessage !== 'undefined'){
                        if(data.errorMessage === 'INVALID_ID')
                            resolve({error: "no_user"});
                        else
                            resolve({error: "bad_request"});
                        return;
                    }
                    let userData = userFromForum(data);
                    if(userData === null){
                        resolve({error:"no_user"});
                        return;
                    }
                    resolve(userData);
                }
                else{
                    resolve({error:"no_response"});
                }
        });
    });
}
module.exports = {
    userById
};