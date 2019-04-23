//import { TransactionQrPage } from "../transaction-qr/transaction-qr";
import { AirGapMarketWallet, IAirGapTransaction } from 'airgap-coin-lib'
import { Component } from '@angular/core'
import { NavController } from '@ionic/angular'
import { Router, ActivatedRoute } from '@angular/router'

import { handleErrorSentry, ErrorCategory } from '../../services/sentry-error-handler/sentry-error-handler'
import { DeepLinkProvider } from '../../services/deep-link/deep-link'
import { DataService } from '../../services/data/data.service'

@Component({
  selector: 'page-interaction-selection',
  templateUrl: 'interaction-selection.html',
  styleUrls: ['./interaction-selection.scss']
})
export class InteractionSelectionPage {
  public preparedDataQR: string = ''
  private wallet: AirGapMarketWallet
  private airGapTx: IAirGapTransaction

  constructor(
    public navController: NavController,
    private router: Router,
    private route: ActivatedRoute,
    private deepLinkProvider: DeepLinkProvider,
    private dataService: DataService
  ) {
    if (this.route.snapshot.data['special']) {
      const info = this.route.snapshot.data['special']
      console.log(info)
      this.wallet = info.wallet
      this.airGapTx = info.airGapTx
      this.preparedDataQR = info.data
    }
  }

  async ionViewDidEnter() {}

  offlineDeviceSign() {
    const info = {
      wallet: this.wallet,
      airGapTx: this.airGapTx,
      data: this.preparedDataQR
    }
    this.dataService.setData(1, info)
    this.router.navigateByUrl('/transaction-qr/1').catch(handleErrorSentry(ErrorCategory.NAVIGATION))
  }

  sameDeviceSign() {
    this.deepLinkProvider
      .sameDeviceDeeplink(this.preparedDataQR)
      .then(() => {
        this.router.navigateByUrl('/tabs/portfolio').catch(handleErrorSentry(ErrorCategory.NAVIGATION))
      })
      .catch(handleErrorSentry(ErrorCategory.DEEPLINK_PROVIDER))
  }
}
