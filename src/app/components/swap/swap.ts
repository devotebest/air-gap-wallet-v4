import { Component, Input, Output, EventEmitter } from '@angular/core'
import { ModalController, AlertController } from '@ionic/angular'
import { AccountProvider } from '../../services/account/account.provider'
import { AirGapMarketWallet, ICoinProtocol, getProtocolByIdentifier } from 'airgap-coin-lib'
import { Observable, ReplaySubject } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { trigger, transition, style, animate } from '@angular/animations'
import { BigNumber } from 'bignumber.js'
import { ProtocolSelectPage } from '../../pages/protocol-select/protocol-select'
import { handleErrorSentry, ErrorCategory } from '../../services/sentry-error-handler/sentry-error-handler'

@Component({
  selector: 'swap',
  templateUrl: 'swap.html',
  styleUrls: ['./swap.scss'],
  animations: [
    trigger('expandWalletAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-20%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateY(-20%)', opacity: 0 }))
      ])
    ])
  ]
})
export class SwapComponent {
  public expandWalletSelection: boolean = false

  @Input()
  public readonly swapSell: boolean = true

  @Input()
  public readonly selectedWallet: AirGapMarketWallet

  @Input()
  public readonly supportedWallets: AirGapMarketWallet[]

  @Input()
  public readonly selectedProtocol: ICoinProtocol

  @Input()
  public readonly supportedProtocols: string[] = []

  @Input()
  public readonly minExchangeAmount: BigNumber

  @Input()
  public exchangeAmount: BigNumber

  protected _amount: string

  @Output()
  private readonly protocolSetEmitter: EventEmitter<ICoinProtocol> = new EventEmitter()

  @Output()
  private readonly walletSetEmitter: EventEmitter<AirGapMarketWallet> = new EventEmitter()

  @Output()
  private readonly amountSetEmitter: EventEmitter<string> = new EventEmitter()

  constructor(public alertCtrl: AlertController, public modalController: ModalController, private walletsProvider: AccountProvider) {}

  amountSet(amount: string) {
    this._amount = amount
    this.amountSetEmitter.emit(amount)
  }

  walletSet(wallet: AirGapMarketWallet) {
    this.walletSetEmitter.emit(wallet)
    this.expandWalletSelection = false
  }

  async doRadio() {
    const protocols = []
    this.supportedProtocols.forEach(supportedProtocol => {
      try {
        protocols.push(getProtocolByIdentifier(supportedProtocol))
      } catch (error) {
        /* */
      }
    })

    const modal = await this.modalController.create({
      component: ProtocolSelectPage,
      componentProps: {
        selectedProtocol: this.selectedProtocol.identifier,
        protocols: protocols
      }
    })

    modal.onDidDismiss().then((protocolIdentifier: any) => {
      if (protocolIdentifier && protocolIdentifier.data) {
        this.protocolSetEmitter.emit(getProtocolByIdentifier(protocolIdentifier.data))
      }
    })

    modal.present().catch(handleErrorSentry(ErrorCategory.IONIC_MODAL))
  }
}
