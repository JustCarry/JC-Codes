# JC-Codes

## Informations


- How can i install the package ?

By writing ``npm i jc-codes`` command!

- How can i use the package ?


Easy, simple..

First thing require my package then write ``<packagename>.use(<codenumber>,<options>);``

Ex. 
```js
const Discord = require('discord.js');
const jc = require('jc-codes');
const client = new Discord.client();
jc.use(1, {client: client, message: 'Pong!'}); // Using ping pong code

client.login('token');
```


- How can i know code number ?

In wiki: [From here](https://github.com/JustCarry/JC-Codes/wiki)


**Note: this package is only using for "Discord.js"**

