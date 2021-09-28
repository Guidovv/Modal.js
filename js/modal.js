"use strict";

(function () {

  window.Modal = function () {

    // Reference to the close element
    this.close_button = null;

    // Reference to the modal element
    this.modal = null;

    // Stores the keyup event listener
    this.keyListenerFunc = null;

    this.transitionEnd = transitionSelect();

    var defaults = {
      auto_open: true,
      class: '',
      close_button: true,
      close_button_inside_content: false,
      content: '',
      center: false,
      confirm_button: '',
      confirm_button_class_names: '',
    }

    var userOptions = defaults;
    if (window.globalModalOptions) {
      userOptions = extendDefaults(userOptions, window.globalModalOptions);
    }
    this.options = extendDefaults(userOptions, arguments.length ? arguments[0] : {});

    if (!!this.options.auto_open) {
      var t = this;
      setTimeout(function () {
        t.open();
      }, 0);
    }
  }

  Modal.prototype.close = function (via_confirm_button) {
    var _ = this;
    var parent;

    if (typeof this.beforeClose == 'function') {
      this.beforeClose();
    }

    this.modal.classList.remove('open');

    document.body.classList.remove('has-modal');
    document.body.removeEventListener('keyup', this.keyListenerFunc);

    this.modal.addEventListener(this.transitionEnd, function () {
      if (parent = _.modal.parentNode)
        parent.removeChild(_.modal);
    });

    if (typeof this.closed == 'function') {
      this.closed(via_confirm_button);
    }
  }

  Modal.prototype.open = function () {
    document.body.classList.add('has-modal');

    if (typeof this.beforeOpen == 'function') {
      this.beforeOpen();
    }

    create.call(this);
    window.getComputedStyle(this.modal).height;

    initializeEvents.call(this);

    this.modal.classList.add('open');

    if (this.modal.offsetHeight > window.innerHeight) {
      this.modal.classList.add('absolute');
    }

    if (typeof this.opened == 'function') {
      this.opened();
    }
  }

  function create() {
    var content,
      content_con;

    if (typeof this.options.content === 'string') {
      content = this.options.content;
    } else {
      content = this.options.content.innerHTML;
    }

    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    if (this.options.class) {
      this.modal.classList.add(this.options.class);
    }

    content_con = document.createElement('div');
    content_con.className = 'modal-content';

    if (!!this.options.center) {
      content_con.classList.add('center');
    }

    content_con.innerHTML = content;

    if (this.options.close_button === true) {
      this.close_button = document.createElement('span');
      this.close_button.className = 'close js-close';
      this.close_button.innerHTML = '&#215;';

      if (this.options.close_button_inside_content) {
        content_con.appendChild(this.close_button);
      } else {
        this.modal.appendChild(this.close_button);
      }
    }

    if (this.options.confirm_button) {
      const confirm_button = document.createElement('button');
      confirm_button.textContent = this.options.confirm_button;
      confirm_button.className = 'js-confirm-button ' + this.options.confirm_button_class_names;
      content_con.appendChild(confirm_button);
    }

    this.modal.appendChild(content_con);

    document.body.appendChild(this.modal);

    if (this.options.close_button === true) {
      this.close_button = this.modal.querySelector('.js-close');
    }
    if (this.options.confirm_button) {
      this.confirm_button = this.modal.querySelector('.js-confirm-button');
    }
  }

  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

  function initializeEvents() {
    var modal = this;
    if (this.close_button) {
      this.close_button.addEventListener('click', this.close.bind(modal, false));
    }

    if (this.confirm_button) {
      this.confirm_button.addEventListener('click', this.close.bind(modal, true));
    }

    this.modal.addEventListener(this.transitionEnd, function (e) {
      if ('opacity' == e.propertyName && typeof modal.visible == 'function') {
        modal.visible();
      }
    }, false);

    this.modal.addEventListener('click', function (e) {
      if (e.target.classList.length == 0) {
        return;
      }
      if (hasClasses(e.target, ['modal', 'open'])) {
        modal.close(false);
      }
    });

    this.keyListenerFunc = keyupListener.bind(this);
    document.querySelector('body.has-modal').addEventListener('keyup', this.keyListenerFunc);
  }

  function keyupListener(e) {
    if (e.which == 27) {
      this.close(false);
    }
  }

  function transitionSelect() {
    var el = document.createElement('div');
    if (el.style.WebkitTransition) return 'webkitTransitionEnd';
    if (el.style.OTransition) return 'oTransitionEnd';
    return 'transitionend';
  }

  function hasClasses(element, classes) {
    if (classes.length == 0) return;
    var result = classes.every(function (item) {
      return element.classList.contains(item);
    });
    return result;
  }
})();
