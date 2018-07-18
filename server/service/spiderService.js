const logger = require('./loggerService')('spiderService');
const Promise = require('bluebird');
const cheerio = require('cheerio');
const spider = require('superagent');
require('superagent-charset')(spider);

module.exports = {
    login: function (pageUrl) {
        return new Promise((resolve, reject) => {
            spider.post(pageUrl)
                .type('form')
                .send('name=spider1234')
                .send('pwd_=spider12345')
                .send('pwd2=27080d56a6488e00a265e83897b4788c')
                .send('pwd3=9a8dcb1ce462f6474d18a9313ce34410')
                .send('pwd4=a52c5955ff01fb644149f11c2c710496')
                .send('pwd5=%0D%0A41bebf9236be0043ef77b9f8f48a161c')
                .send('pwd=e3eea312c1491a029b2eec5c245ef4c4')
                .send('s_name=%C9%CF%BA%A3%BE%C9%CA%E9%B5%EA')
                .send('path_info=%2F5709%2Fall_3_102_5330%2F%3Fshop_id%3D5709%26d%3D102%26r%3D%26v1%3D%26v2%3D%26v3%3D%26v4%3D%26v5%3D%26v6%3D%26v7%3D%26v8%3D%26v9%3D%26v10%3D%26v11%3D%26v12%3D%26s0%3D%26s1%3D%26s2%3D%26s3%3D%26s4%3D%26s5%3D%26s6%3D%26s7%3D%26s8%3D%26s9%3D%26s10%3D%26s11%3D%26s12%3D%26s13%3D%26s14%3D%26s15%3D%26t2%3D0%26t4%3D0%26t5%3D2%26t6%3D%26t7%3D0%26t8%3D0%26t9%3D%26t10%3D%26z%3D0%26p%3D0%26v%3D0%26u%3D1%26y%3D2%26o%3Do%26s%3D5330%26ids%3D76221864%26ide%3D76048392%26jis%3D77%26jie%3D299%26page%3D5%26ne%3D1')
                .set('Cookie', 'PHPSESSID=3brt8gc52tnunk9esb7s6o9ua0')
                .charset('gbk')
                .end((err, res) => {
                    if (!err) {
                        logger.info(res.header['set-cookie']);
                        resolve(res.header['set-cookie']);
                    } else {
                        reject(err);
                    }
                })
        })
    },
    getNextPage: function (pageUrl, cookies) {
        return new Promise((resolve, reject) => {
            spider.get(pageUrl)
                .charset('gbk')
                .set('Cookie', cookies)
                .end((err, res) => {
                    try {
                        if (!err) {
                            const $ = cheerio.load(res.text);
                            const $selector = $('div#showpage table td');
                            const hrefList = _findNodesByName($selector[0].children, 'a');
                            pageUrl = hrefList.length > 2 ? hrefList[2] : hrefList[0];
                            pageUrl = getPageUrl(pageUrl);
                            resolve(pageUrl);
                        } else {
                            reject(err);
                        }
                    } catch (err) {
                        reject(err);

                    }
                })
        })
    },
    getBookDetail: function (options) {
        return new Promise((resolve, reject) => {
            spider.get(options.page)
                .charset('gbk')
                .end((err, res) => {
                    if (!err) {
                        const $ = cheerio.load(res.text);
                        let $selector = $('table tr td[width="540"][valign="top"] div[align="center"]');
                        let detailImageUrls;
                        detailImageUrls = getBookDetailImage($selector[1].children);
                        if (detailImageUrls.length == 0) {
                            $selector = $('table tr td[width="540"][valign="top"] div#imgLarge[align="center"]');
                            detailImageUrls = getBookDetailImage2($selector[0].children);
                        }
                        resolve(detailImageUrls);
                    } else {
                        reject(err);
                    }
                })
        })
    },
    getBookBasicInfo: function (pageUrl, cookies) {
        return new Promise((resolve, reject) => {
            spider.get(pageUrl)
                .set('Cookie', cookies)
                .charset('gbk')
                .end((err, res) => {
                    if (!err) {
                        const $ = cheerio.load(res.text);
                        const $hrefSelector = $('table.tbc tr td[align="left"] p[align="center"]');
                        let books = [];
                        books = getBookHrefAndName($hrefSelector, books);

                        const $imageSelector = $('table.tbc tr td[width="120"][align="center"] div');
                        books = getBookImage($imageSelector, books);

                        const $ageSelector = $('table.tbc tr td[align="left"] div[align="left"]');
                        books = _getBookDesc($ageSelector, books);
                        // logger.debug(books);
                        resolve(books);
                    } else {
                        logger.error(err);
                        reject(err);
                    }
                });
        });
    }
}

function getPageUrl($selector) {
    var tempHref = $selector.attribs.onclick.split("this.href='?")[1];
    return tempHref.slice(0, tempHref.length - 1);
}
// 匹配标签查询节点
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

function _findNodesByName(nodes, targetName) {
    let result = [];
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].name == targetName) {
            result.push(nodes[i]);
        }
    }
    return result;
}

function getBookHrefAndName($selector, books) {
    for (let i = 0; i < $selector.length; i++) {
        books[i] = books[i] || {};
        books[i].href = "http://www.997788.com" + _findNodeByName($selector[i].children, 'a').attribs.href;
        books[i].name = _findNodeByName($selector[i].children, 'font').children[0].data;
    }
    return books;
}

function getBookImage($selector, books) {
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

/****
 * <div>
 *      <img>
 * </div>
 */
function getBookDetailImage($selector) {
    let images = _findNodesByName($selector, 'img');
    let bookDetailImages = [];
    for (let i = 0; i < images.length; i++) {
        bookDetailImages.push(images[i].attribs.src);
    }
    return bookDetailImages;
}

function getBookDetailImage2(list) {
    let bookDetailImages = [];
    for (let i = 0; i < list.length; i++) {
        let $selector = list[i];
        if ($selector.children) {
            image = _findNodeByName($selector.children, 'img');
            if (image) {
                bookDetailImages.push(image.attribs.src);
            }
        }
    }
    return bookDetailImages;
}