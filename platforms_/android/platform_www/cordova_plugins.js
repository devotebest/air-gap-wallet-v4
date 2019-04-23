cordova.define("cordova/plugin_list", function(require, exports, module) {
  module.exports = [
    {
      id: "cordova-plugin-device.device",
      file: "plugins/cordova-plugin-device/www/device.js",
      pluginId: "cordova-plugin-device",
      clobbers: ["device"]
    },
    {
      id: "cordova-plugin-statusbar.statusbar",
      file: "plugins/cordova-plugin-statusbar/www/statusbar.js",
      pluginId: "cordova-plugin-statusbar",
      clobbers: ["window.StatusBar"]
    },
    {
      id: "es6-promise-plugin.Promise",
      file: "plugins/es6-promise-plugin/www/promise.js",
      pluginId: "es6-promise-plugin",
      runs: true
    },
    {
      id: "cordova-plugin-x-socialsharing.SocialSharing",
      file: "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
      pluginId: "cordova-plugin-x-socialsharing",
      clobbers: ["window.plugins.socialsharing"]
    },
    {
      id: "cordova-plugin-inappbrowser.inappbrowser",
      file: "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
      pluginId: "cordova-plugin-inappbrowser",
      clobbers: ["cordova.InAppBrowser.open", "window.open"]
    },
    {
      id: "cordova-plugin-splashscreen.SplashScreen",
      file: "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
      pluginId: "cordova-plugin-splashscreen",
      clobbers: ["navigator.splashscreen"]
    },
    {
      id: "cordova-plugin-ionic-webview.IonicWebView",
      file: "plugins/cordova-plugin-ionic-webview/src/www/util.js",
      pluginId: "cordova-plugin-ionic-webview",
      clobbers: ["Ionic.WebView"]
    },
    {
      id: "cordova-plugin-app-version.AppVersionPlugin",
      file: "plugins/cordova-plugin-app-version/www/AppVersionPlugin.js",
      pluginId: "cordova-plugin-app-version",
      clobbers: ["cordova.getAppVersion"]
    },
    {
      id: "phonegap-plugin-barcodescanner.BarcodeScanner",
      file: "plugins/phonegap-plugin-barcodescanner/www/barcodescanner.js",
      pluginId: "phonegap-plugin-barcodescanner",
      clobbers: ["cordova.plugins.barcodeScanner"]
    },
    {
      id: "cordova-clipboard.Clipboard",
      file: "plugins/cordova-clipboard/www/clipboard.js",
      pluginId: "cordova-clipboard",
      clobbers: ["cordova.plugins.clipboard"]
    },
    {
      id: "ionic-plugin-deeplinks.deeplink",
      file: "plugins/ionic-plugin-deeplinks/www/deeplink.js",
      pluginId: "ionic-plugin-deeplinks",
      clobbers: ["IonicDeeplink"],
      runs: true
    },
    {
      id: "cordova.plugins.diagnostic.Diagnostic",
      file: "plugins/cordova.plugins.diagnostic/www/android/diagnostic.js",
      pluginId: "cordova.plugins.diagnostic",
      merges: ["cordova.plugins.diagnostic"]
    },
    {
      id: "cordova.plugins.diagnostic.Diagnostic_Camera",
      file:
        "plugins/cordova.plugins.diagnostic/www/android/diagnostic.camera.js",
      pluginId: "cordova.plugins.diagnostic",
      merges: ["cordova.plugins.diagnostic.camera"]
    },
    {
      id: "cordova-plugin-ionic-keyboard.keyboard",
      file: "plugins/cordova-plugin-ionic-keyboard/www/android/keyboard.js",
      pluginId: "cordova-plugin-ionic-keyboard",
      clobbers: ["window.Keyboard"]
    },
    {
      id: "phonegap-plugin-push.PushNotification",
      file: "plugins/phonegap-plugin-push/www/push.js",
      pluginId: "phonegap-plugin-push",
      clobbers: ["PushNotification"]
    },
    {
      id: "cordova-plugin-qrscanner.QRScanner",
      file: "plugins/cordova-plugin-qrscanner/www/www.min.js",
      pluginId: "cordova-plugin-qrscanner",
      clobbers: ["QRScanner"]
    },
    {
      id: "cordova-sqlite-storage.SQLitePlugin",
      file: "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
      pluginId: "cordova-sqlite-storage",
      clobbers: ["SQLitePlugin"]
    },
    {
      id: "com.lampa.startapp.startapp",
      file: "plugins/com.lampa.startapp/www/startApp.js",
      pluginId: "com.lampa.startapp",
      merges: ["startApp"]
    }
  ];
  module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-device": "1.1.7",
      "cordova-plugin-statusbar": "2.4.2",
      "cordova-plugin-whitelist": "1.3.3",
      "es6-promise-plugin": "4.2.2",
      "cordova-plugin-x-socialsharing": "5.4.4",
      "cordova-plugin-inappbrowser": "1.7.2",
      "cordova-plugin-add-swift-support": "1.7.2",
      "cordova-plugin-splashscreen": "5.0.2",
      "cordova-plugin-ionic-webview": "2.4.1",
      "cordova-android-support-gradle-release": "1.4.7",
      "cordova-plugin-app-version": "0.1.9",
      "phonegap-plugin-barcodescanner": "8.0.1",
      "cordova-clipboard": "1.2.1",
      "ionic-plugin-deeplinks": "1.0.17",
      "cordova.plugins.diagnostic": "4.0.12",
      "cordova-plugin-ionic-keyboard": "2.1.3",
      "cordova-support-google-services": "1.1.0",
      "phonegap-plugin-multidex": "1.0.0",
      "phonegap-plugin-push": "2.2.3",
      "cordova-plugin-qrscanner": "2.6.2",
      "cordova-sqlite-storage": "2.6.0",
      "com.lampa.startapp": "6.1.6"
    };
  // BOTTOM OF METADATA
});
