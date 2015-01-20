jQuery(document).ready(function($) {

    //导航栏操作
    $('.ice-main-nav').on('click', function(event) {
        if ($(event.target).is('.ice-main-nav')) $(this).children('ul').toggleClass('is-visible');
    });

    //关闭按钮
    $('.ice-close').click(function() {
        this.parentNode.style.display = 'none';
    });
    //手风琴
  $(".ice-nav-accordion li").click(function(){
  $(this).next().toggle('slow');
  });


});


//弹出式画布插件

(function($) {
    $.fn.extend({
        ice_eject: function() {
            var temp = $("<div class='ice-eject'></div>");
            $("body").append(temp);
            return this.each(function() {
                $(this).click(function(e) {
                    var wid = $(this).attr("href");
                    $(".ice-eject").click(function() {
                        close_w(wid)
                    });
                    $(".ice-eject-close").click(function() {
                        close_w(wid)
                    });
                    $(".ice-eject").fadeIn();
                    $(wid).css({
                        "display": "block",
                    });
                    $(wid).fadeTo(200, 1);
                    e.preventDefault()
                })
            });

            function close_w(wid) {
                $(".ice-eject").fadeOut(200);
                $(wid).css({
                    "display": "none"
                })
            }
        }
    })
})(jQuery);

//平滑移动插件
(function($) {
    $.extend($.fn, {
        ice_scroll: function(time, to) {
            time = time || 800;
            to = to || 1;
            $('a[href*=#]', this).click(function() {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var $target = $(this.hash);
                    $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
                    if ($target.length) {
                        if (to == 1) {
                            $('html,body').animate({
                                scrollTop: $target.offset().top
                            }, time);
                        } else if (to == 2) {
                            $('html,body').animate({
                                scrollLeft: $target.offset().left
                            }, time);
                        } else {
                            alert('error！');
                        }
                        return false;
                    }
                }
            });
        }
    });
})(jQuery);


