'use strict'
require('shelljs/make')

const
    pkg = require('./package.json'),
    name = pkg.name.startsWith('@theatersoft') && pkg.name.slice(13),
    DIST = process.env.DIST === 'true',
    fs = require('fs'),
    mustache = require('mustache'),
    babelCore = require('babel-core'),
    {rollup} = require('rollup'),
    alias = require('rollup-plugin-alias'),
    commonjs = require('rollup-plugin-commonjs'),
    nodeResolve = require('rollup-plugin-node-resolve'),
    babel = require('rollup-plugin-babel'),
    replace = require('rollup-plugin-replace'),
    sourcemaps = require('rollup-plugin-sourcemaps'),
    postcss = require('rollup-plugin-postcss'),
    stylus = require('stylus')

const targets = {
    res () {
        console.log('target res')
        exec('mkdir -p dist/res')
        exec('cp res/*.ttf dist/res')
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
        fs.writeFileSync('res/icons.svg', svg.toString({
            inline: true
        }))
        exec(`sed -i 's|<svg|<svg display="none"|g' res/icons.svg`)
    },

    html () {
        console.log('target html')
        exec('mkdir -p dist/dev')
        var
            model = {svg: fs.readFileSync('res/icons.svg', 'utf8'), js: 'theatersoft-client.min.js'},
            template = fs.readFileSync('index.template.html', 'utf8')
        fs.writeFileSync('dist/index.html', mustache.render(template, model))
        model.js = 'theatersoft-client.js'
        fs.writeFileSync('dist/dev/index.html', mustache.render(template, model))
    },

    async bundle () {
        console.log('target bundle')
        exec('rm -f dist/dev/*.js dist/*.js')
        const bundle = await rollup({
            entry: 'src/index.js',
            plugins: [
                //alias({
                //}),
                postcss({
                    preprocessor: (content, id) => new Promise((resolve, reject) => {
                        const renderer = stylus(content, {
                            filename: id,
                            sourcemap: {inline: true},
                            compress: false,
                            paths: ['styl']
                        })
                        renderer.render((err, code) =>
                            err ? reject(err) : resolve({code, map: renderer.sourcemap})
                        )
                    }),
                    extensions: ['.styl'],
                    //sourceMap: true, // true, "inline" or false
                    extract: 'dist/styles.css'
                }),
                nodeResolve({
                    jsnext: true,
                    module: true,
                    //browser: true, // https://github.com/rollup/rollup-plugin-node-resolve/issues/55
                    main: true,
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
        if (DIST) exec('rm -r dist/dev')
        console.log('... target bundle')
    },

    package () {
        console.log('target package')
        const p = Object.assign({}, pkg, {
            main: 'main.js',
            private: !DIST,
            devDependencies: undefined,
            distScripts: undefined,
            scripts: pkg.distScripts
        })
        fs.writeFileSync('dist/package.json', JSON.stringify(p, null, '  '), 'utf-8')
        exec('cp LICENSE COPYRIGHT README.md .npmignore main.js dist')
    },

    publish () {
        console.log('target publish')
        exec('npm publish --access=public dist')
    },

    watch () {
        require('chokidar').watch('src')
            .on('change', path => {
                console.log(path)
                targets.bundle()
            })
    },

    'watch-css' () {
        require('chokidar').watch('styl')
            .on('change', path => {
                console.log(path)
                targets.css()
            })
    },

    async all () {
        console.log('target all')
        targets.res()
        targets.svg()
        //targets.css()
        targets.html()
        await targets.bundle()
        targets.package()
    }
}

Object.assign(target, targets)
Object.entries(require('./test/build-test.js')).forEach(([k, v]) => {target[`test-${k}`] = v})
