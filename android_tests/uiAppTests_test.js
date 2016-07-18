"use strict";

var wd = require("wd");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe('Appium tests', function() {
    this.timeout(120000);

    var desired = {
        "appium-version": "1.0",
        platformName: "Android",
        platformVersion: "5.1",
        deviceName: "xxxxxxx",
        //path to app
        app: "app-release.apk",
        "app-package": "org.mozilla.magnet",
        "app-activity": "org.mozilla.magnet.MainActivity"
    };

    var browser = wd.promiseChainRemote("127.0.0.1", 4723);

    function swipe(opts) {
          var action = new wd.TouchAction(this);
          action
            .press({x: opts.startX, y: opts.startY})
            .wait(opts.duration)
            .moveTo({x: opts.endX, y: opts.endY})
            .release();
          return action.perform();
        }

    before(function() {
        return browser
            .init(desired)
            .setImplicitWaitTimeout(120000);
    });

    it('should load main view', function(done) {
        return browser
            .elementByXPath("//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.view.View[1]/android.widget.ScrollView[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.widget.ImageView[1]")
            .isDisplayed().should.eventually.be.true
            .nodeify(done)
    });

    it('should find and click the close button', function(done) {
        return browser
            .elementByXPath("//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.view.View[1]/android.widget.ScrollView[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.widget.ImageView[1]").click()
            .elementByXPath("//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.view.View[2]/android.view.View[1]/android.widget.ImageView[1]")
            .isDisplayed().should.eventually.be.true
            .elementByXPath("//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.view.View[2]/android.view.View[1]/android.widget.ImageView[1]")
            .click()
            .nodeify(done)
    });

    it('should swipe a tile', function(done) {
        wd.addPromiseChainMethod('swipe', swipe);
        return browser.elementByXPath("//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.view.View[1]/android.widget.ScrollView[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.widget.ImageView[1]")
        .swipe({ startX: 75, startY: 500,
          endX: 715,  endY: 500, duration: 800 })
        //the nothing string is found
        .elementByXPath("//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.view.View[2]/android.widget.TextView[1]")
        .isDisplayed().should.eventually.be.true
        .nodeify(done);
    });

    after(function() {
    //add code here
    browser.quit()
    });

});
