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
        deviceName: "xxxxxx",
        app: "~/app-release.apk",
        "app-package": "org.mozilla.magnet",
        "app-activity": "org.mozilla.magnet.MainActivity"
    };

    //var action = new wd.TouchAction(driver);

    function swipe(opts) {
          var action = new wd.TouchAction(this);
          action
            .press({x: opts.startX, y: opts.startY})
            .wait(opts.duration)
            .moveTo({x: opts.endX, y: opts.endY})
            .release();
          return action.perform();
        }

    var browser = wdAndroid.promiseChainRemote("127.0.0.1", 4723);
    before(function() {
        //return browser
        return browser
        .init(desired)
        .setImplicitWaitTimeout(120000);
    });

    it('should work', function(done) {
        wd.addPromiseChainMethod('swipe', swipe);
        return browser.elementByXPath("//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.view.View[1]/android.widget.ScrollView[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.widget.ImageView[1]")
        .swipe({ startX: 75, startY: 500,
          endX: 715,  endY: 500, duration: 800 })
        //add here the nothing string found
        .elementByXPath("//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.view.View[2]/android.widget.TextView[1]")
        .isDisplayed().should.eventually.be.true
        .nodeify(done);
    });

    after(function() {
    //add code here
    browser.quit()
    });

});