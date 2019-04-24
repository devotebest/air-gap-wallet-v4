import { Component, ViewChild, OnInit } from '@angular/core'
import { NavController, Platform, IonSlides } from '@ionic/angular'
import { ActivatedRoute } from '@angular/router'
import { getProtocolByIdentifier, ICoinProtocol } from 'airgap-coin-lib'
import { DeepLinkProvider } from '../../services/deep-link/deep-link'

const DEEPLINK_VAULT_ADD_ACCOUNT = `airgap-vault://add-account/`

@Component({
  selector: 'page-account-import-onboarding',
  templateUrl: 'account-import-onboarding.html',
  styleUrls: ['./account-import-onboarding.scss']
})
export class AccountImportOnboardingPage implements OnInit {
  @ViewChild(IonSlides)
  slides: IonSlides
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    pagination: {
      type: 'progressbar'
    }
  }
  public protocol: ICoinProtocol
  isBegin: boolean = true
  isEnd: boolean = false

  constructor(
    public navCtrl: NavController,
    private route: ActivatedRoute,
    public platform: Platform,
    private deeplinkProvider: DeepLinkProvider
  ) {}

  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.protocol = getProtocolByIdentifier(this.route.snapshot.data['special'])
      console.log(this.protocol)
    }
  }

  ionSlideDidChange() {
    this.slides.getActiveIndex().then(val => {
      if (val == 0) {
        this.isBegin = true
      } else {
        this.isBegin = false
      }
      if (val == 3) {
        this.isEnd = true
      } else {
        this.isEnd = false
      }
    })
  }

  openVault() {
    this.deeplinkProvider.sameDeviceDeeplink(`${DEEPLINK_VAULT_ADD_ACCOUNT}${this.protocol}`)
  }
}
