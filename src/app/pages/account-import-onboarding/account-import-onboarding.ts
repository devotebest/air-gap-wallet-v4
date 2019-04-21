import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, Platform, IonSlides } from "@ionic/angular";
import { getProtocolByIdentifier, ICoinProtocol } from "airgap-coin-lib";
import { DeepLinkProvider } from "../../services/deep-link/deep-link";

const DEEPLINK_VAULT_ADD_ACCOUNT = `airgap-vault://add-account/`;

@Component({
  selector: "page-account-import-onboarding",
  templateUrl: "account-import-onboarding.html"
})
export class AccountImportOnboardingPage {
  @ViewChild(IonSlides)
  slides: IonSlides;
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    pagination: {
      type: "progressbar"
    }
  };
  public protocol: ICoinProtocol;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private deeplinkProvider: DeepLinkProvider
  ) {
    this.protocol = getProtocolByIdentifier(
      this.navParams.get("protocolIdentifier")
    );
  }

  openVault() {
    this.deeplinkProvider.sameDeviceDeeplink(
      `${DEEPLINK_VAULT_ADD_ACCOUNT}${this.protocol}`
    );
  }
}
