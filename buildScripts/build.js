/* eslint-disable no-console */

import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import 'colors';

process.env.NODE_ENV = 'production';

console.log('Generating minified bundle for production. This will take a moment...'.blue);

webpack(webpackConfig).run((error, stats) => {
    if (error) {
        console.log(error.red);
        return 1;
    }

    const jsonStats = stats.toJson();

    if (jsonStats.hasErrors) {
        return jsonStats.errors.map(error => console.log(error.red));
    }

    if (jsonStats.hasWarnings) {
        console.log('Webpack generated the following warnings: '.yellow);
        return jsonStats.warnings.map(error => console.log(error.yellow));
    }

    console.log(`Webpack stats: ${stats}`);

    console.log('Your app has been built for production and written to /dist!'.green);

    return 0;
});
