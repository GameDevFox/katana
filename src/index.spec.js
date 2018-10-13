import 'source-map-support/register';

import chai from 'chai';

chai.should();

const context = require.context('./', true, /\.spec\.js$/);
context.keys().forEach(context);
