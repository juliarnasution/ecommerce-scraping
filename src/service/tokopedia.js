const cheerio = require('cheerio');
const tokopedia_scrape = require('../api/tokopedia');
exports.search = async (req,res)=>{
    let result = [];
    const {querySearch,maxPrice,minPrice,page} = req.query;

    try {
        if (!querySearch) {
            return {status_code:400,message:`query tidak boleh kosong}`}
        }
        const params = {
            st:'product',
            q : querySearch,
            source:'universe'
        };
        if (maxPrice) {
            params.pmax = maxPrice;
        }
        if (minPrice) {
            params.pmin = minPrice;
        }
        if (page) {
            params.page =page;
        }
        const response = await tokopedia_scrape.search(params);
        const $ = cheerio.load(response);
        const last_page = $('.css-1q668u-unf-pagination-items button[data-unf=pagination-item]:last-child').text();
        console.log('last page = ',last_page)
        const current_page = $('.css-gvoll6').html();
        console.log('current page = ',current_page)
        const paging ={last_page,current_page}
        $('.css-12sieg3').each((i,data)=>{  
            const product = {};
            product.url_product = $(data).find('.pcv3__info-content').attr('href');
            product.url_image = $(data).find('.css-1ehqh5q img').attr('src');
            product.product_name = $(data).find('.css-1sxqhh0 .css-1f4mp12').text();
            product.product_price =$(data).find('.css-1sxqhh0 .css-rhd610').text();
            product.store_location =$(data).find('.css-1sxqhh0 .css-vogbyu .css-1rn0irl span[data-testid=spnSRPProdTabShopLoc]').text();
            product.store_name =$(data).find('.css-1sxqhh0 .css-vogbyu .css-1rn0irl span[data-testid=]').text();
            result[i] = product;
        })
        return {status_code:200,query:querySearch,data:result,paging};
    } catch (error) {
        console.log(error)
        return {
            status_code:500,
            message:'terjadi kesalahan'
        };
    }
    
}