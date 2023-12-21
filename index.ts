/**
 * Split a command into an array.
 *
 * @example
 * ```js
 * const arr = split( 'git commit -m "some message with spaces"' );
 * console.log( arr ); // [ "git", "commit", "-m", "some message with spaces" ]
 * ```
 *
 * @param {string} command Command to split.
 * @returns {Array}
 */
export function split( command: string ): string[] {

    if ( typeof command !== 'string' ) {
        throw new Error( 'Command must be a string' );
    }

    const r = command.match( /[^"\s]+|"(?:\\"|[^"])*"/g );
    if ( ! r ) {
        return [];
    }

    return r.map( function ( expr ) {
        const isQuoted = expr.charAt( 0 ) === '"' && expr.charAt( expr.length - 1 ) === '"';
        return isQuoted ? expr.slice( 1, -1 ) : expr;
    } );
}

/**
 * Split a command into an object with the attributes `command` and `args`.
 *
 * @example
 * ```js
 * const obj = splitToObject( 'git commit -m "some message with spaces"' );
 * console.log( obj.command ); // git
 * console.log( obj.args ); // [ "commit", "-m", "some message with spaces" ]
 * ```
 *
 * @param {string} command Command to split.
 * @returns {object}
 */
export function splitToObject( command: string ): { command?: string, args?: string[] } {
    const cmds = split( command );
    switch( cmds.length ) {
        case 0: return {};
        case 1: return { command: cmds[ 0 ] };
        default: {
            const first = cmds[ 0 ];
            cmds.shift();
            return { command: first, args: cmds };
        }
    }
}
