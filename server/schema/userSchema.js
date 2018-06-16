const mongoose = require('mongoose');
// {
//     "login":"eminoda",
//     "id":15711478,
//     "avatar_url":"https://avatars3.githubusercontent.com/u/15711478?v=4",
//     "html_url":"https://github.com/eminoda",
//     "company":null,
//     "blog":"",
//     "location":null,
//     "email":null,
//     "bio":null,
//     "public_repos":21,
//     "followers":1,
//     "following":0,
//     "created_at":"2015-11-08T04:30:28Z",
//     "updated_at":"2018-04-28T05:11:44Z"
// }
module.exports = new mongoose.Schema({
    name: String,
    login: String, //github 登录名
    id: String, //github id
    avatar_url: String, //github 头像
    html_url: String, //github 地址
    company: String, //github
    blog: String, //github
    location: String, //github
    email: String, //github
    bio: String, //github
    public_repos: String, //github
    followers: String, //github
    following: String, //github
    created_at: String, //github
    updated_at: String //github
}, {
    collection: 'user'
})