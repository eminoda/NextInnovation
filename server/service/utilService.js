const utilService = {
    getGithubResponse: function (responseStr) {
        let response = {};
        let responseArr = responseStr ? responseStr.split('&') : [];
        for (let i = 0; i < responseArr.length; i++) {
            let key = responseArr[i].split('=')[0];
            let value = responseArr[i].split('=')[1];
            response[key] = value;
        }
        return response;
    }
}

module.exports = utilService;