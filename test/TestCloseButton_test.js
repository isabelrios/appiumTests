"use strict";

var wd = require("wd");
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

    var browser = wd.promiseChainRemote("127.0.0.1", 4723);

    before(function() {
        return browser
        .init(desired)
        .setImplicitWaitTimeout(120000);
    });

    it('should find the close button', function(done) {
    return browser
        .elementByXPath("//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.view.View[1]/android.widget.ScrollView[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.widget.ImageView[1]").click()
        .elementByXPath("//android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.FrameLayout[1]/android.view.View[1]/android.view.View[2]/android.view.View[1]/android.widget.ImageView[1]")
        .isDisplayed().should.eventually.be.true
        .nodeify(done)
    });

    after(function() {
    //add code here
    browser.quit()
    });

});