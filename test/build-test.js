'use strict'
require('shelljs/make')

const
    fs = require('fs'),
    mustache = require('mustache'),
    {rollup} = require('rollup'),
    alias = require('rollup-plugin-alias'),
    babelPlugin = require('rollup-plugin-babel'),
    commonjs = require('rollup-plugin-commonjs'),
    nodeResolve = require('rollup-plugin-node-resolve'),
    sourcemaps = require('rollup-plugin-sourcemaps'),
    babel = require('babel-core'),
    postcss = require('rollup-plugin-postcss'),
    options = {
        entry: `${__dirname}/test.js`,
        plugins: [
            alias({
                'preact-redux': `${__dirname}/preact-redux.mock.js`
            }),
            nodeResolve({
                jsnext: true,
                //browser: true, // https://github.com/rollup/rollup-plugin-node-resolve/issues/55
                main: true
            }),
            commonjs({
                include: [
                    `${__dirname}/../node_modules/**`,
                    `${__dirname}/*`
                ]
            }),
            sourcemaps(),
            postcss({
                extensions: ['.css']
            }),
            babelPlugin({
                plugins: [
                    require('babel-plugin-external-helpers'),
                    require('babel-plugin-transform-object-rest-spread'),
                    require('babel-plugin-transform-class-properties'),
                    [require('babel-plugin-transform-react-jsx'), {pragma: 'h'}]
                ]
            })
        ],
        dest: 'dist/test/theatersoft-test.js',
        format: 'iife',
        moduleName: 'boot',
        sourceMap: 'inline'
    }

const targets =
{
    html () {
        console.log('target test-html')
        exec('mkdir -p dist/test')
        var
            model = {svg: fs.readFileSync('res/icons.svg', 'utf8'), js: 'theatersoft-test.js'},
            template = fs.readFileSync('test/test.template.html', 'utf8')
        fs.writeFileSync('dist/test/index.html', mustache.render(template, model))
    },

    css () {
        console.log('target test-css')
        require('stylus')(fs.readFileSync(`${__dirname}/styl/ts.styl`, 'utf8'))
            .set('compress', false)
            .set('paths', [`${__dirname}/../styl`, `${__dirname}/styl`])
            .include(require('nib').path)
            .render((err, css) => {
                if (err) throw err
                fs.writeFileSync('dist/test/theatersoft.css', css)
            })
    },

    bundle () {
        console.log('target bundle')
        rollup(options)
            .then(bundle =>
                bundle.write(options))
    },

    watch () {
        console.log('target test-watch')
        const
            watch = require('rollup-watch'),
            watcher = watch({rollup}, options)
        watcher.on('event', event => {
            console.log(event)
        })

        require('chokidar').watch([`${__dirname}/../styl`, `${__dirname}/styl`])
            .on('change', path => {
                console.log(path)
                targets.css()
            })
    },

    reload () {
        console.log('target test-reload')
        const
            livereload = require('livereload'),
            read = n => {try {return fs.readFileSync(`${process.env.HOME}/.config/theatersoft/${n}`, 'utf8').trim()} catch (e) {}},
            server = livereload.createServer({
                https: {key: read('server.key'), cert: read('server.cer')}
            })
        server.watch('dist/test')
    },

    all () {
        console.log('target test-all')
        targets.html()
        targets.css()
        targets.bundle()
    }
}

module.exports = targets