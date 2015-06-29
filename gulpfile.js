var gulp = require('gulp'), // +
    newer = require('gulp-newer'),
    watch = require('gulp-watch'), // +
    prefixer = require('gulp-autoprefixer'), // +
    uglify = require('gulp-uglify'), // +
    concat = require('gulp-concat'), // +
    less = require('gulp-less'), // +
    sourcemaps = require('gulp-sourcemaps'), // +-
    rigger = require('gulp-rigger'), // +
    fileinclude = require('gulp-file-include'), // +
    preprocess = require('gulp-preprocess'), // +
    prettify = require('gulp-prettify'), //
    wiredep = require('wiredep'), // для взаимодействия с bower_components
    cssmin = require('gulp-minify-css'), // минификатор css
    imagemin = require('gulp-imagemin'), // для оптимизации изображений
    pngquant = require('imagemin-pngquant'), // компонент для imagemin
    rimraf = require('rimraf'), // для зачистки каталога app/
    sftp = require('gulp-sftp'); // для закгрузки файлов на сервер, через sftp

var path = {
    source: {
        html: 'src/',
        js: 'src/js/',
        css: 'src/style/',
        img: 'src/img/**.*',
        fonts: 'src/fonts/'
    },
    main: {
        js: 'src/js/**/*.js',
        css: 'src/style/**/*.less'
    },
    comp: {
        globalBlockStyle: 'comp/globalBlock/*/style/*.less',
        globalBlockJs: 'comp/globalBlock/*/js/*.js',
        baseStyle: 'comp/base/*/style/*.less',
        baseJs: 'comp/base/*/js/*.js',
        viewStyle: 'comp/view/*/style/*.less',
        viewJs: 'comp/view/*/js/*.js',
        html: 'comp/**/*.html'
    },
    page: {
        html: 'app/',
        assets: 'app/assets/'
    },
    build: {
        html: 'build/',
        js: 'build/assets/js/',
        css: 'build/assets/css/',
        img: 'build/assets/img/',
        fonts: 'build/assets/fonts/'
    }
};

// Clean folder ./app
gulp.task('clean:app', function (cb) {
    rimraf(path.page.html, cb);
});
gulp.task('clean:img', function (cb) {
    rimraf(path.page.assets+'img/', cb);
});


/**
 * STYLE TASKS
 */
