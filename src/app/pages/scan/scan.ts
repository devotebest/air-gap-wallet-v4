import { Component, ViewChild } from '@angular/core'
import { Platform, NavController } from 'ionic-angular'

import { ScannerProvider } from '../../services/scanner/scanner'
import { ZXingScannerComponent } from '@zxing/ngx-scanner'
import { SchemeRoutingProvider } from '../../services/scheme-routing/scheme-routing'
import { PermissionsProvider } from '../../services/permissions/permissions'
import { ScanBasePage } from '../scan-base/scan-base'
import { ErrorCategory, handleErrorSentry } from '../../services/sentry-error-handler/sentry-error-handler'

@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage extends ScanBasePage {
  @ViewChild('scanner')
  zxingScanner: ZXingScannerComponent

  constructor(
    protected platform: Platform,
    protected scanner: ScannerProvider,
    protected permissionsProvider: PermissionsProvider,
    private schemeRouting: SchemeRoutingProvider,
    private navCtrl: NavController
  ) {
    super(platform, scanner, permissionsProvider)
    this.isBrowser = !this.platform.is('cordova')
  }

  checkScan(resultString: string) {
    console.log('got new text', resultString)

    this.schemeRouting.handleNewSyncRequest(this.navCtrl, resultString).catch(handleErrorSentry(ErrorCategory.SCHEME_ROUTING))
  }
}
