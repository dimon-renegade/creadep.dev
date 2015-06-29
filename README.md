# CREADEP.DEV v-1.0.0

### После клонирования выполнить команды:
    bower install
    npm install
    
### Вся разработка ведется в папках 
    /comp = независимый модуль со стилями и скриптами для него
    /src = исходники - каркасы страниц, а также сборщики стилей (less-файл, в который инклудятся другие файлы), 
                                                сборщики скриптов (js-файл, в который инклудятся другие файлы),
                                                неоптимизированные картинки, исходники спрайтов(в PSD), шрифты и тд...
##### Готовые страницы появляются в папке /app, туда же в папку /assets компилируются css/js и остальное:
    /app
        /assets
            /font => файлы кастомных шрифтов продублированные из /src/font
            /img => оптимизированные картинки из /src/img
            /css => скомпилированный, склеенный и минифицированный CSS-файл
            /js => скомпилированный, склеенный и минифицированный JS-файл
        /popup => файлы попапов
        *.html => все страницы проекта 
### Source:
    /src
        /font => кастомные шрифты
        /img
            /pic => картинки, которые будут подгружаться из админки
            /sys => картинки, которые являются элементом дизайна
        /js
            /package => локальные плагины
            /page => скрипты использующие на неких страницах
            main.js => сборщик всех библиотек, плагинов и локальных скриптов
        /style
            /system => переменные, миксины, утилиты и прочее ни к какой конкретной сущности не относящееся 
            /package => 
            /page => стили использующие блоки на неких страницах
            main.less => сборщик стилей из папки /src
            comp.base.less => сборщик стилей из папки /comp/base
            comp.global.less => сборщик стилей из папки /comp/global
            comp.view.less => сборщик стилей из папки /comp/view

### Components:
    /comp
        /global
            /header
                /template
                    header.html
                /style
                    header.less
                /js
                    header.js
            /sidebar
                /template
                    sidebar.html
                    sidebar-game.html
                /style
                    sidebar.less
                /js
                    sidebar.js
            /footer
                /template
                    footer.html
                    footer-short.html
                /style
                    footer.less
    ---------------------------------------------
        /base
            /table
                /template
                    table-type.html
                    table-winners.html
                    table-loosers.html
                /style
                    table.less
            /title
                /template
                    h1.html
                    h2.html
                    h3.html
                    h4.html
                    h5.html
                    h6.html
                /style
                    title.less
            /text
                /template
                    p.html
                    p-large.html
                    p-small.html
                    ul-li.html
                    ol-li.html
                /style
                    text.less {
                        p.less
                        ul-li.less
                        ol-li.less
                        table.less
                        colors.less {все цвета текста описать классами}
                    }
                /js
                    -none
            /forms
                /label
                    /template
                        label-sm.html
                        label-md.html
                        label-lg.html
                    /style
                        label.less
                    /js
                /field
                    /template
                        input-sm.html
                        input-md.html
                        input-lg.html
                    /style
                        input.less
                    /js
                /radio-checkbox
                    /template
                        radio.html
                        checkbox.html
                    /style
                        radio-checkbox.less
                    /js
                        radio-checkbox.js
                /select
                    /template
                    /style
                    /js
                        /lib
                            chosen.min.js
                        /concat
                            select.js
    ---------------------------------------------
        /view
            /button
                /template
                    btn-lg-red.html
                    btn-lg-blue.html
                    btn-md-red.html
                    btn-md-blue.html
                    btn-sm-red.html
                    btn-sm-blue.html
                /style
                    button.less
                /js
                    if(ieFix) {
                        buttonIe.js
                    } else {
                        -none
                    }
            /thumb
                /template
                    thumb.html
                    thumb_hall-of-fame.html
                /style
                    thumb.less
                /js
                    thumb.js
            /nav
                /template
                    nav-btn.html
                    nav-head.html
                    nav-pager.html
                    nav-footer.html
                /style
                /js
            /userbar
                /template
                /style
                /js
            /jackpot
                /template
                /style
                /js
            /timer
                /template
                /style
                /js
            /carousel
                /template
                /style
                /js
            /accordeon
                /template
                /style
                /js
    ---------------------------------------------

