const axios = require('axios');
const {stringify} = require("nodemon/lib/utils");
const key = require('../../secret/secret.json');
const {toFloat} = require("validator");

module.exports.inquiry = async (addr) => {
    const adress = addr.replaceAll(" ", "+");
    ;
    try {
        const keyvalue = key.openapi_key;
        const secretvalue = key.openapi_secret;
        const res_token = await axios.get('https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=' + keyvalue + '&consumer_secret=' + secretvalue);
        const token = res_token.data.result.accessToken;
        if (token) {
            const code_url = "https://sgisapi.kostat.go.kr/OpenAPI3/addr/geocode.json?address=" + adress + "&pagenum=0&resultcount=5&accessToken=" + token;
            const res_code = await axios.get(code_url);
            if (res_code) {
                const code = res_code.data.result.resultdata[0].adm_cd;
                if (code) {
                    const district_url = "https://sgisapi.kostat.go.kr/OpenAPI3/boundary/hadmarea.geojson?year=2022&adm_cd=" + code + "&low_search=1&accessToken=" + token;
                    const res_location = await axios.get(district_url);
                    if (res_location) {
                        return stringify(res_location.data.features[0].properties.adm_nm);
                    }
                }
            }
        }
    } catch (err) {
        console.log('에러발생')
        console.log(err);
    }
}

module.exports.nearlylocation = async (location, level) => {
    let level_number;
    switch (level){
        case 1:
            level_number = 3000;
            break;
        case 2:
            level_number = 5000;
            break;
        case 3:
            level_number = 8000;
            break;
    }
    const address = "부산광역시 사하구 다대1동" + " 행정복지센터"
    const url_address = address.replaceAll(" ", "+");
    try {
        const keyvalue = key.openapi_key;
        const secretvalue = key.openapi_secret;
        const res_token = await axios.get('https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=' + keyvalue + '&consumer_secret=' + secretvalue);
        const token = res_token.data.result.accessToken;
        if (token) {
            const url = "https://sgisapi.kostat.go.kr/OpenAPI3/addr/geocode.json?address=" + url_address + "&pagenum=0&resultcount=10&accessToken=" + token
            const response = await axios.get(url);
            if (response) {
                const point = [
                    Number(response.data.result.resultdata[0].y),
                    Number(response.data.result.resultdata[0].x)
                ]
                const length = parseFloat(level_number)
                const value = {
                    minY: (point[0] - length).toString().replaceAll(".", "%2E"),
                    minX: (point[1] - length).toString().replaceAll(".", "%2E"),
                    maxY: (point[0] + length).toString().replaceAll(".", "%2E"),
                    maxX: (point[1] + length).toString().replaceAll(".", "%2E")
                }
                const final_url = 'https://sgisapi.kostat.go.kr/OpenAPI3/boundary/userarea.geojson?minx=' + value.minX +
                    '&miny=' + value.minY + '&maxx=' + value.maxX + '&maxy=' + value.maxY + '&cd=3&accessToken=' + token
                const finalresponse = await axios.get(final_url);
                if (finalresponse) {
                    const name = finalresponse.data.features;
                    const resalut = [];
                    for (Keys in name) {
                        resalut.push(name[Keys].properties.adm_nm);
                    }
                    console.log(resalut);
                    return resalut;
                }
            }
        }
    } catch (err) {
        console.log('에러발생')
        console.log(err);
    }
}