//滚动监控插件
(function() {
    var t = [].indexOf || function(t) {
            for (var e = 0, n = this.length; e < n; e++) {
                if (e in this && this[e] === t) return e
            }
            return -1
        },
        e = [].slice;
    (function(t, e) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function(n) {
                return e(n, t)
            })
        } else {
            return e(t.jQuery, t)
        }
    })(window, function(n, r) {
        var i, o, l, s, f, u, c, a, h, d, p, y, v, w, g, m;
        i = n(r);
        a = t.call(r, "ontouchstart") >= 0;
        s = {
            horizontal: {},
            vertical: {}
        };
        f = 1;
        c = {};
        u = "waypoints-context-id";
        p = "resize.waypoints";
        y = "scroll.waypoints";
        v = 1;
        w = "waypoints-waypoint-ids";
        g = "waypoint";
        m = "waypoints";
        o = function() {
            function t(t) {
                var e = this;
                this.$element = t;
                this.element = t[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + f++;
                this.oldScroll = {
                    x: t.scrollLeft(),
                    y: t.scrollTop()
                };
                this.waypoints = {
                    horizontal: {},
                    vertical: {}
                };
                this.element[u] = this.id;
                c[this.id] = this;
                t.bind(y, function() {
                    var t;
                    if (!(e.didScroll || a)) {
                        e.didScroll = true;
                        t = function() {
                            e.doScroll();
                            return e.didScroll = false
                        };
                        return r.setTimeout(t, n[m].settings.scrollThrottle)
                    }
                });
                t.bind(p, function() {
                    var t;
                    if (!e.didResize) {
                        e.didResize = true;
                        t = function() {
                            n[m]("refresh");
                            return e.didResize = false
                        };
                        return r.setTimeout(t, n[m].settings.resizeThrottle)
                    }
                })
            }
            t.prototype.doScroll = function() {
                var t, e = this;
                t = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
                if (a && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
                    n[m]("refresh")
                }
                n.each(t, function(t, r) {
                    var i, o, l;
                    l = [];
                    o = r.newScroll > r.oldScroll;
                    i = o ? r.forward : r.backward;
                    n.each(e.waypoints[t], function(t, e) {
                        var n, i;
                        if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
                            return l.push(e)
                        } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
                            return l.push(e)
                        }
                    });
                    l.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    if (!o) {
                        l.reverse()
                    }
                    return n.each(l, function(t, e) {
                        if (e.options.continuous || t === l.length - 1) {
                            return e.trigger([i])
                        }
                    })
                });
                return this.oldScroll = {
                    x: t.horizontal.newScroll,
                    y: t.vertical.newScroll
                }
            };
            t.prototype.refresh = function() {
                var t, e, r, i = this;
                r = n.isWindow(this.element);
                e = this.$element.offset();
                this.doScroll();
                t = {
                    horizontal: {
                        contextOffset: r ? 0 : e.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: r ? 0 : e.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                };
                return n.each(t, function(t, e) {
                    return n.each(i.waypoints[t], function(t, r) {
                        var i, o, l, s, f;
                        i = r.options.offset;
                        l = r.offset;
                        o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element)
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil(e.contextDimension * i / 100)
                            }
                        }
                        r.offset = o - e.contextOffset + e.contextScroll - i;
                        if (r.options.onlyOnScroll && l != null || !r.enabled) {
                            return
                        }
                        if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
                            return r.trigger([e.backward])
                        } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
                            return r.trigger([e.forward])
                        } else if (l === null && e.oldScroll >= r.offset) {
                            return r.trigger([e.forward])
                        }
                    })
                })
            };
            t.prototype.checkEmpty = function() {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
                    this.$element.unbind([p, y].join(" "));
                    return delete c[this.id]
                }
            };
            return t
        }();
        l = function() {
            function t(t, e, r) {
                var i, o;
                if (r.offset === "bottom-in-view") {
                    r.offset = function() {
                        var t;
                        t = n[m]("viewportHeight");
                        if (!n.isWindow(e.element)) {
                            t = e.$element.height()
                        }
                        return t - n(this).outerHeight()
                    }
                }
                this.$element = t;
                this.element = t[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = e;
                this.enabled = r.enabled;
                this.id = "waypoints" + v++;
                this.offset = null;
                this.options = r;
                e.waypoints[this.axis][this.id] = this;
                s[this.axis][this.id] = this;
                i = (o = this.element[w]) != null ? o : [];
                i.push(this.id);
                this.element[w] = i
            }
            t.prototype.trigger = function(t) {
                if (!this.enabled) {
                    return
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, t)
                }
                if (this.options.triggerOnce) {
                    return this.destroy()
                }
            };
            t.prototype.disable = function() {
                return this.enabled = false
            };
            t.prototype.enable = function() {
                this.context.refresh();
                return this.enabled = true
            };
            t.prototype.destroy = function() {
                delete s[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty()
            };
            t.getWaypointsByElement = function(t) {
                var e, r;
                r = t[w];
                if (!r) {
                    return []
                }
                e = n.extend({}, s.horizontal, s.vertical);
                return n.map(r, function(t) {
                    return e[t]
                })
            };
            return t
        }();
        d = {
            init: function(t, e) {
                var r;
                e = n.extend({}, n.fn[g].defaults, e);
                if ((r = e.handler) == null) {
                    e.handler = t
                }
                this.each(function() {
                    var t, r, i, s;
                    t = n(this);
                    i = (s = e.context) != null ? s : n.fn[g].defaults.context;
                    if (!n.isWindow(i)) {
                        i = t.closest(i)
                    }
                    i = n(i);
                    r = c[i[0][u]];
                    if (!r) {
                        r = new o(i)
                    }
                    return new l(t, r, e)
                });
                n[m]("refresh");
                return this
            },
            disable: function() {
                return d._invoke.call(this, "disable")
            },
            enable: function() {
                return d._invoke.call(this, "enable")
            },
            destroy: function() {
                return d._invoke.call(this, "destroy")
            },
            prev: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e > 0) {
                        return t.push(n[e - 1])
                    }
                })
            },
            next: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e < n.length - 1) {
                        return t.push(n[e + 1])
                    }
                })
            },
            _traverse: function(t, e, i) {
                var o, l;
                if (t == null) {
                    t = "vertical"
                }
                if (e == null) {
                    e = r
                }
                l = h.aggregate(e);
                o = [];
                this.each(function() {
                    var e;
                    e = n.inArray(this, l[t]);
                    return i(o, e, l[t])
                });
                return this.pushStack(o)
            },
            _invoke: function(t) {
                this.each(function() {
                    var e;
                    e = l.getWaypointsByElement(this);
                    return n.each(e, function(e, n) {
                        n[t]();
                        return true
                    })
                });
                return this
            }
        };
        n.fn[g] = function() {
            var t, r;
            r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (d[r]) {
                return d[r].apply(this, t)
            } else if (n.isFunction(r)) {
                return d.init.apply(this, arguments)
            } else if (n.isPlainObject(r)) {
                return d.init.apply(this, [null, r])
            } else if (!r) {
                return n.error("jQuery Waypoints needs a callback function or handler option.")
            } else {
                return n.error("The " + r + " method does not exist in jQuery Waypoints.")
            }
        };
        n.fn[g].defaults = {
            context: r,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false
        };
        h = {
            refresh: function() {
                return n.each(c, function(t, e) {
                    return e.refresh()
                })
            },
            viewportHeight: function() {
                var t;
                return (t = r.innerHeight) != null ? t : i.height()
            },
            aggregate: function(t) {
                var e, r, i;
                e = s;
                if (t) {
                    e = (i = c[n(t)[0][u]]) != null ? i.waypoints : void 0
                }
                if (!e) {
                    return []
                }
                r = {
                    horizontal: [],
                    vertical: []
                };
                n.each(r, function(t, i) {
                    n.each(e[t], function(t, e) {
                        return i.push(e)
                    });
                    i.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    r[t] = n.map(i, function(t) {
                        return t.element
                    });
                    return r[t] = n.unique(r[t])
                });
                return r
            },
            above: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset <= t.oldScroll.y
                })
            },
            below: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset > t.oldScroll.y
                })
            },
            left: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset <= t.oldScroll.x
                })
            },
            right: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset > t.oldScroll.x
                })
            },
            enable: function() {
                return h._invoke("enable")
            },
            disable: function() {
                return h._invoke("disable")
            },
            destroy: function() {
                return h._invoke("destroy")
            },
            extendFn: function(t, e) {
                return d[t] = e
            },
            _invoke: function(t) {
                var e;
                e = n.extend({}, s.vertical, s.horizontal);
                return n.each(e, function(e, n) {
                    n[t]();
                    return true
                })
            },
            _filter: function(t, e, r) {
                var i, o;
                i = c[n(t)[0][u]];
                if (!i) {
                    return []
                }
                o = [];
                n.each(i.waypoints[e], function(t, e) {
                    if (r(i, e)) {
                        return o.push(e)
                    }
                });
                o.sort(function(t, e) {
                    return t.offset - e.offset
                });
                return n.map(o, function(t) {
                    return t.element
                })
            }
        };
        n[m] = function() {
            var t, n;
            n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (h[n]) {
                return h[n].apply(null, t)
            } else {
                return h.aggregate.call(null, n)
            }
        };
        n[m].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        };
        return i.on("load.waypoints", function() {
            return n[m]("refresh")
        })
    })
}).call(this);