## Порядок выполнения задач:

    1. Базовая структура, общие каркасы страниц (главная, текстовая, игровая, страницы ошибок) с использованием grid
    2. Структура попапов, типизация видов и размеров - определение типовых классов (4 размера + класс popup-custom с плавающим размером)
    3. Определение стилей для базовых элементов - текст, ссылки, заголовки, списки, таблицы
    4. Элементы формы, и хинты в них, если нужно с использованием модификаторов размеров -
        инпуты, радиобаттоны, чекбоксы, текстареа и селекты (+ внутренний скролл)
    5. Кнопки всех модификаций - стили должны быть универсальны для любых элементов:
        <a class="btn">
        <div class="btn">
        <button class="btn">
    6. Иконки, которые типизированны - соц сети, фильтры ...
    7. Верстка независимых модулей
    8. Создание страниц и попапов


### Модули:
    1. Дропдауны обычный в стилистике форм и селектов
    2. Аккордеоны (2 вараинта) и Табы обычные
    3. Пейджер
    4. Джекпот
    5. Таймер
    6. ...




### Методология БЭМ-подобия (пока без полноценных гайдов, просто на примере):
    
     <div class="popup popup__md" id="popup-profile"> 
        <!--  
         => .popup - глобальный класс с общими стилями для всех попапов 
         => .popup__md - модификатор, указывает на размер 
         => id="popup-profile" - уникальный ID будет использоваться только для взаимодействия с JS 
         -->
         <div class="popup-header">  
            <!-- 
            => .popup-header - глобальный класс с общими стилями для всех попапов, если он незначительно отличается 
                из-за родительского модификатора .popup__md, тогда пишем через наследование от .popup__md изменения стиля 
            -->
            <div class="popup-title popup-title__lg popup-title__red text-center">
                <!-- 
                => .popup-title - глобальный класс с общими стилями для всех попапов
                => .popup-title__lg - модификатор, указывает на размер 
                => .popup-title__red - модификатор, указывает на стиль цвета, и он свойственен только для тайта попапа
                => .text-center - глобальный класс с выравниванием текста по центру - но только если нет никаких 
                    логических привязок к другим подобным элементам, и если именно в этом попапе он отличается от всех остальных
                -->
                 <div class="popup-title_icon"></div>
                 <!-- 
                 => .popup-title_icon - в этот раз мы сохраняем вложенность в названии класса, но так как тут скорее 
                    всего подразумевается специфическая иконка для заголовка, а вообще иконок в попапе может быть 
                    много разных. Поэтому не рекомендуется юзать просто .popup-icon
                 -->
                 <div class="popup-title_text text-uppercase"></div>
             </div>
         </div>
         <div class="popup-container">
            
            <div class="timer">
                <!-- 
                => .timer - другой блок, хоть и находится в попапе, и по возможности не должен никак - ни в классах ни в стилях - 
                    пересекаться с тем, что он находится внутри попапа. 
                -->
                <div class="timer-pattern">
                    <div class="timer-num">1</div>
                    <div class="timer-num">2</div>
                    <div class="timer-pattern_name">minutes</div>
                    <!-- 
                    Важный момент: вроде бы оба класса - .timer-num и .timer-pattern_name - находятся на одном уровне и
                     имеют одного родителя .timer-pattern, это блок, который по логике объединяет в себе 2 цифры обозначающие
                     кол-во минут + название паттерна - "минут"
                    => .timer-num - по логике самодостаточен - представляет собой цифру(одну) таймера, собсно 
                    => .timer-pattern_name - зависимый от патерна элемент, так как именует его
                        PS: на самом деле не страшно, если блок .timer-num будет именован .timer-pattern_num - но в 
                        таких мелочах и кроется, на мой взгляд, логическая оптимизация именований классов. если соблюдать 
                        правила зависимости и самодостаточности - код будет понятнее и логически и по структуре
                    -->
                </div>
            </div>
            
         </div>
         <div class="popup-footer"></div>
     </div>
     
     Подходить к БЭМу нужно аккуратно и с умом =) очень важно - не хотелось бы видеть полную вложенность в названиях 
     классов, то есть вот такое, это антипаттерн:
     
     <div class="popup popup__md">
         <div class="popup-header popup__md-header">
             <div class="popup-header-title popup-header-title__lg popup-header-title__red popup-header-title__text-center">
                 <div class="popup-header-title_icon"></div>
                 <div class="popup-header-title_text popup-header-title_text__text-uppercase"></div>
             </div>
         </div>
         <div class="popup-container popup__md-container">
         
             <div class="timer popup-timer или timer__popup">
                 <div class="timer-pattern popup-timer-pattern или timer-pattern__popup">
                     <div class="timer-pattern-num popup-timer-pattern-num">1</div>
                     <div class="timer-pattern_name popup-timer-pattern-name">minutes</div>
                 </div>
             </div>
         </div>
         <div class="popup-footer popup__md-footer"></div>
     </div>
     

