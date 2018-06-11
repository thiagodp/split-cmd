/**
 * Split a command into an array.
 *
 * @example
 * ```js
 * var arr = split( 'git commit -m "some message with spaces"' );
 * console.log( arr ); // [ "git", "commit", "-m", "some message with spaces" ]
 * ```
 *
 * @param {string} command Command to split.
 * @returns {Array}
 */
function split( command ) {
    if ( typeof command !== 'string' ) {
        throw new Error( 'Command must be a string' );
    }

    var r = command.match( /[^"\s]+|"(?:\\"|[^"])*"/g );
    if ( ! r ) {
        return [];
    }

    return r.map( function ( expr ) {
        var isQuoted = expr.charAt( 0 ) === '"' && expr.charAt( expr.length - 1 ) === '"';
        return isQuoted ? expr.slice( 1, -1 ) : expr;
    } );
}

/**
 * Split a command into an object with the attributes `command` and `args`.
 *
 * @example
 * ```js
 * var obj = splitToObject( 'git commit -m "some message with spaces"' );
 * console.log( obj.command ); // git
 * console.log( obj.args ); // [ "commit", "-m", "some message with spaces" ]
 * ```
 *
 * @param {string} command Command to split.
 * @returns {object}
 */
function splitToObject( command ) {
    var cmds = split( command );
    switch( cmds.length ) {
        case 0: return {};
        case 1: return { command: cmds[ 0 ] };
        default: {
            var first = cmds[ 0 ];
            cmds.shift();
            return { command: first, args: cmds };
        }
    }
}

module.exports = { split, splitToObject };