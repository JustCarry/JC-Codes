const Error = require( './error.js' );
module.exports.got = false;
module.exports.get = function ( options ){
	if( this.got == true ) return;
	this.got = true;
	return [ function ( args ){
		
		let member = args[0]
		if( Array.isArray(options) ){
			for( var i = 0; i<options.length; i++ ){
				if( options[i].func ){
					
					options[i].func(args[0]);
					
				} else {
					if( options[i] == undefined || options[i].channel == undefined || options[i].message == undefined ) return Error( 'You need to put all arguments correct', 'onLeave' );
					let channel = member.guild.channels.get(options[i].channel);
					channel.send( options[i].message.replace('[user]',member) );
				}
			}
		} else {
			if( options.func ){
					
				return options.func(args[0]);
				
			} else {
				if( options == undefined || options.channel == undefined || options.message == undefined ) return Error( 'You need to put all arguments correct', 'onLeave' );
				let channel = member.guild.channels.get(options.channel);
				return channel.send( options.message.replace('[user]',member) );
			}
		}
	}, "guildMemberRemove" ];
}