### Классы используемые для модификации размеров блоков (попапы, кнопки ...):
     *__sm
     *__md
     *__lg
     *__hg
     
     *Например:*
     <div class="popup popup__sm"></div>
     <div class="popup popup__md"></div>
     <div class="popup popup__lg"></div>
     <div class="popup popup__hg"></div>

### Для иконок использовать(если это не должно быть именно ссылкой, если это внутри ссылки, то опять же юзаем тег i):
    <i class="icon">

### В браузере запускаем страницы из папки /app, но в них мы никаких правок никогда не делаем - эти страницы генерируются из наших шаблонов.
    В папке /src лежат исходники html, например index.html
    В этом файле мы прописываем все инклуды и собсно свой html-код если нужно.
    Задачей local:app - происходит компиляция страницы в папку /app.
    Задача local:app включена в любую из команд live/... и в watch, поэтому вручную именно ее вызывать почти не приходится.

### Работаем в режиме watch c компонентами (папка /comp). В /comp хранятся все базовые шаблоны вместе со стилями и функционалом.
###### Внутри /comp находятся 4 логических каталога:
    /base -- типовые элементы
    /globalBlock -- глобальные блоки, типа header, footer, sidebar
    /view -- все остальные вьюшки, buttons, icons, timer, jackpot и прочее...
    /meta -- как обычно - шаблоны подключений внешних файлов css/js (пока не используем)


###### Для работы с компонентами, нужно запустить одну из задач gulp live:task, в зависимости от того над каким типом темплейтов ведется работа. Это сделано для того чтобы разделить компиляцию css/js на many tasks, чтобы watcher + compile не занимали много времени. В результате мы получаем скомпилированные и подключенные цсс, тех блоков над которыми мы не работаем и подключение в виде less для того темплейта над которым работа ведется прямо сейчас
###### Например, работу ведем с шаблоном footer
    это глобальный блок, его папка находится в /comp/globalBlock/

    для него созданы подкаталоги /js, /style, /template, в которых хранятся все зависимости этого блока
    то есть все стили для футера мы пишем в
        /comp/globalBlock/style/footer.less,
    всю логику js пишем в
        /comp/globalBlock/js/
    и сам шаблон футера в формате html пишем в
        /comp/globalBlock/template/footer.html

###### Develop-режим для компиляции страниц, стилей и скриптов

     WARNING!!!
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
     Пример: NODE_ENV: 'main'
        * Все значения вынесены в массив var context = ['main','base','global','view','build'],
        * поэтому можно подставлять нужное значение из массива, например: NODE_ENV: context[0]
        * --------------
        *
     HOW IT WORK???
     **************
        * Это значение влияет на подключение тех или иных файлов стилей и скриптов
        * на компилируемуе страницы. То есть, если девелопер работает работает с файлами,
        * из папки comp/view/..., в значение_контекста нужно передать
        * context[3] либо 'view'.
        * И после этого запустить gulp-таск 'live:view'
        * --------------
        *
     FOR WHAT AND WHY???
     *******************
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

##### Для взаимодействия с удаленным сервером используется gulp-таск 'server:sftp'. В самом таске нужно прописать адрес сервера
    gulp.task('server:sftp', function () {
        return gulp.src('app/*')
            .pipe(sftp({
                host: '*host_path',
                auth: 'keyUser'
            }));
    });
    
    *******************
    где *host_path => адрес сервера
##### Для этого нужно создать файл .ftppass, который добавлен в .gitignorе. Файл .ftppass должен иметь такой вид:
    {
        "keyUser": {
            "user": "*user-name",
            "pass": "*user-password",
            "remotePath": "/*user-name/*project_folder/public/"
        }
    }
    
    *******************
    Где:
    => "user-name" - имя юзера
    => "user-password" - пароль юзера
    => "project_folder" - папка проэкта на сервере 
