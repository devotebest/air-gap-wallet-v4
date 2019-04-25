!(function(e) {
  var t = {}
  function n(r) {
    if (t[r]) return t[r].exports
    var o = (t[r] = { i: r, l: !1, exports: {} })
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports
  }
  ;(n.m = e),
    (n.c = t),
    (n.d = function(e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r })
    }),
    (n.r = function(e) {
      'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e
      var r = Object.create(null)
      if ((n.r(r), Object.defineProperty(r, 'default', { enumerable: !0, value: e }), 2 & t && 'string' != typeof e))
        for (var o in e)
          n.d(
            r,
            o,
            function(t) {
              return e[t]
            }.bind(null, o)
          )
      return r
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default
            }
          : function() {
              return e
            }
      return n.d(t, 'a', t), t
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (n.p = ''),
    n((n.s = 141))
})({
  141: function(e, t, n) {
    'use strict'
    n.r(t)
    var r = n(9),
      o = function(e, t, n, r) {
        return new (n || (n = Promise))(function(o, c) {
          function u(e) {
            try {
              a(r.next(e))
            } catch (e) {
              c(e)
            }
          }
          function i(e) {
            try {
              a(r.throw(e))
            } catch (e) {
              c(e)
            }
          }
          function a(e) {
            e.done
              ? o(e.value)
              : new n(function(t) {
                  t(e.value)
                }).then(u, i)
          }
          a((r = r.apply(e, t || [])).next())
        })
      },
      c = function(e, t) {
        var n,
          r,
          o,
          c,
          u = {
            label: 0,
            sent: function() {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: []
          }
        return (
          (c = { next: i(0), throw: i(1), return: i(2) }),
          'function' == typeof Symbol &&
            (c[Symbol.iterator] = function() {
              return this
            }),
          c
        )
        function i(c) {
          return function(i) {
            return (function(c) {
              if (n) throw new TypeError('Generator is already executing.')
              for (; u; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & c[0] ? r.return : c[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, c[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (c = [2 & c[0], o.value]), c[0])) {
                    case 0:
                    case 1:
                      o = c
                      break
                    case 4:
                      return u.label++, { value: c[1], done: !1 }
                    case 5:
                      u.label++, (r = c[1]), (c = [0])
                      continue
                    case 7:
                      ;(c = u.ops.pop()), u.trys.pop()
                      continue
                    default:
                      if (!(o = (o = u.trys).length > 0 && o[o.length - 1]) && (6 === c[0] || 2 === c[0])) {
                        u = 0
                        continue
                      }
                      if (3 === c[0] && (!o || (c[1] > o[0] && c[1] < o[3]))) {
                        u.label = c[1]
                        break
                      }
                      if (6 === c[0] && u.label < o[1]) {
                        ;(u.label = o[1]), (o = c)
                        break
                      }
                      if (o && u.label < o[2]) {
                        ;(u.label = o[2]), u.ops.push(c)
                        break
                      }
                      o[2] && u.ops.pop(), u.trys.pop()
                      continue
                  }
                  c = t.call(e, u)
                } catch (e) {
                  ;(c = [6, e]), (r = 0)
                } finally {
                  n = o = 0
                }
              if (5 & c[0]) throw c[1]
              return { value: c[0] ? c[1] : void 0, done: !0 }
            })([c, i])
          }
        }
      }
    !(function() {
      var e = document.createElement('script')
      ;(e.src = chrome.extension.getURL('dist/injection.js')),
        (document.head || document.documentElement).appendChild(e),
        e.setAttribute('nonce', 'Nc3n83cnSAd3wc3Sasdfn939hc3')
    })(),
      window.addEventListener('message', function(e) {
        if (e.source === window)
          if (e.data.type === r.a.INCOMING_TRANSACTION)
            (e.data.type = r.a.OUTGOING_TRANSACTION), chrome.runtime.sendMessage({ data: e.data }, function(e) {})
          else if (e.data.type === r.a.ADDRESSES_REQUEST) {
            var t
            chrome.storage.local.get('selectedAccount', function(e) {
              e && (t = e.selectedAccount)
            }),
              chrome.storage.local.get('wallets', function(n) {
                return o(this, void 0, void 0, function() {
                  return c(this, function(o) {
                    switch (o.label) {
                      case 0:
                        return [4, n.wallets]
                      case 1:
                        return (
                          o.sent().forEach(function(n) {
                            if (n.publicKey === t.publicKey && n.protocolIdentifier === t.protocolIdentifier) {
                              var o = n.addresses[0]
                              e.source.postMessage({ type: r.a.ADDRESSES_RESPONSE, addresses: o }, e.origin)
                            }
                          }),
                          [2]
                        )
                    }
                  })
                })
              })
          }
      }),
      chrome.runtime.onMessage.addListener(function(e, t, n) {
        console.log(e.data)
      })
  },
  9: function(e, t, n) {
    'use strict'
    var r
    n.d(t, 'a', function() {
      return r
    }),
      (function(e) {
        ;(e.INCOMING_TRANSACTION = 'INCOMING_TRANSACTION'),
          (e.OUTGOING_TRANSACTION = 'OUTGOING_TRANSACTION'),
          (e.ADDRESSES_RESPONSE = 'ADDRESSES_RESPONSE'),
          (e.ADDRESSES_REQUEST = 'ADDRESSES_REQUEST')
      })(r || (r = {}))
  }
})
