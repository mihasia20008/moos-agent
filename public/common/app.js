function namespace(namespaceString) {
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';
    for (var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }
    return parent;
}
namespace('uas');
/**
 *  Document events
 */

$(document).ready(function(){
    $('a.js_modal').modal({
        // scrollable: true,
        // scrollbar: true,
        afterShow: function (parent) {
            $.ujs.onComplete(parent);
            uas.script.modalOverflow(parent, true);
        },
        beforeRemove: function (parent) {
            $('input', parent).autocomplete('dispose');
        }
    });
});

/**
 * Делаем проверку сессии camunda для тех запросов, которые не возвращают ошибку авторизации
 */
$(document).ajaxSend(function (event, xhr, settings) {
    if (typeof $.cookie('JWT') === "undefined") {
        if (settings.url.indexOf('/ajax/process/new') == 0 ||
            settings.url.indexOf('/ajax/task/change') == 0 ||
            settings.url.indexOf('/api/task/change') == 0 ||
            settings.url.indexOf('/api/search') == 0 ||
            settings.url.indexOf('/api/company/search') == 0 ||
            settings.url.indexOf('/api/report/common/tasktypes') == 0 ||
            settings.url.indexOf('/api/report/allorders') == 0 ||
            settings.url.indexOf('/api/report/allstages') == 0 ||
            settings.url.indexOf('/api/report/all3d') == 0 ||
            settings.url.indexOf('/api/report/normative') == 0 ||
            settings.url.indexOf('/api/report/funds') == 0 ||
            settings.url.indexOf('/ajax/task/camunda') == 0)
        {
            $.getJSON('/check_expired_session', function (res) {
                if (res.status == 'expired') {
                    $.getJSON('/api/logout', function (data) {});
                    window.location.href = '/?session=expired';
                }
            });
        }
    }
});
/**
 * Обрабатываем ошибки авторизации при запросах,идущих на сторонний сервер.
 */
window.onerror = function(msg, url, line, col, error) {
    $.getJSON('/check_expired_session', function (res) {
        if (res.status == 'expired') {
            $.getJSON('/api/logout', function (data) {
            });
            window.location.href = '/?session=expired';
        }
    });
};
$(document).ajaxSuccess(function (event, xhr, settings) {
    if (typeof(uas.session) === 'function') {
        uas.session('touch');
    }
});
$(document).ajaxError(function (event, jqXHR, ajaxSettings, thrownError) {
    if (jqXHR.status === 424) {
        $('body').addOverlay(); // { content: 'Переадресация, пожалуйста подождите...' }
        $.getJSON('/api/logout', function (data) {
            if (data && !data.error_code) {
                window.location.href = '/?session=expired';
            } else {
                $('body').removeOverlay();
            }
        });
    }
});
$(document).on('click.menu', '.js_menu', function (event) {
    event.preventDefault();
    var $this = $(this),
        $parent = $this.parent();
    if ($parent.hasClass('active')) {
        setTimeout(function () {
            $parent.removeClass('active');
        }, 0);
    } else {
        setTimeout(function () {
            $parent.addClass('active');
            if ($this.data('fade')) {
                $('body').prepend('<div id="fade"></div>');
            }
        }, 0);
    }
});
$(document).on('click', function (event) {
    $('.js_bind_active.active').removeClass('active');
    $('#fade').remove();
});
$(document).on('click.reset', 'a.js_reset', function (event) {
    event.preventDefault();
    var $form = $(this).closest('form');
    if ($form.length) {
        var elements = $form[0].elements;
        for (var i = 0, length = elements.length; i < length; i++) {
            var element = elements[i];
            if (element.className.indexOf('js_noreset') !== -1) {
                continue;
            }
            switch (element.type.toLowerCase()) {
                case 'text':
                case 'hidden':
                case 'textarea':
                    element.value = '';
                    break;
                case 'radio':
                case 'checkbox':
                    element.checked = false;
                    break;
                case 'select':
                case 'select-one':
                case 'select-multi':
                    element.selectedIndex = 0;
                    break;
                default:
                    break;
            }
        }
        $('ul.selected', $form).html('');
        $form.trigger('submit');
        uas.ready.fields($form);
    }
});
$(document).on('click.toggle', 'a.js_toggle', function (event) {
    event.preventDefault();
    var $this = $(this),
        $parent = $this.parent('.js_toggle_parent'),
        $container = $(this.hash),
        data = $this.data(),
        title = data.title;
    if ($this.hasClass('toggle-loading')) return;
    if (title) {
        $this.data('title', $this.text());
    }
    if ($container.is(':visible')) {
        $container.slideUp('fast', function () {
            $this.removeClass('active');
            $parent.removeClass('active');
            if (title) {
                $this.text(title);
            }
        });
    } else {
        $this.addClass('active');
        $parent.addClass('active');
        if (data.url) {
            $this.addClass('toggle-loading');
// setTimeout(function(){
            $.get(data.url, function (html) {
                $container.html(html);
                $this.removeClass('toggle-loading');
                $this.data('url', null);
                if (data.accordion) {
                    $(data.accordion + '.active').not($this).trigger('click.toggle');
                }
                $container.slideDown('fast', function () {
                    $container.find('[autofocus]').focus();
                    if (title) {
                        $this.text(title);
                    }
                });
            });
// }, 5000);
        } else {
            if (data.accordion) {
                $(data.accordion + '.active').not($this).trigger('click.toggle');
            }
            $container.slideDown('fast', function () {
                $container.find('[autofocus]').focus();
                if (title) {
                    $this.text(title);
                }
            });
        }
        if (data.autohide) {
            $(document).off('click.togglehide').on('click.togglehide', function (event) {
                if (event.target !== $this.get(0) && event.target !== $container.get(0) && !$this.hasClass('toggle-loading')) {
                    $container.slideUp('fast', function () {
                        $this.removeClass('active');
                        $parent.removeClass('active');
                    });
                }
            });
        }
    }
});
$(document).on('click', '.js_select', function (event) {
    var $this = $(this),
        $title = $this.next(),
        $container = $this.closest('.select'),
        $selected = $container.find('.js_menu');
    $selected.text($title.text());
});
$(document).on('click', 'a.js_get_name', function (event) {
    event.preventDefault();
    var $this = $(this),
        name = $this.text();
    if (!$this.hasClass('wait')) {
        $this.addClass('wait');
        $.getJSON('/api/user/info', {user_login: name}, function (data) {
            if (data.user && (data.user.firstName || data.user.lastName)) {
                var a = [];
                if (data.user.firstName) {
                    a.push(data.user.firstName);
                }
                if (data.user.lastName) {
                    a.push(data.user.lastName);
                }
                name = a.join(' ');
            }
            $this.replaceWith(name);
        });
    }
});
/**
 *  On dom ready
 */
$(function () {
    uas.ready.all();
    uas.search.init();
    uas.search_person.init();
});
$(window).load(function () {
    uas.ready.fixed();
});
/***************************************************
 *
 * Вынесенное из шаблонов / вьюх.
 * Потенциально сломанное.
 *
 ***************************************************/
// task/list?filter=my&status=unassigned
$(document).ready(function() {
    $('#filter_tabs a').click(function () {
        event.preventDefault();
        var $this = $(this),
            url = $this.data('url');
        $('#filter_tabs a').removeClass('active');
        $this.addClass('active');
        $.get(url, function (html) {
            $('#feed').html(html);
        });
    });
    uas.script.infiniteScroll('#feed');
});
uas.anchor = (function () {
    var busy = false;

    function moveUnderLine($underline, $anchor) {
        var width = 0,
            pos = 0;

        if ($anchor && $anchor.length) {
            width = $anchor.outerWidth();
            pos = $anchor.position();
        }

        $underline.css({width: width, left: pos.left});
    }

    function adjustScroll(anchor) {
        var $target,
            $body = $('html, body');

        if (!anchor || anchor.hash === '#top') {
            $body.animate({scrollTop: 0});

        } else {
            $target = $(anchor.hash);

            if ($target.length) {
                busy = true;

                $body.animate({scrollTop: $target.offset().top - 127}, function () {
                    busy = false;
                });
            }
        }
    }

    function observeScroll($anchors, $underline) {
        var delay,
            a = [],
            $first = $anchors.first(),
            $active = $anchors.filter('.active').first(),
            $window = $(window);

        $anchors.each(function () {
            var $target = $(this.hash);

            if ($target.length) {
                a.push({anchor: $(this), target: $target});
            }
        });

        $window.scroll(function () {
            var flag = true;

            clearTimeout(delay);

            if (!busy) {
                delay = setTimeout(function () {
                    for (var i = a.length; i--;) {
                        var offset = a[i].target.offset();

                        if ($window.scrollTop() + 36 > offset.top - 127) {
                            if ($active !== a[i].anchor) {
                                $active = a[i].anchor;

                                $anchors.removeClass('active');
                                $active.addClass('active');

                                moveUnderLine($underline, $active.hasClass('visible') ? $active : null);
                            }

                            flag = false;

                            break;
                        }
                    }

                    if (flag) {
                        if ($active !== $first) {
                            $active = $first;

                            $anchors.removeClass('active');
                            $active.addClass('active');

                            moveUnderLine($underline, $active.hasClass('visible') ? $active : null);
                        }
                    }
                }, 50);
            }
        });
    }

    function nav(selector) {
        $(window).load(function () {
            $(selector || '#anchors').each(function () {
                var $anchors = $('.js_anchor', this),
                    $topAnchors = $('.visible', this),
                    $active = $topAnchors.filter('.active').first(),
                    $parent = $('> div', this);
                $underline = $('<div class="underline"></div>').appendTo($parent);

                moveUnderLine($underline, $active);

                $anchors.click(function (event) {
                    event.preventDefault();

                    $anchors.removeClass('active');
                    $active = $(this).addClass('active');

                    moveUnderLine($underline, $active.hasClass('visible') ? $active : null);
                    adjustScroll($active.get(0));
                });

                $topAnchors.mouseover(function (event) {
                    event.preventDefault();

                    moveUnderLine($underline, $(this));
                });

                $parent.mouseleave(function (event) {
                    event.preventDefault();

                    $active = $topAnchors.filter('.active').first();

                    moveUnderLine($underline, $active);
                });

                adjustScroll($active.get(0));

                observeScroll($anchors, $underline);
            });
        });
    }

    return {
        nav: nav
    };
}());
/**
 *  Date
 */
