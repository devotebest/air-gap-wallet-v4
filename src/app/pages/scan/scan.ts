import { Component, ViewChild } from '@angular/core'
import { Platform, NavController } from '@ionic/angular'
import { Router } from '@angular/router'
import { ScannerProvider } from '../../services/scanner/scanner'
import { ZXingScannerComponent } from '@zxing/ngx-scanner'
import { SchemeRoutingProvider } from '../../services/scheme-routing/scheme-routing'
import { PermissionsProvider } from '../../services/permissions/permissions'
import { ScanBasePage } from '../scan-base/scan-base'
import { ErrorCategory, handleErrorSentry } from '../../services/sentry-error-handler/sentry-error-handler'

@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
  styleUrls: ['./scan.scss']
})
export class ScanPage extends ScanBasePage {
  @ViewChild('scanner')
  zxingScanner: ZXingScannerComponent

  constructor(
    protected platform: Platform,
    protected scanner: ScannerProvider,
    protected permissionsProvider: PermissionsProvider,
    private schemeRouting: SchemeRoutingProvider,
    private navCtrl: NavController,
    private router: Router
  ) {
    super(platform, scanner, permissionsProvider)
    this.isBrowser = !this.platform.is('cordova')

    /*let resultString = "airgap-wallet://?d=AerPyFYLtBvLFRMdCRAHG3ifKiz2DiFdabzoVhkaK94KAYkf3umTW5ZXc6WR8oMBbrhkY5WrCeUocSge5q8maicFi6snG2XYoosWzrsbUyQMXQwyNmafgo5m1GRzx1LQCmCPN9Lf9";
    this.schemeRouting
      .handleNewSyncRequest(this.router, resultString)
      .catch(handleErrorSentry(ErrorCategory.SCHEME_ROUTING));*/
  }

  checkScan(resultString: string) {
    console.log('got new text', resultString)

    this.schemeRouting.handleNewSyncRequest(this.router, resultString).catch(handleErrorSentry(ErrorCategory.SCHEME_ROUTING))
  }
}
