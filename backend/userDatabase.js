const userEntity = require('../lib/userEntity');
let database = [
    {
        id: 1,
        name: "d0Nt",
        primaryGroup: 4,
        joined: "2012-03-27T18:15:01Z",
        lastVisit: "2018-04-29T19:19:46Z",
        posts: 1,
        photoUrl: "https://forumas.rls.lt/uploads/monthly_2017_07/wtf-i-just-read.gif.8f70b36780b43dc9e375659d4e4e3994.gif"
    }
];
function removeId(id){
    database = database.filter(function(record){
        return record.id !== id;
      });
}
function getById(id){
    return new Promise(function(resolve, reject){
        let result = database.filter(function(user) {
            return user.id == id;
          });
        if(result.length != 1)
            resolve(null);
        else{
          resolve(result[0]);
        }
    });
}
function update(id, userData){
    return new Promise(function(resolve, reject){
        if(!userEntity.validateFields(userData)){
            reject({error: 'invalid_data'});
            return;
        }
        getById(id)
        .then(function(dbUser){
            if(dbUser === null){
                reject({error: 'no_user'});
                return;
            }
            //update with new record
            Object.keys(userData).forEach(function(key){
                dbUser[key] = userData[key];
            });
            console.log(dbUser);
            resolve({});
        });
    });
}
function insert(user){
    return new Promise(function(resolve, reject){
        if(!userEntity.validate(user)){
            reject({error: 'invalid_data'});
            return;
        }
        getById(user.id)
            .then(function(response){
                if(response !== null){
                    reject({error: 'user_exist'});
                    return;
                }
                if(typeof user.posts === 'undefined')
                    user.posts = 0;
                //database insert
                database.push(user);
                resolve({});
            })
            .catch(function(response){
                reject({error: 'unknown'});
            });
    });
}
module.exports = {
    getById,
    insert,
    update
};