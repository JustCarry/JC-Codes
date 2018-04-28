module.exports.got = false;
module.exports.get = function ( options ){
	if( this.got == true ) return;
	this.got = true;
	return [ function ( args ){
		
		let member = args[0]
		
		if( options == undefined || options.channel == undefined ) return console.error( '[ Error JC-Codes ]: You need to put all arguments correct' );
		let channel = member.guild.channels.get(options.channel);
		if( options.message == undefined ) {
			return channel.send( 'Welcome ' + member + '!' );
		} else {
			var message = options.message.replace('[user]',member);
			return channel.send( message );
		}
		
	}, "guildMemberAdd" ];
}

