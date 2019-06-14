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
All options are optional

| Option | Value |
| ---- | ----|
| `auto_open` | **(Bool)** Should the modal automaticly open |
| `class` | **(String)** Extra class that will be added to the modal|
| `close_button` | **(Bool)** Should the modal contain a close button|
| `content` | **(String)** Content of the modal|
| `center` | **(Bool)** If true, the modal will automaticly be centered|

### Lifecycle methods
| Method | Description |
| ---- | ----|
| `beforeOpen` | Called right before the modal will open |
| `opened` | Called when the modal is completely visible|
| `beforeClose` | Called right before the modal will close|
| `closed` | Called when the modal has closed|