uas.date = (function () {
    function strftime(timestamp, format) {
        if (!timestamp) return '';
        if (isNaN(timestamp) && typeof(timestamp) !== 'string') return '';

        var date = new Date(timestamp),
            // get the basic time values
            hours = date.getHours(),
            day = date.getDay(),
            dayOfMonth = date.getDate(),
            month = date.getMonth(),
            fullYear = date.getFullYear(),
            abbrDayNames = uas.locales.t('date.abbr_day_names'),
            abbrMonthNames = uas.locales.t('date.abbr_month_names'),
            commonMonthNames = uas.locales.t('date.common_month_names'),
            standaloneAbbrMonthNames = uas.locales.t('date.standalone_abbr_month_names'),
            standaloneMonthNames = uas.locales.t('date.standalone_month_names');

        format = format || '%Y-%m-%d %H:%M:%S';

        if (isNaN(date.getTime())) return '';

        // list all format keys
        var replacements = {
            // Day
            'a': abbrDayNames ? uas.locales.t('date.abbr_day_names')[day].substr(0, 3) : '', // Short weekday, like 'Mon'
            'A': abbrDayNames ? uas.locales.t('date.abbr_day_names')[day] : '', // Long weekday, like 'Monday'
            'd': uas.helpers.pad(dayOfMonth), // Two digit day of the month, 01 to 31
            'e': dayOfMonth, // Day of the month, 1 through 31

            // Week (none implemented)
            //'W': weekNumber(),

            // Month
            'b': abbrMonthNames ? uas.locales.t('date.abbr_month_names')[month] : '', // Short month, like 'Jan'
            'B': commonMonthNames ? uas.locales.t('date.common_month_names')[month] : '', // Long month, like 'January'
            'Ob': standaloneAbbrMonthNames ? uas.locales.t('date.standalone_abbr_month_names')[month] : '', // Short month, like 'Jan'
            'OB': standaloneMonthNames ? uas.locales.t('date.standalone_month_names')[month] : '', // Long month, like 'January'
            'm': uas.helpers.pad(month + 1), // Two digit month number, 01 through 12

            // Year
            'y': fullYear.toString().substr(2, 2), // Two digits year, like 09 for 2009
            'Y': fullYear, // Four digits year, like 2009

            // Time
            'H': uas.helpers.pad(hours), // Two digits hours in 24h format, 00 through 23
            'I': uas.helpers.pad((hours % 12) || 12), // Two digits hours in 12h format, 00 through 11
            'l': (hours % 12) || 12, // Hours in 12h format, 1 through 12
            'M': uas.helpers.pad(date.getMinutes()), // Two digits minutes, 00 through 59
            'p': hours < 12 ? 'AM' : 'PM', // Upper case AM or PM
            'P': hours < 12 ? 'am' : 'pm', // Lower case AM or PM
            'S': uas.helpers.pad(date.getSeconds()), // Two digits seconds, 00 through  59
            'L': uas.helpers.pad(Math.round(timestamp % 1000), 3) // Milliseconds (naming from Ruby)
        };

        // do the replaces
        for (var key in replacements) {
            format = format.replace('%' + key, replacements[key]);
        }

        return format;
    }

    function count(from, to) {
        try {
            if (!from || !to) {
                return '';
            }

            if (typeof(from) === 'string') {
                from = new Date(from.split('.').reverse().join('-')); // convert dd.mm.yy to yy-mm-dd
            }

            if (typeof(to) === 'string') {
                to = new Date(to.split('.').reverse().join('-'));
            }

            if (isNaN(from) || isNaN(to)) {
                return '';
            } else {
                return Math.round(Math.abs((from.getTime() - to.getTime()) / (24 * 60 * 60 * 1000))) + 1;
            }
        } catch (error) {
            return '';
        }
    }

    return {
        strftime: strftime,
        count: count
    };
}());
/*
 * Dialog window
 */
uas.dialog = (function () {
    function confirm(callback, options) {
        options = $.extend({
            removeOnConfirm: true,
            text: 'Продолжить?',
            yes: 'Да',
            no: 'Нет'
        }, options);


        switch (options.type) {
            case 'green':
                options.yesClassName = ' button-accept';
                break;
            case 'red':
                options.yesClassName = ' button-reject';
                break;
            default:
                options.yesClassName = '';
                break;
        }

        $.modal({
            tools: false,
            closeOnEsc: true,
            content: (
                '<div class="modal-confirm"> ' +
                '<p>' + options.text + '</p> ' +
                '<div class="action"> ' +
                '<a class="js_modal_close button button-simple" href="#cancel">' + options.no + '</a> ' +
                '<button class="button' + options.yesClassName + '">' + options.yes + '</button> ' +
                '</div> ' +
                '</div>'
            ),
            afterShow: function (parent) {
                var self = this;

                $('button', parent).click(function (event) {
                    event.preventDefault();

                    if (options.removeOnConfirm) {
                        $('.js_modal_close', parent).first().off('click.no').trigger('click');
                    }

                    callback.call(self, parent);
                });

                if (typeof(options.onCancel) === 'function') {
                    $('.js_modal_close', parent.parent()).on('click.no', function (event) {
                        options.onCancel.call(self);
                    });
                }

                if (options.focus) {
                    $('button', parent).focus();
                }
            }
        });
    }

    function result(callback, options) {
        options = $.extend({
            title: uas.i18n.translate('Успех!'),
            text: uas.i18n.translate('Успех'),
            continue: uas.i18n.translate('Хорошо')
        }, options);

        $.modal({
            tools: false,
            closeOnEsc: true,
            content: (
                '<div class="modal-notice"> ' +
                '<h2>' + options.title + '</h2> ' +
                '<p>' + options.text + '</p> ' +
                '<div class="action"> ' +
                '<button class="js_modal_close button button-simple">' + options.continue + '</button> ' +
                '</div> ' +
                '</div>'
            ),
            afterShow: function (parent) {
                var self = this;

                $('button', parent).click(function (event) {
                    event.preventDefault();

                    if (typeof(callback) === 'function') {
                        callback.call();
                    }
                });

                if (options.focus) {
                    $('button', parent).focus();
                }
            }
        });
    }

    return {
        confirm: confirm,
        result: result
    };
}());
uas.file = (function () {
    function input(selector) {
        $(selector).on('change', function () {
            $(this).next().text(this.value.split(/\\/).pop() || 'Добавить');
        });
    }

    return {
        input: input
    };
}());
/**
 *  Flash messages
 */
uas.flash = (function () {
    function message(text, options, type) {
        options = $.extend({
            container: document.body,
            delay: 5000
        }, options);

        var timer,
            $flash = $('#flash');

        if ($flash.length) $flash.remove();

        $flash = $('<div class="flash flash-' + type + '" style="display: none;">' + text + '</div>').appendTo(options.container);

        $flash.fadeIn(400, function () {
            setTimeout(function () {
                $flash.fadeOut(400, function () {
                    $flash.remove();
                });
            }, options.delay);
        });
    }

    function error(text, options) {
        message(text || 'Системная ошибка', options, 'error');
    }

    function notice(text, options) {
        message(text, options, 'notice');
    }

    return {
        error: error,
        notice: notice
    };
}());
/**
 *  Helpers
 */
