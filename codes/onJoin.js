const Error = require( './error.js' );
const Inviter = require( './getInviter.js' );
module.exports.got = false;
module.exports.get = function ( options ){
	if( this.got == true ) return;
	this.got = true;
	if( options == undefined ) return Error( 'You need to put options', 'onJoin' );
	return [ function ( args ){
		
		let member = args[0]
		if( Array.isArray(options) ){
			for( var i = 0; i<options.length; i++ ){
				if( options[i].func ){
					
					options[i].func(args[0]);
					
				} else {
					if( options[i].channel == undefined || options[i].message == undefined ) return Error( 'You need to put all arguments correct', 'onJoin' );
					if( options[i].role ){
						member.addRole( options[i].role );
					}
					let channel = member.guild.channels.get(options[i].channel);
					Inviter.getInviter( member, function ( inviter ) {
						return channel.send( options[i].message.replace('[user]',member).replace('[inviter]',inviter) );
					});
				}
			}
		} else {
			if( options.func ){
					
				return options.func(args[0]);
				
			} else {
				if( options.channel == undefined || options.message == undefined ) return Error( 'You need to put all arguments correct', 'onJoin' );
				if( options.role ){
					member.addRole( options.role );
				}
				let channel = member.guild.channels.get(options.channel);
				Inviter.getInviter( member, function ( inviter ) {
					return channel.send( options.message.replace('[user]',member).replace('[inviter]',inviter) );
				});
			}
		}
	}, "guildMemberAdd" ];
}

