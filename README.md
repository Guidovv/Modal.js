# Modal.js

A simple and lightweight modal.

### Example

```
var m = new Modal({
    content: '<h2>Hello World</h2>',
    center: true
});

m.beforeOpen = function() {
    console.log("I'm about to open!");
};
```
### Options
Options can be set on each modal instance but global options can also be defined using the `window.globalModalOptions` which takes an object with the values displayed below.

All options are optional

| Option | Value |
| ---- | ----|
| `auto_open` | **(Bool)** Should the modal automaticly open |
| `class` | **(String)** Extra class that will be added to the modal|
| `close_button` | **(Bool)** Should the modal contain a close button|
| `content` | **(String)** Content of the modal|
| `center` | **(Bool)** If true, the modal will automaticly be centered|
| `confirm_button` | **(String)** Text that will be displayed in the button. Leave empty if you don't want a confirm button|
| `confirm_button_class_names` | **(String)** Class names that will be added to the confirm button|


### Lifecycle methods
| Method | Description |
| ---- | ----|
| `beforeOpen` | Called right before the modal will open |
| `opened` | Called when the modal is completely visible|
| `beforeClose` | Called right before the modal will close|
| `closed` | Called when the modal has closed. Comes with an argument `closed_via_confirm_button` which is true when the modal is closed via the confirm button|
