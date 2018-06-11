// Run these tests with Jest

var lib = require( '..' );

describe( 'split-cmd', function () {

  describe( '#split()', function () {

    it( 'throws when parameter is undefined', function () {
      expect( lib.split ).toThrow();
    } );

    it( 'throws when parameter is null', function ( done ) {
      try {
        lib.split( null );
        done.fail();
      } catch( e ) {
        done();
      }
    } );

    it( 'throws when parameter is not string', function ( done ) {
      try {
        lib.split( 1 );
        done.fail();
      } catch( e ) {
        done();
      }
    } );

    it( 'returns an empty array for an empty string', function () {
      expect( lib.split( '' ) ).toEqual( [] );
    } );

    it( 'allows a command with no arguments', function () {
      expect( lib.split( 'foo' ) ).toEqual( [ 'foo' ] );
    } );

    describe( 'allows a command with a single argument', function () {

      it( 'simple', function () {
        expect( lib.split( 'foo bar' ) ).toEqual( [ 'foo', 'bar' ] );
      } );

      it( 'dashed', function () {
        expect( lib.split( 'foo -bar' ) ).toEqual( [ 'foo', '-bar' ] );
      } );

      it( 'double dashed', function () {
        expect( lib.split( 'foo --bar' ) ).toEqual( [ 'foo', '--bar' ] );
      } );

      it( 'slashed', function () {
        expect( lib.split( 'foo /bar' ) ).toEqual( [ 'foo', '/bar' ] );
      } );

      it( 'with quotes', function () {
        expect( lib.split( 'foo "some"' ) ).toEqual( [ 'foo', 'some' ] );
      } );

      it( 'with quotes containing empty content', function () {
        expect( lib.split( 'foo ""' ) ).toEqual( [ 'foo', '' ] );
      } );

      it( 'with quotes containing content with spaces', function () {
        expect( lib.split( 'foo "some argument with spaces"' ) ).toEqual(
          [ 'foo', 'some argument with spaces' ]
        );
      } );

      it( 'with quotes containing escaped quotes', function () {
        expect( lib.split( 'foo "\\""' ) ).toEqual( [ 'foo', '\\"' ] );
      } );

      it( 'with quotes containing content with spaces and escaped quotes', function () {
        expect( lib.split( 'foo "some \\"argument\\" with spaces"' ) ).toEqual(
          [ 'foo', 'some \\"argument\\" with spaces' ]
        );
      } );

    } );

    it( 'allows more than one argument', function () {
      expect( lib.split( 'git commit -m "some message"') ).toEqual(
        [ 'git', 'commit', '-m', 'some message' ]
      );
    } );

    it( 'allows arguments with symbols', function () {
      expect( lib.split( 'git commit -m "some message" && git push & git log --oneline' ) ).toEqual(
        [ 'git', 'commit', '-m', 'some message', '&&', 'git', 'push', '&', 'git', 'log', '--oneline' ]
      );
    } );


  } ); // #split()


  describe( '#splitToObject()', function() {

    it( 'returns an empty object when command is empty', function() {
      expect( lib.splitToObject( '' ) ).toEqual( {} );
    } );

    it( 'returns an object with a property "command" containing the given command', function() {
      expect( lib.splitToObject( 'foo' ) ).toEqual( { command: 'foo' } );
      expect( lib.splitToObject( ' foo ' ) ).toEqual( { command: 'foo' } );
    } );

    it( 'returns an object with the properties "command" and "args" when arguments are given', function() {
      expect( lib.splitToObject( 'foo bar' ) ).toEqual( { command: 'foo', args: [ 'bar' ] } );
    } );

    it( 'allows arguments with symbols', function () {
      expect( lib.splitToObject( 'git commit -m "some message" && git push & git log --oneline' ) ).toEqual(
        {
          command: 'git',
          args: [ 'commit', '-m', 'some message', '&&', 'git', 'push', '&', 'git', 'log', '--oneline' ]
        }
      );
    } );

  } );

} );