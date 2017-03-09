import { Component, h } from 'preact';
import { bindActionCreators } from 'redux';

var Children = {
	only: function only(children) {
		return children && children[0] || null;
	}
};

function proptype() {}
proptype.isRequired = proptype;

var PropTypes = {
	element: proptype,
	func: proptype,
	shape: function shape() {
		return proptype;
	}
};

var storeShape = PropTypes.shape({
	subscribe: PropTypes.func.isRequired,
	dispatch: PropTypes.func.isRequired,
	getState: PropTypes.func.isRequired
});

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
	/* eslint-disable no-console */
	if (typeof console !== 'undefined' && typeof console.error === 'function') {
		console.error(message);
	}
	/* eslint-enable no-console */
	try {
		// This error was thrown as a convenience so that if you enable
		// "break on all exceptions" in your console,
		// it would pause the execution at this line.
		throw new Error(message);
		/* eslint-disable no-empty */
	} catch (e) {}
	/* eslint-enable no-empty */
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	return typeof obj;
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
};









var _extends = Object.assign || function (target) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];

				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}

			return target;
		};

var get = function get(object, property, receiver) {
	if (object === null) object = Function.prototype;
	var desc = Object.getOwnPropertyDescriptor(object, property);

	if (desc === undefined) {
		var parent = Object.getPrototypeOf(object);

		if (parent === null) {
			return undefined;
		} else {
			return get(parent, property, receiver);
		}
	} else if ("value" in desc) {
		return desc.value;
	} else {
		var getter = desc.get;

		if (getter === undefined) {
			return undefined;
		}

		return getter.call(receiver);
	}
};

var inherits = function (subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}

	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
	if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}

	return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
	var desc = Object.getOwnPropertyDescriptor(object, property);

	if (desc === undefined) {
		var parent = Object.getPrototypeOf(object);

		if (parent !== null) {
			set(parent, property, value, receiver);
		}
	} else if ("value" in desc && desc.writable) {
		desc.value = value;
	} else {
		var setter = desc.set;

		if (setter !== undefined) {
			setter.call(receiver, value);
		}
	}

	return value;
};

var Provider = function (_Component) {
	inherits(Provider, _Component);

	Provider.prototype.getChildContext = function getChildContext() {
		return { store: this.store };
	};

	function Provider(props, context) {
		classCallCheck(this, Provider);

		var _this = possibleConstructorReturn(this, _Component.call(this, props, context));

		_this.store = props.store;
		return _this;
	}

	Provider.prototype.render = function render() {
		return Children.only(this.props.children);
	};

	return Provider;
}(Component);

Provider.childContextTypes = {
	store: storeShape.isRequired
};

function shallowEqual(objA, objB) {
	if (objA === objB) {
		return true;
	}

	var keysA = Object.keys(objA);
	var keysB = Object.keys(objB);

	if (keysA.length !== keysB.length) {
		return false;
	}

	// Test for A's keys different from B.
	var hasOwn = Object.prototype.hasOwnProperty;
	for (var i = 0; i < keysA.length; i++) {
		if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
			return false;
		}
	}

	return true;
}

function wrapActionCreators(actionCreators) {
	return function (dispatch) {
		return bindActionCreators(actionCreators, dispatch);
	};
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var _Symbol = root.Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
	var isOwn = hasOwnProperty$1.call(value, symToStringTag$1),
			tag = value[symToStringTag$1];

	try {
		value[symToStringTag$1] = undefined;
		var unmasked = true;
	} catch (e) {}

	var result = nativeObjectToString.call(value);
	if (unmasked) {
		if (isOwn) {
			value[symToStringTag$1] = tag;
		} else {
			delete value[symToStringTag$1];
		}
	}
	return result;
}

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$2.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
	return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
	if (value == null) {
		return value === undefined ? undefinedTag : nullTag;
	}
	value = Object(value);
	return symToStringTag && symToStringTag in value ? getRawTag(value) : objectToString(value);
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
	return function (arg) {
		return func(transform(arg));
	};
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
	return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
	if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
		return false;
	}
	var proto = getPrototype(value);
	if (proto === null) {
		return true;
	}
	var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
	childContextTypes: true,
	contextTypes: true,
	defaultProps: true,
	displayName: true,
	getDefaultProps: true,
	mixins: true,
	propTypes: true,
	type: true
};

var KNOWN_STATICS = {
	name: true,
	length: true,
	prototype: true,
	caller: true,
	arguments: true,
	arity: true
};

var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

var index = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
	if (typeof sourceComponent !== 'string') {
		// don't hoist over string (html) components
		var keys = Object.getOwnPropertyNames(sourceComponent);

		/* istanbul ignore else */
		if (isGetOwnPropertySymbolsAvailable) {
			keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
		}

		for (var i = 0; i < keys.length; ++i) {
			if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
				try {
					targetComponent[keys[i]] = sourceComponent[keys[i]];
				} catch (error) {}
			}
		}
	}

	return targetComponent;
};

