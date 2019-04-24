import { SettingsKey, StorageProvider } from '../../services/storage/storage'
import { ModalController } from '@ionic/angular'
import { Component } from '@angular/core'

@Component({
  selector: 'page-disclaimer-web-extension',
  templateUrl: 'disclaimer-web-extension.html',
  styleUrls: ['./disclaimer-web-extension.scss']
})
export class DisclaimerWebExtensionPage {
  constructor(private viewController: ModalController, private storageProvider: StorageProvider) {}

  async accept() {
    await this.storageProvider.set(SettingsKey.WEB_EXTENSION_DISCLAIMER, true)
    this.viewController.dismiss()
  }
}
