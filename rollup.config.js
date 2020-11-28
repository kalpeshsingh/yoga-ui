/** native modules **/
import path from 'path';

/** 3P libraries **/
import { getPackages } from '@lerna/project';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

/** plugins **/
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import cleanup from 'rollup-plugin-cleanup';
import filesize from 'rollup-plugin-filesize';

// get all lerna packages to perform build on individual package
async function getAllPackages() {
    const packages = await getPackages(__dirname);
    return packages;
}

const main = async function () {
    const config = [];
    // Support --scope and --ignore globs if passed in via commandline
    const packages = await getAllPackages();

    packages.forEach((pkg) => {
        /* Absolute path to package directory */
        const basePath = path.relative(__dirname, pkg.location);
        const src = `${basePath}/src`;

        /* Absolute path to input file */
        const input = path.join(src, 'index.ts');
        /* "main" field from package.json file. */
        const { main, module, browser } = pkg.toJSON();
        /* Push build config for this package. */
        config.push({
            input,
            output: [
                { file: `${basePath}/${main}`, format: 'cjs', exports: 'default' },
                { file: `${basePath}/${module}`, format: 'es' },
                {
                    file: `${basePath}/${browser}`,
                    format: 'umd',
                    name: basePath.split('/')[1],
                    globals: {
                        react: 'React',
                        'react-dom': 'ReactDOM',
                        'styled-components': 'StyledComponents',
                    },
                    plugins: [terser({ format: { comments: false } })],
                },
            ],
            plugins: [
                json(),
                babel({ exclude: 'node_modules/**', babelHelpers: 'runtime' }),
                peerDepsExternal(),
                resolve(),
                typescript({ tsconfig: `${basePath}/tsconfig.json` }),
                cleanup({ comments: false }),
                filesize(),
            ],
        });
    });
    return config;
};

export default main();
