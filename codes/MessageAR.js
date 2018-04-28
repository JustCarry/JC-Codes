module.exports.got = false;
module.exports.get = function ( options ){
	if( this.got == true ) return;
	this.got = true;
	if( options == undefined ) return console.error( '[ Error JC-Codes ]: You need to put all arguments correct' );
	if( options.message == undefined || options.reply == undefined || options.type == undefined ) return console.error( '[ Error JC-Codes ]: You need to put all arguments correct' );
	return [ function ( args ){
		let message = args[0]
		if( message.content == options.message ){
			if( options.type == 1 ) {
				return message.reply(options.reply);
			} else {
				return message.channel.send(options.reply);
			}
		}
	}, "message" ];
}

