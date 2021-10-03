const puppeterService = require('./puppeterService');
const axios = require('axios');
// https://shopee.co.id/search?keyword=thinkbook%2014%20g2%20are

module.exports.URL_SCRAPPER = "https://shopee.co.id";
exports.search = (params)=> new Promise ((resolve,reject)=>{
    const queryString = new URLSearchParams(params);
    const url = `${URL_SCRAPPER}search?${queryString}`;
    axios.get(url).then((result) => {
        resolve(result.data)
    }).catch((err) => {
        reject(err);
    });
})

exports.searchViaBrowser = async (params)=>{
    const queryString = new URLSearchParams(params);
    const url = `${this.URL_SCRAPPER}/search?${queryString}`;
    return await puppeterService.runBrowser(url)
}