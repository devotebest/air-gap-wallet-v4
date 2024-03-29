import { Component } from '@angular/core'
import { LoadingController, NavController, NavParams, ToastController, AlertController, Platform } from 'ionic-angular'

import {
  getProtocolByIdentifier,
  DeserializedSyncProtocol,
  SignedTransaction,
  ICoinProtocol,
  TezosKtProtocol,
  AirGapMarketWallet
} from 'airgap-coin-lib'
import { handleErrorSentry, ErrorCategory } from '../../services/sentry-error-handler/sentry-error-handler'
import { StorageProvider, SettingsKey } from '../../services/storage/storage'
import { AccountProvider } from '../../services/account/account.provider'
import { ProtocolSymbols } from '../../services/protocols/protocols'

declare var cordova: any

const SECOND = 1000
const MINUTE = 60 * SECOND

const TOAST_DURATION = 3 * SECOND
const TOAST_ERROR_DURATION = 5 * SECOND
const INTERVAL_KT_REFRESH = 10 * SECOND
const TIMEOUT_TRANSACTION_QUEUED = 20 * SECOND
const TIMEOUT_KT_REFRESH_CLEAR = 5 * MINUTE

@Component({
  selector: 'page-transaction-confirm',
  templateUrl: 'transaction-confirm.html'
})
export class TransactionConfirmPage {
  signedTransactionSync: DeserializedSyncProtocol
  private signedTx: string
  public protocol: ICoinProtocol

  constructor(
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public navController: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private platform: Platform,
    private storageProvider: StorageProvider,
    private accountProvider: AccountProvider
  ) {}

  dismiss() {
    this.navController.popToRoot().catch(handleErrorSentry(ErrorCategory.NAVIGATION))
  }

  async ionViewWillEnter() {
    await this.platform.ready()
    this.signedTransactionSync = this.navParams.get('signedTransactionSync')
    // tslint:disable-next-line:no-unnecessary-type-assertion
    this.signedTx = (this.signedTransactionSync.payload as SignedTransaction).transaction
    this.protocol = getProtocolByIdentifier(this.signedTransactionSync.protocol)
  }

