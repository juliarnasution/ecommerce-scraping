const axios = require('axios');
const URL_SCRAPPER = "https://www.tokopedia.com/";
exports.search = (params)=> new Promise ((resolve,reject)=>{
    const {st} = params;
    if(!st){
        params.st = 'product';
    }
    const queryString = new URLSearchParams(params);
    url = `${URL_SCRAPPER}search?${queryString}`;
    axios.get(url).then((result) => {
        resolve(result.data)
    }).catch((err) => {
        // console.log('error', err)
        reject(err);
    });
})

