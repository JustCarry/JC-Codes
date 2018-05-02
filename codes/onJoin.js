const Error = require( './error.js' );
const Inviter = require( './getInviter.js' );
var Canvas;
var jimp;


function sendImage( member, count, invitedBy, channel, type ){
		let Image = Canvas.Image,
		canvas = new Canvas(700,500, 100),
		ctx = canvas.getContext('2d');
		var url;
		var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
		
		if( type == 1 ){
			gradient.addColorStop(0, "red");
			gradient.addColorStop(0.5, "black");
			gradient.addColorStop(1.0, "red");
			url = "https://e.top4top.net/p_851ewqpr1.png";
		} else if( type == 2 ) {
			gradient.addColorStop(0, "magenta");
			gradient.addColorStop(0.4, "blue");
			gradient.addColorStop(0.6, "blue");
			gradient.addColorStop(1.0, "magenta");
			url = "https://f.top4top.net/p_85116a912.png";
		} else if( type == 3 ) {
			gradient.addColorStop(0, "magenta");
			gradient.addColorStop(0.5, "blue");
			gradient.addColorStop(1.0, "magenta");
			url = "https://a.top4top.net/p_8514u4ds3.png";
		}
        ctx.patternQuality = 'bilinear';
        ctx.filter = 'bilinear';
        ctx.antialias = 'subpixel';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 1;
		jimp.read( url, ( er, image ) => {
			if( er ) throw er;
			var x = 250;
			var y = 30;
			var width = 200;
			var height = 200;
			var radius = 10;
			image.getBuffer( jimp.MIME_JPEG, ( er, img ) => {
				if( er ) throw er;
				jimp.read( member.user.displayAvatarURL, ( er, image1 ) => {
					if( er ) throw er;
					image1.getBuffer( jimp.MIME_JPEG, ( er, img1 ) => {
						if( er ) throw er;	
						let background = new Canvas.Image;
						let avatar = new Canvas.Image;
						background.src = img;
						avatar.src = img1;
						ctx.patternQuality = 'bilinear';
						ctx.filter = 'bilinear';
						ctx.antialias = 'subpixel';
						ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
						ctx.shadowOffsetY = 2;
						ctx.shadowBlur = 1;
						ctx.drawImage(background,0,0,700,500);
						ctx.font = '30px Arial';
						ctx.fillStyle = "#ffffff";
						ctx.textAlign = "center";
						ctx.save();
						ctx.beginPath();
						ctx.moveTo(x + radius, y);
						ctx.lineTo(x + width - radius, y);
						ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
						ctx.lineTo(x + width, y + height - radius);
						ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
						ctx.lineTo(x + radius, y + height);
						ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
						ctx.lineTo(x, y + radius);
						ctx.quadraticCurveTo(x, y, x + radius, y);
						ctx.closePath();
						ctx.clip();
						ctx.drawImage(avatar,250,30,200,200);
						ctx.lineWidth = 5;
						ctx.strokeStyle = gradient;
						ctx.stroke();
						ctx.restore();
						ctx.strokeStyle = gradient
						ctx.lineWidth = 5;
						ctx.strokeText(member.displayName, 350,325);
						ctx.fillStyle = 'white'; 
						ctx.fillText(member.displayName, 350,325);
						ctx.strokeStyle = gradient
						ctx.lineWidth = 5;
						ctx.strokeText('You\'re member number: '+ count, 350,375);
						ctx.fillStyle = 'white';
						ctx.fillText('You\'re member number: '+ count, 350,375);
						/*ctx.strokeStyle = gradient
						ctx.lineWidth = 5;
						ctx.strokeText('You\'ve invited by: '+invitedBy.username + "#" + invitedBy.discriminator, 350,425);
						ctx.fillStyle = 'white';
						ctx.fillText('You\'ve invited by: '+invitedBy.username + "#" + invitedBy.discriminator, 350,425);	*/
						channel.send( member + ',', { files: [ canvas.toBuffer( ) ] } )
					});
				});
			});
		});
}

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
					let channel = member.guild.channels.get(options[i].channel) || member.guild.channels.find('name', options[i].channel);
					Inviter.getInviter( member, function ( inviter ) {
						if( options[i].photo != undefined ){
							if( Canvas == undefined ) {
								Canvas = require( 'canvas' );
								jimp = require( 'jimp' );
							}
							return sendImage( member, member.guild.memberCount, inviter, channel, options.photo[i] )
						} else {
							return channel.send( options[i].message.replace('[user]',member).replace('[inviter]',inviter).replace('[server]',member.guild.name) );
						}
					});
				}
			}
		} else {
			if( options.func ){
					
				return options.func(args[0]);
				
			} else {
				if( options.channel == undefined || options.message == undefined && options.photo == undefined ) return Error( 'You need to put all arguments correct', 'onJoin' );
				if( options.role ){
					member.addRole( options.role );
				}
				let channel = member.guild.channels.get(options.channel) || member.guild.channels.find('name', options.channel);
				Inviter.getInviter( member, function ( inviter ) {
					if( options.photo != undefined ){
						if( Canvas == undefined ) {
							Canvas = require( 'canvas' );
							jimp = require( 'jimp' );
						}
						return sendImage( member, member.guild.memberCount, inviter, channel, options.photo )
					} else {
						return channel.send( options.message.replace('[user]',member).replace('[inviter]',inviter).replace('[server]',member.guild.name) );
					}
				});
			}
		}
	}, "guildMemberAdd" ];
}

