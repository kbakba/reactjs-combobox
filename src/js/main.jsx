/** @jsx React.DOM */
/* jshint newcap: false */
/* global React, NS */

(function (doc) {
    var Combobox = NS.Combobox.Combobox;
    var ComboboxOption = NS.Combobox.ComboboxOption;
    var ComboboxDivider = NS.Combobox.ComboboxDivider;

    React.renderComponent(
        <Combobox>
            <ComboboxOption value="a1">Action</ComboboxOption>
            <ComboboxOption value="a2_sel" selected>Selected action</ComboboxOption>
            <ComboboxDivider/>
            <ComboboxOption value="a3">Another action</ComboboxOption>
            <ComboboxOption value="a4">Something else here</ComboboxOption>
            <ComboboxOption value="a1">Action</ComboboxOption>
            <ComboboxOption value="a2_sel" selected>Selected action</ComboboxOption>
            <ComboboxDivider/>
            <ComboboxOption value="a3">Another action</ComboboxOption>
            <ComboboxOption value="a4">Something else here</ComboboxOption>
            <ComboboxOption value="a1">Action</ComboboxOption>
            <ComboboxOption value="a2_sel" selected>Selected action</ComboboxOption>
            <ComboboxDivider/>
            <ComboboxOption value="a3">Another action</ComboboxOption>
            <ComboboxOption value="a4">Something else here</ComboboxOption>
        </Combobox>,

        doc.getElementById('insert_here')
    );
})(document);
