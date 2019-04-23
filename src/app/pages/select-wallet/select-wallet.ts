import { ErrorCategory, handleErrorSentry } from '../../services/sentry-error-handler/sentry-error-handler'
import { AirGapMarketWallet } from 'airgap-coin-lib'
import { AccountProvider } from '../../services/account/account.provider'
import { Component } from '@angular/core'
import { NavController, NavParams } from '@ionic/angular'
import { Router } from '@angular/router'

import { TransactionPreparePage } from '../transaction-prepare/transaction-prepare'
import { DataService } from '../../services/data/data.service'

@Component({
  selector: 'page-select-wallet',
  templateUrl: 'select-wallet.html'
})
export class SelectWalletPage {
  public compatibleWallets: AirGapMarketWallet[] = []
  public incompatibleWallets: AirGapMarketWallet[] = []

  private address: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public accountProvider: AccountProvider,
    private dataService: DataService,
    private router: Router
  ) {}

  async ionViewWillLoad() {
    this.address = this.navParams.get('address')
    this.compatibleWallets = this.navParams.get('compatibleWallets')
    this.incompatibleWallets = this.navParams.get('incompatibleWallets')
  }

  openPreparePage(wallet: AirGapMarketWallet) {
    const info = {
      wallet: wallet,
      address: this.address
    }
    this.dataService.setData(1, info)
    this.router.navigateByUrl('/transaction-prepare/1').catch(handleErrorSentry(ErrorCategory.NAVIGATION))
    // this.navCtrl
    //   .push(TransactionPreparePage, {
    //     wallet: wallet,
    //     address: this.address
    //   })
    //   .catch(handleErrorSentry(ErrorCategory.NAVIGATION));
  }
}
