/** @jsx React.DOM */
/* jshint newcap: false */
/* global React, jQuery */

/**
 * @namespace My Namespace
 */
var NS = NS || {};

/**
 * @module ComboboxRemote
 */
NS.ComboboxRemote = (function(Combobox, React, jQuery) {

    var cx = React.addons.classSet;

    /**
     * Combo box UI component with remote datasource
     * @class
     */
    var ComboboxRemoteObj = {
        // Default component methods
        propTypes: {
            url: React.PropTypes.string.isRequired,
            urlBuilder: React.PropTypes.func,
            ajaxFunc: React.PropTypes.func,
            onChange: React.PropTypes.func,
            onSuccess: React.PropTypes.func,
            onError: React.PropTypes.func
        },

        getDefaultProps: function() {

            return {
                filterFunc: false,
                // Function for build url from props.url and combobox.value
                urlBuilder: function(url, val) {
                    return url.replace('{}', val);
                },
                ajaxFunc: jQuery.ajax,
                onChange: function() {},
                onSuccess: function(data) {
                    return this._onSuccessDefault(data);
                },
                onError: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }
            };
        },

        render: function() {
            return this.transferPropsTo(
                <Combobox ref="combobox" onChange={this._handleOnChange}/>
            );
        },

        /**
         * Handle <Combobox/> change
         * @param  {string} val value x
         */
        _handleOnChange: function(val) {
            var url = this.props.urlBuilder(this.props.url, val);
            if (url) {
                this.props.ajaxFunc({
                    url: url,
                    success: this.props.onSuccess.bind(this),
                    error: this.props.onError.bind(this)
                });
            }

            this.props.onChange.apply(this.props, arguments);
        },

        /**
         * Handle successful data load
         * @param  {object[]} newData
         */
        _onSuccessDefault: function(newData) {
            this.refs.combobox.setData(newData);
            this.refs.combobox.open();
        }
    };

    var callFromCombobox = function(methodName) {
        return function(){
            return this.refs.combobox[methodName].apply(this.refs.combobox, arguments);
        };
    };

    var methods = [
        'open',
        'close',
        'isClosed',
        'enable',
        'disable',
        'isDisabled',
        'setTextValue',
        'value'
    ];
    for (var i = methods.length - 1; i >= 0; i--) {
        ComboboxRemoteObj[methods[i]] = callFromCombobox(methods[i]);
    }

    var ComboboxRemote = React.createClass(ComboboxRemoteObj);

    return ComboboxRemote;
})(NS.Combobox, React, jQuery);
