function init() {
    injectOptions.text = "var oldvk={};oldvk.options=" + JSON.stringify(options) + ";" + (isWebExt ? "" : "oldvk.fox=true;"), document.head.appendChild(injectOptions), document.head.appendChild(injectStart), headOptions(), checkCSS(styles), isWebExt && (insertCSS("local"), insertCSS("main"), isFirefox && insertCSS("fox"), browser.runtime.onMessage.addListener(function (e, t, n) {
        "updating" === e.action && (updateCSS(e.css), updating(e.path))
    })), initArrives(), isFirefox && initResize()
}

function insertCSS(e) {
    var t = browser.runtime.getURL("../css/" + e + ".css");
    if (!document.getElementById("oldvk-style-" + e)) {
        var n = document.createElement("link");
        n.rel = "stylesheet", n.type = "text/css", n.href = t, n.id = "oldvk-style-" + e, insertAfter(document.head, n)
    }
}

function updateCSS(e) {
    e.forEach(function (e) {
        e.apply ? document.head.classList.add("oldvk-" + e.css) : document.head.classList.remove("oldvk-" + e.css)
    })
}

function checkCSS(e) {
    var t = [],
        n = document.createElement("a");
    n.href = window.location.href;
    var a = n.pathname.slice(1);
    e.forEach(function (e) {
        var n = a.startsWith(e.match);
        t.push({
            css: e.css,
            apply: n
        })
    }), updateCSS(t)
}

function headOptions() {
    options.optionAudio && document.head.classList.add("oldvk-option-audio")
}

