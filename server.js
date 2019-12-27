require('isomorphic-fetch')
const Koa = require('koa')
const next = require('next')
const {default: createShopifyAuth} = require('@shopify/koa-shopify-auth')
const dotenv = require('dotenv')
const {verifyRequest} = require('@shopify/koa-shopify-auth')
const session = require('koa-session')
const fs = require('fs')

dotenv.config()

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

const {SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY} = process.env


const Router = require('koa-router');
const router = new Router();

const Shopify = require('shopify-api-node')
const shopify = new Shopify({
    shopName: 'xxphoto-editor-storexx',
    accessToken: process.env.ACCESS_TOKEN ? process.env.ACCESS_TOKEN : '4fffcb0faeb659778d91f9657eacabf7d2d4e7518dac71e8833259aac511a21a'
})
//
// async function doesScriptTagExist(){
//     try{
//         const response = await shopify.scriptTag.count()
//         console.log(response)
//     } catch (e) {
//         console.log(e)
//     }
// }




app.prepare().then(() => {
    const server = new Koa()
    server.use(session(server))
    server.keys = [SHOPIFY_API_SECRET_KEY]

    server.use(
        createShopifyAuth({
            apiKey: SHOPIFY_API_KEY,
            secret: SHOPIFY_API_SECRET_KEY,
            scopes: ['write_content', 'write_themes', 'write_products', 'read_product_listings', 'write_customers', 'write_orders', "write_inventory", "read_locations", "write_script_tags"],
            afterAuth(ctx) {
                const {shop, accessToken} = ctx.session
                fs.appendFile('access_token.txt', accessToken, () => {
                })
                ctx.redirect('/')
            },
        }),
    )

    server.use(verifyRequest())
    server.use(async (ctx) => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
        ctx.res.statusCode = 200

    })
    router.get('/api/:object', async (ctx) => {
        try{
            await shopify.scriptTag.count()
        }
        catch (e) {
            console.log(e)
        }
    })
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})