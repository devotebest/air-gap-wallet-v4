import { Injectable } from '@angular/core'
import { Platform, ToastController } from '@ionic/angular'
import { handleErrorSentry, ErrorCategory } from '../sentry-error-handler/sentry-error-handler'
import { Clipboard } from '@ionic-native/clipboard/ngx'

@Injectable({
  providedIn: 'root'
})
export class ClipboardProvider {
  constructor(
    private readonly platform: Platform,
    private readonly clipboard: Clipboard,
    private readonly toastController: ToastController
  ) {}

  async copy(text: string): Promise<void> {
    if (this.platform.is('cordova')) {
      return this.clipboard.copy(text)
    } else {
      return (navigator as any).clipboard.writeText(text)
    }
  }

  async copyAndShowToast(text: string, toastMessage: string = 'Successfully copied to your clipboard!') {
    try {
      await this.copy(text)
      await this.showToast(toastMessage)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  async paste(): Promise<string> {
    try {
      if (this.platform.is('cordova')) {
        return this.clipboard.paste()
      } else {
        return (navigator as any).clipboard.readText()
      }
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  private async showToast(message: string) {
    this.toastController
      .create({
        message: message,
        duration: 1000,
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'Ok'
      })
      .then(toast => {
        toast.present().catch(handleErrorSentry(ErrorCategory.IONIC_TOAST))
      })
  }
}