/* compile all less complete in css */
gulp.task('less:tocss', function () {
    gulp.src('src/style/*.less')
        .pipe(sourcemaps.init())
        //.pipe(plumber())
        .pipe(less())
        //.pipe(prefixer('last 2 versions', '> 1%', 'safari 5', 'ie 9', 'opera 12.1'))
        .pipe(cssmin({keepBreaks:true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/assets/css'))
});
/* compile main complete in css */
gulp.task('main:tocss', function () {
    gulp.src('src/style/main.less')
        //.pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        //.pipe(prefixer('last 2 versions', '> 1%', 'safari 5', 'ie 9', 'opera 12.1'))
        .pipe(cssmin({keepBreaks:true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/assets/css'))
});
/* compile base complete in css */
gulp.task('base:tocss', function () {
    gulp.src('src/style/comp.base.less')
        //.pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        //.pipe(prefixer('last 2 versions', '> 1%', 'safari 5', 'ie 9', 'opera 12.1'))
        .pipe(cssmin({keepBreaks:true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/assets/css'))
});
/* compile global complete in css */
gulp.task('global:tocss', function () {
    gulp.src('src/style/comp.global.less')
        //.pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        //.pipe(prefixer('last 2 versions', '> 1%', 'safari 5', 'ie 9', 'opera 12.1'))
        .pipe(cssmin({keepBreaks:true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/assets/css'))
});
/* compile view complete in css */
gulp.task('view:tocss', function () {
    gulp.src('src/style/comp.view.less')
        //.pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        //.pipe(prefixer('last 2 versions', '> 1%', 'safari 5', 'ie 9', 'opera 12.1'))
        .pipe(cssmin({keepBreaks:true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/assets/css'))
});


/* live: development part "main" include => .less
 /* but rest styles compile in and include=> css */
gulp.task('live:main', ['base:tocss', 'global:tocss', 'view:tocss', 'watch'], function () {
    gulp.src(path.source.html+'/*.html')
        .pipe(preprocess({
            context: {
                NODE_ENV: 'main'
            }}
        ))
        .pipe(fileinclude())
        .pipe(gulp.dest(path.page.html));
});
/* live: development part "base" include => .less
/* but rest styles compile in and include=> css */
gulp.task('live:base', ['main:tocss', 'global:tocss', 'view:tocss', 'watch'], function () {
    gulp.src(path.source.html+'/*.html')
        .pipe(preprocess({
            context: {
                NODE_ENV: 'base'
            }}
        ))
        .pipe(fileinclude())
        .pipe(gulp.dest(path.page.html));
});
/* live: development part "global" include => .less
 /* but rest styles compile in and include=> css */
gulp.task('live:global', ['main:tocss', 'base:tocss', 'view:tocss', 'watch'], function () {
    gulp.src(path.source.html+'/*.html')
        .pipe(preprocess({
            context: {
                NODE_ENV: 'global'
            }}
        ))
        .pipe(fileinclude())
        .pipe(gulp.dest(path.page.html));
});
/* live: development part "view" include => .less
 /* but rest styles compile in and include=> css */
gulp.task('live:view', ['main:tocss', 'base:tocss', 'global:tocss', 'watch'], function () {
    gulp.src(path.source.html+'/*.html')
        .pipe(preprocess({
            context: {
                NODE_ENV: 'view'
            }}
        ))
        .pipe(fileinclude())
        .pipe(gulp.dest(path.page.html));
});

/**
 * BUILD STYLES
 */
gulp.task('build:css', function () {
    gulp.src('src/style/*.less')
        .pipe(less())
        .pipe(concat('build.css'))
        .pipe(prefixer('last 2 versions', '> 1%', 'safari 5', 'ie 9', 'opera 12.1'))
        .pipe(cssmin({keepBreaks:true}))
        .pipe(gulp.dest('app/assets/css'))
});



/**
 * FONTS
 */
gulp.task('fonts', function () {
    gulp.src('src/font/*.*')
        .pipe(gulp.dest('app/assets/font/'))
});



/**
 * JAVASCRIPT COMPILE
 */
// local js compile
gulp.task('local:js', function () {
    gulp.src(path.source.js+'/main.js') //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.page.assets+'js/')); //Выплюнем готовый файл в build
});
// build js compile
gulp.task('build:js', function () {
    gulp.src(path.source.js+'/build.js')
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.page.assets+'js/'));
});



/**
 * IMAGE OPTIMIZE
 */
gulp.task('local:img', function () {
    gulp.src(path.source.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.assets+'img/')) //И бросим в assets
        .pipe(reload({stream: true}));
});

/* watcher */
gulp.task('build:img', ['clean:img','local:img']);



/**
 * APPLICATION TASKS
 */
var context = ['main','base','global','view','build'];
// page development
gulp.task('local:app', function () {
    gulp.src(path.source.html+'/*.html')
        .pipe(rigger())
        .pipe(preprocess({
            context: {
                NODE_ENV: context[3] // include this variables for development path (one of these: 'main','base','global','view')
            }}
        ))
        .pipe(fileinclude())
        .pipe(prettify({
            indent_size: 4
           /** => /node_modules/gulp-prettify/node_modules/js-beautify/js/lib/beautify-html.js <= fix unformatted tags list
            * unformatted: ['a', 'span', 'img', 'bdo', 'em', 'strong', 'dfn', 'code', 'samp', 'kbd',
                'var', 'cite', 'abbr', 'acronym', 'q', 'sub', 'sup', 'tt', 'i', 'b', 'big', 'small', 'u', 's', 'strike',
                'font', 'ins', 'del', 'pre', 'address', 'dt', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] */
        }))
        .pipe(gulp.dest(path.page.html));
});

/**
 * SFTP
 */
gulp.task('server:sftp', function () {
    return gulp.src('app/*')
        .pipe(sftp({
            host: '*host_path',
            auth: 'keyUser'
        }));
});


/**
 * DEV WATCHERS STYLE TASKS
 */
/* watcher */
gulp.task('watch', function(){

    // change *.html: src in root & components template
    watch([path.source.html+'/*.html', path.comp.html], function() {
        gulp.start('local:app');
    });
});


/* default */
gulp.task('default', ['clean:app', 'local:app', 'fonts', 'less:tocss', 'local:js', 'watch']);

/* build */
gulp.task('build', ['clean:app', 'fonts', 'build:css', 'build:js', 'local:app', 'build:html']);



/**
 * todo: WARNING!!!
 * Есть один нюанс, которому пока не найдено более красивое решение!
 * При разработке важно обращать внимание на значение контекста,
 * которое передается препроцессору в gulp-таске 'local:app':
 * => NODE_ENV: значение_контекста
 * --------------
 *
 * значение_контекста может быть равно одному из этих значений:
 * 'main'
 * 'base'
 * 'global'
 * 'view'
 * 'build'
 * Пример: NODE_ENV: 'main'
 * Все значения вынесены в массив var context = ['main','base','global','view','build'],
 * поэтому можно подставлять нужное значение из массива, например: NODE_ENV: context[0]
 * --------------
 *
 * HOW IT WORK???
 * **************
 * Это значение влияет на подключение тех или иных файлов стилей и скриптов
 * на компилируемуе страницы. То есть, если девелопер работает работает с файлами,
 * из папки comp/view/..., в значение_контекста нужно передать
 * context[3] либо 'view'.
 * И после этого запустить gulp-таск 'live:view'
 * --------------
 *
 * FOR WHAT AND WHY???
 * *******************
 * При этом происходит следующее:
 * Во все HTML-странички компилируются и подключаются CSS других разделов
 * assets/css/main.css
 * assets/css/comp.base.css
 * assets/css/comp.global.css
 * а стили для компонентов из папки comp/view/... подключаются в виде less
 * src/style/comp.view.less
 * и соответсвенно компилируются на лету браузером
 * --------------
 *
 * При сборке билда нужно передать в значение_контекста => 'build' либо context[4]
 * и запустить gulp-таск 'live:build'
 * Тогда gulp скомпилирует одну общую CSS => build.css и одну общую JS => build.js
 * и подключит во все HTML-странички
 */