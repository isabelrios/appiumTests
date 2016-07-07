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
        platformName: "iOS",
        platformVersion: "xx",
        deviceName: "xxx",
        app: "/pathToApp.app",
    };

    var browser = wd.promiseChainRemote("127.0.0.1", 4723);

        before(function() {
            return browser
            .init(desired)
            .setImplicitWaitTimeout(120000);
        });

    it('should find the magnet title', function(done) {
        return browser
            .elementByXPath('//UIAApplication[1]/UIAWindow[1]/UIAElement[1]')
            .isDisplayed().should.eventually.be.true
            .nodeify(done)
        });

    it('should find the close button and click on it', function(done) {
        return browser
            .elementByXPath("//UIAApplication[1]/UIAWindow[1]/UIAScrollView[1]/UIAImage[2]")
            .click()
            .elementByXPath("//UIAApplication[1]/UIAWindow[1]/UIAElement[1]")
            .isDisplayed().should.eventually.be.true
            .elementByXPath("//UIAApplication[1]/UIAWindow[1]/UIAElement[1]")
            .click()
            .elementByXPath("//UIAApplication[1]/UIAWindow[1]/UIAScrollView[1]/UIAImage[2]")
            .isDisplayed().should.eventually.be.true
            .nodeify(done)
    });

    it('should open browser from tile', function(done) {
        return browser
            .elementByXPath("//UIAApplication[1]/UIAWindow[1]/UIAScrollView[1]/UIAImage[2]")
            .click()
            .elementByXPath("//UIAApplication[1]/UIAWindow[1]/UIAScrollView[1]/UIAImage[2]")
            .click()
            //ulr element 
            .elementByXPath('//UIAApplication[1]/UIAWindow[2]/UIAButton[2]/UIAElement[1]')
            .isDisplayed().should.eventually.be.true
            .nodeify(done)
    });

    after(function() {
        browser.quit()
    });

});