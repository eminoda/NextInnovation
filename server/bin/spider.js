const spiderService = require('../service/spiderService');
const request = require('superagent');
require('superagent-charset')(request);
const cheerio = require('cheerio');
const logger = require('../service/loggerService')('spider');
request
    .get('http://www.997788.com/5709/all_0/?shop_id=5709&t2=0&t4=0&t5=2&t6=&t7=0&t8=0&t9=0&t10=')
    // .query({
    //     action: 'edit',
    //     city: 'London'
    // }) // query string
    // .use(prefix) // Prefixes *only* this request
    .charset('gbk')
    .end((err, res) => {
        if (!err) {
            const $ = cheerio.load(res.text);
            const $books = $('table.tbc tr td p');
            const books = [];
            for (let i = 0; i < $books.length; i++) {
                books[i] = _findNode($books[i].children, 'a');
            }
            logger.info(books);
        } else {
            logger.error(err);
        }
    });

function _findNode(children, targetName) {
    let result;
    for (let i = 0; i < children.length; i++) {
        let $current = children[i];
        if ($current.name == targetName) {
            result = $current;
        } else if ($current && $current.children) {
            result = _findNode($current.children, targetName);
        }
        if (result) return result;
    }

}