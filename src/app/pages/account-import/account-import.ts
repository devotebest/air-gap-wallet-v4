import { Component, NgZone } from '@angular/core'
import { Location } from '@angular/common'
import { ModalController, LoadingController, Platform, AlertController } from '@ionic/angular'
import { ActivatedRoute, Router } from '@angular/router'
import { AirGapMarketWallet } from 'airgap-coin-lib'
import { AccountProvider } from '../../services/account/account.provider'
import { handleErrorSentry, ErrorCategory } from '../../services/sentry-error-handler/sentry-error-handler'
import { WebExtensionProvider } from '../../services/web-extension/web-extension'

@Component({
  selector: 'page-account-import',
  templateUrl: 'account-import.html'
})
export class AccountImportPage {
  wallet: AirGapMarketWallet

  walletAlreadyExists = false

  // WebExtension
  walletImportable = true

  loading: HTMLIonLoadingElement

  constructor(
    private platform: Platform,
    private location: Location,
    private loadingCtrl: LoadingController,
    private viewCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private wallets: AccountProvider,
    private webExtensionProvider: WebExtensionProvider,
    private alertCtrl: AlertController,
    private ngZone: NgZone
  ) {
    if (this.route.snapshot.data['special']) {
      this.wallet = this.route.snapshot.data['special']
    }
  }

  ionViewWillEnter() {
    this.platform
      .ready()
      .then(async () => {
        this.loading = await this.loadingCtrl.create({
          message: 'Syncing...'
        })

        this.loading.present().catch(handleErrorSentry(ErrorCategory.NAVIGATION))

        this.walletAlreadyExists = false

        if (this.wallets.walletExists(this.wallet)) {
          this.wallet = this.wallets.walletByPublicKeyAndProtocolAndAddressIndex(
            this.wallet.publicKey,
            this.wallet.protocolIdentifier,
            this.wallet.addressIndex
          )
          this.walletAlreadyExists = true
          this.loading.dismiss().catch(handleErrorSentry(ErrorCategory.NAVIGATION))
          return
        }

        // we currently only support ETH and AE for the chrome extension
        if (this.webExtensionProvider.isWebExtension()) {
          const whitelistedProtocols = ['eth', 'ae']

          this.walletImportable = whitelistedProtocols.some(
            whitelistedProtocol => this.wallet.coinProtocol.identifier === whitelistedProtocol
          )

          if (!this.walletImportable) {
            let alert = this.alertCtrl
              .create({
                header: 'Account Not Supported',
                message: 'We currently only support Ethereum and Aeternity accounts.'
              })
              .then(alert => {
                alert.present()
              })
          }
        }

        const airGapWorker = new Worker('./assets/workers/airgap-coin-lib.js')

        airGapWorker.onmessage = event => {
          this.wallet.addresses = event.data.addresses
          this.wallet
            .synchronize()
            .then(() => {
              this.ngZone.run(() => {
                this.wallets.triggerWalletChanged()
              })
            })
            .catch(handleErrorSentry(ErrorCategory.WALLET_PROVIDER))
          this.loading.dismiss().catch(handleErrorSentry(ErrorCategory.NAVIGATION))
        }

        airGapWorker.postMessage({
          protocolIdentifier: this.wallet.protocolIdentifier,
          publicKey: this.wallet.publicKey,
          isExtendedPublicKey: this.wallet.isExtendedPublicKey,
          derivationPath: this.wallet.derivationPath
        })
      })
      .catch(console.error)
  }

  dismiss() {
    this.location.back()
  }

  async import() {
    await this.wallets.addWallet(this.wallet)
    await this.router.navigateByUrl('/tabs/portfolio')
  }
}
