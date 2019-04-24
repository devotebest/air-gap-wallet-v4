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
var height = 900
var width = 600
chrome.runtime.onMessage.addListener(function(request) {
  return __awaiter(this, void 0, void 0, function() {
    var rawUnsignedTx_1
    return __generator(this, function(_a) {
      if (request.data.type === Transactions.OUTGOING_TRANSACTION) {
        rawUnsignedTx_1 = request.data.signTransaction
        rawUnsignedTx_1.chainId = rawUnsignedTx_1.chainId || 1
        rawUnsignedTx_1.gasLimit = rawUnsignedTx_1.gas || '0x' + (21000).toString(16)
        chrome.storage.local.get('selectedAccount', function(storage) {
          return __awaiter(this, void 0, void 0, function() {
            var ethWallet, identifier, publicKey
            return __generator(this, function(_a) {
              ethWallet = storage.selectedAccount
              identifier = ethWallet.coinProtocol.identifier
              publicKey = ethWallet.publicKey
              console.log('publicKey: ', ethWallet.ad)
              console.log('JSON.stringify(rawUnsignedTx): ', JSON.stringify(rawUnsignedTx_1))
              chrome.windows.create({
                url:
                  'index.html?identifier=' + identifier + '&publicKey=' + publicKey + '&rawUnsignedTx=' + JSON.stringify(rawUnsignedTx_1),
                type: 'popup',
                width: width,
                height: height
              })
              /*
                            chrome.windows.create({
                              url: 'confirmation.html?payload=' + serializedTx,
                              type: 'popup',
                              width,
                              height
                            })
                            */
              return [2 /*return*/, true]
            })
          })
        })
        return [2 /*return*/, true]
      }
      return [2 /*return*/]
    })
  })
})
chrome.storage.onChanged.addListener(function(changes, namespace) {
  console.log('changes: ', changes)
  chrome.storage.sync.get(
    {
      profileId: 0
    },
    function(items) {
      // Update status bar text here
    }
  )
})
// otherwise the app has no camera permission!! Not possible to get camera permission differently.
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function() {
    console.log('ok')
  })
  .catch(function(error) {
    console.error(error)
    createWindow()
  })
function createWindow() {
  chrome.windows.create(
    {
      url: chrome.extension.getURL('html/request_camera.html')
    },
    function(tab) {
      console.log('TAB:')
      console.log(tab)
      // After the tab has been created, open a window to inject the tab
    }
  )
}
