'use strict'
require('shelljs/make')
process.on('unhandledRejection', e => console.log(e))

const
    pkg = require('./package.json'),
    name = pkg.name.startsWith('@theatersoft') && pkg.name.slice(13),
    DIST = process.env.DIST === 'true',
    fs = require('fs'),
    path = require('path'),
    writeJson = (file, json) => fs.writeFileSync(file, JSON.stringify(json, null, '  '), 'utf-8'),
    components = path.dirname(require.resolve('@theatersoft/components')),
    mustache = require('mustache'),
    babelCore = require('babel-core'),
    {rollup} = require('rollup'),
    commonjs = require('rollup-plugin-commonjs'),
    nodeResolve = require('rollup-plugin-node-resolve'),
    babel = require('rollup-plugin-babel'),
    replace = require('rollup-plugin-replace'),
//sourcemaps = require('rollup-plugin-sourcemaps'),
    postcss = require('rollup-plugin-postcss'),
    stylus = require('stylus'),
    postcssModules = require('postcss-modules'),
    cssExportMap = {},
    postcssImport = require("postcss-import"),
    cssnano = require('cssnano'),
    includePaths = require('rollup-plugin-includepaths')

const targets = {
    clean () {
        console.log('target clean')
        exec('mkdir -p dist')
        exec('rm -rf dist/*')
    },

    res () {
        console.log('target res')
        exec('mkdir -p dist/res')
        exec(`cp ${components}/res/* dist/res`)
    },

    svg () {
        console.log('target svg')
        const svg = require('svgstore')({
            cleanDefs: true,
            cleanObjects: ['fill', 'style'],
            customSVGAttrs: {display: "none"} // TODO https://github.com/svgstore/svgstore/pull/15
        })
        fs.readdirSync('svg')
            .filter(name => name.slice(-4) === '.svg')
            .forEach(name => {
                console.log(name)
                svg.add(
                    `svg-${name.slice(0, -4)}`,
                    fs.readFileSync(`svg/${name}`)
                )
            })
        fs.writeFileSync('_icons.svg', svg.toString({
            inline: true
        }))
        exec(`sed -i 's|<svg|<svg display="none"|g' _icons.svg`)
    },

    html () {
        console.log('target html')
        exec('mkdir -p dist/dev')
        var
            model = {svg: fs.readFileSync('_icons.svg', 'utf8'), js: 'theatersoft-client.min.js'},
            template = fs.readFileSync('index.template.html', 'utf8')
        fs.writeFileSync('dist/index.html', mustache.render(template, model))
        model.js = 'theatersoft-client.js'
        fs.writeFileSync('dist/dev/index.html', mustache.render(template, model))
    },

    async bundle () {
        console.log('target bundle')
        const bundle = await rollup({
            entry: 'src/index.js',
            plugins: [
                postcss({
                    preprocessor: (content, id) => new Promise((resolve, reject) => {
                        console.log('preprocess', id)
                        const renderer = stylus(content, {
                            filename: id,
                            sourcemap: {inline: true},
                            compress: false,
                            paths: ['styl', 'node_modules']
                        })
                        renderer.render((err, code) =>
                            err ? reject(err) : resolve({code, map: renderer.sourcemap})
                        )
                    }),
                    extensions: ['.css', '.styl'],
                    sourceMap: !DIST, // true, "inline" or false
                    extract: 'dist/theatersoft.css',
                    plugins: [
                        postcssModules({
                            getJSON(id, exportTokens) {cssExportMap[id] = exportTokens},
                            generateScopedName: DIST ? '[hash:4]' : '_[name]_[local]',
                            globalModulePaths: [
                                '@theatersoft/components/components.css',
                                '@theatersoft/zwave/zwave.css'
                            ]
                        }),
                        postcssImport(),
                        ...(DIST ? [cssnano()] : [])
                    ],
                    getExport: id => cssExportMap[id]
                }),
                includePaths({
                    include: {
                        '@theatersoft/bus': 'node_modules/@theatersoft/bus/bus.browser.es.js'
                    }
                }),
                commonjs({
                    include: [
                        'node_modules/**'
                    ]
                }),
                nodeResolve({
                    jsnext: true,
                    module: true,
                    //skip: ['@theatersoft/bus']
                }),
                replace({
                    'process.env.NODE_ENV': JSON.stringify('production')
                }),
                //sourcemaps(),
                babel({
                    exclude: 'node_modules/**',
                    plugins: [
                        [require("babel-plugin-transform-object-rest-spread"), {useBuiltIns: true}],
                        require("babel-plugin-transform-class-properties"),
                        [require("babel-plugin-transform-react-jsx"), {pragma: 'h'}],
                        //require("babel-plugin-transform-decorators-legacy"),
                        // babel-plugin-transform-decorators-legacy provided an invalid property of "default"
                        require("babel-plugin-external-helpers"),
                    ]
                })
            ]
        })
        await bundle.write({
            dest: 'dist/dev/theatersoft-client.js',
            format: 'iife',
            moduleName: 'client',
            sourceMap: 'inline'
        })
        fs.writeFileSync('dist/theatersoft-client.min.js', babelCore.transformFileSync('dist/dev/theatersoft-client.js', {
            babelrc: false,
            //exclude: 'node_modules/**',
            comments: false,
            minified: true,
            plugins: [
                require("babel-plugin-minify-constant-folding"),
                require("babel-plugin-minify-dead-code-elimination"),
                require("babel-plugin-minify-flip-comparisons"),
                //FAIL require("babel-plugin-minify-guarded-expressions"), // breaks client pinpad
                require("babel-plugin-minify-infinity"),
                require("babel-plugin-minify-mangle-names"),
                require("babel-plugin-minify-replace"),
                //FAIL require("babel-plugin-minify-simplify"),
                require("babel-plugin-minify-type-constructors"),
                require("babel-plugin-transform-member-expression-literals"),
                require("babel-plugin-transform-merge-sibling-variables"),
                require("babel-plugin-transform-minify-booleans"),
                require("babel-plugin-transform-property-literals"),
                require("babel-plugin-transform-simplify-comparison-operators"),
                require("babel-plugin-transform-undefined-to-void")
            ]
        }).code)
        //exec('cp src/worker/index.js dist/dev/theatersoft-worker.js')
        console.log('... target bundle')
    },

    package () {
        console.log('target package')
        writeJson('dist/package.json', Object.assign({}, pkg, {private: !DIST, dist: undefined}, pkg.dist))
        exec('cp -r res manifest.json LICENSE COPYRIGHT README.md .npmignore dist')
        exec('sed "s|\"/\"|\"/dev/\"|" manifest.json > dist/dev/manifest.json')
        exec('cp src/worker/index.js dist/theatersoft-worker.js')
        exec('cp src/worker/index.js dist/dev/theatersoft-worker.js')
        exec('touch dist/main.js')
        if (DIST) exec('rm -r dist/dev')
    },

    publish () {
        console.log('target publish')
        exec('npm publish --access=public dist')
    },

    async watch () {
        await targets.all()
        require('chokidar').watch([
                'src',
                `${components}/*.js`,
                `${path.dirname(require.resolve('@theatersoft/automation'))}/*.es.js`,
                `${path.dirname(require.resolve('@theatersoft/focus'))}/*.es.js`,
                `${path.dirname(require.resolve('@theatersoft/x10'))}/*.es.js`,
                `${path.dirname(require.resolve('@theatersoft/zwave'))}/*.es.js`
            ])
            .on('change', path => {
                console.log(new Date().toLocaleTimeString(), path)
                targets.bundle()
                    .then(targets.package)
            })
            .on('error', e => console.log(e))
    },

    async all () {
        console.log('target all')
        targets.res()
        targets.svg()
        targets.html()
        await targets.bundle()
        targets.package()
    }
}

Object.assign(target, targets)
