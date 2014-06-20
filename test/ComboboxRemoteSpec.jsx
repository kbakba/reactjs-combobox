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
    var jQueryAjaxStub;

    beforeEach(function() {
        jQueryAjaxStub = jasmine.createSpy('jQueryAjaxStub');

        var combobox_def = (
                <ComboboxRemote url="/default?text={}" ajaxFunc={jQueryAjaxStub}/>
        );
        cbox = ReactTestUtils.renderIntoDocument(combobox_def);
    });

    it("must call jQuery.ajax on init", function() {
        expect(jQueryAjaxStub).toHaveBeenCalled();
        expect(jQueryAjaxStub.calls.count()).toEqual(1);
        expect(jQueryAjaxStub).toHaveBeenCalledWith(jasmine.objectContaining({
            url: "/default?text=",
        }));
    });

    it("must call jQuery.ajax on change", function() {
        cbox.setTextValue('b');
        expect(jQueryAjaxStub).toHaveBeenCalled();
        expect(jQueryAjaxStub.calls.count()).toEqual(2);
        expect(jQueryAjaxStub).toHaveBeenCalledWith(jasmine.objectContaining({
            url: "/default?text=b",
        }));
    });

    it("must call jQuery.ajax on every change", function() {
        cbox.setTextValue('bar');
        cbox.setTextValue('beer');
        expect(jQueryAjaxStub.calls.count()).toEqual(3);
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
        expect(urlBuilderStub.calls.count()).toEqual(3);
    });

});
});
