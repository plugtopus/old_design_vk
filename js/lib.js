function insertAfter(e, t) {
    e.parentNode.insertBefore(t, e.nextSibling)
}

function wait(e, t) {
    "undefined" != typeof e() ? t() : setTimeout(function () {
        wait(e, t)
    }, 0)
}

function decodeHtml(e) {
    var t = document.createElement("textarea");
    return t.innerHTML = e, t.value
}

function checkWide() {
    if (document.getElementById("narrow_column") && wide !== document.getElementById("narrow_column").getBoundingClientRect().bottom < 0) {
        wide = !wide;
        var e;
        wide ? (document.getElementById("wide_column").classList.add("wide"), document.getElementsByClassName("narrow_column_wrap")[0].style.position = "absolute", isFirefox && (e = [].slice.call(document.getElementsByClassName("oldvk-resized")), e.forEach(function (e) {
            Zoom.plus(e), Array.prototype.forEach.call(e.childNodes, function (e) {
                Zoom.plus(e)
            }), e.classList.remove("oldvk-resized")
        }), e = [].slice.call(document.getElementsByClassName("oldvk-resized-gif")), e.forEach(function (e) {
            Zoom.plus_d(e.getElementsByClassName("page_doc_photo_href")[0]), Zoom.plus(e.getElementsByClassName("page_doc_photo")[0]), Zoom.plus(e.getElementsByClassName("page_doc_photo_href")[0]), e.classList.remove("oldvk-resized-gif")
        }))) : (document.getElementById("wide_column").classList.remove("wide"), document.getElementsByClassName("narrow_column_wrap")[0].style.position = "relative", isFirefox && (e = [].slice.call(document.getElementsByClassName("page_post_sized_thumbs")), e.forEach(function (e) {
            e.getBoundingClientRect().top + document.body.scrollTop <= topStop && (Zoom.minus(e), [].forEach.call(e.childNodes, function (e) {
                Zoom.minus(e)
            }), e.classList.add("oldvk-resized"))
        }), e = Array.prototype.slice.call(document.getElementsByClassName("page_gif_large")), e.forEach(function (e) {
            e.getBoundingClientRect().top + document.body.scrollTop <= topStop && (Zoom.minus_d(e.getElementsByClassName("page_doc_photo_href")[0]), Zoom.minus(e.getElementsByClassName("page_doc_photo")[0]), Zoom.minus(e.getElementsByClassName("page_doc_photo_href")[0]), e.classList.add("oldvk-resized-gif"))
        })))
    }
}

function initWide() {
    if (document.getElementById("content")) {
        var e = document.getElementById("content").firstElementChild.id,
            t = "profile" === e || "group" === e || "public" === e;
        wide = !document.getElementById("narrow_column") || !t || document.getElementById("narrow_column").getBoundingClientRect().bottom < 0, wide && t && (console.timeEnd("B"), document.getElementById("wide_column").classList.add("wide"), document.getElementsByClassName("narrow_column_wrap")[0].style.position = "absolute"), t ? (window.addEventListener("scroll", checkWide), window.addEventListener("resize", checkWide), window.addEventListener("mousedown", checkWide), window.addEventListener("load", checkWide)) : (window.removeEventListener("scroll", checkWide), window.removeEventListener("resize", checkWide), window.removeEventListener("mousedown", checkWide), window.removeEventListener("load", checkWide))
    }
}

function initResize() {
    KPP.add(".page_post_sized_thumbs", function (e) {
        var t = e;
        resizing(t, function () {
            Zoom.minus(t), Array.prototype.forEach.call(t.childNodes, function (e) {
                Zoom.minus(e)
            }), t.classList.add("oldvk-resized")
        })
    }), KPP.add(".page_gif_large", function (e) {
        var t = e;
        resizing(t, function () {
            Zoom.minus_d(t.getElementsByClassName("page_doc_photo_href")[0]), Zoom.minus(t.getElementsByClassName("page_doc_photo")[0]), Zoom.minus(t.getElementsByClassName("page_doc_photo_href")[0]), t.classList.add("oldvk-resized-gif")
        })
    })
}