uas.helpers = (function () {
    var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };

    function escapeHTML(string) {
        if (string) {
            return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
                return entityMap[s];
            });
        } else if (typeof(string) === 'undefined') {
            return '';
        } else {
            return string;
        }
    }

    function abbr(s) {
        var r = '';

        if (s) {
            var a = s.split(' ');

            if (a[0]) r += a[0][0];

            if (a[1]) r += a[1][0];
        }

        return r;
    }

    function reverseString(str) {
        return str.split('').reverse().join('');
    }

    function truncateString(str, length, from, ellipsis, split) {
        var str1, str2, len1, len2;

        if (str.length <= length) {
            return str.toString();
        }

        ellipsis = ellipsis || '...';
        switch (from) {
            case 'left':
                str2 = split ? truncateWord(str, length, true) : str.slice(str.length - length);
                return ellipsis + str2;
            case 'middle':
                len1 = Math.ceil(length / 2);
                len2 = Math.floor(length / 2);
                str1 = split ? truncateWord(str, len1) : str.slice(0, len1);
                str2 = split ? truncateWord(str, len2, true) : str.slice(str.length - len2);
                return str1 + ellipsis + str2;
            default:
                str1 = split ? truncateWord(str, length) : str.slice(0, length);
                return str1 + ellipsis;
        }
    }

    function truncateWord(str, limit, fromLeft) {
        if (fromLeft) {
            return reverseString(truncateWord(reverseString(str), limit));
        }

        var trimChars = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF',
            reg = RegExp('(?=[' + trimChars + '])'),
            words = str.split(reg),
            count = 0;

        return words.filter(function (word) {
            count += word.length;
            return count <= limit;
        }).join('');
    }

    function pad(number, length) {
        return new Array((length || 2) + 1 - String(number).length).join(0) + number;
    }

    function numberToCurrency(value, unit) {
        if (unit === false) {
            unit = '';
        } else if (!unit || unit === true) {
            unit = '₽&nbsp;';
        } else {
            unit = unit + '&nbsp;';
        }

        if (isNaN(value)) {
            return unit + '0,00';
        } else {
            return unit + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ').replace(/\./g, ',');
        }
    }

    function currencyToNumber(value) {
        var result = 0;

        if (value) {
            result = parseFloat(value.replace(/[^0-9.,]*/g, '').replace(/\,/g, '.'));

            if (isNaN(result)) {
                result = 0;
            }
        }

        return result;
    }

    function fieldErrorAdd(field, text) {
        var $field = $(field),
            $parent = $(field).parent(),
            $error = $parent.find('span.error');

        if ($field.length) {
            field = $field.get(0);

            $field.addClass('invalid');

            if (field.id) {
                $('label[for=' + field.id + ']', field.form).addClass('invalid');
            }

            if ($parent.hasClass('field')) {
                if ($field.is('[type=hidden]')) {
                    $parent.find('input.field-mask').addClass('invalid');
                }

                if ($error.length) {
                    $error.text(text);

                } else {
                    $field.after('<span class="error">' + text + '</span>');
                }

            } else {
                $field.prop('title', text);
            }
        }
    }

    function fieldErrorRemove(field) {
        var $field = $(field),
            $parent = $(field).parent('.field');

        if ($field.length && $field.hasClass('invalid')) {
            field = $field.get(0);

            $field.removeClass('invalid');
            $field.removeAttr('title');

            if (field.id) {
                $('label[for=' + field.id + ']', field.form).removeClass('invalid');
            }

            $parent.find('span.error').remove();

            if ($field.is('[type=hidden]')) {
                $parent.find('input.field-mask').removeClass('invalid');

            } else if ($field.is('.field-mask')) {
                $parent.find('input[type=hidden]').removeClass('invalid');
            }
        }
    }

    function colorBrightness(hex, percent) {
        // strip the leading # if it's there
        hex = hex.replace(/^\s*#|\s*$/g, '');

        // convert 3 char codes --> 6, e.g. E0F --> EE00FF
        if (hex.length == 3) {
            hex = hex.replace(/(.)/g, '$1$1');
        }

        var r = parseInt(hex.substr(0, 2), 16),
            g = parseInt(hex.substr(2, 2), 16),
            b = parseInt(hex.substr(4, 2), 16);

        return '#' +
            ((0 | (1 << 8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
            ((0 | (1 << 8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
            ((0 | (1 << 8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
    }

    function timeFormat(value, format) {
        value = parseInt(value, 0);

        if (isNaN(value)) return '';

        value = Math.round(value);

        var s = value % 60,
            m = parseInt((value / 60) % 60, 10),
            h = parseInt(value / 3600, 10);

        format = format || '%H:%M:%S';

        m = parseInt(m, 10) < 10 ? '0' + m : m;
        s = parseInt(s, 10) < 10 ? '0' + s : s;

        return format.replace('%H', h).replace('%M', m).replace('%S', s);
    }

    function toRub(value) {
        return value ? value / 100 : 0;
    }

    return {
        escapeHTML: escapeHTML,
        abbr: abbr,
        truncateString: truncateString,
        pad: pad,
        numberToCurrency: numberToCurrency,
        currencyToNumber: currencyToNumber,
        fieldErrorAdd: fieldErrorAdd,
        fieldErrorRemove: fieldErrorRemove,
        colorBrightness: colorBrightness,
        timeFormat: timeFormat,
        toRub: toRub
    };
}());
uas.i18n = (function () {

    var translations = {};

    function init(json){
        translations = json;
    }

    function translate(placeholder) {

        if(typeof translations[placeholder] == 'undefined'){
            return placeholder;
        }

        return translations[placeholder];

    }

    return {
        init: init,
        translate: translate
    }
}());
/**
 *  Plugins
 */
(function ($) {
    $.fn.addOverlay = function (options) {
        options = $.extend({content: '', spinner: true}, options);

        return this.each(function () {
            var $overlay,
                $container = $(this),
                $content = $(),
                className = ['overlay'];

            if (options.className) {
                className.push(options.className);
            }

            if (options.content) {
                className.push('overlay-content');

                if (options.spinner) {
                    $overlay = $('<div class="' + className.join(' ') + '"><div><table><tr><td><i></i></td><td>' + options.content + '</td></tr></table></div><span></span></div>').prependTo(this);
                } else {
                    $overlay = $('<div class="' + className.join(' ') + '"><div><table><tr><td>' + options.content + '</td></tr></table></div><span></span></div>').prependTo(this);
                }

                $content = $overlay.find('> div > table');

            } else {
                $overlay = $('<div class="' + className.join(' ') + '"><i></i><span></span></div>').prependTo(this);
                $content = $overlay.find('> i');
            }

            if (options.spinner) {
                $overlay.addClass('overlay-spinner');
            }

            function offset() {
                var h = $container.prop('clientHeight'),
                    w = $container.prop('clientWidth'),
                    sh = $container.prop('scrollHeight');

                $content.css({height: h});
                $overlay.css({width: w, height: sh});
            }

            if ($container.css('position') === 'static') {
                $container.addClass('tmp-relative');
            }

            offset();

            $(window).resize(function () {
                offset();
            });
        });
    };

    $.fn.removeOverlay = function (options) {
        return this.each(function () {
            var $container = $(this),
                $overlay = $('> div.overlay', this);
            $container.removeClass('tmp-relative');

            if ($overlay.length) {
                $overlay.remove();
                $container.removeClass('tmp-relative');

            } else {
                $container.removeClass('tmp-relative');
            }
        });
    };
})(jQuery);
uas.push = (function () {

    var hasUI = false;
    var applicationServerPublicKey = '';

    var isSubscribed = false;
    var swRegistration = null;

    var pushButton;
    var sendButton;
    var subscriptionJson;
    var subscriptionDetails;

    function urlB64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    function updateSubscriptionOnServer(subscription) {
        // TODO: Send subscription to application server

        if (subscription) {
            subscriptionJson.textContent = JSON.stringify(subscription);
            subscriptionDetails.classList.remove('is-invisible');
        } else {
            subscriptionDetails.classList.add('is-invisible');
        }
    }

    function subscribeUser() {
        const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
        swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        })
            .then(function(subscription) {
                console.log('User is subscribed.');

                updateSubscriptionOnServer(subscription);

                isSubscribed = true;

                updateBtn();
            })
            .catch(function(err) {
                console.log('Failed to subscribe the user: ', err);
                updateBtn();
            });
    }

    function unsubscribeUser() {
        swRegistration.pushManager.getSubscription()
            .then(function(subscription) {
                if (subscription) {
                    return subscription.unsubscribe();
                }
            })
            .catch(function(error) {
                console.log('Error unsubscribing', error);
            })
            .then(function() {
                updateSubscriptionOnServer(null);

                console.log('User is unsubscribed.');
                isSubscribed = false;

                updateBtn();
            });
    }

    function updateBtn() {
        if(hasUI) {
            if (Notification.permission === 'denied') {
                pushButton.textContent = 'Push Messaging Blocked.';
                pushButton.disabled = true;
                updateSubscriptionOnServer(null);
                return;
            }

            if (isSubscribed) {
                pushButton.textContent = 'Disable Push Messaging';
            } else {
                pushButton.textContent = 'Enable Push Messaging';
            }

            pushButton.disabled = false;
        }
    }

    function initialiseUI() {
        if(hasUI) {
            pushButton.addEventListener('click', function () {
                pushButton.disabled = true;
                if (isSubscribed) {
                    unsubscribeUser();
                } else {
                    subscribeUser();
                }
            });

            sendButton.addEventListener('click', function () {

                $.post('/push/send', {msg: 'ttt'}, function (e) {
                    console.log('Response: ', e);
                })

            });

            // Set the initial subscription value
            swRegistration.pushManager.getSubscription()
                .then(function (subscription) {
                    isSubscribed = !(subscription === null);

                    updateSubscriptionOnServer(subscription);

                    if (isSubscribed) {
                        console.log('User IS subscribed.');
                    } else {
                        console.log('User is NOT subscribed.');
                    }

                    updateBtn();
                });
        }
    }

    function init(key, ui){

        hasUI = ui;
        applicationServerPublicKey = key;

        pushButton          = document.querySelector('.js-push-btn');
        sendButton          = document.querySelector('.js-send-btn');
        subscriptionJson    = document.querySelector('.js-subscription-json');
        subscriptionDetails = document.querySelector('.js-subscription-details');

        if ('serviceWorker' in navigator && 'PushManager' in window) {
            console.log('Service Worker and Push is supported');

            $.get('/mix-manifest.json', function(mix){

                 navigator
                .serviceWorker
                .register(mix['/js/push-notifications.sw.js'])
                .then(function(swReg) {

                    console.log('Service Worker is registered', swReg);

                    swRegistration = swReg;
                    initialiseUI();

                })
                .catch(function(error) {
                    console.error('Service Worker Error', error);
                });

            });
        } else {
            console.warn('Push messaging is not supported');
            if(hasUI){
                pushButton.textContent = 'Push Not Supported';
            }
        }

    }

    return {
        init: init,
        subscribeUser: subscribeUser,
        unsubscribeUser: unsubscribeUser
    };

}());
uas.ready = (function () {
    function fields(parent) {
        $('div.field-label input', parent).each(function () {
            var $this = $(this);

            if (this.value === '') {
                $this.addClass('empty');
            } else {
                $this.removeClass('empty');
            }

            setTimeout(function () {
                $this.addClass('animate');
            }, 1);
        }).on('blur pick', function () {
            var $this = $(this);

            if (this.value === '') {
                $this.addClass('empty');
            } else {
                $this.removeClass('empty');
            }
        });

        $('div.field-label textarea', parent).each(function () {
            var $this = $(this);

            if ($this.val() === '') {
                $this.addClass('empty');
            } else {
                $this.removeClass('empty');
            }

            setTimeout(function () {
                $this.addClass('animate');
            }, 1);
        }).blur(function () {
            var $this = $(this);

            if ($this.val() === '') {
                $this.addClass('empty');
            } else {
                $this.removeClass('empty');
            }
        });

        $('div.field-label select', parent).each(function () {
            var $this = $(this),
                $selected = $(this.options[this.selectedIndex]);

            if (!$selected.text()) {
                $this.addClass('empty');
            }

            setTimeout(function () {
                $this.addClass('animate');
            }, 1);
        }).change(function () {
            var $this = $(this),
                $selected = $(this.options[this.selectedIndex]);

            if ($selected.text()) {
                $this.removeClass('empty');
            } else {
                $this.addClass('empty');
            }
        });
    }

    function datepicker(parent, locale) {
        locale = locale || 'ru';

        if ($.datepicker) {
            $('input.field-datepicker', parent).each(function () {
                var $this = $(this),
                    data = $this.data(),
                    options = {
                        changeMonth: true,
                        changeYear: true,
                        dateFormat: 'dd.mm.yy',
                        beforeShow: function (input) {
                            if ($(input).attr('readonly')) return false;
                        },
                        onSelect: function (dateText, o) {
                            o.input.trigger('pick');
                        }
                    };

                if (data.yearRange) {
                    options.yearRange = data.yearRange;
                    options.defaultDate = data.yearRange.split(':')[1] + 'y';
                    // options.reverseYearRange = true;
                }

                if (data['date-format']) {
                    options.dateFormat = data['date-format'];
                }

                if (typeof(data['max-date']) !== 'undefined') {
                    options.maxDate = data['max-date'];
                }

                options.onChangeMonthYear = function (year, month, o) {
                    var curDate = $this.datepicker('getDate');

                    if (!curDate) {
                        curDate = new Date();
                    }

                    if (curDate.getYear() !== year || curDate.getMonth() !== month - 1) {
                        curDate.setYear(year);
                        curDate.setMonth(month - 1);

                        $this.datepicker('setDate', curDate);
                    }

                    $this.trigger('pick');
                };

                $this.datepicker(options);
            });

            $.datepicker.setDefaults($.datepicker.regional[locale]);
        }
    }

    function period(parent, options) {
        if (!$.datepicker) return;

        options = $.extend({
            changeMonth: true,
            changeYear: true,
            beforeShow: function (input) {
                if (input.readonly) return false;
            },
            onSelect: function (dateText, o) {
                o.input.trigger('pick');
            }
        }, options);

        $('.js_period', parent).each(function () {
            var $parent = $(this),
                $inputs = $('input.field-period', this),
                $start = $inputs.first(),
                $end = $inputs.last();

            $inputs.on('customselect', function () {
                var data = $(this).data();

                if (data.output) {
                    var from = $start.val(),
                        to = $end.val(),
                        count = uas.date.count(from, to);

                    if (count) {
                        $(data.output).val(count);
                        // $(data.output).data('count', count);
                        // $(data.output).text(count + ' ' + uas.locale.pluralize(
                        //   count,
                        //   uas.locale.t('days.one'),
                        //   uas.locale.t('days.few'),
                        //   uas.locale.t('days.many')
                        // ));
                    } else {
                        // $(data.output).text('');
                        $(data.output).val('');
                    }
                }
            });

            $end.trigger('customselect');

            $inputs.each(function () {
                var $this = $(this),
                    data = $this.data();

                if (data.yearRange) {
                    options.yearRange = data.yearRange;
                }

                if (this === $start[0]) {
                    if ($end.val()) {
                        options['maxDate'] = $end.val();
                    }

                    options.onClose = function (selectedDate) {
                        $end.datepicker('option', 'minDate', selectedDate);

                    }
                } else {
                    if ($start.val()) {
                        options['minDate'] = $start.val();
                    }

                    options.onClose = function (selectedDate) {
                        $start.datepicker('option', 'maxDate', selectedDate);
                    }
                }

                options.onChangeMonthYear = function (year, month, o) {
                    var curDate = $this.datepicker('getDate');

                    if (!curDate) {
                        curDate = new Date();
                    }

                    if (curDate.getYear() !== year || curDate.getMonth() !== month - 1) {
                        curDate.setYear(year);
                        curDate.setMonth(month - 1);

                        $this.datepicker('setDate', curDate);
                    }

                    $end.trigger('customselect');
                };

                options.onSelect = function (selectedDate, o) {
                    $end.trigger('customselect');

                    o.input.trigger('pick');
                }

                $this.datepicker(options);
            });
        });
    }

    function textPeriod(parent, options) {
        if (!$.datepicker) return;

        options = $.extend({
            changeMonth: true,
            changeYear: true,
            beforeShow: function (input) {
                if (input.readonly) return false;
            },
            onSelect: function (dateText, o) {
                o.input.trigger('pick');
            }
        }, options);

        $('.js_text_period', parent).each(function () {
            var $parent = $(this),
                $text = $('a', this),
                $inputs = $('input', this),
                $start = $inputs.first(),
                $end = $inputs.last();

            $inputs.each(function () {
                var $this = $(this);

                if (this === $start[0]) {
                    if ($end.val()) {
                        options['maxDate'] = $end.val();
                    }

                    options.onClose = function (selectedDate) {
                        $end.datepicker('option', 'minDate', selectedDate);

                    }
                } else {
                    if ($start.val()) {
                        options['minDate'] = $start.val();
                    }

                    options.onClose = function (selectedDate) {
                        $start.datepicker('option', 'maxDate', selectedDate);
                    }
                }

                options.onChangeMonthYear = function (year, month, o) {
                    var curDate = $this.datepicker('getDate');

                    if (!curDate) {
                        curDate = new Date();
                    }

                    if (curDate.getYear() !== year || curDate.getMonth() !== month - 1) {
                        curDate.setYear(year);
                        curDate.setMonth(month - 1);

                        $this.datepicker('setDate', curDate);

                        $this.next().text($this.val());
                    }
                };

                options.onSelect = function (selectedDate, o) {
                    $this.next().text(selectedDate);

                    o.input.trigger('pick');
                }

                $this.datepicker(options);
            });

            $text.click(function (event) {
                event.preventDefault();

                $(this).prev().datepicker('show');
            });
        });
    }

    function textDate(parent, options) {
        if (!$.datepicker) return;

        options = $.extend({
            changeMonth: true,
            changeYear: true
        }, options);

        $('.js_text_date', parent).each(function () {
            var $parent = $(this),
                $text = $('a', this),
                $input = $('input', this);

            $input.each(function () {
                options.onSelect = function (selectedDate, o) {
                    $text.text(selectedDate);

                    o.input.trigger('pick');
                }

                options.onChangeMonthYear = function (year, month, o) {
                    var curDate = $input.datepicker('getDate');

                    if (!curDate) {
                        curDate = new Date();
                    }

                    if (curDate.getYear() !== year || curDate.getMonth() !== month - 1) {
                        curDate.setYear(year);
                        curDate.setMonth(month - 1);

                        $input.datepicker('setDate', curDate);

                        $text.text($input.val());
                    }
                };

                $input.datepicker(options);
            });

            $text.click(function (event) {
                event.preventDefault();

                $input.datepicker('show');
            });
        });
    }

    function fieldFormat(parent) {
        $('.field-currency', parent).inputmask({
            alias: 'decimal',
            groupSeparator: ' ',
            radixPoint: ',',
            autoGroup: true
        });
        $('.field-int', parent).inputmask('integer');

        // Old version
        // $('.field-int', parent).keydown(function(event){
        //   // Allow: backspace, delete, tab, escape and enter
        //   if ([46, 8, 9, 27, 13, 110].indexOf(event.keyCode) !== -1 ||
        //        // Allow: Ctrl+A, Command+A
        //       (event.keyCode == 65 && (event.ctrlKey === true || event.metaKey === true)) ||
        //        // Allow: home, end, left, right, down, up
        //       (event.keyCode >= 35 && event.keyCode <= 40)) {
        //       // let it happen, don't do anything
        //       return;
        //   }
        //   // Ensure that it is a number and stop the keypress
        //   if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
        //     event.preventDefault();
        //   }
        // });
    }

    function fixed() {
        var $up,
            wh = $(window).height(),
            nh = $('#nav').outerHeight() + 64;

        if (wh > nh) {
            $('#nav').addClass('fixed');
        } else {
            $up = $('<a id="up" class="hidden" href="#up"></a>').appendTo('body');
            $up.click(function (event) {
                event.preventDefault();

                $('html, body').scrollTop(0);
            });

            $(window).scroll(function () {
                if ($(window).scrollTop() > 100) {
                    $up.stop().fadeIn();
                } else {
                    $up.stop().fadeOut();
                }
            });
        }
    }

    function all(parent) {
        datepicker(parent);
        period(parent);
        fields(parent);
        fieldFormat(parent);
    }

    return {
        datepicker: datepicker,
        period: period,
        fields: fields,
        textPeriod: textPeriod,
        textDate: textDate,
        all: all,
        fixed: fixed
    };
}());
uas.script = (function () {
    function modalOverflow($modal, observe) {
        var $container = $modal.find('.modal-s');

        if ($container.length) {
            var wH = $(window).height(),
                hH = 0,
                cH = $container.outerHeight();

            $modal.find('.modal-n').each(function () {
                var $this = $(this),
                    isHidden = $this.hasClass('hidden');

                if (isHidden) $this.removeClass('hidden');

                hH += $(this).outerHeight();

                if (isHidden) $this.addClass('hidden');
            });

            if ($container.is('iframe')) {
                $container.css({height: Math.max(wH - 60 - hH, 100)});
            } else {
                $container.css({maxHeight: Math.max(wH - 60 - hH, 100)});
            }
        }

        if (observe) {
            $(window).off('resize.modal').on('resize.modal', function () {
                modalOverflow($modal);
            });
        }
    }

    function isValidFormat(value, format) {
        var valid = true;

        if (format === 'date') {
            valid = /^\d{1,2}\.\d{1,2}\.\d{4}$/.test(value);
        }

        return valid;
    }

    function validate(form) {
        var text = [],
            select = [];

        $('[data-required], [data-format]', form).each(function () {
            if (this.type) {
                switch (this.type.toLowerCase()) {
                    case 'text':
                    case 'textarea':
                        text.push(this);
                        break;
                    case 'select':
                    case 'select-one':
                    case 'select-multi':
                        select.push(this);
                        break;
                    case 'radio':
                    case 'checkbox':
                        break;
                    default:
                        break;
                }
            }
        });

        $(text.concat(select)).on('blur', function () {
            var $this = $(this),
                data = $this.data()
            value = $this.val();

            if (typeof(data.required) !== 'undefined') {
                if (value === '' || value == 0) {
                    uas.helpers.fieldErrorAdd(this, uas.i18n.translate('Обязательное поле'));
                }

            } else if (typeof(data.format) !== 'undefined') {
                if (!isValidFormat(value, data.format)) {
                    uas.helpers.fieldErrorAdd(this, 'Wrong format');
                }
            }
        });

        $(text).on('keyup input pick', function () {
            uas.helpers.fieldErrorRemove(this);
        });

        $(select).on('change', function () {
            uas.helpers.fieldErrorRemove(this);
        });
    }

    function infiniteScroll(container, options) {
        options = $.extend({
            delta: 20,
            method: 'POST'
        }, options);

        $(options.scrollable || window).off('scroll.infinite').on('scroll.infinite', function () {
            var $this = $(this),
                top = $(this).scrollTop(),
                height = $this.height(),
                $scrollable = options.scrollable ? $this : $('body'),
                sHeight = $scrollable.prop('scrollHeight');

            if (sHeight - top - height < options.delta) {
                var $infinite = $scrollable.find('.js_infinite');

                if (!$infinite.hasClass('active')) $infinite.trigger('click');
            }
        });

        $(container).on('click', '.js_infinite', function (event) {
            event.preventDefault();

            var $this = $(this),
                data = {},
                filter = $this.data('filter'),
                url = $this.data('url') || this.href;

            if (!$this.hasClass('active')) {
                $this.addClass('active').html('пожалуйста подождите&hellip;');

                if (filter) {
                    data = $(filter).serializeArray();
                }

                $.ajax({
                    url: url,
                    data: data,
                    dataType: 'html',
                    method: options.method
                }).done(function (html) {
                    $(container).append(html);
                    $this.closest('.infinite').remove();
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    uas.flash.error();
                });
            }
        });
    }

    return {
        modalOverflow: modalOverflow,
        validate: validate,
        infiniteScroll: infiniteScroll
    };
}());
/**
 *  Search-person
 */
uas.search_person = (function () {
    var a, request, onChangeInterval, tmpl, url,
        $result, $nav, $content, $input
    $items = $(),
        query = '',
        count = 0,
        idx = -1,
        keys = {
            ESC: 27,
            TAB: 9,
            RETURN: 13,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        };

    tmpl = (
        '<div id="query-result"> ' +
        //'<div id="query-window" class="query-result" style="height: 0px;"> ' +
        '<div class="person-result">' +
        '<div id="query_nav" class="query-nav"></div> ' +
        '<div id="query_content" class="query-content"></div> ' +
        '</div> ' +
        '</div>'
    );

    function getPersonHTML(person) {

        var a = [],
            html = '';

        if (person['INN']) {
            a.push(uas.i18n.translate('ИНН') + ': ' + person['INN']);
        }

        if (a.length) {
            html = '<p>' + a.join(', ') + '</p>';
        }

        return '<li data-name="' + person['displayName'] + '" data-id="' + person['id'] + '" onclick="selectPerson(this);"><div class="suggestion"><div class="person"><h5>' + person['displayName'] + '</h5>' + html + '</div></div></li>';
    }

    function selectActive() {
        $items.removeClass('active');

        if (idx >= 0) {
            $items.eq(idx).addClass('active');
        }
    }

    function changeIdx(d) {
        idx = idx + d;

        if (idx >= $items.length) {
            idx = $items.length;

        } else if (idx <= 0) {
            idx = 0;
        }

        if (idx === $items.length) {
            $('#query_action_new').addClass('focus');
        } else {
            $('#query_action_new').removeClass('focus');
        }

        selectActive();
// changeValue();
        preview();

        if (idx !== $items.length) {
            adjustScroll();
        }
    }

    function changeValue() {
        if (idx < 0) {
            $input.val(query);

            return;
        }

        if (a[idx]) {
            $input.val(a[idx].displayname);
        } else {
            $input.val(query);
        }
    }

    function preview() {
        if (idx >= 0) {

        }
    }

    function adjustScroll() {
        /*var $current = $items.eq(idx),
            $container = $('#query-result dd');

        if (!$current.length || idx < 0) {
            $container.scrollTop(0);

            return;
        }

        var containerHeight = $container.height(),
            offsetTop = $current.prop('offsetTop'),
            heightDelta = $current.outerHeight(),
            upperBound = $container.scrollTop(),
            lowerBound = upperBound + containerHeight - heightDelta;

        if (offsetTop < upperBound) {
            $container.scrollTop(offsetTop);
        } else if (offsetTop > lowerBound) {
            $container.scrollTop(offsetTop - containerHeight + heightDelta);
        }*/
    }

    function init() {
        $input = $('#query_person_form .search_person');
        url = $input.data('url');

        $('#query_person_form').submit(function (event) {
            event.preventDefault();

// TODO
        });

        $input.on('keyup input', function (event) {
            $result = $('#query-result');
            if ($result.length) {
                if (event.which === keys.RETURN) {
                    if ($('#query_action_new').hasClass('focus')) {
                        $('#query_action_new').trigger('click');
                        $('#query-result').remove();

                    } else if (a[idx]) {
                        window.location.href = '/person/view?person_id=' + a[idx].id;
                    }

                    return;
                }

                if (event.which === keys.ESC) {
                    $('#query-result').remove();

                    return;
                }

                if (event.which === keys.UP || event.which === keys.DOWN) {
                    changeIdx(event.which === keys.UP ? -1 : 1);

                    return;
                }
            }

            if (this.value === query) return;

            query = this.value;

// if (event.which === keys.RETURN) {
//   $items.eq(selectedIndex).trigger('click');

//   return;
// }

            clearTimeout(onChangeInterval);

            if (query.length > 2) {
                onChangeInterval = setTimeout(function () {
                    if (request) {
                        request.abort();
                    }

                    if (!$result.length) {
                        $result = $(tmpl).appendTo('#query_person_form');
                        $nav = $('#query_nav');
                        $content = $('#query_content');

                        setTimeout(function () {
                            $result.addClass('active');
                        }, 0);
                    }

                    request = $.getJSON(url, {q: query}).done(function (data) {
                        var html = [];

                        a = [];
                        request = null;
                        if (data.person && data.person.length) {
                            for (var i = 0, length = data.person.length; i < length; i++) {
                                data.person[i].idx = i;

                                a.push(data.person[i]);
                                html.push(getPersonHTML(data.person[i]));
                            }

                            $nav.html(
                                /*'<dl> ' +
                                '<dt>' + uas.i18n.translate('Физ. лица банка') + '</dt> ' +
                                '<dd><ul>' + html.join(' ') + '</ul></dd> ' +
                                '</dl> ' +
                                '<div class="query-action"> ' +
                                '<a class="js_modal action i i-new" href="#new" data-url="/ajax/person/create">' + uas.i18n.translate('Добавить физ. лицо') + '</a>' +
                                //'<a id="query_action_new" class="button button-simple i i-new" href="#new" data-url="/ajax/company/create">' + uas.i18n.translate('Добавить физ. лицо') + '</a> ' +
                                '</div>'*/

                                '<div style="width: 628px; display: block;" class="suggestions">' +
                                '<div class="suggestions-container" style="max-height: 200px;">' +
                                '<ul>' +
                                html.join(' ') +
                                '<ul>' +
                                '</div>' +
                                '<div class="suggestions-footer">' +
                                '<a class="js_modal action i i-new" href="#new" data-url="/ajax/person/create">' + uas.i18n.translate('Добавить физ. лицо') + '</a>' +
                                '</div>' +
                                '</div>'
                        );

                            $items = $nav.find('a.none');

                            $items.click(function (event) {
                                event.preventDefault();
                                event.stopPropagation();

                                idx = this.hash.slice(1);

                                $input.focus();

                                selectActive();
                                preview();
                            });

                            idx = 0;

                            selectActive();
                            preview();

                        } else {
                            $nav.html(
                                '<div style="width: 628px;" class="suggestions">' +
                                '<div class="suggestions-container" style="max-height: 300px;">' +
                                '<div class="autocomplete-no-suggestion">По данному запросу физ. лицо не найдено</div>' +
                                '</div>' +
                                '<div class="suggestions-footer">' +
                                '<a class="js_modal action i i-new" href="#new" data-url="/ajax/person/create">' + uas.i18n.translate('Добавить физ. лицо') + '</a>' +
                                '</div>' +
                                '</div>'
                            );
                            $content.html('');
                        }

                        $('#query_action_new').click(function (event) {
                            event.preventDefault();

                            $.modal({
                                url: '/ajax/company/create?q=' + encodeURIComponent(query),
                                afterShow: function (parent) {
                                    $.ujs.onComplete(parent);

                                    uas.script.modalOverflow(parent, true);
                                }
                            });
                        });

                        $nav.find('li').highlight(query.split(' '));

                    }).fail(function (jqXHR, textStatus, errorThrown) {
                    });
                }, 100);

            } else if ($result.length) {
                $result.remove();
            }
        });

        $(document).on('click', function (event) {
            if (
                $('#query_person_form button')[0] !== event.target &&
                $('#query_person_form input')[0] !== event.target && !$('#query-window').has(event.target).length
            ) {
                $('#query-result').remove();
            }
        });
    }

    return {
        init: init
    }
}());
/**
 *  Search
 */
uas.search = (function () {
    var a, request, onChangeInterval, tmpl, url,
        $result, $nav, $content, $input
    $items = $(),
        query = '',
        count = 0,
        idx = -1,
        keys = {
            ESC: 27,
            TAB: 9,
            RETURN: 13,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        };

    tmpl = (
        '<div id="query-result"> ' +
        '<div id="query-window" class="query-result"> ' +
        '<div id="query_nav" class="query-nav"></div> ' +
        '<div id="query_content" class="query-content"></div> ' +
        '</div> ' +
        '<div id="query_overlay" class="query-overlay"></div> ' +
        '</div>'
    );

    function getClientHTML(client) {
        var a = [],
            html = '';

        if (client.companyTypeRefId === 'legalentity') {
            a.push(uas.i18n.translate('Юридическое лицо'));
        } else if (client.companyTypeRefId === 'individual') {
            a.push(uas.i18n.translate('Индивидуальный предприниматель'));
        } else if (client.companyTypeRefId === 'branch') {
            a.push(uas.i18n.translate('Филиал'));
        }

        if (client['INN']) {
            a.push(uas.i18n.translate('ИНН') + ': ' + client['INN']);
        }

        if (client['KPP']) {
            a.push(uas.i18n.translate('КПП') + ': ' + client['KPP']);
        }

        if (a.length) {
            html = '<p>' + a.join(', ') + '</p>';
        }

        return '<li><a class="none" href="#' + client.idx + '"><div class="client"><h5>' + client.displayName + '</h5>' + html + '</div></a></li>';
    }

    function getOrderHTML(order) {
        var a = [],
            html = '';

        a.push(uas.i18n.translate('Дата создания') + ': ' + order.createdDateTime);
        a.push(uas.i18n.translate('Принципал') + ': ' + order.principalName);
        a.push(order.executionPercent + '%');


        if (a.length) {
            html = '<p>' + a.join(', ') + '</p>';
        }

        return '<li><a class="none" href="#' + order.idx + '"><div class="client"><h5>' + order.orderNumber + '</h5>' + html + '</div></a></li>';
    }

    function getClientDetailsHTML(client) {
        var html = [];

        if (!client) {
            return '';
        }

        if (client) {
            if (client.companyTypeRefId === 'legalentity') {
                html.push('<tr><th>' + uas.i18n.translate('Тип') + ':</th><td>' + uas.i18n.translate('Юридическое лицо') + '</td></tr>');
            } else if (client.companyTypeRefId === 'individual') {
                html.push('<tr><th>' + uas.i18n.translate('Тип') + ':</th><td>' + uas.i18n.translate('Индивидуальный предприниматель') + '</td></tr>');
            } else if (client.companyTypeRefId === 'branch') {
                html.push('<tr><th>' + uas.i18n.translate('Тип') + ':</th><td>' + uas.i18n.translate('Филиал') + '</td></tr>');
            }

            if (client['INN']) {
                html.push(
                    '<tr> ' +
                    '<th>' + uas.i18n.translate('ИНН') + ':</th> ' +
                    '<td>' + client['INN'] + '</td> ' +
                    '</tr>'
                );
            }

            if (client['KPP']) {
                html.push(
                    '<tr> ' +
                    '<th>' + uas.i18n.translate('КПП') + ':</th> ' +
                    '<td>' + client['KPP'] + '</td> ' +
                    '</tr>'
                );
            }

            if (client['OGRN']) {
                html.push(
                    '<tr> ' +
                    '<th>' + uas.i18n.translate('ОГРН') + ':</th> ' +
                    '<td>' + client['OGRN'] + '</td> ' +
                    '</tr>'
                );
            }

            html.push(
                '<tr> ' +
                '<th></th> ' +
                '<td><a href="/company/view?company_id=' + client['id'] + '">' + uas.i18n.translate('Подробнее') + '</a></td> ' +
                '</tr>'
            );

        }

        return (
            '<div class="query-details">' +
            '<h2>' + client.displayName + '</h2> ' +
            (html.length ? '<table> ' + html.join(' ') + '</table> ' : '<p>' + client['Клиент уже закреплен за Агентом Банка'] + '</p>') +
            '</div> ' // +
            // '<div class="query-action"> ' +
            //   '<a class="js_modal button button-simple i i-new" href="#new" data-url="/ajax/order/new?type=bankguarantee&principal_id=' + client.id + '">Добавить сделку</a> ' +
            // '</div>'
        );
    }

    function getOrderDetailsHTML(order) {
        var html = [];

        if (!order) {
            return '';
        }

        if (order) {
            a.push(uas.i18n.translate('Дата создания') + ': ' + order.createdDateTime);
            a.push(uas.i18n.translate('Наименование принципала') + ': ' + order.principalName);

            if (order['createdDateTime']) {
                html.push(
                    '<tr> ' +
                    '<th>' + uas.i18n.translate('Дата создания') + ':</th> ' +
                    '<td>' + order['createdDateTime'] + '</td> ' +
                    '</tr>'
                );
            }

            if (order['principalName']) {
                html.push(
                    '<tr> ' +
                    '<th>' + uas.i18n.translate('Принципал') + ':</th> ' +
                    '<td> <a href="/company/view?company_id=' + order['principalCompanyId'] + '">' + order['principalName'] + '</a></td> ' +
                    '</tr>'
                );
            }

            if(order['lost']) {
                html.push(
                    '<tr><td colspan="2">' +
                    '<div class="w3-light-grey" style="margin-top: 8px; margin-left: 25px;">' +
                    '<div class="w3-container w3-red" style="width:' + order['executionPercent'] + '%">' + order['executionPercent'] + '%</div>' +
                    '</div>' +
                    '</td></tr>'
                );
            }
            else if(order['executionPercent'] == 100 &&  order['lost'] == false) {
                html.push(
                    '<tr><td colspan="2">' +
                    '<div class="w3-light-grey" style="margin-top: 8px; margin-left: 25px">' +
                    '<div class="w3-container w3-green" style="width:' + order['executionPercent'] + '%">' + order['executionPercent'] + '%</div>' +
                    '</div>' +
                    '</td></tr>'
                );
            }
            else {
                html.push(
                    '<tr><td colspan="2">' +
                    '<div class="w3-light-grey" style="margin-top: 8px; margin-left: 25px">' +
                    '<div class="w3-container w3-orange" style="width:' + order['executionPercent'] + '%">' + order['executionPercent'] + '%</div>' +
                    '</div>' +
                    '</tr>'
                );
            }

            html.push(
                '<tr>' +
                '<td colspan="2" style="text-align: center;"><a href="/order/view?order_id=' + order.id + '">' + uas.i18n.translate('Подробнее') + '</a></td> ' +
                '</tr>'
            );

        }

        return (
            '<div class="query-details">' +
            '<h2>' + order.orderNumber + '</h2> ' +
            (html.length ? '<table style="width: 100%;"> ' + html.join(' ') + '</table> ' : '<p>' + client['Клиент уже закреплен за Агентом Банка'] + '</p>') +
            '</div> ' // +
            // '<div class="query-action"> ' +
            //   '<a class="js_modal button button-simple i i-new" href="#new" data-url="/ajax/order/new?type=bankguarantee&principal_id=' + client.id + '">Добавить сделку</a> ' +
            // '</div>'
        );
    }

    function selectActive() {
        $items.removeClass('active');

        if (idx >= 0) {
            $items.eq(idx).addClass('active');
        }
    }

    function changeIdx(d) {
        idx = idx + d;

        if (idx >= $items.length) {
            idx = $items.length;

        } else if (idx <= 0) {
            idx = 0;
        }

        if (idx === $items.length) {
            $('#query_action_new').addClass('focus');
        } else {
            $('#query_action_new').removeClass('focus');
        }

        selectActive();
        // changeValue();
        preview();

        if (idx !== $items.length) {
            adjustScroll();
        }
    }

    function changeValue() {
        if (idx < 0) {
            $input.val(query);

            return;
        }

        if (a[idx]) {
            $input.val(a[idx].fullname);
        } else {
            $input.val(query);
        }
    }

    function preview() {
        var html = '';

        if (idx >= 0) {
            if (a[idx]['_type'] == 'company') {
                html = getClientDetailsHTML(a[idx]);
            }
            if (a[idx]['_type'] == 'order') {
                html = getOrderDetailsHTML(a[idx]);
            }
        }

        $('#query_content').html(html);
        $('#query_nav dd').css({maxHeight: Math.max(300, $('#query_content .query-details').outerHeight() - 24)});
    }

    function adjustScroll() {
        var $current = $items.eq(idx),
            $container = $('#query-result dd');

        if (!$current.length || idx < 0) {
            $container.scrollTop(0);

            return;
        }

        var containerHeight = $container.height(),
            offsetTop = $current.prop('offsetTop'),
            heightDelta = $current.outerHeight(),
            upperBound = $container.scrollTop(),
            lowerBound = upperBound + containerHeight - heightDelta;

        if (offsetTop < upperBound) {
            $container.scrollTop(offsetTop);
        } else if (offsetTop > lowerBound) {
            $container.scrollTop(offsetTop - containerHeight + heightDelta);
        }
    }

    function init() {
        $input = $('#query_form input.search');
        url = $input.data('url');

        $('#query_form').submit(function (event) {
            event.preventDefault();

            // TODO
        });

        $input.on('keyup input', function (event) {
            $result = $('#query-result');

            if ($result.length) {
                if (event.which === keys.RETURN) {
                    if ($('#query_action_new').hasClass('focus')) {
                        $('#query_action_new').trigger('click');
                        $('#query-result').remove();

                    } else if (a[idx]) {
                        if (a[idx]['_type'] == 'company') {
                            window.location.href = '/company/view?company_id=' + a[idx].id;
                        }
                        if (a[idx]['_type'] == 'order') {
                            window.location.href = '/order/view?order_id=' + a[idx].id;
                        }
                    }

                    return;
                }

                if (event.which === keys.ESC) {
                    $('#query-result').remove();

                    return;
                }

                if (event.which === keys.UP || event.which === keys.DOWN) {
                    changeIdx(event.which === keys.UP ? -1 : 1);

                    return;
                }
            }

            if (this.value === query) return;

            query = this.value;

            // if (event.which === keys.RETURN) {
            //   $items.eq(selectedIndex).trigger('click');

            //   return;
            // }

            clearTimeout(onChangeInterval);

            if (query.length > 2) {
                onChangeInterval = setTimeout(function () {
                    if (request) {
                        request.abort();
                    }

                    if (!$result.length) {
                        $result = $(tmpl).appendTo('#query_form');
                        $nav = $('#query_nav');
                        $content = $('#query_content');

                        setTimeout(function () {
                            $result.addClass('active');
                        }, 0);
                    }

                    request = $.getJSON(url, {q: query}).done(function (data) {
                        var html = [];

                        a = [];
                        request = null;
                        if (data.company && data.company.length) {
                            for (var i = 0, length = data.company.length; i < length; i++) {
                                data.company[i].idx = i;

                                a.push(data.company[i]);
                                if (data.company[i]._type == 'company') {
                                    html.push(getClientHTML(data.company[i]));
                                }
                                if (data.company[i]._type == 'order') {
                                    html.push(getOrderHTML(data.company[i]));
                                }
                            }

                            $nav.html(
                                '<dl> ' +
                                //'<dt>' + uas.i18n.translate('Клиенты банка') + '</dt> ' +
                                '<dd><ul>' + html.join(' ') + '</ul></dd> ' +
                                '</dl> ' +
                                '<div class="query-action"> ' +
                                '<a id="query_action_new" class="button button-simple i i-new" href="#new" data-url="/ajax/company/create">' + uas.i18n.translate('Добавить клиента') + '</a> ' +
                                '</div>'
                            );

                            $items = $nav.find('a.none');

                            $items.click(function (event) {
                                event.preventDefault();
                                event.stopPropagation();

                                idx = this.hash.slice(1);

                                $input.focus();

                                selectActive();
                                preview();
                            });

                            idx = 0;

                            selectActive();
                            preview();

                        } else {
                            $nav.html(
                                '<div class="query-empty">' +
                                uas.i18n.translate('Вы искали') + ' <strong>"' + query + '"</strong>, ' + uas.i18n.translate('но по данному запросу ничего не найдено') + '&hellip;' +
                                '</div> ' +
                                '<div class="query-action"> ' +
                                '<a id="query_action_new" class="button button-simple i i-new" href="#new" data-url="/ajax/company/create">' + uas.i18n.translate('Добавить клиента') + '</a> ' +
                                '</div>'
                            );
                            $content.html('');
                        }

                        $('#query_action_new').click(function (event) {
                            event.preventDefault();

                            $.modal({
                                url: '/ajax/company/create?q=' + encodeURIComponent(query),
                                afterShow: function (parent) {
                                    $.ujs.onComplete(parent);

                                    uas.script.modalOverflow(parent, true);
                                }
                            });
                        });

                        $nav.find('li').highlight(query.split(' '));

                    }).fail(function (jqXHR, textStatus, errorThrown) {
                    });
                }, 100);

            } else if ($result.length) {
                $result.remove();
            }
        });

        $(document).on('click', function (event) {
            if (
                $('#query_form button')[0] !== event.target &&
                $('#query_form input')[0] !== event.target && !$('#query-window').has(event.target).length
            ) {
                $('#query-result').remove();
            }
        });
    }

    return {
        init: init
    }
}());
/**
 *  User session
 */

uas.session = (function () {
    var modal, /*warnTimer,*/ timeoutTimer, countdownTimer, authType,
        options = {};

    function warnDialog() {
        var seconds = options.timeoutAfter - options.warnAfter

        $.modal({
            modal: true,
            tools: false,
            closeOnEsc: false,
            view: 'default',
            content: '<div class="modal-confirm"> ' +
            '<h2>' + options.title + '</h2>' +
            '<p>' + options.message + '<span class="countdown">00:00</span></p>' +
            '<div class="action"> ' +
            '<a class="button button-simple" href="javascript:void(0)" onclick="event.preventDefault();' +
            'document.getElementById(\'logout-form\').submit();">' + options.logoutText + '</a> ' +
            '<button class="button" type="button">' + options.keepAliveText + '</button> ' +
            '</div> ' +
            '</div> ',
            afterShow: function (parent) {
                modal = this;

                $('a', parent).click(function (event) {
                    event.preventDefault();

                    deleteSession();
                });

                $('button', parent).click(function (event) {
                    event.preventDefault();

                    keepAliveSession();
                });

                countdown(seconds);
            },
            beforeRemove: function (parent) {
                modal = null;
            }
        });
    }

    function countdown(seconds) {
        var c = seconds,
            h = ~~(c / 3600),
            m = ~~((c % 3600) / 60),
            s = c % 60,
            $counter = $('.countdown', modal.$content);

        clearInterval(countdownTimer);

        function count() {
            var a = [];

            s--;

            if (s < 0 && m) {
                s = 59;
                m--;
            }
            if (m < 0 && h) {
                m = 59;
                h--;
            }
            if (s < 0) {
                h = 0;
                m = 0;
                s = 0;

                timeIsOut();

            }

            if (h) {
                a.push(uas.helpers.pad(h));
            }

            a.push(uas.helpers.pad(m));
            a.push(uas.helpers.pad(s));

            $counter.text(a.join(':'));
        }

        count();
        countdownTimer = setInterval(count, 1000);
    }

    function deleteSession() {
        $('body').addOverlay({content: 'Good bye!'});resetAll

        if (modal) {
            modal.$modal.css({visibility: 'hidden'});
        }

        window.location.reload();

    }

    function keepAliveSession() {
        if (modal) {
            modal.$content.addOverlay({spinner: false});
        }

        $.getJSON(options.keepAliveUrl, function (data) {
            if (data.error_code) {
                uas.flash.error(data.error);

                if (modal) {
                    modal.$content.removeOverlay();
                }

            } else {
                modal.remove();

                resetAll();
            }
        });
    }

    function timeIsOut() {
        document.getElementById('logout-form').submit();
    }

    function resetAll() {
        if (options.timeoutAfter && options.warnAfter) {
            showTime();
        }
    }

    function showTime() {
        //clearTimeout(warnTimer);
        clearTimeout(timeoutTimer);
        clearInterval(countdownTimer);

        if (modal) {
            modal.remove();
        }

        /*warnTimer = setTimeout(function () {
            //warnDialog();
        }, options.warnAfter * 1000);*/

        timeoutTimer = setTimeout(function () {
            timeIsOut();
        }, (options.timeoutAfter + 10) * 1000);
    }

    return function (o) {

        if (o === 'touch') {
            resetAll();
        } else {

            /*options = $.extend({
                title: 'Вы еще здесь?',
                message: 'Сессия подключения будет прервана через',
                timeoutText: 'Время сессии истекло',
                keepAliveText: 'Продолжить работу',
                keepAliveUrl: '/api/user/ping',
                redirectUrl: '/',
                okText: 'Хорошо',
                logoutText: 'Закончить работу',
                logoutUrl: '/api/logout',
                warnAfter: 540,   // 9 minutes
                timeoutAfter: 600, // 10 minutes
                authType: authType // 10 minutes
            }, o);

            if (options.timeoutAfter && options.warnAfter && !options.authType) {
                showTime();
            }*/

        }

    }

}());

/**
 *  Suggestions
 */
uas.suggest = (function () {
    function clientDialog(params) {
        var url = '/ajax/company/create?source=' + params.key + '&q=' + encodeURIComponent(params.q);

        if (params.accessibility) {
            url += '&accessibility=1';
        }

        $.modal({
            url: url,
            beforeShow: function (parent) {
                if (params.key === 'order_principal') {
                    $('div.header h2', parent).html(uas.i18n.translate('Выберите принципала'));

                } else if (params.key === 'order_beneficiary') {
                    $('div.header h2', parent).html(uas.i18n.translate('Выберите бенефициара'));
                }
            },
            afterShow: function (parent) {
                $.ujs.onComplete(parent);

                uas.script.modalOverflow(parent, true);
            }
        });
    }

    function client(selector, options) {
        options = $.extend({
            url: '/api/company/search',
            accessibility: false
        }, options);

        var $id, $inn,
            key = options.key || '',
            value = '',
            button = uas.i18n.translate('Добавить клиента'),
            $title = $(selector);

        if (key === 'order_principal') {
            button = uas.i18n.translate('Выбрать принципала');
        } else if (key === 'order_beneficiary') {
            button = uas.i18n.translate('Выбрать бенефициара');
        }

        if (options.id) {
            key = key || options.id.slice(1);

            $id = $(options.id);
            $inn = $(options.inn);

            $id.data('title', $.trim($title.val()));

            $title.on('keyup blur', function (event) {
                value = $title.val();

                if ($.trim($title.val()) !== $id.data('title')) {
                    $id.val('').data('title', '');
                    $inn.val('');

                    if (event && event.type === 'blur') {
                        $title.val('');
                    }

                    if (typeof(options.onChange) === 'function') {
                        options.onChange();
                    }
                }
            });

        } else {
            $title.on('blur', function (event) {
                value = $title.val();
            });
        }

        $title.on('blur', function (event) {
            $title.off('keydown.empty');
        });

        $title.autocomplete({
            type: 'POST',
            appendTo: options.appendTo,
            minChars: 3,
            maxHeight: 300,
            paramName: 'q',
            serviceUrl: options.url,
            tabDisabled: true,
            orientation: 'auto',
            deferRequestBy: 3,
            containerClass: options.className,
            preventBadQueries: false,
            noSuggestionNotice: uas.i18n.translate('Клиент с таким названием компании не найден'),
            showNoSuggestionNotice: true,
            triggerSelectOnValidInput: false,
            footer: '<a class="js_suggestion_new action i i-new" href="#new">' + button + '</a>',
            transformResult: function (response) {
                var result = {};

                response = typeof(response === 'string') ? $.parseJSON(response) : response;
                result.suggestions = [];

                if (response && response.company) {
                    $.each(response.company, function (i, data) {
                        result.suggestions.push({
                            value: data.displayName,
                            data: data,
                            disabled: options.accessibility && !data.access.order
                        });
                    });
                }

                return result;
            },
            formatResult: function (suggestion, currentValue) {
                var html = [];

                if (suggestion.data['INN']) {
                    html.push('<p>' + uas.i18n.translate('ИНН') + ': ' + suggestion.data['INN'] + '</p>');
                }

                if (suggestion.disabled) {
                    return '<div class="client disabled">' +
                        '<h5>' + suggestion.value + '</h5>' +
                        '<p>' + uas.i18n.translate('Клиент уже закреплен за Агентом Банка') + '</p>' +
                        '</div>';

                } else {
                    return '<div class="client">' +
                        '<h5>' + suggestion.value + '</h5>' +
                        html.join(' ') +
                        '</div>';
                }
            },
            beforeRender: function (container, suggestions) {
                container.highlight(this.value.split(' '));
            },
            onSearchStart: function (params) {
                $title.off('keydown.empty');
            },
            onSearchComplete: function (q, suggestions) {
                if (!suggestions.length) {
                    $title.on('keydown.empty', function (event) {
                        if (event.which === 13) {
                            event.preventDefault();

                            $title.autocomplete('hide');

                            clientDialog({key: key, q: value});
                        }
                    });
                }
            },
            onSelect: function (suggestion) {
                if (suggestion.data && !suggestion.disabled) {
                    if (options.id) {
                        $id.val(suggestion.data.id).data('title', $.trim(suggestion.value));
                        $inn.val(suggestion.data['INN'] || '');
                    }

                    if (typeof(options.onSelect) === 'function') {
                        options.onSelect(suggestion);
                    }
                } else {
                    if (options.id) {
                        $id.val('');
                        $inn.val('');
                    }

                    $title.val('');
                }

                $title.trigger('pick');
            },
            onReady: function (container) {
                $('.js_suggestion_new', container).click(function (event) {
                    event.preventDefault();

                    $title.autocomplete('hide');

                    clientDialog({key: key, q: value, accessibility: options.accessibility});
                });
            }
        });
    }

    function setClient(key, id, name, inn) {
        if (key === 'order_client_id') {
            $('#order_client_id').val(id).data('title', $.trim(name || ''));
            $('#order_client_name').val(name).trigger('pick');

        } else if (key) {
            $('#' + key + '_id').val(id).data('title', $.trim(name || ''));
            $('#' + key + '_name').val(name).trigger('pick');
            $('#' + key + '_inn').val(inn || '').trigger('pick');

            if (key === 'order_beneficiary') {
                $('#order_contract_type').focus();
            }

        } else {
            var $pick, $html, tmpl,
                $a = $('.active_beneficiary'),
                data = {};

            if ($a.length) {
                data = $a.data();
                $pick = $a.closest(data.pick);

                if (data.tmpl) {
                    tmpl = $(data.tmpl).html();

                    $html = $(Mustache.render(tmpl, {
                        beneficiary_id: id,
                        beneficiary_name: name,
                        beneficiary_inn: inn || ''
                    }));

                    if (data.container) {
                        $(data.container).append($html);

                        $.ujs.onComplete($html);
                    } else if (data.replace) {
                        $a.closest(data.replace).replaceWith($html);
                    } else {
                        $a.replaceWith($html);
                    }

                    $pick.trigger('pick');
                }

            } else {
                window.location.href = '/company/view?company_id=' + id;
            }
        }
    }

    return {
        client: client,
        setClient: setClient
    };
}());
/**
 *  Translates
 *  @TODO may be dup
 */
uas.locale = (function () {
    var locale = 'en';

    var translates = {
        ru: {
            date: {
                common_month_names: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
                abbr_month_names: ['янв.', 'фев.', 'мар.', 'апр.', 'мая', 'июня', 'июля', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'],
                standalone_month_names: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                standalone_abbr_month_names: ['Янв.', 'Февр.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.'],
                abbr_day_names: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
            },
            days: {
                one: 'день',
                few: 'дня',
                many: 'дней'
            }
        },
        en: {
            date: {
                common_month_names: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
                abbr_month_names: ['jan.', 'feb.', 'mar.', 'apr.', 'may', 'june', 'july', 'aug.', 'sept.', 'oct.', 'nov.', 'dec.'],
                standalone_month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                standalone_abbr_month_names: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
                abbr_day_names: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
            },
            days: {
                one: 'day',
                few: 'day',
                many: 'days'
            }
        }
    };

    function set(lang) {
        locale = lang;
    }

    function translate(key, options) {
        options = $.extend({
            locale: locale
        }, options);

        if (translates[options.locale] && translates[options.locale]) {
            var scope = key.split('.'),
                messages = translates[options.locale];

            while (messages && scope.length > 0) {
                messages = messages[scope.shift()];
            }

            return messages;
        } else {
            return '???';
        }
    }

    function pluralize(n, one, few, many) {
        if (n % 10 == 1 && n % 100 != 11) {
            return one
        } else if ([2, 3, 4].indexOf(n % 10) >= 0 && [12, 13, 14].indexOf(n % 100) < 0) {
            return few
        } else if (n % 10 == 0 || [5, 6, 7, 8, 9].indexOf(n % 10) >= 0 || [11, 12, 13, 14].indexOf(n % 100) >= 0) {
            return many
        } else {
            return '';
        }
    }

    return {
        t: translate,
        pluralize: pluralize
    };
}());

/**
 *  Translates
 *  @TODO may be dup
 */
uas.locales = (function () {
    var locales = {
        ru: {
            date: {
                common_month_names: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
                abbr_month_names: ['янв.', 'фев.', 'мар.', 'апр.', 'мая', 'июня', 'июля', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'],
                standalone_month_names: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                standalone_abbr_month_names: ['Янв.', 'Февр.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.'],
                abbr_day_names: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
            },
            title: {
                partners: 'Клиенты',
                activities: 'Активности',
                opportunities: 'Сделки',
                tasks: 'Задачи',
                contacts: 'Контакты'
            }
        },
        en: {
            date: {
                common_month_names: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
                abbr_month_names: ['jan.', 'feb.', 'mar.', 'apr.', 'may', 'june', 'july', 'aug.', 'sept.', 'oct.', 'nov.', 'dec.'],
                standalone_month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                standalone_abbr_month_names: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
                abbr_day_names: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
            },
            title: {
                partners: 'Clients',
                activities: 'Activity',
                opportunities: 'Dealings',
                tasks: 'Tasks',
                contacts: 'Contacts'
            }
        }
    };

    function translate(key, options) {
        options = $.extend({
            locale: 'en'
        }, options);

        if (locales[options.locale] && locales[options.locale]) {
            var scope = key.split('.'),
                messages = locales[options.locale];

            while (messages && scope.length > 0) {
                messages = messages[scope.shift()];
            }

            return messages;
        } else {
            return '???';
        }
    }

    function pluralize(n, one, few, many) {
        if (n % 10 == 1 && n % 100 != 11) {
            return one
        } else if ([2, 3, 4].indexOf(n % 10) >= 0 && [12, 13, 14].indexOf(n % 100) < 0) {
            return few
        } else if (n % 10 == 0 || [5, 6, 7, 8, 9].indexOf(n % 10) >= 0 || [11, 12, 13, 14].indexOf(n % 100) >= 0) {
            return many
        } else {
            return '';
        }
    }

    return {
        t: translate,
        pluralize: pluralize
    };
}());
/**
 *  Visualization
 */
uas.visual = (function () {
    function competence(a) {
        for (var key in a) {
            (function (id, options) {
                if (document.getElementById(id)) {
                    var l = 216, // 300
                        c = l / 2, // 150
                        r = Raphael(id, l, l),
                        step = options.max ? 100 / options.max : 100;

                    r.customAttributes.arc = function (value, total, R) {
                        var path,
                            alpha = 360 / total * value,
                            a = (90 - alpha) * Math.PI / 180,
                            x = c + R * Math.cos(a),
                            y = c - R * Math.sin(a);

                        if (total == value) {
                            path = [['M', c, c - R], ['A', R, R, 0, 1, 1, c - 0.01, c - R]]; //149.99
                        } else {
                            path = [['M', c, c - R], ['A', R, R, 0, +(alpha > 180), 1, x, y]];
                        }

                        return {path: path};
                    };

                    goal = Math.min((options.goal || 0) * step, 100);
                    result = Math.min((options.result || 0) * step, 100);

                    var background = r.path().attr({stroke: '#ced8de', 'stroke-width': 24, arc: [96, 100, 88]}),
                        goalBar = r.path().attr({stroke: '#005E6B', 'stroke-width': 24, arc: [0, 100, 88]}),
                        resultBar = r.path().attr({stroke: '#fbbb23', 'stroke-width': 26, arc: [0, 100, 88]}),
                        goalTrgl = r.set(),
                        resultTrgl = r.set(),
                        start = r.set(),
                        finish = r.set(),
                        goalCorrect = 96 / 100 * goal,
                        resultCorrect = 96 / 100 * result,
                        resultDeg = (360 - 14) / 100 * result + 7,
                        goalDeg = (360 - 14) / 100 * goal + 7;

                    background.rotate(7, c, c);
                    goalBar.rotate(7, c, c);
                    resultBar.rotate(7, c, c);

                    start.push(r.path('M' + c + ',8,L,' + c + ',32').attr({stroke: '#ffffff', 'stroke-width': 1}));
                    start.rotate(7, c, c);

                    finish.push(r.path('M' + c + ',8,L,' + c + ',32').attr({stroke: '#ffffff', 'stroke-width': 1}));
                    finish.rotate(-7, c, c);

                    if (result) {
                        resultTrgl.push(r.path('M' + c + ',8,L,' + c + ',32').attr({
                            stroke: '#ffffff',
                            'stroke-width': 1
                        }));
                        resultTrgl.push(r.path('M' + c + ',24,L,' + (c - 12) + ',36,' + (c + 12) + ',36z').attr({
                            fill: '#e7a404',
                            stroke: '#ffffff',
                            'stroke-width': 1
                        }));
                        resultTrgl.rotate(7, c, c);
                    }

                    if (result > goal) {
                        goalTrgl.push(r.path('M' + c + ',8,L,' + c + ',32').attr({
                            stroke: '#ffffff',
                            'stroke-width': 1
                        }));
                        goalTrgl.push(r.path('M' + c + ',17,L,' + (c - 12) + ',5,' + (c + 12) + ',5z').attr({
                            fill: '#004049',
                            stroke: '#ffffff',
                            'stroke-width': 1
                        })); // , stroke: '#ffffff', 'stroke-width': 1
                        goalTrgl.rotate(7, c, c);
                    }

                    setTimeout(function () {
                        goalBar.animate({arc: [goalCorrect, 100, 88]}, 1100, '>'); // bounce linear
                        resultBar.animate({arc: [resultCorrect, 100, 88]}, 1000, '>'); // bounce linear
                        goalTrgl.animate({transform: 'r' + goalDeg + ' ' + c + ' ' + c}, 1100, '>');
                        resultTrgl.animate({transform: 'r' + resultDeg + ' ' + c + ' ' + c}, 1000, '>');
                    }, 500);
                }
            })(key, a[key]);
        }
    }

    return {
        competence: competence
    };
}());
/**
 *  XHR
 */
uas.xhr = (function () {
    function get(selector, url, options) {
        options = $.extend({
            callback: function () {
            }
        }, options);

        var $container = $(selector);

        if (url) {
            $container.addOverlay();

            $.get(url, function (html) {
                $container.html(html);
                $.ujs.onComplete($container);

                options.callback($container);

            }).fail(function (jqXHR, textStatus, errorThrown) {
                uas.flash.error();
            });
        }
    }

    function form(selector, options) {
        options = $.extend({
            containerSelector: '.js_partial',
            overlay: true,
            overlayOnSucess: false
        }, options);

        var $selector = $(selector);

        $selector.submit(function (event) {
            event.preventDefault();

            var form = this,
                $form = $(this),
                $container = options.containerSelector ? $form.closest(options.containerSelector) : $form,
                $errorAppend = options.errorSelector ? $(options.errorSelector) : $container,
                ajaxOptions = {
                    type: 'POST',
                    dataType: 'json',
                    url: options.url || this.action
                };

            if ($form.hasClass('active')) return false;

            $form.addClass('active');

            if (this.enctype === 'multipart/form-data') {
                ajaxOptions.data = new FormData(this);
                ajaxOptions.processData = false;
                ajaxOptions.contentType = false;
            } else {
                ajaxOptions.data = $form.serializeArray();
            }

            $('.flash').remove();
            $('.invalid', form).removeClass('invalid').removeAttr('title');
            $('span.error', form).remove();

            if (typeof(options.beforeSend) === 'function' && options.beforeSend(form) === false) {
                return false;
            }

            if (options.overlay) {
                $container.addOverlay();
            }

            $.ajax(ajaxOptions)
                .done(function (response) {
                    $form.removeClass('active');

                    if (response.error_code) {
                        $container.removeOverlay();

                        if (response.error) {
                            uas.flash.error(response.error, {container: $errorAppend});
                        }

                        if (response.errors) {
                            $.each(response.errors, function (k, v) {
                                var control = form[k],
                                    $control = $(control);

                                if (form[k]) {
                                    uas.helpers.fieldErrorAdd(form[k], v);

                                    if (k.indexOf('_id') !== -1) {
                                        var ok = k.split('_id')[0];

                                        if (form[ok]) {
                                            uas.helpers.fieldErrorAdd(form[ok], v);
                                        }
                                    }
                                }
                            });

                            $('.invalid', form).not('label, [type=hidden]').first().focus();
                        }

                        if (typeof(options.onError) === 'function') {
                            options.onError(form, response);
                        }
                    } else {
                        if (!options.overlayOnSucess) {
                            $container.removeOverlay();
                        }

                        if (typeof(options.onSuccess) === 'function') {
                            options.onSuccess(form, response);
                        }
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    $form.removeClass('active');
                    $container.removeOverlay();

                    uas.flash.error(null, {container: $errorAppend});
                });
        });
    }

    function getFile(response, status, xhr, filename) {
        var disposition = xhr.getResponseHeader('Content-Disposition'),
            blob = new Blob([response], {type: xhr.getResponseHeader('Content-Type')});

        if (disposition && disposition.indexOf('filename') !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
                matches = filenameRegex.exec(decodeURIComponent(disposition.replace(/UTF-8|\'\'/g, '')));

            if (matches !== null && matches[1]) {
                filename = matches[1].replace(/['"]/g, '');
            }
        }
        ;

        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
            window.navigator.msSaveBlob(blob, filename);

        } else {
            var URL = window.URL || window.webkitURL,
                downloadUrl = URL.createObjectURL(blob);

            if (filename) {
                // use HTML5 a[download] attribute to specify filename
                var a = document.createElement('a');

                // safari doesn't support this yet
                if (typeof(a.download) === 'undefined') {
                    window.location = downloadUrl;

                } else {
                    a.href = downloadUrl;
                    a.download = filename;

                    document.body.appendChild(a);

                    a.click();
                    a.remove();
                }
            } else {
                window.location = downloadUrl;
            }

            setTimeout(function () {
                URL.revokeObjectURL(downloadUrl);
            }, 100); // cleanup
        }
    }

    return {
        get: get,
        form: form,
        getFile: getFile
    };
}());
'use strict';

self.addEventListener('install', function(event){
    event.waitUntil(self.skipWaiting());
});

// A downside to the current implementation of the Push API in Chrome is that you can’t send a
// payload with a push message. Nope, nothing. The reason for this is that in a future
// implementation, payload will have to be encrypted on your server before it’s sent to a push
// messaging endpoint. This way the endpoint, whatever push provider it is, will not be able
// to easily view the content of the push payload. This also protects against other v
// ulnerabilities like poor validation of HTTPS certificates and man-in-the-middle attacks b
// etween your server and the push provider. However, this encryption isn’t supported yet, so
// in the meantime you’ll need to perform a fetch request to get information needed to populate
// a notification.
// https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web?hl=en
self.addEventListener('push', function (event) {
    event.waitUntil(
        self.registration.pushManager.getSubscription().then(function(subscription){
            var token = subscription.endpoint.split('/').pop();

            // console.log('GCM subscription', subscription, token);

            return fetch('/api/push/get?token_id=' + (token || '')).then(function(response){ // /templates/chrome_push.json
                // console.log('GCM server response', response);

                if (response.status !== 200) {
                    console.error('GCM server response error');
                    // throw new Error();
                    return;
                }

                return response.json().then(function(data){
                    // console.log('GCM server response data', data);

                    if (data.notification) { //  && data.notification.length
                        // var o;

                        // if (data.notification.length > 5) {
                        //   data.notification = data.notification.reverse().slice(0, 5).reverse();
                        // }

                        // for (var i = 0, length = data.notification.length; i < length; i++) {
                        //   var notification = data.notification[i];

                        //   o = self.registration.showNotification(notification.title, {
                        //     body: notification.body,
                        //     icon: '/android-chrome-192x192.png',
                        //     data: {
                        //       url: notification.url
                        //     }
                        //   });
                        // }

                        // return o;

                        if (JSON.stringify(data.notification) === self.previousDataString) {
                            return;
                        } else {
                            self.previousDataString = JSON.stringify(data.notification);
                        }

                        return self.registration.showNotification(data.notification.title, {
                            body: data.notification.body,
                            icon: '/android-chrome-192x192.png',
                            data: {
                                url: data.notification.url
                            }
                        });

                    } else {
                        console.error('GCM push notification not found');
                        // throw new Error();
                        return;

                        // return self.registration.showNotification('MOOS', {
                        //   body: 'Обновилась информация на сайте',
                        //   icon: '/android-chrome-192x192.png'
                        // });
                    }
                }).catch(function (error) {
                    console.error('GCM unable to retrieve data', error);

                    return self.registration.showNotification('MOOS', {
                        body: 'Обновилась информация на сайте',
                        icon: '/android-chrome-192x192.png'
                    });
                });
            });
        })
    );
});

self.addEventListener('notificationclick', function(event){
    var url;

    if (event.notification.data) {
        url = event.notification.data.url;
    }

    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(function(windowClients) {
            for (var i = 0, length = windowClients.length; i < length; i++) {
                var client = windowClients[i];

                if (client.url.indexOf(url) !== -1 && 'focus' in client) {
                    return client.focus();
                }
            }

            if (clients.openWindow) {
                return clients.openWindow(url || '/');
            }
        })
    );
});
/*
 *  Chrome push notifications
 */
 /*if ('serviceWorker' in navigator) {   
    // console.log('Service Worker is supported');
    navigator.serviceWorker.register('/pushworker.js').then(function() {
        return navigator.serviceWorker.ready;

    }).then(function(registration) {
        // console.log('Service Worker is ready :^)', registration);

        registration.pushManager.subscribe({ userVisibleOnly: true }).then(function(subscription) {
            var token         = subscription.endpoint.split('/').pop(),
                currentToken  = localStorage.getItem('moosPNToken');

            if (token !== currentToken) {
                $.post('/api/push/register', { token_id: token }, function(response){
                    if (response.error_code) {
                        console.warn(response.error || 'GCM register error');

                    } else {
                        localStorage.setItem('moosPNToken', token);
                    }
                }, 'json');
            }
        }).catch(function(error) {
            var token = localStorage.getItem('moosPNToken');

            if (token) {
                localStorage.removeItem('moosPNToken');

                $.post('/api/push/unregister', { token_id: token }, function(response){
                    if (response.error_code) {
                        console.warn(response.error || 'GCM unregister error');
                    }
                }, 'json');
            }
        });

    }).catch(function(error) {
        // console.log('Service Worker Error :^(', error);
    });
    
}*/
