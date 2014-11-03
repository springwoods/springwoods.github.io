'use strict';
var themeConfig = {
    init: false,
    options: {
        color: 'red-1',
        background: 'light',
        layout: 'wide',
        direction: 'ltr'
    },
    colors: [
        {
            'Hex': '#E73013',
            'colorName': 'red-1'
        },
        {
            'Hex': '#cd2016',
            'colorName': 'red-2'
        },
        {
            'Hex': '#499ef4',
            'colorName': 'blue-1'
        },
        {
            'Hex': '#2072c5',
            'colorName': 'blue-2'
        },
        {
            'Hex': '#15c315',
            'colorName': 'green-1'
        },
        {
            'Hex': '#11a311',
            'colorName': 'green-2'
        },
        {
            'Hex': '#c3b116',
            'colorName': 'yellow-1'
        },
        {
            'Hex': '#afa020',
            'colorName': 'yellow-2'
        },
        {
            'Hex': '#FE9900',
            'colorName': 'orange-1'
        },
        {
            'Hex': '#F46B27',
            'colorName': 'orange-2'
        },
        {
            'Hex': '#8d49f4',
            'colorName': 'purple-1'
        },
        {
            'Hex': '#5815bd',
            'colorName': 'purple-2'
        },
        {
            'Hex': '#f449ee',
            'colorName': 'pink'
        },
        {
            'Hex': '#C0B188',
            'colorName': 'cumin'
        }
    ],
    backgrounds: [
        {
            'Hex': '#F5F5F5',
            'colorName': 'light'
        },
        {
            'Hex': '#0d1d31',
            'colorName': 'dark'
        }
    ],
    layouts: [
        {
            'Hex': '#999999',
            'layoutName': 'wide'
        },
        {
            'Hex': '#999999',
            'layoutName': 'boxed'
        }
    ],
    directions: [
        {
            'Hex': '#999999',
            'directionName': 'ltr'
        },
        {
            'Hex': '#999999',
            'directionName': 'rtl'
        }
    ],
    initialize: function () {
        var $this = this;
        if (this.init) return;

        $('head').append($('<link rel="stylesheet">').attr('href', 'assets/js/theme-config.css'));
        $this.build();
        $this.events();

        if ($.cookie('color') != null) {
            $this.setColor($.cookie('color'));
        } else {
            $this.setColor(themeConfig.options.color);
        }

        if ($.cookie('background') != null) {
            $this.setBackground($.cookie('background'));
        } else {
            $this.setBackground(themeConfig.options.background);
        }

        if ($.cookie('layout') != null) {
            $this.setLayout($.cookie('layout'));
        } else {
            $this.setLayout(themeConfig.options.layout);
        }

        if ($.cookie('direction') != null) {
            $this.setDirection($.cookie('direction'));
        } else {
            $this.setDirection(themeConfig.options.direction);
        }

        if ($.cookie('init') == null) {
            $this.container.find('.theme-config-head a').click();
            $.cookie('init', true);
        }

        $this.init = true;
    },
    build: function () {
        var $this = this;
        var config = $('<div />')
            .attr('id', 'themeConfig')
            .addClass('theme-config visible-lg')
            .append($('<h4 />').html('Settings')
                .addClass('theme-config-head')
                .append($('<a />')
                    .attr('href', '#')
                    .append($('<i />')
                        .addClass('fa fa-cog fa-spin'))), $('<div />')
                .addClass('theme-config-wrap')
                .append($('<h5 />')
                    .addClass('theme-config-title')
                    .html('Predefined Colors'), $('<ul />')
                    .addClass('options colors')
                    .attr('data-type', 'colors'))
                .append($('<hr />')
                    .addClass('theme-config-divider')
                    .html(''), $('<ul />')
                    .addClass('options reset-settings')
                    .attr('data-type', 'reset'))
        );
        $('body').append(config);
        this.container = $('#themeConfig');

        var themeColorList = this.container.find('ul[data-type=colors]');
        $.each(themeConfig.colors, function (i, value) {
            var color = $('<li />').append($('<a />')
                .css('background-color', themeConfig.colors[i].Hex)
                .attr({
                'data-color-hex': themeConfig.colors[i].Hex,
                'data-color-name': themeConfig.colors[i].colorName,
                'href': '#',
                'title': themeConfig.colors[i].colorName
            }).html(themeConfig.colors[i].colorName));
            themeColorList.append(color);
        });

        themeColorList.find('a').click(function (e) {
            e.preventDefault();
            $this.setColor($(this).attr('data-color-name'));
        });

        //

        var themeBackgroundList = this.container.find('ul[data-type=backgrounds]');
        $.each(themeConfig.backgrounds, function (i, value) {
            var background = $('<li />').append($('<a />')
                .css('background-color', themeConfig.backgrounds[i].Hex)
                .css('color', $.cookie('background'))
                .attr({
                'data-color-hex': themeConfig.backgrounds[i].Hex,
                'data-color-name': themeConfig.backgrounds[i].colorName,
                'href': '#',
                'title': themeConfig.backgrounds[i].colorName
            }).html(themeConfig.backgrounds[i].colorName));
            themeBackgroundList.append(background);
        });

        themeBackgroundList.find('a').click(function (e) {
            e.preventDefault();
            $this.setBackground($(this).attr('data-color-name'));
        });

        //

        var layoutList = this.container.find('ul[data-type=layouts]');
        $.each(themeConfig.layouts, function (i, value) {
            var layout = $('<li />').append($('<a />').css('background-color', themeConfig.layouts[i].Hex).attr({
                'data-color-hex': themeConfig.layouts[i].Hex,
                'data-layout-name': themeConfig.layouts[i].layoutName,
                'href': '#',
                'title': themeConfig.layouts[i].layoutName
            }).html(themeConfig.layouts[i].layoutName));
            layoutList.append(layout);
            layoutList.find('a').click(function (e) {
                e.preventDefault();
                $this.setLayout($(this).attr('data-layout-name'));
                theme.onResize();
            });
        });

        //

        var directionList = this.container.find('ul[data-type=directions]');
        $.each(themeConfig.directions, function (i, value) {
            var direction = $('<li />').append($('<a />').css('background-color', themeConfig.directions[i].Hex).attr({
                'data-color-hex': themeConfig.directions[i].Hex,
                'data-direction-name': themeConfig.directions[i].directionName,
                'href': '#',
                'title': themeConfig.directions[i].directionName
            }).html(themeConfig.directions[i].directionName));
            directionList.append(direction);
            directionList.find('a').click(function (e) {
                e.preventDefault();
                $this.setDirection($(this).attr('data-direction-name'));
            });
        });

        var themeConfigReset = this.container.find('ul[data-type=reset]');
        var themeResetLink = $('<li />').append(
            $('<a />')
                .attr({'href': '#','title': 'Reset settings'})
                .html('Reset settings').addClass('reset-settings-link')
        );
        themeConfigReset.append(themeResetLink);
        themeConfigReset.find('a').click(function (e) {
            e.preventDefault();
            $this.reset();
        });

    },
    events: function () {
        var $this = this;
        $this.container.find('.theme-config-head a').click(function (e) {
            e.preventDefault();
            if ($this.container.hasClass('active')) {
                $this.container.animate({
                    right: '-' + $this.container.width() + 'px'
                }, 300).removeClass('active');
            } else {
                $this.container.animate({
                    right: '0'
                }, 300).addClass('active');
            }
        });
        if ($.cookie('showConfig') != null) {
            $this.container.find('.theme-config-head a').click();
            $.removeCookie('showConfig');
        }
    },
    setColor: function (color) {
        var $this = this;
        var $colorConfigLink = $('#theme-config-link');
        if (this.isChanging) {
            return false;
        }
        $colorConfigLink.attr('href', 'assets/css/theme-' + color + '.css');
        $.cookie('color', color);
    },
    setBackground: function (background) {
        $.each(themeConfig.backgrounds, function (i, value) {
            $('body').removeClass('body-' + themeConfig.backgrounds[i].colorName);
        });
        $('body').addClass('body-' + background);
        $.cookie('background', background);
        /*if (background == 'dark') {
            $('.partners-carousel img').each(function () {
                var arr = $(this).attr('src').split('/');
                $(this).attr('src', 'assets/img/partner/' + background + '/' + arr[arr.length - 1]);
            });
        } else {
            $('.partners-carousel img').each(function () {
                var arr = $(this).attr('src').split('/');
                $(this).attr('src', 'assets/img/partner/light/' + arr[arr.length - 1]);
            });
        }*/
    },
    setLayout: function (layout) {
        //$('body').removeAttr('class');
        $('body').removeClass('wide').removeClass('boxed');
        $('body').addClass(layout);
        $.cookie('layout', layout);
        setTimeout(function(){$.waypoints('refresh');},100);
    },
    setDirection: function (direction) {
        $('body').removeClass('ltr').removeClass('rtl');
        $('body').addClass(direction);
        $.cookie('direction', direction);
    },
    reset: function () {
        $.removeCookie('color');
        //$.removeCookie('background');
        //$.removeCookie('layout');
        //$.removeCookie('direction');
        $.cookie('showConfig', true);
        window.location.reload();
    }
};
themeConfig.initialize();