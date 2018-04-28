# JC-Codes

## Informations


- How can i install the package ?

By writing ``npm i jc-codes`` command!

- How can i use the package ?

require the package then write ``<packagename>.setClient(<client>);``


then write the code you wanna exec ``<packagename>.add(<codenumber>[,<options>])``


then exec it! ``<packagename>.exec()``


Ex. 
```js
const Discord = require('discord.js');
const jc = require('jc-codes');
const client = new Discord.client();

jc.setClient( client ) // Put client
jc.add(1, { message: 'ping', reply: 'Pong!', type: 1 }); // Using ping pong code
jc.add(2, { message: 'Welcome [user]! We hope to enjoy with our server' }); // Using greeting code
jc.exec( ); // Exec codes

client.login('token');
```



- Where i can found codes with it code number?

In wiki: [From here](https://github.com/JustCarry/JC-Codes/wiki)

## Author

Discord: **JustCarry#2616**



**Note: this package is only using for "Discord.js"**