function resizing(e, t) {
    wide = null;
    var o = document.getElementById("content").firstElementChild.id,
        n = "profile" === o || "group" === o || "public" === o;
    if (n && !e.classList.contains("oldvk-resized")) {
        var i = document.getElementById("narrow_column");
        null === wide && (wide = !i || !n || i.getBoundingClientRect().bottom < 0), !wide && n && e.getBoundingClientRect().top + document.body.scrollTop <= topStop && t()
    }
}
window.browser || (window.browser = window.msBrowser || window.chrome);
var isFirefox = "undefined" != typeof InstallTrigger,
    isWebExt = "undefined" != typeof browser && "undefined" != typeof browser.extension,
    options = isWebExt ? {
        optionCover: !1,
        optionViewer: !1
    } : self.options;
isFirefox && !isWebExt && self.port.on("options", function (e) {
    Object.assign(options, e), console.log(options)
}), String.prototype.startsWith || Object.defineProperty(String.prototype, "startsWith", {
    enumerable: !1,
    configurable: !1,
    writable: !1,
    value: function (e, t) {
        return t = t || 0, this.lastIndexOf(e, t) === t
    }
}), String.prototype.endsWith || Object.defineProperty(String.prototype, "endsWith", {
    value: function (e, t) {
        var o = this.toString();
        (void 0 === t || t > o.length) && (t = o.length), t -= e.length;
        var n = o.indexOf(e, t);
        return n !== -1 && n === t
    }
}), Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector), Object.assign || Object.defineProperty(Object, "assign", {
    enumerable: !1,
    configurable: !0,
    writable: !0,
    value: function (e, t) {
        "use strict";
        if (void 0 === e || null === e) throw new TypeError("Cannot convert first argument to object");
        for (var o = Object(e), n = 1; n < arguments.length; n++) {
            var i = arguments[n];
            if (void 0 !== i && null !== i)
                for (var s = Object.keys(Object(i)), d = 0, a = s.length; d < a; d++) {
                    var r = s[d],
                        l = Object.getOwnPropertyDescriptor(i, r);
                    void 0 !== l && l.enumerable && (o[r] = i[r])
                }
        }
        return o
    }
});
var KPP = {
        _list: [],
        _actions: [],
        _addedTag: function (e, t, o, n, i) {
            for (var s = 0, d = t.length; s < d; s++)
                for (var a = 0, r = t[s].addedNodes.length; a < r; a++) t[s].addedNodes[a].tagName === o && (n(), i && e.disconnect())
        },
        _police: new MutationObserver(function (e) {
            for (var t = 0, o = e.length; t < o; t++)
                for (var n = 0, i = e[t].addedNodes.length; n < i; n++)
                    if (1 === e[t].addedNodes[n].nodeType)
                        for (var s = KPP._list.length; s--;)
                            if (e[t].addedNodes[n].matches(KPP._list[s])) e[t].addedNodes[n].KPPPassed || (KPP._actions[s](e[t].addedNodes[n]), e[t].addedNodes[n].KPPPassed = !0);
                            else
                                for (var d = e[t].addedNodes[n].querySelectorAll(KPP._list[s]), a = 0, r = d.length; a < r; a++) d[a].KPPPassed || (KPP._actions[s](d[a]), d[a].KPPPassed = !0)
        }),
        head: function (e) {
            if (document.head) e();
            else {
                var t = new MutationObserver(function (t, o) {
                    KPP._addedTag(o, t, "HEAD", e, !0)
                });
                t.observe(document.documentElement, {
                    childList: !0
                })
            }
        },
        body: function (e) {
            if (document.body) e();
            else {
                var t = new MutationObserver(function (t, o) {
                    KPP._addedTag(o, t, "BODY", e, !0)
                });
                t.observe(document.documentElement, {
                    childList: !0
                })
            }
        },
        add: function (e, t) {
            var o = document["querySelectorAll"](e);
            if (o.length > 0)
                for (var n = o.length; n--;) t(o[n]);
            KPP._list.push(e), KPP._actions.push(t), KPP._police.observe(document.documentElement, {
                childList: !0,
                subtree: !0
            })
        },
        remove: function (e) {
            var t = KPP._list.indexOf(e);
            return t !== -1 && (KPP._list.splice(t, 1), KPP._actions.splice(t, 1), KPP._list.length < 1 && KPP._police.disconnect(), !0)
        },
        stop: function (e) {
            KPP._police.disconnect(), e && (KPP._list = [], KPP._actions = [])
        }
    },
    topStop = 3e3,
    Zoom = {
        factor: .66,
        factorFixed: .77,
        plus: function (e) {
            e.style.width = parseFloat(e.style.width) / Zoom.factor + "px", e.style.height = parseFloat(e.style.height) / Zoom.factor + "px"
        },
        minus: function (e) {
            e.style.width = parseFloat(e.style.width) * Zoom.factor + "px", e.style.height = parseFloat(e.style.height) * Zoom.factor + "px"
        },
        plus_d: function (e) {
            e.dataset.width = e.dataset.width / Zoom.factor, e.dataset.height = e.dataset.height / Zoom.factor
        },
        minus_d: function (e) {
            e.dataset.width = e.dataset.width * Zoom.factor, e.dataset.height = e.dataset.height * Zoom.factor
        }
    };
