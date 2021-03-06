/**
 * Created by Anla-E on 2017/4/14.
 */
! function (a, b) {
    "use strict";

    function c(b) {
        b = a.extend({}, m, b || {});
        for (var c = a(this), e = 0, f = c.length; f > e; e++) d(c.eq(e), b);
        return c
    }

    function d(b, c) {
        if (!b.hasClass("stepper-input")) {
            c = a.extend({}, c, b.data("stepper-options"));
            var d = parseFloat(b.attr("min")),
                g = parseFloat(b.attr("max")),
                h = parseFloat(b.attr("step")) || 1;
            b.addClass("stepper-input").wrap('<div class="stepper ' + c.customClass + '" />').after('<span class="stepper-arrow up">' + c.labels.up + '</span><span class="stepper-arrow down">' + c.labels.down + "</span>");
            var i = b.parent(".stepper"),
                j = a.extend({
                    $stepper: i,
                    $input: b,
                    $arrow: i.find(".stepper-arrow"),
                    min: void 0 === typeof d || isNaN(d) ? !1 : d,
                    max: void 0 === typeof g || isNaN(g) ? !1 : g,
                    step: void 0 === typeof h || isNaN(h) ? 1 : h,
                    timer: null
                }, c);
            j.digits = k(j.step), b.is(":disabled") && i.addClass("disabled"), i.on("keypress", ".stepper-input", j, e), i.on("touchstart.stepper mousedown.stepper", ".stepper-arrow", j, f).data("stepper", j)
        }
    }

    function e(a) {
        var b = a.data;
        (38 === a.keyCode || 40 === a.keyCode) && (a.preventDefault(), h(b, 38 === a.keyCode ? b.step : -b.step))
    }

    function f(b) {
        b.preventDefault(), b.stopPropagation(), g(b);
        var c = b.data;
        if (!c.$input.is(":disabled") && !c.$stepper.hasClass("disabled")) {
            var d = a(b.target).hasClass("up") ? c.step : -c.step;
            c.timer = i(c.timer, 125, function () {
                h(c, d, !1)
            }), h(c, d), a("body").on("touchend.stepper mouseup.stepper", c, g)
        }
    }

    function g(b) {
        b.preventDefault(), b.stopPropagation();
        var c = b.data;
        j(c.timer), a("body").off(".stepper")
    }

    function h(a, b) {
        var c = parseFloat(a.$input.val()),
            d = b;
        void 0 === typeof c || isNaN(c) ? d = a.min !== !1 ? a.min : 0 : a.min !== !1 && c < a.min ? d = a.min : d += c;
        var e = (d - a.min) % a.step;
        0 !== e && (d -= e), a.min !== !1 && d < a.min && (d = a.min), a.max !== !1 && d > a.max && (d -= a.step), d !== c && (d = l(d, a.digits), a.$input.val(d).trigger("change"))
    }

    function i(a, b, c) {
        return j(a), setInterval(c, b)
    }

    function j(a) {
        a && (clearInterval(a), a = null)
    }

    function k(a) {
        var b = String(a);
        return b.indexOf(".") > -1 ? b.length - b.indexOf(".") - 1 : 0
    }

    function l(a, b) {
        var c = Math.pow(10, b);
        return Math.round(a * c) / c
    }
    var m = {
            customClass: "",
            labels: {
                up: "Up",
                down: "Down"
            }
        },
        n = {
            defaults: function (b) {
                return m = a.extend(m, b || {}), "object" == typeof this ? a(this) : !0
            },
            destroy: function () {
                return a(this).each(function (b) {
                    var c = a(this).data("stepper");
                    c && (c.$stepper.off(".stepper").find(".stepper-arrow").remove(), c.$input.unwrap().removeClass("stepper-input"))
                })
            },
            disable: function () {
                return a(this).each(function (b) {
                    var c = a(this).data("stepper");
                    c && (c.$input.attr("disabled", "disabled"), c.$stepper.addClass("disabled"))
                })
            },
            enable: function () {
                return a(this).each(function (b) {
                    var c = a(this).data("stepper");
                    c && (c.$input.attr("disabled", null), c.$stepper.removeClass("disabled"))
                })
            }
        };
    a.fn.stepper = function (a) {
        return n[a] ? n[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? this : c.apply(this, arguments)
    }, a.stepper = function (a) {
        "defaults" === a && n.defaults.apply(this, Array.prototype.slice.call(arguments, 1))
    }
}(jQuery, this);