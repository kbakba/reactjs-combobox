[Combo box][wiki] built as [React.js][reactjs] component
=======================================================================

## Combobox component
It is same as dropdown list, but user can input value.

### Usage
```javascript
var data = [{label: "First item"}, {label: "Second item"}];
var combobox = React.renderComponent(
    Combobox({data: data, defaultValue: "First"}),
    document.getElementById('here')
);
```

### Component properties

  * **data** _{object[]}_ _*Required*_ - Array of objects
      In objects must be defined "label" property, 
      value of that property will be showed in dropdown list
  * **defaultValue=""** _{string}_ - that value will be showed after initialization 
  * **disabled=false** _{boolean}_ - combobox may be disabled
  * **onChange** _{function}_ - this function called on every change   
  arguments:
    - currentValue - of text field 
    - prevValue - of text field  

  by default is empty function  
  
  * **filterFunc** _{function}_ - that function called for filter items from data property by textValue from user, after filter items showed as options in dropdown  
  arguments: 
    - textValue - value from combobox text field
    - item - from data property
    - return true/false for show or hide item  
  by default function is:
```
function(textValue, item){
        var s = textValue.toLowerCase().replace(' ', '');
        return item.label.toLowerCase().replace(' ', '').indexOf(s) >= 0;
}    
```

### Component methods
  * **open()** / **close()** - Open or close dropdown list
  * **isClosed()** - Check that dropdown is closed
  * **enable()** / **disable()** - Enable or disable component
  * **isDisabled()** - Check component is disabled
  * **setTextValue(**_string_**)** - Set component value 
  * **setData(**_object[]_**)** - Set component data, for dropdown list 
  * **value()** - Get component value (_object_ from data if user select option in dropdown list, or _string_ if user entered text)

## ComboboxRemote component
It is subclass of [Combobox](#combobox), it can get data for dropdown list from remote source.

### Properties
All [properties from Combobox](#component-properties) (but **filterFunc=_false_**) and:

  * **url** _{string}_ - default url, which return data. Data must be same structure as in Combobox data property.
  * **urlBuilder** _{function}_ - calls on every change, generate url for next request  
  arguments: 
    - url - same as url property
    - textValue - value from combobox text field
    - return _{string}_ with new url  
  by default function is:

```javascript
function(url, textValue) {
    return url.replace('{}', textValue);
}
```

  * **onSuccess** _{function}_ - calls on every successful response  
  arguments: 
    - data - from response  
    by default function is:

```javascript
function(data) {
    this.refs.combobox.setData(data);
}
```

  * **onError** _{function}_ - calls on every error response  
  arguments: 
    - xhr - XMLHTTPRequest [jQuery superset](http://api.jquery.com/Types/#jqXHR)
    - status - response status 
    - error - errorThrown  
    by default function is:

```javascript
function(xhr, status, err) {
    console.error(this.props.url, status, err.toString());
}
```

### Component methods
All [methods from Combobox](#component-methods)

## TODO
see [TODO.md](TODO.md)


## Credits
Author: [Aleksey Ostapenko](http://github.com/kbakba/)  

[wiki]: http://en.wikipedia.org/wiki/Combo_box
[reactjs]: http://facebook.github.io/react/
