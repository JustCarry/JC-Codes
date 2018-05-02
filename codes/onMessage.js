
const Error = require( './error.js' );
var AntiSpam = { };
module.exports.got = false;
module.exports.get = function ( options ){
	if( this.got == true ) return;
	this.got = true;
	if( options == undefined ) return Error( 'You need to put all arguments correct', 'onMessage' );
		return [ function ( args ){
			let message = args[0]
			if( Array.isArray(options) ){
				for( var i = 0; i<options.length; i++ ){
					if( options[i].func ){

						options[i].func(args[0]);

					} else {
						if( options[i].message == undefined || options[i].reply == undefined ) return Error( 'You need to put all arguments correct', 'onMessage' );
						if( message.content == options[i].message ){
							if( AntiSpam[ message.member ] ) return message.channel.send( options[i].spamMessage.replace('[user]',message.author).replace('[server]',message.guild.name) );
							if( options[i].spam != undefined ){
								AntiSpam[ message.member ] = setTimeout( function ( ){
									AntiSpam[ message.member ] = undefined;
								},options[i].spam);
							}
							message.channel.send(options[i].reply.replace('[user]',message.author).replace('[server]',message.guild.name));
							if( !message.guild ) return;
							if( options[i].addRole ){
								message.member.addRole( options[i].addRole );
							}
							if( options[i].removeRole ){
								message.member.removeRole( options[i].removeRole );
							}
						}
					}
				}
			} else {

				if( options.func ){
					return options.func(args[0]);

				} else {
					let message = args[0]
					if( options.message == undefined || options.reply == undefined ) return Error( 'You need to put all arguments correct', 'onMessage' );
					if( message.content == options.message ){
						if( AntiSpam[ message.member ] ) return message.channel.send( options.spamMessage.replace('[user]',message.author).replace('[server]',message.guild.name) );
						if( options.spam != undefined ){
							AntiSpam[ message.member ] = setTimeout( function ( ){
								AntiSpam[ message.member ] = undefined;
							},options.spam);
						}
						message.channel.send(options.reply.replace('[user]',message.author).replace('[server]',message.guild.name));
						if( !message.guild ) return;
						if( options.addRole ){
							message.member.addRole( options.addRole );
						}
						if( options.removeRole ){
							message.member.removeRole( options.removeRole );
						}
					}
				}
			}
		}, "message" ];
}


