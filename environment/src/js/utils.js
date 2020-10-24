import $ from 'jquery';

window.jQuery = $;
require("@fancyapps/fancybox");

class EVNavigator {
    constructor() {
        this.userAgent = navigator.userAgent.toLowerCase();
    }
    isTablet() {
        const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(this.userAgent);
        return isTablet;
    }
    isMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(this.userAgent)) {
            return true;
        }
        return false;
    }
}

const getScrollVisibility = (element, delta = 100) => {
    let position = element.offset(),
        scroll = $(window).scrollTop(),
        height = $(window).height();
    return (position.top + delta < scroll + height) ? true : false;
};

const scrollClickToAnchor = (query, delta = 0, speed = 500) => {
    $(query).on('click', function () {
        const anchor = $(this).attr("href").split("#")[1];
        scrollToAnchor(anchor, delta, speed);
    });
};

const scrollToAnchor = (elementID, delta = 0, speed = 500) => {
    if (elementID) {
        const tmp = $("#" + elementID).position();
        // console.log('elementID', elementID, tmp);
        $("html, body").animate({ scrollTop: tmp.top - delta }, speed);
    }
};

const scrollToElement = (elementQuery, containerQuery, delta = 0, speed = 500) => {
    if (elementQuery && containerQuery) {
        // const tmp = $(elementQuery).offset();
        const top = document.querySelector(containerQuery).scrollTop;
        const offset = document.querySelector(elementQuery).offsetTop;
        // console.warn(elementQuery, top, offset);
        console.dir(document.querySelector(elementQuery));
        $(containerQuery).animate({ scrollTop: offset - delta }, speed);
    }
};

const openPopupByClick = query => {
    $(query).on('click', function () {
        const target = $(this).attr("data-popup");
        openPopup(target);
    });
};

const openPopup = id => {
    const target = "#" + id;
    $.fancybox.open([
        {
            src: target,
            type: "inline",
            closeExisting: true,
            smallBtn: false,
            toolbar: false,
            touch: false,
            beforeShow: function (instance, current) {
            },
            afterClose: function (instance, current) {
                lockScroll();
            },
            afterShow: function (instance, current) {

            }
        }
    ]);
    lockScroll();
};

class EVCookie {
    setCookie(name, value, expY, expM, expD, expH, expMin, domain, secure = false, path = false) {
        let cookieString = `${name}=${escape(value)}`;

        if (expY) {
            const expires = new Date(expY, expM, expD, expH, expMin);
            cookieString += `; expires=${expires.toGMTString()}`;
        }

        if (domain)
            cookieString += `; domain=${escape(domain)}`;

        if (secure) {
            cookieString += '; secure';
        }

        if (path) cookieString += `; path=${escape(path)}`;

        document.cookie = cookieString;
    }

    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    deleteCookie(name) {
        if (!this.getCookie(name)) return;

        console.log('del: ', name);
        this.setCookie(name, '', 1970, 1, 1, 0, 0);
    }
}

const getErrorMessage = errorCode => {
    switch (errorCode) {
        case 1: return 'Terms are not confirmed';
    }
};


const getSuccessMessage = successCode => {
    switch (successCode) {
        case 1: return 'Profile information changed';
    }
};

function lockScroll() {
    if ($("html").hasClass("lock")) $("html").removeClass("lock");
    else $("html").addClass("lock");
}


function closeNotification() {
    $('.notification').on('click', '.notification-close', function () {
        const current = $(this);
        current.closest('.notification-item').hide(200);
    });
}

const addNotification = (message, success = true) => {
    const notifications = $('.notification');
    const notification = generateNotification(message, success);
    notifications.append(notification);

    const currentItem = notifications.find('.notification-item:last-child');
    currentItem.show(200);
    setTimeout(() => {
        currentItem.hide(200);
    }, 5000);
};

const manageDisabledButtons = queryForm => {
    $(queryForm).each(function () {
        $(this).on('click change keyup', function () {
            let filled = 0;
            $(this).find('input:not([type="submit"])').each(function () {
                if (!$(this).val()) {
                    filled = -1;
                }
            });

            const btn = $(this).find('input[type="submit"]');
            if (filled == -1 && !btn.hasClass('btn-disabled')) {
                btn.addClass('btn-disabled');
            }
            if (filled == 0 && btn.hasClass('btn-disabled')) {
                btn.removeClass('btn-disabled');
            }
        });
    });
};

const getIDFromBody = () => {
    const classBody = $('body').attr('class').split(' ');
    let id = classBody.filter(element => element.startsWith("postid-"));
    return id[0].split('-')[1];
};

const isLocalhost = () => {
    const url = window.location.href;
    if (url.indexOf('localhost:8080') == -1)
        return false
    return true;
};

function getTranslateX(htmlElement) {
    const style = window.getComputedStyle(htmlElement);
    const matrix = new WebKitCSSMatrix(style.webkitTransform);
    return matrix.m41;
}

export {
    EVCookie,
    EVNavigator,
    getScrollVisibility,
    scrollToAnchor,
    scrollClickToAnchor,
    scrollToElement,
    openPopup,
    openPopupByClick,
    getErrorMessage,
    getSuccessMessage,
    addNotification,
    closeNotification,
    manageDisabledButtons,
    lockScroll,
    getIDFromBody,
    isLocalhost,
    getTranslateX
};