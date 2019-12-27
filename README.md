`sudo openssl enc -aes-256-cbc -salt -in mykeypair.pem -out /tmp/new.pem -pass pass:APP_SECRET`


`sudo openssl enc -d -aes-256-cbc -salt -in mykeypair.pem -out /tmp/new.pem -pass pass:xxxx`

