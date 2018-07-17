const logger = require('./loggerService')('spiderService');
const Promise = require('bluebird');
const cheerio = require('cheerio');
const spider = require('superagent');
require('superagent-charset')(spider);
const bookService = require('./bookService');
const pageUrl = 'http://www.997788.com/5709/all_0/?shop_id=5709&t2=0&t4=0&t5=2&t6=&t7=0&t8=0&t9=0&t10=&page=2';

module.exports = {
    getBookDetail: function (options) {
        return new Promise((resolve, reject) => {
            spider.get(options.page)
                .charset('gbk')
                .end((err, res) => {
                    if (!err) {
                        const $ = cheerio.load(res.text);
                        const $hrefSelector = $('table tr td[width="540"][valign="top"] div[style="width:520px;"]');
                        let book = {};
                        book = _getBookDetailImage($hrefSelector, book);

                        resolve(book);
                    } else {
                        reject(err);
                    }
                })
        })
    },
    getBookBasicInfo: function (page) {
        let pageUrl = "http://www.997788.com/5709/all_3_102_5328/?shop_id=5709&d=102&r=&v1=&v2=&v3=&v4=&v5=&v6=&v7=&v8=&v9=&v10=&v11=&v12=&s0=&s1=&s2=&s3=&s4=&s5=&s6=&s7=&s8=&s9=&s10=&s11=&s12=&s13=&s14=&s15=&t2=0&t4=0&t5=2&t6=&t7=0&t8=0&t9=&t10=&z=0&p=0&v=0&u=1&y=2&o=o&s=5328&ids=76341862&ide=76190694&jis=499&jie=29&ne=1";
        page = page || 1;
        pageUrl = pageUrl + '&page=' + page;
        logger.debug('page:' + page);
        logger.debug('pageUrl:' + pageUrl);
        return new Promise((resolve, reject) => {
            spider.get(pageUrl)
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
                        books = _getBookDesc($ageSelector, books);
                        logger.debug(books);
                        resolve(books);
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

function _getBookDesc($selector, books) {
    for (let i = 0; i < $selector.length; i++) {
        books[i] = books[i] || {};
        books[i].desc = $selector[i].children[5].children[1].firstChild.data;
        books[i].age = books[i].desc.split('，')[0];
    }
    return books;
}

function _getBookDetailImage($selector, book) {
    for (let i = 0; i < $selector.length; i++) {
        book.detailImage = _findNodeByName($selector[i].children, 'img').attribs.src;
    }
    return book;
}