var invariant = function () {};

var defaultMapStateToProps = function defaultMapStateToProps(state) {
	return {};
}; // eslint-disable-line no-unused-vars
var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
	return { dispatch: dispatch };
};
var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
	return _extends({}, parentProps, stateProps, dispatchProps);
};

function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

var errorObject = { value: null };
function tryCatch(fn, ctx) {
	try {
		return fn.apply(ctx);
	} catch (e) {
		errorObject.value = e;
		return errorObject;
	}
}

// Helps track hot reloading.
var nextVersion = 0;

function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
	var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	var shouldSubscribe = Boolean(mapStateToProps);
	var mapState = mapStateToProps || defaultMapStateToProps;

	var mapDispatch = void 0;
	if (typeof mapDispatchToProps === 'function') {
		mapDispatch = mapDispatchToProps;
	} else if (!mapDispatchToProps) {
		mapDispatch = defaultMapDispatchToProps;
	} else {
		mapDispatch = wrapActionCreators(mapDispatchToProps);
	}

	var finalMergeProps = mergeProps || defaultMergeProps;
	var _options$pure = options.pure,
			pure = _options$pure === undefined ? true : _options$pure,
			_options$withRef = options.withRef,
			withRef = _options$withRef === undefined ? false : _options$withRef;

	var checkMergedEquals = pure && finalMergeProps !== defaultMergeProps;

	// Helps track hot reloading.
	var version = nextVersion++;

	return function wrapWithConnect(WrappedComponent) {
		var connectDisplayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';

		function checkStateShape(props, methodName) {
			if (!isPlainObject(props)) {
				warning(methodName + '() in ' + connectDisplayName + ' must return a plain object. ' + ('Instead received ' + props + '.'));
			}
		}

		function computeMergedProps(stateProps, dispatchProps, parentProps) {
			var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
			return mergedProps;
		}

		var Connect = function (_Component) {
			inherits(Connect, _Component);

			Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
				return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged;
			};

			function Connect(props, context) {
				classCallCheck(this, Connect);

				var _this = possibleConstructorReturn(this, _Component.call(this, props, context));

				_this.version = version;
				_this.store = props.store || context.store;

				invariant(_this.store, 'Could not find "store" in either the context or ' + ('props of "' + connectDisplayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + connectDisplayName + '".'));

				var storeState = _this.store.getState();
				_this.state = { storeState: storeState };
				_this.clearCache();
				return _this;
			}

			Connect.prototype.computeStateProps = function computeStateProps(store, props) {
				if (!this.finalMapStateToProps) {
					return this.configureFinalMapState(store, props);
				}

				var state = store.getState();
				var stateProps = this.doStatePropsDependOnOwnProps ? this.finalMapStateToProps(state, props) : this.finalMapStateToProps(state);

				return stateProps;
			};

			Connect.prototype.configureFinalMapState = function configureFinalMapState(store, props) {
				var mappedState = mapState(store.getState(), props);
				var isFactory = typeof mappedState === 'function';

				this.finalMapStateToProps = isFactory ? mappedState : mapState;
				this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1;

				if (isFactory) {
					return this.computeStateProps(store, props);
				}

				return mappedState;
			};

			Connect.prototype.computeDispatchProps = function computeDispatchProps(store, props) {
				if (!this.finalMapDispatchToProps) {
					return this.configureFinalMapDispatch(store, props);
				}

				var dispatch = store.dispatch;

				var dispatchProps = this.doDispatchPropsDependOnOwnProps ? this.finalMapDispatchToProps(dispatch, props) : this.finalMapDispatchToProps(dispatch);

				return dispatchProps;
			};

			Connect.prototype.configureFinalMapDispatch = function configureFinalMapDispatch(store, props) {
				var mappedDispatch = mapDispatch(store.dispatch, props);
				var isFactory = typeof mappedDispatch === 'function';

				this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch;
				this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1;

				if (isFactory) {
					return this.computeDispatchProps(store, props);
				}

				return mappedDispatch;
			};

			Connect.prototype.updateStatePropsIfNeeded = function updateStatePropsIfNeeded() {
				var nextStateProps = this.computeStateProps(this.store, this.props);
				if (this.stateProps && shallowEqual(nextStateProps, this.stateProps)) {
					return false;
				}

				this.stateProps = nextStateProps;
				return true;
			};

			Connect.prototype.updateDispatchPropsIfNeeded = function updateDispatchPropsIfNeeded() {
				var nextDispatchProps = this.computeDispatchProps(this.store, this.props);
				if (this.dispatchProps && shallowEqual(nextDispatchProps, this.dispatchProps)) {
					return false;
				}

				this.dispatchProps = nextDispatchProps;
				return true;
			};

			Connect.prototype.updateMergedPropsIfNeeded = function updateMergedPropsIfNeeded() {
				var nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props);
				if (this.mergedProps && checkMergedEquals && shallowEqual(nextMergedProps, this.mergedProps)) {
					return false;
				}

				this.mergedProps = nextMergedProps;
				return true;
			};

			Connect.prototype.isSubscribed = function isSubscribed() {
				return typeof this.unsubscribe === 'function';
			};

			Connect.prototype.trySubscribe = function trySubscribe() {
				if (shouldSubscribe && !this.unsubscribe) {
					this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
					this.handleChange();
				}
			};

			Connect.prototype.tryUnsubscribe = function tryUnsubscribe() {
				if (this.unsubscribe) {
					this.unsubscribe();
					this.unsubscribe = null;
				}
			};

			Connect.prototype.componentDidMount = function componentDidMount() {
				this.trySubscribe();
			};

			Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
				if (!pure || !shallowEqual(nextProps, this.props)) {
					this.haveOwnPropsChanged = true;
				}
			};

			Connect.prototype.componentWillUnmount = function componentWillUnmount() {
				this.tryUnsubscribe();
				this.clearCache();
			};

			Connect.prototype.clearCache = function clearCache() {
				this.dispatchProps = null;
				this.stateProps = null;
				this.mergedProps = null;
				this.haveOwnPropsChanged = true;
				this.hasStoreStateChanged = true;
				this.haveStatePropsBeenPrecalculated = false;
				this.statePropsPrecalculationError = null;
				this.renderedElement = null;
				this.finalMapDispatchToProps = null;
				this.finalMapStateToProps = null;
			};

			Connect.prototype.handleChange = function handleChange() {
				if (!this.unsubscribe) {
					return;
				}

				var storeState = this.store.getState();
				var prevStoreState = this.state.storeState;
				if (pure && prevStoreState === storeState) {
					return;
				}

				if (pure && !this.doStatePropsDependOnOwnProps) {
					var haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this);
					if (!haveStatePropsChanged) {
						return;
					}
					if (haveStatePropsChanged === errorObject) {
						this.statePropsPrecalculationError = errorObject.value;
					}
					this.haveStatePropsBeenPrecalculated = true;
				}

				this.hasStoreStateChanged = true;
				this.setState({ storeState: storeState });
			};

			Connect.prototype.getWrappedInstance = function getWrappedInstance() {
				invariant(withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the connect() call.');

				return this.refs.wrappedInstance;
			};

			Connect.prototype.render = function render() {
				var haveOwnPropsChanged = this.haveOwnPropsChanged,
						hasStoreStateChanged = this.hasStoreStateChanged,
						haveStatePropsBeenPrecalculated = this.haveStatePropsBeenPrecalculated,
						statePropsPrecalculationError = this.statePropsPrecalculationError,
						renderedElement = this.renderedElement;


				this.haveOwnPropsChanged = false;
				this.hasStoreStateChanged = false;
				this.haveStatePropsBeenPrecalculated = false;
				this.statePropsPrecalculationError = null;

				if (statePropsPrecalculationError) {
					throw statePropsPrecalculationError;
				}

				var shouldUpdateStateProps = true;
				var shouldUpdateDispatchProps = true;
				if (pure && renderedElement) {
					shouldUpdateStateProps = hasStoreStateChanged || haveOwnPropsChanged && this.doStatePropsDependOnOwnProps;
					shouldUpdateDispatchProps = haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps;
				}

				var haveStatePropsChanged = false;
				var haveDispatchPropsChanged = false;
				if (haveStatePropsBeenPrecalculated) {
					haveStatePropsChanged = true;
				} else if (shouldUpdateStateProps) {
					haveStatePropsChanged = this.updateStatePropsIfNeeded();
				}
				if (shouldUpdateDispatchProps) {
					haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded();
				}

				var haveMergedPropsChanged = true;
				if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) {
					haveMergedPropsChanged = this.updateMergedPropsIfNeeded();
				} else {
					haveMergedPropsChanged = false;
				}

				if (!haveMergedPropsChanged && renderedElement) {
					return renderedElement;
				}

				if (withRef) {
					this.renderedElement = h(WrappedComponent, _extends({}, this.mergedProps, {
						ref: 'wrappedInstance'
					}));
				} else {
					this.renderedElement = h(WrappedComponent, this.mergedProps);
				}

				return this.renderedElement;
			};

			return Connect;
		}(Component);

		Connect.displayName = connectDisplayName;
		Connect.WrappedComponent = WrappedComponent;
		Connect.contextTypes = {
			store: storeShape
		};


		return index(Connect, WrappedComponent);
	};
}



var lib$1 = {
	Provider: Provider,
	connect: connect
};

export default lib$1;
//# sourceMappingURL=preact-redux.esm.js.map