function initArrives() {
    function getFirstPhotoRow(e) {
        return !e.previousElementSibling || e.previousElementSibling.classList.contains("photos_period_delimiter") ? e : getFirstPhotoRow(e.previousElementSibling)
    }
    options.optionFont && document.head.classList.add("oldvk-largefont"), options.optionIm && document.head.classList.add("oldvk-im"), KPP.add(".page_cover", function (element) {
        if (options.optionCover) element.classList.add("adapted");
        else {
            var page_actions = document.getElementsByClassName("group_actions_wrap")[0],
                nc = document.getElementById("narrow_column"),
                page_block = document.createElement("div");
            page_block.className = "page_block page_photo", page_block.innerHTML = '<div class="page_avatar_wrap"><div class="page_avatar" id="page_avatar"></div></div>', page_block.appendChild(page_actions);
            var page_avatar_a = document.getElementsByClassName("page_cover_image")[0];
            if (page_avatar_a.className = "", page_avatar_a.firstElementChild.className = "page_avatar_img", page_avatar_a.hasAttribute("onclick")) {
                var temp = eval("(" + page_avatar_a.getAttribute("onclick").match(/{.*}/)[0] + ")").temp;
                page_avatar_a.firstElementChild.setAttribute("src", temp.base + temp.x_[0] + ".jpg")
            }
            nc.insertBefore(page_block, nc.firstChild), document.getElementById("page_avatar").appendChild(page_avatar_a)
        }
    }), KPP.add("#friends", function (e) {
        var t = document.getElementById("ui_rmenu_requests");
        if (t) {
            t.className = "ui_tab";
            var n = document.createElement("li");
            n.id = "friends_tab_requests", t.setAttribute("onclick", t.getAttribute("onclick").replace("Menu", "Tab")), n.appendChild(t), document.getElementById("friends_tab_online") && insertAfter(document.getElementById("friends_tab_online"), n), e.classList.contains("friends_requests") && (t.classList.add("ui_tab_sel"), document.getElementById("friends_tab_all").firstElementChild.classList.remove("ui_tab_sel"))
        }
        if (document.getElementsByClassName("ui_search_fltr")[0] ? document.getElementsByClassName("ui_search_fltr")[0].appendChild(document.getElementsByClassName("ui_rmenu")[0]) : document.getElementsByClassName("ui_rmenu")[0].parentNode.removeChild(document.getElementsByClassName("ui_rmenu")[0]), document.getElementById("friends_tabs_wrap")) {
            document.getElementById("friends_tabs_wrap").appendChild(document.getElementById("friends_list_edit_btn")), document.getElementById("friends_tabs_wrap").appendChild(document.getElementById("friends_list_delete_btn"));
            var a = document.createElement("div");
            a.className = "ui_rmenu_sep", document.getElementById("ui_rmenu_lists_list") && document.getElementById("ui_rmenu_lists_list").insertBefore(a, document.getElementsByClassName("friends_create_list")[0])
        } else {
            insertAfter(e.firstElementChild, document.getElementById("friends_import_block"));
            var i = document.getElementsByClassName("ui_header_ext_search")[0];
            document.getElementById("friends_import_block").appendChild(i), i.className = "friends_import_row clear_fix";
            var o = document.createElement("div");
            o.className = "friends_import_icon friends_import_extended";
            var s = document.createElement("div");
            s.className = "friends_import_cont";
            var l = document.createElement("div");
            l.className = "friends_import_header", l.textContent = i.textContent, s.appendChild(l), i.appendChild(o), i.appendChild(s), i.firstChild.textContent = "";
            var d = document.createElement("div");
            d.id = "friends_tab_all";
            var r = document.createElement("a");
            r.className = "ui_tab", r.href = "/friends?section=all", LocalizedContent.l10n("all_friends", function (e) {
                r.textContent = e
            }), d.appendChild(r);
            var c = document.createElement("div");
            c.className = "friends_tabs_wrap ui_tabs_header ui_tabs", e.insertBefore(c, document.getElementById("friends_import_header")), c.appendChild(d), c.appendChild(document.getElementById("friends_import_header")), e.insertBefore(document.getElementById("friends_filters_header"), document.getElementById("results"));
            var m = document.getElementById("search_query_wrap");
            if (m) var u = m.clientHeight + m.offsetTop;
            var _ = document.getElementById("friends_filters_block");
            _ && u && (_.style.top = u + "px")
        }
    }), KPP.add(".im-chat-input--textarea", function (e) {
        var t = document.createElement("div");
        t.id = "oldvk-emoji", e.appendChild(document.getElementsByClassName("im-chat-input--send")[0]), e.appendChild(document.getElementsByClassName("im-chat-input--selector")[0]), wait(function () {
            return emoji
        }, function () {
            t.innerHTML = emoji.html.map(function (e, t) {
                return '<a class="emoji_smile_cont" onmousedown="Emoji.addEmoji(Emoji.last - 1,\'' + emoji.emoji[t] + '\', this); return cancelEvent(event);" onclick="return cancelEvent(event);" onmouseover="return Emoji.emojiOver(Emoji.last - 1, this, true);">' + e + "</a>"
            }).join(""), e.insertBefore(t, document.getElementsByClassName("im-chat-input--selector")[0])
        });
        var n = document.createElement("img");
        if (n.src = document.getElementsByClassName("top_profile_img")[0].src, n.className = "oldvk-chat-avatar", e.parentNode.insertBefore(n, e), KPP.add(".im-page--aside-photo .nim-peer--photo", function (t) {
                var n, a = t.getElementsByTagName("img"),
                    i = e.parentNode.getElementsByClassName("oldvk-chat-avatar-wrap");
                for (n = i.length; n--;) i[n].remove();
                for (i = e.parentNode.getElementsByClassName("oldvk-chat-avatar-2"), n = i.length; n--;) i[n].remove();
                if (a.length < 3)
                    for (n = a.length; n--;) a[n].className = "oldvk-chat-avatar oldvk-chat-avatar-2", insertAfter(e, a[n].cloneNode(!1));
                else {
                    var o = document.createElement("div");
                    for (o.className = "oldvk-chat-avatar-wrap", n = a.length; n--;) a[n].className = "oldvk-chat-avatar-small oldvk-chat-avatar-2", o.appendChild(a[n].cloneNode(!1));
                    insertAfter(e, o)
                }
                var s = document.getElementsByClassName("im-page--header-more"),
                    l = document.getElementsByClassName("im-page--chat-header-in");
                s.length > 0 && document.getElementsByClassName("im-page--chat-header")[0].insertBefore(s[0], l[0])
            }), !options.optionIm) {
            var a = document["querySelectorAll"](".im-page--mess-actions .im-page-action");
            [].map.call(a, function (e) {
                e.classList.add("flat_button")
            }), document.getElementsByClassName("im-page-action_delete")[0].textContent = i18n.delete[lang], document.getElementsByClassName("im-page-action_spam")[0].textContent = i18n.spam[lang]
        }
    }), KPP.add("body:not(.blog_page) #ui_rmenu_news_list", function (e) {
        var t = document.createElement("ul");
        t.id = "oldvk-news-tabs", t.className = "ui_tabs ui_tabs_header clear_fix";
        var n = document.getElementById("ui_rmenu_news"),
            a = document.getElementById("ui_rmenu_updates"),
            i = document.getElementById("ui_rmenu_comments"),
            o = document.getElementById("ui_rmenu_search");
        n.classList.add("ui_tab"), a.classList.add("ui_tab"), i.classList.add("ui_tab"), o.classList.add("ui_tab");
        for (var s = e.parentNode.getElementsByClassName("ui_rmenu_item"), l = s.length; l--;) s[l].setAttribute("onclick", "newsMenuTabs(this);" + s[l].getAttribute("onclick"));
        for (s = e.parentNode.getElementsByClassName("ui_rmenu_subitem"), l = s.length; l--;) s[l].setAttribute("onclick", "newsMenuTabs(this);" + s[l].getAttribute("onclick"));
        t.appendChild(n), t.appendChild(a), t.appendChild(i), t.appendChild(o), e.parentNode.parentNode.insertBefore(t, e.parentNode);
        var d = document.getElementById("ui_rmenu_news_list");
        d.appendChild(document.getElementById("ui_rmenu_recommended")), n.classList.contains("ui_rmenu_item_sel") || document.querySelector("#ui_rmenu_news_list .ui_rmenu_item_sel") || e.parentNode.classList.add("unshown");
        var r = document.getElementById("feed_add_list_icon");
        r.classList.add("ui_rmenu_subitem"), d.insertBefore(r, d.firstChild);
        var c = document.getElementById("submit_post_box");
        c && document.getElementById("feed_filters").parentNode.insertBefore(c, document.getElementById("feed_filters"))
    }), KPP.add("#ui_rmenu_communities_list", function (e) {
        e.parentNode.appendChild(e), document.getElementById("ui_rmenu_communities").addEventListener("click", function () {
            setTimeout(function () {
                document.getElementById("ui_rmenu_communities_list").style.display = "block"
            }, 200)
        })
    }), KPP.add("#search_filters_block", function (e) {
        var t = document.createElement("div");
        t.id = "oldvk-filter-label", e.parentNode.insertBefore(t, document.getElementById("search_filters_block"))
    }), KPP.add("#profile #wide_column", function (e) {
        var t = e.getElementsByClassName("page_name")[0].textContent.split(" ");
        ")" === t[t.length - 1].substr(t[t.length - 1].length - 1) && t.pop(), document.getElementById("title").textContent = t.shift() + " " + t.pop(), document.getElementById("header").style.display = "block";
        var n = document.querySelector('.page_counter[onclick*="fans"]'),
            a = document.querySelector('.page_counter[href^="/tag"]');
        if (n || a) {
            var i = document.createElement("div");
            if (i.id = "oldvk-counters", a) {
                var o = document.createElement("a");
                o.className = "oldvk-counter", o.id = "oldvk-counter-tag";
                var s = document.createElement("span");
                s.textContent = a.firstElementChild.textContent, s.className = "fl_r", o.setAttribute("onclick", a.getAttribute("onclick")), o.setAttribute("href", a.getAttribute("href")), o.appendChild(s), i.appendChild(o)
            }
            if (n) {
                var l = document.createElement("a");
                l.className = "oldvk-counter", l.id = "oldvk-counter-sub";
                var d = document.createElement("span");
                d.textContent = n.firstElementChild.textContent, d.className = "fl_r", l.setAttribute("onclick", n.getAttribute("onclick")), l.setAttribute("href", n.getAttribute("href")), l.appendChild(d), i.appendChild(l)
            }
            document.getElementsByClassName("page_photo")[0].appendChild(i)
        }
    }), KPP.add("#profile_wall", function (e) {
        var t = document.getElementById("submit_post_box");
        t && insertAfter(e.firstElementChild, t);
        var n = document.getElementsByClassName("page_actions_inner");
        if (n.length > 0) {
            document.getElementsByClassName("page_actions_cont")[0].style.display = "none", document.getElementsByClassName("narrow_column_wrap")[0].appendChild(n[0]);
            var a = document.getElementById("profile_send_gift_btn"),
                i = document.getElementById("profile_gift_send_btn");
            a && !i && (a.className = "page_actions_item", a.textContent = a.getElementsByClassName("profile_gift_text")[0].textContent, n[0].insertBefore(a, n[0].firstChild))
        }
    }), KPP.add(".people_cell_name a", function (e) {
        var t = document.createElement("br"),
            n = document.createElement("span");
        n.textContent = decodeHtml(e.parentNode.parentNode.querySelector("img").alt.split(" ").pop()), e.appendChild(t), e.appendChild(n)
    }), KPP.add(".photos_row", function (e) {
        (document.getElementsByClassName("photos_period_delimiter").length > 0 || document.getElementsByClassName("photos_row_wrap").length > 0) && getFirstPhotoRow(e.parentElement).appendChild(e)
    }), options.optionViewer || KPP.add(".pe_canvas", function (e) {
        e.style.marginTop = e.parentNode.firstChild.offsetTop + "px", e.style.marginLeft = e.parentNode.firstChild.offsetLeft + "px", document.getElementsByClassName("pv_cont")[0].style.paddingLeft = "0"
    }), KPP.add(".im-page--members", function () {
        var e = document["querySelectorAll"](".im-page--members");
        if (e.length > 0)
            for (var t = 1; t < e.length; t++) e[t].remove();
        document.getElementsByClassName("im-page--chat-header")[0].appendChild(e[0])
    }), KPP.add("#ui_rmenu_members_list", function (e) {
        var t = document.getElementById("ui_rmenu_edit_list");
        t.parentNode.appendChild(t), e.parentNode.appendChild(e)
    }), KPP.add("#ui_rmenu_arhive", function (e) {
        var t = document.getElementById("ui_rmenu_news");
        insertAfter(t, e)
    }), KPP.add(".im-right-menu", function (e) {
        var t = e.getElementsByClassName("im-aside-notice"),
            n = document.getElementsByClassName("im-page--dialogs")[0],
            a = document.getElementById("im_dialogs");
        if (t.length > 0)
            for (var i = 0; i < t.length; i++) n.insertBefore(t[i], a);
        var o = document.getElementById("im-group-online-disabled-notice");
        o && n.insertBefore(o, a)
    }), KPP.add(".post", function (e) {
        e.classList.remove("post_likes_test_group_-1"), e.classList.remove("post_likes_test_group_two"), e.classList.remove("post_likes_test_group_three"), e.classList.remove("post_likes_test_group_four"), e.classList.remove("post_likes_test_group_five"), e.classList.remove("post_likes_test_group_six"), e.classList.remove("post_likes_test_group_seven")
    })
}

