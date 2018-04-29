# JC-Codes

## Informations


- How can i install the package ?

By writing ``npm i jc-codes`` command!

- How can i use the package ?

require the package then write ``<packagename>.setClient(<client>);``


then write the code you wanna exec ``<packagename>.add(<codeName>,<options>)``


then exec it! ``<packagename>.exec()``


### Example: 
```js
const Discord = require('discord.js');
const jc = require('jc-codes');
const client = new Discord.client();

jc.setClient( client ) // Put client
jc.add('onMessage', { message: 'ping', reply: '[user], Pong!' }); // Using onMessage code, example for ping pong,
jc.add('onJoin', { message: 'Welcome there, [user] have joined to our server', role: jc.getRole('New member', 'guild-id') } )
jc.getRole('New member', 'guild-id'); // Returns the id of 'New member' role
jc.exec( ); // Exec codes

client.login('token');
```



- How can i use all of this?

In wiki: [From here](https://github.com/JustCarry/JC-Codes/wiki)

## Author

Discord: **JustCarry#2616**


Github: [JC-Codes](https://github.com/JustCarry/JC-Codes)




**Note: this package is only using for "Discord.js"**