//抽屉式导航

(function ($) {
    $.fn.ice_spmenu = function () {
        $(".ice-sp-left").click(function () {
            var spWidth = $('.ice-menu-sp').width();
            var temp = $("<div class='ice-menu-sp-w'></div>");
            $("body").append(temp);
            temp.click(function () {
                var spWidth = $('.ice-menu-sp').width();
                $(".ice-menu-sp-w").fadeOut();

                $(".ice-menu-sp-left").animate({
                    left: -1 * spWidth
                });
             
            })
            $(".ice-menu-sp-w").fadeIn();
            $(".ice-menu-sp-left").animate({
                left: '0'
            });
        })
        $(".ice-sp-right").click(function () {
            var spWidth = $('.ice-menu-sp').width();
            var temp = $("<div class='ice-menu-sp-w'></div>");
            $("body").append(temp);
            temp.click(function () {
                var spWidth = $('.ice-menu-sp').width();
                $(".ice-menu-sp-w").fadeOut();
                $(".ice-menu-sp-right").animate({
                    right: -1 * spWidth
                })
            })
            $(".ice-menu-sp-w").fadeIn();
            $(".ice-menu-sp-right").animate({
                right: '0'
            });
        })


    }
})(jQuery);



//模板引擎
 ! function() {
    function a(a) {
        return a.replace(t, "").replace(u, ",").replace(v, "").replace(w, "").replace(x, "").split(y)
    }

    function b(a) {
        return "'" + a.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
    }

    function c(c, d) {
        function e(a) {
            return m += a.split(/\n/).length - 1, k && (a = a.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), a && (a = s[1] + b(a) + s[2] + "\n"), a
        }

        function f(b) {
            var c = m;
            if (j ? b = j(b, d) : g && (b = b.replace(/\n/g, function() {
                    return m++, "$line=" + m + ";"
                })), 0 === b.indexOf("=")) {
                var e = l && !/^=[=#]/.test(b);
                if (b = b.replace(/^=[=#]?|[\s;]*$/g, ""), e) {
                    var f = b.replace(/\s*\([^\)]+\)/, "");
                    n[f] || /^(include|print)$/.test(f) || (b = "$escape(" + b + ")")
                } else b = "$string(" + b + ")";
                b = s[1] + b + s[2]
            }
            return g && (b = "$line=" + c + ";" + b), r(a(b), function(a) {
                if (a && !p[a]) {
                    var b;
                    b = "print" === a ? u : "include" === a ? v : n[a] ? "$utils." + a : o[a] ? "$helpers." + a : "$data." + a, w += a + "=" + b + ",", p[a] = !0
                }
            }), b + "\n"
        }
        var g = d.debug,
            h = d.openTag,
            i = d.closeTag,
            j = d.parser,
            k = d.compress,
            l = d.escape,
            m = 1,
            p = {
                $data: 1,
                $filename: 1,
                $utils: 1,
                $helpers: 1,
                $out: 1,
                $line: 1
            },
            q = "".trim,
            s = q ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
            t = q ? "$out+=text;return $out;" : "$out.push(text);",
            u = "function(){var text=''.concat.apply('',arguments);" + t + "}",
            v = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + t + "}",
            w = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (g ? "$line=0," : ""),
            x = s[0],
            y = "return new String(" + s[3] + ");";
        r(c.split(h), function(a) {
            a = a.split(i);
            var b = a[0],
                c = a[1];
            1 === a.length ? x += e(b) : (x += f(b), c && (x += e(c)))
        });
        var z = w + x + y;
        g && (z = "try{" + z + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + b(c) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
        try {
            var A = new Function("$data", "$filename", z);
            return A.prototype = n, A
        } catch (B) {
            throw B.temp = "function anonymous($data,$filename) {" + z + "}", B
        }
    }
    var d = function(a, b) {
        return "string" == typeof b ? q(b, {
            filename: a
        }) : g(a, b)
    };
    d.version = "3.0.0", d.config = function(a, b) {
        e[a] = b
    };
    var e = d.defaults = {
            openTag: "<%",
            closeTag: "%>",
            escape: !0,
            cache: !0,
            compress: !1,
            parser: null
        },
        f = d.cache = {};
    d.render = function(a, b) {
        return q(a, b)
    };
    var g = d.renderFile = function(a, b) {
        var c = d.get(a) || p({
            filename: a,
            name: "Render Error",
            message: "Template not found"
        });
        return b ? c(b) : c
    };
    d.get = function(a) {
        var b;
        if (f[a]) b = f[a];
        else if ("object" == typeof document) {
            var c = document.getElementById(a);
            if (c) {
                var d = (c.value || c.innerHTML).replace(/^\s*|\s*$/g, "");
                b = q(d, {
                    filename: a
                })
            }
        }
        return b
    };
    var h = function(a, b) {
            return "string" != typeof a && (b = typeof a, "number" === b ? a += "" : a = "function" === b ? h(a.call(a)) : ""), a
        },
        i = {
            "<": "&#60;",
            ">": "&#62;",
            '"': "&#34;",
            "'": "&#39;",
            "&": "&#38;"
        },
        j = function(a) {
            return i[a]
        },
        k = function(a) {
            return h(a).replace(/&(?![\w#]+;)|[<>"']/g, j)
        },
        l = Array.isArray || function(a) {
            return "[object Array]" === {}.toString.call(a)
        },
        m = function(a, b) {
            var c, d;
            if (l(a))
                for (c = 0, d = a.length; d > c; c++) b.call(a, a[c], c, a);
            else
                for (c in a) b.call(a, a[c], c)
        },
        n = d.utils = {
            $helpers: {},
            $include: g,
            $string: h,
            $escape: k,
            $each: m
        };
    d.helper = function(a, b) {
        o[a] = b
    };
    var o = d.helpers = n.$helpers;
    d.onerror = function(a) {
        var b = "Template Error\n\n";
        for (var c in a) b += "<" + c + ">\n" + a[c] + "\n\n";
        "object" == typeof console && console.error(b)
    };
    var p = function(a) {
            return d.onerror(a),
                function() {
                    return "{Template Error}"
                }
        },
        q = d.compile = function(a, b) {
            function d(c) {
                try {
                    return new i(c, h) + ""
                } catch (d) {
                    return b.debug ? p(d)() : (b.debug = !0, q(a, b)(c))
                }
            }
            b = b || {};
            for (var g in e) void 0 === b[g] && (b[g] = e[g]);
            var h = b.filename;
            try {
                var i = c(a, b)
            } catch (j) {
                return j.filename = h || "anonymous", j.name = "Syntax Error", p(j)
            }
            return d.prototype = i.prototype, d.toString = function() {
                return i.toString()
            }, h && b.cache && (f[h] = d), d
        },
        r = n.$each,
        s = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
        t = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
        u = /[^\w$]+/g,
        v = new RegExp(["\\b" + s.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
        w = /^\d[^,]*|,\d[^,]*/g,
        x = /^,+|,+$/g,
        y = /^$|,+/;
    e.openTag = "{{", e.closeTag = "}}";
    var z = function(a, b) {
        var c = b.split(":"),
            d = c.shift(),
            e = c.join(":") || "";
        return e && (e = ", " + e), "$helpers." + d + "(" + a + e + ")"
    };
    e.parser = function(a) {
        a = a.replace(/^\s/, "");
        var b = a.split(" "),
            c = b.shift(),
            e = b.join(" ");
        switch (c) {
            case "if":
                a = "if(" + e + "){";
                break;
            case "else":
                b = "if" === b.shift() ? " if(" + b.join(" ") + ")" : "", a = "}else" + b + "{";
                break;
            case "/if":
                a = "}";
                break;
            case "each":
                var f = b[0] || "$data",
                    g = b[1] || "as",
                    h = b[2] || "$value",
                    i = b[3] || "$index",
                    j = h + "," + i;
                "as" !== g && (f = "[]"), a = "$each(" + f + ",function(" + j + "){";
                break;
            case "/each":
                a = "});";
                break;
            case "echo":
                a = "print(" + e + ");";
                break;
            case "print":
            case "include":
                a = c + "(" + b.join(",") + ");";
                break;
            default:
                if (/^\s*\|\s*[\w\$]/.test(e)) {
                    var k = !0;
                    0 === a.indexOf("#") && (a = a.substr(1), k = !1);
                    for (var l = 0, m = a.split("|"), n = m.length, o = m[l++]; n > l; l++) o = z(o, m[l]);
                    a = (k ? "=" : "=#") + o
                } else a = d.helpers[c] ? "=#" + c + "(" + b.join(",") + ");" : "=" + a
        }
        return a
    }, "function" == typeof define ? define(function() {
        return d
    }) : "undefined" != typeof exports ? module.exports = d : this.ice_tmpl = d
}();


//云服务SDK
function ice_cloud() {

    var ice = this;

    //云中心地址
    this.url = "http://cloud.besdlab.cn/";
    this.link = "";
    //初始化变量
    this.username = "null";
    this.password = "null";
    this.email = "null";
    this.num = 0;
    this.value1 = "null";
    this.value2 = "null";
    this.value3 = "null";
    this.value4 = "null";
    this.id = 0;

    //初始化用于存储结果的变量
    this.result = "null";


    //请将开发者ID填写在这
    this.devid = "null";


    //设置开发者ID
    this.setDevid = function(d) {
        ice.devid = d;
    };

    //调用api接口登录
    this.login = function(u, p) {
        ice.link = ice.url + "api/login";
        ice.username = u;
        ice.password = p;
        return ice.cloud_ajax();
    };

    //调用api接口注册
    this.register = function(u, p, e) {
        ice.link = ice.url + "api/register";
        ice.username = u;
        ice.password = p;
        ice.email = e;
        return ice.cloud_ajax();
    };

    //调用api接口退出登录
    this.logout = function() {
        ice.link = ice.url + "manage/account/logout";
        return ice.cloud_ajax();
    };

    //验证登录，如果已登录返回账户名和开发者ID
    this.loged = function() {
        ice.link = ice.url + "manage/account/loged";
        return ice.cloud_ajax();
    };

    //调用api向数据仓库增加数据
    this.storeAdd = function(v1, v2, v3, v4) {
        ice.link = ice.url + "api/store/add";
        ice.value1 = v1;
        ice.value2 = v2;
        ice.value3 = v3;
        ice.value4 = v4;
        return ice.cloud_ajax();
    };

    //调用api删除数据仓库中指定ID的数据
    this.storeDelete = function(i) {
        ice.link = ice.url + "api/store/delete"
        ice.id = i;
        return ice.cloud_ajax();
    };

    //根据条件查找数据仓库
    this.storeSearch = function(n, v1, v2, v3, v4) {
        ice.link = ice.url + "api/store/search";
        ice.num = n;
        ice.value1 = v1;
        ice.value2 = v2;
        ice.value3 = v3;
        ice.value4 = v4;
        return ice.cloud_ajax();
    };

    //调用api修改数据
    this.storeUp = function(id, v1, v2, v3, v4) {
        ice.link = ice.url + "api/store/up";
        ice.id = id;
        ice.value1 = v1;
        ice.value2 = v2;
        ice.value3 = v3;
        ice.value4 = v4;
        return ice.cloud_ajax();
    };

    //开发者授权
    this.manageLogin = function(u, p) {
        ice.link = ice.url + "manage/login";
        ice.username = u;
        ice.password = p;
        return ice.cloud_ajax();
    };

    //增加public数据
    this.addPublic = function(v1, v2, v3, v4) {
        ice.link = ice.url + "api/store_public/addpublic";
        ice.value1 = v1;
        ice.value2 = v2;
        ice.value3 = v3;
        ice.value4 = v4;
        return ice.cloud_ajax();
    };
    //删除public数据
    this.delPublic = function(i) {
        ice.link = ice.url + "api/store_public/delpublic";
        ice.id = i;
        return ice.cloud_ajax();
    };

    //修改public数据
    this.upPublic = function(id, v1, v2, v3, v4) {
        ice.link = ice.url + "api/store_public/uppublic";
        ice.id = id;
        ice.value1 = v1;
        ice.value2 = v2;
        ice.value3 = v3;
        ice.value4 = v4;
        return ice.cloud_ajax();
    };

    //获取public数据
    this.serPublic = function() {
        ice.link = ice.url + "api/store_public/serpublic";
        return ice.cloud_ajax();
    };

    //获取result
    this.getResult = function() {
        return ice.result;
    };


    //AJAX方法
    this.cloud_ajax = function() {
        $.ajax(ice.link, {

            type: "POST",

            xhrFields: {

                withCredentials: true,
                useDefaultXhrHeader: false

            },
            async: false,
            data: {
                id: ice.id,
                username: ice.username,
                password: ice.password,
                email: ice.email,
                devid: ice.devid,
                num: ice.num,
                value1: ice.value1,
                value2: ice.value2,
                value3: ice.value3,
                value4: ice.value4


            },

            crossDomain: true,

            success: function(data, status, xhr) {
                ice.result = data["result"];

            }

        });

    }




}
