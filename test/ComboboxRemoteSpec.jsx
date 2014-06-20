/** @jsx React.DOM */
/* jshint newcap: false */
/* globals React, NS */
/* globals jasmine, describe, xdescribe, it, expect, beforeEach, afterEach */

"use strict";
var ComboboxRemote = NS.ComboboxRemote;
var ReactTestUtils = React.addons.TestUtils;
var Simulate = ReactTestUtils.Simulate;

var getAllOptions = function(cbox) {
    return cbox.getDOMNode().getElementsByClassName("Combobox__dropdownOption");
};

describe("ComboboxRemote",function(){
    var cbox;

    var remoteData = [
        { label: "Lock", value: "1" },
        { label: "Stock ", value: "2" },
        { label: "Two Smoking Barrels", value: "3" }
    ];


    beforeEach(function() {
        jasmine.Ajax.install();

        var combobox_def = (
                <ComboboxRemote url="/default?text={}" onError={function(){}}/>
        );
        cbox = ReactTestUtils.renderIntoDocument(combobox_def);
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    it("must call jQuery.ajax on init", function() {
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/default?text=');
    });

    it("must call jQuery.ajax on change", function() {
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/default?text=');
        cbox.setTextValue('b');
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/default?text=b');
    });

    it("must call jQuery.ajax on every change", function() {
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/default?text=');
        cbox.setTextValue('bar');
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/default?text=bar');
        cbox.setTextValue('beer');
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/default?text=beer');
    });

    it("must call urlBuilder on every change", function() {
        var urlBuilderStub = jasmine.createSpy('urlBuilderStub');
        var combobox_def = (
                <ComboboxRemote
                    url="/default"
                    urlBuilder={urlBuilderStub}/>
        );
        cbox = ReactTestUtils.renderIntoDocument(combobox_def);

        cbox.setTextValue('bar');
        expect(urlBuilderStub).toHaveBeenCalledWith('/default', 'bar');

        cbox.setTextValue('beer');
        expect(urlBuilderStub).toHaveBeenCalledWith('/default', 'beer');
        expect(urlBuilderStub.calls.count()).toEqual(3);
    });


    it("must change data on success", function() {
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/default?text=');
        cbox.setTextValue('bar');

        var request = jasmine.Ajax.requests.mostRecent();
        expect(request.url).toBe('/default?text=bar');
        request.response({
            status: 200,
            responseText: JSON.stringify(remoteData)
        });
        cbox.open();
        expect(getAllOptions(cbox).length).toEqual(remoteData.length);
    });

    it("must not change data on error", function() {
        var request = jasmine.Ajax.requests.mostRecent();
        expect(request.url).toBe('/default?text=');
        request.response({
            status: 200,
            responseText: JSON.stringify(remoteData)
        });
        cbox.open();
        expect(getAllOptions(cbox).length).toEqual(remoteData.length);

        cbox.setTextValue('bar');
        var request2 = jasmine.Ajax.requests.mostRecent();
        expect(request2.url).toBe('/default?text=bar');
        request2.response({
            status: 404,
            responseText: 'Error'
        });
        cbox.open();
        expect(getAllOptions(cbox).length).toEqual(remoteData.length);
    });

    it("must call onSuccess", function() {
        var successStub = jasmine.createSpy('onSuccess');
        var combobox_def = (
                <ComboboxRemote url="/default?text={}" onSuccess={successStub}/>
        );
        cbox = ReactTestUtils.renderIntoDocument(combobox_def);

        var request = jasmine.Ajax.requests.mostRecent();
        expect(request.url).toBe('/default?text=');
        request.response({
            status: 200,
            responseText: JSON.stringify(remoteData)
        });

        expect(successStub).toHaveBeenCalled();
        expect(successStub.calls.count()).toEqual(1);

        cbox.setTextValue('bar');
        var request2 = jasmine.Ajax.requests.mostRecent();
        expect(request2.url).toBe('/default?text=bar');
        request2.response({
            status: 200,
            responseText: JSON.stringify(remoteData)
        });

        expect(successStub.calls.count()).toEqual(2);
    });

    it("must call onErorr", function() {
        var errorStub = jasmine.createSpy('onErorr');
        var combobox_def = (
                <ComboboxRemote url="/default?text={}" onError={errorStub}/>
        );
        cbox = ReactTestUtils.renderIntoDocument(combobox_def);

        var request = jasmine.Ajax.requests.mostRecent();
        expect(request.url).toBe('/default?text=');
        request.response({
            status: 404,
            responseText: 'Error 1'
        });

        expect(errorStub).toHaveBeenCalled();
        expect(errorStub.calls.count()).toEqual(1);

        cbox.setTextValue('bar');
        var request2 = jasmine.Ajax.requests.mostRecent();
        expect(request2.url).toBe('/default?text=bar');
        request2.response({
            status: 404,
            responseText: 'Error 2'
        });

        expect(errorStub.calls.count()).toEqual(2);
    });

});
