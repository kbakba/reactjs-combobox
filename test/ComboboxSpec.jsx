/** @jsx React.DOM */
/* jshint newcap: false */
/* globals React, NS */
/* globals describe, it, expect, beforeEach, afterEach */

"use strict";

var Combobox = NS.Combobox;
var ReactTestUtils = React.addons.TestUtils;

describe("Combobox",function(){
    var cbox;

    beforeEach(function() {

        var data = [
            { label: "First Item", value: "1" },
            { label: "Second Item", value: "2" },
        ];
        var combobox_class = (
                <Combobox data={data}/>
        );
        cbox = ReactTestUtils.renderIntoDocument(combobox_class);
    });


    it('is my component', function() {
        expect(ReactTestUtils.isCompositeComponentWithType(cbox, Combobox));
    });

    it("is closed after init", function() {
        expect(cbox.state.isOpen).toBe(false);
    });

    // it("text is focused on button click", function() {
    //     ReactTestUtils.Simulate.click(cbox.refs.button.getDOMNode());
    //     expect(document.activeElement).toBe(cbox.refs.textField.getDOMNode());
    // });

    it("is open on text field focus", function() {
        ReactTestUtils.Simulate.focus(cbox.refs.textField.getDOMNode());
        expect(cbox.state.isOpen).toBe(true);
    });

    it("has default value is empty string", function() {
        expect(cbox.value()).toBe("");
    });

    it("has default value from attribute", function() {
        var data = [
            { label: "First Item", value: "1" },
            { label: "Second Item", value: "2" },
        ];
        var combobox_class = (
                <Combobox data={data} defaultValue="2"/>
        );
        var cbox = ReactTestUtils.renderIntoDocument(combobox_class);
        expect(cbox.value()).toBe('2');
    });
});
