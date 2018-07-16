const Promise = require('bluebird');
const cheerio = require('cheerio');
const spider = require('superagent');
require('superagent-charset')(spider);
const logger = require('../service/loggerService')('spiderService');
const bookService = require('./bookService');
const pageUrl = 'http://www.997788.com/5709/all_0/?shop_id=5709&t2=0&t4=0&t5=2&t6=&t7=0&t8=0&t9=0&t10=';
module.exports = {
    getBookBasicInfo: function () {
        return new Promise((resolve, reject) => {
            spider
                .get(pageUrl)
                .charset('gbk')
                .end((err, res) => {
                    if (!err) {
                        const $ = cheerio.load(res.text);
                        const $hrefSelector = $('table.tbc tr td[align="left"] p[align="center"]');
                        let books = [];
                        books = _getBookHrefAndName($hrefSelector, books);

                        const $imageSelector = $('table.tbc tr td[width="120"][align="center"] div');
                        books = _getBookImage($imageSelector, books);

                        const $ageSelector = $('table.tbc tr td[align="left"] div[align="left"]');
                        books = _getBookAge($ageSelector, books);

                        // logger.info(books);
                        return bookService.saveBook(books);
                    } else {
                        logger.error(err);
                        reject(err);
                    }
                });
        });
    }
}

function _findNodeByName(children, targetName) {
    let result;
    for (let i = 0; i < children.length; i++) {
        let $current = children[i];
        if ($current.name == targetName) {
            result = $current;
        } else if ($current && $current.children) {
            result = _findNodeByName($current.children, targetName);
        }
        if (result) {
            return result;
        }
    }
}

function _getBookHrefAndName($selector, books) {
    for (let i = 0; i < $selector.length; i++) {
        books[i] = books[i] || {};
        books[i].href = "http://www.997788.com" + _findNodeByName($selector[i].children, 'a').attribs.href;
        books[i].name = _findNodeByName($selector[i].children, 'font').children[0].data;
    }
    return books;
}

function _getBookImage($selector, books) {
    for (let i = 0; i < $selector.length; i++) {
        books[i] = books[i] || {};
        books[i].imageUrl = _findNodeByName($selector[i].children, 'img').attribs.src;
    }
    return books;
}

function _getBookAge($selector, books) {
    for (let i = 0; i < $selector.length; i++) {
        books[i] = books[i] || {};
        books[i].desc = $selector[i].children[5].children[1].firstChild.data;
        books[i].age = books[i].desc.split('，')[0];
    }
    return books;
}