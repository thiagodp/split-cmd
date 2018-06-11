# split-cmd

> 💦 Split a command into an array or an object

Useful for splitting a command to use with NodeJS' [child process](https://nodejs.org/api/child_process.html) methods, like [spawn](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options), [exec](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback), and [execFile](https://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback), as well with libs like [execa](https://github.com/sindresorhus/execa). No external dependencies.

## Install

```bash
npm install --save split-cmd
```

## Examples

### Splitting into an array

```js
var split = require( 'split-cmd' ).split;
var arr = split( 'git commit -m "some message with spaces"' );
console.log( arr ); // [ "git", "commit", "-m", "some message with spaces" ]
```

### Splitting into an object

```js
var splitToObject = require( 'split-cmd' ).splitToObject;
var obj = splitToObject( 'git commit -m "some message with spaces"' );
console.log( obj.command ); // git
console.log( obj.args ); // [ "commit", "-m", "some message with spaces" ]
```

### Using it with execa

```js
const { splitToObject } = require( 'split-cmd' );
const execa = require( 'execa' );

// Executing a single command
const obj = splitToObject( 'echo "I see unicorns"' );
execa( obj.command, obj.args )
    .then( result => console.log( result.stdout ) ) // I see unicorns
    .catch( error => console.log( error ) );

// Executing multiple commands in batch
[
    'echo "I see unicorns"',
    'mkdir foo',
    'touch foo/bar.txt'
]
.map( s => splitToObject( s ) )
.forEach( obj => {
    execa( obj.command, obj.args )
        .then( result => console.log( result.stdout ) )
        .catch( error => console.log( error ) );
} );
```

## API

```js
/**
 * Split a command into an array.
 *
 * @param {string} command Command to split.
 * @returns {Array}
 */
split( command: string ): string[]

/**
 * Split a command into an object with the attributes `command` and `args`.
 *
 *
 * @param {string} command Command to split.
 * @returns {object}
 */
splitToObject( command: string ): object
```

## License

MIT © [Thiago Delgado Pinto](https://github.com/thiagodp)