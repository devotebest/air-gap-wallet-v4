import { AccountProvider } from './../account/account.provider'
import { Injectable } from '@angular/core'

declare let chrome
declare let window

@Injectable({
  providedIn: 'root'
})
export class WebExtensionProvider {
  constructor(public accountProvider: AccountProvider) {
    this.accountProvider.refreshPageSubject.subscribe(() => {
      if (this.isWebExtension()) {
        this.refreshWindow()
      }
    })
  }

  isWebExtension() {
    if (window.chrome && chrome.runtime && chrome.runtime.id) {
      // Code running in a Chrome extension (content script, background page, etc.)
      return true
    }
  }

  refreshWindow() {
    chrome.tabs.getSelected(null, function(tab) {
      const code = 'window.location.reload()'
      chrome.tabs.executeScript(tab.id, { code: code })
    })
  }
}
