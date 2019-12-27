`sudo openssl enc -md md5 -aes-256-cbc -salt -in mykeypair.pem -out /tmp/new.pem -pass pass:APP_SECRET`


`sudo openssl enc -d -md md5 -aes-256-cbc -salt -in mykeypair.pem -out /tmp/new.pem -pass pass:xxxx`

