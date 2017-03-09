'use strict'
require('shelljs/make')

const
    fs = require('fs'),
    mustache = require('mustache'),
    babelCore = require('babel-core'),
    {rollup} = require('rollup'),
    alias = require('rollup-plugin-alias'),
    commonjs = require('rollup-plugin-commonjs'),
    nodeResolve = require('rollup-plugin-node-resolve'),
    babel = require('rollup-plugin-babel'),
    //buble = require('rollup-plugin-buble'),
    replace = require('rollup-plugin-replace'),
    sourcemaps = require('rollup-plugin-sourcemaps')

const targets = {
    res () {
        console.log('target res')
        exec('mkdir -p dist/res')
        exec('cp res/*.ttf dist/res')
    },

    css () {
        console.log('target css')
        require('stylus')(fs.readFileSync(`${__dirname}/styl/ts.styl`, 'utf8'))
            .set('compress', false)
            .set('paths', [`${__dirname}/styl`])
            .include(require('nib').path)
            .render((err, css) => {
                if (err) throw err
                fs.writeFileSync('dist/theatersoft.css', css)
            })
    },

    svg () {
        console.log('target svg')
        const svg = require('svgstore')({
            cleanDefs: true,
            cleanObjects: ['fill', 'style'],
            customSVGAttrs: {display: "none"} // TODO https://github.com/svgstore/svgstore/pull/15
        })
        fs.readdirSync(`${__dirname}/svg`)
            .filter(name => name.slice(-4) === '.svg')
            .forEach(name => {
                console.log(name)
                svg.add(
                    `svg-${name.slice(0, -4)}`,
                    fs.readFileSync(`${__dirname}/svg/${name}`)
                )
            })
        fs.writeFileSync(`${__dirname}/res/icons.svg`, svg.toString({
            inline: true
        }))
        exec(`sed -i 's|<svg|<svg display="none"|g' ${__dirname}/res/icons.svg`)
    },

    html () {
        console.log('target html')
        exec('mkdir -p dist/dev')
        var
            model = {svg: fs.readFileSync('res/icons.svg', 'utf8'), js: 'theatersoft-client.min.js'},
            template = fs.readFileSync('index.template.html', 'utf8')
        fs.writeFileSync('dist/theatersoft-client.html', mustache.render(template, model))
        model.js = 'theatersoft-client.js'
        fs.writeFileSync('dist/dev/theatersoft-client.html', mustache.render(template, model))
        exec('cd dist; ln -snf theatersoft-client.html index.html')
        exec('cd dist/dev; ln -snf theatersoft-client.html index.html')
    },

    bundle () {
        console.log('target bundle')
        exec('rm -f dist/dev/*.js dist/*.js')
        return rollup({
            entry: `${__dirname}/src/app.js`,
            plugins: [
                alias({
                    //'preact-redux': `${__dirname}/../../preact-redux/dist/preact-redux.esm.js`
                    'preact-redux': `./preact-redux.esm.js`
                }),
                nodeResolve({
                    jsnext: true,
                    //module: true,
                    //browser: true, // https://github.com/rollup/rollup-plugin-node-resolve/issues/55
                    main: true,
                }),
                commonjs({
                    include: [
                        `${__dirname}/node_modules/**`,
                        `${__dirname}/src/**`
                    ]
                }),
                replace({
                    'process.env.NODE_ENV': JSON.stringify('production')
                }),
                sourcemaps(),
                typeof buble !== 'undefined' && buble({
                    target: {chrome: 52},
                    transforms: {modules: false},
                    jsx: 'h'
                }),
                typeof babel !== 'undefined' && babel({
                    plugins: [
                        [require("babel-plugin-transform-object-rest-spread"), {useBuiltIns: true}],
                        require("babel-plugin-transform-class-properties"),
                        [require("babel-plugin-transform-react-jsx"), {pragma: 'h'}],
                        //require("babel-plugin-transform-decorators-legacy"),
                        // babel-plugin-transform-decorators-legacy provided an invalid property of "default"
                    ]
                })
            ]
        })
            .then(bundle =>
                bundle.write({
                    dest: 'dist/dev/theatersoft-client.js',
                    format: 'iife',
                    moduleName: 'client',
                    sourceMap: 'inline'
                }))
            .then(() => {
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
                console.log('... target bundle')
            })
    },

    watch () {
        require('chokidar').watch(`${__dirname}/src`)
            .on('change', path => {
                console.log(path)
                module.exports.bundle()
            })
    },

    'watch-css' () {
        require('chokidar').watch(`${__dirname}/styl`)
            .on('change', path => {
                console.log(path)
                module.exports.css()
            })
    },

    all () {
        console.log('target preact-all')
        targets.res()
        targets.svg()
        targets.css()
        targets.html()
        return targets.bundle()
    }
}

Object.assign(target, targets)