import { Component } from '@angular/core'
import { NavController, NavParams, Platform } from 'ionic-angular'
import { Transaction } from '../../models/transaction.model'
import { AirGapMarketWallet } from 'airgap-coin-lib'
import { handleErrorSentry, ErrorCategory } from '../../services/sentry-error-handler/sentry-error-handler'
import { DeepLinkProvider } from '../../services/deep-link/deep-link'

@Component({
  selector: 'page-transaction-qr',
  templateUrl: 'transaction-qr.html'
})
export class TransactionQrPage {
  public preparedDataQR: string = ''
  public wallet: AirGapMarketWallet = null
  public airGapTx: Transaction = null
  public isBrowser: boolean = false
  public qrDataTooBig: boolean = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private deeplinkProvider: DeepLinkProvider
  ) {
    this.wallet = this.navParams.get('wallet')
    this.airGapTx = this.navParams.get('airGapTx')
    this.preparedDataQR = this.navParams.get('data')
    this.isBrowser = !this.platform.is('cordova')
    this.qrDataTooBig = this.preparedDataQR.length > 2800
  }

  done() {
    this.navCtrl.popToRoot().catch(handleErrorSentry(ErrorCategory.NAVIGATION))
  }

  sameDeviceSign() {
    this.deeplinkProvider.sameDeviceDeeplink(this.preparedDataQR)
  }
}