const styles = [{
        css: "audios",
        match: "audios"
    }, {
        css: "friends",
        match: "friends"
    }, {
        css: "market",
        match: "market"
    }, {
        css: "support",
        match: "support"
    }],
    langMap = {
        0: "ru",
        1: "uk",
        2: "be-tarask",
        3: "en-us",
        97: "kk",
        114: "be",
        100: "ru-petr1708",
        777: "ru-ussr"
    },
    i18n = {
        answers: {
            0: "Ответы",
            1: "Відповіді",
            2: "Адказы",
            3: "Feedback",
            97: "Жауаптарым",
            114: "Адказы",
            100: "Отвѣты",
            777: "Сводки"
        },
        edit: {
            0: "ред.",
            1: "ред.",
            2: "рэд.",
            3: "edit",
            97: "өзгерту",
            114: "рэд.",
            100: "изм.",
            777: "корр."
        },
        people: {
            0: "люди",
            1: "люди",
            2: "людзі",
            3: "people",
            97: "адамдар",
            114: "людзі",
            100: "персоны",
            777: "граждане"
        },
        communities: {
            0: "сообщества",
            1: "спільноти",
            2: "суполкі",
            3: "communities",
            97: "бірлестіктер",
            114: "суполкі",
            100: "общества",
            777: "клубы"
        },
        music: {
            0: "музыка",
            1: "музика",
            2: "музыка",
            3: "music",
            97: "музыка",
            114: "музыка",
            100: "патефонъ",
            777: "патефон"
        },
        games: {
            0: "игры",
            1: "ігри",
            2: "гульні",
            3: "games",
            97: "ойындар",
            114: "гульні",
            100: "потѣхи",
            777: "отдых"
        },
        all_friends: {
            0: "Все друзья",
            1: "Усі друзі",
            2: "Усе сябры",
            3: "All friends",
            97: "Барлық достар",
            114: "Усе сябры",
            100: "Всѣ знакомцы",
            777: "Все товарищи"
        },
        settings: {
            0: "Настройки",
            1: "Налаштування",
            2: "Налады",
            3: "Settings",
            97: "Баптаулар",
            114: "Налады",
            100: "Настройки",
            777: "Настройки"
        },
        apps: {
            0: "Приложения",
            1: "Додатки",
            2: "Праґрамы",
            3: "Apps",
            97: "Қосымшалар",
            114: "Дадаткі",
            100: "Аппликацiи",
            777: "Досуг и отдых"
        },
        audios: {
            0: "Аудиозаписи",
            1: "Аудiозаписи",
            2: "Аўдыёзапісы",
            3: "Music",
            97: "Аудиожазбалар",
            114: "Аўдыязапісы",
            100: "Композицiи",
            777: "Грамзаписи"
        },
        videos: {
            0: "Видеозаписи",
            1: "Відеозаписи",
            2: "Відэазапісы",
            3: "Videos",
            97: "Бейнежазбалар",
            114: "Відэазапісы",
            100: "Синематографъ",
            777: "Киноленты"
        },
        spam: {
            0: "Это спам",
            1: "Це спам",
            2: "Гэта спам",
            3: "Spam",
            97: "Бұл спам",
            114: "Гэта спам",
            100: "Сiе спамъ",
            777: "Это провокация"
        },
        delete: {
            0: "Удалить",
            1: "Видалити",
            2: "Выдаліць",
            3: "Delete",
            97: "Жою",
            114: "Выдаліць",
            100: "Сжечь",
            777: "Сжечь"
        }
    };