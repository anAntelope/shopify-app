require('isomorphic-fetch')
const Koa = require('koa')
const next = require('next')
const {default: createShopifyAuth} = require('@shopify/koa-shopify-auth')
const dotenv = require('dotenv')
const {verifyRequest} = require('@shopify/koa-shopify-auth')
const session = require('koa-session')
const fs = require('fs')
const https = require('https');

dotenv.config()

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

const {SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY} = process.env


const httpsOptions = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem')
}

app.prepare().then(() => {

    const server = new Koa()

    let serverCallback = server.callback();


    server.use(session(server))
    server.keys = [SHOPIFY_API_SECRET_KEY]

    server.use(
        createShopifyAuth({
            apiKey: SHOPIFY_API_KEY,
            secret: SHOPIFY_API_SECRET_KEY,
            scopes: ['write_content', 'write_themes', 'write_products', 'read_product_listings', 'write_customers', 'write_orders', "write_inventory", "read_locations", "write_script_tags"],
            afterAuth(ctx) {
                const {shop, accessToken} = ctx.session
                fs.writeFile('access_token.txt', accessToken, () => {
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

    try {
        let httpsServer = https.createServer(httpsOptions, serverCallback);
        httpsServer
            .listen(port, function(err) {
                if (!!err) {
                    console.error('HTTPS server FAIL: ', err, (err && err.stack));
                }
                else {
                    console.log(`HTTPS server listening on port ${port}`);
                }
            });
    }
    catch (ex) {
        console.error('Failed to start HTTPS server\n', ex, (ex && ex.stack));
    }



})