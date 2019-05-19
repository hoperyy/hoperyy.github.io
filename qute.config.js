/*
 * @bio.config.js
 */

module.exports = ({ userDir, srcDir, distDir, taskName, webpack, webpackDevServer }) => {
    return {
        // distDir: './dist', // dist dir; default is './dist'

        // port: 9000, // debug port; default is 9000

        replace: {
            $$_CDNURL_$$: {
                'dev-daily': '../static',
                'dev-pre': '../static',
                'dev-prod': '../static',
                'build-daily': '../static',
                'build-pre': '../static',
                'build-prod': '../static',
            },
        },

        // webpack config to be merged; webpack config style required
        webpackConfig: {

        },
    };
};
