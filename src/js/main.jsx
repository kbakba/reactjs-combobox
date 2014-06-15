/** @jsx React.DOM */
/* jshint newcap: false */
/* global React, NS */

(function(doc) {
    var Combobox = NS.Combobox;

    var data = [
        { label: "Point",    value: "0" },
        { label: "Triangle", value: "3" },
        { label: "Square", value: "4" },
        { label: "Star",   value: "5" },
        { label: "Super Star",   value: "Michael Jackson" }
    ];

    window.comboboxInstance = React.renderComponent(
        (<Combobox data={data}/>),
        doc.getElementById('insert_here')
    );

})(document);