  broadcastTransaction() {
    let loading = this.loadingCtrl.create({
      content: 'Broadcasting...'
    })

    loading.present().catch(handleErrorSentry(ErrorCategory.NAVIGATION))

    let blockexplorer = '' // TODO: Move to coinlib
    if (this.protocol.identifier.startsWith('btc')) {
      blockexplorer = 'https://live.blockcypher.com/btc/tx/{{txId}}/'
    } else if (this.protocol.identifier.startsWith('eth')) {
      blockexplorer = 'https://etherscan.io/tx/{{txId}}'
    } else if (this.protocol.identifier.startsWith('ae')) {
      blockexplorer = 'https://explorer.aepps.com/#/tx/{{txId}}'
    } else if (this.protocol.identifier.startsWith('xtz')) {
      blockexplorer = 'https://tzscan.io/{{txId}}'
    }

    let interval = setTimeout(() => {
      loading.dismiss().catch(handleErrorSentry(ErrorCategory.NAVIGATION))
      let toast = this.toastCtrl.create({
        duration: TOAST_DURATION,
        message: 'Transaction queued. It might take some time until your TX shows up!',
        showCloseButton: true,
        position: 'bottom'
      })
      toast.present().catch(handleErrorSentry(ErrorCategory.NAVIGATION))
      this.navController.popToRoot().catch(handleErrorSentry(ErrorCategory.NAVIGATION))
    }, TIMEOUT_TRANSACTION_QUEUED)

    this.protocol
      .broadcastTransaction(this.signedTx)
      .then(txId => {
        if (interval) {
          clearInterval(interval)
        }
        // TODO: Remove once tezos allows delegation from tz1 addresses
        if (this.protocol.identifier === ProtocolSymbols.XTZ) {
          // Add KT accounts after broadcasting an xtz address because it might have generated a new KT address
          const ktInterval = setInterval(async () => {
            const ktProtocol = new TezosKtProtocol()
            const xtzWallets = this.accountProvider.getWalletList().filter(wallet => wallet.protocolIdentifier === ProtocolSymbols.XTZ)
            xtzWallets.forEach(async xtzWallet => {
              const ktAccounts = await ktProtocol.getAddressesFromPublicKey(xtzWallet.publicKey)
              ktAccounts.forEach((_ktAccount, index) => {
                const ktWallet = new AirGapMarketWallet(
                  ProtocolSymbols.XTZ_KT,
                  xtzWallet.publicKey,
                  xtzWallet.isExtendedPublicKey,
                  xtzWallet.derivationPath,
                  index
                )
                const exists = this.accountProvider.walletExists(ktWallet)
                if (!exists) {
                  ktWallet.addresses = ktAccounts
                  ktWallet.synchronize().catch(handleErrorSentry(ErrorCategory.COINLIB))
                  this.accountProvider.addWallet(ktWallet).catch(handleErrorSentry(ErrorCategory.WALLET_PROVIDER))
                }
              })
            })
          }, INTERVAL_KT_REFRESH)
          setTimeout(() => {
            clearInterval(ktInterval)
          }, TIMEOUT_KT_REFRESH_CLEAR)
        }

        // TODO: Remove once we introduce pending transaction handling
        // tslint:disable-next-line:no-unnecessary-type-assertion
        const signedTxWrapper = this.signedTransactionSync.payload as SignedTransaction
        const lastTx: {
          protocol: string
          accountIdentifier: string
          date: number
        } = {
          protocol: this.signedTransactionSync.protocol,
          accountIdentifier: signedTxWrapper.accountIdentifier,
          date: new Date().getTime()
        }
        this.storageProvider.set(SettingsKey.LAST_TX_BROADCAST, lastTx).catch(handleErrorSentry(ErrorCategory.STORAGE))

        loading.dismiss().catch(handleErrorSentry(ErrorCategory.NAVIGATION))
        let alert = this.alertCtrl.create({
          title: 'Transaction broadcasted!',
          message: 'Your transaction has been successfully broadcasted',
          buttons: [
            {
              text: 'Open Blockexplorer',
              handler: () => {
                if (blockexplorer) {
                  this.openUrl(blockexplorer.replace('{{txId}}', txId))
                } else {
                  let toast = this.toastCtrl.create({
                    duration: TOAST_DURATION,
                    message: 'Unable to open blockexplorer',
                    showCloseButton: true,
                    position: 'bottom'
                  })
                  toast.present().catch(handleErrorSentry(ErrorCategory.NAVIGATION))
                }
                this.navController.popToRoot().catch(handleErrorSentry(ErrorCategory.NAVIGATION))
              }
            },
            {
              text: 'Ok',
              handler: () => {
                this.navController.popToRoot().catch(handleErrorSentry(ErrorCategory.NAVIGATION))
              }
            }
          ]
        })
        alert.present().catch(handleErrorSentry(ErrorCategory.NAVIGATION))
      })
      .catch(error => {
        if (interval) {
          clearInterval(interval)
        }

        handleErrorSentry(ErrorCategory.COINLIB)(error)

        loading.dismiss().catch(handleErrorSentry(ErrorCategory.NAVIGATION))

        let toast = this.toastCtrl.create({
          duration: TOAST_ERROR_DURATION,
          message: 'Transaction broadcasting failed: ' + error,
          showCloseButton: true,
          position: 'bottom'
        })
        toast.present().catch(handleErrorSentry(ErrorCategory.NAVIGATION))
        this.navController.popToRoot().catch(handleErrorSentry(ErrorCategory.NAVIGATION))
      })
  }

  private openUrl(url: string) {
    if (this.platform.is('ios') || this.platform.is('android')) {
      cordova.InAppBrowser.open(url, '_system', 'location=true')
    } else {
      window.open(url, '_blank')
    }
  }
}
