"use strict";

var wd = require("wd"), 
  WdAndroid = require('wd-android');

var wdAndroid = new WdAndroid(wd);
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe('Appium test', function() {
  this.timeout(120000);

  var desired = {
    "appium-version": "1.0",
    platformName: "Android",
    platformVersion: "5.1",
    deviceName: "xxxxxxxx",
    app: "/PathToApp"
    "app-package": "org.mozilla.magnet",
    "app-activity": "org.mozilla.magnet.MainActivity"
  };

  var browser = wdAndroid.promiseChainRemote("127.0.0.1", 4723);
    
  before(function() {
    return browser
      .init(desired)
      .setImplicitWaitTimeout(120000);
  });

  beforeEach(function(done) {
    // Turn BT off
    return browser.startActivity({appPackage: "com.android.settings", appActivity:"com.android.settings.Settings"}
      , (() => {
        return browser.elementByXPath("//android.view.View[1]/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.widget.ScrollView[1]/android.widget.LinearLayout[1]/android.widget.LinearLayout[1]/android.view.View[1]/android.widget.FrameLayout[2]/android.widget.LinearLayout[1]")
          .click()
          .elementById("com.android.settings:id/switch_text")
          .click()
          .nodeify(done)
        })
      );
    });

  it('should show the bluetooth alert message', function(done) {
    return browser.startActivity({appPackage: "org.mozilla.magnet", appActivity:"org.mozilla.magnet.MainActivity"}, (() => {
      return browser.elementById("android:id/message")
        .isDisplayed().should.eventually.be.true
        .nodeify(done)
      })
    );
  });

  afterEach(function(done) {
    // Turn BT on to leave it as default for other tests
    return browser.startActivity({appPackage: "com.android.settings", appActivity:"com.android.settings.Settings"}
      , (() => {
      return browser.elementByXPath("//android.view.View[1]/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.widget.ScrollView[1]/android.widget.LinearLayout[1]/android.widget.LinearLayout[1]/android.view.View[1]/android.widget.FrameLayout[2]/android.widget.LinearLayout[1]")
        .click()
        .elementById("com.android.settings:id/switch_text")
        .click()
        .nodeify(done)
      })
    );
  });
});