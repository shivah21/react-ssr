require( "babel-register" )( {
    presets: [ "env" ],
    plugins: [
        [
            "css-modules-transform",
            {
                camelCase: true,
                extensions: [ ".css", ".scss" ],
            },
        ],
        "dynamic-import-node",
    ],
} );
const server = require( "./src/server" );

module.exports = server;