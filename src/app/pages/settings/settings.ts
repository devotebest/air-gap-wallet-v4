import { Component } from '@angular/core'
import { ModalController, Platform, AlertController } from '@ionic/angular'
import { Router } from '@angular/router'

import { AboutPage } from '../about/about'
import { IntroductionPage } from '../introduction/introduction'
import { TranslateService } from '@ngx-translate/core'
import { handleErrorSentry, ErrorCategory } from '../../services/sentry-error-handler/sentry-error-handler'
import { ClipboardProvider } from '../../services/clipboard/clipboard'
import { SchemeRoutingProvider } from '../../services/scheme-routing/scheme-routing'

declare var window: any
declare var cordova: any

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  constructor(
    private router: Router,
    private modalController: ModalController,
    private translateService: TranslateService,
    public platform: Platform,
    public alertCtrl: AlertController,
    private clipboardProvider: ClipboardProvider,
    private schemeRoutingProvider: SchemeRoutingProvider
  ) {}

  public about() {
    this.router.navigateByUrl('/about').catch(handleErrorSentry(ErrorCategory.NAVIGATION))
  }

  public share() {
    let options = {
      message: 'Take a look at the app I found. Its the most secure practical way to do crypto transactions.',
      // not supported on some apps (Facebook, Instagram)
      subject: 'Checkout airgap.it', // fi. for email
      url: 'https://www.airgap.it',
      chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    }

    let onSuccess = function(result: any) {
      console.log(`Share completed: ${result.completed}`) // On Android apps mostly return false even while it's true
      console.log(`Shared to app: ${result.app}`)
      // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    }

    let onError = function(msg: string) {
      console.log('Sharing failed with message: ' + msg)
    }

    window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError)
  }

  public introduction() {
    this.modalController
      .create({
        component: IntroductionPage
      })
      .then(modal => {
        modal.dismiss(async () => {})
        modal.present().catch(console.error)
      })
      .catch(handleErrorSentry(ErrorCategory.IONIC_MODAL))
  }

  public feedback() {
    this.openUrl('https://github.com/airgap-it/airgap-wallet/issues')
  }

  public telegram() {
    let alert = this.alertCtrl
      .create({
        header: this.translateService.instant('settings.alert_title'),
        inputs: [
          {
            type: 'radio',
            label: this.translateService.instant('settings.channel.international'),
            value: 'International',
            checked: true
          },
          {
            type: 'radio',
            label: this.translateService.instant('settings.channel.chinese'),
            value: 'Chinese'
          }
        ],
        buttons: [
          {
            text: this.translateService.instant('settings.alert_cancel'),
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel')
            }
          },
          {
            text: this.translateService.instant('settings.telegram_label'),
            handler: data => {
              switch (data) {
                case 'International':
                  this.openUrl('https://t.me/AirGap')
                  break
                case 'Chinese':
                  this.openUrl('https://t.me/AirGap_cn')
                  break
              }
            }
          }
        ]
      })
      .then(alert => {
        alert.present().catch(handleErrorSentry(ErrorCategory.IONIC_ALERT))
      })
  }

  public translate() {
    this.openUrl('https://translate.sook.ch/')
  }

  /*
  // Removed because of google policies
  public donate() {
    this.openUrl('https://airgap.it/#donate')
  }
  */

  public githubDistro() {
    this.openUrl('https://github.com/airgap-it/airgap-distro')
  }

  public githubWebSigner() {
    this.openUrl('https://github.com/airgap-it/airgap-web-signer')
  }

  public githubWallet() {
    this.openUrl('https://github.com/airgap-it')
  }

  public faq() {
    this.openUrl('https://airgap.it/#faq')
  }

  private openUrl(url: string) {
    if (this.platform.is('ios') || this.platform.is('android')) {
      cordova.InAppBrowser.open(url, '_system', 'location=true')
    } else {
      window.open(url, '_blank')
    }
  }

  public pasteClipboard() {
    this.clipboardProvider.paste().then(
      (text: string) => {
        this.schemeRoutingProvider.handleNewSyncRequest(this.router, text).catch(handleErrorSentry(ErrorCategory.SCHEME_ROUTING))
      },
      (err: string) => {
        console.error('Error: ' + err)
      }
    )
  }
}
