var events = {
	"message":[ ],
	"guildMemberAdd":[ ],
	"guildMemberRemove":[ ]
}
var count = 0;
const Error = require('./codes/error.js');
const getInviter = require('./codes/getInviter.js');
var Inviters = { };


function addEvent( eventName ){
	module.exports.client.on( eventName, ( ...args ) =>{
		for ( var i = 0; i < events[eventName].length; i++ ){
			events[eventName][i]( args );
		}
	});
}
module.exports.client = undefined;
module.exports.ready = false;

module.exports.setClient = function ( client ){
	this.client = client;
	getInviter.client = client;
	this.client.on( 'ready', ( ) => { 
		module.exports.ready = true;
		this.client.guilds.forEach( ( g ) => { Inviters[ g.id ] = { [g.owner.id]: g.owner } } )
		getInviter.start( );
	});
	this.client.on( 'guildMemberAdd', ( m ) => { 
		getInviter.getInviter( m, function ( inviter ) {
			Inviters[ m.guild.id ][ m.id ] = inviter;
		});
	});
}


module.exports.getInviter = function ( member ){
	if( this.ready == false ) return Error('You should wait until client is ready!', 'getInviter'); 
	if( Inviters[ member.guild.id ][ member.id ] == undefined ) {
		return member;
	} else {
		return Inviters[ member.guild.id ][ member.id ];
	}
}
module.exports.getRole = function ( name ){
	if( this.ready == false ) return Error('You should wait until client is ready!', 'getRole'); 
	if( this.client == undefined ) return Error('You didn\'t set a client please set one', 'getRole'); 
	if( name == undefined ) return Error( 'You need to put all arguments correct' );
	var guild = this.client.guilds.filter( g => g.roles.filter( ( r ) => r.name.indexOf( name ) > -1 ) ).first().id;
	return this.client.guilds.get(guild).roles.filter( ( r ) => r.name.indexOf( name ) > -1 ).first( );
}

module.exports.add = function ( codeName, options ){
	count++;
	if( !require( './codes/' + codeName + '.js'  ) ) return Error('codeName isn\'t correct, check it out', 'Add');
	var code = require( './codes/' + codeName + '.js' ).get( options );
	return events[code[1]][events[code[1]].length] = code[0];
};

module.exports.exec = function ( ) {
	
	if( this.client == undefined ) return Error('You didn\'t set a client please set one', 'Exec'); 
	if( count > 0 ){
		addEvent( "message" );
		addEvent( "guildMemberAdd" );
		addEvent( "guildMemberRemove" );
	}	
}