function updating(e) {
    switch (e) {
        case "friends":
            window.postMessage({
                type: "UPD",
                text: e
            }, "*")
    }
}
var lang, emoji, injectStart = document.createElement("script");
injectStart.type = "text/javascript", injectStart.src = isWebExt ? browser.runtime.getURL("../js/injectStart.js") : options.inject;
var injectOptions = document.createElement("script");
injectOptions.type = "text/javascript";
var getOptions = new Promise(function (e) {
        isWebExt ? browser.storage.local.get(function (t) {
            Object.assign(options, t), e()
        }) : self.port.on("options", function (t) {
            Object.assign(options, t), e()
        })
    }),
    getHead = new Promise(function (e) {
        KPP.head(function () {
            e()
        })
    });
Promise.all([getOptions, getHead]).then(function () {
    options.enabled && init()
}), window.addEventListener("message", function (e) {
    switch (e.data.type) {
        case "VK_INFO":
            lang = e.data.text.lang, langMap.hasOwnProperty(lang) || (lang = 3), document.documentElement.setAttribute("lang", langMap[lang]), LocalizedContent.init();
            break;
        case "VK_EMOJI":
            emoji = e.data.text;
            break;
        case "PUSH_URL":
            checkCSS(styles, e.data.text), initWide();
            break;
        case "RELOAD_VK_TOP":
            LocalizedContent.init();
            break;
        case "SAVE_OPTION":
            isWebExt ? browser.storage.local.set(e.data.opt) : self.port.emit("local", e.data.opt)
    }
});
var LocalizedContent = {
    l_ntf: document.createElement("li"),
    l_edit: document.createElement("a"),
    l_set: document.createElement("li"),
    init: function () {
        this.l_ntf.id = "l_ntf", this.l_ntf.innerHTML = '<a href="/feed?section=notifications" class="left_row" onclick="return nav.go(this, event, {noback: true, params: {_ref: \'left_nav\'}});" onmouseover="TopNotifier.preload();"><span class="left_fixer"><span class="left_count_wrap fl_r" id="oldvk-notify-wrap" onmouseover="TopNotifier.preload()" onclick="TopNotifier.show(event);TopNotifier.setCount(\'\',true)"><span class="inl_bl left_count" id="oldvk-notify"></span></span><span class="left_label inl_bl">' + i18n.answers[lang] + "</span></span></a>", this.l_edit.id = "l_edit", this.l_edit.classList.add("fl_r"), this.l_edit.href = "/edit", this.l_edit.textContent = i18n.edit[lang], this.l_set.id = "l_sett", this.l_set.innerHTML = '<a href="/settings" class="left_row"><span class="left_fixer"><span class="left_label inl_bl" id="oldvk-settings">' + i18n.settings[lang] + "</span></span></a>", KPP.add("#side_bar_inner ol", function () {
            KPP.remove("#side_bar_inner ol"), LocalizedContent.updateMenu()
        });
        var e = '<div class="head_nav_item fl_r"><a id="oldvk_top_exit" class="top_nav_link" href="" onclick="if (checkEvent(event) === false) { window.Notifier && Notifier.lcSend(\'logged_off\'); location.href = this.href; return cancelEvent(event); }" onmousedown="tnActive(this)"><div class="top_profile_name"></div></a></div><div class="head_nav_item fl_r"><a id="oldvk_top_help" class="top_nav_link" href="/support?act=home" onclick="return TopMenu.select(this, event);"><div class="top_profile_name"></div></a></div><div class="head_nav_item fl_r"><a id="oldvk_top_music" class="top_nav_link" href="" onclick="return (checkKeyboardEvent(event) ? AudioUtils.getLayer().toggle() : false);" onmouseover="AudioLayer.prepare()" onmousedown="return (checkKeyboardEvent(event) ? false : AudioUtils.getLayer().toggle(),cancelEvent(event))"><div class="top_profile_name">' + i18n.music[lang] + '</div><div id="oldvk_top_play" class="oldvk-hide" onclick="cancelEvent(event); if (getAudioPlayer().isPlaying()) {getAudioPlayer().pause(); removeClass(this,\'active\')} else {getAudioPlayer().play(); addClass(this,\'active\')}" onmousedown="cancelEvent(event);"></div></a><span id="oldvk_talp"></span></div><div class="head_nav_item fl_r"><a id="oldvk_top_apps" class="top_nav_link" href="/apps" onclick="return TopMenu.select(this, event);"><div class="top_profile_name">' + i18n.games[lang] + '</div></a></div><div class="head_nav_item fl_r"><a id="oldvk_top_communities" class="top_nav_link" href="/search?c[section]=communities" onclick="return TopMenu.select(this, event);"><div class="top_profile_name">' + i18n.communities[lang] + '</div></a></div><div class="head_nav_item fl_r"><a id="oldvk_top_peoples" class="top_nav_link" href="/search?c[section]=people" onclick="return TopMenu.select(this, event);"><div class="top_profile_name">' + i18n.people[lang] + "</div></a></div>",
            t = document.createElement("div");
        t.id = "oldvk_top_menu", t.innerHTML = e, KPP.add("#top_nav", function (e) {
            KPP.remove("#top_nav"), document.getElementById("oldvk_top_menu") || e.appendChild(t);
            var n = document.getElementById("oldvk_top_exit"),
                a = document.getElementById("top_logout_link"),
                i = document.getElementById("oldvk_top_help"),
                o = document.getElementById("top_support_link");
            n && a && (n.firstElementChild.textContent = a.textContent.toLowerCase(), n.href = a.href), i && o && (i.firstElementChild.textContent = o.textContent.toLowerCase()), document.getElementById("oldvk_talp") && (document.getElementById("top_audio_layer_place").remove(), document.getElementById("oldvk_talp").id = "top_audio_layer_place")
        })
    },
    updateMenu: function () {
        if (document.getElementById("l_ntf") || insertAfter(document.getElementById("l_nwsf"), this.l_ntf), !document.getElementById("l_edit")) {
            var e = document.getElementById("l_pr").getElementsByClassName("left_fixer")[0];
            e.insertBefore(this.l_edit, e.firstChild)
        }
        document.getElementById("l_sett") || (document.getElementById("l_fav") ? insertAfter(document.getElementById("l_fav"), this.l_set) : insertAfter(document.getElementById("l_ntf"), this.l_set)), document.querySelector("#l_ap .left_label").textContent = i18n.apps[lang], document.querySelector("#l_aud .left_label").textContent = i18n.audios[lang], document.querySelector("#l_vid .left_label").textContent = i18n.videos[lang], LocalizedContent.updateNotify()
    },
    updateNotify: function () {
        var e = parseInt(document.getElementById("top_notify_count").textContent, 10);
        e > 0 && (document.getElementById("oldvk-notify-wrap").classList.add("has_notify"), document.getElementById("oldvk-notify").textContent = e.toString())
    },
    l10n: function (e, t) {
        "undefined" != typeof lang ? t(i18n[e][lang]) : setTimeout(function () {
            LocalizedContent.l10n(e, t)
        }, 0)
    }
};