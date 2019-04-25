!(function(e) {
  var n = {}
  function t(r) {
    if (n[r]) return n[r].exports
    var o = (n[r] = { i: r, l: !1, exports: {} })
    return e[r].call(o.exports, o, o.exports, t), (o.l = !0), o.exports
  }
  ;(t.m = e),
    (t.c = n),
    (t.d = function(e, n, r) {
      t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: r })
    }),
    (t.r = function(e) {
      'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (t.t = function(e, n) {
      if ((1 & n && (e = t(e)), 8 & n)) return e
      if (4 & n && 'object' == typeof e && e && e.__esModule) return e
      var r = Object.create(null)
      if ((t.r(r), Object.defineProperty(r, 'default', { enumerable: !0, value: e }), 2 & n && 'string' != typeof e))
        for (var o in e)
          t.d(
            r,
            o,
            function(n) {
              return e[n]
            }.bind(null, o)
          )
      return r
    }),
    (t.n = function(e) {
      var n =
        e && e.__esModule
          ? function() {
              return e.default
            }
          : function() {
              return e
            }
      return t.d(n, 'a', n), n
    }),
    (t.o = function(e, n) {
      return Object.prototype.hasOwnProperty.call(e, n)
    }),
    (t.p = ''),
    t((t.s = 388))
})({
  388: function(e, n, t) {
    'use strict'
    t.r(n)
    var r = t(9),
      o = function(e, n, t, r) {
        return new (t || (t = Promise))(function(o, i) {
          function c(e) {
            try {
              a(r.next(e))
            } catch (e) {
              i(e)
            }
          }
          function u(e) {
            try {
              a(r.throw(e))
            } catch (e) {
              i(e)
            }
          }
          function a(e) {
            e.done
              ? o(e.value)
              : new t(function(n) {
                  n(e.value)
                }).then(c, u)
          }
          a((r = r.apply(e, n || [])).next())
        })
      },
      i = function(e, n) {
        var t,
          r,
          o,
          i,
          c = {
            label: 0,
            sent: function() {
              if (1 & o[0]) throw o[1]
              return o[1]
            },
            trys: [],
            ops: []
          }
        return (
          (i = { next: u(0), throw: u(1), return: u(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function() {
              return this
            }),
          i
        )
        function u(i) {
          return function(u) {
            return (function(i) {
              if (t) throw new TypeError('Generator is already executing.')
              for (; c; )
                try {
                  if (
                    ((t = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i
                      break
                    case 4:
                      return c.label++, { value: i[1], done: !1 }
                    case 5:
                      c.label++, (r = i[1]), (i = [0])
                      continue
                    case 7:
                      ;(i = c.ops.pop()), c.trys.pop()
                      continue
                    default:
                      if (!(o = (o = c.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        c = 0
                        continue
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        c.label = i[1]
                        break
                      }
                      if (6 === i[0] && c.label < o[1]) {
                        ;(c.label = o[1]), (o = i)
                        break
                      }
                      if (o && c.label < o[2]) {
                        ;(c.label = o[2]), c.ops.push(i)
                        break
                      }
                      o[2] && c.ops.pop(), c.trys.pop()
                      continue
                  }
                  i = n.call(e, c)
                } catch (e) {
                  ;(i = [6, e]), (r = 0)
                } finally {
                  t = o = 0
                }
              if (5 & i[0]) throw i[1]
              return { value: i[0] ? i[1] : void 0, done: !0 }
            })([i, u])
          }
        }
      }
    chrome.runtime.onMessage.addListener(function(e) {
      return o(this, void 0, void 0, function() {
        var n
        return i(this, function(t) {
          return e.data.type === r.a.OUTGOING_TRANSACTION
            ? (((n = e.data.signTransaction).chainId = n.chainId || 1),
              (n.gasLimit = n.gas || '0x' + (21e3).toString(16)),
              chrome.storage.local.get('selectedAccount', function(e) {
                return o(this, void 0, void 0, function() {
                  var t, r, o
                  return i(this, function(i) {
                    return (
                      (t = e.selectedAccount),
                      (r = t.coinProtocol.identifier),
                      (o = t.publicKey),
                      console.log('publicKey: ', t.ad),
                      console.log('JSON.stringify(rawUnsignedTx): ', JSON.stringify(n)),
                      chrome.windows.create({
                        url: 'index.html?identifier=' + r + '&publicKey=' + o + '&rawUnsignedTx=' + JSON.stringify(n),
                        type: 'popup',
                        width: 600,
                        height: 900
                      }),
                      [2, !0]
                    )
                  })
                })
              }),
              [2, !0])
            : [2]
        })
      })
    }),
      chrome.storage.onChanged.addListener(function(e, n) {
        console.log('changes: ', e), chrome.storage.sync.get({ profileId: 0 }, function(e) {})
      }),
      navigator.mediaDevices
        .getUserMedia({ video: !0 })
        .then(function() {
          console.log('ok')
        })
        .catch(function(e) {
          console.error(e),
            chrome.windows.create({ url: chrome.extension.getURL('html/request_camera.html') }, function(e) {
              console.log('TAB:'), console.log(e)
            })
        })
  },
  9: function(e, n, t) {
    'use strict'
    var r
    t.d(n, 'a', function() {
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
