const axios = require('axios');
const {stringify} = require("nodemon/lib/utils");
const key = require('../../secret/secret.json');

module.exports.inquiry = async (addr) =>{
    const adress = addr.replaceAll(" ", "+");;
    try{
        const keyvalue = key.openapi_key;
        const secretvalue = key.openapi_secret;
        const res_token = await axios.get('https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=' + keyvalue + '&consumer_secret=' + secretvalue);
        const token = res_token.data.result.accessToken;
        if(token){
            const code_url = "https://sgisapi.kostat.go.kr/OpenAPI3/addr/geocode.json?address=" + adress + "&pagenum=0&resultcount=5&accessToken=" + token;
            const res_code = await axios.get(code_url);
            if(res_code){
                const code = res_code.data.result.resultdata[0].adm_cd;
                if(code){
                    const district_url = "https://sgisapi.kostat.go.kr/OpenAPI3/boundary/hadmarea.geojson?year=2022&adm_cd="+code+"&low_search=1&accessToken="+token;
                    const res_location = await axios.get(district_url);
                    if(res_location){
                        return stringify(res_location.data.features[0].properties.adm_nm);
                    }
                }
            }
        }
    }catch (err){
        console.log('에러발생')
        console.log(err);
    }
}