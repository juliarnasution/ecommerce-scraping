const cheerio = require('cheerio');
const shopee_scrape = require('../api/shopee');
exports.search = async (req,res)=>{
    let result = [];
    const {querySearch,maxPrice,minPrice,page} = req.query;

    try {
        console.log(maxPrice,minPrice,page)
        if (!querySearch) {
            return {status_code:400,message:`query tidak boleh kosong}`}
        }
        const params = {
            keyword : querySearch,
        };
        const [browser,response] = await shopee_scrape.searchViaBrowser(params);
        const $ = cheerio.load(response);
        
        const paging ={last_page:0,current_page:0}
        $("[data-sqe=item].col-xs-2-4.shopee-search-item-result__item").each((i,data)=>{
            const product = {};
            product.url_product = `${shopee_scrape.URL_SCRAPPER}${$(data).find('a[data-sqe=link]').attr('href')}`;
            product.url_image = $(data).find('img._3-N5L6._2GchKS').attr('src');
            product.product_name = $(data).find('._3zWriB ._10Wbs-').text();
            product.product_price =$(data).find('._1zR5G3 ._1d9_77:first').text();
            product.store_location =$(data).find('._1w5FgK').text();
            product.store_name ='';
            result[i] = product;
        })
        await browser.close()
        return {status_code:200,query:querySearch,data:result,paging};
    } catch (error) {
        console.log('error ',error)
        return {
            status_code:500,
            message:'terjadi kesalahan'
        };
    }
    
}