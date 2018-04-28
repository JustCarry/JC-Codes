let codes = {
	1: "MessageAR.js",
	2: "Greeting.js"
};
var events = {
	"message":[ ],
	"guildMemberAdd":[ ]
}
var count = 0;
module.exports.client = undefined;

module.exports.setClient = function ( client ){
	this.client = client;
}
module.exports.add = function ( codenumber, options ){
	if( !codenumber ) return console.error( "Error [ JC-Codes ]: You must to put first argument 'Codenumber' in func 'add'");
	count++;
	var code = require( './codes/' + codes[codenumber] ).get( options );
	return events[code[1]][events[code[1]].length] = code[0];
};

module.exports.exec = function ( ) {
	
	if( this.client == undefined ) return console.error( "Error [ JC-Codes ]: You must to put client, to put it use setClient func" );
	if( count > 0 ){
		this.client.on( "message", ( ...args ) =>{
			for ( var i = 0; i < events["message"].length; i++ ){
				events["message"][i]( args );
			}
		});
		
		this.client.on( "guildMemberAdd", ( ...args ) =>{
			for ( var i = 0; i < events["guildMemberAdd"].length; i++ ){
				events["guildMemberAdd"][i]( args );
			}
		});
		
	}	
}