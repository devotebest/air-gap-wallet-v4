//import { SelectWalletPage } from "../../pages/select-wallet/select-wallet";
import { AccountProvider } from '../account/account.provider'
import { Injectable } from '@angular/core'
import { AlertController, NavController } from '@ionic/angular'
import { Router, NavigationExtras } from '@angular/router'
import { DataService, DataServiceKey } from '../../services/data/data.service'
import { DeserializedSyncProtocol, SyncProtocolUtils, EncodedType, SyncWalletRequest, AirGapMarketWallet } from 'airgap-coin-lib'
import { AccountImportPage } from '../../pages/account-import/account-import'
//import { TransactionConfirmPage } from "../../pages/transaction-confirm/transaction-confirm";
import { handleErrorSentry, ErrorCategory } from '../sentry-error-handler/sentry-error-handler'

@Injectable({
  providedIn: 'root'
})
export class SchemeRoutingProvider {
  private navController: NavController
  private router: Router
  /* TS 2.7 feature
  private syncSchemeHandlers: {
    [key in EncodedType]: (deserializedSync: DeserializedSyncProtocol, scanAgainCallback: Function) => Promise<boolean>
  }
  */
  private syncSchemeHandlers: ((deserializedSync: DeserializedSyncProtocol, scanAgainCallback: Function) => Promise<boolean>)[] = []

  constructor(private alertController: AlertController, private accountProvider: AccountProvider, private dataService: DataService) {
    /* TS 2.7 feature
    this.syncSchemeHandlers = {
      [EncodedType.WALLET_SYNC]: this.handleWalletSync.bind(this),
      [EncodedType.UNSIGNED_TRANSACTION]: this.syncTypeNotSupportedAlert.bind(this),
      [EncodedType.SIGNED_TRANSACTION]: this.handleSignedTransaction.bind(this)
    }
    */
    this.syncSchemeHandlers[EncodedType.WALLET_SYNC] = this.handleWalletSync.bind(this)
    this.syncSchemeHandlers[EncodedType.UNSIGNED_TRANSACTION] = this.syncTypeNotSupportedAlert.bind(this)
    this.syncSchemeHandlers[EncodedType.SIGNED_TRANSACTION] = this.handleSignedTransaction.bind(this)
  }

  async handleNewSyncRequest(
    router: Router,
    rawString: string,
    scanAgainCallback: Function = () => {
      /* */
    }
  ) {
    this.router = router
    const syncProtocol = new SyncProtocolUtils()

    try {
      let url = new URL(rawString)
      let data = rawString // Fallback to support raw data QRs
      data = url.searchParams.get('d')

      try {
        const deserializedSync = await syncProtocol.deserialize(data)

        if (deserializedSync.type in EncodedType) {
          // Only handle types that we know
          return this.syncSchemeHandlers[deserializedSync.type](deserializedSync, scanAgainCallback)
        } else {
          return this.syncTypeNotSupportedAlert(deserializedSync, scanAgainCallback)
        }
      } catch (error) {
        console.error('Deserialization of sync failed', error)
      }
    } catch (error) {
      console.warn(error)
      const { compatibleWallets, incompatibleWallets } = await this.accountProvider.getCompatibleAndIncompatibleWalletsForAddress(rawString)
      if (compatibleWallets.length > 0) {
        const info = {
          address: rawString,
          compatibleWallets,
          incompatibleWallets
        }
        this.dataService.setData(DataServiceKey.WALLET, info)
        this.router.navigateByUrl('/select-wallet/' + DataServiceKey.WALLET).catch(handleErrorSentry(ErrorCategory.NAVIGATION))
      }
    }
  }

  async handleWalletSync(deserializedSync: DeserializedSyncProtocol, scanAgainCallback: Function) {
    // tslint:disable-next-line:no-unnecessary-type-assertion
    const walletSync = deserializedSync.payload as SyncWalletRequest
    const wallet = new AirGapMarketWallet(
      deserializedSync.protocol,
      walletSync.publicKey,
      walletSync.isExtendedPublicKey,
      walletSync.derivationPath
    )
    if (this.router) {
      this.dataService.setData(DataServiceKey.WALLET, wallet)
      this.router.navigateByUrl('/account-import/' + DataServiceKey.WALLET).catch(handleErrorSentry(ErrorCategory.NAVIGATION))
    }
  }

  async handleSignedTransaction(deserializedSync: DeserializedSyncProtocol, scanAgainCallback: Function) {
    if (this.router) {
      const info = {
        signedTransactionSync: deserializedSync
      }
      this.dataService.setData(DataServiceKey.TRANSACTION, info)
      this.router.navigateByUrl('/transation-confirm/' + DataServiceKey.TRANSACTION).catch(handleErrorSentry(ErrorCategory.NAVIGATION))
    }
  }

  /*
  async handleUnsignedTransaction(
    deserializedSyncProtocol: DeserializedSyncProtocol,
    scanAgainCallback: Function
  ) {
    console.log('unhandled transaction', deserializedSyncProtocol)
    const unsignedTransaction = deserializedSyncProtocol.payload as UnsignedTransaction

    const correctWallet = this.secretsProvider.findWalletByPublicKeyAndProtocolIdentifier(
      unsignedTransaction.publicKey,
      deserializedSyncProtocol.protocol
    )

    console.log('correct wallet', correctWallet)

    if (!correctWallet) {
      const cancelButton = {
        text: 'Okay!',
        role: 'cancel',
        handler: () => {
          scanAgainCallback()
        }
      }
      this.showAlert(
        'No secret found',
        'You do not have any compatible wallet for this public key in AirGap. Please import your secret and create the corresponding wallet to sign this transaction',
        [cancelButton]
      )
    } else {
      const navController = this.getNavController()
      if (navController) {
        navController.push(TransactionDetailPage, {
          transaction: unsignedTransaction,
          wallet: correctWallet
        })
      }
    }
  }
*/
  private async syncTypeNotSupportedAlert(deserializedSyncProtocol: DeserializedSyncProtocol, scanAgainCallback: Function) {
    const cancelButton = {
      text: 'Okay!',
      role: 'cancel',
      handler: () => {
        scanAgainCallback()
      }
    }
    this.showAlert('Sync type not supported', 'Please use another app to scan this QR.', [cancelButton]).catch(
      handleErrorSentry(ErrorCategory.NAVIGATION)
    )
  }

  public async showAlert(title: string, message: string, buttons: any) {
    let alert = this.alertController
      .create({
        header: title,
        message,
        backdropDismiss: false,
        buttons
      })
      .then(alert => {
        alert.present().catch(handleErrorSentry(ErrorCategory.NAVIGATION))
      })
  }
}
