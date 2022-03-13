var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// node_modules/env-var/lib/env-error.js
var require_env_error = __commonJS({
  "node_modules/env-var/lib/env-error.js"(exports, module2) {
    "use strict";
    var EnvVarError = class extends Error {
      constructor(message, ...params) {
        super(`env-var: ${message}`, ...params);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, EnvVarError);
        }
        this.name = "EnvVarError";
      }
    };
    module2.exports = EnvVarError;
  }
});

// node_modules/env-var/lib/accessors/string.js
var require_string = __commonJS({
  "node_modules/env-var/lib/accessors/string.js"(exports, module2) {
    "use strict";
    module2.exports = function asString(value) {
      return value;
    };
  }
});

// node_modules/env-var/lib/accessors/array.js
var require_array = __commonJS({
  "node_modules/env-var/lib/accessors/array.js"(exports, module2) {
    "use strict";
    var asString = require_string();
    module2.exports = function asArray(value, delimiter) {
      delimiter = delimiter || ",";
      if (!value.length) {
        return [];
      } else {
        return asString(value).split(delimiter).filter(Boolean);
      }
    };
  }
});

// node_modules/env-var/lib/accessors/bool-strict.js
var require_bool_strict = __commonJS({
  "node_modules/env-var/lib/accessors/bool-strict.js"(exports, module2) {
    "use strict";
    module2.exports = function asBoolStrict(value) {
      const val = value.toLowerCase();
      if (val !== "false" && val !== "true") {
        throw new Error('should be either "true", "false", "TRUE", or "FALSE"');
      }
      return val !== "false";
    };
  }
});

// node_modules/env-var/lib/accessors/bool.js
var require_bool = __commonJS({
  "node_modules/env-var/lib/accessors/bool.js"(exports, module2) {
    "use strict";
    module2.exports = function asBool(value) {
      const val = value.toLowerCase();
      const allowedValues = [
        "false",
        "0",
        "true",
        "1"
      ];
      if (allowedValues.indexOf(val) === -1) {
        throw new Error('should be either "true", "false", "TRUE", "FALSE", 1, or 0');
      }
      return !(val === "0" || val === "false");
    };
  }
});

// node_modules/env-var/lib/accessors/int.js
var require_int = __commonJS({
  "node_modules/env-var/lib/accessors/int.js"(exports, module2) {
    "use strict";
    module2.exports = function asInt(value) {
      const n = parseInt(value, 10);
      if (isNaN(n) || n.toString(10) !== value) {
        throw new Error("should be a valid integer");
      }
      return n;
    };
  }
});

// node_modules/env-var/lib/accessors/int-positive.js
var require_int_positive = __commonJS({
  "node_modules/env-var/lib/accessors/int-positive.js"(exports, module2) {
    "use strict";
    var asInt = require_int();
    module2.exports = function asIntPositive(value) {
      const ret = asInt(value);
      if (ret < 0) {
        throw new Error("should be a positive integer");
      }
      return ret;
    };
  }
});

// node_modules/env-var/lib/accessors/port.js
var require_port = __commonJS({
  "node_modules/env-var/lib/accessors/port.js"(exports, module2) {
    "use strict";
    var asIntPositive = require_int_positive();
    module2.exports = function asPortNumber(value) {
      var ret = asIntPositive(value);
      if (ret > 65535) {
        throw new Error("cannot assign a port number greater than 65535");
      }
      return ret;
    };
  }
});

// node_modules/env-var/lib/accessors/enum.js
var require_enum = __commonJS({
  "node_modules/env-var/lib/accessors/enum.js"(exports, module2) {
    "use strict";
    var asString = require_string();
    module2.exports = function asEnum(value, validValues) {
      const valueString = asString(value);
      if (validValues.indexOf(valueString) < 0) {
        throw new Error(`should be one of [${validValues.join(", ")}]`);
      }
      return valueString;
    };
  }
});

// node_modules/env-var/lib/accessors/float.js
var require_float = __commonJS({
  "node_modules/env-var/lib/accessors/float.js"(exports, module2) {
    "use strict";
    module2.exports = function asFloat(value) {
      const n = parseFloat(value);
      if (isNaN(n) || n.toString() !== value) {
        throw new Error("should be a valid float");
      }
      return n;
    };
  }
});

// node_modules/env-var/lib/accessors/float-negative.js
var require_float_negative = __commonJS({
  "node_modules/env-var/lib/accessors/float-negative.js"(exports, module2) {
    "use strict";
    var asFloat = require_float();
    module2.exports = function asFloatNegative(value) {
      const ret = asFloat(value);
      if (ret > 0) {
        throw new Error("should be a negative float");
      }
      return ret;
    };
  }
});

// node_modules/env-var/lib/accessors/float-positive.js
var require_float_positive = __commonJS({
  "node_modules/env-var/lib/accessors/float-positive.js"(exports, module2) {
    "use strict";
    var asFloat = require_float();
    module2.exports = function asFloatPositive(value) {
      const ret = asFloat(value);
      if (ret < 0) {
        throw new Error("should be a positive float");
      }
      return ret;
    };
  }
});

// node_modules/env-var/lib/accessors/int-negative.js
var require_int_negative = __commonJS({
  "node_modules/env-var/lib/accessors/int-negative.js"(exports, module2) {
    "use strict";
    var asInt = require_int();
    module2.exports = function asIntNegative(value) {
      const ret = asInt(value);
      if (ret > 0) {
        throw new Error("should be a negative integer");
      }
      return ret;
    };
  }
});

// node_modules/env-var/lib/accessors/json.js
var require_json = __commonJS({
  "node_modules/env-var/lib/accessors/json.js"(exports, module2) {
    "use strict";
    module2.exports = function asJson(value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        throw new Error("should be valid (parseable) JSON");
      }
    };
  }
});

// node_modules/env-var/lib/accessors/json-array.js
var require_json_array = __commonJS({
  "node_modules/env-var/lib/accessors/json-array.js"(exports, module2) {
    "use strict";
    var asJson = require_json();
    module2.exports = function asJsonArray(value) {
      var ret = asJson(value);
      if (!Array.isArray(ret)) {
        throw new Error("should be a parseable JSON Array");
      }
      return ret;
    };
  }
});

// node_modules/env-var/lib/accessors/json-object.js
var require_json_object = __commonJS({
  "node_modules/env-var/lib/accessors/json-object.js"(exports, module2) {
    "use strict";
    var asJson = require_json();
    module2.exports = function asJsonObject(value) {
      var ret = asJson(value);
      if (Array.isArray(ret)) {
        throw new Error("should be a parseable JSON Object");
      }
      return ret;
    };
  }
});

// node_modules/env-var/lib/accessors/regexp.js
var require_regexp = __commonJS({
  "node_modules/env-var/lib/accessors/regexp.js"(exports, module2) {
    "use strict";
    module2.exports = function asRegExp(value, flags) {
      try {
        RegExp(void 0, flags);
      } catch (err) {
        throw new Error("invalid regexp flags");
      }
      try {
        return new RegExp(value, flags);
      } catch (err) {
        throw new Error("should be a valid regexp");
      }
    };
  }
});

// node_modules/env-var/lib/accessors/url-object.js
var require_url_object = __commonJS({
  "node_modules/env-var/lib/accessors/url-object.js"(exports, module2) {
    "use strict";
    var asString = require_string();
    module2.exports = function asUrlObject(value) {
      const ret = asString(value);
      try {
        return new URL(ret);
      } catch (e) {
        throw new Error("should be a valid URL");
      }
    };
  }
});

// node_modules/env-var/lib/accessors/url-string.js
var require_url_string = __commonJS({
  "node_modules/env-var/lib/accessors/url-string.js"(exports, module2) {
    "use strict";
    var urlObject = require_url_object();
    module2.exports = function asUrlString(value) {
      return urlObject(value).toString();
    };
  }
});

// node_modules/env-var/lib/accessors/index.js
var require_accessors = __commonJS({
  "node_modules/env-var/lib/accessors/index.js"(exports, module2) {
    module2.exports = {
      asArray: require_array(),
      asBoolStrict: require_bool_strict(),
      asBool: require_bool(),
      asPortNumber: require_port(),
      asEnum: require_enum(),
      asFloatNegative: require_float_negative(),
      asFloatPositive: require_float_positive(),
      asFloat: require_float(),
      asIntNegative: require_int_negative(),
      asIntPositive: require_int_positive(),
      asInt: require_int(),
      asJsonArray: require_json_array(),
      asJsonObject: require_json_object(),
      asJson: require_json(),
      asRegExp: require_regexp(),
      asString: require_string(),
      asUrlObject: require_url_object(),
      asUrlString: require_url_string()
    };
  }
});

// node_modules/env-var/lib/variable.js
var require_variable = __commonJS({
  "node_modules/env-var/lib/variable.js"(exports, module2) {
    "use strict";
    var EnvVarError = require_env_error();
    var base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
    module2.exports = function getVariableAccessors(container, varName, extraAccessors, logger) {
      let isBase64 = false;
      let isRequired = false;
      let defValue;
      let example;
      const builtInAccessors = require_accessors();
      function log(str) {
        logger(varName, str);
      }
      function raiseError(value, msg) {
        let errMsg = `"${varName}" ${msg}`;
        if (value) {
          errMsg = `${errMsg}`;
        }
        if (example) {
          errMsg = `${errMsg}. An example of a valid value would be: ${example}`;
        }
        throw new EnvVarError(errMsg);
      }
      function generateAccessor(accessor) {
        return function() {
          let value = container[varName];
          log(`will be read from the environment using "${accessor.name}" accessor`);
          if (typeof value === "undefined") {
            if (typeof defValue === "undefined" && isRequired) {
              log("was not found in the environment, but is required to be set");
              raiseError(void 0, "is a required variable, but it was not set");
            } else if (typeof defValue !== "undefined") {
              log(`was not found in the environment, parsing default value "${defValue}" instead`);
              value = defValue;
            } else {
              log("was not found in the environment, but is not required. returning undefined");
              return void 0;
            }
          }
          if (isRequired) {
            log("verifying variable value is not an empty string");
            if (value.trim().length === 0) {
              raiseError(void 0, "is a required variable, but its value was empty");
            }
          }
          if (isBase64) {
            log("verifying variable is a valid base64 string");
            if (!value.match(base64Regex)) {
              raiseError(value, "should be a valid base64 string if using convertFromBase64");
            }
            log("converting from base64 to utf8 string");
            value = Buffer.from(value, "base64").toString();
          }
          const args = [value].concat(Array.prototype.slice.call(arguments));
          try {
            log(`passing value "${value}" to "${accessor.name}" accessor`);
            const result = accessor.apply(accessor, args);
            log(`parsed successfully, returning ${result}`);
            return result;
          } catch (error) {
            raiseError(value, error.message);
          }
        };
      }
      const accessors = {
        convertFromBase64: function() {
          log("marking for base64 conversion");
          isBase64 = true;
          return accessors;
        },
        default: function(value) {
          if (typeof value === "number") {
            defValue = value.toString();
          } else if (Array.isArray(value) || typeof value === "object" && value !== null) {
            defValue = JSON.stringify(value);
          } else if (typeof value !== "string") {
            throw new EnvVarError("values passed to default() must be of Number, String, Array, or Object type");
          } else {
            defValue = value;
          }
          log(`setting default value to "${defValue}"`);
          return accessors;
        },
        required: function(required) {
          if (typeof required === "undefined") {
            log("marked as required");
            isRequired = true;
          } else {
            log(`setting required flag to ${required}`);
            isRequired = required;
          }
          return accessors;
        },
        example: function(ex) {
          example = ex;
          return accessors;
        }
      };
      Object.entries({
        ...builtInAccessors,
        ...extraAccessors
      }).forEach(([name, accessor]) => {
        accessors[name] = generateAccessor(accessor);
      });
      return accessors;
    };
  }
});

// node_modules/env-var/lib/logger.js
var require_logger = __commonJS({
  "node_modules/env-var/lib/logger.js"(exports, module2) {
    "use strict";
    module2.exports = function genLogger(out, prodFlag) {
      return function envVarLogger(varname, str) {
        if (!prodFlag || !prodFlag.match(/prod|production/)) {
          out(`env-var (${varname}): ${str}`);
        }
      };
    };
  }
});

// node_modules/env-var/env-var.js
var require_env_var = __commonJS({
  "node_modules/env-var/env-var.js"(exports, module2) {
    "use strict";
    var variable = require_variable();
    var EnvVarError = require_env_error();
    var from = (container, extraAccessors, logger) => {
      return {
        from,
        EnvVarError: require_env_error(),
        get: function(variableName) {
          if (!variableName) {
            return container;
          }
          if (arguments.length > 1) {
            throw new EnvVarError("It looks like you passed more than one argument to env.get(). Since env-var@6.0.0 this is no longer supported. To set a default value use env.get(TARGET).default(DEFAULT)");
          }
          return variable(container, variableName, extraAccessors || {}, logger || function noopLogger() {
          });
        },
        accessors: require_accessors(),
        logger: require_logger()(console.log, container.NODE_ENV)
      };
    };
    module2.exports = from(process.env);
  }
});

// node_modules/uuid/dist/rng.js
var require_rng = __commonJS({
  "node_modules/uuid/dist/rng.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = rng;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var rnds8Pool = new Uint8Array(256);
    var poolPtr = rnds8Pool.length;
    function rng() {
      if (poolPtr > rnds8Pool.length - 16) {
        _crypto.default.randomFillSync(rnds8Pool);
        poolPtr = 0;
      }
      return rnds8Pool.slice(poolPtr, poolPtr += 16);
    }
  }
});

