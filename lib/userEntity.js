const Joi = require('joi');

const userScheme = Joi.object().keys({
    id: Joi.number().integer().min(1).max(1000000).required(),
    name: Joi.string().min(1).max(50).required(),
    primaryGroup: Joi.number().integer().min(1).max(100).required(),
    joined: Joi.date().iso(),
    lastVisit: Joi.date().iso(),
    posts: Joi.number().integer().min(0).max(1000000),
    photoUrl: Joi.string().uri().trim(),
    coverPhotoUrl: Joi.string().uri().trim()
  });
const fieldsValidation = Joi.object().keys({
    id: Joi.number().integer().min(1).max(1000000),
    name: Joi.string().min(1).max(50),
    primaryGroup: Joi.number().integer().min(1).max(100),
    joined: Joi.date().iso(),
    lastVisit: Joi.date().iso(),
    posts: Joi.number().integer().min(0).max(1000000),
    photoUrl: Joi.string().uri().trim(),
    coverPhotoUrl: Joi.string().uri().trim()
  });
function validate(user){
    let result = Joi.validate(user, userScheme);
    return result.error === null;
}
function validateFields(data){
    let result = Joi.validate(data, fieldsValidation);
    return result.error === null;
}

class userClass{
    constructor(id, name, primaryGroup, joined, lastVisit, posts, photoUrl, cover){
        this.id = id;
        this.name = name;
        this.primaryGroup = primaryGroup;
        this.joined = joined;
        this.lastVisit = lastVisit;
        this.posts = posts;
        this.photoUrl = photoUrl;
        this.coverPhotoUrl = cover;
    }
}

module.exports = {
    userScheme,
    validate,
    validateFields,
    userClass
};