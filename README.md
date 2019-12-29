`sudo openssl enc -md md5 -aes-256-cbc -salt -in mykeypair.pem -out /tmp/new.pem -pass pass:APP_SECRET`


`sudo openssl enc -d -md md5 -aes-256-cbc -salt -in ec2.pem.enc -out /tmp/mykeypair.pem -pass pass:xxxx`


# shopify theme kit

https://shopify.github.io/themekit/