// node_modules/uuid/dist/regex.js
var require_regex = __commonJS({
  "node_modules/uuid/dist/regex.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/validate.js
var require_validate = __commonJS({
  "node_modules/uuid/dist/validate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _regex = _interopRequireDefault(require_regex());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function validate(uuid) {
      return typeof uuid === "string" && _regex.default.test(uuid);
    }
    var _default = validate;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/stringify.js
var require_stringify = __commonJS({
  "node_modules/uuid/dist/stringify.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).substr(1));
    }
    function stringify(arr, offset = 0) {
      const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Stringified UUID is invalid");
      }
      return uuid;
    }
    var _default = stringify;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v1.js
var require_v1 = __commonJS({
  "node_modules/uuid/dist/v1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = _interopRequireDefault(require_stringify());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _nodeId;
    var _clockseq;
    var _lastMSecs = 0;
    var _lastNSecs = 0;
    function v1(options, buf, offset) {
      let i = buf && offset || 0;
      const b = buf || new Array(16);
      options = options || {};
      let node = options.node || _nodeId;
      let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
      if (node == null || clockseq == null) {
        const seedBytes = options.random || (options.rng || _rng.default)();
        if (node == null) {
          node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
        }
        if (clockseq == null) {
          clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
        }
      }
      let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
      let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
      const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
      if (dt < 0 && options.clockseq === void 0) {
        clockseq = clockseq + 1 & 16383;
      }
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
        nsecs = 0;
      }
      if (nsecs >= 1e4) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      }
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
      msecs += 122192928e5;
      const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
      b[i++] = tl >>> 24 & 255;
      b[i++] = tl >>> 16 & 255;
      b[i++] = tl >>> 8 & 255;
      b[i++] = tl & 255;
      const tmh = msecs / 4294967296 * 1e4 & 268435455;
      b[i++] = tmh >>> 8 & 255;
      b[i++] = tmh & 255;
      b[i++] = tmh >>> 24 & 15 | 16;
      b[i++] = tmh >>> 16 & 255;
      b[i++] = clockseq >>> 8 | 128;
      b[i++] = clockseq & 255;
      for (let n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }
      return buf || (0, _stringify.default)(b);
    }
    var _default = v1;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/parse.js
var require_parse = __commonJS({
  "node_modules/uuid/dist/parse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function parse(uuid) {
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Invalid UUID");
      }
      let v;
      const arr = new Uint8Array(16);
      arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
      arr[1] = v >>> 16 & 255;
      arr[2] = v >>> 8 & 255;
      arr[3] = v & 255;
      arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
      arr[5] = v & 255;
      arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
      arr[7] = v & 255;
      arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
      arr[9] = v & 255;
      arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
      arr[11] = v / 4294967296 & 255;
      arr[12] = v >>> 24 & 255;
      arr[13] = v >>> 16 & 255;
      arr[14] = v >>> 8 & 255;
      arr[15] = v & 255;
      return arr;
    }
    var _default = parse;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v35.js
var require_v35 = __commonJS({
  "node_modules/uuid/dist/v35.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    exports.URL = exports.DNS = void 0;
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function stringToBytes(str) {
      str = unescape(encodeURIComponent(str));
      const bytes = [];
      for (let i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
      }
      return bytes;
    }
    var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    exports.DNS = DNS;
    var URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    exports.URL = URL2;
    function _default(name, version, hashfunc) {
      function generateUUID(value, namespace, buf, offset) {
        if (typeof value === "string") {
          value = stringToBytes(value);
        }
        if (typeof namespace === "string") {
          namespace = (0, _parse.default)(namespace);
        }
        if (namespace.length !== 16) {
          throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
        }
        let bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 15 | version;
        bytes[8] = bytes[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
          }
          return buf;
        }
        return (0, _stringify.default)(bytes);
      }
      try {
        generateUUID.name = name;
      } catch (err) {
      }
      generateUUID.DNS = DNS;
      generateUUID.URL = URL2;
      return generateUUID;
    }
  }
});

// node_modules/uuid/dist/md5.js
var require_md5 = __commonJS({
  "node_modules/uuid/dist/md5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function md5(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === "string") {
        bytes = Buffer.from(bytes, "utf8");
      }
      return _crypto.default.createHash("md5").update(bytes).digest();
    }
    var _default = md5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v3.js
var require_v3 = __commonJS({
  "node_modules/uuid/dist/v3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _md = _interopRequireDefault(require_md5());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v3 = (0, _v.default)("v3", 48, _md.default);
    var _default = v3;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v4.js
var require_v4 = __commonJS({
  "node_modules/uuid/dist/v4.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = _interopRequireDefault(require_stringify());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function v4(options, buf, offset) {
      options = options || {};
      const rnds = options.random || (options.rng || _rng.default)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        offset = offset || 0;
        for (let i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }
        return buf;
      }
      return (0, _stringify.default)(rnds);
    }
    var _default = v4;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/sha1.js
var require_sha1 = __commonJS({
  "node_modules/uuid/dist/sha1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function sha1(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === "string") {
        bytes = Buffer.from(bytes, "utf8");
      }
      return _crypto.default.createHash("sha1").update(bytes).digest();
    }
    var _default = sha1;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v5.js
var require_v5 = __commonJS({
  "node_modules/uuid/dist/v5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _sha = _interopRequireDefault(require_sha1());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v5 = (0, _v.default)("v5", 80, _sha.default);
    var _default = v5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/nil.js
var require_nil = __commonJS({
  "node_modules/uuid/dist/nil.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = "00000000-0000-0000-0000-000000000000";
    exports.default = _default;
  }
});

// node_modules/uuid/dist/version.js
var require_version = __commonJS({
  "node_modules/uuid/dist/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function version(uuid) {
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Invalid UUID");
      }
      return parseInt(uuid.substr(14, 1), 16);
    }
    var _default = version;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/index.js
var require_dist = __commonJS({
  "node_modules/uuid/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "v1", {
      enumerable: true,
      get: function() {
        return _v.default;
      }
    });
    Object.defineProperty(exports, "v3", {
      enumerable: true,
      get: function() {
        return _v2.default;
      }
    });
    Object.defineProperty(exports, "v4", {
      enumerable: true,
      get: function() {
        return _v3.default;
      }
    });
    Object.defineProperty(exports, "v5", {
      enumerable: true,
      get: function() {
        return _v4.default;
      }
    });
    Object.defineProperty(exports, "NIL", {
      enumerable: true,
      get: function() {
        return _nil.default;
      }
    });
    Object.defineProperty(exports, "version", {
      enumerable: true,
      get: function() {
        return _version.default;
      }
    });
    Object.defineProperty(exports, "validate", {
      enumerable: true,
      get: function() {
        return _validate.default;
      }
    });
    Object.defineProperty(exports, "stringify", {
      enumerable: true,
      get: function() {
        return _stringify.default;
      }
    });
    Object.defineProperty(exports, "parse", {
      enumerable: true,
      get: function() {
        return _parse.default;
      }
    });
    var _v = _interopRequireDefault(require_v1());
    var _v2 = _interopRequireDefault(require_v3());
    var _v3 = _interopRequireDefault(require_v4());
    var _v4 = _interopRequireDefault(require_v5());
    var _nil = _interopRequireDefault(require_nil());
    var _version = _interopRequireDefault(require_version());
    var _validate = _interopRequireDefault(require_validate());
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// node_modules/hyperid/uuid.js
var require_uuid = __commonJS({
  "node_modules/hyperid/uuid.js"(exports, module2) {
    "use strict";
    var uuid = require_dist();
    var crypto = require("crypto");
    module2.exports = typeof crypto.randomUUID === "function" ? crypto.randomUUID : uuid.v4;
  }
});

// node_modules/uuid-parse/uuid-parse.js
var require_uuid_parse = __commonJS({
  "node_modules/uuid-parse/uuid-parse.js"(exports, module2) {
    "use strict";
    var _byteToHex = [];
    var _hexToByte = {};
    for (i = 0; i < 256; i++) {
      _byteToHex[i] = (i + 256).toString(16).substr(1);
      _hexToByte[_byteToHex[i]] = i;
    }
    var i;
    function parse(s, buf, offset) {
      var i2 = buf && offset || 0;
      var ii = 0;
      buf = buf || [];
      s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
        if (ii < 16) {
          buf[i2 + ii++] = _hexToByte[oct];
        }
      });
      while (ii < 16) {
        buf[i2 + ii++] = 0;
      }
      return buf;
    }
    function unparse(buf, offset) {
      var i2 = offset || 0;
      var bth = _byteToHex;
      return bth[buf[i2++]] + bth[buf[i2++]] + bth[buf[i2++]] + bth[buf[i2++]] + "-" + bth[buf[i2++]] + bth[buf[i2++]] + "-" + bth[buf[i2++]] + bth[buf[i2++]] + "-" + bth[buf[i2++]] + bth[buf[i2++]] + "-" + bth[buf[i2++]] + bth[buf[i2++]] + bth[buf[i2++]] + bth[buf[i2++]] + bth[buf[i2++]] + bth[buf[i2++]];
    }
    module2.exports = {
      parse,
      unparse
    };
  }
});

// node_modules/hyperid/hyperid.js
var require_hyperid = __commonJS({
  "node_modules/hyperid/hyperid.js"(exports, module2) {
    "use strict";
    var uuidv4 = require_uuid();
    var parser = require_uuid_parse();
    var maxInt = Math.pow(2, 31) - 1;
    var Buffer2 = require("buffer").Buffer;
    function hyperid2(opts) {
      let fixedLength = false;
      let urlSafe = false;
      if (typeof opts === "boolean") {
        fixedLength = opts;
      } else {
        opts = opts || {};
        urlSafe = !!opts.urlSafe;
        fixedLength = !!opts.fixedLength;
      }
      generate.uuid = uuidv4();
      generate.decode = decode;
      let id = baseId(generate.uuid, urlSafe);
      let count = Math.floor(opts.startFrom || 0);
      if (isNaN(count) || !(maxInt > count && count >= 0)) {
        throw new Error([
          `when passed, opts.startFrom must be a number between 0 and ${maxInt}.`,
          "Only the integer part matters.",
          `- got: ${opts.startFrom}`
        ].join("\n"));
      }
      return generate;
      function generate() {
        const result = fixedLength ? id + pad(count++) : id + count++;
        if (count === maxInt) {
          generate.uuid = uuidv4();
          id = baseId(generate.uuid, urlSafe);
          count = 0;
        }
        return result;
      }
    }
    function pad(count) {
      if (count < 10)
        return "000000000" + count;
      if (count < 100)
        return "00000000" + count;
      if (count < 1e3)
        return "0000000" + count;
      if (count < 1e4)
        return "000000" + count;
      if (count < 1e5)
        return "00000" + count;
      if (count < 1e6)
        return "0000" + count;
      if (count < 1e7)
        return "000" + count;
      if (count < 1e8)
        return "00" + count;
      if (count < 1e9)
        return "0" + count;
      return count;
    }
    function baseId(id, urlSafe) {
      let base64Id = Buffer2.from(parser.parse(id)).toString("base64");
      const l = base64Id.length;
      if (urlSafe) {
        if (base64Id[l - 2] === "=" && base64Id[l - 1] === "=") {
          base64Id = base64Id.substr(0, l - 2) + "-";
        }
        return base64Id.replace(/\+/g, "-").replace(/\//g, "_");
      }
      if (base64Id[l - 2] === "=" && base64Id[l - 1] === "=") {
        return base64Id.substr(0, l - 2) + "/";
      }
      return base64Id;
    }
    function decode(id, opts) {
      opts = opts || {};
      const urlSafe = !!opts.urlSafe;
      if (urlSafe) {
        id = id.replace(/-([^-]*)$/, "/$1").replace(/-/g, "+").replace(/_/g, "/");
      }
      const lastSlashIndex = id.lastIndexOf("/");
      if (lastSlashIndex === -1) {
        return null;
      }
      const uuidPart = id.substring(0, lastSlashIndex);
      const countPart = Number(id.substring(lastSlashIndex + 1));
      if (!uuidPart || isNaN(countPart)) {
        return null;
      }
      const result = {
        uuid: parser.unparse(Buffer2.from(uuidPart + "==", "base64")),
        count: countPart
      };
      return result;
    }
    module2.exports = hyperid2;
    module2.exports.decode = decode;
  }
});

// node_modules/@middy/core/index.js
var require_core = __commonJS({
  "node_modules/@middy/core/index.js"(exports, module2) {
    "use strict";
    var middy2 = (baseHandler = () => {
    }, plugin) => {
      var _plugin$beforePrefetc;
      plugin === null || plugin === void 0 ? void 0 : (_plugin$beforePrefetc = plugin.beforePrefetch) === null || _plugin$beforePrefetc === void 0 ? void 0 : _plugin$beforePrefetc.call(plugin);
      const beforeMiddlewares = [];
      const afterMiddlewares = [];
      const onErrorMiddlewares = [];
      const instance = (event = {}, context = {}) => {
        var _plugin$requestStart;
        plugin === null || plugin === void 0 ? void 0 : (_plugin$requestStart = plugin.requestStart) === null || _plugin$requestStart === void 0 ? void 0 : _plugin$requestStart.call(plugin);
        const request = {
          event,
          context,
          response: void 0,
          error: void 0,
          internal: {}
        };
        return runRequest(request, [...beforeMiddlewares], baseHandler, [...afterMiddlewares], [...onErrorMiddlewares], plugin);
      };
      instance.use = (middlewares) => {
        if (Array.isArray(middlewares)) {
          for (const middleware of middlewares) {
            instance.applyMiddleware(middleware);
          }
          return instance;
        }
        return instance.applyMiddleware(middlewares);
      };
      instance.applyMiddleware = (middleware) => {
        const {
          before,
          after,
          onError
        } = middleware;
        if (!before && !after && !onError) {
          throw new Error('Middleware must be an object containing at least one key among "before", "after", "onError"');
        }
        if (before)
          instance.before(before);
        if (after)
          instance.after(after);
        if (onError)
          instance.onError(onError);
        return instance;
      };
      instance.before = (beforeMiddleware) => {
        beforeMiddlewares.push(beforeMiddleware);
        return instance;
      };
      instance.after = (afterMiddleware) => {
        afterMiddlewares.unshift(afterMiddleware);
        return instance;
      };
      instance.onError = (onErrorMiddleware) => {
        onErrorMiddlewares.push(onErrorMiddleware);
        return instance;
      };
      instance.__middlewares = {
        before: beforeMiddlewares,
        after: afterMiddlewares,
        onError: onErrorMiddlewares
      };
      return instance;
    };
    var runRequest = async (request, beforeMiddlewares, baseHandler, afterMiddlewares, onErrorMiddlewares, plugin) => {
      try {
        await runMiddlewares(request, beforeMiddlewares, plugin);
        if (request.response === void 0) {
          var _plugin$beforeHandler, _plugin$afterHandler;
          plugin === null || plugin === void 0 ? void 0 : (_plugin$beforeHandler = plugin.beforeHandler) === null || _plugin$beforeHandler === void 0 ? void 0 : _plugin$beforeHandler.call(plugin);
          request.response = await baseHandler(request.event, request.context);
          plugin === null || plugin === void 0 ? void 0 : (_plugin$afterHandler = plugin.afterHandler) === null || _plugin$afterHandler === void 0 ? void 0 : _plugin$afterHandler.call(plugin);
          await runMiddlewares(request, afterMiddlewares, plugin);
        }
      } catch (e) {
        request.response = void 0;
        request.error = e;
        try {
          await runMiddlewares(request, onErrorMiddlewares, plugin);
        } catch (e2) {
          e2.originalError = request.error;
          request.error = e2;
          throw request.error;
        }
        if (request.response === void 0)
          throw request.error;
      } finally {
        var _plugin$requestEnd;
        await (plugin === null || plugin === void 0 ? void 0 : (_plugin$requestEnd = plugin.requestEnd) === null || _plugin$requestEnd === void 0 ? void 0 : _plugin$requestEnd.call(plugin, request));
      }
      return request.response;
    };
    var runMiddlewares = async (request, middlewares, plugin) => {
      for (const nextMiddleware of middlewares) {
        var _plugin$beforeMiddlew, _plugin$afterMiddlewa;
        plugin === null || plugin === void 0 ? void 0 : (_plugin$beforeMiddlew = plugin.beforeMiddleware) === null || _plugin$beforeMiddlew === void 0 ? void 0 : _plugin$beforeMiddlew.call(plugin, nextMiddleware === null || nextMiddleware === void 0 ? void 0 : nextMiddleware.name);
        const res = await (nextMiddleware === null || nextMiddleware === void 0 ? void 0 : nextMiddleware(request));
        plugin === null || plugin === void 0 ? void 0 : (_plugin$afterMiddlewa = plugin.afterMiddleware) === null || _plugin$afterMiddlewa === void 0 ? void 0 : _plugin$afterMiddlewa.call(plugin, nextMiddleware === null || nextMiddleware === void 0 ? void 0 : nextMiddleware.name);
        if (res !== void 0) {
          request.response = res;
          return;
        }
      }
    };
    module2.exports = middy2;
  }
});

// node_modules/@middy/http-header-normalizer/index.js
var require_http_header_normalizer = __commonJS({
  "node_modules/@middy/http-header-normalizer/index.js"(exports, module2) {
    "use strict";
    var exceptionsList = ["ALPN", "C-PEP", "C-PEP-Info", "CalDAV-Timezones", "Content-ID", "Content-MD5", "DASL", "DAV", "DNT", "ETag", "GetProfile", "HTTP2-Settings", "Last-Event-ID", "MIME-Version", "Optional-WWW-Authenticate", "Sec-WebSocket-Accept", "Sec-WebSocket-Extensions", "Sec-WebSocket-Key", "Sec-WebSocket-Protocol", "Sec-WebSocket-Version", "SLUG", "TCN", "TE", "TTL", "WWW-Authenticate", "X-ATT-DeviceId", "X-DNSPrefetch-Control", "X-UIDH"];
    var exceptions = exceptionsList.reduce((acc, curr) => {
      acc[curr.toLowerCase()] = curr;
      return acc;
    }, {});
    var normalizeHeaderKey = (key, canonical) => {
      if (exceptions[key.toLowerCase()]) {
        return exceptions[key.toLowerCase()];
      }
      if (!canonical) {
        return key.toLowerCase();
      }
      return key.split("-").map((text) => text[0].toUpperCase() + text.substr(1).toLowerCase()).join("-");
    };
    var defaults = {
      canonical: false,
      normalizeHeaderKey
    };
    var httpHeaderNormalizerMiddleware = (opts = {}) => {
      const options = {
        ...defaults,
        ...opts
      };
      const httpHeaderNormalizerMiddlewareBefore = async (request) => {
        if (request.event.headers) {
          const rawHeaders = {};
          const headers = {};
          Object.keys(request.event.headers).forEach((key) => {
            rawHeaders[key] = request.event.headers[key];
            headers[options.normalizeHeaderKey(key, options.canonical)] = request.event.headers[key];
          });
          request.event.headers = headers;
          request.event.rawHeaders = rawHeaders;
        }
        if (request.event.multiValueHeaders) {
          const rawHeaders = {};
          const headers = {};
          Object.keys(request.event.multiValueHeaders).forEach((key) => {
            rawHeaders[key] = request.event.multiValueHeaders[key];
            headers[options.normalizeHeaderKey(key, options.canonical)] = request.event.multiValueHeaders[key];
          });
          request.event.multiValueHeaders = headers;
          request.event.rawMultiValueHeaders = rawHeaders;
        }
      };
      return {
        before: httpHeaderNormalizerMiddlewareBefore
      };
    };
    module2.exports = httpHeaderNormalizerMiddleware;
  }
});

// node_modules/@middy/util/codes.json
var require_codes = __commonJS({
  "node_modules/@middy/util/codes.json"(exports, module2) {
    module2.exports = {
      "100": "Continue",
      "101": "Switching Protocols",
      "102": "Processing",
      "103": "Early Hints",
      "200": "OK",
      "201": "Created",
      "202": "Accepted",
      "203": "Non-Authoritative Information",
      "204": "No Content",
      "205": "Reset Content",
      "206": "Partial Content",
      "207": "Multi-Status",
      "208": "Already Reported",
      "226": "IM Used",
      "300": "Multiple Choices",
      "301": "Moved Permanently",
      "302": "Found",
      "303": "See Other",
      "304": "Not Modified",
      "305": "Use Proxy",
      "306": "(Unused)",
      "307": "Temporary Redirect",
      "308": "Permanent Redirect",
      "400": "Bad Request",
      "401": "Unauthorized",
      "402": "Payment Required",
      "403": "Forbidden",
      "404": "Not Found",
      "405": "Method Not Allowed",
      "406": "Not Acceptable",
      "407": "Proxy Authentication Required",
      "408": "Request Timeout",
      "409": "Conflict",
      "410": "Gone",
      "411": "Length Required",
      "412": "Precondition Failed",
      "413": "Payload Too Large",
      "414": "URI Too Long",
      "415": "Unsupported Media Type",
      "416": "Range Not Satisfiable",
      "417": "Expectation Failed",
      "418": "I'm a teapot",
      "421": "Misdirected Request",
      "422": "Unprocessable Entity",
      "423": "Locked",
      "424": "Failed Dependency",
      "425": "Unordered Collection",
      "426": "Upgrade Required",
      "428": "Precondition Required",
      "429": "Too Many Requests",
      "431": "Request Header Fields Too Large",
      "451": "Unavailable For Legal Reasons",
      "500": "Internal Server Error",
      "501": "Not Implemented",
      "502": "Bad Gateway",
      "503": "Service Unavailable",
      "504": "Gateway Timeout",
      "505": "HTTP Version Not Supported",
      "506": "Variant Also Negotiates",
      "507": "Insufficient Storage",
      "508": "Loop Detected",
      "509": "Bandwidth Limit Exceeded",
      "510": "Not Extended",
      "511": "Network Authentication Required"
    };
  }
});

// node_modules/@middy/util/index.js
var require_util = __commonJS({
  "node_modules/@middy/util/index.js"(exports, module2) {
    "use strict";
    var {
      Agent
    } = require("https");
    var awsClientDefaultOptions = {
      httpOptions: {
        agent: new Agent({
          secureProtocol: "TLSv1_2_method"
        })
      }
    };
    var createPrefetchClient = (options) => {
      const awsClientOptions = {
        ...awsClientDefaultOptions,
        ...options.awsClientOptions
      };
      const client = new options.AwsClient(awsClientOptions);
      if (options.awsClientCapture) {
        return options.awsClientCapture(client);
      }
      return client;
    };
    var createClient = async (options, request) => {
      let awsClientCredentials = {};
      if (options.awsClientAssumeRole) {
        if (!request)
          throw new Error("Request required when assuming role");
        awsClientCredentials = await getInternal({
          credentials: options.awsClientAssumeRole
        }, request);
      }
      awsClientCredentials = {
        ...awsClientCredentials,
        ...options.awsClientOptions
      };
      return createPrefetchClient({
        ...options,
        awsClientOptions: awsClientCredentials
      });
    };
    var canPrefetch = (options) => {
      return !(options !== null && options !== void 0 && options.awsClientAssumeRole) && !(options !== null && options !== void 0 && options.disablePrefetch);
    };
    var getInternal = async (variables, request) => {
      if (!variables || !request)
        return {};
      let keys = [];
      let values = [];
      if (variables === true) {
        keys = values = Object.keys(request.internal);
      } else if (typeof variables === "string") {
        keys = values = [variables];
      } else if (Array.isArray(variables)) {
        keys = values = variables;
      } else if (typeof variables === "object") {
        keys = Object.keys(variables);
        values = Object.values(variables);
      }
      const promises = [];
      for (const internalKey of values) {
        var _valuePromise;
        const pathOptionKey = internalKey.split(".");
        const rootOptionKey = pathOptionKey.shift();
        let valuePromise = request.internal[rootOptionKey];
        if (typeof ((_valuePromise = valuePromise) === null || _valuePromise === void 0 ? void 0 : _valuePromise.then) !== "function") {
          valuePromise = Promise.resolve(valuePromise);
        }
        promises.push(valuePromise.then((value) => pathOptionKey.reduce((p, c) => p === null || p === void 0 ? void 0 : p[c], value)));
      }
      values = await Promise.allSettled(promises);
      const errors = values.filter((res) => res.status === "rejected").map((res) => res.reason.message);
      if (errors.length)
        throw new Error(JSON.stringify(errors));
      return keys.reduce((obj, key, index) => ({
        ...obj,
        [sanitizeKey(key)]: values[index].value
      }), {});
    };
    var sanitizeKeyPrefixLeadingNumber = /^([0-9])/;
    var sanitizeKeyRemoveDisallowedChar = /[^a-zA-Z0-9]+/g;
    var sanitizeKey = (key) => {
      return key.replace(sanitizeKeyPrefixLeadingNumber, "_$1").replace(sanitizeKeyRemoveDisallowedChar, "_");
    };
    var cache = {};
    var processCache = (options, fetch = () => void 0, request) => {
      const {
        cacheExpiry,
        cacheKey
      } = options;
      if (cacheExpiry) {
        const cached = getCache(cacheKey);
        const unexpired = cached && (cacheExpiry < 0 || cached.expiry > Date.now());
        if (unexpired && cached.modified) {
          const value2 = fetch(request, cached.value);
          cache[cacheKey] = {
            value: {
              ...cached.value,
              ...value2
            },
            expiry: cached.expiry
          };
          return cache[cacheKey];
        }
        if (unexpired) {
          return {
            ...cached,
            cache: true
          };
        }
      }
      const value = fetch(request);
      const expiry = Date.now() + cacheExpiry;
      if (cacheExpiry) {
        cache[cacheKey] = {
          value,
          expiry
        };
      }
      return {
        value,
        expiry
      };
    };
    var getCache = (key) => {
      return cache[key];
    };
    var modifyCache = (cacheKey, value) => {
      if (!cache[cacheKey])
        return;
      cache[cacheKey] = {
        ...cache[cacheKey],
        value,
        modified: true
      };
    };
    var clearCache = (keys = null) => {
      var _keys;
      keys = (_keys = keys) !== null && _keys !== void 0 ? _keys : Object.keys(cache);
      if (!Array.isArray(keys))
        keys = [keys];
      for (const cacheKey of keys) {
        cache[cacheKey] = void 0;
      }
    };
    var jsonSafeParse = (string, reviver) => {
      if (typeof string !== "string")
        return string;
      const firstChar = string[0];
      if (firstChar !== "{" && firstChar !== "[" && firstChar !== '"')
        return string;
      try {
        return JSON.parse(string, reviver);
      } catch (e) {
      }
      return string;
    };
    var normalizeHttpResponse = (response) => {
      var _response$headers, _response;
      if (response === void 0) {
        response = {};
      } else if (Array.isArray(response) || typeof response !== "object" || response === null) {
        response = {
          body: response
        };
      }
      response.headers = (_response$headers = (_response = response) === null || _response === void 0 ? void 0 : _response.headers) !== null && _response$headers !== void 0 ? _response$headers : {};
      return response;
    };
    var statuses = require_codes();
    var {
      inherits
    } = require("util");
    var createErrorRegexp = /[^a-zA-Z]/g;
    var createError = (code, message, properties = {}) => {
      const name = statuses[code].replace(createErrorRegexp, "");
      const className = name.substr(-5) !== "Error" ? name + "Error" : name;
      function HttpError(message2) {
        const msg = message2 !== null && message2 !== void 0 ? message2 : statuses[code];
        const err = new Error(msg);
        Error.captureStackTrace(err, HttpError);
        Object.setPrototypeOf(err, HttpError.prototype);
        Object.defineProperty(err, "message", {
          enumerable: true,
          configurable: true,
          value: msg,
          writable: true
        });
        Object.defineProperty(err, "name", {
          enumerable: false,
          configurable: true,
          value: className,
          writable: true
        });
        return err;
      }
      inherits(HttpError, Error);
      const desc = Object.getOwnPropertyDescriptor(HttpError, "name");
      desc.value = className;
      Object.defineProperty(HttpError, "name", desc);
      Object.assign(HttpError.prototype, {
        status: code,
        statusCode: code,
        expose: code < 500
      }, properties);
      return new HttpError(message);
    };
    module2.exports = {
      createPrefetchClient,
      createClient,
      canPrefetch,
      getInternal,
      sanitizeKey,
      processCache,
      getCache,
      modifyCache,
      clearCache,
      jsonSafeParse,
      normalizeHttpResponse,
      createError
    };
  }
});

// node_modules/@middy/http-json-body-parser/index.js
var require_http_json_body_parser = __commonJS({
  "node_modules/@middy/http-json-body-parser/index.js"(exports, module2) {
    "use strict";
    var mimePattern = /^application\/(.+\+)?json(;.*)?$/;
    var defaults = {
      reviver: void 0
    };
    var httpJsonBodyParserMiddleware = (opts = {}) => {
      const options = {
        ...defaults,
        ...opts
      };
      const httpJsonBodyParserMiddlewareBefore = async (request) => {
        var _headers$ContentType;
        const {
          headers,
          body
        } = request.event;
        const contentTypeHeader = (_headers$ContentType = headers === null || headers === void 0 ? void 0 : headers["Content-Type"]) !== null && _headers$ContentType !== void 0 ? _headers$ContentType : headers === null || headers === void 0 ? void 0 : headers["content-type"];
        if (mimePattern.test(contentTypeHeader)) {
          try {
            const data = request.event.isBase64Encoded ? Buffer.from(body, "base64").toString() : body;
            request.event.rawBody = body;
            request.event.body = JSON.parse(data, options.reviver);
          } catch (err) {
            const {
              createError
            } = require_util();
            throw createError(422, "Content type defined as JSON but an invalid JSON was provided");
          }
        }
      };
      return {
        before: httpJsonBodyParserMiddlewareBefore
      };
    };
    module2.exports = httpJsonBodyParserMiddleware;
  }
});

// handlers/getSecret.ts
var getSecret_exports = {};
__export(getSecret_exports, {
  handler: () => handler
});
var import_aws_sdk = require("aws-sdk");
var import_env_var = __toESM(require_env_var());

// adapters/ddbRepo.ts
var DdbRepo = class {
  constructor(ddbDocumentClient2, { tableName: tableName2 }) {
    this.createSecret = async (secret) => {
      await this.ddbDocumentClient.put({
        TableName: this.tableName,
        Item: secret,
        ConditionExpression: "attribute_not_exists(id)"
      }).promise();
      return secret;
    };
    this.deleteSecret = async (secretId) => {
      const { Attributes: item } = await this.ddbDocumentClient.delete({
        TableName: this.tableName,
        Key: { id: secretId },
        ReturnValues: "ALL_OLD"
      }).promise();
      return item;
    };
    this.ddbDocumentClient = ddbDocumentClient2;
    this.tableName = tableName2;
  }
};

// secrets/error.ts
var SecretError = class extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};
var SecretNotFoundError = class extends SecretError {
  constructor() {
    super("Secret not found");
  }
};

// secrets/secret.ts
var import_hyperid = __toESM(require_hyperid());
var generateId = (0, import_hyperid.default)({ urlSafe: true });
var _Secret = class {
  constructor(props) {
    this.id = props.id;
    this.createdAt = props.createdAt;
    this.expiresAt = props.expiresAt;
    this.encryptedBytes = props.encryptedBytes;
  }
};
var Secret = _Secret;
Secret.new = ({ encryptedBytes, expiresIn }) => {
  const createdAt = Math.floor(Date.now() / 1e3);
  const expiresAt = createdAt + expiresIn;
  return new _Secret({
    id: generateId(),
    createdAt,
    expiresAt,
    encryptedBytes
  });
};
Secret.fromDdbItem = (item) => {
  return new _Secret({
    id: "",
    createdAt: 0,
    expiresAt: 0,
    encryptedBytes: "",
    ...item
  });
};

// secrets/secrets.ts
var Secrets = class {
  constructor(ddbRepo2) {
    this.create = async ({
      encryptedBytes,
      expiresIn
    }) => {
      const secret = Secret.new({
        encryptedBytes,
        expiresIn
      });
      const { id } = await this.ddbRepo.createSecret(secret);
      return { id };
    };
    this.burn = async ({ id }) => {
      const item = await this.ddbRepo.deleteSecret(id);
      if (!item)
        throw new SecretNotFoundError();
      const { encryptedBytes } = Secret.fromDdbItem(item);
      return { encryptedBytes };
    };
    this.ddbRepo = ddbRepo2;
  }
};

// ports/apiGateway.ts
var import_core = __toESM(require_core());
var import_http_header_normalizer = __toESM(require_http_header_normalizer());
var import_http_json_body_parser = __toESM(require_http_json_body_parser());
var formatJSONResponse = (response, statusCode = 200, headers = {}) => ({
  statusCode,
  body: JSON.stringify(response),
  headers
});
var middify = (handler2) => (0, import_core.default)(handler2).use((0, import_http_header_normalizer.default)()).use((0, import_http_json_body_parser.default)());

// ports/lambda.ts
var Lambda = class {
  constructor(secrets2) {
    this.createSecretHandler = middify(async ({ body }) => {
      try {
        const response = await this.secrets.create(body);
        return formatJSONResponse(response, 201);
      } catch (error) {
        console.error(error);
        return formatJSONResponse({ message: "Internal failure" }, 500);
      }
    });
    this.getSecretHandler = middify(async ({ pathParameters }) => {
      try {
        const response = await this.secrets.burn(pathParameters);
        return formatJSONResponse(response, 200);
      } catch (error) {
        console.error(error);
        if (error instanceof SecretNotFoundError) {
          return formatJSONResponse({ message: error.message }, 404);
        }
        return formatJSONResponse({ message: "Internal failure" }, 500);
      }
    });
    this.secrets = secrets2;
  }
};

// handlers/getSecret.ts
var region = (0, import_env_var.get)("AWS_REGION").required().asString();
var tableName = (0, import_env_var.get)("TABLE_NAME").required().asString();
var ddbDocumentClient = new import_aws_sdk.DynamoDB.DocumentClient({ region });
var ddbRepo = new DdbRepo(ddbDocumentClient, { tableName });
var secrets = new Secrets(ddbRepo);
var { getSecretHandler: handler } = new Lambda(secrets);
module.exports = __toCommonJS(getSecret_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL2Vudi12YXIvbGliL2Vudi1lcnJvci5qcyIsICIuLi9ub2RlX21vZHVsZXMvZW52LXZhci9saWIvYWNjZXNzb3JzL3N0cmluZy5qcyIsICIuLi9ub2RlX21vZHVsZXMvZW52LXZhci9saWIvYWNjZXNzb3JzL2FycmF5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9lbnYtdmFyL2xpYi9hY2Nlc3NvcnMvYm9vbC1zdHJpY3QuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Vudi12YXIvbGliL2FjY2Vzc29ycy9ib29sLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9lbnYtdmFyL2xpYi9hY2Nlc3NvcnMvaW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9lbnYtdmFyL2xpYi9hY2Nlc3NvcnMvaW50LXBvc2l0aXZlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9lbnYtdmFyL2xpYi9hY2Nlc3NvcnMvcG9ydC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZW52LXZhci9saWIvYWNjZXNzb3JzL2VudW0uanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Vudi12YXIvbGliL2FjY2Vzc29ycy9mbG9hdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZW52LXZhci9saWIvYWNjZXNzb3JzL2Zsb2F0LW5lZ2F0aXZlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9lbnYtdmFyL2xpYi9hY2Nlc3NvcnMvZmxvYXQtcG9zaXRpdmUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Vudi12YXIvbGliL2FjY2Vzc29ycy9pbnQtbmVnYXRpdmUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Vudi12YXIvbGliL2FjY2Vzc29ycy9qc29uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9lbnYtdmFyL2xpYi9hY2Nlc3NvcnMvanNvbi1hcnJheS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZW52LXZhci9saWIvYWNjZXNzb3JzL2pzb24tb2JqZWN0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9lbnYtdmFyL2xpYi9hY2Nlc3NvcnMvcmVnZXhwLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9lbnYtdmFyL2xpYi9hY2Nlc3NvcnMvdXJsLW9iamVjdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZW52LXZhci9saWIvYWNjZXNzb3JzL3VybC1zdHJpbmcuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Vudi12YXIvbGliL2FjY2Vzc29ycy9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZW52LXZhci9saWIvdmFyaWFibGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Vudi12YXIvbGliL2xvZ2dlci5qcyIsICIuLi9ub2RlX21vZHVsZXMvZW52LXZhci9lbnYtdmFyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3Qvcm5nLmpzIiwgIi4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvcmVnZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC92YWxpZGF0ZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L3N0cmluZ2lmeS5qcyIsICIuLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L3YxLmpzIiwgIi4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvcGFyc2UuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC92MzUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9tZDUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC92My5qcyIsICIuLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L3Y0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3Qvc2hhMS5qcyIsICIuLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L3Y1LmpzIiwgIi4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvbmlsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvdmVyc2lvbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9oeXBlcmlkL3V1aWQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3V1aWQtcGFyc2UvdXVpZC1wYXJzZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvaHlwZXJpZC9oeXBlcmlkLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AbWlkZHkvY29yZS9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvQG1pZGR5L2h0dHAtaGVhZGVyLW5vcm1hbGl6ZXIvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL0BtaWRkeS91dGlsL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AbWlkZHkvaHR0cC1qc29uLWJvZHktcGFyc2VyL2luZGV4LmpzIiwgIi4uL2hhbmRsZXJzL2dldFNlY3JldC50cyIsICIuLi9hZGFwdGVycy9kZGJSZXBvLnRzIiwgIi4uL3NlY3JldHMvZXJyb3IudHMiLCAiLi4vc2VjcmV0cy9zZWNyZXQudHMiLCAiLi4vc2VjcmV0cy9zZWNyZXRzLnRzIiwgIi4uL3BvcnRzL2FwaUdhdGV3YXkudHMiLCAiLi4vcG9ydHMvbGFtYmRhLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIndXNlIHN0cmljdCdcblxuLyoqXG4gKiBDdXN0b20gZXJyb3IgY2xhc3MgdGhhdCBjYW4gYmUgdXNlZCB0byBpZGVudGlmeSBlcnJvcnMgZ2VuZXJhdGVkXG4gKiBieSB0aGUgbW9kdWxlXG4gKiBAc2VlIHtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9FcnJvcn1cbiAqL1xuY2xhc3MgRW52VmFyRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yIChtZXNzYWdlLCAuLi5wYXJhbXMpIHtcbiAgICBzdXBlcihgZW52LXZhcjogJHttZXNzYWdlfWAsIC4uLnBhcmFtcylcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgRW52VmFyRXJyb3IpXG4gICAgfVxuXG4gICAgdGhpcy5uYW1lID0gJ0VudlZhckVycm9yJ1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRW52VmFyRXJyb3JcbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhc1N0cmluZyAodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGFzU3RyaW5nID0gcmVxdWlyZSgnLi9zdHJpbmcnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFzQXJyYXkgKHZhbHVlLCBkZWxpbWl0ZXIpIHtcbiAgZGVsaW1pdGVyID0gZGVsaW1pdGVyIHx8ICcsJ1xuXG4gIGlmICghdmFsdWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtdXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGFzU3RyaW5nKHZhbHVlKS5zcGxpdChkZWxpbWl0ZXIpLmZpbHRlcihCb29sZWFuKVxuICB9XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXNCb29sU3RyaWN0ICh2YWx1ZSkge1xuICBjb25zdCB2YWwgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpXG5cbiAgaWYgKCh2YWwgIT09ICdmYWxzZScpICYmICh2YWwgIT09ICd0cnVlJykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Nob3VsZCBiZSBlaXRoZXIgXCJ0cnVlXCIsIFwiZmFsc2VcIiwgXCJUUlVFXCIsIG9yIFwiRkFMU0VcIicpXG4gIH1cblxuICByZXR1cm4gdmFsICE9PSAnZmFsc2UnXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXNCb29sICh2YWx1ZSkge1xuICBjb25zdCB2YWwgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpXG5cbiAgY29uc3QgYWxsb3dlZFZhbHVlcyA9IFtcbiAgICAnZmFsc2UnLFxuICAgICcwJyxcbiAgICAndHJ1ZScsXG4gICAgJzEnXG4gIF1cblxuICBpZiAoYWxsb3dlZFZhbHVlcy5pbmRleE9mKHZhbCkgPT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzaG91bGQgYmUgZWl0aGVyIFwidHJ1ZVwiLCBcImZhbHNlXCIsIFwiVFJVRVwiLCBcIkZBTFNFXCIsIDEsIG9yIDAnKVxuICB9XG5cbiAgcmV0dXJuICEoKCh2YWwgPT09ICcwJykgfHwgKHZhbCA9PT0gJ2ZhbHNlJykpKVxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFzSW50ICh2YWx1ZSkge1xuICBjb25zdCBuID0gcGFyc2VJbnQodmFsdWUsIDEwKVxuXG4gIGlmIChpc05hTihuKSB8fCBuLnRvU3RyaW5nKDEwKSAhPT0gdmFsdWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Nob3VsZCBiZSBhIHZhbGlkIGludGVnZXInKVxuICB9XG5cbiAgcmV0dXJuIG5cbn1cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgYXNJbnQgPSByZXF1aXJlKCcuL2ludCcpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXNJbnRQb3NpdGl2ZSAodmFsdWUpIHtcbiAgY29uc3QgcmV0ID0gYXNJbnQodmFsdWUpXG5cbiAgaWYgKHJldCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Nob3VsZCBiZSBhIHBvc2l0aXZlIGludGVnZXInKVxuICB9XG5cbiAgcmV0dXJuIHJldFxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBhc0ludFBvc2l0aXZlID0gcmVxdWlyZSgnLi9pbnQtcG9zaXRpdmUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFzUG9ydE51bWJlciAodmFsdWUpIHtcbiAgdmFyIHJldCA9IGFzSW50UG9zaXRpdmUodmFsdWUpXG5cbiAgaWYgKHJldCA+IDY1NTM1KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgYXNzaWduIGEgcG9ydCBudW1iZXIgZ3JlYXRlciB0aGFuIDY1NTM1JylcbiAgfVxuXG4gIHJldHVybiByZXRcbn1cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgYXNTdHJpbmcgPSByZXF1aXJlKCcuL3N0cmluZycpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXNFbnVtICh2YWx1ZSwgdmFsaWRWYWx1ZXMpIHtcbiAgY29uc3QgdmFsdWVTdHJpbmcgPSBhc1N0cmluZyh2YWx1ZSlcblxuICBpZiAodmFsaWRWYWx1ZXMuaW5kZXhPZih2YWx1ZVN0cmluZykgPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBzaG91bGQgYmUgb25lIG9mIFske3ZhbGlkVmFsdWVzLmpvaW4oJywgJyl9XWApXG4gIH1cblxuICByZXR1cm4gdmFsdWVTdHJpbmdcbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhc0Zsb2F0ICh2YWx1ZSkge1xuICBjb25zdCBuID0gcGFyc2VGbG9hdCh2YWx1ZSlcblxuICBpZiAoaXNOYU4obikgfHwgbi50b1N0cmluZygpICE9PSB2YWx1ZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2hvdWxkIGJlIGEgdmFsaWQgZmxvYXQnKVxuICB9XG5cbiAgcmV0dXJuIG5cbn1cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgYXNGbG9hdCA9IHJlcXVpcmUoJy4vZmxvYXQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFzRmxvYXROZWdhdGl2ZSAodmFsdWUpIHtcbiAgY29uc3QgcmV0ID0gYXNGbG9hdCh2YWx1ZSlcblxuICBpZiAocmV0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2hvdWxkIGJlIGEgbmVnYXRpdmUgZmxvYXQnKVxuICB9XG5cbiAgcmV0dXJuIHJldFxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBhc0Zsb2F0ID0gcmVxdWlyZSgnLi9mbG9hdCcpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXNGbG9hdFBvc2l0aXZlICh2YWx1ZSkge1xuICBjb25zdCByZXQgPSBhc0Zsb2F0KHZhbHVlKVxuXG4gIGlmIChyZXQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzaG91bGQgYmUgYSBwb3NpdGl2ZSBmbG9hdCcpXG4gIH1cblxuICByZXR1cm4gcmV0XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGFzSW50ID0gcmVxdWlyZSgnLi9pbnQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFzSW50TmVnYXRpdmUgKHZhbHVlKSB7XG4gIGNvbnN0IHJldCA9IGFzSW50KHZhbHVlKVxuXG4gIGlmIChyZXQgPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzaG91bGQgYmUgYSBuZWdhdGl2ZSBpbnRlZ2VyJylcbiAgfVxuXG4gIHJldHVybiByZXRcbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhc0pzb24gKHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Nob3VsZCBiZSB2YWxpZCAocGFyc2VhYmxlKSBKU09OJylcbiAgfVxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBhc0pzb24gPSByZXF1aXJlKCcuL2pzb24nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFzSnNvbkFycmF5ICh2YWx1ZSkge1xuICB2YXIgcmV0ID0gYXNKc29uKHZhbHVlKVxuXG4gIGlmICghQXJyYXkuaXNBcnJheShyZXQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzaG91bGQgYmUgYSBwYXJzZWFibGUgSlNPTiBBcnJheScpXG4gIH1cblxuICByZXR1cm4gcmV0XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGFzSnNvbiA9IHJlcXVpcmUoJy4vanNvbicpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXNKc29uT2JqZWN0ICh2YWx1ZSkge1xuICB2YXIgcmV0ID0gYXNKc29uKHZhbHVlKVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHJldCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Nob3VsZCBiZSBhIHBhcnNlYWJsZSBKU09OIE9iamVjdCcpXG4gIH1cblxuICByZXR1cm4gcmV0XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXNSZWdFeHAgKHZhbHVlLCBmbGFncykge1xuICAvLyBXZSBoYXZlIHRvIHRlc3QgdGhlIHZhbHVlIGFuZCBmbGFncyBpbmRpdnVkYWxseSBpZiB3ZSB3YW50IHRvIHdyaXRlIG91clxuICAvLyBvd24gZXJyb3IgbWVzc2FnZXMsYXMgdGhlcmUgaXMgbm8gd2F5IHRvIGRpZmZlcmVudGlhdGUgYmV0d2VlbiB0aGUgdHdvXG4gIC8vIGVycm9ycyBleGNlcHQgYnkgdXNpbmcgc3RyaW5nIGNvbXBhcmlzb25zLlxuXG4gIC8vIFRlc3QgdGhlIGZsYWdzXG4gIHRyeSB7XG4gICAgUmVnRXhwKHVuZGVmaW5lZCwgZmxhZ3MpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCByZWdleHAgZmxhZ3MnKVxuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCh2YWx1ZSwgZmxhZ3MpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIFdlIGtub3cgdGhhdCB0aGUgcmVnZXhwIGlzIHRoZSBpc3N1ZSBiZWNhdXNlIHdlIHRlc3RlZCB0aGUgZmxhZ3MgZWFybGllclxuICAgIHRocm93IG5ldyBFcnJvcignc2hvdWxkIGJlIGEgdmFsaWQgcmVnZXhwJylcbiAgfVxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBhc1N0cmluZyA9IHJlcXVpcmUoJy4vc3RyaW5nJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhc1VybE9iamVjdCAodmFsdWUpIHtcbiAgY29uc3QgcmV0ID0gYXNTdHJpbmcodmFsdWUpXG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IFVSTChyZXQpXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Nob3VsZCBiZSBhIHZhbGlkIFVSTCcpXG4gIH1cbn1cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgdXJsT2JqZWN0ID0gcmVxdWlyZSgnLi91cmwtb2JqZWN0JylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhc1VybFN0cmluZyAodmFsdWUpIHtcbiAgcmV0dXJuIHVybE9iamVjdCh2YWx1ZSkudG9TdHJpbmcoKVxufVxuIiwgIm1vZHVsZS5leHBvcnRzID0ge1xuICBhc0FycmF5OiByZXF1aXJlKCcuL2FycmF5JyksXG5cbiAgYXNCb29sU3RyaWN0OiByZXF1aXJlKCcuL2Jvb2wtc3RyaWN0JyksXG4gIGFzQm9vbDogcmVxdWlyZSgnLi9ib29sJyksXG5cbiAgYXNQb3J0TnVtYmVyOiByZXF1aXJlKCcuL3BvcnQnKSxcbiAgYXNFbnVtOiByZXF1aXJlKCcuL2VudW0nKSxcblxuICBhc0Zsb2F0TmVnYXRpdmU6IHJlcXVpcmUoJy4vZmxvYXQtbmVnYXRpdmUnKSxcbiAgYXNGbG9hdFBvc2l0aXZlOiByZXF1aXJlKCcuL2Zsb2F0LXBvc2l0aXZlJyksXG4gIGFzRmxvYXQ6IHJlcXVpcmUoJy4vZmxvYXQnKSxcblxuICBhc0ludE5lZ2F0aXZlOiByZXF1aXJlKCcuL2ludC1uZWdhdGl2ZScpLFxuICBhc0ludFBvc2l0aXZlOiByZXF1aXJlKCcuL2ludC1wb3NpdGl2ZScpLFxuICBhc0ludDogcmVxdWlyZSgnLi9pbnQnKSxcblxuICBhc0pzb25BcnJheTogcmVxdWlyZSgnLi9qc29uLWFycmF5JyksXG4gIGFzSnNvbk9iamVjdDogcmVxdWlyZSgnLi9qc29uLW9iamVjdCcpLFxuICBhc0pzb246IHJlcXVpcmUoJy4vanNvbicpLFxuXG4gIGFzUmVnRXhwOiByZXF1aXJlKCcuL3JlZ2V4cCcpLFxuXG4gIGFzU3RyaW5nOiByZXF1aXJlKCcuL3N0cmluZycpLFxuXG4gIGFzVXJsT2JqZWN0OiByZXF1aXJlKCcuL3VybC1vYmplY3QnKSxcbiAgYXNVcmxTdHJpbmc6IHJlcXVpcmUoJy4vdXJsLXN0cmluZycpXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IEVudlZhckVycm9yID0gcmVxdWlyZSgnLi9lbnYtZXJyb3InKVxuY29uc3QgYmFzZTY0UmVnZXggPSAvXihbQS1aYS16MC05Ky9dezR9KSooW0EtWmEtejAtOSsvXXs0fXxbQS1aYS16MC05Ky9dezN9PXxbQS1aYS16MC05Ky9dezJ9PT0pJC9cblxuLyoqXG4gKiBSZXR1cm5zIGFuIE9iamVjdCB0aGF0IGNvbnRhaW5zIGZ1bmN0aW9ucyB0byByZWFkIGFuZCBzcGVjaWZ5IHRoZSBmb3JtYXQgb2ZcbiAqIHRoZSB2YXJpYWJsZSB5b3Ugd2lzaCB0byBoYXZlIHJldHVybmVkXG4gKiBAcGFyYW0gIHtPYmplY3R9IGNvbnRhaW5lciBFbmNhcHN1bGF0ZWQgY29udGFpbmVyIChlLmcuLCBgcHJvY2Vzcy5lbnZgKS5cbiAqIEBwYXJhbSAge1N0cmluZ30gdmFyTmFtZSBOYW1lIG9mIHRoZSByZXF1ZXN0ZWQgcHJvcGVydHkgZnJvbSBgY29udGFpbmVyYC5cbiAqIEBwYXJhbSAgeyp9IGRlZlZhbHVlIERlZmF1bHQgdmFsdWUgdG8gcmV0dXJuIGlmIGB2YXJOYW1lYCBpcyBpbnZhbGlkLlxuICogQHBhcmFtICB7T2JqZWN0fSBleHRyYUFjY2Vzc29ycyBFeHRyYSBhY2Nlc3NvcnMgdG8gaW5zdGFsbC5cbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRWYXJpYWJsZUFjY2Vzc29ycyAoY29udGFpbmVyLCB2YXJOYW1lLCBleHRyYUFjY2Vzc29ycywgbG9nZ2VyKSB7XG4gIGxldCBpc0Jhc2U2NCA9IGZhbHNlXG4gIGxldCBpc1JlcXVpcmVkID0gZmFsc2VcbiAgbGV0IGRlZlZhbHVlXG4gIGxldCBleGFtcGxlXG5cbiAgY29uc3QgYnVpbHRJbkFjY2Vzc29ycyA9IHJlcXVpcmUoJy4vYWNjZXNzb3JzL2luZGV4JylcblxuICAvKipcbiAgICogTG9ncyB0aGUgZ2l2ZW4gc3RyaW5nIHVzaW5nIHRoZSBwcm92aWRlZCBsb2dnZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAqL1xuICBmdW5jdGlvbiBsb2cgKHN0cikge1xuICAgIGxvZ2dlcih2YXJOYW1lLCBzdHIpXG4gIH1cblxuICAvKipcbiAgICogVGhyb3cgYW4gZXJyb3Igd2l0aCBhIGNvbnNpc3RlbnQgdHlwZS9mb3JtYXQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgZnVuY3Rpb24gcmFpc2VFcnJvciAodmFsdWUsIG1zZykge1xuICAgIGxldCBlcnJNc2cgPSBgXCIke3Zhck5hbWV9XCIgJHttc2d9YFxuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBlcnJNc2cgPSBgJHtlcnJNc2d9YFxuICAgIH1cblxuICAgIGlmIChleGFtcGxlKSB7XG4gICAgICBlcnJNc2cgPSBgJHtlcnJNc2d9LiBBbiBleGFtcGxlIG9mIGEgdmFsaWQgdmFsdWUgd291bGQgYmU6ICR7ZXhhbXBsZX1gXG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVudlZhckVycm9yKGVyck1zZylcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGFjY2Vzc29yIHdyYXBwZWQgYnkgZXJyb3IgaGFuZGxpbmcgYW5kIGFyZ3MgcGFzc2luZyBsb2dpY1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhY2Nlc3NvclxuICAgKi9cbiAgZnVuY3Rpb24gZ2VuZXJhdGVBY2Nlc3NvciAoYWNjZXNzb3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHZhbHVlID0gY29udGFpbmVyW3Zhck5hbWVdXG5cbiAgICAgIGxvZyhgd2lsbCBiZSByZWFkIGZyb20gdGhlIGVudmlyb25tZW50IHVzaW5nIFwiJHthY2Nlc3Nvci5uYW1lfVwiIGFjY2Vzc29yYClcblxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkZWZWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgJiYgaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGxvZygnd2FzIG5vdCBmb3VuZCBpbiB0aGUgZW52aXJvbm1lbnQsIGJ1dCBpcyByZXF1aXJlZCB0byBiZSBzZXQnKVxuICAgICAgICAgIC8vIFZhciBpcyBub3Qgc2V0LCBub3IgaXMgYSBkZWZhdWx0LiBUaHJvdyBhbiBlcnJvclxuICAgICAgICAgIHJhaXNlRXJyb3IodW5kZWZpbmVkLCAnaXMgYSByZXF1aXJlZCB2YXJpYWJsZSwgYnV0IGl0IHdhcyBub3Qgc2V0JylcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmVmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgbG9nKGB3YXMgbm90IGZvdW5kIGluIHRoZSBlbnZpcm9ubWVudCwgcGFyc2luZyBkZWZhdWx0IHZhbHVlIFwiJHtkZWZWYWx1ZX1cIiBpbnN0ZWFkYClcbiAgICAgICAgICB2YWx1ZSA9IGRlZlZhbHVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nKCd3YXMgbm90IGZvdW5kIGluIHRoZSBlbnZpcm9ubWVudCwgYnV0IGlzIG5vdCByZXF1aXJlZC4gcmV0dXJuaW5nIHVuZGVmaW5lZCcpXG4gICAgICAgICAgLy8gcmV0dXJuIHVuZGVmaW5lZCBzaW5jZSB2YXJpYWJsZSBpcyBub3QgcmVxdWlyZWQgYW5kXG4gICAgICAgICAgLy8gdGhlcmUncyBubyBkZWZhdWx0IHZhbHVlIHByb3ZpZGVkXG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgIGxvZygndmVyaWZ5aW5nIHZhcmlhYmxlIHZhbHVlIGlzIG5vdCBhbiBlbXB0eSBzdHJpbmcnKVxuICAgICAgICAvLyBOZWVkIHRvIHZlcmlmeSB0aGF0IHJlcXVpcmVkIHZhcmlhYmxlcyBhcmVuJ3QganVzdCB3aGl0ZXNwYWNlXG4gICAgICAgIGlmICh2YWx1ZS50cmltKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmFpc2VFcnJvcih1bmRlZmluZWQsICdpcyBhIHJlcXVpcmVkIHZhcmlhYmxlLCBidXQgaXRzIHZhbHVlIHdhcyBlbXB0eScpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGlzQmFzZTY0KSB7XG4gICAgICAgIGxvZygndmVyaWZ5aW5nIHZhcmlhYmxlIGlzIGEgdmFsaWQgYmFzZTY0IHN0cmluZycpXG4gICAgICAgIGlmICghdmFsdWUubWF0Y2goYmFzZTY0UmVnZXgpKSB7XG4gICAgICAgICAgcmFpc2VFcnJvcih2YWx1ZSwgJ3Nob3VsZCBiZSBhIHZhbGlkIGJhc2U2NCBzdHJpbmcgaWYgdXNpbmcgY29udmVydEZyb21CYXNlNjQnKVxuICAgICAgICB9XG4gICAgICAgIGxvZygnY29udmVydGluZyBmcm9tIGJhc2U2NCB0byB1dGY4IHN0cmluZycpXG4gICAgICAgIHZhbHVlID0gQnVmZmVyLmZyb20odmFsdWUsICdiYXNlNjQnKS50b1N0cmluZygpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFyZ3MgPSBbdmFsdWVdLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKVxuXG4gICAgICB0cnkge1xuICAgICAgICBsb2coYHBhc3NpbmcgdmFsdWUgXCIke3ZhbHVlfVwiIHRvIFwiJHthY2Nlc3Nvci5uYW1lfVwiIGFjY2Vzc29yYClcblxuICAgICAgICBjb25zdCByZXN1bHQgPSBhY2Nlc3Nvci5hcHBseShcbiAgICAgICAgICBhY2Nlc3NvcixcbiAgICAgICAgICBhcmdzXG4gICAgICAgIClcblxuICAgICAgICBsb2coYHBhcnNlZCBzdWNjZXNzZnVsbHksIHJldHVybmluZyAke3Jlc3VsdH1gKVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByYWlzZUVycm9yKHZhbHVlLCBlcnJvci5tZXNzYWdlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGFjY2Vzc29ycyA9IHtcbiAgICAvKipcbiAgICAgKiBJbnN0cnVjdHMgZW52LXZhciB0byBmaXJzdCBjb252ZXJ0IHRoZSB2YWx1ZSBvZiB0aGUgdmFyaWFibGUgZnJvbSBiYXNlNjRcbiAgICAgKiB3aGVuIHJlYWRpbmcgaXQgdXNpbmcgYSBmdW5jdGlvbiBzdWNoIGFzIGFzU3RyaW5nKClcbiAgICAgKi9cbiAgICBjb252ZXJ0RnJvbUJhc2U2NDogZnVuY3Rpb24gKCkge1xuICAgICAgbG9nKCdtYXJraW5nIGZvciBiYXNlNjQgY29udmVyc2lvbicpXG4gICAgICBpc0Jhc2U2NCA9IHRydWVcblxuICAgICAgcmV0dXJuIGFjY2Vzc29yc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXQgYSBkZWZhdWx0IHZhbHVlIGZvciB0aGUgdmFyaWFibGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKi9cbiAgICBkZWZhdWx0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGRlZlZhbHVlID0gdmFsdWUudG9TdHJpbmcoKVxuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSB8fCAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCkpIHtcbiAgICAgICAgZGVmVmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgRW52VmFyRXJyb3IoJ3ZhbHVlcyBwYXNzZWQgdG8gZGVmYXVsdCgpIG11c3QgYmUgb2YgTnVtYmVyLCBTdHJpbmcsIEFycmF5LCBvciBPYmplY3QgdHlwZScpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWZWYWx1ZSA9IHZhbHVlXG4gICAgICB9XG5cbiAgICAgIGxvZyhgc2V0dGluZyBkZWZhdWx0IHZhbHVlIHRvIFwiJHtkZWZWYWx1ZX1cImApXG5cbiAgICAgIHJldHVybiBhY2Nlc3NvcnNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRW5zdXJlcyBhIHZhcmlhYmxlIGlzIHNldCBpbiB0aGUgZ2l2ZW4gZW52aXJvbm1lbnQgY29udGFpbmVyLiBUaHJvd3MgYW5cbiAgICAgKiBFbnZWYXJFcnJvciBpZiB0aGUgdmFyaWFibGUgaXMgbm90IHNldCBvciBhIGRlZmF1bHQgaXMgbm90IHByb3ZpZGVkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByZXF1aXJlZFxuICAgICAqL1xuICAgIHJlcXVpcmVkOiBmdW5jdGlvbiAocmVxdWlyZWQpIHtcbiAgICAgIGlmICh0eXBlb2YgcmVxdWlyZWQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGxvZygnbWFya2VkIGFzIHJlcXVpcmVkJylcbiAgICAgICAgLy8gSWYgbm8gdmFsdWUgaXMgcGFzc2VkIGFzc3VtZSB0aGF0IGRldmVsb3BlciBtZWFucyBcInRydWVcIlxuICAgICAgICAvLyBUaGlzIGlzIHRvIHJldGFpbiBzdXBwb3J0IGxlZ2FjeSB1c2FnZSAoYW5kIGludHVpdGl2ZSlcbiAgICAgICAgaXNSZXF1aXJlZCA9IHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZyhgc2V0dGluZyByZXF1aXJlZCBmbGFnIHRvICR7cmVxdWlyZWR9YClcbiAgICAgICAgaXNSZXF1aXJlZCA9IHJlcXVpcmVkXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2Nlc3NvcnNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IGFuIGV4YW1wbGUgdmFsdWUgZm9yIHRoaXMgdmFyaWFibGUuIElmIHRoZSB2YXJpYWJsZSB2YWx1ZSBpcyBub3Qgc2V0XG4gICAgICogb3IgaXMgc2V0IHRvIGFuIGludmFsaWQgdmFsdWUgdGhpcyBleGFtcGxlIHdpbGwgYmUgc2hvdyBpbiBlcnJvciBvdXRwdXQuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV4YW1wbGVcbiAgICAgKi9cbiAgICBleGFtcGxlOiBmdW5jdGlvbiAoZXgpIHtcbiAgICAgIGV4YW1wbGUgPSBleFxuXG4gICAgICByZXR1cm4gYWNjZXNzb3JzXG4gICAgfVxuICB9XG5cbiAgLy8gQXR0YWNoIGFjY2Vzc29ycywgYW5kIGV4dHJhIGFjY2Vzc29ycyBpZiBwcm92aWRlZC5cbiAgT2JqZWN0LmVudHJpZXMoe1xuICAgIC4uLmJ1aWx0SW5BY2Nlc3NvcnMsXG4gICAgLi4uZXh0cmFBY2Nlc3NvcnNcbiAgfSkuZm9yRWFjaCgoW25hbWUsIGFjY2Vzc29yXSkgPT4ge1xuICAgIGFjY2Vzc29yc1tuYW1lXSA9IGdlbmVyYXRlQWNjZXNzb3IoYWNjZXNzb3IpXG4gIH0pXG5cbiAgcmV0dXJuIGFjY2Vzc29yc1xufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIERlZmF1bHQgbG9nZ2VyIGluY2x1ZGVkIHdpdGggZW52LXZhci5cbiAqIFdpbGwgbm90IGxvZyBhbnl0aGluZyBpZiBOT0RFX0VOViBpcyBzZXQgdG8gcHJvZHVjdGlvblxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdlbkxvZ2dlciAob3V0LCBwcm9kRmxhZykge1xuICByZXR1cm4gZnVuY3Rpb24gZW52VmFyTG9nZ2VyICh2YXJuYW1lLCBzdHIpIHtcbiAgICBpZiAoIXByb2RGbGFnIHx8ICFwcm9kRmxhZy5tYXRjaCgvcHJvZHxwcm9kdWN0aW9uLykpIHtcbiAgICAgIG91dChgZW52LXZhciAoJHt2YXJuYW1lfSk6ICR7c3RyfWApXG4gICAgfVxuICB9XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHZhcmlhYmxlID0gcmVxdWlyZSgnLi9saWIvdmFyaWFibGUnKVxuY29uc3QgRW52VmFyRXJyb3IgPSByZXF1aXJlKCcuL2xpYi9lbnYtZXJyb3InKVxuXG4vKipcbiAqIFJldHVybnMgYW4gXCJlbnYtdmFyXCIgaW5zdGFuY2UgdGhhdCByZWFkcyBmcm9tIHRoZSBnaXZlbiBjb250YWluZXIgb2YgdmFsdWVzLlxuICogQnkgZGVmYXVsdCwgd2UgZXhwb3J0IGFuIGluc3RhbmNlIHRoYXQgcmVhZHMgZnJvbSBwcm9jZXNzLmVudlxuICogQHBhcmFtICB7T2JqZWN0fSBjb250YWluZXIgdGFyZ2V0IGNvbnRhaW5lciB0byByZWFkIHZhbHVlcyBmcm9tXG4gKiBAcGFyYW0gIHtPYmplY3R9IGV4dHJhQWNjZXNzb3JzIGFkZGl0aW9uYWwgYWNjZXNzb3JzIHRvIGF0dGFjaCB0byB0aGVcbiAqIHJlc3VsdGluZyBvYmplY3RcbiAqIEByZXR1cm4ge09iamVjdH0gYSBuZXcgbW9kdWxlIGluc3RhbmNlXG4gKi9cbmNvbnN0IGZyb20gPSAoY29udGFpbmVyLCBleHRyYUFjY2Vzc29ycywgbG9nZ2VyKSA9PiB7XG4gIHJldHVybiB7XG4gICAgZnJvbTogZnJvbSxcblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgdGhlIEVycm9yIGNsYXNzIHVzZWQgdG8gZ2VuZXJhdGUgZXhjZXB0aW9ucy4gQ2FuIGJlIHVzZWQgdG8gaWRlbnRpZnlcbiAgICAgKiBleGNlcHRpb25zIGFuZCBoYW5kbGUgdGhlbSBhcHByb3ByaWF0ZWx5LlxuICAgICAqL1xuICAgIEVudlZhckVycm9yOiByZXF1aXJlKCcuL2xpYi9lbnYtZXJyb3InKSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSB2YXJpYWJsZSBpbnN0YW5jZSB3aXRoIGhlbHBlciBmdW5jdGlvbnMsIG9yIHByb2Nlc3MuZW52XG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB2YXJpYWJsZU5hbWUgTmFtZSBvZiB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGUgcmVxdWVzdGVkXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gKHZhcmlhYmxlTmFtZSkge1xuICAgICAgaWYgKCF2YXJpYWJsZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lclxuICAgICAgfVxuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVudlZhckVycm9yKCdJdCBsb29rcyBsaWtlIHlvdSBwYXNzZWQgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCB0byBlbnYuZ2V0KCkuIFNpbmNlIGVudi12YXJANi4wLjAgdGhpcyBpcyBubyBsb25nZXIgc3VwcG9ydGVkLiBUbyBzZXQgYSBkZWZhdWx0IHZhbHVlIHVzZSBlbnYuZ2V0KFRBUkdFVCkuZGVmYXVsdChERUZBVUxUKScpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YXJpYWJsZShjb250YWluZXIsIHZhcmlhYmxlTmFtZSwgZXh0cmFBY2Nlc3NvcnMgfHwge30sIGxvZ2dlciB8fCBmdW5jdGlvbiBub29wTG9nZ2VyICgpIHt9KVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBhY2Nlc3MgdG8gdGhlIGZ1bmN0aW9ucyB0aGF0IGVudi12YXIgdXNlcyB0byBwYXJzZVxuICAgICAqIHByb2Nlc3MuZW52IHN0cmluZ3MgaW50byB2YWxpZCB0eXBlcyByZXF1ZXN0ZWQgYnkgdGhlIEFQSVxuICAgICAqL1xuICAgIGFjY2Vzc29yczogcmVxdWlyZSgnLi9saWIvYWNjZXNzb3JzL2luZGV4JyksXG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBhIGRlZmF1bHQgbG9nZ2VyIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJpbnQgbG9ncy5cbiAgICAgKiBUaGlzIHdpbGwgbm90IHByaW50IGxvZ3MgaW4gYSBwcm9kdWN0aW9uIGVudmlyb25tZW50IChjaGVja3MgcHJvY2Vzcy5lbnYuTk9ERV9FTlYpXG4gICAgICovXG4gICAgbG9nZ2VyOiByZXF1aXJlKCcuL2xpYi9sb2dnZXInKShjb25zb2xlLmxvZywgY29udGFpbmVyLk5PREVfRU5WKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnJvbShwcm9jZXNzLmVudilcbiIsICJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHJuZztcblxudmFyIF9jcnlwdG8gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJjcnlwdG9cIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5jb25zdCBybmRzOFBvb2wgPSBuZXcgVWludDhBcnJheSgyNTYpOyAvLyAjIG9mIHJhbmRvbSB2YWx1ZXMgdG8gcHJlLWFsbG9jYXRlXG5cbmxldCBwb29sUHRyID0gcm5kczhQb29sLmxlbmd0aDtcblxuZnVuY3Rpb24gcm5nKCkge1xuICBpZiAocG9vbFB0ciA+IHJuZHM4UG9vbC5sZW5ndGggLSAxNikge1xuICAgIF9jcnlwdG8uZGVmYXVsdC5yYW5kb21GaWxsU3luYyhybmRzOFBvb2wpO1xuXG4gICAgcG9vbFB0ciA9IDA7XG4gIH1cblxuICByZXR1cm4gcm5kczhQb29sLnNsaWNlKHBvb2xQdHIsIHBvb2xQdHIgKz0gMTYpO1xufSIsICJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfZGVmYXVsdCA9IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsICJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF9yZWdleCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcmVnZXguanNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgX3JlZ2V4LmRlZmF1bHQudGVzdCh1dWlkKTtcbn1cblxudmFyIF9kZWZhdWx0ID0gdmFsaWRhdGU7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCAiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfdmFsaWRhdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZhbGlkYXRlLmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5jb25zdCBieXRlVG9IZXggPSBbXTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgY29uc3QgdXVpZCA9IChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghKDAsIF92YWxpZGF0ZS5kZWZhdWx0KSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxudmFyIF9kZWZhdWx0ID0gc3RyaW5naWZ5O1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwgIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX3JuZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcm5nLmpzXCIpKTtcblxudmFyIF9zdHJpbmdpZnkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3N0cmluZ2lmeS5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcbmxldCBfbm9kZUlkO1xuXG5sZXQgX2Nsb2Nrc2VxOyAvLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcblxuXG5sZXQgX2xhc3RNU2VjcyA9IDA7XG5sZXQgX2xhc3ROU2VjcyA9IDA7IC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQgZm9yIEFQSSBkZXRhaWxzXG5cbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIGxldCBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICBjb25zdCBiID0gYnVmIHx8IG5ldyBBcnJheSgxNik7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsZXQgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICBsZXQgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxOyAvLyBub2RlIGFuZCBjbG9ja3NlcSBuZWVkIHRvIGJlIGluaXRpYWxpemVkIHRvIHJhbmRvbSB2YWx1ZXMgaWYgdGhleSdyZSBub3RcbiAgLy8gc3BlY2lmaWVkLiAgV2UgZG8gdGhpcyBsYXppbHkgdG8gbWluaW1pemUgaXNzdWVzIHJlbGF0ZWQgdG8gaW5zdWZmaWNpZW50XG4gIC8vIHN5c3RlbSBlbnRyb3B5LiAgU2VlICMxODlcblxuICBpZiAobm9kZSA9PSBudWxsIHx8IGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICBjb25zdCBzZWVkQnl0ZXMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZy5kZWZhdWx0KSgpO1xuXG4gICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG4gICAgICBub2RlID0gX25vZGVJZCA9IFtzZWVkQnl0ZXNbMF0gfCAweDAxLCBzZWVkQnl0ZXNbMV0sIHNlZWRCeXRlc1syXSwgc2VlZEJ5dGVzWzNdLCBzZWVkQnl0ZXNbNF0sIHNlZWRCeXRlc1s1XV07XG4gICAgfVxuXG4gICAgaWYgKGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gICAgICBjbG9ja3NlcSA9IF9jbG9ja3NlcSA9IChzZWVkQnl0ZXNbNl0gPDwgOCB8IHNlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG4gICAgfVxuICB9IC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuXG5cbiAgbGV0IG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IERhdGUubm93KCk7IC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcblxuICBsZXQgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7IC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcblxuICBjb25zdCBkdCA9IG1zZWNzIC0gX2xhc3RNU2VjcyArIChuc2VjcyAtIF9sYXN0TlNlY3MpIC8gMTAwMDA7IC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9IC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcblxuXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9IC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcblxuXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInV1aWQudjEoKTogQ2FuJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjXCIpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxOyAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcblxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDsgLy8gYHRpbWVfbG93YFxuXG4gIGNvbnN0IHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjsgLy8gYHRpbWVfbWlkYFxuXG4gIGNvbnN0IHRtaCA9IG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjsgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcblxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG5cbiAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7IC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuXG4gIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDsgLy8gYGNsb2NrX3NlcV9sb3dgXG5cbiAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmOyAvLyBgbm9kZWBcblxuICBmb3IgKGxldCBuID0gMDsgbiA8IDY7ICsrbikge1xuICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgfVxuXG4gIHJldHVybiBidWYgfHwgKDAsIF9zdHJpbmdpZnkuZGVmYXVsdCkoYik7XG59XG5cbnZhciBfZGVmYXVsdCA9IHYxO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwgIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX3ZhbGlkYXRlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92YWxpZGF0ZS5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHBhcnNlKHV1aWQpIHtcbiAgaWYgKCEoMCwgX3ZhbGlkYXRlLmRlZmF1bHQpKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbnZhbGlkIFVVSUQnKTtcbiAgfVxuXG4gIGxldCB2O1xuICBjb25zdCBhcnIgPSBuZXcgVWludDhBcnJheSgxNik7IC8vIFBhcnNlICMjIyMjIyMjLS4uLi4tLi4uLi0uLi4uLS4uLi4uLi4uLi4uLlxuXG4gIGFyclswXSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgwLCA4KSwgMTYpKSA+Pj4gMjQ7XG4gIGFyclsxXSA9IHYgPj4+IDE2ICYgMHhmZjtcbiAgYXJyWzJdID0gdiA+Pj4gOCAmIDB4ZmY7XG4gIGFyclszXSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0jIyMjLS4uLi4tLi4uLi0uLi4uLi4uLi4uLi5cblxuICBhcnJbNF0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoOSwgMTMpLCAxNikpID4+PiA4O1xuICBhcnJbNV0gPSB2ICYgMHhmZjsgLy8gUGFyc2UgLi4uLi4uLi4tLi4uLi0jIyMjLS4uLi4tLi4uLi4uLi4uLi4uXG5cbiAgYXJyWzZdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDE0LCAxOCksIDE2KSkgPj4+IDg7XG4gIGFycls3XSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0uLi4uLS4uLi4tIyMjIy0uLi4uLi4uLi4uLi5cblxuICBhcnJbOF0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMTksIDIzKSwgMTYpKSA+Pj4gODtcbiAgYXJyWzldID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLS4uLi4tLi4uLi0uLi4uLSMjIyMjIyMjIyMjI1xuICAvLyAoVXNlIFwiL1wiIHRvIGF2b2lkIDMyLWJpdCB0cnVuY2F0aW9uIHdoZW4gYml0LXNoaWZ0aW5nIGhpZ2gtb3JkZXIgYnl0ZXMpXG5cbiAgYXJyWzEwXSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgyNCwgMzYpLCAxNikpIC8gMHgxMDAwMDAwMDAwMCAmIDB4ZmY7XG4gIGFyclsxMV0gPSB2IC8gMHgxMDAwMDAwMDAgJiAweGZmO1xuICBhcnJbMTJdID0gdiA+Pj4gMjQgJiAweGZmO1xuICBhcnJbMTNdID0gdiA+Pj4gMTYgJiAweGZmO1xuICBhcnJbMTRdID0gdiA+Pj4gOCAmIDB4ZmY7XG4gIGFyclsxNV0gPSB2ICYgMHhmZjtcbiAgcmV0dXJuIGFycjtcbn1cblxudmFyIF9kZWZhdWx0ID0gcGFyc2U7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCAiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcbmV4cG9ydHMuVVJMID0gZXhwb3J0cy5ETlMgPSB2b2lkIDA7XG5cbnZhciBfc3RyaW5naWZ5ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9zdHJpbmdpZnkuanNcIikpO1xuXG52YXIgX3BhcnNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9wYXJzZS5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHN0cmluZ1RvQnl0ZXMoc3RyKSB7XG4gIHN0ciA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKTsgLy8gVVRGOCBlc2NhcGVcblxuICBjb25zdCBieXRlcyA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgYnl0ZXMucHVzaChzdHIuY2hhckNvZGVBdChpKSk7XG4gIH1cblxuICByZXR1cm4gYnl0ZXM7XG59XG5cbmNvbnN0IEROUyA9ICc2YmE3YjgxMC05ZGFkLTExZDEtODBiNC0wMGMwNGZkNDMwYzgnO1xuZXhwb3J0cy5ETlMgPSBETlM7XG5jb25zdCBVUkwgPSAnNmJhN2I4MTEtOWRhZC0xMWQxLTgwYjQtMDBjMDRmZDQzMGM4JztcbmV4cG9ydHMuVVJMID0gVVJMO1xuXG5mdW5jdGlvbiBfZGVmYXVsdChuYW1lLCB2ZXJzaW9uLCBoYXNoZnVuYykge1xuICBmdW5jdGlvbiBnZW5lcmF0ZVVVSUQodmFsdWUsIG5hbWVzcGFjZSwgYnVmLCBvZmZzZXQpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBzdHJpbmdUb0J5dGVzKHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG5hbWVzcGFjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG5hbWVzcGFjZSA9ICgwLCBfcGFyc2UuZGVmYXVsdCkobmFtZXNwYWNlKTtcbiAgICB9XG5cbiAgICBpZiAobmFtZXNwYWNlLmxlbmd0aCAhPT0gMTYpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignTmFtZXNwYWNlIG11c3QgYmUgYXJyYXktbGlrZSAoMTYgaXRlcmFibGUgaW50ZWdlciB2YWx1ZXMsIDAtMjU1KScpO1xuICAgIH0gLy8gQ29tcHV0ZSBoYXNoIG9mIG5hbWVzcGFjZSBhbmQgdmFsdWUsIFBlciA0LjNcbiAgICAvLyBGdXR1cmU6IFVzZSBzcHJlYWQgc3ludGF4IHdoZW4gc3VwcG9ydGVkIG9uIGFsbCBwbGF0Zm9ybXMsIGUuZy4gYGJ5dGVzID1cbiAgICAvLyBoYXNoZnVuYyhbLi4ubmFtZXNwYWNlLCAuLi4gdmFsdWVdKWBcblxuXG4gICAgbGV0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoMTYgKyB2YWx1ZS5sZW5ndGgpO1xuICAgIGJ5dGVzLnNldChuYW1lc3BhY2UpO1xuICAgIGJ5dGVzLnNldCh2YWx1ZSwgbmFtZXNwYWNlLmxlbmd0aCk7XG4gICAgYnl0ZXMgPSBoYXNoZnVuYyhieXRlcyk7XG4gICAgYnl0ZXNbNl0gPSBieXRlc1s2XSAmIDB4MGYgfCB2ZXJzaW9uO1xuICAgIGJ5dGVzWzhdID0gYnl0ZXNbOF0gJiAweDNmIHwgMHg4MDtcblxuICAgIGlmIChidWYpIHtcbiAgICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgICAgYnVmW29mZnNldCArIGldID0gYnl0ZXNbaV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBidWY7XG4gICAgfVxuXG4gICAgcmV0dXJuICgwLCBfc3RyaW5naWZ5LmRlZmF1bHQpKGJ5dGVzKTtcbiAgfSAvLyBGdW5jdGlvbiNuYW1lIGlzIG5vdCBzZXR0YWJsZSBvbiBzb21lIHBsYXRmb3JtcyAoIzI3MClcblxuXG4gIHRyeSB7XG4gICAgZ2VuZXJhdGVVVUlELm5hbWUgPSBuYW1lOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgfSBjYXRjaCAoZXJyKSB7fSAvLyBGb3IgQ29tbW9uSlMgZGVmYXVsdCBleHBvcnQgc3VwcG9ydFxuXG5cbiAgZ2VuZXJhdGVVVUlELkROUyA9IEROUztcbiAgZ2VuZXJhdGVVVUlELlVSTCA9IFVSTDtcbiAgcmV0dXJuIGdlbmVyYXRlVVVJRDtcbn0iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfY3J5cHRvID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiY3J5cHRvXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gbWQ1KGJ5dGVzKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGJ5dGVzKSkge1xuICAgIGJ5dGVzID0gQnVmZmVyLmZyb20oYnl0ZXMpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBieXRlcyA9PT0gJ3N0cmluZycpIHtcbiAgICBieXRlcyA9IEJ1ZmZlci5mcm9tKGJ5dGVzLCAndXRmOCcpO1xuICB9XG5cbiAgcmV0dXJuIF9jcnlwdG8uZGVmYXVsdC5jcmVhdGVIYXNoKCdtZDUnKS51cGRhdGUoYnl0ZXMpLmRpZ2VzdCgpO1xufVxuXG52YXIgX2RlZmF1bHQgPSBtZDU7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCAiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfdiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdjM1LmpzXCIpKTtcblxudmFyIF9tZCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbWQ1LmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuY29uc3QgdjMgPSAoMCwgX3YuZGVmYXVsdCkoJ3YzJywgMHgzMCwgX21kLmRlZmF1bHQpO1xudmFyIF9kZWZhdWx0ID0gdjM7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCAiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfcm5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9ybmcuanNcIikpO1xuXG52YXIgX3N0cmluZ2lmeSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgY29uc3Qgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBfcm5nLmRlZmF1bHQpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuICgwLCBfc3RyaW5naWZ5LmRlZmF1bHQpKHJuZHMpO1xufVxuXG52YXIgX2RlZmF1bHQgPSB2NDtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsICJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF9jcnlwdG8gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJjcnlwdG9cIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBzaGExKGJ5dGVzKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGJ5dGVzKSkge1xuICAgIGJ5dGVzID0gQnVmZmVyLmZyb20oYnl0ZXMpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBieXRlcyA9PT0gJ3N0cmluZycpIHtcbiAgICBieXRlcyA9IEJ1ZmZlci5mcm9tKGJ5dGVzLCAndXRmOCcpO1xuICB9XG5cbiAgcmV0dXJuIF9jcnlwdG8uZGVmYXVsdC5jcmVhdGVIYXNoKCdzaGExJykudXBkYXRlKGJ5dGVzKS5kaWdlc3QoKTtcbn1cblxudmFyIF9kZWZhdWx0ID0gc2hhMTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsICJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF92ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92MzUuanNcIikpO1xuXG52YXIgX3NoYSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vc2hhMS5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmNvbnN0IHY1ID0gKDAsIF92LmRlZmF1bHQpKCd2NScsIDB4NTAsIF9zaGEuZGVmYXVsdCk7XG52YXIgX2RlZmF1bHQgPSB2NTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsICJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfZGVmYXVsdCA9ICcwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAnO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwgIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX3ZhbGlkYXRlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92YWxpZGF0ZS5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHZlcnNpb24odXVpZCkge1xuICBpZiAoISgwLCBfdmFsaWRhdGUuZGVmYXVsdCkodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgVVVJRCcpO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlSW50KHV1aWQuc3Vic3RyKDE0LCAxKSwgMTYpO1xufVxuXG52YXIgX2RlZmF1bHQgPSB2ZXJzaW9uO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwgIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjFcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3YuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ2M1wiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfdjIuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ2NFwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfdjMuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ2NVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfdjQuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOSUxcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX25pbC5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInZlcnNpb25cIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3ZlcnNpb24uZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ2YWxpZGF0ZVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfdmFsaWRhdGUuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzdHJpbmdpZnlcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInBhcnNlXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9wYXJzZS5kZWZhdWx0O1xuICB9XG59KTtcblxudmFyIF92ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92MS5qc1wiKSk7XG5cbnZhciBfdjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YzLmpzXCIpKTtcblxudmFyIF92MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdjQuanNcIikpO1xuXG52YXIgX3Y0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92NS5qc1wiKSk7XG5cbnZhciBfbmlsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9uaWwuanNcIikpO1xuXG52YXIgX3ZlcnNpb24gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZlcnNpb24uanNcIikpO1xuXG52YXIgX3ZhbGlkYXRlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92YWxpZGF0ZS5qc1wiKSk7XG5cbnZhciBfc3RyaW5naWZ5ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9zdHJpbmdpZnkuanNcIikpO1xuXG52YXIgX3BhcnNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9wYXJzZS5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9IiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCB1dWlkID0gcmVxdWlyZSgndXVpZCcpXG5jb25zdCBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKVxubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgY3J5cHRvLnJhbmRvbVVVSUQgPT09ICdmdW5jdGlvbidcbiAgPyBjcnlwdG8ucmFuZG9tVVVJRFxuICA6IHV1aWQudjRcbiIsICIndXNlIHN0cmljdCc7XG5cbi8vIE1hcHMgZm9yIG51bWJlciA8LT4gaGV4IHN0cmluZyBjb252ZXJzaW9uXG52YXIgX2J5dGVUb0hleCA9IFtdO1xudmFyIF9oZXhUb0J5dGUgPSB7fTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgX2J5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG4gIF9oZXhUb0J5dGVbX2J5dGVUb0hleFtpXV0gPSBpO1xufVxuXG4vLyAqKmBwYXJzZSgpYCAtIFBhcnNlIGEgVVVJRCBpbnRvIGl0J3MgY29tcG9uZW50IGJ5dGVzKipcbmZ1bmN0aW9uIHBhcnNlKHMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gKGJ1ZiAmJiBvZmZzZXQpIHx8IDA7XG4gIHZhciBpaSA9IDA7XG5cbiAgYnVmID0gYnVmIHx8IFtdO1xuICBzLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWzAtOWEtZl17Mn0vZywgZnVuY3Rpb24ob2N0KSB7XG4gICAgaWYgKGlpIDwgMTYpIHsgLy8gRG9uJ3Qgb3ZlcmZsb3chXG4gICAgICBidWZbaSArIGlpKytdID0gX2hleFRvQnl0ZVtvY3RdO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gWmVybyBvdXQgcmVtYWluaW5nIGJ5dGVzIGlmIHN0cmluZyB3YXMgc2hvcnRcbiAgd2hpbGUgKGlpIDwgMTYpIHtcbiAgICBidWZbaSArIGlpKytdID0gMDtcbiAgfVxuXG4gIHJldHVybiBidWY7XG59XG5cbi8vICoqYHVucGFyc2UoKWAgLSBDb252ZXJ0IFVVSUQgYnl0ZSBhcnJheSAoYWxhIHBhcnNlKCkpIGludG8gYSBzdHJpbmcqKlxuZnVuY3Rpb24gdW5wYXJzZShidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IG9mZnNldCB8fCAwO1xuICB2YXIgYnRoID0gX2J5dGVUb0hleDtcbiAgcmV0dXJuICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwYXJzZTogcGFyc2UsXG4gIHVucGFyc2U6IHVucGFyc2Vcbn07XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHV1aWR2NCA9IHJlcXVpcmUoJy4vdXVpZCcpXG5jb25zdCBwYXJzZXIgPSByZXF1aXJlKCd1dWlkLXBhcnNlJylcbmNvbnN0IG1heEludCA9IE1hdGgucG93KDIsIDMxKSAtIDFcbmNvbnN0IEJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpLkJ1ZmZlclxuXG5mdW5jdGlvbiBoeXBlcmlkIChvcHRzKSB7XG4gIGxldCBmaXhlZExlbmd0aCA9IGZhbHNlXG4gIGxldCB1cmxTYWZlID0gZmFsc2VcbiAgaWYgKHR5cGVvZiBvcHRzID09PSAnYm9vbGVhbicpIHtcbiAgICBmaXhlZExlbmd0aCA9IG9wdHNcbiAgfSBlbHNlIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fVxuICAgIHVybFNhZmUgPSAhIW9wdHMudXJsU2FmZVxuICAgIGZpeGVkTGVuZ3RoID0gISFvcHRzLmZpeGVkTGVuZ3RoXG4gIH1cblxuICBnZW5lcmF0ZS51dWlkID0gdXVpZHY0KClcbiAgZ2VuZXJhdGUuZGVjb2RlID0gZGVjb2RlXG5cbiAgbGV0IGlkID0gYmFzZUlkKGdlbmVyYXRlLnV1aWQsIHVybFNhZmUpXG4gIGxldCBjb3VudCA9IE1hdGguZmxvb3Iob3B0cy5zdGFydEZyb20gfHwgMClcblxuICBpZiAoaXNOYU4oY291bnQpIHx8ICEobWF4SW50ID4gY291bnQgJiYgY291bnQgPj0gMCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoW1xuICAgICAgYHdoZW4gcGFzc2VkLCBvcHRzLnN0YXJ0RnJvbSBtdXN0IGJlIGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgJHttYXhJbnR9LmAsXG4gICAgICAnT25seSB0aGUgaW50ZWdlciBwYXJ0IG1hdHRlcnMuJyxcbiAgICAgIGAtIGdvdDogJHtvcHRzLnN0YXJ0RnJvbX1gXG4gICAgXS5qb2luKCdcXG4nKSlcbiAgfVxuXG4gIHJldHVybiBnZW5lcmF0ZVxuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlICgpIHtcbiAgICBjb25zdCByZXN1bHQgPSBmaXhlZExlbmd0aFxuICAgICAgPyBpZCArIHBhZChjb3VudCsrKVxuICAgICAgOiBpZCArIGNvdW50KytcblxuICAgIGlmIChjb3VudCA9PT0gbWF4SW50KSB7XG4gICAgICBnZW5lcmF0ZS51dWlkID0gdXVpZHY0KClcbiAgICAgIGlkID0gYmFzZUlkKGdlbmVyYXRlLnV1aWQsIHVybFNhZmUpIC8vIHJlYmFzZVxuICAgICAgY291bnQgPSAwXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG59XG5cbmZ1bmN0aW9uIHBhZCAoY291bnQpIHtcbiAgaWYgKGNvdW50IDwgMTApIHJldHVybiAnMDAwMDAwMDAwJyArIGNvdW50XG4gIGlmIChjb3VudCA8IDEwMCkgcmV0dXJuICcwMDAwMDAwMCcgKyBjb3VudFxuICBpZiAoY291bnQgPCAxMDAwKSByZXR1cm4gJzAwMDAwMDAnICsgY291bnRcbiAgaWYgKGNvdW50IDwgMTAwMDApIHJldHVybiAnMDAwMDAwJyArIGNvdW50XG4gIGlmIChjb3VudCA8IDEwMDAwMCkgcmV0dXJuICcwMDAwMCcgKyBjb3VudFxuICBpZiAoY291bnQgPCAxMDAwMDAwKSByZXR1cm4gJzAwMDAnICsgY291bnRcbiAgaWYgKGNvdW50IDwgMTAwMDAwMDApIHJldHVybiAnMDAwJyArIGNvdW50XG4gIGlmIChjb3VudCA8IDEwMDAwMDAwMCkgcmV0dXJuICcwMCcgKyBjb3VudFxuICBpZiAoY291bnQgPCAxMDAwMDAwMDAwKSByZXR1cm4gJzAnICsgY291bnRcbiAgcmV0dXJuIGNvdW50XG59XG5cbmZ1bmN0aW9uIGJhc2VJZCAoaWQsIHVybFNhZmUpIHtcbiAgbGV0IGJhc2U2NElkID0gQnVmZmVyLmZyb20ocGFyc2VyLnBhcnNlKGlkKSkudG9TdHJpbmcoJ2Jhc2U2NCcpXG4gIGNvbnN0IGwgPSBiYXNlNjRJZC5sZW5ndGhcbiAgaWYgKHVybFNhZmUpIHtcbiAgICBpZiAoYmFzZTY0SWRbbCAtIDJdID09PSAnPScgJiYgYmFzZTY0SWRbbCAtIDFdID09PSAnPScpIHtcbiAgICAgIGJhc2U2NElkID0gYmFzZTY0SWQuc3Vic3RyKDAsIGwgLSAyKSArICctJ1xuICAgIH1cbiAgICByZXR1cm4gYmFzZTY0SWQucmVwbGFjZSgvXFwrL2csICctJykucmVwbGFjZSgvXFwvL2csICdfJylcbiAgfVxuICBpZiAoYmFzZTY0SWRbbCAtIDJdID09PSAnPScgJiYgYmFzZTY0SWRbbCAtIDFdID09PSAnPScpIHtcbiAgICByZXR1cm4gYmFzZTY0SWQuc3Vic3RyKDAsIGwgLSAyKSArICcvJ1xuICB9XG4gIHJldHVybiBiYXNlNjRJZFxufVxuXG5mdW5jdGlvbiBkZWNvZGUgKGlkLCBvcHRzKSB7XG4gIG9wdHMgPSBvcHRzIHx8IHt9XG4gIGNvbnN0IHVybFNhZmUgPSAhIW9wdHMudXJsU2FmZVxuXG4gIGlmICh1cmxTYWZlKSB7XG4gICAgLy8gbmVlZCB0byBmaXJzdCBjb252ZXJ0IHRoZSBsYXN0IG1pbnVzIHRvIHNsYXNoLFxuICAgIC8vIHRoZW4gdGhlIHJlbWFpbmluZyB0byBwbHVzXG4gICAgaWQgPSBpZC5yZXBsYWNlKC8tKFteLV0qKSQvLCAnLycgKyAnJDEnKVxuICAgICAgLnJlcGxhY2UoLy0vZywgJysnKVxuICAgICAgLnJlcGxhY2UoL18vZywgJy8nKVxuICB9XG5cbiAgY29uc3QgbGFzdFNsYXNoSW5kZXggPSBpZC5sYXN0SW5kZXhPZignLycpXG4gIGlmIChsYXN0U2xhc2hJbmRleCA9PT0gLTEpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIGNvbnN0IHV1aWRQYXJ0ID0gaWQuc3Vic3RyaW5nKDAsIGxhc3RTbGFzaEluZGV4KVxuICBjb25zdCBjb3VudFBhcnQgPSBOdW1iZXIoaWQuc3Vic3RyaW5nKGxhc3RTbGFzaEluZGV4ICsgMSkpXG4gIGlmICghdXVpZFBhcnQgfHwgaXNOYU4oY291bnRQYXJ0KSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBjb25zdCByZXN1bHQgPSB7XG4gICAgdXVpZDogcGFyc2VyLnVucGFyc2UoQnVmZmVyLmZyb20odXVpZFBhcnQgKyAnPT0nLCAnYmFzZTY0JykpLFxuICAgIGNvdW50OiBjb3VudFBhcnRcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoeXBlcmlkXG5tb2R1bGUuZXhwb3J0cy5kZWNvZGUgPSBkZWNvZGVcbiIsICJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgbWlkZHkgPSAoYmFzZUhhbmRsZXIgPSAoKSA9PiB7fSwgcGx1Z2luKSA9PiB7XG4gIHZhciBfcGx1Z2luJGJlZm9yZVByZWZldGM7XG5cbiAgcGx1Z2luID09PSBudWxsIHx8IHBsdWdpbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9wbHVnaW4kYmVmb3JlUHJlZmV0YyA9IHBsdWdpbi5iZWZvcmVQcmVmZXRjaCkgPT09IG51bGwgfHwgX3BsdWdpbiRiZWZvcmVQcmVmZXRjID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcGx1Z2luJGJlZm9yZVByZWZldGMuY2FsbChwbHVnaW4pO1xuICBjb25zdCBiZWZvcmVNaWRkbGV3YXJlcyA9IFtdO1xuICBjb25zdCBhZnRlck1pZGRsZXdhcmVzID0gW107XG4gIGNvbnN0IG9uRXJyb3JNaWRkbGV3YXJlcyA9IFtdO1xuXG4gIGNvbnN0IGluc3RhbmNlID0gKGV2ZW50ID0ge30sIGNvbnRleHQgPSB7fSkgPT4ge1xuICAgIHZhciBfcGx1Z2luJHJlcXVlc3RTdGFydDtcblxuICAgIHBsdWdpbiA9PT0gbnVsbCB8fCBwbHVnaW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfcGx1Z2luJHJlcXVlc3RTdGFydCA9IHBsdWdpbi5yZXF1ZXN0U3RhcnQpID09PSBudWxsIHx8IF9wbHVnaW4kcmVxdWVzdFN0YXJ0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcGx1Z2luJHJlcXVlc3RTdGFydC5jYWxsKHBsdWdpbik7XG4gICAgY29uc3QgcmVxdWVzdCA9IHtcbiAgICAgIGV2ZW50LFxuICAgICAgY29udGV4dCxcbiAgICAgIHJlc3BvbnNlOiB1bmRlZmluZWQsXG4gICAgICBlcnJvcjogdW5kZWZpbmVkLFxuICAgICAgaW50ZXJuYWw6IHt9XG4gICAgfTtcbiAgICByZXR1cm4gcnVuUmVxdWVzdChyZXF1ZXN0LCBbLi4uYmVmb3JlTWlkZGxld2FyZXNdLCBiYXNlSGFuZGxlciwgWy4uLmFmdGVyTWlkZGxld2FyZXNdLCBbLi4ub25FcnJvck1pZGRsZXdhcmVzXSwgcGx1Z2luKTtcbiAgfTtcblxuICBpbnN0YW5jZS51c2UgPSBtaWRkbGV3YXJlcyA9PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWlkZGxld2FyZXMpKSB7XG4gICAgICBmb3IgKGNvbnN0IG1pZGRsZXdhcmUgb2YgbWlkZGxld2FyZXMpIHtcbiAgICAgICAgaW5zdGFuY2UuYXBwbHlNaWRkbGV3YXJlKG1pZGRsZXdhcmUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3RhbmNlLmFwcGx5TWlkZGxld2FyZShtaWRkbGV3YXJlcyk7XG4gIH07XG5cbiAgaW5zdGFuY2UuYXBwbHlNaWRkbGV3YXJlID0gbWlkZGxld2FyZSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgYmVmb3JlLFxuICAgICAgYWZ0ZXIsXG4gICAgICBvbkVycm9yXG4gICAgfSA9IG1pZGRsZXdhcmU7XG5cbiAgICBpZiAoIWJlZm9yZSAmJiAhYWZ0ZXIgJiYgIW9uRXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlkZGxld2FyZSBtdXN0IGJlIGFuIG9iamVjdCBjb250YWluaW5nIGF0IGxlYXN0IG9uZSBrZXkgYW1vbmcgXCJiZWZvcmVcIiwgXCJhZnRlclwiLCBcIm9uRXJyb3JcIicpO1xuICAgIH1cblxuICAgIGlmIChiZWZvcmUpIGluc3RhbmNlLmJlZm9yZShiZWZvcmUpO1xuICAgIGlmIChhZnRlcikgaW5zdGFuY2UuYWZ0ZXIoYWZ0ZXIpO1xuICAgIGlmIChvbkVycm9yKSBpbnN0YW5jZS5vbkVycm9yKG9uRXJyb3IpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfTsgLy8gSW5saW5lIE1pZGRsZXdhcmVzXG5cblxuICBpbnN0YW5jZS5iZWZvcmUgPSBiZWZvcmVNaWRkbGV3YXJlID0+IHtcbiAgICBiZWZvcmVNaWRkbGV3YXJlcy5wdXNoKGJlZm9yZU1pZGRsZXdhcmUpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfTtcblxuICBpbnN0YW5jZS5hZnRlciA9IGFmdGVyTWlkZGxld2FyZSA9PiB7XG4gICAgYWZ0ZXJNaWRkbGV3YXJlcy51bnNoaWZ0KGFmdGVyTWlkZGxld2FyZSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9O1xuXG4gIGluc3RhbmNlLm9uRXJyb3IgPSBvbkVycm9yTWlkZGxld2FyZSA9PiB7XG4gICAgb25FcnJvck1pZGRsZXdhcmVzLnB1c2gob25FcnJvck1pZGRsZXdhcmUpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfTtcblxuICBpbnN0YW5jZS5fX21pZGRsZXdhcmVzID0ge1xuICAgIGJlZm9yZTogYmVmb3JlTWlkZGxld2FyZXMsXG4gICAgYWZ0ZXI6IGFmdGVyTWlkZGxld2FyZXMsXG4gICAgb25FcnJvcjogb25FcnJvck1pZGRsZXdhcmVzXG4gIH07XG4gIHJldHVybiBpbnN0YW5jZTtcbn07XG5cbmNvbnN0IHJ1blJlcXVlc3QgPSBhc3luYyAocmVxdWVzdCwgYmVmb3JlTWlkZGxld2FyZXMsIGJhc2VIYW5kbGVyLCBhZnRlck1pZGRsZXdhcmVzLCBvbkVycm9yTWlkZGxld2FyZXMsIHBsdWdpbikgPT4ge1xuICB0cnkge1xuICAgIGF3YWl0IHJ1bk1pZGRsZXdhcmVzKHJlcXVlc3QsIGJlZm9yZU1pZGRsZXdhcmVzLCBwbHVnaW4pOyAvLyBDaGVjayBpZiBiZWZvcmUgc3RhY2sgaGFzbid0IGV4aXQgZWFybHlcblxuICAgIGlmIChyZXF1ZXN0LnJlc3BvbnNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciBfcGx1Z2luJGJlZm9yZUhhbmRsZXIsIF9wbHVnaW4kYWZ0ZXJIYW5kbGVyO1xuXG4gICAgICBwbHVnaW4gPT09IG51bGwgfHwgcGx1Z2luID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX3BsdWdpbiRiZWZvcmVIYW5kbGVyID0gcGx1Z2luLmJlZm9yZUhhbmRsZXIpID09PSBudWxsIHx8IF9wbHVnaW4kYmVmb3JlSGFuZGxlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3BsdWdpbiRiZWZvcmVIYW5kbGVyLmNhbGwocGx1Z2luKTtcbiAgICAgIHJlcXVlc3QucmVzcG9uc2UgPSBhd2FpdCBiYXNlSGFuZGxlcihyZXF1ZXN0LmV2ZW50LCByZXF1ZXN0LmNvbnRleHQpO1xuICAgICAgcGx1Z2luID09PSBudWxsIHx8IHBsdWdpbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9wbHVnaW4kYWZ0ZXJIYW5kbGVyID0gcGx1Z2luLmFmdGVySGFuZGxlcikgPT09IG51bGwgfHwgX3BsdWdpbiRhZnRlckhhbmRsZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9wbHVnaW4kYWZ0ZXJIYW5kbGVyLmNhbGwocGx1Z2luKTtcbiAgICAgIGF3YWl0IHJ1bk1pZGRsZXdhcmVzKHJlcXVlc3QsIGFmdGVyTWlkZGxld2FyZXMsIHBsdWdpbik7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gUmVzZXQgcmVzcG9uc2UgY2hhbmdlcyBtYWRlIGJ5IGFmdGVyIHN0YWNrIGJlZm9yZSBlcnJvciB0aHJvd25cbiAgICByZXF1ZXN0LnJlc3BvbnNlID0gdW5kZWZpbmVkO1xuICAgIHJlcXVlc3QuZXJyb3IgPSBlO1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHJ1bk1pZGRsZXdhcmVzKHJlcXVlc3QsIG9uRXJyb3JNaWRkbGV3YXJlcywgcGx1Z2luKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBTYXZlIGVycm9yIHRoYXQgd2Fzbid0IGhhbmRsZWRcbiAgICAgIGUub3JpZ2luYWxFcnJvciA9IHJlcXVlc3QuZXJyb3I7XG4gICAgICByZXF1ZXN0LmVycm9yID0gZTtcbiAgICAgIHRocm93IHJlcXVlc3QuZXJyb3I7XG4gICAgfSAvLyBDYXRjaCBpZiBvbkVycm9yIHN0YWNrIGhhc24ndCBoYW5kbGVkIHRoZSBlcnJvclxuXG5cbiAgICBpZiAocmVxdWVzdC5yZXNwb25zZSA9PT0gdW5kZWZpbmVkKSB0aHJvdyByZXF1ZXN0LmVycm9yO1xuICB9IGZpbmFsbHkge1xuICAgIHZhciBfcGx1Z2luJHJlcXVlc3RFbmQ7XG5cbiAgICBhd2FpdCAocGx1Z2luID09PSBudWxsIHx8IHBsdWdpbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9wbHVnaW4kcmVxdWVzdEVuZCA9IHBsdWdpbi5yZXF1ZXN0RW5kKSA9PT0gbnVsbCB8fCBfcGx1Z2luJHJlcXVlc3RFbmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9wbHVnaW4kcmVxdWVzdEVuZC5jYWxsKHBsdWdpbiwgcmVxdWVzdCkpO1xuICB9XG5cbiAgcmV0dXJuIHJlcXVlc3QucmVzcG9uc2U7XG59O1xuXG5jb25zdCBydW5NaWRkbGV3YXJlcyA9IGFzeW5jIChyZXF1ZXN0LCBtaWRkbGV3YXJlcywgcGx1Z2luKSA9PiB7XG4gIGZvciAoY29uc3QgbmV4dE1pZGRsZXdhcmUgb2YgbWlkZGxld2FyZXMpIHtcbiAgICB2YXIgX3BsdWdpbiRiZWZvcmVNaWRkbGV3LCBfcGx1Z2luJGFmdGVyTWlkZGxld2E7XG5cbiAgICBwbHVnaW4gPT09IG51bGwgfHwgcGx1Z2luID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX3BsdWdpbiRiZWZvcmVNaWRkbGV3ID0gcGx1Z2luLmJlZm9yZU1pZGRsZXdhcmUpID09PSBudWxsIHx8IF9wbHVnaW4kYmVmb3JlTWlkZGxldyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3BsdWdpbiRiZWZvcmVNaWRkbGV3LmNhbGwocGx1Z2luLCBuZXh0TWlkZGxld2FyZSA9PT0gbnVsbCB8fCBuZXh0TWlkZGxld2FyZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV4dE1pZGRsZXdhcmUubmFtZSk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgKG5leHRNaWRkbGV3YXJlID09PSBudWxsIHx8IG5leHRNaWRkbGV3YXJlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBuZXh0TWlkZGxld2FyZShyZXF1ZXN0KSk7XG4gICAgcGx1Z2luID09PSBudWxsIHx8IHBsdWdpbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9wbHVnaW4kYWZ0ZXJNaWRkbGV3YSA9IHBsdWdpbi5hZnRlck1pZGRsZXdhcmUpID09PSBudWxsIHx8IF9wbHVnaW4kYWZ0ZXJNaWRkbGV3YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3BsdWdpbiRhZnRlck1pZGRsZXdhLmNhbGwocGx1Z2luLCBuZXh0TWlkZGxld2FyZSA9PT0gbnVsbCB8fCBuZXh0TWlkZGxld2FyZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV4dE1pZGRsZXdhcmUubmFtZSk7IC8vIHNob3J0IGNpcmN1aXQgY2hhaW5pbmcgYW5kIHJlc3BvbmQgZWFybHlcblxuICAgIGlmIChyZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZSA9IHJlcztcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbWlkZHk7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGV4Y2VwdGlvbnNMaXN0ID0gWydBTFBOJywgJ0MtUEVQJywgJ0MtUEVQLUluZm8nLCAnQ2FsREFWLVRpbWV6b25lcycsICdDb250ZW50LUlEJywgJ0NvbnRlbnQtTUQ1JywgJ0RBU0wnLCAnREFWJywgJ0ROVCcsICdFVGFnJywgJ0dldFByb2ZpbGUnLCAnSFRUUDItU2V0dGluZ3MnLCAnTGFzdC1FdmVudC1JRCcsICdNSU1FLVZlcnNpb24nLCAnT3B0aW9uYWwtV1dXLUF1dGhlbnRpY2F0ZScsICdTZWMtV2ViU29ja2V0LUFjY2VwdCcsICdTZWMtV2ViU29ja2V0LUV4dGVuc2lvbnMnLCAnU2VjLVdlYlNvY2tldC1LZXknLCAnU2VjLVdlYlNvY2tldC1Qcm90b2NvbCcsICdTZWMtV2ViU29ja2V0LVZlcnNpb24nLCAnU0xVRycsICdUQ04nLCAnVEUnLCAnVFRMJywgJ1dXVy1BdXRoZW50aWNhdGUnLCAnWC1BVFQtRGV2aWNlSWQnLCAnWC1ETlNQcmVmZXRjaC1Db250cm9sJywgJ1gtVUlESCddO1xuY29uc3QgZXhjZXB0aW9ucyA9IGV4Y2VwdGlvbnNMaXN0LnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XG4gIGFjY1tjdXJyLnRvTG93ZXJDYXNlKCldID0gY3VycjtcbiAgcmV0dXJuIGFjYztcbn0sIHt9KTtcblxuY29uc3Qgbm9ybWFsaXplSGVhZGVyS2V5ID0gKGtleSwgY2Fub25pY2FsKSA9PiB7XG4gIGlmIChleGNlcHRpb25zW2tleS50b0xvd2VyQ2FzZSgpXSkge1xuICAgIHJldHVybiBleGNlcHRpb25zW2tleS50b0xvd2VyQ2FzZSgpXTtcbiAgfVxuXG4gIGlmICghY2Fub25pY2FsKSB7XG4gICAgcmV0dXJuIGtleS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgcmV0dXJuIGtleS5zcGxpdCgnLScpLm1hcCh0ZXh0ID0+IHRleHRbMF0udG9VcHBlckNhc2UoKSArIHRleHQuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCkpLmpvaW4oJy0nKTtcbn07XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBjYW5vbmljYWw6IGZhbHNlLFxuICBub3JtYWxpemVIZWFkZXJLZXlcbn07XG5cbmNvbnN0IGh0dHBIZWFkZXJOb3JtYWxpemVyTWlkZGxld2FyZSA9IChvcHRzID0ge30pID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IHsgLi4uZGVmYXVsdHMsXG4gICAgLi4ub3B0c1xuICB9O1xuXG4gIGNvbnN0IGh0dHBIZWFkZXJOb3JtYWxpemVyTWlkZGxld2FyZUJlZm9yZSA9IGFzeW5jIHJlcXVlc3QgPT4ge1xuICAgIGlmIChyZXF1ZXN0LmV2ZW50LmhlYWRlcnMpIHtcbiAgICAgIGNvbnN0IHJhd0hlYWRlcnMgPSB7fTtcbiAgICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKHJlcXVlc3QuZXZlbnQuaGVhZGVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICByYXdIZWFkZXJzW2tleV0gPSByZXF1ZXN0LmV2ZW50LmhlYWRlcnNba2V5XTtcbiAgICAgICAgaGVhZGVyc1tvcHRpb25zLm5vcm1hbGl6ZUhlYWRlcktleShrZXksIG9wdGlvbnMuY2Fub25pY2FsKV0gPSByZXF1ZXN0LmV2ZW50LmhlYWRlcnNba2V5XTtcbiAgICAgIH0pO1xuICAgICAgcmVxdWVzdC5ldmVudC5oZWFkZXJzID0gaGVhZGVycztcbiAgICAgIHJlcXVlc3QuZXZlbnQucmF3SGVhZGVycyA9IHJhd0hlYWRlcnM7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3QuZXZlbnQubXVsdGlWYWx1ZUhlYWRlcnMpIHtcbiAgICAgIGNvbnN0IHJhd0hlYWRlcnMgPSB7fTtcbiAgICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKHJlcXVlc3QuZXZlbnQubXVsdGlWYWx1ZUhlYWRlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgcmF3SGVhZGVyc1trZXldID0gcmVxdWVzdC5ldmVudC5tdWx0aVZhbHVlSGVhZGVyc1trZXldO1xuICAgICAgICBoZWFkZXJzW29wdGlvbnMubm9ybWFsaXplSGVhZGVyS2V5KGtleSwgb3B0aW9ucy5jYW5vbmljYWwpXSA9IHJlcXVlc3QuZXZlbnQubXVsdGlWYWx1ZUhlYWRlcnNba2V5XTtcbiAgICAgIH0pO1xuICAgICAgcmVxdWVzdC5ldmVudC5tdWx0aVZhbHVlSGVhZGVycyA9IGhlYWRlcnM7XG4gICAgICByZXF1ZXN0LmV2ZW50LnJhd011bHRpVmFsdWVIZWFkZXJzID0gcmF3SGVhZGVycztcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBiZWZvcmU6IGh0dHBIZWFkZXJOb3JtYWxpemVyTWlkZGxld2FyZUJlZm9yZVxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBodHRwSGVhZGVyTm9ybWFsaXplck1pZGRsZXdhcmU7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHtcbiAgQWdlbnRcbn0gPSByZXF1aXJlKCdodHRwcycpOyAvLyBjb25zdCB7IE5vZGVIdHRwSGFuZGxlciB9ID0gcmVxdWlyZSgnQGF3cy1zZGsvbm9kZS1odHRwLWhhbmRsZXInKSAvLyBhd3Mtc2RrIHYzXG5cblxuY29uc3QgYXdzQ2xpZW50RGVmYXVsdE9wdGlvbnMgPSB7XG4gIC8vIEFXUyBTREsgdjNcbiAgLy8gRG9jczogaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL3Nkay1mb3ItamF2YXNjcmlwdC92My9kZXZlbG9wZXItZ3VpZGUvZW5mb3JjaW5nLXRscy5odG1sXG5cbiAgLyogcmVxdWVzdEhhbmRsZXI6IG5ldyBOb2RlSHR0cEhhbmRsZXIoe1xuICAgIGh0dHBzQWdlbnQ6IG5ldyBBZ2VudChcbiAgICAgIHtcbiAgICAgICAgc2VjdXJlUHJvdG9jb2w6ICdUTFN2MV8yX21ldGhvZCdcbiAgICAgIH1cbiAgICApXG4gIH0pICovXG4gIC8vIERvY3M6IGh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9zZGstZm9yLWphdmFzY3JpcHQvdjIvZGV2ZWxvcGVyLWd1aWRlL2VuZm9yY2luZy10bHMuaHRtbFxuICBodHRwT3B0aW9uczoge1xuICAgIGFnZW50OiBuZXcgQWdlbnQoe1xuICAgICAgc2VjdXJlUHJvdG9jb2w6ICdUTFN2MV8yX21ldGhvZCdcbiAgICB9KVxuICB9XG59O1xuXG5jb25zdCBjcmVhdGVQcmVmZXRjaENsaWVudCA9IG9wdGlvbnMgPT4ge1xuICBjb25zdCBhd3NDbGllbnRPcHRpb25zID0geyAuLi5hd3NDbGllbnREZWZhdWx0T3B0aW9ucyxcbiAgICAuLi5vcHRpb25zLmF3c0NsaWVudE9wdGlvbnNcbiAgfTtcbiAgY29uc3QgY2xpZW50ID0gbmV3IG9wdGlvbnMuQXdzQ2xpZW50KGF3c0NsaWVudE9wdGlvbnMpOyAvLyBBV1MgWFJheVxuXG4gIGlmIChvcHRpb25zLmF3c0NsaWVudENhcHR1cmUpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5hd3NDbGllbnRDYXB0dXJlKGNsaWVudCk7XG4gIH1cblxuICByZXR1cm4gY2xpZW50O1xufTtcblxuY29uc3QgY3JlYXRlQ2xpZW50ID0gYXN5bmMgKG9wdGlvbnMsIHJlcXVlc3QpID0+IHtcbiAgbGV0IGF3c0NsaWVudENyZWRlbnRpYWxzID0ge307IC8vIFJvbGUgQ3JlZGVudGlhbHNcblxuICBpZiAob3B0aW9ucy5hd3NDbGllbnRBc3N1bWVSb2xlKSB7XG4gICAgaWYgKCFyZXF1ZXN0KSB0aHJvdyBuZXcgRXJyb3IoJ1JlcXVlc3QgcmVxdWlyZWQgd2hlbiBhc3N1bWluZyByb2xlJyk7XG4gICAgYXdzQ2xpZW50Q3JlZGVudGlhbHMgPSBhd2FpdCBnZXRJbnRlcm5hbCh7XG4gICAgICBjcmVkZW50aWFsczogb3B0aW9ucy5hd3NDbGllbnRBc3N1bWVSb2xlXG4gICAgfSwgcmVxdWVzdCk7XG4gIH1cblxuICBhd3NDbGllbnRDcmVkZW50aWFscyA9IHsgLi4uYXdzQ2xpZW50Q3JlZGVudGlhbHMsXG4gICAgLi4ub3B0aW9ucy5hd3NDbGllbnRPcHRpb25zXG4gIH07XG4gIHJldHVybiBjcmVhdGVQcmVmZXRjaENsaWVudCh7IC4uLm9wdGlvbnMsXG4gICAgYXdzQ2xpZW50T3B0aW9uczogYXdzQ2xpZW50Q3JlZGVudGlhbHNcbiAgfSk7XG59O1xuXG5jb25zdCBjYW5QcmVmZXRjaCA9IG9wdGlvbnMgPT4ge1xuICByZXR1cm4gIShvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCAmJiBvcHRpb25zLmF3c0NsaWVudEFzc3VtZVJvbGUpICYmICEob3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgJiYgb3B0aW9ucy5kaXNhYmxlUHJlZmV0Y2gpO1xufTsgLy8gSW50ZXJuYWwgQ29udGV4dFxuXG5cbmNvbnN0IGdldEludGVybmFsID0gYXN5bmMgKHZhcmlhYmxlcywgcmVxdWVzdCkgPT4ge1xuICBpZiAoIXZhcmlhYmxlcyB8fCAhcmVxdWVzdCkgcmV0dXJuIHt9O1xuICBsZXQga2V5cyA9IFtdO1xuICBsZXQgdmFsdWVzID0gW107XG5cbiAgaWYgKHZhcmlhYmxlcyA9PT0gdHJ1ZSkge1xuICAgIGtleXMgPSB2YWx1ZXMgPSBPYmplY3Qua2V5cyhyZXF1ZXN0LmludGVybmFsKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFyaWFibGVzID09PSAnc3RyaW5nJykge1xuICAgIGtleXMgPSB2YWx1ZXMgPSBbdmFyaWFibGVzXTtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhcmlhYmxlcykpIHtcbiAgICBrZXlzID0gdmFsdWVzID0gdmFyaWFibGVzO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YXJpYWJsZXMgPT09ICdvYmplY3QnKSB7XG4gICAga2V5cyA9IE9iamVjdC5rZXlzKHZhcmlhYmxlcyk7XG4gICAgdmFsdWVzID0gT2JqZWN0LnZhbHVlcyh2YXJpYWJsZXMpO1xuICB9XG5cbiAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICBmb3IgKGNvbnN0IGludGVybmFsS2V5IG9mIHZhbHVlcykge1xuICAgIHZhciBfdmFsdWVQcm9taXNlO1xuXG4gICAgLy8gJ2ludGVybmFsLmtleS5zdWJfdmFsdWUnIC0+IHsgW2tleV06IGludGVybmFsLmtleS5zdWJfdmFsdWUgfVxuICAgIGNvbnN0IHBhdGhPcHRpb25LZXkgPSBpbnRlcm5hbEtleS5zcGxpdCgnLicpO1xuICAgIGNvbnN0IHJvb3RPcHRpb25LZXkgPSBwYXRoT3B0aW9uS2V5LnNoaWZ0KCk7XG4gICAgbGV0IHZhbHVlUHJvbWlzZSA9IHJlcXVlc3QuaW50ZXJuYWxbcm9vdE9wdGlvbktleV07XG5cbiAgICBpZiAodHlwZW9mICgoX3ZhbHVlUHJvbWlzZSA9IHZhbHVlUHJvbWlzZSkgPT09IG51bGwgfHwgX3ZhbHVlUHJvbWlzZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3ZhbHVlUHJvbWlzZS50aGVuKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFsdWVQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHZhbHVlUHJvbWlzZSk7XG4gICAgfVxuXG4gICAgcHJvbWlzZXMucHVzaCh2YWx1ZVByb21pc2UudGhlbih2YWx1ZSA9PiBwYXRoT3B0aW9uS2V5LnJlZHVjZSgocCwgYykgPT4gcCA9PT0gbnVsbCB8fCBwID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwW2NdLCB2YWx1ZSkpKTtcbiAgfSAvLyBlbnN1cmUgcHJvbWlzZSBoYXMgcmVzb2x2ZWQgYnkgdGhlIHRpbWUgaXQncyBuZWVkZWRcbiAgLy8gSWYgb25lIG9mIHRoZSBwcm9taXNlcyB0aHJvd3MgaXQgd2lsbCBidWJibGUgdXAgdG8gQG1pZGR5L2NvcmVcblxuXG4gIHZhbHVlcyA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChwcm9taXNlcyk7XG4gIGNvbnN0IGVycm9ycyA9IHZhbHVlcy5maWx0ZXIocmVzID0+IHJlcy5zdGF0dXMgPT09ICdyZWplY3RlZCcpLm1hcChyZXMgPT4gcmVzLnJlYXNvbi5tZXNzYWdlKTtcbiAgaWYgKGVycm9ycy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeShlcnJvcnMpKTtcbiAgcmV0dXJuIGtleXMucmVkdWNlKChvYmosIGtleSwgaW5kZXgpID0+ICh7IC4uLm9iaixcbiAgICBbc2FuaXRpemVLZXkoa2V5KV06IHZhbHVlc1tpbmRleF0udmFsdWVcbiAgfSksIHt9KTtcbn07XG5cbmNvbnN0IHNhbml0aXplS2V5UHJlZml4TGVhZGluZ051bWJlciA9IC9eKFswLTldKS87XG5jb25zdCBzYW5pdGl6ZUtleVJlbW92ZURpc2FsbG93ZWRDaGFyID0gL1teYS16QS1aMC05XSsvZztcblxuY29uc3Qgc2FuaXRpemVLZXkgPSBrZXkgPT4ge1xuICByZXR1cm4ga2V5LnJlcGxhY2Uoc2FuaXRpemVLZXlQcmVmaXhMZWFkaW5nTnVtYmVyLCAnXyQxJykucmVwbGFjZShzYW5pdGl6ZUtleVJlbW92ZURpc2FsbG93ZWRDaGFyLCAnXycpO1xufTsgLy8gZmV0Y2ggQ2FjaGVcblxuXG5jb25zdCBjYWNoZSA9IHt9OyAvLyBrZXk6IHsgdmFsdWU6e2ZldGNoS2V5OlByb21pc2V9LCBleHBpcnkgfVxuXG5jb25zdCBwcm9jZXNzQ2FjaGUgPSAob3B0aW9ucywgZmV0Y2ggPSAoKSA9PiB1bmRlZmluZWQsIHJlcXVlc3QpID0+IHtcbiAgY29uc3Qge1xuICAgIGNhY2hlRXhwaXJ5LFxuICAgIGNhY2hlS2V5XG4gIH0gPSBvcHRpb25zO1xuXG4gIGlmIChjYWNoZUV4cGlyeSkge1xuICAgIGNvbnN0IGNhY2hlZCA9IGdldENhY2hlKGNhY2hlS2V5KTtcbiAgICBjb25zdCB1bmV4cGlyZWQgPSBjYWNoZWQgJiYgKGNhY2hlRXhwaXJ5IDwgMCB8fCBjYWNoZWQuZXhwaXJ5ID4gRGF0ZS5ub3coKSk7XG5cbiAgICBpZiAodW5leHBpcmVkICYmIGNhY2hlZC5tb2RpZmllZCkge1xuICAgICAgY29uc3QgdmFsdWUgPSBmZXRjaChyZXF1ZXN0LCBjYWNoZWQudmFsdWUpO1xuICAgICAgY2FjaGVbY2FjaGVLZXldID0ge1xuICAgICAgICB2YWx1ZTogeyAuLi5jYWNoZWQudmFsdWUsXG4gICAgICAgICAgLi4udmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAgZXhwaXJ5OiBjYWNoZWQuZXhwaXJ5XG4gICAgICB9O1xuICAgICAgcmV0dXJuIGNhY2hlW2NhY2hlS2V5XTtcbiAgICB9XG5cbiAgICBpZiAodW5leHBpcmVkKSB7XG4gICAgICByZXR1cm4geyAuLi5jYWNoZWQsXG4gICAgICAgIGNhY2hlOiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHZhbHVlID0gZmV0Y2gocmVxdWVzdCk7XG4gIGNvbnN0IGV4cGlyeSA9IERhdGUubm93KCkgKyBjYWNoZUV4cGlyeTtcblxuICBpZiAoY2FjaGVFeHBpcnkpIHtcbiAgICBjYWNoZVtjYWNoZUtleV0gPSB7XG4gICAgICB2YWx1ZSxcbiAgICAgIGV4cGlyeVxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHZhbHVlLFxuICAgIGV4cGlyeVxuICB9O1xufTtcblxuY29uc3QgZ2V0Q2FjaGUgPSBrZXkgPT4ge1xuICByZXR1cm4gY2FjaGVba2V5XTtcbn07IC8vIFVzZWQgdG8gcmVtb3ZlIHBhcnRzIG9mIGEgY2FjaGVcblxuXG5jb25zdCBtb2RpZnlDYWNoZSA9IChjYWNoZUtleSwgdmFsdWUpID0+IHtcbiAgaWYgKCFjYWNoZVtjYWNoZUtleV0pIHJldHVybjtcbiAgY2FjaGVbY2FjaGVLZXldID0geyAuLi5jYWNoZVtjYWNoZUtleV0sXG4gICAgdmFsdWUsXG4gICAgbW9kaWZpZWQ6IHRydWVcbiAgfTtcbn07XG5cbmNvbnN0IGNsZWFyQ2FjaGUgPSAoa2V5cyA9IG51bGwpID0+IHtcbiAgdmFyIF9rZXlzO1xuXG4gIGtleXMgPSAoX2tleXMgPSBrZXlzKSAhPT0gbnVsbCAmJiBfa2V5cyAhPT0gdm9pZCAwID8gX2tleXMgOiBPYmplY3Qua2V5cyhjYWNoZSk7XG4gIGlmICghQXJyYXkuaXNBcnJheShrZXlzKSkga2V5cyA9IFtrZXlzXTtcblxuICBmb3IgKGNvbnN0IGNhY2hlS2V5IG9mIGtleXMpIHtcbiAgICBjYWNoZVtjYWNoZUtleV0gPSB1bmRlZmluZWQ7XG4gIH1cbn07XG5cbmNvbnN0IGpzb25TYWZlUGFyc2UgPSAoc3RyaW5nLCByZXZpdmVyKSA9PiB7XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykgcmV0dXJuIHN0cmluZztcbiAgY29uc3QgZmlyc3RDaGFyID0gc3RyaW5nWzBdO1xuICBpZiAoZmlyc3RDaGFyICE9PSAneycgJiYgZmlyc3RDaGFyICE9PSAnWycgJiYgZmlyc3RDaGFyICE9PSAnXCInKSByZXR1cm4gc3RyaW5nO1xuXG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyaW5nLCByZXZpdmVyKTtcbiAgfSBjYXRjaCAoZSkge31cblxuICByZXR1cm4gc3RyaW5nO1xufTtcblxuY29uc3Qgbm9ybWFsaXplSHR0cFJlc3BvbnNlID0gcmVzcG9uc2UgPT4ge1xuICB2YXIgX3Jlc3BvbnNlJGhlYWRlcnMsIF9yZXNwb25zZTtcblxuICAvLyBNYXkgcmVxdWlyZSB1cGRhdGluZyB0byBjYXRjaCBvdGhlciB0eXBlc1xuICBpZiAocmVzcG9uc2UgPT09IHVuZGVmaW5lZCkge1xuICAgIHJlc3BvbnNlID0ge307XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXNwb25zZSkgfHwgdHlwZW9mIHJlc3BvbnNlICE9PSAnb2JqZWN0JyB8fCByZXNwb25zZSA9PT0gbnVsbCkge1xuICAgIHJlc3BvbnNlID0ge1xuICAgICAgYm9keTogcmVzcG9uc2VcbiAgICB9O1xuICB9XG5cbiAgcmVzcG9uc2UuaGVhZGVycyA9IChfcmVzcG9uc2UkaGVhZGVycyA9IChfcmVzcG9uc2UgPSByZXNwb25zZSkgPT09IG51bGwgfHwgX3Jlc3BvbnNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcmVzcG9uc2UuaGVhZGVycykgIT09IG51bGwgJiYgX3Jlc3BvbnNlJGhlYWRlcnMgIT09IHZvaWQgMCA/IF9yZXNwb25zZSRoZWFkZXJzIDoge307XG4gIHJldHVybiByZXNwb25zZTtcbn07IC8vIHNtYWxsZXIgdmVyc2lvbiBvZiBgaHR0cC1lcnJvcnNgXG5cblxuY29uc3Qgc3RhdHVzZXMgPSByZXF1aXJlKCcuL2NvZGVzLmpzb24nKTtcblxuY29uc3Qge1xuICBpbmhlcml0c1xufSA9IHJlcXVpcmUoJ3V0aWwnKTtcblxuY29uc3QgY3JlYXRlRXJyb3JSZWdleHAgPSAvW15hLXpBLVpdL2c7XG5cbmNvbnN0IGNyZWF0ZUVycm9yID0gKGNvZGUsIG1lc3NhZ2UsIHByb3BlcnRpZXMgPSB7fSkgPT4ge1xuICBjb25zdCBuYW1lID0gc3RhdHVzZXNbY29kZV0ucmVwbGFjZShjcmVhdGVFcnJvclJlZ2V4cCwgJycpO1xuICBjb25zdCBjbGFzc05hbWUgPSBuYW1lLnN1YnN0cigtNSkgIT09ICdFcnJvcicgPyBuYW1lICsgJ0Vycm9yJyA6IG5hbWU7XG5cbiAgZnVuY3Rpb24gSHR0cEVycm9yKG1lc3NhZ2UpIHtcbiAgICAvLyBjcmVhdGUgdGhlIGVycm9yIG9iamVjdFxuICAgIGNvbnN0IG1zZyA9IG1lc3NhZ2UgIT09IG51bGwgJiYgbWVzc2FnZSAhPT0gdm9pZCAwID8gbWVzc2FnZSA6IHN0YXR1c2VzW2NvZGVdO1xuICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihtc2cpOyAvLyBjYXB0dXJlIGEgc3RhY2sgdHJhY2UgdG8gdGhlIGNvbnN0cnVjdGlvbiBwb2ludFxuXG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZXJyLCBIdHRwRXJyb3IpOyAvLyBhZGp1c3QgdGhlIFtbUHJvdG90eXBlXV1cblxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihlcnIsIEh0dHBFcnJvci5wcm90b3R5cGUpOyAvLyByZWRlZmluZSB0aGUgZXJyb3IgbWVzc2FnZVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVyciwgJ21lc3NhZ2UnLCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IG1zZyxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7IC8vIHJlZGVmaW5lIHRoZSBlcnJvciBuYW1lXG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXJyLCAnbmFtZScsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IGNsYXNzTmFtZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIGVycjtcbiAgfVxuXG4gIGluaGVyaXRzKEh0dHBFcnJvciwgRXJyb3IpO1xuICBjb25zdCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihIdHRwRXJyb3IsICduYW1lJyk7XG4gIGRlc2MudmFsdWUgPSBjbGFzc05hbWU7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShIdHRwRXJyb3IsICduYW1lJywgZGVzYyk7XG4gIE9iamVjdC5hc3NpZ24oSHR0cEVycm9yLnByb3RvdHlwZSwge1xuICAgIHN0YXR1czogY29kZSxcbiAgICBzdGF0dXNDb2RlOiBjb2RlLFxuICAgIGV4cG9zZTogY29kZSA8IDUwMFxuICB9LCBwcm9wZXJ0aWVzKTtcbiAgcmV0dXJuIG5ldyBIdHRwRXJyb3IobWVzc2FnZSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlUHJlZmV0Y2hDbGllbnQsXG4gIGNyZWF0ZUNsaWVudCxcbiAgY2FuUHJlZmV0Y2gsXG4gIGdldEludGVybmFsLFxuICBzYW5pdGl6ZUtleSxcbiAgcHJvY2Vzc0NhY2hlLFxuICBnZXRDYWNoZSxcbiAgbW9kaWZ5Q2FjaGUsXG4gIGNsZWFyQ2FjaGUsXG4gIGpzb25TYWZlUGFyc2UsXG4gIG5vcm1hbGl6ZUh0dHBSZXNwb25zZSxcbiAgY3JlYXRlRXJyb3Jcbn07XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IG1pbWVQYXR0ZXJuID0gL15hcHBsaWNhdGlvblxcLyguK1xcKyk/anNvbig7LiopPyQvO1xuY29uc3QgZGVmYXVsdHMgPSB7XG4gIHJldml2ZXI6IHVuZGVmaW5lZFxufTtcblxuY29uc3QgaHR0cEpzb25Cb2R5UGFyc2VyTWlkZGxld2FyZSA9IChvcHRzID0ge30pID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IHsgLi4uZGVmYXVsdHMsXG4gICAgLi4ub3B0c1xuICB9O1xuXG4gIGNvbnN0IGh0dHBKc29uQm9keVBhcnNlck1pZGRsZXdhcmVCZWZvcmUgPSBhc3luYyByZXF1ZXN0ID0+IHtcbiAgICB2YXIgX2hlYWRlcnMkQ29udGVudFR5cGU7XG5cbiAgICBjb25zdCB7XG4gICAgICBoZWFkZXJzLFxuICAgICAgYm9keVxuICAgIH0gPSByZXF1ZXN0LmV2ZW50O1xuICAgIGNvbnN0IGNvbnRlbnRUeXBlSGVhZGVyID0gKF9oZWFkZXJzJENvbnRlbnRUeXBlID0gaGVhZGVycyA9PT0gbnVsbCB8fCBoZWFkZXJzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBoZWFkZXJzWydDb250ZW50LVR5cGUnXSkgIT09IG51bGwgJiYgX2hlYWRlcnMkQ29udGVudFR5cGUgIT09IHZvaWQgMCA/IF9oZWFkZXJzJENvbnRlbnRUeXBlIDogaGVhZGVycyA9PT0gbnVsbCB8fCBoZWFkZXJzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBoZWFkZXJzWydjb250ZW50LXR5cGUnXTtcblxuICAgIGlmIChtaW1lUGF0dGVybi50ZXN0KGNvbnRlbnRUeXBlSGVhZGVyKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlcXVlc3QuZXZlbnQuaXNCYXNlNjRFbmNvZGVkID8gQnVmZmVyLmZyb20oYm9keSwgJ2Jhc2U2NCcpLnRvU3RyaW5nKCkgOiBib2R5O1xuICAgICAgICByZXF1ZXN0LmV2ZW50LnJhd0JvZHkgPSBib2R5O1xuICAgICAgICByZXF1ZXN0LmV2ZW50LmJvZHkgPSBKU09OLnBhcnNlKGRhdGEsIG9wdGlvbnMucmV2aXZlcik7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIGNyZWF0ZUVycm9yXG4gICAgICAgIH0gPSByZXF1aXJlKCdAbWlkZHkvdXRpbCcpOyAvLyBVbnByb2Nlc3NhYmxlRW50aXR5XG5cblxuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcig0MjIsICdDb250ZW50IHR5cGUgZGVmaW5lZCBhcyBKU09OIGJ1dCBhbiBpbnZhbGlkIEpTT04gd2FzIHByb3ZpZGVkJyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYmVmb3JlOiBodHRwSnNvbkJvZHlQYXJzZXJNaWRkbGV3YXJlQmVmb3JlXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGh0dHBKc29uQm9keVBhcnNlck1pZGRsZXdhcmU7XG4iLCAiaW1wb3J0IHsgRHluYW1vREIgfSBmcm9tICdhd3Mtc2RrJ1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnZW52LXZhcic7XG5cbmltcG9ydCB7IERkYlJlcG8gfSBmcm9tICcuLi9hZGFwdGVycy9kZGJSZXBvJztcbmltcG9ydCB7IFNlY3JldHMgfSBmcm9tICcuLi9zZWNyZXRzL3NlY3JldHMnO1xuaW1wb3J0IHsgTGFtYmRhIH0gZnJvbSAnLi4vcG9ydHMvbGFtYmRhJztcblxuY29uc3QgcmVnaW9uID0gZ2V0KCdBV1NfUkVHSU9OJykucmVxdWlyZWQoKS5hc1N0cmluZygpO1xuY29uc3QgdGFibGVOYW1lID0gZ2V0KCdUQUJMRV9OQU1FJykucmVxdWlyZWQoKS5hc1N0cmluZygpO1xuXG5jb25zdCBkZGJEb2N1bWVudENsaWVudCA9IG5ldyBEeW5hbW9EQi5Eb2N1bWVudENsaWVudCh7IHJlZ2lvbiB9KVxuY29uc3QgZGRiUmVwbyA9IG5ldyBEZGJSZXBvKGRkYkRvY3VtZW50Q2xpZW50LCB7IHRhYmxlTmFtZSB9KTtcbmNvbnN0IHNlY3JldHMgPSBuZXcgU2VjcmV0cyhkZGJSZXBvKTtcblxuZXhwb3J0IGNvbnN0IHsgZ2V0U2VjcmV0SGFuZGxlcjogaGFuZGxlciB9ID0gbmV3IExhbWJkYShzZWNyZXRzKTtcbiIsICJpbXBvcnQgeyBEeW5hbW9EQiB9IGZyb20gJ2F3cy1zZGsnXG5cbmltcG9ydCB0eXBlIHsgVFNlY3JldCB9IGZyb20gJy4uL3NlY3JldHMvc2VjcmV0JztcblxudHlwZSBEZGJSZXBvT3B0aW9ucyA9IHsgdGFibGVOYW1lOiBzdHJpbmcgfTtcblxuZXhwb3J0IGludGVyZmFjZSBEZGJSZXBvSW1wbCB7XG4gIGNyZWF0ZVNlY3JldDogKHNlY3JldDogVFNlY3JldCkgPT4gUHJvbWlzZTxUU2VjcmV0PjtcbiAgZGVsZXRlU2VjcmV0OiAoc2VjcmV0SWQ6IHN0cmluZykgPT4gUHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IHVuZGVmaW5lZD47XG59XG5cbmV4cG9ydCBjbGFzcyBEZGJSZXBvIGltcGxlbWVudHMgRGRiUmVwb0ltcGwge1xuICByZWFkb25seSBkZGJEb2N1bWVudENsaWVudDogRHluYW1vREIuRG9jdW1lbnRDbGllbnQ7XG4gIHJlYWRvbmx5IHRhYmxlTmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGRkYkRvY3VtZW50Q2xpZW50OiBEeW5hbW9EQi5Eb2N1bWVudENsaWVudCwgeyB0YWJsZU5hbWUgfTogRGRiUmVwb09wdGlvbnMpIHtcbiAgICB0aGlzLmRkYkRvY3VtZW50Q2xpZW50ID0gZGRiRG9jdW1lbnRDbGllbnQ7XG4gICAgdGhpcy50YWJsZU5hbWUgPSB0YWJsZU5hbWU7XG4gIH1cblxuICBjcmVhdGVTZWNyZXQgPSBhc3luYyAoc2VjcmV0OiBUU2VjcmV0KSA9PiB7XG4gICAgYXdhaXQgdGhpcy5kZGJEb2N1bWVudENsaWVudC5wdXQoe1xuICAgICAgVGFibGVOYW1lOiB0aGlzLnRhYmxlTmFtZSxcbiAgICAgIEl0ZW06IHNlY3JldCxcbiAgICAgIENvbmRpdGlvbkV4cHJlc3Npb246ICdhdHRyaWJ1dGVfbm90X2V4aXN0cyhpZCknXG4gICAgfSkucHJvbWlzZSgpO1xuXG4gICAgcmV0dXJuIHNlY3JldDtcbiAgfTtcblxuICBkZWxldGVTZWNyZXQgPSBhc3luYyAoc2VjcmV0SWQ6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHsgQXR0cmlidXRlczogaXRlbSB9ID0gYXdhaXQgdGhpcy5kZGJEb2N1bWVudENsaWVudC5kZWxldGUoe1xuICAgICAgVGFibGVOYW1lOiB0aGlzLnRhYmxlTmFtZSxcbiAgICAgIEtleTogeyBpZDogc2VjcmV0SWQgfSxcbiAgICAgIFJldHVyblZhbHVlczogJ0FMTF9PTEQnXG4gICAgfSkucHJvbWlzZSgpO1xuXG4gICAgcmV0dXJuIGl0ZW07XG4gIH07XG59XG4iLCAiY2xhc3MgU2VjcmV0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMubmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2VjcmV0Tm90Rm91bmRFcnJvciBleHRlbmRzIFNlY3JldEVycm9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoJ1NlY3JldCBub3QgZm91bmQnKTtcbiAgfVxufVxuIiwgImltcG9ydCBoeXBlcmlkIGZyb20gJ2h5cGVyaWQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRTZWNyZXQge1xuICBpZDogc3RyaW5nO1xuICBjcmVhdGVkQXQ6IG51bWJlcjtcbiAgZXhwaXJlc0F0OiBudW1iZXI7XG4gIGVuY3J5cHRlZEJ5dGVzOiBzdHJpbmc7XG59XG5cbnR5cGUgTmV3UHJvcHMgPSB7IGVuY3J5cHRlZEJ5dGVzOiBzdHJpbmc7IGV4cGlyZXNJbjogbnVtYmVyIH07XG50eXBlIEZyb21EZGJJdGVtUHJvcHMgPSBQYXJ0aWFsPFNlY3JldD47XG5cbmNvbnN0IGdlbmVyYXRlSWQgPSBoeXBlcmlkKHsgdXJsU2FmZTogdHJ1ZSB9KTtcblxuZXhwb3J0IGNsYXNzIFNlY3JldCBpbXBsZW1lbnRzIFRTZWNyZXQge1xuICByZWFkb25seSBpZDogc3RyaW5nO1xuICByZWFkb25seSBjcmVhdGVkQXQ6IG51bWJlcjtcbiAgcmVhZG9ubHkgZXhwaXJlc0F0OiBudW1iZXI7XG4gIHJlYWRvbmx5IGVuY3J5cHRlZEJ5dGVzOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFRTZWNyZXQpIHtcbiAgICB0aGlzLmlkID0gcHJvcHMuaWQ7XG4gICAgdGhpcy5jcmVhdGVkQXQgPSBwcm9wcy5jcmVhdGVkQXQ7XG4gICAgdGhpcy5leHBpcmVzQXQgPSBwcm9wcy5leHBpcmVzQXQ7XG4gICAgdGhpcy5lbmNyeXB0ZWRCeXRlcyA9IHByb3BzLmVuY3J5cHRlZEJ5dGVzO1xuICB9XG5cbiAgc3RhdGljIG5ldyA9ICh7IGVuY3J5cHRlZEJ5dGVzLCBleHBpcmVzSW4gfTogTmV3UHJvcHMpOiBTZWNyZXQgPT4ge1xuICAgIGNvbnN0IGNyZWF0ZWRBdCA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgIGNvbnN0IGV4cGlyZXNBdCA9IGNyZWF0ZWRBdCArIGV4cGlyZXNJbjtcblxuICAgIHJldHVybiBuZXcgU2VjcmV0KHtcbiAgICAgIGlkOiBnZW5lcmF0ZUlkKCksXG4gICAgICBjcmVhdGVkQXQsXG4gICAgICBleHBpcmVzQXQsXG4gICAgICBlbmNyeXB0ZWRCeXRlc1xuICAgIH0pO1xuICB9O1xuXG4gIHN0YXRpYyBmcm9tRGRiSXRlbSA9IChpdGVtOiBGcm9tRGRiSXRlbVByb3BzKTogU2VjcmV0ID0+IHtcbiAgICAvLyBpZiAodHlwZW9mIGl0ZW0uaWQgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgcHJvcGVydHk6IGlkJylcbiAgICAvLyBpZiAodHlwZW9mIGl0ZW0uY3JlYXRlZEF0ICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIHByb3BlcnR5OiBjcmVhdGVkQXQnKVxuICAgIC8vIGlmICh0eXBlb2YgaXRlbS5leHBpcmVzQXQgIT09ICdudW1iZXInKSB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgcHJvcGVydHk6IGV4cGlyZXNBdCcpXG4gICAgLy8gaWYgKHR5cGVvZiBpdGVtLmVuY3J5cHRlZEJ5dGVzICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIHByb3BlcnR5OiBlbmNyeXB0ZWRCeXRlcycpXG5cbiAgICByZXR1cm4gbmV3IFNlY3JldCh7XG4gICAgICBpZDogJycsXG4gICAgICBjcmVhdGVkQXQ6IDAsXG4gICAgICBleHBpcmVzQXQ6IDAsXG4gICAgICBlbmNyeXB0ZWRCeXRlczogJycsXG4gICAgICAuLi5pdGVtXG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBEZGJSZXBvSW1wbCB9IGZyb20gJy4uL2FkYXB0ZXJzL2RkYlJlcG8nO1xuXG5pbXBvcnQgeyBTZWNyZXROb3RGb3VuZEVycm9yIH0gZnJvbSAnLi9lcnJvcic7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICcuL3NlY3JldCc7XG5cbnR5cGUgQ3JlYXRlU2VjcmV0SW5wdXQgPSB7IGVuY3J5cHRlZEJ5dGVzOiBzdHJpbmc7IGV4cGlyZXNJbjogbnVtYmVyIH07XG50eXBlIENyZWF0ZVNlY3JldFJlc3VsdCA9IHsgaWQ6IHN0cmluZyB9O1xuXG50eXBlIEJ1cm5TZWNyZXRJbnB1dCA9IHsgaWQ6IHN0cmluZyB9O1xudHlwZSBCdXJuU2VjcmV0UmVzdWx0ID0geyBlbmNyeXB0ZWRCeXRlczogc3RyaW5nIH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VjcmV0c0ltcGwge1xuICBjcmVhdGU6IChpbnB1dDogQ3JlYXRlU2VjcmV0SW5wdXQpID0+IFByb21pc2U8Q3JlYXRlU2VjcmV0UmVzdWx0PjtcbiAgYnVybjogKGlucHV0OiBCdXJuU2VjcmV0SW5wdXQpID0+IFByb21pc2U8QnVyblNlY3JldFJlc3VsdD47XG59XG5cbmV4cG9ydCBjbGFzcyBTZWNyZXRzIGltcGxlbWVudHMgU2VjcmV0c0ltcGwge1xuICByZWFkb25seSBkZGJSZXBvOiBEZGJSZXBvSW1wbDtcblxuICBjb25zdHJ1Y3RvcihkZGJSZXBvOiBEZGJSZXBvSW1wbCkge1xuICAgIHRoaXMuZGRiUmVwbyA9IGRkYlJlcG87XG4gIH1cblxuICBjcmVhdGUgPSBhc3luYyAoe1xuICAgIGVuY3J5cHRlZEJ5dGVzLFxuICAgIGV4cGlyZXNJblxuICB9OiBDcmVhdGVTZWNyZXRJbnB1dCk6IFByb21pc2U8Q3JlYXRlU2VjcmV0UmVzdWx0PiA9PiB7XG4gICAgY29uc3Qgc2VjcmV0ID0gU2VjcmV0Lm5ldyh7XG4gICAgICBlbmNyeXB0ZWRCeXRlcyxcbiAgICAgIGV4cGlyZXNJblxuICAgIH0pO1xuXG4gICAgY29uc3QgeyBpZCB9ID0gYXdhaXQgdGhpcy5kZGJSZXBvLmNyZWF0ZVNlY3JldChzZWNyZXQpO1xuICAgIHJldHVybiB7IGlkIH07XG4gIH07XG5cbiAgYnVybiA9IGFzeW5jICh7IGlkIH06IEJ1cm5TZWNyZXRJbnB1dCk6IFByb21pc2U8QnVyblNlY3JldFJlc3VsdD4gPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSBhd2FpdCB0aGlzLmRkYlJlcG8uZGVsZXRlU2VjcmV0KGlkKTtcblxuICAgIGlmICghaXRlbSkgdGhyb3cgbmV3IFNlY3JldE5vdEZvdW5kRXJyb3IoKTtcblxuICAgIGNvbnN0IHsgZW5jcnlwdGVkQnl0ZXMgfSA9IFNlY3JldC5mcm9tRGRiSXRlbShpdGVtKTtcbiAgICByZXR1cm4geyBlbmNyeXB0ZWRCeXRlcyB9O1xuICB9O1xufVxuIiwgImltcG9ydCBtaWRkeSBmcm9tICdAbWlkZHkvY29yZSc7XG5pbXBvcnQgaHR0cEhlYWRlck5vcm1hbGl6ZXIgZnJvbSAnQG1pZGR5L2h0dHAtaGVhZGVyLW5vcm1hbGl6ZXInO1xuaW1wb3J0IGpzb25Cb2R5UGFyc2VyIGZyb20gJ0BtaWRkeS9odHRwLWpzb24tYm9keS1wYXJzZXInO1xuaW1wb3J0IHR5cGUgKiBhcyBsYW1iZGEgZnJvbSAnYXdzLWxhbWJkYSc7XG5cbnR5cGUgT3ZlcnJpZGVFdmVudFByb3BzID0gJ2JvZHknIHwgJ3BhdGhQYXJhbWV0ZXJzJyB8ICdxdWVyeVN0cmluZ1BhcmFtZXRlcnMnIHwgJ2hlYWRlcnMnO1xuXG50eXBlIEFQSUdhdGV3YXlQcm94eUV2ZW50PFxuICBCb2R5IGV4dGVuZHMgdW5rbm93bixcbiAgUGF0aFBhcmFtcyBleHRlbmRzIHVua25vd24sXG4gIFF1ZXJ5U3RyaW5nUGFyYW1zIGV4dGVuZHMgdW5rbm93bixcbiAgSGVhZGVycyBleHRlbmRzIFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0gUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbj4gPSBPbWl0PGxhbWJkYS5BUElHYXRld2F5UHJveHlFdmVudCwgT3ZlcnJpZGVFdmVudFByb3BzPiAmIHtcbiAgcmF3Qm9keTogc3RyaW5nO1xuICBib2R5OiBCb2R5O1xuICBwYXRoUGFyYW1ldGVyczogUGF0aFBhcmFtcztcbiAgcXVlcnlTdHJpbmdQYXJhbWV0ZXJzOiBRdWVyeVN0cmluZ1BhcmFtcztcbiAgaGVhZGVyczogSGVhZGVycztcbn07XG5cbnR5cGUgQVBJR2F0ZXdheVByb3h5RXZlbnRIYW5kbGVyPFxuICBCb2R5IGV4dGVuZHMgdW5rbm93bixcbiAgUGF0aFBhcmFtcyBleHRlbmRzIHVua25vd24sXG4gIFF1ZXJ5U3RyaW5nUGFyYW1zIGV4dGVuZHMgdW5rbm93bixcbiAgSGVhZGVycyBleHRlbmRzIFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0gUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbj4gPSBsYW1iZGEuSGFuZGxlcjxcbiAgQVBJR2F0ZXdheVByb3h5RXZlbnQ8Qm9keSwgUGF0aFBhcmFtcywgUXVlcnlTdHJpbmdQYXJhbXMsIEhlYWRlcnM+LFxuICBsYW1iZGEuQVBJR2F0ZXdheVByb3h5UmVzdWx0XG4+O1xuXG5leHBvcnQgY29uc3QgZm9ybWF0SlNPTlJlc3BvbnNlID0gKFxuICByZXNwb25zZTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4gIHN0YXR1c0NvZGUgPSAyMDAsXG4gIGhlYWRlcnMgPSB7fVxuKSA9PiAoe1xuICBzdGF0dXNDb2RlLFxuICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXNwb25zZSksXG4gIGhlYWRlcnNcbn0pO1xuXG5leHBvcnQgY29uc3QgbWlkZGlmeSA9IDxcbiAgQm9keSBleHRlbmRzIHVua25vd24gPSB1bmtub3duLFxuICBQYXRoUGFyYW1zIGV4dGVuZHMgdW5rbm93biA9IHVua25vd24sXG4gIFF1ZXJ5U3RyaW5nUGFyYW1zIGV4dGVuZHMgdW5rbm93biA9IHVua25vd24sXG4gIEhlYWRlcnMgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4+KFxuICBoYW5kbGVyOiBBUElHYXRld2F5UHJveHlFdmVudEhhbmRsZXI8Qm9keSwgUGF0aFBhcmFtcywgUXVlcnlTdHJpbmdQYXJhbXMsIEhlYWRlcnM+XG4pID0+IG1pZGR5KGhhbmRsZXIpLnVzZShodHRwSGVhZGVyTm9ybWFsaXplcigpKS51c2UoanNvbkJvZHlQYXJzZXIoKSk7XG4iLCAiaW1wb3J0IHsgU2VjcmV0Tm90Rm91bmRFcnJvciB9IGZyb20gJy4uL3NlY3JldHMvZXJyb3InO1xuaW1wb3J0IHR5cGUgeyBTZWNyZXRzSW1wbCB9IGZyb20gJy4uL3NlY3JldHMvc2VjcmV0cyc7XG5pbXBvcnQgKiBhcyBhcGlHYXRld2F5IGZyb20gJy4vYXBpR2F0ZXdheSc7XG5cbmV4cG9ydCBjbGFzcyBMYW1iZGEge1xuICByZWFkb25seSBzZWNyZXRzOiBTZWNyZXRzSW1wbDtcblxuICBjb25zdHJ1Y3RvcihzZWNyZXRzOiBTZWNyZXRzSW1wbCkge1xuICAgIHRoaXMuc2VjcmV0cyA9IHNlY3JldHM7XG4gIH1cblxuICBjcmVhdGVTZWNyZXRIYW5kbGVyID0gYXBpR2F0ZXdheS5taWRkaWZ5PHsgZW5jcnlwdGVkQnl0ZXM6IHN0cmluZzsgZXhwaXJlc0luOiBudW1iZXIgfT4oXG4gICAgYXN5bmMgKHsgYm9keSB9KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2VjcmV0cy5jcmVhdGUoYm9keSk7XG4gICAgICAgIHJldHVybiBhcGlHYXRld2F5LmZvcm1hdEpTT05SZXNwb25zZShyZXNwb25zZSwgMjAxKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICByZXR1cm4gYXBpR2F0ZXdheS5mb3JtYXRKU09OUmVzcG9uc2UoeyBtZXNzYWdlOiAnSW50ZXJuYWwgZmFpbHVyZScgfSwgNTAwKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgZ2V0U2VjcmV0SGFuZGxlciA9IGFwaUdhdGV3YXkubWlkZGlmeTx1bmtub3duLCB7IGlkOiBzdHJpbmcgfT4oYXN5bmMgKHsgcGF0aFBhcmFtZXRlcnMgfSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2VjcmV0cy5idXJuKHBhdGhQYXJhbWV0ZXJzKTtcbiAgICAgIHJldHVybiBhcGlHYXRld2F5LmZvcm1hdEpTT05SZXNwb25zZShyZXNwb25zZSwgMjAwKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG5cbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFNlY3JldE5vdEZvdW5kRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGFwaUdhdGV3YXkuZm9ybWF0SlNPTlJlc3BvbnNlKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9LCA0MDQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXBpR2F0ZXdheS5mb3JtYXRKU09OUmVzcG9uc2UoeyBtZXNzYWdlOiAnSW50ZXJuYWwgZmFpbHVyZScgfSwgNTAwKTtcbiAgICB9XG4gIH0pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFPQSxvQ0FBMEIsTUFBTTtBQUFBLE1BQzlCLFlBQWEsWUFBWSxRQUFRO0FBQy9CLGNBQU0sWUFBWSxXQUFXLEdBQUcsTUFBTTtBQUV0QyxZQUFJLE1BQU0sbUJBQW1CO0FBQzNCLGdCQUFNLGtCQUFrQixNQUFNLFdBQVc7QUFBQSxRQUMzQztBQUVBLGFBQUssT0FBTztBQUFBLE1BQ2Q7QUFBQSxJQUNGO0FBRUEsWUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDbkJqQjtBQUFBO0FBQUE7QUFFQSxZQUFPLFVBQVUsa0JBQW1CLE9BQU87QUFDekMsYUFBTztBQUFBLElBQ1Q7QUFBQTtBQUFBOzs7QUNK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
