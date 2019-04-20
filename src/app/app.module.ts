import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { SelectWalletPage } from "./pages/select-wallet/select-wallet";
import { Push } from "@ionic-native/push/ngx";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ErrorHandler } from "@angular/core";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Deeplinks } from "@ionic-native/deeplinks/ngx";
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MaterialIconsModule } from "ionic2-material-icons";

import { AppRoutingModule } from "./app-routing.module";

import { ComponentsModule } from "./components/components.module";
import { AboutPage } from "./pages/about/about";
import { AccountTransactionListPage } from "./pages/account-transaction-list/account-transaction-list";
import { IntroductionPage } from "./pages/introduction/introduction";
import { PortfolioPage } from "./pages/portfolio/portfolio";
import { ScanAddressPage } from "./pages/scan-address/scan-address";
import { ScanSyncPage } from "./pages/scan-sync/scan-sync";
import { ScanPage } from "./pages/scan/scan";
import { SettingsPage } from "./pages/settings/settings";
import { TabsPage } from "./pages/tabs/tabs";
import { TransactionConfirmPage } from "./pages/transaction-confirm/transaction-confirm";
import { TransactionDetailPage } from "./pages/transaction-detail/transaction-detail";
import { TransactionPreparePage } from "./pages/transaction-prepare/transaction-prepare";
import { TransactionQrPage } from "./pages/transaction-qr/transaction-qr";
import { AccountAddressPage } from "./pages/account-address/account-address";
import { AccountImportPage } from "./pages/account-import/account-import";
import { IntroductionDownloadPage } from "./pages/introduction-download/introduction-download";
import { PipesModule } from "./pipes/pipes.module";
import { ScannerProvider } from "./services/scanner/scanner";
import { AccountProvider } from "./services/account/account.provider";
import { MomentModule } from "ngx-moment";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { SchemeRoutingProvider } from "./services/scheme-routing/scheme-routing";

import { AppComponent } from "./app.component";
import { ExchangePage } from "./pages/exchange/exchange";

import { IonicStorageModule } from "@ionic/storage";
import { AccountEditPopoverComponent } from "./components/account-edit-popover/account-edit-popover.component";
import { StorageProvider } from "./services/storage/storage";
import { Clipboard } from "@ionic-native/clipboard/ngx";
import { Diagnostic } from "@ionic-native/diagnostic/ngx";
import { SentryErrorHandler } from "./services/sentry-error-handler/sentry-error-handler";
import { ClipboardProvider } from "./services/clipboard/clipboard";
import { PermissionsProvider } from "./services/permissions/permissions";
import { LottieAnimationViewModule } from "ng-lottie";
import { ProtocolsProvider } from "./services/protocols/protocols";
import { AccountAddPage } from "./pages/account-add/account-add";
import { SubAccountAddPage } from "./pages/sub-account-add/sub-account-add";
import { SubAccountImportPage } from "./pages/sub-account-import/sub-account-import";
import { AccountImportOnboardingPage } from "./pages/account-import-onboarding/account-import-onboarding";
import { DeepLinkProvider } from "./services/deep-link/deep-link";
import { InteractionSelectionPage } from "./pages/interaction-selection/interaction-selection";
import { SubAccountSelectPage } from "./pages/sub-account-select/sub-account-select";
import { OperationsProvider } from "./services/operations/operations";
import { ExchangeProvider } from "./services/exchange/exchange";
import { ExchangeConfirmPage } from "./pages/exchange-confirm/exchange-confirm";
import { DelegationBakerDetailPage } from "./pages/delegation-baker-detail/delegation-baker-detail";
import { RemoteConfigProvider } from "./services/remote-config/remote-config";
import { WebExtensionProvider } from "./services/web-extension/web-extension";
import { AppInfoProvider } from "./services/app-info/app-info";
import { DisclaimerWebExtensionPage } from "./pages/disclaimer-web-extension/disclaimer-web-extension";
import { ProtocolSelectPage } from "./pages/protocol-select/protocol-select";
import { IntroductionPushPage } from "./pages/introduction-push/introduction-push";
import { PushProvider } from "./services/push/push";
import { PushBackendProvider } from "./services/push-backend/push-backend";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    AccountTransactionListPage,
    PortfolioPage,
    TransactionPreparePage,
    IntroductionPage,
    SettingsPage,
    ScanPage,
    TabsPage,
    AboutPage,
    AccountAddressPage,
    TransactionConfirmPage,
    TransactionDetailPage,
    TransactionQrPage,
    ScanAddressPage,
    ScanSyncPage,
    AccountImportPage,
    IntroductionDownloadPage,
    AccountAddPage,
    SubAccountAddPage,
    SubAccountImportPage,
    AccountImportOnboardingPage,
    InteractionSelectionPage,
    SubAccountSelectPage,
    ExchangePage,
    ExchangeConfirmPage,
    SelectWalletPage,
    DelegationBakerDetailPage,
    DisclaimerWebExtensionPage,
    ProtocolSelectPage,
    IntroductionPushPage
  ],
  entryComponents: [
    AppComponent,
    AccountTransactionListPage,
    PortfolioPage,
    TransactionPreparePage,
    SettingsPage,
    ScanPage,
    IntroductionPage,
    TabsPage,
    AboutPage,
    AccountAddressPage,
    TransactionConfirmPage,
    TransactionDetailPage,
    TransactionQrPage,
    ScanAddressPage,
    ScanSyncPage,
    AccountImportPage,
    AccountEditPopoverComponent,
    IntroductionDownloadPage,
    AccountAddPage,
    SubAccountAddPage,
    SubAccountImportPage,
    AccountImportOnboardingPage,
    InteractionSelectionPage,
    SubAccountSelectPage,
    ExchangePage,
    ExchangeConfirmPage,
    SelectWalletPage,
    SubAccountSelectPage,
    DelegationBakerDetailPage,
    SubAccountSelectPage,
    DisclaimerWebExtensionPage,
    ProtocolSelectPage,
    IntroductionPushPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    ZXingScannerModule,
    HttpClientModule,
    MaterialIconsModule,
    MomentModule,
    LottieAnimationViewModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: "__airgap_storage",
      driverOrder: ["sqlite", "webExtensionLocalStorage", "localstorage"]
    }),
    ComponentsModule,
    PipesModule,
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Keyboard,
    Deeplinks,
    Clipboard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ScannerProvider,
    AppVersion,
    Diagnostic,
    AccountProvider,
    StorageProvider,
    SchemeRoutingProvider,
    ClipboardProvider,
    PermissionsProvider,
    ProtocolsProvider,
    DeepLinkProvider,
    OperationsProvider,
    ExchangeProvider,
    RemoteConfigProvider,
    WebExtensionProvider,
    AppInfoProvider,
    PushProvider,
    Push,
    PushBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
