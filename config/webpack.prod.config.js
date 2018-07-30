import { DefinePlugin } from 'webpack';
import { smart } from 'webpack-merge';

import baseConfig from './webpack.base.config';
import optimizationConfig from './webpack.opt.config';

const productionConfiguration = function (env) {
  const NODE_ENV = env.NODE_ENV ? env.NODE_ENV : 'development';
  return {
    plugins: [
      new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(NODE_ENV) }),
    ],
  };
};

export default smart(baseConfig, optimizationConfig, productionConfiguration);
