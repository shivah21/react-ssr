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

module.exports = require( "./src/server.js" );