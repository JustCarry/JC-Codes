let JSON = { };


module.exports.client = undefined;

module.exports.start = function ( ) {
	this.client.guilds.forEach( ( g ) => { 
		g.fetchInvites().then( ( i ) => {
			i.forEach( ( invite ) => {
				JSON[ invite.code ] = invite.uses;
			});
		});
	});
}

module.exports.getInviter = function ( member, callback ){
	var inviter = false;
	member.guild.fetchInvites( ).then ( ( i ) => {
		i.forEach( ( invite ) => {
			if( invite.uses > JSON[ invite.code ] ){
				if( inviter == false ) {
					callback(invite.inviter);
					inviter = true;
				}
			}
		});
	});
}

