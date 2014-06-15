/** @jsx React.DOM */
/* jshint newcap: false */
/* globals React, NS */
/* globals describe, it, expect, beforeEach, afterEach */

"use strict";

var Combobox = NS.Combobox.Combobox;
var ComboboxOption = NS.Combobox.ComboboxOption;
var ReactTestUtils = React.addons.TestUtils;

describe("Combobox",function(){
    var cbox;

    beforeEach(function() {
        var combobox_class = (
                <Combobox>
                    <ComboboxOption value="a1">Action</ComboboxOption>
                    <ComboboxOption value="a2_sel" selected>Selected action</ComboboxOption>
                </Combobox>
        );
        cbox = ReactTestUtils.renderIntoDocument(combobox_class);
    });


    it('is my component', function() {
        expect(ReactTestUtils.isCompositeComponentWithType(cbox, Combobox));
    });

    it("is closed after init", function() {
        expect(cbox.state.isOpen).toBe(false);
    });

    it("is open on click", function() {
        ReactTestUtils.Simulate.mouseDown(cbox.refs.button.getDOMNode());
        expect(cbox.state.isOpen).toBe(true);
    });

    it("is open on text field focus", function() {
        ReactTestUtils.Simulate.focus(cbox.refs.textField.getDOMNode());
        expect(cbox.state.isOpen).toBe(true);
    });
});
