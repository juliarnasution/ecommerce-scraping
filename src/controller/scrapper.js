const tokopedia_service = require('../service/tokopedia');
const shopee_service = require('../service/shopee');
const {response} = require('../response/response');
exports.search =async (req, res)=>{
    let data = {};
    let code_response = 400;
    const {ecommerce} = req.query;
    if (!ecommerce) {
        res.json(response(code_response,{message:'Pastikan anda memilih toko online'}));
    }
    if (ecommerce==='tokopedia') {
        const {status_code,...result}  = await tokopedia_service.search(req, res);
        code_response = status_code;
        data = result;
    }else if (ecommerce==='bukalapak') {
        data = {message:'coming soon'}
    }else if(ecommerce==='shopee'){
        const {status_code,...result}  = await shopee_service.search(req, res);
        code_response = status_code;
        data = result;
    }else if(ecommerce==='jdid'){
        data = {message:'coming soon'}
    }else if(ecommerce ==='lazada'){
        data = {message:'coming soon'}
    }else if(ecommerce ==='blibli'){
        data = {message:'coming soon'}
    }else{
        data = {message:'toko online tidak terdaftar di list kami'}
    }   
    res.json(response(code_response,data));
}