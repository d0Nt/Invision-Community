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
async function getById(id){
    let result = await database.filter(function(user) {
        return user.id == id;
    });
    if(result.length != 1)
        return null;
    else{
        return result[0];
    }
}
async function insert(user){
    if(!userEntity.validate(user)){
        return {error: 'invalid_data'};
    }
    let dbUser = await getById(user.id);
    if(dbUser !== null){
        return {error: 'user_exist'};
    }
    if(typeof user.posts === 'undefined')
        user.posts = 0;
    //database insert
    database.push(user);
    return {};
}

async function update(id, userData){
    if(!userEntity.validateFields(userData)){
        return {error: 'invalid_data'};
    }
    let dbUser = await getById(parseInt(id));
    if(dbUser === null){
        return {error: 'no_user'};
    }
    //update database
    Object.keys(userData).forEach(function(key){
        dbUser[key] = userData[key];
    });
    return {};
}
module.exports = {
    getById,
    insert,
    update
};