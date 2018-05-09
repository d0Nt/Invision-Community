const userEntity = require('../lib/userEntity');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test");
let userSchema = mongoose.Schema({
    id: Number,
    name: String,
    primaryGroup: Number,
    joined: { type: Date, default: Date.now },
    lastVisit: { type: Date, default: Date.now },
    posts: { type: Number, min: 0, default: 0 },
    photoUrl: String,
    coverPhotoUrl: String
});
let User = mongoose.model("User", userSchema);

async function getById(id){
    //db select
    let result = await User.find({id: id}).lean();
    if(result.length != 1)
        return null;
    else{
        result = result[0];
        delete result._id;
        delete result.__v;
        return result;
    }
}
async function usersList(page){
    let list = [];
    //database select
    let dbSelect = await User.find().lean();
    dbSelect.some(element => {
        delete element._id;
        delete element.__v;
        list.push(element);
        return false;
    });
    return list;
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
    let data = new User(user);
    data.save();
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
    await User.update({id: id}, {$set:userData})
    return {};
}
async function deleteUser(id){
    let dbUser = await getById(parseInt(id));
    if(dbUser === null){
        return {error: 'no_user'};
    }
    await User.find({id: id}).remove();
    return {};
}
module.exports = {
    getById,
    usersList,
    insert,
    update,
    deleteUser
};