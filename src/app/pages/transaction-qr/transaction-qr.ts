import { Component } from '@angular/core'
import { Platform } from '@ionic/angular'
import { Transaction } from '../../models/transaction.model'
import { AirGapMarketWallet } from 'airgap-coin-lib'
import { handleErrorSentry, ErrorCategory } from '../../services/sentry-error-handler/sentry-error-handler'
import { DeepLinkProvider } from '../../services/deep-link/deep-link'
import { Router, ActivatedRoute } from '@angular/router'

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
    private router: Router,
    private route: ActivatedRoute,
    private platform: Platform,
    private deeplinkProvider: DeepLinkProvider
  ) {
    if (this.route.snapshot.data['special']) {
      const info = this.route.snapshot.data['special']
      this.wallet = info.wallet
      this.airGapTx = info.airGapTx
      this.preparedDataQR = info.data
      this.qrDataTooBig = this.preparedDataQR.length > 2800
    }
    this.isBrowser = !this.platform.is('cordova')
  }

  done() {
    this.router.navigateByUrl('/tabs/portfolio').catch(handleErrorSentry(ErrorCategory.NAVIGATION))
  }

  sameDeviceSign() {
    this.deeplinkProvider.sameDeviceDeeplink(this.preparedDataQR)
  }
}
