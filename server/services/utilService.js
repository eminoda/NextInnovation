const db = require('../db.json');
module.exports = {
    buildTdk: (fileName) => {
        for (let post of db.models.Post) {
            if (fileName == post.fileName) {
                return {
                    title: post.title,
                    description: post.description,
                    keywords: post.keywords
                }
            }
        }
        return {
            title: '',
            description: '',
            keywords: ''
        }
    }
}