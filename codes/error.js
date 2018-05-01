

module.exports = function ( text, func ){
	console.log("\x1b[41m", 'Problem: '+text+'! ( Function JC-Codes '+func+' )')
	console.log("\x1b[0m");
	return process.exit(1);
}

