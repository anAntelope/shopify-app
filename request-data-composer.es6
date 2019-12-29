#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const axios = require('axios')
const glob = require('glob')

const dotenv = require('dotenv')
dotenv.config()

function construct(file) {
    const data = fs.readFileSync(file)
    return JSON.stringify({
        'asset': {
            'key': `sections/${file}`,
            'value': data.toString()
        }
    })
}

console.log()
// glob('*.liquid', (err, files) => {
//
//     files.forEach((file)=>{
//         const data = {
//             'asset': {
//                 'key': `sections/${file}`,
//                 'value': ""
//             }
//         }
//     })
//
// })


const instance = axios.create({
    baseURL: 'https://xxphoto-editor-storexx.myshopify.com/admin/api/2019-10/',
    timeout: 1000,
    headers: {'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN}
});
//
instance.put('themes/81550803081/assets.json', construct('product-template.liquid'), {headers:{'Content-Type': 'application/json'}}).then(response=>console.log(response.data))

