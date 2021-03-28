import path from 'path';
import json from '@rollup/plugin-json';
import ts from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';

const packagesDir = path.resolve(__dirname, 'packages');
const packageDir = path.resolve(packagesDir, process.env.TARGET);
const resolve = (p) => path.resolve(packageDir, p);

const pkg = require(resolve('package.json'));
const name = path.basename(packageDir);
const outputConfig = {
    'esm-bundler': {
        file: resolve(resolve(`dist/${name}.esm-bundler.js`)),
        format: 'es'
    },
    'cjs': {
        file: resolve(resolve(`dist/${name}.cjs.js`)),
        format: 'cjs'
    },
    'global': {
        file: resolve(resolve(`dist/${name}.global.js`)),
        format: 'iife'
    }
};

function ceateConfig(format, output) {
    output.name = options.name;
    output.sourcemap = true;
    return {
        input: resolve('src/index.ts'),
        output,
        plugins: [
            json(),
            ts({
                tsconfig: path.resolve(__dirname, 'tsconfig.json')
            }),
            nodeResolve()
        ]
    };
}

const options = pkg.buildOptions;
export default options.formats.map(format => ceateConfig(format, outputConfig[format]));
