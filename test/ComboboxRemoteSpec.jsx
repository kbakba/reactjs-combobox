/** @jsx React.DOM */
/* jshint newcap: false */
/* globals React, NS */
/* globals jasmine, describe, it, expect, beforeEach, afterEach */

"use strict";
var ComboboxRemote = NS.ComboboxRemote;
var ReactTestUtils = React.addons.TestUtils;
var Simulate = ReactTestUtils.Simulate;

var getAllOptions = function(cbox) {
    return cbox.getDOMNode().getElementsByClassName("Combobox__dropdownOption");
};

describe("ComboboxRemote",function(){
    var cbox;
    var jQueryAjaxStub;

    beforeEach(function() {
        jQueryAjaxStub = jasmine.createSpy('jQueryAjaxStub');

        var combobox_def = (
                <ComboboxRemote url="/default?text={}" ajaxFunc={jQueryAjaxStub}/>
        );
        cbox = ReactTestUtils.renderIntoDocument(combobox_def);
    });

    it("must call jQuery.ajax on change", function() {
        cbox.setTextValue('b');
        expect(jQueryAjaxStub).toHaveBeenCalled();
        expect(jQueryAjaxStub.calls.count()).toEqual(1);
        expect(jQueryAjaxStub).toHaveBeenCalledWith(jasmine.objectContaining({
            url: "/default?text=b",
        }));
    });

    it("must call jQuery.ajax on every change", function() {
        cbox.setTextValue('bar');
        cbox.setTextValue('beer');
        expect(jQueryAjaxStub.calls.count()).toEqual(2);
    });

    it("must call urlBuilder on every change", function() {
        var urlBuilderStub = jasmine.createSpy('urlBuilderStub');
        var combobox_def = (
                <ComboboxRemote
                    url="/default"
                    urlBuilder={urlBuilderStub}
                    ajaxFunc={jQueryAjaxStub}/>
        );
        cbox = ReactTestUtils.renderIntoDocument(combobox_def);

        cbox.setTextValue('bar');
        expect(urlBuilderStub).toHaveBeenCalledWith('/default', 'bar');

        cbox.setTextValue('beer');
        expect(urlBuilderStub).toHaveBeenCalledWith('/default', 'beer');
        expect(urlBuilderStub.calls.count()).toEqual(2);
    });

});

describe("ComboboxRemote async",function(){
    var cbox;
    var asyncData = [
        { label: "First Item", value: "1" },
        { label: "Second Item", value: "2" },
        { label: "Third Item", value: "3" }
    ];

    describe("success actions", function(){
        beforeEach(function(done) {
            var jQueryAjaxMock = function(ajaxObj) {
                setTimeout(function() {
                    ajaxObj.success(asyncData);
                    done();
                }, 100);
            };

            var combobox_def = (
                    <ComboboxRemote url="/default?text={}" ajaxFunc={jQueryAjaxMock}/>
            );
            cbox = ReactTestUtils.renderIntoDocument(combobox_def);
            cbox.setTextValue('s');
        });

        it("loads data items", function() {
            expect(getAllOptions(cbox).length).toBe(asyncData.length);
        });
    });

    describe("error actions", function(){
        var onErrorStub = jasmine.createSpy('onErrorStub');

        beforeEach(function(done) {
            var jQueryAjaxMock = function(ajaxObj) {
                setTimeout(function() {
                    ajaxObj.error({}, 404, 'Not found');
                    done();
                }, 100);
            };

            var combobox_def = (
                    <ComboboxRemote url="/default?text={}"
                        ajaxFunc={jQueryAjaxMock}
                        onError={onErrorStub}/>
            );
            cbox = ReactTestUtils.renderIntoDocument(combobox_def);
            cbox.setTextValue('s');
        });

        it("don't change items on error", function() {
            expect(getAllOptions(cbox).length).toBe(0);
        });

        it("must call onError", function() {
            expect(onErrorStub).toHaveBeenCalledWith({}, 404, 'Not found');
        });
    });


});
