# NextInnovation
自我革新，学习进阶（原谅这样的二次元发话）

# TOLIST
- [] pm2

# Note
项目开发时，遇到一些问题。

## 数据服务层
1. 优化并公用
数据查询底层使用mongo，由于受传统java的影响，写了Service，Dao，Module层。
问题就来了，我有N个模块，难道每次都要Dao重复写类似的代码？
以前java extend 一个项目别人写的公用包解决，但是js怎么弄？归根结底还是js基础弱B。
````
function BookDao() {
    BaseDao.call(this, bookModel);
    this.module = bookModel;
}
BookDao.prototype = new BaseDao();

module.exports = BookDao;
````
如上，就可以减少代码量，也使得代码更加优雅。只是基础的js继承方式的实现。

## 爬虫
1. 怎么抓取网页内容？
````
npm i superagent
````

2. 中断递归
使用cheerio，这个库友好的帮我们把Html内容解析成对象Tree。在获取目标节点时，会循环调用相同方法，很容易想到使用递归。
但是怎么中断？第一反应是return，但是由于recursion loop的机制，每次return只是还给parent调用者。当使用For循环根本**停不下来**
下面给出目前方式，但有几点要注意：
- create global variable，一旦命中，则返回该变量，return出去
- 所有的for数据，必须相同结构，如果error，这方式没有做额外处理，当心**炸机**
````
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
````

