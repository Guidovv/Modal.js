"use strict";

(function() {

	window.Modal = function() {

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
			content: '',
			center: false
		}

		this.options = extendDefaults(defaults, arguments.length ? arguments[0] : {});

		if (!!this.options.auto_open) {
			this.open();
		}
	}

	Modal.prototype.close = function() {
		var _ = this;
 		var parent;

		this.modal.classList.remove('open');

		document.body.classList.remove('has-modal');
		document.body.removeEventListener('keyup', this.keyListenerFunc);

		this.modal.addEventListener(this.transitionEnd, function() {
			if (parent = _.modal.parentNode)
				parent.removeChild(_.modal);
		});

		if (typeof this.closed == 'function') {
			this.closed();
		}
	}

	Modal.prototype.open = function() {
		document.body.classList.add('has-modal');

		create.call(this);
		window.getComputedStyle(this.modal).height;

		initializeEvents.call(this);
		this.modal.classList.add( (this.modal.offsetHeight > window.innerHeight ? 'open absolute' : 'open') );
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

		if (this.options.close_button === true) {
			this.close_button = document.createElement('span');
			this.close_button.className = 'close';
			this.close_button.innerHTML = '&#215;';
			this.modal.appendChild(this.close_button);
		}
		content_con.innerHTML = content_con.innerHTML + content;

		this.modal.appendChild(content_con);

		document.body.appendChild(this.modal);

		if (this.options.close_button === true) {
			this.close_button = this.modal.getElementsByClassName('close')[0];
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
			this.close_button.addEventListener('click', this.close.bind(modal));
		}

		this.modal.addEventListener('transitionend', function(e) {
			if ('opacity' == e.propertyName && typeof modal.visible == 'function') {
				modal.visible();
			}
		}, false);

		this.modal.addEventListener('click', function(e) {
			for (var i = 0; i < e.target.classList.length; i++) {
				if (e.target.parentNode == document.body) {
					modal.close();
				}
			}
		});

		this.keyListenerFunc = keyupListener.bind(this);
		document.querySelector('body.has-modal').addEventListener('keyup', this.keyListenerFunc);
	}

	function keyupListener(e) {
		if (e.which == 27) {
			this.close();
		}
	}

	function transitionSelect() {
		var el = document.createElement('div');
		if (el.style.WebkitTransition) return 'webkitTransitionEnd';
		if (el.style.OTransition) return 'oTransitionEnd';
		return 'transitionend';
	}
})();
