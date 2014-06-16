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
        { label: "Super Star",   value: "Michael Jackson" },
        { label: "Point1",    value: "0" },
        { label: "Triangle1", value: "3" },
        { label: "Square1", value: "4" },
        { label: "Star1",   value: "5" },
        { label: "Point2",    value: "0" },
        { label: "Triangle2", value: "3" },
        { label: "Square2", value: "4" },
        { label: "Star2",   value: "5" },
        { label: "Point3",    value: "0" },
        { label: "Triangle3", value: "3" },
        { label: "Square3", value: "4" },
        { label: "Star3",   value: "5" }
    ];

    window.comboboxInstance = React.renderComponent(
        (<Combobox data={data}/>),
        doc.getElementById('insert_here')
    );

})(document);
