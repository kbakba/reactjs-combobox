/** @jsx React.DOM */
/* jshint newcap: false */
/* globals React, NS */
/* globals describe, it, expect, beforeEach, afterEach */

"use strict";

var Combobox = NS.Combobox;
var ReactTestUtils = React.addons.TestUtils;
var Simulate = ReactTestUtils.Simulate;

var getAllOptions = function(cbox) {
    return cbox.getDOMNode().getElementsByClassName("Combobox__dropdownOption");
};

describe("Combobox",function(){
    var cbox;
    var data = [
        { label: "First Item", value: "1" },
        { label: "Second Item", value: "2" },
        { label: "Third Item", value: "3" },
        { label: "4th Item", value: "4" },
        { label: "5th Item", value: "5" },
        { label: "6th Item", value: "6" },
        { label: "7th Item", value: "7" },
        { label: "8th Item", value: "8" },
        { label: "9th Item", value: "9" },
        { label: "10th Item", value: "10" },
        { label: "100th Item", value: "100" },
        { label: "more Items", value: "100" }
    ];

    beforeEach(function() {
        var combobox_class = (
                <Combobox data={data}/>
        );
        cbox = ReactTestUtils.renderIntoDocument(combobox_class);
    });


    it("is my component", function() {
        expect(ReactTestUtils.isCompositeComponentWithType(cbox, Combobox)).toBe(true);
    });

    it("is closed after init", function() {
        expect(cbox.state.isOpen).toBe(false);
    });

    it("is open on text field focus", function() {
        Simulate.focus(cbox.refs.textField.getDOMNode());
        expect(cbox.state.isOpen).toBe(true);
    });

    it("has default value is empty string", function() {
        expect(cbox.value()).toBe("");
    });

    it("has default value from attribute", function() {
        var combobox_class = (
                <Combobox data={data} defaultValue="First"/>
        );
        var cbox = ReactTestUtils.renderIntoDocument(combobox_class);
        expect(cbox.value()).toBe("First");
    });

    it("has filtered dropdown items on default value 'First'", function() {
        var combobox_class = (
                <Combobox data={data} defaultValue="First"/>
        );
        var cbox = ReactTestUtils.renderIntoDocument(combobox_class);
        expect(cbox.state._filtratedData.length).toBe(1);
    });

    it("has filtered dropdown items on default value '10'", function() {
        var combobox_class = (
                <Combobox data={data} defaultValue="10"/>
        );
        var cbox = ReactTestUtils.renderIntoDocument(combobox_class);
        expect(cbox.state._filtratedData.length).toBe(2);
    });

    it("without default value must have all data items in dropdown", function() {
        expect(cbox.state._filtratedData.length).toBe(data.length);
    });

    it("on press key 'Down' must select first option", function() {
        var textField = cbox.refs.textField.getDOMNode();
        Simulate.focus(textField);
        Simulate.keyDown(textField, {key: "ArrowDown"});
        var allOptions = getAllOptions(cbox);
        var classnames = allOptions[0].className.split(/\s+/);
        expect(classnames).toContain("Combobox__dropdownOption_selected");
    });

    it("on press key 'Down' twice must select second option", function() {
        var textField = cbox.refs.textField.getDOMNode();
        Simulate.focus(textField);
        Simulate.keyDown(textField, {key: "ArrowDown"});
        Simulate.keyDown(textField, {key: "ArrowDown"});
        var allOptions = getAllOptions(cbox);
        var classnames = allOptions[1].className.split(/\s+/);
        expect(classnames).toContain("Combobox__dropdownOption_selected");
    });

    it("on press key 'Up' must select last option", function() {
        var textField = cbox.refs.textField.getDOMNode();
        Simulate.focus(textField);
        Simulate.keyDown(textField, {key: "ArrowUp"});
        var allOptions = getAllOptions(cbox);
        var classnames = allOptions[allOptions.length - 1].className.split(/\s+/);
        expect(classnames).toContain("Combobox__dropdownOption_selected");
    });

    it("on press key 'Up' twice must select pre last option", function() {
        var textField = cbox.refs.textField.getDOMNode();
        Simulate.focus(textField);
        Simulate.keyDown(textField, {key: "ArrowUp"});
        Simulate.keyDown(textField, {key: "ArrowUp"});
        var allOptions = getAllOptions(cbox);
        var classnames = allOptions[allOptions.length - 2].className.split(/\s+/);
        expect(classnames).toContain("Combobox__dropdownOption_selected");
    });

    it("on select option by keyboard must return object", function() {
        var textField = cbox.refs.textField.getDOMNode();
        Simulate.focus(textField);
        Simulate.keyDown(textField, {key: "ArrowUp"});
        Simulate.keyDown(textField, {key: "ArrowUp"});
        Simulate.keyDown(textField, {key: "Enter"});
        expect(cbox.value()).toBe(data[data.length - 2]);
    });

    it("on select option by mouse must return object", function() {
        var textField = cbox.refs.textField.getDOMNode();
        Simulate.focus(textField);
        var allOptions = getAllOptions(cbox);
        Simulate.click(allOptions[3]);
        expect(cbox.value()).toBe(data[3]);
    });

    it("on enter string to input, must return that string", function() {
        var textField = cbox.refs.textField.getDOMNode();
        textField.value = "test";
        Simulate.focus(textField);
        expect(cbox.value()).toBe("test");
    });

    it("must close on 'ESC'", function() {
        var textField = cbox.refs.textField.getDOMNode();
        textField.value = "1";
        Simulate.focus(textField);
        Simulate.keyDown(textField, {key: "Escape"});
        expect(cbox.state.isOpen).toBe(false);
    });

    it("must open dropdown on .open()", function() {
        cbox.open();
        expect(cbox.state.isOpen).toBe(true);
        expect(cbox.getDOMNode().className.split(/\s+/)).toContain('Combobox_open');
    });

    it("must close dropdown on .close()", function() {
        cbox.open();
        cbox.close();
        expect(cbox.state.isOpen).toBe(false);
        expect(cbox.getDOMNode().className.split(/\s+/)).not.toContain('Combobox_open');
    });

    it("must filter items on input", function() {
        var textField = cbox.refs.textField.getDOMNode();
        textField.value = "10";
        Simulate.focus(textField);
        var allOptions = getAllOptions(cbox);
        expect(allOptions.length).toBe(2);
    });

    it("must change value on .setTextValue()", function() {
        cbox.setTextValue("10");
        expect(cbox.state.isOpen).toBe(true);
        expect(cbox.value()).toBe("10");
    });

    it("dropdown must be closed if no items", function() {
        cbox.setTextValue("super");
        expect(cbox.state.isOpen).toBe(false);
    });

    // TODO test /Combobox/@filterFunc

});
