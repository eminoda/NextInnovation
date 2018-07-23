const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const logger = require('./loggerService')('fileService');
module.exports = {
    isFileExist: function (path) {
        return fs.existsSync(path);
    },
    createFileDir: function (path) {
        return new Promise((resolve, reject) => {
            if (!this.isFileExist(path)) {
                try {
                    mkdirp.sync(path);
                    resolve('目录新建成功');
                } catch (err) {
                    reject(err);
                }
            } else {
                resolve('文件目录已存在')
            }
        })
    },
    // "pic": [
    //     {
    //         "fieldName": "pic",
    //         "originalFilename": "新建文本文档.txt",
    //         "path": "C:\\Users\\SHIXIN~1\\AppData\\Local\\Temp\\q7fu1iEWU77uXaDTKAO3vLV0.txt",
    //         "headers": {
    //             "content-disposition": "form-data; name=\"pic\"; filename=\"新建文本文档.txt\"",
    //             "content-type": "text/plain"
    //         },
    //         "size": 61
    //     }
    // ]
    uploadFile: async function (file, id) {
        let fileName = file.originalFilename || file.name;
        let originPath = file.path;
        let destDir = path.resolve(__dirname, '/root/upload/' + id);
        logger.info(destDir);
        // 验证后缀
        let exeType = this.getFileExe(fileName);
        if (!this.checkImageFileExe(exeType)) {
            throw new Error('请上传JPEG、PNG、JPG、GIF后缀结尾的图片');
        }
        // 验证大小
        // 上传到服务器
        await this.createFileDir(destDir);
        let result = await this.moveFile(originPath, destDir, this.buildTempFileName(exeType));
        return result;
    },
    moveFile: function (originPath, destDir, fileName) {
        return new Promise(function (resolve, reject) {
            try {
                fs.readFile(originPath, function (err, data) {
                    if (err) {
                        reject(err);
                    }
                    fs.writeFile(destDir + '/' + fileName, data, function (err) {
                        if (err) {
                            reject(err);
                        }
                        resolve({
                            fileName: fileName
                        });
                    });
                });
            } catch (err) {
                reject(err);
            }
        });
    },
    getFileExe: function (fileName) {
        if (fileName && fileName.split('.').length > 0) {
            let pos = fileName.lastIndexOf('.');
            return fileName.substr(pos + 1);
        }
        return '';
    },
    checkImageFileExe: function (fileExe) {
        if (/GIF|JPEG|JPG|PNG/i.test(fileExe)) {
            return true;
        }
        return false;
    },
    buildTempFileName: function (exeType) {
        return String(new Date().getTime()) + '.' + exeType;
    }
}