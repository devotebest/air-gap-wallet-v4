var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value)
            }).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function() {
          return this
        }),
      g
    )
    function verb(n) {
      return function(v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
import { Transactions } from './constants'
function setupInjection() {
  var s = document.createElement('script')
  s.src = chrome.extension.getURL('dist/injection.js')
  ;(document.head || document.documentElement).appendChild(s)
  // otherwise injection rejected
  s.setAttribute('nonce', 'Nc3n83cnSAd3wc3Sasdfn939hc3')
}
setupInjection()
window.addEventListener('message', function(event) {
  // We only accept messages from ourselves
  if (event.source !== window) {
    return
  }
  if (event.data.type === Transactions.INCOMING_TRANSACTION) {
    // we got a transaction and have to prepare it, therefore we resend it to the background.js to create a new window etc. accordingly
    event.data.type = Transactions.OUTGOING_TRANSACTION
    chrome.runtime.sendMessage({ data: event.data }, function(response) {
      /* */
    })
  } else if (event.data.type === Transactions.ADDRESSES_REQUEST) {
    // inpage asks for the address
    var selectedAccount_1
    chrome.storage.local.get('selectedAccount', function(result) {
      if (result) {
        selectedAccount_1 = result.selectedAccount
      }
    })
    chrome.storage.local.get('wallets', function(result) {
      return __awaiter(this, void 0, void 0, function() {
        var wallets
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, result.wallets]
            case 1:
              wallets = _a.sent()
              wallets.forEach(function(wallet) {
                if (
                  wallet.publicKey === selectedAccount_1.publicKey &&
                  wallet.protocolIdentifier === selectedAccount_1.protocolIdentifier
                ) {
                  var responseAddress = wallet.addresses[0]
                  event.source.postMessage({ type: Transactions.ADDRESSES_RESPONSE, addresses: responseAddress }, event.origin)
                }
              })
              return [2 /*return*/]
          }
        })
      })
    })
  }
})
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request.data)
})
