var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// node_modules/validator/lib/util/assertString.js
var require_assertString = __commonJS({
  "node_modules/validator/lib/util/assertString.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = assertString;
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function assertString(input) {
      var isString = typeof input === "string" || input instanceof String;
      if (!isString) {
        var invalidType = _typeof(input);
        if (input === null)
          invalidType = "null";
        else if (invalidType === "object")
          invalidType = input.constructor.name;
        throw new TypeError("Expected a string but received a ".concat(invalidType));
      }
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/isIP.js
var require_isIP = __commonJS({
  "node_modules/validator/lib/isIP.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isIP2;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var IPv4SegmentFormat = "(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
    var IPv4AddressFormat = "(".concat(IPv4SegmentFormat, "[.]){3}").concat(IPv4SegmentFormat);
    var IPv4AddressRegExp = new RegExp("^".concat(IPv4AddressFormat, "$"));
    var IPv6SegmentFormat = "(?:[0-9a-fA-F]{1,4})";
    var IPv6AddressRegExp = new RegExp("^(" + "(?:".concat(IPv6SegmentFormat, ":){7}(?:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){6}(?:").concat(IPv4AddressFormat, "|:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){5}(?::").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,2}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){4}(?:(:").concat(IPv6SegmentFormat, "){0,1}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,3}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){3}(?:(:").concat(IPv6SegmentFormat, "){0,2}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,4}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){2}(?:(:").concat(IPv6SegmentFormat, "){0,3}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,5}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){1}(?:(:").concat(IPv6SegmentFormat, "){0,4}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,6}|:)|") + "(?::((?::".concat(IPv6SegmentFormat, "){0,5}:").concat(IPv4AddressFormat, "|(?::").concat(IPv6SegmentFormat, "){1,7}|:))") + ")(%[0-9a-zA-Z-.:]{1,})?$");
    function isIP2(str) {
      var version = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      (0, _assertString.default)(str);
      version = String(version);
      if (!version) {
        return isIP2(str, 4) || isIP2(str, 6);
      }
      if (version === "4") {
        return IPv4AddressRegExp.test(str);
      }
      if (version === "6") {
        return IPv6AddressRegExp.test(str);
      }
      return false;
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/util/merge.js
var require_merge = __commonJS({
  "node_modules/validator/lib/util/merge.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = merge;
    function merge() {
      var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var defaults = arguments.length > 1 ? arguments[1] : void 0;
      for (var key in defaults) {
        if (typeof obj[key] === "undefined") {
          obj[key] = defaults[key];
        }
      }
      return obj;
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/isBase64.js
var require_isBase64 = __commonJS({
  "node_modules/validator/lib/isBase64.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isBase64;
    var _assertString = _interopRequireDefault(require_assertString());
    var _merge = _interopRequireDefault(require_merge());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var notBase64 = /[^A-Z0-9+\/=]/i;
    var urlSafeBase64 = /^[A-Z0-9_\-]*$/i;
    var defaultBase64Options = {
      urlSafe: false
    };
    function isBase64(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, defaultBase64Options);
      var len = str.length;
      if (options.urlSafe) {
        return urlSafeBase64.test(str);
      }
      if (len % 4 !== 0 || notBase64.test(str)) {
        return false;
      }
      var firstPaddingChar = str.indexOf("=");
      return firstPaddingChar === -1 || firstPaddingChar === len - 1 || firstPaddingChar === len - 2 && str[len - 1] === "=";
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/isJWT.js
var require_isJWT = __commonJS({
  "node_modules/validator/lib/isJWT.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isJWT2;
    var _assertString = _interopRequireDefault(require_assertString());
    var _isBase = _interopRequireDefault(require_isBase64());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function isJWT2(str) {
      (0, _assertString.default)(str);
      var dotSplit = str.split(".");
      var len = dotSplit.length;
      if (len !== 3) {
        return false;
      }
      return dotSplit.reduce(function(acc, currElem) {
        return acc && (0, _isBase.default)(currElem, {
          urlSafe: true
        });
      }, true);
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/isFQDN.js
var require_isFQDN = __commonJS({
  "node_modules/validator/lib/isFQDN.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isFQDN;
    var _assertString = _interopRequireDefault(require_assertString());
    var _merge = _interopRequireDefault(require_merge());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var default_fqdn_options = {
      require_tld: true,
      allow_underscores: false,
      allow_trailing_dot: false,
      allow_numeric_tld: false,
      allow_wildcard: false,
      ignore_max_length: false
    };
    function isFQDN(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, default_fqdn_options);
      if (options.allow_trailing_dot && str[str.length - 1] === ".") {
        str = str.substring(0, str.length - 1);
      }
      if (options.allow_wildcard === true && str.indexOf("*.") === 0) {
        str = str.substring(2);
      }
      var parts = str.split(".");
      var tld = parts[parts.length - 1];
      if (options.require_tld) {
        if (parts.length < 2) {
          return false;
        }
        if (!options.allow_numeric_tld && !/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
          return false;
        }
        if (/\s/.test(tld)) {
          return false;
        }
      }
      if (!options.allow_numeric_tld && /^\d+$/.test(tld)) {
        return false;
      }
      return parts.every(function(part) {
        if (part.length > 63 && !options.ignore_max_length) {
          return false;
        }
        if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) {
          return false;
        }
        if (/[\uff01-\uff5e]/.test(part)) {
          return false;
        }
        if (/^-|-$/.test(part)) {
          return false;
        }
        if (!options.allow_underscores && /_/.test(part)) {
          return false;
        }
        return true;
      });
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/isURL.js
var require_isURL = __commonJS({
  "node_modules/validator/lib/isURL.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isURL2;
    var _assertString = _interopRequireDefault(require_assertString());
    var _isFQDN = _interopRequireDefault(require_isFQDN());
    var _isIP = _interopRequireDefault(require_isIP());
    var _merge = _interopRequireDefault(require_merge());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    function _iterableToArrayLimit(r, l) {
      var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (null != t) {
        var e, n, i, u, a = [], f = true, o = false;
        try {
          if (i = (t = t.call(r)).next, 0 === l) {
            if (Object(t) !== t)
              return;
            f = false;
          } else
            for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
              ;
        } catch (r2) {
          o = true, n = r2;
        } finally {
          try {
            if (!f && null != t.return && (u = t.return(), Object(u) !== u))
              return;
          } finally {
            if (o)
              throw n;
          }
        }
        return a;
      }
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    var default_url_options = {
      protocols: ["http", "https", "ftp"],
      require_tld: true,
      require_protocol: false,
      require_host: true,
      require_port: false,
      require_valid_protocol: true,
      allow_underscores: false,
      allow_trailing_dot: false,
      allow_protocol_relative_urls: false,
      allow_fragments: true,
      allow_query_components: true,
      validate_length: true
    };
    var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;
    function isRegExp(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    }
    function checkHost(host, matches) {
      for (var i = 0; i < matches.length; i++) {
        var match = matches[i];
        if (host === match || isRegExp(match) && match.test(host)) {
          return true;
        }
      }
      return false;
    }
    function isURL2(url, options) {
      (0, _assertString.default)(url);
      if (!url || /[\s<>]/.test(url)) {
        return false;
      }
      if (url.indexOf("mailto:") === 0) {
        return false;
      }
      options = (0, _merge.default)(options, default_url_options);
      if (options.validate_length && url.length >= 2083) {
        return false;
      }
      if (!options.allow_fragments && url.includes("#")) {
        return false;
      }
      if (!options.allow_query_components && (url.includes("?") || url.includes("&"))) {
        return false;
      }
      var protocol, auth, host, hostname, port, port_str, split, ipv6;
      split = url.split("#");
      url = split.shift();
      split = url.split("?");
      url = split.shift();
      split = url.split("://");
      if (split.length > 1) {
        protocol = split.shift().toLowerCase();
        if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
          return false;
        }
      } else if (options.require_protocol) {
        return false;
      } else if (url.slice(0, 2) === "//") {
        if (!options.allow_protocol_relative_urls) {
          return false;
        }
        split[0] = url.slice(2);
      }
      url = split.join("://");
      if (url === "") {
        return false;
      }
      split = url.split("/");
      url = split.shift();
      if (url === "" && !options.require_host) {
        return true;
      }
      split = url.split("@");
      if (split.length > 1) {
        if (options.disallow_auth) {
          return false;
        }
        if (split[0] === "") {
          return false;
        }
        auth = split.shift();
        if (auth.indexOf(":") >= 0 && auth.split(":").length > 2) {
          return false;
        }
        var _auth$split = auth.split(":"), _auth$split2 = _slicedToArray(_auth$split, 2), user = _auth$split2[0], password = _auth$split2[1];
        if (user === "" && password === "") {
          return false;
        }
      }
      hostname = split.join("@");
      port_str = null;
      ipv6 = null;
      var ipv6_match = hostname.match(wrapped_ipv6);
      if (ipv6_match) {
        host = "";
        ipv6 = ipv6_match[1];
        port_str = ipv6_match[2] || null;
      } else {
        split = hostname.split(":");
        host = split.shift();
        if (split.length) {
          port_str = split.join(":");
        }
      }
      if (port_str !== null && port_str.length > 0) {
        port = parseInt(port_str, 10);
        if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
          return false;
        }
      } else if (options.require_port) {
        return false;
      }
      if (options.host_whitelist) {
        return checkHost(host, options.host_whitelist);
      }
      if (host === "" && !options.require_host) {
        return true;
      }
      if (!(0, _isIP.default)(host) && !(0, _isFQDN.default)(host, options) && (!ipv6 || !(0, _isIP.default)(ipv6, 6))) {
        return false;
      }
      host = host || ipv6;
      if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
        return false;
      }
      return true;
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/isSlug.js
var require_isSlug = __commonJS({
  "node_modules/validator/lib/isSlug.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isSlug2;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var charsetRegex = /^[^\s-_](?!.*?[-_]{2,})[a-z0-9-\\][^\s]*[^-_\s]$/;
    function isSlug2(str) {
      (0, _assertString.default)(str);
      return charsetRegex.test(str);
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/isIBAN.js
var require_isIBAN = __commonJS({
  "node_modules/validator/lib/isIBAN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isIBAN2;
    exports.locales = void 0;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var ibanRegexThroughCountryCode = {
      AD: /^(AD[0-9]{2})\d{8}[A-Z0-9]{12}$/,
      AE: /^(AE[0-9]{2})\d{3}\d{16}$/,
      AL: /^(AL[0-9]{2})\d{8}[A-Z0-9]{16}$/,
      AT: /^(AT[0-9]{2})\d{16}$/,
      AZ: /^(AZ[0-9]{2})[A-Z0-9]{4}\d{20}$/,
      BA: /^(BA[0-9]{2})\d{16}$/,
      BE: /^(BE[0-9]{2})\d{12}$/,
      BG: /^(BG[0-9]{2})[A-Z]{4}\d{6}[A-Z0-9]{8}$/,
      BH: /^(BH[0-9]{2})[A-Z]{4}[A-Z0-9]{14}$/,
      BR: /^(BR[0-9]{2})\d{23}[A-Z]{1}[A-Z0-9]{1}$/,
      BY: /^(BY[0-9]{2})[A-Z0-9]{4}\d{20}$/,
      CH: /^(CH[0-9]{2})\d{5}[A-Z0-9]{12}$/,
      CR: /^(CR[0-9]{2})\d{18}$/,
      CY: /^(CY[0-9]{2})\d{8}[A-Z0-9]{16}$/,
      CZ: /^(CZ[0-9]{2})\d{20}$/,
      DE: /^(DE[0-9]{2})\d{18}$/,
      DK: /^(DK[0-9]{2})\d{14}$/,
      DO: /^(DO[0-9]{2})[A-Z]{4}\d{20}$/,
      DZ: /^(DZ\d{24})$/,
      EE: /^(EE[0-9]{2})\d{16}$/,
      EG: /^(EG[0-9]{2})\d{25}$/,
      ES: /^(ES[0-9]{2})\d{20}$/,
      FI: /^(FI[0-9]{2})\d{14}$/,
      FO: /^(FO[0-9]{2})\d{14}$/,
      FR: /^(FR[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
      GB: /^(GB[0-9]{2})[A-Z]{4}\d{14}$/,
      GE: /^(GE[0-9]{2})[A-Z0-9]{2}\d{16}$/,
      GI: /^(GI[0-9]{2})[A-Z]{4}[A-Z0-9]{15}$/,
      GL: /^(GL[0-9]{2})\d{14}$/,
      GR: /^(GR[0-9]{2})\d{7}[A-Z0-9]{16}$/,
      GT: /^(GT[0-9]{2})[A-Z0-9]{4}[A-Z0-9]{20}$/,
      HR: /^(HR[0-9]{2})\d{17}$/,
      HU: /^(HU[0-9]{2})\d{24}$/,
      IE: /^(IE[0-9]{2})[A-Z0-9]{4}\d{14}$/,
      IL: /^(IL[0-9]{2})\d{19}$/,
      IQ: /^(IQ[0-9]{2})[A-Z]{4}\d{15}$/,
      IR: /^(IR[0-9]{2})0\d{2}0\d{18}$/,
      IS: /^(IS[0-9]{2})\d{22}$/,
      IT: /^(IT[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
      JO: /^(JO[0-9]{2})[A-Z]{4}\d{22}$/,
      KW: /^(KW[0-9]{2})[A-Z]{4}[A-Z0-9]{22}$/,
      KZ: /^(KZ[0-9]{2})\d{3}[A-Z0-9]{13}$/,
      LB: /^(LB[0-9]{2})\d{4}[A-Z0-9]{20}$/,
      LC: /^(LC[0-9]{2})[A-Z]{4}[A-Z0-9]{24}$/,
      LI: /^(LI[0-9]{2})\d{5}[A-Z0-9]{12}$/,
      LT: /^(LT[0-9]{2})\d{16}$/,
      LU: /^(LU[0-9]{2})\d{3}[A-Z0-9]{13}$/,
      LV: /^(LV[0-9]{2})[A-Z]{4}[A-Z0-9]{13}$/,
      MA: /^(MA[0-9]{26})$/,
      MC: /^(MC[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
      MD: /^(MD[0-9]{2})[A-Z0-9]{20}$/,
      ME: /^(ME[0-9]{2})\d{18}$/,
      MK: /^(MK[0-9]{2})\d{3}[A-Z0-9]{10}\d{2}$/,
      MR: /^(MR[0-9]{2})\d{23}$/,
      MT: /^(MT[0-9]{2})[A-Z]{4}\d{5}[A-Z0-9]{18}$/,
      MU: /^(MU[0-9]{2})[A-Z]{4}\d{19}[A-Z]{3}$/,
      MZ: /^(MZ[0-9]{2})\d{21}$/,
      NL: /^(NL[0-9]{2})[A-Z]{4}\d{10}$/,
      NO: /^(NO[0-9]{2})\d{11}$/,
      PK: /^(PK[0-9]{2})[A-Z0-9]{4}\d{16}$/,
      PL: /^(PL[0-9]{2})\d{24}$/,
      PS: /^(PS[0-9]{2})[A-Z0-9]{4}\d{21}$/,
      PT: /^(PT[0-9]{2})\d{21}$/,
      QA: /^(QA[0-9]{2})[A-Z]{4}[A-Z0-9]{21}$/,
      RO: /^(RO[0-9]{2})[A-Z]{4}[A-Z0-9]{16}$/,
      RS: /^(RS[0-9]{2})\d{18}$/,
      SA: /^(SA[0-9]{2})\d{2}[A-Z0-9]{18}$/,
      SC: /^(SC[0-9]{2})[A-Z]{4}\d{20}[A-Z]{3}$/,
      SE: /^(SE[0-9]{2})\d{20}$/,
      SI: /^(SI[0-9]{2})\d{15}$/,
      SK: /^(SK[0-9]{2})\d{20}$/,
      SM: /^(SM[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
      SV: /^(SV[0-9]{2})[A-Z0-9]{4}\d{20}$/,
      TL: /^(TL[0-9]{2})\d{19}$/,
      TN: /^(TN[0-9]{2})\d{20}$/,
      TR: /^(TR[0-9]{2})\d{5}[A-Z0-9]{17}$/,
      UA: /^(UA[0-9]{2})\d{6}[A-Z0-9]{19}$/,
      VA: /^(VA[0-9]{2})\d{18}$/,
      VG: /^(VG[0-9]{2})[A-Z0-9]{4}\d{16}$/,
      XK: /^(XK[0-9]{2})\d{16}$/
    };
    function hasOnlyValidCountryCodes(countryCodeArray) {
      var countryCodeArrayFilteredWithObjectIbanCode = countryCodeArray.filter(function(countryCode) {
        return !(countryCode in ibanRegexThroughCountryCode);
      });
      if (countryCodeArrayFilteredWithObjectIbanCode.length > 0) {
        return false;
      }
      return true;
    }
    function hasValidIbanFormat(str, options) {
      var strippedStr = str.replace(/[\s\-]+/gi, "").toUpperCase();
      var isoCountryCode = strippedStr.slice(0, 2).toUpperCase();
      var isoCountryCodeInIbanRegexCodeObject = isoCountryCode in ibanRegexThroughCountryCode;
      if (options.whitelist) {
        if (!hasOnlyValidCountryCodes(options.whitelist)) {
          return false;
        }
        var isoCountryCodeInWhiteList = options.whitelist.includes(isoCountryCode);
        if (!isoCountryCodeInWhiteList) {
          return false;
        }
      }
      if (options.blacklist) {
        var isoCountryCodeInBlackList = options.blacklist.includes(isoCountryCode);
        if (isoCountryCodeInBlackList) {
          return false;
        }
      }
      return isoCountryCodeInIbanRegexCodeObject && ibanRegexThroughCountryCode[isoCountryCode].test(strippedStr);
    }
    function hasValidIbanChecksum(str) {
      var strippedStr = str.replace(/[^A-Z0-9]+/gi, "").toUpperCase();
      var rearranged = strippedStr.slice(4) + strippedStr.slice(0, 4);
      var alphaCapsReplacedWithDigits = rearranged.replace(/[A-Z]/g, function(char) {
        return char.charCodeAt(0) - 55;
      });
      var remainder = alphaCapsReplacedWithDigits.match(/\d{1,7}/g).reduce(function(acc, value) {
        return Number(acc + value) % 97;
      }, "");
      return remainder === 1;
    }
    function isIBAN2(str) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      (0, _assertString.default)(str);
      return hasValidIbanFormat(str, options) && hasValidIbanChecksum(str);
    }
    var locales = exports.locales = Object.keys(ibanRegexThroughCountryCode);
  }
});

// node_modules/validator/lib/isUUID.js
var require_isUUID = __commonJS({
  "node_modules/validator/lib/isUUID.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isUUID2;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var uuid = {
      1: /^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
      2: /^[0-9A-F]{8}-[0-9A-F]{4}-2[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
      3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
      4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      7: /^[0-9A-F]{8}-[0-9A-F]{4}-7[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
    };
    function isUUID2(str, version) {
      (0, _assertString.default)(str);
      var pattern = uuid[![void 0, null].includes(version) ? version : "all"];
      return !!pattern && pattern.test(str);
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/isAscii.js
var require_isAscii = __commonJS({
  "node_modules/validator/lib/isAscii.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isAscii2;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var ascii = /^[\x00-\x7F]+$/;
    function isAscii2(str) {
      (0, _assertString.default)(str);
      return ascii.test(str);
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/isByteLength.js
var require_isByteLength = __commonJS({
  "node_modules/validator/lib/isByteLength.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isByteLength;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function isByteLength(str, options) {
      (0, _assertString.default)(str);
      var min;
      var max;
      if (_typeof(options) === "object") {
        min = options.min || 0;
        max = options.max;
      } else {
        min = arguments[1];
        max = arguments[2];
      }
      var len = encodeURI(str).split(/%..|./).length - 1;
      return len >= min && (typeof max === "undefined" || len <= max);
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/isEmail.js
var require_isEmail = __commonJS({
  "node_modules/validator/lib/isEmail.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isEmail2;
    var _assertString = _interopRequireDefault(require_assertString());
    var _isByteLength = _interopRequireDefault(require_isByteLength());
    var _isFQDN = _interopRequireDefault(require_isFQDN());
    var _isIP = _interopRequireDefault(require_isIP());
    var _merge = _interopRequireDefault(require_merge());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var default_email_options = {
      allow_display_name: false,
      allow_underscores: false,
      require_display_name: false,
      allow_utf8_local_part: true,
      require_tld: true,
      blacklisted_chars: "",
      ignore_max_length: false,
      host_blacklist: [],
      host_whitelist: []
    };
    var splitNameAddress = /^([^\x00-\x1F\x7F-\x9F\cX]+)</i;
    var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
    var gmailUserPart = /^[a-z\d]+$/;
    var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
    var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A1-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
    var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
    var defaultMaxEmailLength = 254;
    function validateDisplayName(display_name) {
      var display_name_without_quotes = display_name.replace(/^"(.+)"$/, "$1");
      if (!display_name_without_quotes.trim()) {
        return false;
      }
      var contains_illegal = /[\.";<>]/.test(display_name_without_quotes);
      if (contains_illegal) {
        if (display_name_without_quotes === display_name) {
          return false;
        }
        var all_start_with_back_slash = display_name_without_quotes.split('"').length === display_name_without_quotes.split('\\"').length;
        if (!all_start_with_back_slash) {
          return false;
        }
      }
      return true;
    }
    function isEmail2(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, default_email_options);
      if (options.require_display_name || options.allow_display_name) {
        var display_email = str.match(splitNameAddress);
        if (display_email) {
          var display_name = display_email[1];
          str = str.replace(display_name, "").replace(/(^<|>$)/g, "");
          if (display_name.endsWith(" ")) {
            display_name = display_name.slice(0, -1);
          }
          if (!validateDisplayName(display_name)) {
            return false;
          }
        } else if (options.require_display_name) {
          return false;
        }
      }
      if (!options.ignore_max_length && str.length > defaultMaxEmailLength) {
        return false;
      }
      var parts = str.split("@");
      var domain = parts.pop();
      var lower_domain = domain.toLowerCase();
      if (options.host_blacklist.includes(lower_domain)) {
        return false;
      }
      if (options.host_whitelist.length > 0 && !options.host_whitelist.includes(lower_domain)) {
        return false;
      }
      var user = parts.join("@");
      if (options.domain_specific_validation && (lower_domain === "gmail.com" || lower_domain === "googlemail.com")) {
        user = user.toLowerCase();
        var username = user.split("+")[0];
        if (!(0, _isByteLength.default)(username.replace(/\./g, ""), {
          min: 6,
          max: 30
        })) {
          return false;
        }
        var _user_parts = username.split(".");
        for (var i = 0; i < _user_parts.length; i++) {
          if (!gmailUserPart.test(_user_parts[i])) {
            return false;
          }
        }
      }
      if (options.ignore_max_length === false && (!(0, _isByteLength.default)(user, {
        max: 64
      }) || !(0, _isByteLength.default)(domain, {
        max: 254
      }))) {
        return false;
      }
      if (!(0, _isFQDN.default)(domain, {
        require_tld: options.require_tld,
        ignore_max_length: options.ignore_max_length,
        allow_underscores: options.allow_underscores
      })) {
        if (!options.allow_ip_domain) {
          return false;
        }
        if (!(0, _isIP.default)(domain)) {
          if (!domain.startsWith("[") || !domain.endsWith("]")) {
            return false;
          }
          var noBracketdomain = domain.slice(1, -1);
          if (noBracketdomain.length === 0 || !(0, _isIP.default)(noBracketdomain)) {
            return false;
          }
        }
      }
      if (user[0] === '"') {
        user = user.slice(1, user.length - 1);
        return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
      }
      var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
      var user_parts = user.split(".");
      for (var _i = 0; _i < user_parts.length; _i++) {
        if (!pattern.test(user_parts[_i])) {
          return false;
        }
      }
      if (options.blacklisted_chars) {
        if (user.search(new RegExp("[".concat(options.blacklisted_chars, "]+"), "g")) !== -1)
          return false;
      }
      return true;
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/alpha.js
var require_alpha = __commonJS({
  "node_modules/validator/lib/alpha.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.farsiLocales = exports.englishLocales = exports.dotDecimal = exports.decimal = exports.commaDecimal = exports.bengaliLocales = exports.arabicLocales = exports.alphanumeric = exports.alpha = void 0;
    var alpha = exports.alpha = {
      "en-US": /^[A-Z]+$/i,
      "az-AZ": /^[A-VXYZÇƏĞİıÖŞÜ]+$/i,
      "bg-BG": /^[А-Я]+$/i,
      "cs-CZ": /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
      "da-DK": /^[A-ZÆØÅ]+$/i,
      "de-DE": /^[A-ZÄÖÜß]+$/i,
      "el-GR": /^[Α-ώ]+$/i,
      "es-ES": /^[A-ZÁÉÍÑÓÚÜ]+$/i,
      "fa-IR": /^[ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/i,
      "fi-FI": /^[A-ZÅÄÖ]+$/i,
      "fr-FR": /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
      "it-IT": /^[A-ZÀÉÈÌÎÓÒÙ]+$/i,
      "ja-JP": /^[ぁ-んァ-ヶｦ-ﾟ一-龠ー・。、]+$/i,
      "nb-NO": /^[A-ZÆØÅ]+$/i,
      "nl-NL": /^[A-ZÁÉËÏÓÖÜÚ]+$/i,
      "nn-NO": /^[A-ZÆØÅ]+$/i,
      "hu-HU": /^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
      "pl-PL": /^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
      "pt-PT": /^[A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
      "ru-RU": /^[А-ЯЁ]+$/i,
      "kk-KZ": /^[А-ЯЁ\u04D8\u04B0\u0406\u04A2\u0492\u04AE\u049A\u04E8\u04BA]+$/i,
      "sl-SI": /^[A-ZČĆĐŠŽ]+$/i,
      "sk-SK": /^[A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
      "sr-RS@latin": /^[A-ZČĆŽŠĐ]+$/i,
      "sr-RS": /^[А-ЯЂЈЉЊЋЏ]+$/i,
      "sv-SE": /^[A-ZÅÄÖ]+$/i,
      "th-TH": /^[ก-๐\s]+$/i,
      "tr-TR": /^[A-ZÇĞİıÖŞÜ]+$/i,
      "uk-UA": /^[А-ЩЬЮЯЄIЇҐі]+$/i,
      "vi-VN": /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
      "ko-KR": /^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/,
      "ku-IQ": /^[ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
      ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
      he: /^[א-ת]+$/,
      fa: /^['آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی']+$/i,
      bn: /^['ঀঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣৰৱ৲৳৴৵৶৷৸৹৺৻']+$/,
      eo: /^[ABCĈD-GĜHĤIJĴK-PRSŜTUŬVZ]+$/i,
      "hi-IN": /^[\u0900-\u0961]+[\u0972-\u097F]*$/i,
      "si-LK": /^[\u0D80-\u0DFF]+$/
    };
    var alphanumeric = exports.alphanumeric = {
      "en-US": /^[0-9A-Z]+$/i,
      "az-AZ": /^[0-9A-VXYZÇƏĞİıÖŞÜ]+$/i,
      "bg-BG": /^[0-9А-Я]+$/i,
      "cs-CZ": /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
      "da-DK": /^[0-9A-ZÆØÅ]+$/i,
      "de-DE": /^[0-9A-ZÄÖÜß]+$/i,
      "el-GR": /^[0-9Α-ω]+$/i,
      "es-ES": /^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,
      "fi-FI": /^[0-9A-ZÅÄÖ]+$/i,
      "fr-FR": /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
      "it-IT": /^[0-9A-ZÀÉÈÌÎÓÒÙ]+$/i,
      "ja-JP": /^[0-9０-９ぁ-んァ-ヶｦ-ﾟ一-龠ー・。、]+$/i,
      "hu-HU": /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
      "nb-NO": /^[0-9A-ZÆØÅ]+$/i,
      "nl-NL": /^[0-9A-ZÁÉËÏÓÖÜÚ]+$/i,
      "nn-NO": /^[0-9A-ZÆØÅ]+$/i,
      "pl-PL": /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
      "pt-PT": /^[0-9A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
      "ru-RU": /^[0-9А-ЯЁ]+$/i,
      "kk-KZ": /^[0-9А-ЯЁ\u04D8\u04B0\u0406\u04A2\u0492\u04AE\u049A\u04E8\u04BA]+$/i,
      "sl-SI": /^[0-9A-ZČĆĐŠŽ]+$/i,
      "sk-SK": /^[0-9A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
      "sr-RS@latin": /^[0-9A-ZČĆŽŠĐ]+$/i,
      "sr-RS": /^[0-9А-ЯЂЈЉЊЋЏ]+$/i,
      "sv-SE": /^[0-9A-ZÅÄÖ]+$/i,
      "th-TH": /^[ก-๙\s]+$/i,
      "tr-TR": /^[0-9A-ZÇĞİıÖŞÜ]+$/i,
      "uk-UA": /^[0-9А-ЩЬЮЯЄIЇҐі]+$/i,
      "ko-KR": /^[0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/,
      "ku-IQ": /^[٠١٢٣٤٥٦٧٨٩0-9ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
      "vi-VN": /^[0-9A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
      ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
      he: /^[0-9א-ת]+$/,
      fa: /^['0-9آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی۱۲۳۴۵۶۷۸۹۰']+$/i,
      bn: /^['ঀঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣ০১২৩৪৫৬৭৮৯ৰৱ৲৳৴৵৶৷৸৹৺৻']+$/,
      eo: /^[0-9ABCĈD-GĜHĤIJĴK-PRSŜTUŬVZ]+$/i,
      "hi-IN": /^[\u0900-\u0963]+[\u0966-\u097F]*$/i,
      "si-LK": /^[0-9\u0D80-\u0DFF]+$/
    };
    var decimal = exports.decimal = {
      "en-US": ".",
      ar: "\u066B"
    };
    var englishLocales = exports.englishLocales = ["AU", "GB", "HK", "IN", "NZ", "ZA", "ZM"];
    for (i = 0; i < englishLocales.length; i++) {
      locale = "en-".concat(englishLocales[i]);
      alpha[locale] = alpha["en-US"];
      alphanumeric[locale] = alphanumeric["en-US"];
      decimal[locale] = decimal["en-US"];
    }
    var locale;
    var i;
    var arabicLocales = exports.arabicLocales = ["AE", "BH", "DZ", "EG", "IQ", "JO", "KW", "LB", "LY", "MA", "QM", "QA", "SA", "SD", "SY", "TN", "YE"];
    for (_i = 0; _i < arabicLocales.length; _i++) {
      _locale = "ar-".concat(arabicLocales[_i]);
      alpha[_locale] = alpha.ar;
      alphanumeric[_locale] = alphanumeric.ar;
      decimal[_locale] = decimal.ar;
    }
    var _locale;
    var _i;
    var farsiLocales = exports.farsiLocales = ["IR", "AF"];
    for (_i2 = 0; _i2 < farsiLocales.length; _i2++) {
      _locale2 = "fa-".concat(farsiLocales[_i2]);
      alphanumeric[_locale2] = alphanumeric.fa;
      decimal[_locale2] = decimal.ar;
    }
    var _locale2;
    var _i2;
    var bengaliLocales = exports.bengaliLocales = ["BD", "IN"];
    for (_i3 = 0; _i3 < bengaliLocales.length; _i3++) {
      _locale3 = "bn-".concat(bengaliLocales[_i3]);
      alpha[_locale3] = alpha.bn;
      alphanumeric[_locale3] = alphanumeric.bn;
      decimal[_locale3] = decimal["en-US"];
    }
    var _locale3;
    var _i3;
    var dotDecimal = exports.dotDecimal = ["ar-EG", "ar-LB", "ar-LY"];
    var commaDecimal = exports.commaDecimal = ["bg-BG", "cs-CZ", "da-DK", "de-DE", "el-GR", "en-ZM", "eo", "es-ES", "fr-CA", "fr-FR", "id-ID", "it-IT", "ku-IQ", "hi-IN", "hu-HU", "nb-NO", "nn-NO", "nl-NL", "pl-PL", "pt-PT", "ru-RU", "kk-KZ", "si-LK", "sl-SI", "sr-RS@latin", "sr-RS", "sv-SE", "tr-TR", "uk-UA", "vi-VN"];
    for (_i4 = 0; _i4 < dotDecimal.length; _i4++) {
      decimal[dotDecimal[_i4]] = decimal["en-US"];
    }
    var _i4;
    for (_i5 = 0; _i5 < commaDecimal.length; _i5++) {
      decimal[commaDecimal[_i5]] = ",";
    }
    var _i5;
    alpha["fr-CA"] = alpha["fr-FR"];
    alphanumeric["fr-CA"] = alphanumeric["fr-FR"];
    alpha["pt-BR"] = alpha["pt-PT"];
    alphanumeric["pt-BR"] = alphanumeric["pt-PT"];
    decimal["pt-BR"] = decimal["pt-PT"];
    alpha["pl-Pl"] = alpha["pl-PL"];
    alphanumeric["pl-Pl"] = alphanumeric["pl-PL"];
    decimal["pl-Pl"] = decimal["pl-PL"];
    alpha["fa-AF"] = alpha.fa;
  }
});

// node_modules/validator/lib/isAlpha.js
var require_isAlpha = __commonJS({
  "node_modules/validator/lib/isAlpha.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isAlpha2;
    exports.locales = void 0;
    var _assertString = _interopRequireDefault(require_assertString());
    var _alpha = require_alpha();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function isAlpha2(_str) {
      var locale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "en-US";
      var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      (0, _assertString.default)(_str);
      var str = _str;
      var ignore = options.ignore;
      if (ignore) {
        if (ignore instanceof RegExp) {
          str = str.replace(ignore, "");
        } else if (typeof ignore === "string") {
          str = str.replace(new RegExp("[".concat(ignore.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, "\\$&"), "]"), "g"), "");
        } else {
          throw new Error("ignore should be instance of a String or RegExp");
        }
      }
      if (locale in _alpha.alpha) {
        return _alpha.alpha[locale].test(str);
      }
      throw new Error("Invalid locale '".concat(locale, "'"));
    }
    var locales = exports.locales = Object.keys(_alpha.alpha);
  }
});

// node_modules/validator/lib/isLatLong.js
var require_isLatLong = __commonJS({
  "node_modules/validator/lib/isLatLong.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isLatLong2;
    var _assertString = _interopRequireDefault(require_assertString());
    var _merge = _interopRequireDefault(require_merge());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var lat = /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/;
    var long = /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/;
    var latDMS = /^(([1-8]?\d)\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|90\D+0\D+0)\D+[NSns]?$/i;
    var longDMS = /^\s*([1-7]?\d{1,2}\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|180\D+0\D+0)\D+[EWew]?$/i;
    var defaultLatLongOptions = {
      checkDMS: false
    };
    function isLatLong2(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, defaultLatLongOptions);
      if (!str.includes(","))
        return false;
      var pair = str.split(",");
      if (pair[0].startsWith("(") && !pair[1].endsWith(")") || pair[1].endsWith(")") && !pair[0].startsWith("("))
        return false;
      if (options.checkDMS) {
        return latDMS.test(pair[0]) && longDMS.test(pair[1]);
      }
      return lat.test(pair[0]) && long.test(pair[1]);
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/util/includes.js
var require_includes = __commonJS({
  "node_modules/validator/lib/util/includes.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var includes = function includes2(arr, val) {
      return arr.some(function(arrVal) {
        return val === arrVal;
      });
    };
    var _default = exports.default = includes;
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/isDecimal.js
var require_isDecimal = __commonJS({
  "node_modules/validator/lib/isDecimal.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isDecimal2;
    var _merge = _interopRequireDefault(require_merge());
    var _assertString = _interopRequireDefault(require_assertString());
    var _includes = _interopRequireDefault(require_includes());
    var _alpha = require_alpha();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function decimalRegExp(options) {
      var regExp = new RegExp("^[-+]?([0-9]+)?(\\".concat(_alpha.decimal[options.locale], "[0-9]{").concat(options.decimal_digits, "})").concat(options.force_decimal ? "" : "?", "$"));
      return regExp;
    }
    var default_decimal_options = {
      force_decimal: false,
      decimal_digits: "1,",
      locale: "en-US"
    };
    var blacklist = ["", "-", "+"];
    function isDecimal2(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, default_decimal_options);
      if (options.locale in _alpha.decimal) {
        return !(0, _includes.default)(blacklist, str.replace(/ /g, "")) && decimalRegExp(options).test(str);
      }
      throw new Error("Invalid locale '".concat(options.locale, "'"));
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/isHexColor.js
var require_isHexColor = __commonJS({
  "node_modules/validator/lib/isHexColor.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isHexColor2;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
    function isHexColor2(str) {
      (0, _assertString.default)(str);
      return hexcolor.test(str);
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/isLuhnNumber.js
var require_isLuhnNumber = __commonJS({
  "node_modules/validator/lib/isLuhnNumber.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isLuhnNumber;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function isLuhnNumber(str) {
      (0, _assertString.default)(str);
      var sanitized = str.replace(/[- ]+/g, "");
      var sum = 0;
      var digit;
      var tmpNum;
      var shouldDouble;
      for (var i = sanitized.length - 1; i >= 0; i--) {
        digit = sanitized.substring(i, i + 1);
        tmpNum = parseInt(digit, 10);
        if (shouldDouble) {
          tmpNum *= 2;
          if (tmpNum >= 10) {
            sum += tmpNum % 10 + 1;
          } else {
            sum += tmpNum;
          }
        } else {
          sum += tmpNum;
        }
        shouldDouble = !shouldDouble;
      }
      return !!(sum % 10 === 0 ? sanitized : false);
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/isCreditCard.js
var require_isCreditCard = __commonJS({
  "node_modules/validator/lib/isCreditCard.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isCreditCard2;
    var _assertString = _interopRequireDefault(require_assertString());
    var _isLuhnNumber = _interopRequireDefault(require_isLuhnNumber());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var cards = {
      amex: /^3[47][0-9]{13}$/,
      dinersclub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      discover: /^6(?:011|5[0-9][0-9])[0-9]{12,15}$/,
      jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
      mastercard: /^5[1-5][0-9]{2}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
      // /^[25][1-7][0-9]{14}$/;
      unionpay: /^(6[27][0-9]{14}|^(81[0-9]{14,17}))$/,
      visa: /^(?:4[0-9]{12})(?:[0-9]{3,6})?$/
    };
    var allCards = function() {
      var tmpCardsArray = [];
      for (var cardProvider in cards) {
        if (cards.hasOwnProperty(cardProvider)) {
          tmpCardsArray.push(cards[cardProvider]);
        }
      }
      return tmpCardsArray;
    }();
    function isCreditCard2(card) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      (0, _assertString.default)(card);
      var provider = options.provider;
      var sanitized = card.replace(/[- ]+/g, "");
      if (provider && provider.toLowerCase() in cards) {
        if (!cards[provider.toLowerCase()].test(sanitized)) {
          return false;
        }
      } else if (provider && !(provider.toLowerCase() in cards)) {
        throw new Error("".concat(provider, " is not a valid credit card provider."));
      } else if (!allCards.some(function(cardProvider) {
        return cardProvider.test(sanitized);
      })) {
        return false;
      }
      return (0, _isLuhnNumber.default)(card);
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/isAlphanumeric.js
var require_isAlphanumeric = __commonJS({
  "node_modules/validator/lib/isAlphanumeric.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isAlphanumeric2;
    exports.locales = void 0;
    var _assertString = _interopRequireDefault(require_assertString());
    var _alpha = require_alpha();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function isAlphanumeric2(_str) {
      var locale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "en-US";
      var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      (0, _assertString.default)(_str);
      var str = _str;
      var ignore = options.ignore;
      if (ignore) {
        if (ignore instanceof RegExp) {
          str = str.replace(ignore, "");
        } else if (typeof ignore === "string") {
          str = str.replace(new RegExp("[".concat(ignore.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, "\\$&"), "]"), "g"), "");
        } else {
          throw new Error("ignore should be instance of a String or RegExp");
        }
      }
      if (locale in _alpha.alphanumeric) {
        return _alpha.alphanumeric[locale].test(str);
      }
      throw new Error("Invalid locale '".concat(locale, "'"));
    }
    var locales = exports.locales = Object.keys(_alpha.alphanumeric);
  }
});

// node_modules/validator/lib/isPassportNumber.js
var require_isPassportNumber = __commonJS({
  "node_modules/validator/lib/isPassportNumber.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isPassportNumber2;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var passportRegexByCountryCode = {
      AM: /^[A-Z]{2}\d{7}$/,
      // ARMENIA
      AR: /^[A-Z]{3}\d{6}$/,
      // ARGENTINA
      AT: /^[A-Z]\d{7}$/,
      // AUSTRIA
      AU: /^[A-Z]\d{7}$/,
      // AUSTRALIA
      AZ: /^[A-Z]{1}\d{8}$/,
      // AZERBAIJAN
      BE: /^[A-Z]{2}\d{6}$/,
      // BELGIUM
      BG: /^\d{9}$/,
      // BULGARIA
      BR: /^[A-Z]{2}\d{6}$/,
      // BRAZIL
      BY: /^[A-Z]{2}\d{7}$/,
      // BELARUS
      CA: /^[A-Z]{2}\d{6}$/,
      // CANADA
      CH: /^[A-Z]\d{7}$/,
      // SWITZERLAND
      CN: /^G\d{8}$|^E(?![IO])[A-Z0-9]\d{7}$/,
      // CHINA [G=Ordinary, E=Electronic] followed by 8-digits, or E followed by any UPPERCASE letter (except I and O) followed by 7 digits
      CY: /^[A-Z](\d{6}|\d{8})$/,
      // CYPRUS
      CZ: /^\d{8}$/,
      // CZECH REPUBLIC
      DE: /^[CFGHJKLMNPRTVWXYZ0-9]{9}$/,
      // GERMANY
      DK: /^\d{9}$/,
      // DENMARK
      DZ: /^\d{9}$/,
      // ALGERIA
      EE: /^([A-Z]\d{7}|[A-Z]{2}\d{7})$/,
      // ESTONIA (K followed by 7-digits), e-passports have 2 UPPERCASE followed by 7 digits
      ES: /^[A-Z0-9]{2}([A-Z0-9]?)\d{6}$/,
      // SPAIN
      FI: /^[A-Z]{2}\d{7}$/,
      // FINLAND
      FR: /^\d{2}[A-Z]{2}\d{5}$/,
      // FRANCE
      GB: /^\d{9}$/,
      // UNITED KINGDOM
      GR: /^[A-Z]{2}\d{7}$/,
      // GREECE
      HR: /^\d{9}$/,
      // CROATIA
      HU: /^[A-Z]{2}(\d{6}|\d{7})$/,
      // HUNGARY
      IE: /^[A-Z0-9]{2}\d{7}$/,
      // IRELAND
      IN: /^[A-Z]{1}-?\d{7}$/,
      // INDIA
      ID: /^[A-C]\d{7}$/,
      // INDONESIA
      IR: /^[A-Z]\d{8}$/,
      // IRAN
      IS: /^(A)\d{7}$/,
      // ICELAND
      IT: /^[A-Z0-9]{2}\d{7}$/,
      // ITALY
      JM: /^[Aa]\d{7}$/,
      // JAMAICA
      JP: /^[A-Z]{2}\d{7}$/,
      // JAPAN
      KR: /^[MS]\d{8}$/,
      // SOUTH KOREA, REPUBLIC OF KOREA, [S=PS Passports, M=PM Passports]
      KZ: /^[a-zA-Z]\d{7}$/,
      // KAZAKHSTAN
      LI: /^[a-zA-Z]\d{5}$/,
      // LIECHTENSTEIN
      LT: /^[A-Z0-9]{8}$/,
      // LITHUANIA
      LU: /^[A-Z0-9]{8}$/,
      // LUXEMBURG
      LV: /^[A-Z0-9]{2}\d{7}$/,
      // LATVIA
      LY: /^[A-Z0-9]{8}$/,
      // LIBYA
      MT: /^\d{7}$/,
      // MALTA
      MZ: /^([A-Z]{2}\d{7})|(\d{2}[A-Z]{2}\d{5})$/,
      // MOZAMBIQUE
      MY: /^[AHK]\d{8}$/,
      // MALAYSIA
      MX: /^\d{10,11}$/,
      // MEXICO
      NL: /^[A-Z]{2}[A-Z0-9]{6}\d$/,
      // NETHERLANDS
      NZ: /^([Ll]([Aa]|[Dd]|[Ff]|[Hh])|[Ee]([Aa]|[Pp])|[Nn])\d{6}$/,
      // NEW ZEALAND
      PH: /^([A-Z](\d{6}|\d{7}[A-Z]))|([A-Z]{2}(\d{6}|\d{7}))$/,
      // PHILIPPINES
      PK: /^[A-Z]{2}\d{7}$/,
      // PAKISTAN
      PL: /^[A-Z]{2}\d{7}$/,
      // POLAND
      PT: /^[A-Z]\d{6}$/,
      // PORTUGAL
      RO: /^\d{8,9}$/,
      // ROMANIA
      RU: /^\d{9}$/,
      // RUSSIAN FEDERATION
      SE: /^\d{8}$/,
      // SWEDEN
      SL: /^(P)[A-Z]\d{7}$/,
      // SLOVENIA
      SK: /^[0-9A-Z]\d{7}$/,
      // SLOVAKIA
      TH: /^[A-Z]{1,2}\d{6,7}$/,
      // THAILAND
      TR: /^[A-Z]\d{8}$/,
      // TURKEY
      UA: /^[A-Z]{2}\d{6}$/,
      // UKRAINE
      US: /^\d{9}$/,
      // UNITED STATES
      ZA: /^[TAMD]\d{8}$/
      // SOUTH AFRICA
    };
    function isPassportNumber2(str, countryCode) {
      (0, _assertString.default)(str);
      var normalizedStr = str.replace(/\s/g, "").toUpperCase();
      return countryCode.toUpperCase() in passportRegexByCountryCode && passportRegexByCountryCode[countryCode].test(normalizedStr);
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/isPostalCode.js
var require_isPostalCode = __commonJS({
  "node_modules/validator/lib/isPostalCode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isPostalCode2;
    exports.locales = void 0;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var threeDigit = /^\d{3}$/;
    var fourDigit = /^\d{4}$/;
    var fiveDigit = /^\d{5}$/;
    var sixDigit = /^\d{6}$/;
    var patterns = {
      AD: /^AD\d{3}$/,
      AT: fourDigit,
      AU: fourDigit,
      AZ: /^AZ\d{4}$/,
      BA: /^([7-8]\d{4}$)/,
      BE: fourDigit,
      BG: fourDigit,
      BR: /^\d{5}-\d{3}$/,
      BY: /^2[1-4]\d{4}$/,
      CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
      CH: fourDigit,
      CN: /^(0[1-7]|1[012356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[1-5]|8[1345]|9[09])\d{4}$/,
      CZ: /^\d{3}\s?\d{2}$/,
      DE: fiveDigit,
      DK: fourDigit,
      DO: fiveDigit,
      DZ: fiveDigit,
      EE: fiveDigit,
      ES: /^(5[0-2]{1}|[0-4]{1}\d{1})\d{3}$/,
      FI: fiveDigit,
      FR: /^\d{2}\s?\d{3}$/,
      GB: /^(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?(\d[a-z]{2})?)$/i,
      GR: /^\d{3}\s?\d{2}$/,
      HR: /^([1-5]\d{4}$)/,
      HT: /^HT\d{4}$/,
      HU: fourDigit,
      ID: fiveDigit,
      IE: /^(?!.*(?:o))[A-Za-z]\d[\dw]\s\w{4}$/i,
      IL: /^(\d{5}|\d{7})$/,
      IN: /^((?!10|29|35|54|55|65|66|86|87|88|89)[1-9][0-9]{5})$/,
      IR: /^(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}$/,
      IS: threeDigit,
      IT: fiveDigit,
      JP: /^\d{3}\-\d{4}$/,
      KE: fiveDigit,
      KR: /^(\d{5}|\d{6})$/,
      LI: /^(948[5-9]|949[0-7])$/,
      LT: /^LT\-\d{5}$/,
      LU: fourDigit,
      LV: /^LV\-\d{4}$/,
      LK: fiveDigit,
      MG: threeDigit,
      MX: fiveDigit,
      MT: /^[A-Za-z]{3}\s{0,1}\d{4}$/,
      MY: fiveDigit,
      NL: /^[1-9]\d{3}\s?(?!sa|sd|ss)[a-z]{2}$/i,
      NO: fourDigit,
      NP: /^(10|21|22|32|33|34|44|45|56|57)\d{3}$|^(977)$/i,
      NZ: fourDigit,
      PL: /^\d{2}\-\d{3}$/,
      PR: /^00[679]\d{2}([ -]\d{4})?$/,
      PT: /^\d{4}\-\d{3}?$/,
      RO: sixDigit,
      RU: sixDigit,
      SA: fiveDigit,
      SE: /^[1-9]\d{2}\s?\d{2}$/,
      SG: sixDigit,
      SI: fourDigit,
      SK: /^\d{3}\s?\d{2}$/,
      TH: fiveDigit,
      TN: fourDigit,
      TW: /^\d{3}(\d{2})?$/,
      UA: fiveDigit,
      US: /^\d{5}(-\d{4})?$/,
      ZA: fourDigit,
      ZM: fiveDigit
    };
    var locales = exports.locales = Object.keys(patterns);
    function isPostalCode2(str, locale) {
      (0, _assertString.default)(str);
      if (locale in patterns) {
        return patterns[locale].test(str);
      } else if (locale === "any") {
        for (var key in patterns) {
          if (patterns.hasOwnProperty(key)) {
            var pattern = patterns[key];
            if (pattern.test(str)) {
              return true;
            }
          }
        }
        return false;
      }
      throw new Error("Invalid locale '".concat(locale, "'"));
    }
  }
});

// node_modules/validator/lib/isMobilePhone.js
var require_isMobilePhone = __commonJS({
  "node_modules/validator/lib/isMobilePhone.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isMobilePhone2;
    exports.locales = void 0;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var phones = {
      "am-AM": /^(\+?374|0)(33|4[134]|55|77|88|9[13-689])\d{6}$/,
      "ar-AE": /^((\+?971)|0)?5[024568]\d{7}$/,
      "ar-BH": /^(\+?973)?(3|6)\d{7}$/,
      "ar-DZ": /^(\+?213|0)(5|6|7)\d{8}$/,
      "ar-LB": /^(\+?961)?((3|81)\d{6}|7\d{7})$/,
      "ar-EG": /^((\+?20)|0)?1[0125]\d{8}$/,
      "ar-IQ": /^(\+?964|0)?7[0-9]\d{8}$/,
      "ar-JO": /^(\+?962|0)?7[789]\d{7}$/,
      "ar-KW": /^(\+?965)([569]\d{7}|41\d{6})$/,
      "ar-LY": /^((\+?218)|0)?(9[1-6]\d{7}|[1-8]\d{7,9})$/,
      "ar-MA": /^(?:(?:\+|00)212|0)[5-7]\d{8}$/,
      "ar-OM": /^((\+|00)968)?(9[1-9])\d{6}$/,
      "ar-PS": /^(\+?970|0)5[6|9](\d{7})$/,
      "ar-SA": /^(!?(\+?966)|0)?5\d{8}$/,
      "ar-SD": /^((\+?249)|0)?(9[012369]|1[012])\d{7}$/,
      "ar-SY": /^(!?(\+?963)|0)?9\d{8}$/,
      "ar-TN": /^(\+?216)?[2459]\d{7}$/,
      "az-AZ": /^(\+994|0)(10|5[015]|7[07]|99)\d{7}$/,
      "bs-BA": /^((((\+|00)3876)|06))((([0-3]|[5-6])\d{6})|(4\d{7}))$/,
      "be-BY": /^(\+?375)?(24|25|29|33|44)\d{7}$/,
      "bg-BG": /^(\+?359|0)?8[789]\d{7}$/,
      "bn-BD": /^(\+?880|0)1[13456789][0-9]{8}$/,
      "ca-AD": /^(\+376)?[346]\d{5}$/,
      "cs-CZ": /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
      "da-DK": /^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
      "de-DE": /^((\+49|0)1)(5[0-25-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7,9}$/,
      "de-AT": /^(\+43|0)\d{1,4}\d{3,12}$/,
      "de-CH": /^(\+41|0)([1-9])\d{1,9}$/,
      "de-LU": /^(\+352)?((6\d1)\d{6})$/,
      "dv-MV": /^(\+?960)?(7[2-9]|9[1-9])\d{5}$/,
      "el-GR": /^(\+?30|0)?6(8[5-9]|9(?![26])[0-9])\d{7}$/,
      "el-CY": /^(\+?357?)?(9(9|6)\d{6})$/,
      "en-AI": /^(\+?1|0)264(?:2(35|92)|4(?:6[1-2]|76|97)|5(?:3[6-9]|8[1-4])|7(?:2(4|9)|72))\d{4}$/,
      "en-AU": /^(\+?61|0)4\d{8}$/,
      "en-AG": /^(?:\+1|1)268(?:464|7(?:1[3-9]|[28]\d|3[0246]|64|7[0-689]))\d{4}$/,
      "en-BM": /^(\+?1)?441(((3|7)\d{6}$)|(5[0-3][0-9]\d{4}$)|(59\d{5}$))/,
      "en-BS": /^(\+?1[-\s]?|0)?\(?242\)?[-\s]?\d{3}[-\s]?\d{4}$/,
      "en-GB": /^(\+?44|0)7\d{9}$/,
      "en-GG": /^(\+?44|0)1481\d{6}$/,
      "en-GH": /^(\+233|0)(20|50|24|54|27|57|26|56|23|28|55|59)\d{7}$/,
      "en-GY": /^(\+592|0)6\d{6}$/,
      "en-HK": /^(\+?852[-\s]?)?[456789]\d{3}[-\s]?\d{4}$/,
      "en-MO": /^(\+?853[-\s]?)?[6]\d{3}[-\s]?\d{4}$/,
      "en-IE": /^(\+?353|0)8[356789]\d{7}$/,
      "en-IN": /^(\+?91|0)?[6789]\d{9}$/,
      "en-JM": /^(\+?876)?\d{7}$/,
      "en-KE": /^(\+?254|0)(7|1)\d{8}$/,
      "fr-CF": /^(\+?236| ?)(70|75|77|72|21|22)\d{6}$/,
      "en-SS": /^(\+?211|0)(9[1257])\d{7}$/,
      "en-KI": /^((\+686|686)?)?( )?((6|7)(2|3|8)[0-9]{6})$/,
      "en-KN": /^(?:\+1|1)869(?:46\d|48[89]|55[6-8]|66\d|76[02-7])\d{4}$/,
      "en-LS": /^(\+?266)(22|28|57|58|59|27|52)\d{6}$/,
      "en-MT": /^(\+?356|0)?(99|79|77|21|27|22|25)[0-9]{6}$/,
      "en-MU": /^(\+?230|0)?\d{8}$/,
      "en-MW": /^(\+?265|0)(((77|88|31|99|98|21)\d{7})|(((111)|1)\d{6})|(32000\d{4}))$/,
      "en-NA": /^(\+?264|0)(6|8)\d{7}$/,
      "en-NG": /^(\+?234|0)?[789]\d{9}$/,
      "en-NZ": /^(\+?64|0)[28]\d{7,9}$/,
      "en-PG": /^(\+?675|0)?(7\d|8[18])\d{6}$/,
      "en-PK": /^((00|\+)?92|0)3[0-6]\d{8}$/,
      "en-PH": /^(09|\+639)\d{9}$/,
      "en-RW": /^(\+?250|0)?[7]\d{8}$/,
      "en-SG": /^(\+65)?[3689]\d{7}$/,
      "en-SL": /^(\+?232|0)\d{8}$/,
      "en-TZ": /^(\+?255|0)?[67]\d{8}$/,
      "en-UG": /^(\+?256|0)?[7]\d{8}$/,
      "en-US": /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
      "en-ZA": /^(\+?27|0)\d{9}$/,
      "en-ZM": /^(\+?26)?09[567]\d{7}$/,
      "en-ZW": /^(\+263)[0-9]{9}$/,
      "en-BW": /^(\+?267)?(7[1-8]{1})\d{6}$/,
      "es-AR": /^\+?549(11|[2368]\d)\d{8}$/,
      "es-BO": /^(\+?591)?(6|7)\d{7}$/,
      "es-CO": /^(\+?57)?3(0(0|1|2|4|5)|1\d|2[0-4]|5(0|1))\d{7}$/,
      "es-CL": /^(\+?56|0)[2-9]\d{1}\d{7}$/,
      "es-CR": /^(\+506)?[2-8]\d{7}$/,
      "es-CU": /^(\+53|0053)?5\d{7}$/,
      "es-DO": /^(\+?1)?8[024]9\d{7}$/,
      "es-HN": /^(\+?504)?[9|8|3|2]\d{7}$/,
      "es-EC": /^(\+?593|0)([2-7]|9[2-9])\d{7}$/,
      "es-ES": /^(\+?34)?[6|7]\d{8}$/,
      "es-PE": /^(\+?51)?9\d{8}$/,
      "es-MX": /^(\+?52)?(1|01)?\d{10,11}$/,
      "es-NI": /^(\+?505)\d{7,8}$/,
      "es-PA": /^(\+?507)\d{7,8}$/,
      "es-PY": /^(\+?595|0)9[9876]\d{7}$/,
      "es-SV": /^(\+?503)?[67]\d{7}$/,
      "es-UY": /^(\+598|0)9[1-9][\d]{6}$/,
      "es-VE": /^(\+?58)?(2|4)\d{9}$/,
      "et-EE": /^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,
      "fa-IR": /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
      "fi-FI": /^(\+?358|0)\s?(4[0-6]|50)\s?(\d\s?){4,8}$/,
      "fj-FJ": /^(\+?679)?\s?\d{3}\s?\d{4}$/,
      "fo-FO": /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
      "fr-BF": /^(\+226|0)[67]\d{7}$/,
      "fr-BJ": /^(\+229)\d{8}$/,
      "fr-CD": /^(\+?243|0)?(8|9)\d{8}$/,
      "fr-CM": /^(\+?237)6[0-9]{8}$/,
      "fr-FR": /^(\+?33|0)[67]\d{8}$/,
      "fr-GF": /^(\+?594|0|00594)[67]\d{8}$/,
      "fr-GP": /^(\+?590|0|00590)[67]\d{8}$/,
      "fr-MQ": /^(\+?596|0|00596)[67]\d{8}$/,
      "fr-PF": /^(\+?689)?8[789]\d{6}$/,
      "fr-RE": /^(\+?262|0|00262)[67]\d{8}$/,
      "fr-WF": /^(\+681)?\d{6}$/,
      "he-IL": /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,
      "hu-HU": /^(\+?36|06)(20|30|31|50|70)\d{7}$/,
      "id-ID": /^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,
      "ir-IR": /^(\+98|0)?9\d{9}$/,
      "it-IT": /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
      "it-SM": /^((\+378)|(0549)|(\+390549)|(\+3780549))?6\d{5,9}$/,
      "ja-JP": /^(\+81[ \-]?(\(0\))?|0)[6789]0[ \-]?\d{4}[ \-]?\d{4}$/,
      "ka-GE": /^(\+?995)?(79\d{7}|5\d{8})$/,
      "kk-KZ": /^(\+?7|8)?7\d{9}$/,
      "kl-GL": /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
      "ko-KR": /^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,
      "ky-KG": /^(\+?7\s?\+?7|0)\s?\d{2}\s?\d{3}\s?\d{4}$/,
      "lt-LT": /^(\+370|8)\d{8}$/,
      "lv-LV": /^(\+?371)2\d{7}$/,
      "mg-MG": /^((\+?261|0)(2|3)\d)?\d{7}$/,
      "mn-MN": /^(\+|00|011)?976(77|81|88|91|94|95|96|99)\d{6}$/,
      "my-MM": /^(\+?959|09|9)(2[5-7]|3[1-2]|4[0-5]|6[6-9]|7[5-9]|9[6-9])[0-9]{7}$/,
      "ms-MY": /^(\+?60|0)1(([0145](-|\s)?\d{7,8})|([236-9](-|\s)?\d{7}))$/,
      "mz-MZ": /^(\+?258)?8[234567]\d{7}$/,
      "nb-NO": /^(\+?47)?[49]\d{7}$/,
      "ne-NP": /^(\+?977)?9[78]\d{8}$/,
      "nl-BE": /^(\+?32|0)4\d{8}$/,
      "nl-NL": /^(((\+|00)?31\(0\))|((\+|00)?31)|0)6{1}\d{8}$/,
      "nl-AW": /^(\+)?297(56|59|64|73|74|99)\d{5}$/,
      "nn-NO": /^(\+?47)?[49]\d{7}$/,
      "pl-PL": /^(\+?48)? ?([5-8]\d|45) ?\d{3} ?\d{2} ?\d{2}$/,
      "pt-BR": /^((\+?55\ ?[1-9]{2}\ ?)|(\+?55\ ?\([1-9]{2}\)\ ?)|(0[1-9]{2}\ ?)|(\([1-9]{2}\)\ ?)|([1-9]{2}\ ?))((\d{4}\-?\d{4})|(9[1-9]{1}\d{3}\-?\d{4}))$/,
      "pt-PT": /^(\+?351)?9[1236]\d{7}$/,
      "pt-AO": /^(\+244)\d{9}$/,
      "ro-MD": /^(\+?373|0)((6(0|1|2|6|7|8|9))|(7(6|7|8|9)))\d{6}$/,
      "ro-RO": /^(\+?40|0)\s?7\d{2}(\/|\s|\.|-)?\d{3}(\s|\.|-)?\d{3}$/,
      "ru-RU": /^(\+?7|8)?9\d{9}$/,
      "si-LK": /^(?:0|94|\+94)?(7(0|1|2|4|5|6|7|8)( |-)?)\d{7}$/,
      "sl-SI": /^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,
      "sk-SK": /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
      "so-SO": /^(\+?252|0)((6[0-9])\d{7}|(7[1-9])\d{7})$/,
      "sq-AL": /^(\+355|0)6[789]\d{6}$/,
      "sr-RS": /^(\+3816|06)[- \d]{5,9}$/,
      "sv-SE": /^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,
      "tg-TJ": /^(\+?992)?[5][5]\d{7}$/,
      "th-TH": /^(\+66|66|0)\d{9}$/,
      "tr-TR": /^(\+?90|0)?5\d{9}$/,
      "tk-TM": /^(\+993|993|8)\d{8}$/,
      "uk-UA": /^(\+?38|8)?0\d{9}$/,
      "uz-UZ": /^(\+?998)?(6[125-79]|7[1-69]|88|9\d)\d{7}$/,
      "vi-VN": /^((\+?84)|0)((3([2-9]))|(5([25689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/,
      "zh-CN": /^((\+|00)86)?(1[3-9]|9[28])\d{9}$/,
      "zh-TW": /^(\+?886\-?|0)?9\d{8}$/,
      "dz-BT": /^(\+?975|0)?(17|16|77|02)\d{6}$/,
      "ar-YE": /^(((\+|00)9677|0?7)[0137]\d{7}|((\+|00)967|0)[1-7]\d{6})$/,
      "ar-EH": /^(\+?212|0)[\s\-]?(5288|5289)[\s\-]?\d{5}$/,
      "fa-AF": /^(\+93|0)?(2{1}[0-8]{1}|[3-5]{1}[0-4]{1})(\d{7})$/
    };
    phones["en-CA"] = phones["en-US"];
    phones["fr-CA"] = phones["en-CA"];
    phones["fr-BE"] = phones["nl-BE"];
    phones["zh-HK"] = phones["en-HK"];
    phones["zh-MO"] = phones["en-MO"];
    phones["ga-IE"] = phones["en-IE"];
    phones["fr-CH"] = phones["de-CH"];
    phones["it-CH"] = phones["fr-CH"];
    function isMobilePhone2(str, locale, options) {
      (0, _assertString.default)(str);
      if (options && options.strictMode && !str.startsWith("+")) {
        return false;
      }
      if (Array.isArray(locale)) {
        return locale.some(function(key2) {
          if (phones.hasOwnProperty(key2)) {
            var phone2 = phones[key2];
            if (phone2.test(str)) {
              return true;
            }
          }
          return false;
        });
      } else if (locale in phones) {
        return phones[locale].test(str);
      } else if (!locale || locale === "any") {
        for (var key in phones) {
          if (phones.hasOwnProperty(key)) {
            var phone = phones[key];
            if (phone.test(str)) {
              return true;
            }
          }
        }
        return false;
      }
      throw new Error("Invalid locale '".concat(locale, "'"));
    }
    var locales = exports.locales = Object.keys(phones);
  }
});

// node_modules/dayjs/dayjs.min.js
var require_dayjs_min = __commonJS({
  "node_modules/dayjs/dayjs.min.js"(exports, module) {
    "use strict";
    !function(t, e) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
    }(exports, function() {
      "use strict";
      var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
        var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
        return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
      } }, m = function(t2, e2, n2) {
        var r2 = String(t2);
        return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
      }, v = { s: m, z: function(t2) {
        var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
        return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
      }, m: function t2(e2, n2) {
        if (e2.date() < n2.date())
          return -t2(n2, e2);
        var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
        return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
      }, a: function(t2) {
        return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
      }, p: function(t2) {
        return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t2) {
        return void 0 === t2;
      } }, g = "en", D = {};
      D[g] = M;
      var p = "$isDayjsObject", S = function(t2) {
        return t2 instanceof _ || !(!t2 || !t2[p]);
      }, w = function t2(e2, n2, r2) {
        var i2;
        if (!e2)
          return g;
        if ("string" == typeof e2) {
          var s2 = e2.toLowerCase();
          D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
          var u2 = e2.split("-");
          if (!i2 && u2.length > 1)
            return t2(u2[0]);
        } else {
          var a2 = e2.name;
          D[a2] = e2, i2 = a2;
        }
        return !r2 && i2 && (g = i2), i2 || !r2 && g;
      }, O = function(t2, e2) {
        if (S(t2))
          return t2.clone();
        var n2 = "object" == typeof e2 ? e2 : {};
        return n2.date = t2, n2.args = arguments, new _(n2);
      }, b = v;
      b.l = w, b.i = S, b.w = function(t2, e2) {
        return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
      };
      var _ = function() {
        function M2(t2) {
          this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
        }
        var m2 = M2.prototype;
        return m2.parse = function(t2) {
          this.$d = function(t3) {
            var e2 = t3.date, n2 = t3.utc;
            if (null === e2)
              return /* @__PURE__ */ new Date(NaN);
            if (b.u(e2))
              return /* @__PURE__ */ new Date();
            if (e2 instanceof Date)
              return new Date(e2);
            if ("string" == typeof e2 && !/Z$/i.test(e2)) {
              var r2 = e2.match($);
              if (r2) {
                var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
              }
            }
            return new Date(e2);
          }(t2), this.init();
        }, m2.init = function() {
          var t2 = this.$d;
          this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
        }, m2.$utils = function() {
          return b;
        }, m2.isValid = function() {
          return !(this.$d.toString() === l);
        }, m2.isSame = function(t2, e2) {
          var n2 = O(t2);
          return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
        }, m2.isAfter = function(t2, e2) {
          return O(t2) < this.startOf(e2);
        }, m2.isBefore = function(t2, e2) {
          return this.endOf(e2) < O(t2);
        }, m2.$g = function(t2, e2, n2) {
          return b.u(t2) ? this[e2] : this.set(n2, t2);
        }, m2.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m2.valueOf = function() {
          return this.$d.getTime();
        }, m2.startOf = function(t2, e2) {
          var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {
            var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
            return r2 ? i2 : i2.endOf(a);
          }, $2 = function(t3, e3) {
            return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
          }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
          switch (f2) {
            case h:
              return r2 ? l2(1, 0) : l2(31, 11);
            case c:
              return r2 ? l2(1, M3) : l2(0, M3 + 1);
            case o:
              var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
              return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
            case a:
            case d:
              return $2(v2 + "Hours", 0);
            case u:
              return $2(v2 + "Minutes", 1);
            case s:
              return $2(v2 + "Seconds", 2);
            case i:
              return $2(v2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m2.endOf = function(t2) {
          return this.startOf(t2, false);
        }, m2.$set = function(t2, e2) {
          var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
          if (o2 === c || o2 === h) {
            var y2 = this.clone().set(d, 1);
            y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
          } else
            l2 && this.$d[l2]($2);
          return this.init(), this;
        }, m2.set = function(t2, e2) {
          return this.clone().$set(t2, e2);
        }, m2.get = function(t2) {
          return this[b.p(t2)]();
        }, m2.add = function(r2, f2) {
          var d2, l2 = this;
          r2 = Number(r2);
          var $2 = b.p(f2), y2 = function(t2) {
            var e2 = O(l2);
            return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
          };
          if ($2 === c)
            return this.set(c, this.$M + r2);
          if ($2 === h)
            return this.set(h, this.$y + r2);
          if ($2 === a)
            return y2(1);
          if ($2 === o)
            return y2(7);
          var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
          return b.w(m3, this);
        }, m2.subtract = function(t2, e2) {
          return this.add(-1 * t2, e2);
        }, m2.format = function(t2) {
          var e2 = this, n2 = this.$locale();
          if (!this.isValid())
            return n2.invalidDate || l;
          var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {
            return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
          }, d2 = function(t3) {
            return b.s(s2 % 12 || 12, t3, "0");
          }, $2 = f2 || function(t3, e3, n3) {
            var r3 = t3 < 12 ? "AM" : "PM";
            return n3 ? r3.toLowerCase() : r3;
          };
          return r2.replace(y, function(t3, r3) {
            return r3 || function(t4) {
              switch (t4) {
                case "YY":
                  return String(e2.$y).slice(-2);
                case "YYYY":
                  return b.s(e2.$y, 4, "0");
                case "M":
                  return a2 + 1;
                case "MM":
                  return b.s(a2 + 1, 2, "0");
                case "MMM":
                  return h2(n2.monthsShort, a2, c2, 3);
                case "MMMM":
                  return h2(c2, a2);
                case "D":
                  return e2.$D;
                case "DD":
                  return b.s(e2.$D, 2, "0");
                case "d":
                  return String(e2.$W);
                case "dd":
                  return h2(n2.weekdaysMin, e2.$W, o2, 2);
                case "ddd":
                  return h2(n2.weekdaysShort, e2.$W, o2, 3);
                case "dddd":
                  return o2[e2.$W];
                case "H":
                  return String(s2);
                case "HH":
                  return b.s(s2, 2, "0");
                case "h":
                  return d2(1);
                case "hh":
                  return d2(2);
                case "a":
                  return $2(s2, u2, true);
                case "A":
                  return $2(s2, u2, false);
                case "m":
                  return String(u2);
                case "mm":
                  return b.s(u2, 2, "0");
                case "s":
                  return String(e2.$s);
                case "ss":
                  return b.s(e2.$s, 2, "0");
                case "SSS":
                  return b.s(e2.$ms, 3, "0");
                case "Z":
                  return i2;
              }
              return null;
            }(t3) || i2.replace(":", "");
          });
        }, m2.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m2.diff = function(r2, d2, l2) {
          var $2, y2 = this, M3 = b.p(d2), m3 = O(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
            return b.m(y2, m3);
          };
          switch (M3) {
            case h:
              $2 = D2() / 12;
              break;
            case c:
              $2 = D2();
              break;
            case f:
              $2 = D2() / 3;
              break;
            case o:
              $2 = (g2 - v2) / 6048e5;
              break;
            case a:
              $2 = (g2 - v2) / 864e5;
              break;
            case u:
              $2 = g2 / n;
              break;
            case s:
              $2 = g2 / e;
              break;
            case i:
              $2 = g2 / t;
              break;
            default:
              $2 = g2;
          }
          return l2 ? $2 : b.a($2);
        }, m2.daysInMonth = function() {
          return this.endOf(c).$D;
        }, m2.$locale = function() {
          return D[this.$L];
        }, m2.locale = function(t2, e2) {
          if (!t2)
            return this.$L;
          var n2 = this.clone(), r2 = w(t2, e2, true);
          return r2 && (n2.$L = r2), n2;
        }, m2.clone = function() {
          return b.w(this.$d, this);
        }, m2.toDate = function() {
          return new Date(this.valueOf());
        }, m2.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m2.toISOString = function() {
          return this.$d.toISOString();
        }, m2.toString = function() {
          return this.$d.toUTCString();
        }, M2;
      }(), k = _.prototype;
      return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function(t2) {
        k[t2[1]] = function(e2) {
          return this.$g(e2, t2[0], t2[1]);
        };
      }), O.extend = function(t2, e2) {
        return t2.$i || (t2(e2, _, O), t2.$i = true), O;
      }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
        return O(1e3 * t2);
      }, O.en = D[g], O.Ls = D, O.p = {}, O;
    });
  }
});

// node_modules/dayjs/plugin/isSameOrAfter.js
var require_isSameOrAfter = __commonJS({
  "node_modules/dayjs/plugin/isSameOrAfter.js"(exports, module) {
    "use strict";
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_isSameOrAfter = t();
    }(exports, function() {
      "use strict";
      return function(e, t) {
        t.prototype.isSameOrAfter = function(e2, t2) {
          return this.isSame(e2, t2) || this.isAfter(e2, t2);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/isSameOrBefore.js
var require_isSameOrBefore = __commonJS({
  "node_modules/dayjs/plugin/isSameOrBefore.js"(exports, module) {
    "use strict";
    !function(e, i) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_isSameOrBefore = i();
    }(exports, function() {
      "use strict";
      return function(e, i) {
        i.prototype.isSameOrBefore = function(e2, i2) {
          return this.isSame(e2, i2) || this.isBefore(e2, i2);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/customParseFormat.js
var require_customParseFormat = __commonJS({
  "node_modules/dayjs/plugin/customParseFormat.js"(exports, module) {
    "use strict";
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_customParseFormat = t();
    }(exports, function() {
      "use strict";
      var e = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d\d/, r = /\d\d?/, i = /\d*[^-_:/,()\s\d]+/, o = {}, s = function(e2) {
        return (e2 = +e2) + (e2 > 68 ? 1900 : 2e3);
      };
      var a = function(e2) {
        return function(t2) {
          this[e2] = +t2;
        };
      }, f = [/[+-]\d\d:?(\d\d)?|Z/, function(e2) {
        (this.zone || (this.zone = {})).offset = function(e3) {
          if (!e3)
            return 0;
          if ("Z" === e3)
            return 0;
          var t2 = e3.match(/([+-]|\d\d)/g), n2 = 60 * t2[1] + (+t2[2] || 0);
          return 0 === n2 ? 0 : "+" === t2[0] ? -n2 : n2;
        }(e2);
      }], h = function(e2) {
        var t2 = o[e2];
        return t2 && (t2.indexOf ? t2 : t2.s.concat(t2.f));
      }, u = function(e2, t2) {
        var n2, r2 = o.meridiem;
        if (r2) {
          for (var i2 = 1; i2 <= 24; i2 += 1)
            if (e2.indexOf(r2(i2, 0, t2)) > -1) {
              n2 = i2 > 12;
              break;
            }
        } else
          n2 = e2 === (t2 ? "pm" : "PM");
        return n2;
      }, d = { A: [i, function(e2) {
        this.afternoon = u(e2, false);
      }], a: [i, function(e2) {
        this.afternoon = u(e2, true);
      }], S: [/\d/, function(e2) {
        this.milliseconds = 100 * +e2;
      }], SS: [n, function(e2) {
        this.milliseconds = 10 * +e2;
      }], SSS: [/\d{3}/, function(e2) {
        this.milliseconds = +e2;
      }], s: [r, a("seconds")], ss: [r, a("seconds")], m: [r, a("minutes")], mm: [r, a("minutes")], H: [r, a("hours")], h: [r, a("hours")], HH: [r, a("hours")], hh: [r, a("hours")], D: [r, a("day")], DD: [n, a("day")], Do: [i, function(e2) {
        var t2 = o.ordinal, n2 = e2.match(/\d+/);
        if (this.day = n2[0], t2)
          for (var r2 = 1; r2 <= 31; r2 += 1)
            t2(r2).replace(/\[|\]/g, "") === e2 && (this.day = r2);
      }], M: [r, a("month")], MM: [n, a("month")], MMM: [i, function(e2) {
        var t2 = h("months"), n2 = (h("monthsShort") || t2.map(function(e3) {
          return e3.slice(0, 3);
        })).indexOf(e2) + 1;
        if (n2 < 1)
          throw new Error();
        this.month = n2 % 12 || n2;
      }], MMMM: [i, function(e2) {
        var t2 = h("months").indexOf(e2) + 1;
        if (t2 < 1)
          throw new Error();
        this.month = t2 % 12 || t2;
      }], Y: [/[+-]?\d+/, a("year")], YY: [n, function(e2) {
        this.year = s(e2);
      }], YYYY: [/\d{4}/, a("year")], Z: f, ZZ: f };
      function c(n2) {
        var r2, i2;
        r2 = n2, i2 = o && o.formats;
        for (var s2 = (n2 = r2.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(t2, n3, r3) {
          var o2 = r3 && r3.toUpperCase();
          return n3 || i2[r3] || e[r3] || i2[o2].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(e2, t3, n4) {
            return t3 || n4.slice(1);
          });
        })).match(t), a2 = s2.length, f2 = 0; f2 < a2; f2 += 1) {
          var h2 = s2[f2], u2 = d[h2], c2 = u2 && u2[0], l = u2 && u2[1];
          s2[f2] = l ? { regex: c2, parser: l } : h2.replace(/^\[|\]$/g, "");
        }
        return function(e2) {
          for (var t2 = {}, n3 = 0, r3 = 0; n3 < a2; n3 += 1) {
            var i3 = s2[n3];
            if ("string" == typeof i3)
              r3 += i3.length;
            else {
              var o2 = i3.regex, f3 = i3.parser, h3 = e2.slice(r3), u3 = o2.exec(h3)[0];
              f3.call(t2, u3), e2 = e2.replace(u3, "");
            }
          }
          return function(e3) {
            var t3 = e3.afternoon;
            if (void 0 !== t3) {
              var n4 = e3.hours;
              t3 ? n4 < 12 && (e3.hours += 12) : 12 === n4 && (e3.hours = 0), delete e3.afternoon;
            }
          }(t2), t2;
        };
      }
      return function(e2, t2, n2) {
        n2.p.customParseFormat = true, e2 && e2.parseTwoDigitYear && (s = e2.parseTwoDigitYear);
        var r2 = t2.prototype, i2 = r2.parse;
        r2.parse = function(e3) {
          var t3 = e3.date, r3 = e3.utc, s2 = e3.args;
          this.$u = r3;
          var a2 = s2[1];
          if ("string" == typeof a2) {
            var f2 = true === s2[2], h2 = true === s2[3], u2 = f2 || h2, d2 = s2[2];
            h2 && (d2 = s2[2]), o = this.$locale(), !f2 && d2 && (o = n2.Ls[d2]), this.$d = function(e4, t4, n3) {
              try {
                if (["x", "X"].indexOf(t4) > -1)
                  return new Date(("X" === t4 ? 1e3 : 1) * e4);
                var r4 = c(t4)(e4), i3 = r4.year, o2 = r4.month, s3 = r4.day, a3 = r4.hours, f3 = r4.minutes, h3 = r4.seconds, u3 = r4.milliseconds, d3 = r4.zone, l2 = /* @__PURE__ */ new Date(), m2 = s3 || (i3 || o2 ? 1 : l2.getDate()), M2 = i3 || l2.getFullYear(), Y = 0;
                i3 && !o2 || (Y = o2 > 0 ? o2 - 1 : l2.getMonth());
                var p = a3 || 0, v = f3 || 0, D = h3 || 0, g = u3 || 0;
                return d3 ? new Date(Date.UTC(M2, Y, m2, p, v, D, g + 60 * d3.offset * 1e3)) : n3 ? new Date(Date.UTC(M2, Y, m2, p, v, D, g)) : new Date(M2, Y, m2, p, v, D, g);
              } catch (e5) {
                return /* @__PURE__ */ new Date("");
              }
            }(t3, a2, r3), this.init(), d2 && true !== d2 && (this.$L = this.locale(d2).$L), u2 && t3 != this.format(a2) && (this.$d = /* @__PURE__ */ new Date("")), o = {};
          } else if (a2 instanceof Array)
            for (var l = a2.length, m = 1; m <= l; m += 1) {
              s2[1] = a2[m - 1];
              var M = n2.apply(this, s2);
              if (M.isValid()) {
                this.$d = M.$d, this.$L = M.$L, this.init();
                break;
              }
              m === l && (this.$d = /* @__PURE__ */ new Date(""));
            }
          else
            i2.call(this, e3);
        };
      };
    });
  }
});

// node_modules/validator/lib/escape.js
var require_escape = __commonJS({
  "node_modules/validator/lib/escape.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = escape2;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function escape2(str) {
      (0, _assertString.default)(str);
      return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\//g, "&#x2F;").replace(/\\/g, "&#x5C;").replace(/`/g, "&#96;");
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// node_modules/validator/lib/normalizeEmail.js
var require_normalizeEmail = __commonJS({
  "node_modules/validator/lib/normalizeEmail.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = normalizeEmail2;
    var _merge = _interopRequireDefault(require_merge());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var default_normalize_email_options = {
      // The following options apply to all email addresses
      // Lowercases the local part of the email address.
      // Please note this may violate RFC 5321 as per http://stackoverflow.com/a/9808332/192024).
      // The domain is always lowercased, as per RFC 1035
      all_lowercase: true,
      // The following conversions are specific to GMail
      // Lowercases the local part of the GMail address (known to be case-insensitive)
      gmail_lowercase: true,
      // Removes dots from the local part of the email address, as that's ignored by GMail
      gmail_remove_dots: true,
      // Removes the subaddress (e.g. "+foo") from the email address
      gmail_remove_subaddress: true,
      // Conversts the googlemail.com domain to gmail.com
      gmail_convert_googlemaildotcom: true,
      // The following conversions are specific to Outlook.com / Windows Live / Hotmail
      // Lowercases the local part of the Outlook.com address (known to be case-insensitive)
      outlookdotcom_lowercase: true,
      // Removes the subaddress (e.g. "+foo") from the email address
      outlookdotcom_remove_subaddress: true,
      // The following conversions are specific to Yahoo
      // Lowercases the local part of the Yahoo address (known to be case-insensitive)
      yahoo_lowercase: true,
      // Removes the subaddress (e.g. "-foo") from the email address
      yahoo_remove_subaddress: true,
      // The following conversions are specific to Yandex
      // Lowercases the local part of the Yandex address (known to be case-insensitive)
      yandex_lowercase: true,
      // The following conversions are specific to iCloud
      // Lowercases the local part of the iCloud address (known to be case-insensitive)
      icloud_lowercase: true,
      // Removes the subaddress (e.g. "+foo") from the email address
      icloud_remove_subaddress: true
    };
    var icloud_domains = ["icloud.com", "me.com"];
    var outlookdotcom_domains = ["hotmail.at", "hotmail.be", "hotmail.ca", "hotmail.cl", "hotmail.co.il", "hotmail.co.nz", "hotmail.co.th", "hotmail.co.uk", "hotmail.com", "hotmail.com.ar", "hotmail.com.au", "hotmail.com.br", "hotmail.com.gr", "hotmail.com.mx", "hotmail.com.pe", "hotmail.com.tr", "hotmail.com.vn", "hotmail.cz", "hotmail.de", "hotmail.dk", "hotmail.es", "hotmail.fr", "hotmail.hu", "hotmail.id", "hotmail.ie", "hotmail.in", "hotmail.it", "hotmail.jp", "hotmail.kr", "hotmail.lv", "hotmail.my", "hotmail.ph", "hotmail.pt", "hotmail.sa", "hotmail.sg", "hotmail.sk", "live.be", "live.co.uk", "live.com", "live.com.ar", "live.com.mx", "live.de", "live.es", "live.eu", "live.fr", "live.it", "live.nl", "msn.com", "outlook.at", "outlook.be", "outlook.cl", "outlook.co.il", "outlook.co.nz", "outlook.co.th", "outlook.com", "outlook.com.ar", "outlook.com.au", "outlook.com.br", "outlook.com.gr", "outlook.com.pe", "outlook.com.tr", "outlook.com.vn", "outlook.cz", "outlook.de", "outlook.dk", "outlook.es", "outlook.fr", "outlook.hu", "outlook.id", "outlook.ie", "outlook.in", "outlook.it", "outlook.jp", "outlook.kr", "outlook.lv", "outlook.my", "outlook.ph", "outlook.pt", "outlook.sa", "outlook.sg", "outlook.sk", "passport.com"];
    var yahoo_domains = ["rocketmail.com", "yahoo.ca", "yahoo.co.uk", "yahoo.com", "yahoo.de", "yahoo.fr", "yahoo.in", "yahoo.it", "ymail.com"];
    var yandex_domains = ["yandex.ru", "yandex.ua", "yandex.kz", "yandex.com", "yandex.by", "ya.ru"];
    function dotsReplacer(match) {
      if (match.length > 1) {
        return match;
      }
      return "";
    }
    function normalizeEmail2(email, options) {
      options = (0, _merge.default)(options, default_normalize_email_options);
      var raw_parts = email.split("@");
      var domain = raw_parts.pop();
      var user = raw_parts.join("@");
      var parts = [user, domain];
      parts[1] = parts[1].toLowerCase();
      if (parts[1] === "gmail.com" || parts[1] === "googlemail.com") {
        if (options.gmail_remove_subaddress) {
          parts[0] = parts[0].split("+")[0];
        }
        if (options.gmail_remove_dots) {
          parts[0] = parts[0].replace(/\.+/g, dotsReplacer);
        }
        if (!parts[0].length) {
          return false;
        }
        if (options.all_lowercase || options.gmail_lowercase) {
          parts[0] = parts[0].toLowerCase();
        }
        parts[1] = options.gmail_convert_googlemaildotcom ? "gmail.com" : parts[1];
      } else if (icloud_domains.indexOf(parts[1]) >= 0) {
        if (options.icloud_remove_subaddress) {
          parts[0] = parts[0].split("+")[0];
        }
        if (!parts[0].length) {
          return false;
        }
        if (options.all_lowercase || options.icloud_lowercase) {
          parts[0] = parts[0].toLowerCase();
        }
      } else if (outlookdotcom_domains.indexOf(parts[1]) >= 0) {
        if (options.outlookdotcom_remove_subaddress) {
          parts[0] = parts[0].split("+")[0];
        }
        if (!parts[0].length) {
          return false;
        }
        if (options.all_lowercase || options.outlookdotcom_lowercase) {
          parts[0] = parts[0].toLowerCase();
        }
      } else if (yahoo_domains.indexOf(parts[1]) >= 0) {
        if (options.yahoo_remove_subaddress) {
          var components = parts[0].split("-");
          parts[0] = components.length > 1 ? components.slice(0, -1).join("-") : components[0];
        }
        if (!parts[0].length) {
          return false;
        }
        if (options.all_lowercase || options.yahoo_lowercase) {
          parts[0] = parts[0].toLowerCase();
        }
      } else if (yandex_domains.indexOf(parts[1]) >= 0) {
        if (options.all_lowercase || options.yandex_lowercase) {
          parts[0] = parts[0].toLowerCase();
        }
        parts[1] = "yandex.ru";
      } else if (options.all_lowercase) {
        parts[0] = parts[0].toLowerCase();
      }
      return parts.join("@");
    }
    module.exports = exports.default;
    module.exports.default = exports.default;
  }
});

// src/EnvironmentManager.ts
import fs from "fs";
import path from "path";

// src/Logger.ts
import winston from "winston";
var colors = {
  info: "\x1B[32m",
  warn: "\x1B[33m",
  error: "\x1B[31m"
};
var logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ level, message, timestamp }) => {
    const color = colors[level] || "\x1B[0m";
    return `${timestamp} ${color}${level}\x1B[0m: ${color}${message}\x1B[0m`;
  })
);
var consoleTransport = new winston.transports.Console();
var fileTransport = new winston.transports.File({ filename: "logfile.log" });
var logger = winston.createLogger({
  format: logFormat,
  transports: [consoleTransport, fileTransport]
});
function log(message, logs) {
  if (!logs) {
    return;
  }
  logger.info(message);
}

// node_modules/@vinejs/vine/build/chunk-577THMJC.js
var messages = {
  "required": "The {{ field }} field must be defined",
  "string": "The {{ field }} field must be a string",
  "email": "The {{ field }} field must be a valid email address",
  "mobile": "The {{ field }} field must be a valid mobile phone number",
  "creditCard": "The {{ field }} field must be a valid {{ providersList }} card number",
  "passport": "The {{ field }} field must be a valid passport number",
  "postalCode": "The {{ field }} field must be a valid postal code",
  "regex": "The {{ field }} field format is invalid",
  "ascii": "The {{ field }} field must only contain ASCII characters",
  "iban": "The {{ field }} field must be a valid IBAN number",
  "jwt": "The {{ field }} field must be a valid JWT token",
  "coordinates": "The {{ field }} field must contain latitude and longitude coordinates",
  "url": "The {{ field }} field must be a valid URL",
  "activeUrl": "The {{ field }} field must be a valid URL",
  "alpha": "The {{ field }} field must contain only letters",
  "alphaNumeric": "The {{ field }} field must contain only letters and numbers",
  "minLength": "The {{ field }} field must have at least {{ min }} characters",
  "maxLength": "The {{ field }} field must not be greater than {{ max }} characters",
  "fixedLength": "The {{ field }} field must be {{ size }} characters long",
  "confirmed": "The {{ field }} field and {{ otherField }} field must be the same",
  "endsWith": "The {{ field }} field must end with {{ substring }}",
  "startsWith": "The {{ field }} field must start with {{ substring }}",
  "sameAs": "The {{ field }} field and {{ otherField }} field must be the same",
  "notSameAs": "The {{ field }} field and {{ otherField }} field must be different",
  "in": "The selected {{ field }} is invalid",
  "notIn": "The selected {{ field }} is invalid",
  "ipAddress": "The {{ field }} field must be a valid IP address",
  "uuid": "The {{ field }} field must be a valid UUID",
  "hexCode": "The {{ field }} field must be a valid hex color code",
  "boolean": "The value must be a boolean",
  "number": "The {{ field }} field must be a number",
  "number.in": "The selected {{ field }} is not in {{ values }}",
  "min": "The {{ field }} field must be at least {{ min }}",
  "max": "The {{ field }} field must not be greater than {{ max }}",
  "range": "The {{ field }} field must be between {{ min }} and {{ max }}",
  "positive": "The {{ field }} field must be positive",
  "negative": "The {{ field }} field must be negative",
  "decimal": "The {{ field }} field must have {{ digits }} decimal places",
  "withoutDecimals": "The {{ field }} field must be an integer",
  "accepted": "The {{ field }} field must be accepted",
  "enum": "The selected {{ field }} is invalid",
  "literal": "The {{ field }} field must be {{ expectedValue }}",
  "object": "The {{ field }} field must be an object",
  "array": "The {{ field }} field must be an array",
  "array.minLength": "The {{ field }} field must have at least {{ min }} items",
  "array.maxLength": "The {{ field }} field must not have more than {{ max }} items",
  "array.fixedLength": "The {{ field }} field must contain {{ size }} items",
  "notEmpty": "The {{ field }} field must not be empty",
  "distinct": "The {{ field }} field has duplicate values",
  "record": "The {{ field }} field must be an object",
  "record.minLength": "The {{ field }} field must have at least {{ min }} items",
  "record.maxLength": "The {{ field }} field must not have more than {{ max }} items",
  "record.fixedLength": "The {{ field }} field must contain {{ size }} items",
  "tuple": "The {{ field }} field must be an array",
  "union": "Invalid value provided for {{ field }} field",
  "unionGroup": "Invalid value provided for {{ field }} field",
  "unionOfTypes": "Invalid value provided for {{ field }} field",
  "date": "The {{ field }} field must be a datetime value",
  "date.equals": "The {{ field }} field must be a date equal to {{ expectedValue }}",
  "date.after": "The {{ field }} field must be a date after {{ expectedValue }}",
  "date.before": "The {{ field }} field must be a date before {{ expectedValue }}",
  "date.afterOrEqual": "The {{ field }} field must be a date after or equal to {{ expectedValue }}",
  "date.beforeOrEqual": "The {{ field }} field must be a date before or equal to {{ expectedValue }}",
  "date.sameAs": "The {{ field }} field and {{ otherField }} field must be the same",
  "date.notSameAs": "The {{ field }} field and {{ otherField }} field must be different",
  "date.afterField": "The {{ field }} field must be a date after {{ otherField }}",
  "date.afterOrSameAs": "The {{ field }} field must be a date after or same as {{ otherField }}",
  "date.beforeField": "The {{ field }} field must be a date before {{ otherField }}",
  "date.beforeOrSameAs": "The {{ field }} field must be a date before or same as {{ otherField }}",
  "date.weekend": "The {{ field }} field is not a weekend",
  "date.weekday": "The {{ field }} field is not a weekday"
};
var fields = {
  "": "data"
};

// node_modules/@vinejs/vine/build/chunk-CSAU5B4Q.js
var __defProp2 = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
};

// node_modules/dlv/dist/dlv.es.js
function dlv_es_default(t, e, l, n, r) {
  for (e = e.split ? e.split(".") : e, n = 0; n < e.length; n++)
    t = t ? t[e[n]] : r;
  return t === r ? l : t;
}

// node_modules/@vinejs/vine/build/chunk-2W32DW3L.js
var import_isIP = __toESM(require_isIP(), 1);
var import_isJWT = __toESM(require_isJWT(), 1);
var import_isURL = __toESM(require_isURL(), 1);
var import_isSlug = __toESM(require_isSlug(), 1);
var import_isIBAN = __toESM(require_isIBAN(), 1);
var import_isUUID = __toESM(require_isUUID(), 1);
var import_isAscii = __toESM(require_isAscii(), 1);
var import_isEmail = __toESM(require_isEmail(), 1);
var import_isAlpha = __toESM(require_isAlpha(), 1);
var import_isLatLong = __toESM(require_isLatLong(), 1);
var import_isDecimal = __toESM(require_isDecimal(), 1);
var import_isHexColor = __toESM(require_isHexColor(), 1);
var import_isCreditCard = __toESM(require_isCreditCard(), 1);
var import_isAlphanumeric = __toESM(require_isAlphanumeric(), 1);
var import_isPassportNumber = __toESM(require_isPassportNumber(), 1);
var import_isPostalCode = __toESM(require_isPostalCode(), 1);
var import_isMobilePhone = __toESM(require_isMobilePhone(), 1);
var import_isMobilePhone2 = __toESM(require_isMobilePhone(), 1);
var import_isPostalCode2 = __toESM(require_isPostalCode(), 1);
var _messages, _fields, _interpolate, interpolate_fn, _a;
var SimpleMessagesProvider = (_a = class {
  constructor(messages2, fields2) {
    /**
     * Interpolates place holders within error messages
     */
    __privateAdd(this, _interpolate);
    __privateAdd(this, _messages, void 0);
    __privateAdd(this, _fields, void 0);
    __privateSet(this, _messages, messages2);
    __privateSet(this, _fields, fields2 || {});
  }
  /**
   * Returns a validation message for a given field + rule.
   */
  getMessage(rawMessage, rule, field, args) {
    const fieldName = __privateGet(this, _fields)[field.name] || field.name;
    const fieldMessage = __privateGet(this, _messages)[`${field.getFieldPath()}.${rule}`];
    if (fieldMessage) {
      return __privateMethod(this, _interpolate, interpolate_fn).call(this, fieldMessage, {
        field: fieldName,
        ...args
      });
    }
    const wildcardMessage = __privateGet(this, _messages)[`${field.wildCardPath}.${rule}`];
    if (wildcardMessage) {
      return __privateMethod(this, _interpolate, interpolate_fn).call(this, wildcardMessage, {
        field: fieldName,
        ...args
      });
    }
    const ruleMessage = __privateGet(this, _messages)[rule];
    if (ruleMessage) {
      return __privateMethod(this, _interpolate, interpolate_fn).call(this, ruleMessage, {
        field: fieldName,
        ...args
      });
    }
    return __privateMethod(this, _interpolate, interpolate_fn).call(this, rawMessage, {
      field: fieldName,
      ...args
    });
  }
  toJSON() {
    return {
      messages: __privateGet(this, _messages),
      fields: __privateGet(this, _fields)
    };
  }
}, _messages = new WeakMap(), _fields = new WeakMap(), _interpolate = new WeakSet(), interpolate_fn = function(message, data) {
  if (!message.includes("{{")) {
    return message;
  }
  return message.replace(/(\\)?{{(.*?)}}/g, (_, __, key) => {
    const tokens = key.trim().split(".");
    let output = data;
    while (tokens.length) {
      if (output === null || typeof output !== "object") {
        return;
      }
      const token = tokens.shift();
      output = Object.hasOwn(output, token) ? output[token] : void 0;
    }
    return output;
  });
}, _a);
var main_exports = {};
__export(main_exports, {
  E_VALIDATION_ERROR: () => E_VALIDATION_ERROR
});
var ValidationError = class extends Error {
  constructor(messages2, options) {
    super("Validation failure", options);
    /**
     * Http status code for the validation error
     */
    __publicField(this, "status", 422);
    /**
     * Internal code for handling the validation error
     * exception
     */
    __publicField(this, "code", "E_VALIDATION_ERROR");
    this.messages = messages2;
    const ErrorConstructor = this.constructor;
    Error.captureStackTrace(this, ErrorConstructor);
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return `${this.name} [${this.code}]: ${this.message}`;
  }
};
var E_VALIDATION_ERROR = ValidationError;
var SimpleErrorReporter = class {
  constructor() {
    /**
     * Boolean to know one or more errors have been reported
     */
    __publicField(this, "hasErrors", false);
    /**
     * Collection of errors
     */
    __publicField(this, "errors", []);
  }
  /**
   * Report an error.
   */
  report(message, rule, field, meta) {
    const error = {
      message,
      rule,
      field: field.getFieldPath()
    };
    if (meta) {
      error.meta = meta;
    }
    if (field.isArrayMember) {
      error.index = field.name;
    }
    this.hasErrors = true;
    this.errors.push(error);
  }
  /**
   * Returns an instance of the validation error
   */
  createError() {
    return new E_VALIDATION_ERROR(this.errors);
  }
};
var BOOLEAN_POSITIVES = ["1", 1, "true", true, "on"];
var BOOLEAN_NEGATIVES = ["0", 0, "false", false];
var helpers = {
  /**
   * Returns true when value is not null and neither
   * undefined
   */
  exists(value) {
    return value !== null && value !== void 0;
  },
  /**
   * Returns true when value is null or value is undefined
   */
  isMissing(value) {
    return !this.exists(value);
  },
  /**
   * Returns true when the value is one of the following.
   *
   * true
   * 1
   * "1"
   * "true"
   * "on"
   */
  isTrue(value) {
    return BOOLEAN_POSITIVES.includes(value);
  },
  /**
   * Returns true when the value is one of the following.
   *
   * false
   * 0
   * "0"
   * "false"
   */
  isFalse(value) {
    return BOOLEAN_NEGATIVES.includes(value);
  },
  /**
   * Check if the value is a valid string. This method narrows
   * the type of value to string.
   */
  isString(value) {
    return typeof value === "string";
  },
  /**
   * Check if the value is a plain JavaScript object. This method
   * filters out null and Arrays and does not consider them as Objects.
   */
  isObject(value) {
    return !!(value && typeof value === "object" && !Array.isArray(value));
  },
  /**
   * Check if an object has all the mentioned keys
   */
  hasKeys(value, keys) {
    for (let key of keys) {
      if (key in value === false) {
        return false;
      }
    }
    return true;
  },
  /**
   * Check if the value is an Array.
   */
  isArray(value) {
    return Array.isArray(value);
  },
  /**
   * Check if the value is a number or a string representation of a number.
   */
  isNumeric(value) {
    return !Number.isNaN(Number(value));
  },
  /**
   * Casts the value to a number using the Number method.
   * Returns NaN when unable to cast.
   */
  asNumber(value) {
    return value === null ? Number.NaN : Number(value);
  },
  /**
   * Casts the value to a boolean.
   *
   * - [true, 1, "1", "true", "on"] will be converted to true.
   * - [false, 0, "0", "false"] will be converted to false.
   * - Everything else will return null. So make sure to handle that case.
   */
  asBoolean(value) {
    if (this.isTrue(value)) {
      return true;
    }
    if (this.isFalse(value)) {
      return false;
    }
    return null;
  },
  isEmail: import_isEmail.default.default,
  isURL: import_isURL.default.default,
  isAlpha: import_isAlpha.default.default,
  isAlphaNumeric: import_isAlphanumeric.default.default,
  isIP: import_isIP.default.default,
  isUUID: import_isUUID.default.default,
  isAscii: import_isAscii.default.default,
  isCreditCard: import_isCreditCard.default.default,
  isIBAN: import_isIBAN.default.default,
  isJWT: import_isJWT.default.default,
  isLatLong: import_isLatLong.default.default,
  isMobilePhone: import_isMobilePhone.default.default,
  isPassportNumber: import_isPassportNumber.default.default,
  isPostalCode: import_isPostalCode.default.default,
  isSlug: import_isSlug.default.default,
  isDecimal: import_isDecimal.default.default,
  mobileLocales: import_isMobilePhone2.locales,
  postalCountryCodes: import_isPostalCode2.locales,
  passportCountryCodes: [
    "AM",
    "AR",
    "AT",
    "AU",
    "AZ",
    "BE",
    "BG",
    "BR",
    "BY",
    "CA",
    "CH",
    "CY",
    "CZ",
    "DE",
    "DK",
    "DZ",
    "ES",
    "FI",
    "FR",
    "GB",
    "GR",
    "HR",
    "HU",
    "IE",
    "IN",
    "ID",
    "IR",
    "IS",
    "IT",
    "JM",
    "JP",
    "KR",
    "KZ",
    "LI",
    "LT",
    "LU",
    "LV",
    "LY",
    "MT",
    "MZ",
    "MY",
    "MX",
    "NL",
    "NZ",
    "PH",
    "PK",
    "PL",
    "PT",
    "RO",
    "RU",
    "SE",
    "SL",
    "SK",
    "TH",
    "TR",
    "UA",
    "US"
  ],
  /**
   * Check if the value is a valid color hexcode
   */
  isHexColor: (value) => {
    if (!value.startsWith("#")) {
      return false;
    }
    return import_isHexColor.default.default(value);
  },
  /**
   * Check if a URL has valid `A` or `AAAA` DNS records
   */
  isActiveURL: async (url) => {
    const { resolve4, resolve6 } = await import("dns/promises");
    try {
      const { hostname } = new URL(url);
      const v6Addresses = await resolve6(hostname);
      if (v6Addresses.length) {
        return true;
      } else {
        const v4Addresses = await resolve4(hostname);
        return v4Addresses.length > 0;
      }
    } catch {
      return false;
    }
  },
  /**
   * Check if all the elements inside the dataset are unique.
   *
   * In case of an array of objects, you must provide one or more keys
   * for the fields that must be unique across the objects.
   *
   * ```ts
   * helpers.isDistinct([1, 2, 4, 5]) // true
   *
   * // Null and undefined values are ignored
   * helpers.isDistinct([1, null, 2, null, 4, 5]) // true
   *
   * helpers.isDistinct([
   *   {
   *     email: 'foo@bar.com',
   *     name: 'foo'
   *   },
   *   {
   *     email: 'baz@bar.com',
   *     name: 'baz'
   *   }
   * ], 'email') // true
   *
   * helpers.isDistinct([
   *   {
   *     email: 'foo@bar.com',
   *     tenant_id: 1,
   *     name: 'foo'
   *   },
   *   {
   *     email: 'foo@bar.com',
   *     tenant_id: 2,
   *     name: 'baz'
   *   }
   * ], ['email', 'tenant_id']) // true
   * ```
   */
  isDistinct: (dataSet, fields2) => {
    const uniqueItems = /* @__PURE__ */ new Set();
    if (!fields2) {
      for (let item of dataSet) {
        if (helpers.exists(item)) {
          if (uniqueItems.has(item)) {
            return false;
          } else {
            uniqueItems.add(item);
          }
        }
      }
      return true;
    }
    const fieldsList = Array.isArray(fields2) ? fields2 : [fields2];
    for (let item of dataSet) {
      if (helpers.isObject(item) && helpers.hasKeys(item, fieldsList)) {
        const element = fieldsList.map((field) => item[field]).join("_");
        if (uniqueItems.has(element)) {
          return false;
        } else {
          uniqueItems.add(element);
        }
      }
    }
    return true;
  },
  /**
   * Returns the nested value from the field root
   * object or the sibling value from the field
   * parent object
   */
  getNestedValue(key, field) {
    if (key.indexOf(".") > -1) {
      return dlv_es_default(field.data, key);
    }
    return field.parent[key];
  }
};

// node_modules/@poppinss/macroable/build/index.js
var Macroable = class {
  /**
   *
   * Macros are standard properties that gets added to the class prototype.
   *
   * ```ts
   * MyClass.macro('foo', 'bar')
   * ```
   */
  static macro(name, value) {
    this.prototype[name] = value;
  }
  /**
   *
   * Getters are added to the class prototype using the Object.defineProperty.
   *
   * ```ts
   * MyClass.getter('foo', function foo () {
   *   return 'bar'
   * })
   * ```
   *
   * You can add a singleton getter by enabling the `singleton` flag.
   *
   * ```ts
   * const singleton = true
   *
   * MyClass.getter('foo', function foo () {
   *   return 'bar'
   * }, singleton)
   * ```
   */
  static getter(name, accumulator, singleton = false) {
    Object.defineProperty(this.prototype, name, {
      get() {
        const value = accumulator.call(this);
        if (singleton) {
          Object.defineProperty(this, name, {
            configurable: false,
            enumerable: false,
            value,
            writable: false
          });
        }
        return value;
      },
      configurable: true,
      enumerable: false
    });
  }
};

// node_modules/camelcase/index.js
var UPPERCASE = /[\p{Lu}]/u;
var LOWERCASE = /[\p{Ll}]/u;
var LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
var IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
var SEPARATORS = /[_.\- ]+/;
var LEADING_SEPARATORS = new RegExp("^" + SEPARATORS.source);
var SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, "gu");
var NUMBERS_AND_IDENTIFIER = new RegExp("\\d+" + IDENTIFIER.source, "gu");
var preserveCamelCase = (string, toLowerCase, toUpperCase, preserveConsecutiveUppercase2) => {
  let isLastCharLower = false;
  let isLastCharUpper = false;
  let isLastLastCharUpper = false;
  let isLastLastCharPreserved = false;
  for (let index = 0; index < string.length; index++) {
    const character = string[index];
    isLastLastCharPreserved = index > 2 ? string[index - 3] === "-" : true;
    if (isLastCharLower && UPPERCASE.test(character)) {
      string = string.slice(0, index) + "-" + string.slice(index);
      isLastCharLower = false;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = true;
      index++;
    } else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character) && (!isLastLastCharPreserved || preserveConsecutiveUppercase2)) {
      string = string.slice(0, index - 1) + "-" + string.slice(index - 1);
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = false;
      isLastCharLower = true;
    } else {
      isLastCharLower = toLowerCase(character) === character && toUpperCase(character) !== character;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = toUpperCase(character) === character && toLowerCase(character) !== character;
    }
  }
  return string;
};
var preserveConsecutiveUppercase = (input, toLowerCase) => {
  LEADING_CAPITAL.lastIndex = 0;
  return input.replaceAll(LEADING_CAPITAL, (match) => toLowerCase(match));
};
var postProcess = (input, toUpperCase) => {
  SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
  NUMBERS_AND_IDENTIFIER.lastIndex = 0;
  return input.replaceAll(NUMBERS_AND_IDENTIFIER, (match, pattern, offset) => ["_", "-"].includes(input.charAt(offset + match.length)) ? match : toUpperCase(match)).replaceAll(SEPARATORS_AND_IDENTIFIER, (_, identifier) => toUpperCase(identifier));
};
function camelCase(input, options) {
  if (!(typeof input === "string" || Array.isArray(input))) {
    throw new TypeError("Expected the input to be `string | string[]`");
  }
  options = {
    pascalCase: false,
    preserveConsecutiveUppercase: false,
    ...options
  };
  if (Array.isArray(input)) {
    input = input.map((x) => x.trim()).filter((x) => x.length).join("-");
  } else {
    input = input.trim();
  }
  if (input.length === 0) {
    return "";
  }
  const toLowerCase = options.locale === false ? (string) => string.toLowerCase() : (string) => string.toLocaleLowerCase(options.locale);
  const toUpperCase = options.locale === false ? (string) => string.toUpperCase() : (string) => string.toLocaleUpperCase(options.locale);
  if (input.length === 1) {
    if (SEPARATORS.test(input)) {
      return "";
    }
    return options.pascalCase ? toUpperCase(input) : toLowerCase(input);
  }
  const hasUpperCase = input !== toLowerCase(input);
  if (hasUpperCase) {
    input = preserveCamelCase(input, toLowerCase, toUpperCase, options.preserveConsecutiveUppercase);
  }
  input = input.replace(LEADING_SEPARATORS, "");
  input = options.preserveConsecutiveUppercase ? preserveConsecutiveUppercase(input, toLowerCase) : toLowerCase(input);
  if (options.pascalCase) {
    input = toUpperCase(input.charAt(0)) + input.slice(1);
  }
  return postProcess(input, toUpperCase);
}

// node_modules/@vinejs/vine/build/chunk-46WINKKP.js
var import_dayjs = __toESM(require_dayjs_min(), 1);
var import_dayjs2 = __toESM(require_dayjs_min(), 1);
var import_isSameOrAfter = __toESM(require_isSameOrAfter(), 1);
var import_isSameOrBefore = __toESM(require_isSameOrBefore(), 1);
var import_customParseFormat = __toESM(require_customParseFormat(), 1);

// node_modules/normalize-url/index.js
var DATA_URL_DEFAULT_MIME_TYPE = "text/plain";
var DATA_URL_DEFAULT_CHARSET = "us-ascii";
var testParameter = (name, filters) => filters.some((filter) => filter instanceof RegExp ? filter.test(name) : filter === name);
var supportedProtocols = /* @__PURE__ */ new Set([
  "https:",
  "http:",
  "file:"
]);
var hasCustomProtocol = (urlString) => {
  try {
    const { protocol } = new URL(urlString);
    return protocol.endsWith(":") && !protocol.includes(".") && !supportedProtocols.has(protocol);
  } catch {
    return false;
  }
};
var normalizeDataURL = (urlString, { stripHash }) => {
  const match = /^data:(?<type>[^,]*?),(?<data>[^#]*?)(?:#(?<hash>.*))?$/.exec(urlString);
  if (!match) {
    throw new Error(`Invalid URL: ${urlString}`);
  }
  let { type, data, hash } = match.groups;
  const mediaType = type.split(";");
  hash = stripHash ? "" : hash;
  let isBase64 = false;
  if (mediaType[mediaType.length - 1] === "base64") {
    mediaType.pop();
    isBase64 = true;
  }
  const mimeType = mediaType.shift()?.toLowerCase() ?? "";
  const attributes = mediaType.map((attribute) => {
    let [key, value = ""] = attribute.split("=").map((string) => string.trim());
    if (key === "charset") {
      value = value.toLowerCase();
      if (value === DATA_URL_DEFAULT_CHARSET) {
        return "";
      }
    }
    return `${key}${value ? `=${value}` : ""}`;
  }).filter(Boolean);
  const normalizedMediaType = [
    ...attributes
  ];
  if (isBase64) {
    normalizedMediaType.push("base64");
  }
  if (normalizedMediaType.length > 0 || mimeType && mimeType !== DATA_URL_DEFAULT_MIME_TYPE) {
    normalizedMediaType.unshift(mimeType);
  }
  return `data:${normalizedMediaType.join(";")},${isBase64 ? data.trim() : data}${hash ? `#${hash}` : ""}`;
};
function normalizeUrl(urlString, options) {
  options = {
    defaultProtocol: "http",
    normalizeProtocol: true,
    forceHttp: false,
    forceHttps: false,
    stripAuthentication: true,
    stripHash: false,
    stripTextFragment: true,
    stripWWW: true,
    removeQueryParameters: [/^utm_\w+/i],
    removeTrailingSlash: true,
    removeSingleSlash: true,
    removeDirectoryIndex: false,
    removeExplicitPort: false,
    sortQueryParameters: true,
    ...options
  };
  if (typeof options.defaultProtocol === "string" && !options.defaultProtocol.endsWith(":")) {
    options.defaultProtocol = `${options.defaultProtocol}:`;
  }
  urlString = urlString.trim();
  if (/^data:/i.test(urlString)) {
    return normalizeDataURL(urlString, options);
  }
  if (hasCustomProtocol(urlString)) {
    return urlString;
  }
  const hasRelativeProtocol = urlString.startsWith("//");
  const isRelativeUrl = !hasRelativeProtocol && /^\.*\//.test(urlString);
  if (!isRelativeUrl) {
    urlString = urlString.replace(/^(?!(?:\w+:)?\/\/)|^\/\//, options.defaultProtocol);
  }
  const urlObject = new URL(urlString);
  if (options.forceHttp && options.forceHttps) {
    throw new Error("The `forceHttp` and `forceHttps` options cannot be used together");
  }
  if (options.forceHttp && urlObject.protocol === "https:") {
    urlObject.protocol = "http:";
  }
  if (options.forceHttps && urlObject.protocol === "http:") {
    urlObject.protocol = "https:";
  }
  if (options.stripAuthentication) {
    urlObject.username = "";
    urlObject.password = "";
  }
  if (options.stripHash) {
    urlObject.hash = "";
  } else if (options.stripTextFragment) {
    urlObject.hash = urlObject.hash.replace(/#?:~:text.*?$/i, "");
  }
  if (urlObject.pathname) {
    const protocolRegex = /\b[a-z][a-z\d+\-.]{1,50}:\/\//g;
    let lastIndex = 0;
    let result = "";
    for (; ; ) {
      const match = protocolRegex.exec(urlObject.pathname);
      if (!match) {
        break;
      }
      const protocol = match[0];
      const protocolAtIndex = match.index;
      const intermediate = urlObject.pathname.slice(lastIndex, protocolAtIndex);
      result += intermediate.replace(/\/{2,}/g, "/");
      result += protocol;
      lastIndex = protocolAtIndex + protocol.length;
    }
    const remnant = urlObject.pathname.slice(lastIndex, urlObject.pathname.length);
    result += remnant.replace(/\/{2,}/g, "/");
    urlObject.pathname = result;
  }
  if (urlObject.pathname) {
    try {
      urlObject.pathname = decodeURI(urlObject.pathname);
    } catch {
    }
  }
  if (options.removeDirectoryIndex === true) {
    options.removeDirectoryIndex = [/^index\.[a-z]+$/];
  }
  if (Array.isArray(options.removeDirectoryIndex) && options.removeDirectoryIndex.length > 0) {
    let pathComponents = urlObject.pathname.split("/");
    const lastComponent = pathComponents[pathComponents.length - 1];
    if (testParameter(lastComponent, options.removeDirectoryIndex)) {
      pathComponents = pathComponents.slice(0, -1);
      urlObject.pathname = pathComponents.slice(1).join("/") + "/";
    }
  }
  if (urlObject.hostname) {
    urlObject.hostname = urlObject.hostname.replace(/\.$/, "");
    if (options.stripWWW && /^www\.(?!www\.)[a-z\-\d]{1,63}\.[a-z.\-\d]{2,63}$/.test(urlObject.hostname)) {
      urlObject.hostname = urlObject.hostname.replace(/^www\./, "");
    }
  }
  if (Array.isArray(options.removeQueryParameters)) {
    for (const key of [...urlObject.searchParams.keys()]) {
      if (testParameter(key, options.removeQueryParameters)) {
        urlObject.searchParams.delete(key);
      }
    }
  }
  if (!Array.isArray(options.keepQueryParameters) && options.removeQueryParameters === true) {
    urlObject.search = "";
  }
  if (Array.isArray(options.keepQueryParameters) && options.keepQueryParameters.length > 0) {
    for (const key of [...urlObject.searchParams.keys()]) {
      if (!testParameter(key, options.keepQueryParameters)) {
        urlObject.searchParams.delete(key);
      }
    }
  }
  if (options.sortQueryParameters) {
    urlObject.searchParams.sort();
    try {
      urlObject.search = decodeURIComponent(urlObject.search);
    } catch {
    }
  }
  if (options.removeTrailingSlash) {
    urlObject.pathname = urlObject.pathname.replace(/\/$/, "");
  }
  if (options.removeExplicitPort && urlObject.port) {
    urlObject.port = "";
  }
  const oldUrlString = urlString;
  urlString = urlObject.toString();
  if (!options.removeSingleSlash && urlObject.pathname === "/" && !oldUrlString.endsWith("/") && urlObject.hash === "") {
    urlString = urlString.replace(/\/$/, "");
  }
  if ((options.removeTrailingSlash || urlObject.pathname === "/") && urlObject.hash === "" && options.removeSingleSlash) {
    urlString = urlString.replace(/\/$/, "");
  }
  if (hasRelativeProtocol && !options.normalizeProtocol) {
    urlString = urlString.replace(/^http:\/\//, "//");
  }
  if (options.stripProtocol) {
    urlString = urlString.replace(/^(?:https?:)?\/\//, "");
  }
  return urlString;
}

// node_modules/@vinejs/vine/build/chunk-46WINKKP.js
var import_escape = __toESM(require_escape(), 1);
var import_normalizeEmail = __toESM(require_normalizeEmail(), 1);

// node_modules/@vinejs/compiler/build/index.js
var _content, _a2;
var CompilerBuffer = (_a2 = class {
  constructor() {
    __privateAdd(this, _content, "");
    /**
     * The character used to create a new line
     */
    __publicField(this, "newLine", "\n");
  }
  /**
   * Write statement ot the output
   */
  writeStatement(statement) {
    __privateSet(this, _content, `${__privateGet(this, _content)}${this.newLine}${statement}`);
  }
  /**
   * Creates a child buffer
   */
  child() {
    return new _a2();
  }
  /**
   * Returns the buffer contents as string
   */
  toString() {
    return __privateGet(this, _content);
  }
  /**
   * Flush in-memory string
   */
  flush() {
    __privateSet(this, _content, "");
  }
}, _content = new WeakMap(), _a2);
function defineFieldVariables({
  parseFnRefId,
  variableName,
  wildCardPath,
  isArrayMember,
  valueExpression,
  parentExpression,
  fieldNameExpression,
  parentValueExpression
}) {
  const inValueExpression = parseFnRefId ? `refs['${parseFnRefId}'](${valueExpression}, {
      data: root,
      meta: meta,
      parent: ${parentValueExpression}
    })` : valueExpression;
  let fieldPathOutputExpression = "";
  if (parentExpression === "root" || parentExpression === "root_item") {
    fieldPathOutputExpression = fieldNameExpression;
  } else if (fieldNameExpression !== "''") {
    fieldPathOutputExpression = `${parentExpression}.getFieldPath() + '.' + ${fieldNameExpression}`;
  }
  return `const ${variableName} = defineValue(${inValueExpression}, {
  data: root,
  meta: meta,
  name: ${fieldNameExpression},
  wildCardPath: '${wildCardPath}',
  getFieldPath() {
    return ${fieldPathOutputExpression};
  },
  mutate: defineValue,
  report: report,
  isValid: true,
  parent: ${parentValueExpression},
  isArrayMember: ${isArrayMember},
});`;
}
var _node, _parentField, _a3;
var BaseNode = (_a3 = class {
  constructor(node, compiler, parent, parentField) {
    __privateAdd(this, _node, void 0);
    __privateAdd(this, _parentField, void 0);
    __publicField(this, "field");
    __privateSet(this, _parentField, parentField);
    __privateSet(this, _node, node);
    if (__privateGet(this, _parentField)) {
      this.field = __privateGet(this, _parentField);
    } else {
      compiler.variablesCounter++;
      this.field = compiler.createFieldFor(node, parent);
    }
  }
  defineField(buffer) {
    if (!__privateGet(this, _parentField)) {
      buffer.writeStatement(
        defineFieldVariables({
          fieldNameExpression: this.field.fieldNameExpression,
          isArrayMember: this.field.isArrayMember,
          parentExpression: this.field.parentExpression,
          parentValueExpression: this.field.parentValueExpression,
          valueExpression: this.field.valueExpression,
          variableName: this.field.variableName,
          wildCardPath: this.field.wildCardPath,
          parseFnRefId: "parseFnId" in __privateGet(this, _node) ? __privateGet(this, _node).parseFnId : void 0
        })
      );
    }
  }
}, _node = new WeakMap(), _parentField = new WeakMap(), _a3);
function defineArrayGuard({ variableName, guardedCodeSnippet }) {
  return `if (ensureIsArray(${variableName})) {
${guardedCodeSnippet}
}`;
}
function defineIsValidGuard({ variableName, bail, guardedCodeSnippet }) {
  if (!bail) {
    return guardedCodeSnippet;
  }
  return `if (${variableName}.isValid) {
${guardedCodeSnippet}
}`;
}
function defineFieldNullOutput({
  allowNull,
  conditional,
  variableName,
  outputExpression,
  transformFnRefId
}) {
  if (!allowNull) {
    return "";
  }
  return `${conditional || "if"}(${variableName}.value === null) {
  ${outputExpression} = ${transformFnRefId ? `refs['${transformFnRefId}'](null, ${variableName});` : "null;"}
}`;
}
function wrapInConditional(conditions, wrappingCode) {
  const [first, second] = conditions;
  if (first && second) {
    return `if (${first} && ${second}) {
  ${wrappingCode}
}`;
  }
  if (first) {
    return `if (${first}) {
  ${wrappingCode}
}`;
  }
  if (second) {
    return `if (${second}) {
  ${wrappingCode}
}`;
  }
  return wrappingCode;
}
function emitValidationSnippet({ isAsync, implicit, ruleFnId }, variableName, bail, dropMissingCheck) {
  const rule = `refs['${ruleFnId}']`;
  const callable = `${rule}.validator(${variableName}.value, ${rule}.options, ${variableName});`;
  const bailCondition = bail ? `${variableName}.isValid` : "";
  const implicitCondition = implicit || dropMissingCheck ? "" : `${variableName}.isDefined`;
  return wrapInConditional(
    [bailCondition, implicitCondition],
    isAsync ? `await ${callable}` : `${callable}`
  );
}
function defineFieldValidations({
  bail,
  validations,
  variableName,
  dropMissingCheck
}) {
  return `${validations.map((one) => emitValidationSnippet(one, variableName, bail, dropMissingCheck)).join("\n")}`;
}
function defineArrayInitialOutput({
  variableName,
  outputExpression,
  outputValueExpression
}) {
  return `const ${variableName}_out = ${outputValueExpression};
${outputExpression} = ${variableName}_out;`;
}
function defineFieldExistenceValidations({
  allowNull,
  isOptional,
  variableName
}) {
  if (isOptional === false) {
    if (allowNull === false) {
      return `ensureExists(${variableName});`;
    } else {
      return `ensureIsDefined(${variableName});`;
    }
  }
  return "";
}
var _node2, _buffer, _compiler, _compileTupleChildren, compileTupleChildren_fn, _a4;
var TupleNodeCompiler = (_a4 = class extends BaseNode {
  constructor(node, buffer, compiler, parent, parentField) {
    super(node, compiler, parent, parentField);
    /**
     * Compiles the tuple children to a JS fragment
     */
    __privateAdd(this, _compileTupleChildren);
    __privateAdd(this, _node2, void 0);
    __privateAdd(this, _buffer, void 0);
    __privateAdd(this, _compiler, void 0);
    __privateSet(this, _node2, node);
    __privateSet(this, _buffer, buffer);
    __privateSet(this, _compiler, compiler);
  }
  compile() {
    this.defineField(__privateGet(this, _buffer));
    __privateGet(this, _buffer).writeStatement(
      defineFieldExistenceValidations({
        allowNull: __privateGet(this, _node2).allowNull,
        isOptional: __privateGet(this, _node2).isOptional,
        variableName: this.field.variableName
      })
    );
    const isArrayValidBlock = defineIsValidGuard({
      variableName: this.field.variableName,
      bail: __privateGet(this, _node2).bail,
      guardedCodeSnippet: `${defineArrayInitialOutput({
        variableName: this.field.variableName,
        outputExpression: this.field.outputExpression,
        outputValueExpression: __privateGet(this, _node2).allowUnknownProperties ? `copyProperties(${this.field.variableName}.value)` : `[]`
      })}${__privateMethod(this, _compileTupleChildren, compileTupleChildren_fn).call(this)}`
    });
    const isValueAnArrayBlock = defineArrayGuard({
      variableName: this.field.variableName,
      guardedCodeSnippet: `${defineFieldValidations({
        variableName: this.field.variableName,
        validations: __privateGet(this, _node2).validations,
        bail: __privateGet(this, _node2).bail,
        dropMissingCheck: true
      })}${__privateGet(this, _buffer).newLine}${isArrayValidBlock}`
    });
    __privateGet(this, _buffer).writeStatement(
      `${isValueAnArrayBlock}${__privateGet(this, _buffer).newLine}${defineFieldNullOutput({
        allowNull: __privateGet(this, _node2).allowNull,
        outputExpression: this.field.outputExpression,
        variableName: this.field.variableName,
        conditional: "else if"
      })}`
    );
  }
}, _node2 = new WeakMap(), _buffer = new WeakMap(), _compiler = new WeakMap(), _compileTupleChildren = new WeakSet(), compileTupleChildren_fn = function() {
  const buffer = __privateGet(this, _buffer).child();
  const parent = {
    type: "tuple",
    fieldPathExpression: this.field.fieldPathExpression,
    outputExpression: this.field.outputExpression,
    variableName: this.field.variableName,
    wildCardPath: this.field.wildCardPath
  };
  __privateGet(this, _node2).properties.forEach((child) => {
    __privateGet(this, _compiler).compileNode(child, buffer, parent);
  });
  return buffer.toString();
}, _a4);
function defineArrayLoop({
  variableName,
  loopCodeSnippet,
  startingIndex
}) {
  startingIndex = startingIndex || 0;
  return `const ${variableName}_items_size = ${variableName}.value.length;
for (let ${variableName}_i = ${startingIndex}; ${variableName}_i < ${variableName}_items_size; ${variableName}_i++) {
${loopCodeSnippet}
}`;
}
var _node3, _buffer2, _compiler2, _compileArrayElements, compileArrayElements_fn, _a5;
var ArrayNodeCompiler = (_a5 = class extends BaseNode {
  constructor(node, buffer, compiler, parent, parentField) {
    super(node, compiler, parent, parentField);
    /**
     * Compiles the array elements to a JS fragment
     */
    __privateAdd(this, _compileArrayElements);
    __privateAdd(this, _node3, void 0);
    __privateAdd(this, _buffer2, void 0);
    __privateAdd(this, _compiler2, void 0);
    __privateSet(this, _node3, node);
    __privateSet(this, _buffer2, buffer);
    __privateSet(this, _compiler2, compiler);
  }
  compile() {
    this.defineField(__privateGet(this, _buffer2));
    __privateGet(this, _buffer2).writeStatement(
      defineFieldExistenceValidations({
        allowNull: __privateGet(this, _node3).allowNull,
        isOptional: __privateGet(this, _node3).isOptional,
        variableName: this.field.variableName
      })
    );
    const isArrayValidBlock = defineIsValidGuard({
      variableName: this.field.variableName,
      bail: __privateGet(this, _node3).bail,
      guardedCodeSnippet: `${defineArrayInitialOutput({
        variableName: this.field.variableName,
        outputExpression: this.field.outputExpression,
        outputValueExpression: `[]`
      })}${__privateGet(this, _buffer2).newLine}${__privateMethod(this, _compileArrayElements, compileArrayElements_fn).call(this)}`
    });
    const isValueAnArrayBlock = defineArrayGuard({
      variableName: this.field.variableName,
      guardedCodeSnippet: `${defineFieldValidations({
        variableName: this.field.variableName,
        validations: __privateGet(this, _node3).validations,
        bail: __privateGet(this, _node3).bail,
        dropMissingCheck: true
      })}${__privateGet(this, _buffer2).newLine}${isArrayValidBlock}`
    });
    __privateGet(this, _buffer2).writeStatement(
      `${isValueAnArrayBlock}${__privateGet(this, _buffer2).newLine}${defineFieldNullOutput({
        allowNull: __privateGet(this, _node3).allowNull,
        outputExpression: this.field.outputExpression,
        variableName: this.field.variableName,
        conditional: "else if"
      })}`
    );
  }
}, _node3 = new WeakMap(), _buffer2 = new WeakMap(), _compiler2 = new WeakMap(), _compileArrayElements = new WeakSet(), compileArrayElements_fn = function() {
  const arrayElementsBuffer = __privateGet(this, _buffer2).child();
  __privateGet(this, _compiler2).compileNode(__privateGet(this, _node3).each, arrayElementsBuffer, {
    type: "array",
    fieldPathExpression: this.field.fieldPathExpression,
    outputExpression: this.field.outputExpression,
    variableName: this.field.variableName,
    wildCardPath: this.field.wildCardPath
  });
  const buffer = __privateGet(this, _buffer2).child();
  buffer.writeStatement(
    defineArrayLoop({
      variableName: this.field.variableName,
      startingIndex: 0,
      loopCodeSnippet: arrayElementsBuffer.toString()
    })
  );
  arrayElementsBuffer.flush();
  return buffer.toString();
}, _a5);
function callParseFunction({ parseFnRefId, variableName }) {
  if (parseFnRefId) {
    return `${variableName}.value = refs['${parseFnRefId}'](${variableName}.value);`;
  }
  return "";
}
function defineElseCondition({ variableName, conditionalFnRefId }) {
  return `else {
refs['${conditionalFnRefId}'](${variableName}.value, ${variableName});
}`;
}
function defineConditionalGuard({
  conditional,
  variableName,
  conditionalFnRefId,
  guardedCodeSnippet
}) {
  return `${conditional}(refs['${conditionalFnRefId}'](${variableName}.value, ${variableName})) {
${guardedCodeSnippet}
}`;
}
var _compiler3, _node4, _buffer3, _parent, _compileUnionChildren, compileUnionChildren_fn, _a6;
var UnionNodeCompiler = (_a6 = class extends BaseNode {
  constructor(node, buffer, compiler, parent, parentField) {
    super(node, compiler, parent, parentField);
    /**
     * Compiles union children by wrapping each conditon inside a conditional
     * guard block
     */
    __privateAdd(this, _compileUnionChildren);
    __privateAdd(this, _compiler3, void 0);
    __privateAdd(this, _node4, void 0);
    __privateAdd(this, _buffer3, void 0);
    __privateAdd(this, _parent, void 0);
    __privateSet(this, _node4, node);
    __privateSet(this, _buffer3, buffer);
    __privateSet(this, _parent, parent);
    __privateSet(this, _compiler3, compiler);
  }
  compile() {
    this.defineField(__privateGet(this, _buffer3));
    __privateGet(this, _buffer3).writeStatement(__privateMethod(this, _compileUnionChildren, compileUnionChildren_fn).call(this));
  }
}, _compiler3 = new WeakMap(), _node4 = new WeakMap(), _buffer3 = new WeakMap(), _parent = new WeakMap(), _compileUnionChildren = new WeakSet(), compileUnionChildren_fn = function() {
  const childrenBuffer = __privateGet(this, _buffer3).child();
  __privateGet(this, _node4).conditions.forEach((child, index) => {
    const conditionalBuffer = __privateGet(this, _buffer3).child();
    if ("parseFnId" in child.schema) {
      conditionalBuffer.writeStatement(
        callParseFunction({
          parseFnRefId: child.schema.parseFnId,
          variableName: this.field.variableName
        })
      );
    }
    __privateGet(this, _compiler3).compileNode(child.schema, conditionalBuffer, __privateGet(this, _parent), this.field);
    childrenBuffer.writeStatement(
      defineConditionalGuard({
        conditional: index === 0 ? "if" : "else if",
        variableName: this.field.variableName,
        conditionalFnRefId: child.conditionalFnRefId,
        guardedCodeSnippet: conditionalBuffer.toString()
      })
    );
    conditionalBuffer.flush();
  });
  if (__privateGet(this, _node4).elseConditionalFnRefId && __privateGet(this, _node4).conditions.length) {
    childrenBuffer.writeStatement(
      defineElseCondition({
        variableName: this.field.variableName,
        conditionalFnRefId: __privateGet(this, _node4).elseConditionalFnRefId
      })
    );
  }
  return childrenBuffer.toString();
}, _a6);
function defineRecordLoop({ variableName, loopCodeSnippet }) {
  return `const ${variableName}_keys = Object.keys(${variableName}.value);
const ${variableName}_keys_size = ${variableName}_keys.length;
for (let ${variableName}_key_i = 0; ${variableName}_key_i < ${variableName}_keys_size; ${variableName}_key_i++) {
const ${variableName}_i = ${variableName}_keys[${variableName}_key_i];
${loopCodeSnippet}
}`;
}
function defineObjectGuard({ variableName, guardedCodeSnippet }) {
  return `if (ensureIsObject(${variableName})) {
${guardedCodeSnippet}
}`;
}
function defineObjectInitialOutput({
  variableName,
  outputExpression,
  outputValueExpression
}) {
  return `const ${variableName}_out = ${outputValueExpression};
${outputExpression} = ${variableName}_out;`;
}
var _node5, _buffer4, _compiler4, _compileRecordElements, compileRecordElements_fn, _a7;
var RecordNodeCompiler = (_a7 = class extends BaseNode {
  constructor(node, buffer, compiler, parent, parentField) {
    super(node, compiler, parent, parentField);
    /**
     * Compiles the record elements to a JS fragment
     */
    __privateAdd(this, _compileRecordElements);
    __privateAdd(this, _node5, void 0);
    __privateAdd(this, _buffer4, void 0);
    __privateAdd(this, _compiler4, void 0);
    __privateSet(this, _node5, node);
    __privateSet(this, _buffer4, buffer);
    __privateSet(this, _compiler4, compiler);
  }
  compile() {
    this.defineField(__privateGet(this, _buffer4));
    __privateGet(this, _buffer4).writeStatement(
      defineFieldExistenceValidations({
        allowNull: __privateGet(this, _node5).allowNull,
        isOptional: __privateGet(this, _node5).isOptional,
        variableName: this.field.variableName
      })
    );
    const isObjectValidBlock = defineIsValidGuard({
      variableName: this.field.variableName,
      bail: __privateGet(this, _node5).bail,
      guardedCodeSnippet: `${defineObjectInitialOutput({
        variableName: this.field.variableName,
        outputExpression: this.field.outputExpression,
        outputValueExpression: `{}`
      })}${__privateMethod(this, _compileRecordElements, compileRecordElements_fn).call(this)}`
    });
    const isValueAnObjectBlock = defineObjectGuard({
      variableName: this.field.variableName,
      guardedCodeSnippet: `${defineFieldValidations({
        variableName: this.field.variableName,
        validations: __privateGet(this, _node5).validations,
        bail: __privateGet(this, _node5).bail,
        dropMissingCheck: true
      })}${__privateGet(this, _buffer4).newLine}${isObjectValidBlock}`
    });
    __privateGet(this, _buffer4).writeStatement(
      `${isValueAnObjectBlock}${__privateGet(this, _buffer4).newLine}${defineFieldNullOutput({
        allowNull: __privateGet(this, _node5).allowNull,
        outputExpression: this.field.outputExpression,
        variableName: this.field.variableName,
        conditional: "else if"
      })}`
    );
  }
}, _node5 = new WeakMap(), _buffer4 = new WeakMap(), _compiler4 = new WeakMap(), _compileRecordElements = new WeakSet(), compileRecordElements_fn = function() {
  const buffer = __privateGet(this, _buffer4).child();
  const recordElementsBuffer = __privateGet(this, _buffer4).child();
  __privateGet(this, _compiler4).compileNode(__privateGet(this, _node5).each, recordElementsBuffer, {
    type: "record",
    fieldPathExpression: this.field.fieldPathExpression,
    outputExpression: this.field.outputExpression,
    variableName: this.field.variableName,
    wildCardPath: this.field.wildCardPath
  });
  buffer.writeStatement(
    defineRecordLoop({
      variableName: this.field.variableName,
      loopCodeSnippet: recordElementsBuffer.toString()
    })
  );
  recordElementsBuffer.flush();
  return buffer.toString();
}, _a7);
function arrayToString(arr) {
  return `[${arr.map((str) => `"${str}"`).join(", ")}]`;
}
function defineMoveProperties({
  variableName,
  fieldsToIgnore,
  allowUnknownProperties
}) {
  if (!allowUnknownProperties) {
    return "";
  }
  const serializedFieldsToIgnore = arrayToString(fieldsToIgnore);
  return `moveProperties(${variableName}.value, ${variableName}_out, ${serializedFieldsToIgnore});`;
}
var _node6, _buffer5, _compiler5, _getFieldNames, getFieldNames_fn, _getGroupFieldNames, getGroupFieldNames_fn, _compileObjectChildren, compileObjectChildren_fn, _compileObjectGroups, compileObjectGroups_fn, _compileObjectGroup, compileObjectGroup_fn, _a8;
var ObjectNodeCompiler = (_a8 = class extends BaseNode {
  constructor(node, buffer, compiler, parent, parentField) {
    super(node, compiler, parent, parentField);
    /**
     * Returns known field names for the object
     */
    __privateAdd(this, _getFieldNames);
    /**
     * Returns field names of a group.
     */
    __privateAdd(this, _getGroupFieldNames);
    /**
     * Compiles object children to JS output
     */
    __privateAdd(this, _compileObjectChildren);
    /**
     * Compiles object groups with conditions to JS output.
     */
    __privateAdd(this, _compileObjectGroups);
    /**
     * Compiles an object groups recursively
     */
    __privateAdd(this, _compileObjectGroup);
    __privateAdd(this, _node6, void 0);
    __privateAdd(this, _buffer5, void 0);
    __privateAdd(this, _compiler5, void 0);
    __privateSet(this, _node6, node);
    __privateSet(this, _buffer5, buffer);
    __privateSet(this, _compiler5, compiler);
  }
  compile() {
    this.defineField(__privateGet(this, _buffer5));
    __privateGet(this, _buffer5).writeStatement(
      defineFieldExistenceValidations({
        allowNull: __privateGet(this, _node6).allowNull,
        isOptional: __privateGet(this, _node6).isOptional,
        variableName: this.field.variableName
      })
    );
    const isObjectValidBlock = defineIsValidGuard({
      variableName: this.field.variableName,
      bail: __privateGet(this, _node6).bail,
      guardedCodeSnippet: `${defineObjectInitialOutput({
        variableName: this.field.variableName,
        outputExpression: this.field.outputExpression,
        outputValueExpression: "{}"
      })}${__privateGet(this, _buffer5).newLine}${__privateMethod(this, _compileObjectChildren, compileObjectChildren_fn).call(this)}${__privateGet(this, _buffer5).newLine}${__privateMethod(this, _compileObjectGroups, compileObjectGroups_fn).call(this)}${__privateGet(this, _buffer5).newLine}${defineMoveProperties({
        variableName: this.field.variableName,
        allowUnknownProperties: __privateGet(this, _node6).allowUnknownProperties,
        fieldsToIgnore: __privateGet(this, _node6).allowUnknownProperties ? __privateMethod(this, _getFieldNames, getFieldNames_fn).call(this, __privateGet(this, _node6)) : []
      })}`
    });
    const isValueAnObject = defineObjectGuard({
      variableName: this.field.variableName,
      guardedCodeSnippet: `${defineFieldValidations({
        variableName: this.field.variableName,
        validations: __privateGet(this, _node6).validations,
        bail: __privateGet(this, _node6).bail,
        dropMissingCheck: true
      })}${isObjectValidBlock}`
    });
    __privateGet(this, _buffer5).writeStatement(
      `${isValueAnObject}${__privateGet(this, _buffer5).newLine}${defineFieldNullOutput({
        variableName: this.field.variableName,
        allowNull: __privateGet(this, _node6).allowNull,
        outputExpression: this.field.outputExpression,
        conditional: "else if"
      })}`
    );
  }
}, _node6 = new WeakMap(), _buffer5 = new WeakMap(), _compiler5 = new WeakMap(), _getFieldNames = new WeakSet(), getFieldNames_fn = function(node) {
  let fieldNames = node.properties.map((child) => child.fieldName);
  const groupsFieldNames = node.groups.flatMap((group2) => __privateMethod(this, _getGroupFieldNames, getGroupFieldNames_fn).call(this, group2));
  return fieldNames.concat(groupsFieldNames);
}, _getGroupFieldNames = new WeakSet(), getGroupFieldNames_fn = function(group2) {
  return group2.conditions.flatMap((condition) => {
    return __privateMethod(this, _getFieldNames, getFieldNames_fn).call(this, condition.schema);
  });
}, _compileObjectChildren = new WeakSet(), compileObjectChildren_fn = function() {
  const buffer = __privateGet(this, _buffer5).child();
  const parent = {
    type: "object",
    fieldPathExpression: this.field.fieldPathExpression,
    outputExpression: this.field.outputExpression,
    variableName: this.field.variableName,
    wildCardPath: this.field.wildCardPath
  };
  __privateGet(this, _node6).properties.forEach((child) => __privateGet(this, _compiler5).compileNode(child, buffer, parent));
  return buffer.toString();
}, _compileObjectGroups = new WeakSet(), compileObjectGroups_fn = function() {
  const buffer = __privateGet(this, _buffer5).child();
  const parent = {
    type: "object",
    fieldPathExpression: this.field.fieldPathExpression,
    outputExpression: this.field.outputExpression,
    variableName: this.field.variableName,
    wildCardPath: this.field.wildCardPath
  };
  __privateGet(this, _node6).groups.forEach((group2) => __privateMethod(this, _compileObjectGroup, compileObjectGroup_fn).call(this, group2, buffer, parent));
  return buffer.toString();
}, _compileObjectGroup = new WeakSet(), compileObjectGroup_fn = function(group2, buffer, parent) {
  group2.conditions.forEach((condition, index) => {
    const guardBuffer = buffer.child();
    condition.schema.properties.forEach((child) => {
      __privateGet(this, _compiler5).compileNode(child, guardBuffer, parent);
    });
    condition.schema.groups.forEach((child) => {
      __privateMethod(this, _compileObjectGroup, compileObjectGroup_fn).call(this, child, guardBuffer, parent);
    });
    buffer.writeStatement(
      defineConditionalGuard({
        variableName: this.field.variableName,
        conditional: index === 0 ? "if" : "else if",
        conditionalFnRefId: condition.conditionalFnRefId,
        guardedCodeSnippet: guardBuffer.toString()
      })
    );
  });
  if (group2.elseConditionalFnRefId && group2.conditions.length) {
    buffer.writeStatement(
      defineElseCondition({
        variableName: this.field.variableName,
        conditionalFnRefId: group2.elseConditionalFnRefId
      })
    );
  }
}, _a8);
function createRootField(parent) {
  return {
    parentExpression: parent.variableName,
    parentValueExpression: parent.variableName,
    fieldNameExpression: `''`,
    fieldPathExpression: `''`,
    wildCardPath: "",
    variableName: `${parent.variableName}_item`,
    valueExpression: "root",
    outputExpression: parent.outputExpression,
    isArrayMember: false
  };
}
function defineFieldValueOutput({
  variableName,
  outputExpression,
  transformFnRefId
}) {
  const outputValueExpression = transformFnRefId ? `refs['${transformFnRefId}'](${variableName}.value, ${variableName})` : `${variableName}.value`;
  return `if (${variableName}.isDefined && ${variableName}.isValid) {
  ${outputExpression} = ${outputValueExpression};
}`;
}
var _node7, _buffer6, _a9;
var LiteralNodeCompiler = (_a9 = class extends BaseNode {
  constructor(node, buffer, compiler, parent, parentField) {
    super(node, compiler, parent, parentField);
    __privateAdd(this, _node7, void 0);
    __privateAdd(this, _buffer6, void 0);
    __privateSet(this, _node7, node);
    __privateSet(this, _buffer6, buffer);
  }
  compile() {
    this.defineField(__privateGet(this, _buffer6));
    __privateGet(this, _buffer6).writeStatement(
      defineFieldExistenceValidations({
        allowNull: __privateGet(this, _node7).allowNull,
        isOptional: __privateGet(this, _node7).isOptional,
        variableName: this.field.variableName
      })
    );
    __privateGet(this, _buffer6).writeStatement(
      defineFieldValidations({
        variableName: this.field.variableName,
        validations: __privateGet(this, _node7).validations,
        bail: __privateGet(this, _node7).bail,
        dropMissingCheck: false
      })
    );
    __privateGet(this, _buffer6).writeStatement(
      `${defineFieldValueOutput({
        variableName: this.field.variableName,
        outputExpression: this.field.outputExpression,
        transformFnRefId: __privateGet(this, _node7).transformFnId
      })}${__privateGet(this, _buffer6).newLine}${defineFieldNullOutput({
        variableName: this.field.variableName,
        allowNull: __privateGet(this, _node7).allowNull,
        outputExpression: this.field.outputExpression,
        transformFnRefId: __privateGet(this, _node7).transformFnId,
        conditional: "else if"
      })}`
    );
  }
}, _node7 = new WeakMap(), _buffer6 = new WeakMap(), _a9);
function createArrayField(parent) {
  const wildCardPath = parent.wildCardPath !== "" ? `${parent.wildCardPath}.*` : `*`;
  return {
    parentExpression: parent.variableName,
    parentValueExpression: `${parent.variableName}.value`,
    fieldNameExpression: `${parent.variableName}_i`,
    fieldPathExpression: wildCardPath,
    wildCardPath,
    variableName: `${parent.variableName}_item`,
    valueExpression: `${parent.variableName}.value[${parent.variableName}_i]`,
    outputExpression: `${parent.variableName}_out[${parent.variableName}_i]`,
    isArrayMember: true
  };
}
function createTupleField(node, parent) {
  const wildCardPath = parent.wildCardPath !== "" ? `${parent.wildCardPath}.${node.fieldName}` : node.fieldName;
  return {
    parentExpression: parent.variableName,
    parentValueExpression: `${parent.variableName}.value`,
    fieldNameExpression: `${node.fieldName}`,
    fieldPathExpression: wildCardPath,
    wildCardPath,
    variableName: `${parent.variableName}_item_${node.fieldName}`,
    valueExpression: `${parent.variableName}.value[${node.fieldName}]`,
    outputExpression: `${parent.variableName}_out[${node.propertyName}]`,
    isArrayMember: true
  };
}
function reportErrors() {
  return `if(errorReporter.hasErrors) {
  throw errorReporter.createError();
}`;
}
function createObjectField(node, variablesCounter, parent) {
  const wildCardPath = parent.wildCardPath !== "" ? `${parent.wildCardPath}.${node.fieldName}` : node.fieldName;
  return {
    parentExpression: parent.variableName,
    parentValueExpression: `${parent.variableName}.value`,
    fieldNameExpression: `'${node.fieldName}'`,
    fieldPathExpression: wildCardPath,
    wildCardPath,
    variableName: `${node.propertyName}_${variablesCounter}`,
    valueExpression: `${parent.variableName}.value['${node.fieldName}']`,
    outputExpression: `${parent.variableName}_out['${node.propertyName}']`,
    isArrayMember: false
  };
}
function createRecordField(parent) {
  const wildCardPath = parent.wildCardPath !== "" ? `${parent.wildCardPath}.*` : `*`;
  return {
    parentExpression: parent.variableName,
    parentValueExpression: `${parent.variableName}.value`,
    fieldNameExpression: `${parent.variableName}_i`,
    fieldPathExpression: wildCardPath,
    wildCardPath,
    variableName: `${parent.variableName}_item`,
    valueExpression: `${parent.variableName}.value[${parent.variableName}_i]`,
    outputExpression: `${parent.variableName}_out[${parent.variableName}_i]`,
    isArrayMember: false
  };
}
function defineInlineFunctions(options) {
  return `function report(message, rule, field, args) {
  field.isValid = false;
  errorReporter.report(messagesProvider.getMessage(message, rule, field, args), rule, field, args);
};
function defineValue(value, field) {
  ${options.convertEmptyStringsToNull ? `if (value === '') { value = null; }` : ""}
  field.value = value;
  field.isDefined = value !== undefined && value !== null;
  return field;
};
function ensureExists(field) {
  if (field.value === undefined || field.value === null) {
    field.report(REQUIRED, 'required', field);
    return false;
  }
  return true;
};
function ensureIsDefined(field) {
  if (field.value === undefined) {
    field.report(REQUIRED, 'required', field);
    return false;
  }
  return true;
};
function ensureIsObject(field) {
  if (!field.isDefined) {
    return false;
  }
  if (typeof field.value == 'object' && !Array.isArray(field.value)) {
    return true;
  }
  field.report(NOT_AN_OBJECT, 'object', field);
  return false;
};
function ensureIsArray(field) {
  if (!field.isDefined) {
    return false;
  }
  if (Array.isArray(field.value)) {
    return true;
  }
  field.report(NOT_AN_ARRAY, 'array', field);
  return false;
};
function copyProperties(val) {
  let k, out, tmp;

  if (Array.isArray(val)) {
    out = Array((k = val.length))
    while (k--) out[k] = (tmp = val[k]) && typeof tmp == 'object' ? copyProperties(tmp) : tmp
    return out
  }

  if (Object.prototype.toString.call(val) === '[object Object]') {
    out = {} // null
    for (k in val) {
      out[k] = (tmp = val[k]) && typeof tmp == 'object' ? copyProperties(tmp) : tmp
    }
    return out
  }
  return val
};
function moveProperties(source, destination, ignoreKeys) {
  for (let key in source) {
    if (!ignoreKeys.includes(key)) {
      const value = source[key]
      destination[key] = copyProperties(value)
    }
  }
};`;
}
function defineInlineErrorMessages(messages2) {
  return `const REQUIRED = '${messages2.required}';
const NOT_AN_OBJECT = '${messages2.object}';
const NOT_AN_ARRAY = '${messages2.array}';`;
}
var AsyncFunction = Object.getPrototypeOf(async function() {
}).constructor;
var _rootNode, _options, _buffer7, _initiateJSOutput, initiateJSOutput_fn, _finishJSOutput, finishJSOutput_fn, _compileNodes, compileNodes_fn, _toAsyncFunction, toAsyncFunction_fn, _a10;
var Compiler = (_a10 = class {
  constructor(rootNode, options) {
    /**
     * Initiates the JS output
     */
    __privateAdd(this, _initiateJSOutput);
    /**
     * Finished the JS output
     */
    __privateAdd(this, _finishJSOutput);
    /**
     * Compiles all the nodes
     */
    __privateAdd(this, _compileNodes);
    /**
     * Returns compiled output as a function
     */
    __privateAdd(this, _toAsyncFunction);
    /**
     * Variables counter is used to generate unique variable
     * names with a counter suffix.
     */
    __publicField(this, "variablesCounter", 0);
    /**
     * An array of nodes to process
     */
    __privateAdd(this, _rootNode, void 0);
    /**
     * Options to configure the compiler behavior
     */
    __privateAdd(this, _options, void 0);
    /**
     * Buffer for collection the JS output string
     */
    __privateAdd(this, _buffer7, new CompilerBuffer());
    __privateSet(this, _rootNode, rootNode);
    __privateSet(this, _options, options || { convertEmptyStringsToNull: false });
  }
  /**
   * Converts a node to a field. Optionally accepts a parent node to create
   * a field for a specific parent type.
   */
  createFieldFor(node, parent) {
    switch (parent.type) {
      case "array":
        return createArrayField(parent);
      case "root":
        return createRootField(parent);
      case "object":
        return createObjectField(node, this.variablesCounter, parent);
      case "tuple":
        return createTupleField(node, parent);
      case "record":
        return createRecordField(parent);
    }
  }
  /**
   * Compiles a given compiler node
   */
  compileNode(node, buffer, parent, parentField) {
    switch (node.type) {
      case "literal":
        return new LiteralNodeCompiler(node, buffer, this, parent, parentField).compile();
      case "array":
        return new ArrayNodeCompiler(node, buffer, this, parent, parentField).compile();
      case "record":
        return new RecordNodeCompiler(node, buffer, this, parent, parentField).compile();
      case "object":
        return new ObjectNodeCompiler(node, buffer, this, parent, parentField).compile();
      case "tuple":
        return new TupleNodeCompiler(node, buffer, this, parent, parentField).compile();
      case "union":
        return new UnionNodeCompiler(node, buffer, this, parent, parentField).compile();
    }
  }
  /**
   * Compile schema nodes to an async function
   */
  compile() {
    __privateMethod(this, _initiateJSOutput, initiateJSOutput_fn).call(this);
    __privateMethod(this, _compileNodes, compileNodes_fn).call(this);
    __privateMethod(this, _finishJSOutput, finishJSOutput_fn).call(this);
    const outputFunction = __privateMethod(this, _toAsyncFunction, toAsyncFunction_fn).call(this);
    this.variablesCounter = 0;
    __privateGet(this, _buffer7).flush();
    return outputFunction;
  }
}, _rootNode = new WeakMap(), _options = new WeakMap(), _buffer7 = new WeakMap(), _initiateJSOutput = new WeakSet(), initiateJSOutput_fn = function() {
  __privateGet(this, _buffer7).writeStatement(
    defineInlineErrorMessages({
      required: "value is required",
      object: "value is not a valid object",
      array: "value is not a valid array",
      ...__privateGet(this, _options).messages
    })
  );
  __privateGet(this, _buffer7).writeStatement(defineInlineFunctions(__privateGet(this, _options)));
  __privateGet(this, _buffer7).writeStatement("let out;");
}, _finishJSOutput = new WeakSet(), finishJSOutput_fn = function() {
  __privateGet(this, _buffer7).writeStatement(reportErrors());
  __privateGet(this, _buffer7).writeStatement("return out;");
}, _compileNodes = new WeakSet(), compileNodes_fn = function() {
  this.compileNode(__privateGet(this, _rootNode).schema, __privateGet(this, _buffer7), {
    type: "root",
    variableName: "root",
    outputExpression: "out",
    fieldPathExpression: "out",
    wildCardPath: ""
  });
}, _toAsyncFunction = new WeakSet(), toAsyncFunction_fn = function() {
  return new AsyncFunction(
    "root",
    "meta",
    "refs",
    "messagesProvider",
    "errorReporter",
    __privateGet(this, _buffer7).toString()
  );
}, _a10);
function refsBuilder() {
  let counter = 0;
  const refs = {};
  return {
    toJSON() {
      return refs;
    },
    /**
     * Track a value inside refs
     */
    track(value) {
      counter++;
      const ref = `ref://${counter}`;
      refs[ref] = value;
      return ref;
    },
    /**
     * Track a validation inside refs
     */
    trackValidation(validation) {
      return this.track(validation);
    },
    /**
     * Track input value parser inside refs
     */
    trackParser(fn) {
      return this.track(fn);
    },
    /**
     * Track output value transformer inside refs
     */
    trackTransformer(fn) {
      return this.track(fn);
    },
    /**
     * Track a conditional inside refs
     */
    trackConditional(fn) {
      return this.track(fn);
    }
  };
}

// node_modules/@vinejs/vine/build/chunk-46WINKKP.js
function createRule(validator, metaData) {
  const rule = {
    validator,
    isAsync: metaData?.isAsync || validator.constructor.name === "AsyncFunction",
    implicit: metaData?.implicit ?? false
  };
  return function(...options) {
    return {
      rule,
      options: options[0]
    };
  };
}
var symbols_exports = {};
__export(symbols_exports, {
  COTYPE: () => COTYPE,
  IS_OF_TYPE: () => IS_OF_TYPE,
  ITYPE: () => ITYPE,
  OTYPE: () => OTYPE,
  PARSE: () => PARSE,
  UNIQUE_NAME: () => UNIQUE_NAME,
  VALIDATION: () => VALIDATION
});
var UNIQUE_NAME = Symbol.for("schema_name");
var IS_OF_TYPE = Symbol.for("is_of_type");
var PARSE = Symbol.for("parse");
var ITYPE = Symbol.for("opaque_input_type");
var OTYPE = Symbol.for("opaque_type");
var COTYPE = Symbol.for("camelcase_opaque_type");
var VALIDATION = Symbol.for("to_validation");
var requiredWhen = createRule(
  (_, checker, field) => {
    const shouldBeRequired = checker(field);
    if (!field.isDefined && shouldBeRequired) {
      field.report(messages.required, "required", field);
    }
  },
  {
    implicit: true
  }
);
var BaseModifiersType = class extends Macroable {
  /**
   * Mark the field under validation as optional. An optional
   * field allows both null and undefined values.
   */
  optional(validations) {
    return new OptionalModifier(this, validations);
  }
  /**
   * Mark the field under validation to be null. The null value will
   * be written to the output as well.
   *
   * If `optional` and `nullable` are used together, then both undefined
   * and null values will be allowed.
   */
  nullable() {
    return new NullableModifier(this);
  }
  /**
   * Apply transform on the final validated value. The transform method may
   * convert the value to any new datatype.
   */
  transform(transformer) {
    return new TransformModifier(transformer, this);
  }
};
var _parent2, _a11;
var NullableModifier = (_a11 = class extends BaseModifiersType {
  constructor(parent) {
    super();
    __privateAdd(this, _parent2, void 0);
    __privateSet(this, _parent2, parent);
  }
  /**
   * Creates a fresh instance of the underlying schema type
   * and wraps it inside the nullable modifier
   */
  clone() {
    return new _a11(__privateGet(this, _parent2).clone());
  }
  /**
   * Compiles to compiler node
   */
  [PARSE](propertyName, refs, options) {
    const output = __privateGet(this, _parent2)[PARSE](propertyName, refs, options);
    output.allowNull = true;
    return output;
  }
}, _parent2 = new WeakMap(), _a11);
var _parent3, _a12;
var OptionalModifier = (_a12 = class extends BaseModifiersType {
  constructor(parent, validations) {
    super();
    __privateAdd(this, _parent3, void 0);
    /**
     * Optional modifier validations list
     */
    __publicField(this, "validations");
    __privateSet(this, _parent3, parent);
    this.validations = validations || [];
  }
  /**
   * Shallow clones the validations. Since, there are no API's to mutate
   * the validation options, we can safely copy them by reference.
   */
  cloneValidations() {
    return this.validations.map((validation) => {
      return {
        options: validation.options,
        rule: validation.rule
      };
    });
  }
  /**
   * Compiles validations
   */
  compileValidations(refs) {
    return this.validations.map((validation) => {
      return {
        ruleFnId: refs.track({
          validator: validation.rule.validator,
          options: validation.options
        }),
        implicit: validation.rule.implicit,
        isAsync: validation.rule.isAsync
      };
    });
  }
  /**
   * Push a validation to the validations chain.
   */
  use(validation) {
    this.validations.push(VALIDATION in validation ? validation[VALIDATION]() : validation);
    return this;
  }
  requiredWhen(otherField, operator, expectedValue) {
    if (typeof otherField === "function") {
      return this.use(requiredWhen(otherField));
    }
    let checker;
    switch (operator) {
      case "=":
        checker = (value) => value === expectedValue;
        break;
      case "!=":
        checker = (value) => value !== expectedValue;
        break;
      case "in":
        checker = (value) => expectedValue.includes(value);
        break;
      case "notIn":
        checker = (value) => !expectedValue.includes(value);
        break;
      case ">":
        checker = (value) => value > expectedValue;
        break;
      case "<":
        checker = (value) => value < expectedValue;
        break;
      case ">=":
        checker = (value) => value >= expectedValue;
        break;
      case "<=":
        checker = (value) => value <= expectedValue;
    }
    return this.use(
      requiredWhen((field) => {
        const otherFieldValue = helpers.getNestedValue(otherField, field);
        return checker(otherFieldValue);
      })
    );
  }
  /**
   * Mark the field under validation as required when all
   * the other fields are present with value other
   * than `undefined` or `null`.
   */
  requiredIfExists(fields2) {
    const fieldsToExist = Array.isArray(fields2) ? fields2 : [fields2];
    return this.use(
      requiredWhen((field) => {
        return fieldsToExist.every(
          (otherField) => helpers.exists(helpers.getNestedValue(otherField, field))
        );
      })
    );
  }
  /**
   * Mark the field under validation as required when any
   * one of the other fields are present with non-nullable
   * value.
   */
  requiredIfAnyExists(fields2) {
    return this.use(
      requiredWhen((field) => {
        return fields2.some(
          (otherField) => helpers.exists(helpers.getNestedValue(otherField, field))
        );
      })
    );
  }
  /**
   * Mark the field under validation as required when all
   * the other fields are missing or their value is
   * `undefined` or `null`.
   */
  requiredIfMissing(fields2) {
    const fieldsToExist = Array.isArray(fields2) ? fields2 : [fields2];
    return this.use(
      requiredWhen((field) => {
        return fieldsToExist.every(
          (otherField) => helpers.isMissing(helpers.getNestedValue(otherField, field))
        );
      })
    );
  }
  /**
   * Mark the field under validation as required when any
   * one of the other fields are missing.
   */
  requiredIfAnyMissing(fields2) {
    return this.use(
      requiredWhen((field) => {
        return fields2.some(
          (otherField) => helpers.isMissing(helpers.getNestedValue(otherField, field))
        );
      })
    );
  }
  /**
   * Creates a fresh instance of the underlying schema type
   * and wraps it inside the optional modifier
   */
  clone() {
    return new _a12(__privateGet(this, _parent3).clone(), this.cloneValidations());
  }
  /**
   * Compiles to compiler node
   */
  [PARSE](propertyName, refs, options) {
    const output = __privateGet(this, _parent3)[PARSE](propertyName, refs, options);
    output.isOptional = true;
    output.validations = output.validations.concat(this.compileValidations(refs));
    return output;
  }
}, _parent3 = new WeakMap(), _a12);
var _parent4, _transform, _a13;
var TransformModifier = (_a13 = class extends BaseModifiersType {
  constructor(transform, parent) {
    super();
    __privateAdd(this, _parent4, void 0);
    __privateAdd(this, _transform, void 0);
    __privateSet(this, _transform, transform);
    __privateSet(this, _parent4, parent);
  }
  /**
   * Creates a fresh instance of the underlying schema type
   * and wraps it inside the transform modifier.
   */
  clone() {
    return new _a13(__privateGet(this, _transform), __privateGet(this, _parent4).clone());
  }
  /**
   * Compiles to compiler node
   */
  [PARSE](propertyName, refs, options) {
    const output = __privateGet(this, _parent4)[PARSE](propertyName, refs, options);
    output.transformFnId = refs.trackTransformer(__privateGet(this, _transform));
    return output;
  }
}, _parent4 = new WeakMap(), _transform = new WeakMap(), _a13);
var BaseLiteralType = class extends BaseModifiersType {
  constructor(options, validations) {
    super();
    /**
     * Field options
     */
    __publicField(this, "options");
    /**
     * Set of validations to run
     */
    __publicField(this, "validations");
    this.options = {
      bail: true,
      allowNull: false,
      isOptional: false,
      ...options
    };
    this.validations = validations || [];
  }
  /**
   * Shallow clones the validations. Since, there are no API's to mutate
   * the validation options, we can safely copy them by reference.
   */
  cloneValidations() {
    return this.validations.map((validation) => {
      return {
        options: validation.options,
        rule: validation.rule
      };
    });
  }
  /**
   * Shallow clones the options
   */
  cloneOptions() {
    return { ...this.options };
  }
  /**
   * Compiles validations
   */
  compileValidations(refs) {
    return this.validations.map((validation) => {
      return {
        ruleFnId: refs.track({
          validator: validation.rule.validator,
          options: validation.options
        }),
        implicit: validation.rule.implicit,
        isAsync: validation.rule.isAsync
      };
    });
  }
  /**
   * Define a method to parse the input value. The method
   * is invoked before any validation and hence you must
   * perform type-checking to know the value you are
   * working it.
   */
  parse(callback) {
    this.options.parse = callback;
    return this;
  }
  /**
   * Push a validation to the validations chain.
   */
  use(validation) {
    this.validations.push(VALIDATION in validation ? validation[VALIDATION]() : validation);
    return this;
  }
  /**
   * Enable/disable the bail mode. In bail mode, the field validations
   * are stopped after the first error.
   */
  bail(state) {
    this.options.bail = state;
    return this;
  }
  /**
   * Compiles the schema type to a compiler node
   */
  [PARSE](propertyName, refs, options) {
    return {
      type: "literal",
      fieldName: propertyName,
      propertyName: options.toCamelCase ? camelCase(propertyName) : propertyName,
      bail: this.options.bail,
      allowNull: this.options.allowNull,
      isOptional: this.options.isOptional,
      parseFnId: this.options.parse ? refs.trackParser(this.options.parse) : void 0,
      validations: this.compileValidations(refs)
    };
  }
};
var VineAny = class _VineAny extends BaseLiteralType {
  constructor(options, validations) {
    super(options, validations);
  }
  /**
   * Clones the VineAny schema type. The applied options
   * and validations are copied to the new instance
   */
  clone() {
    return new _VineAny(this.cloneOptions(), this.cloneValidations());
  }
};
var enumRule = createRule((value, options, field) => {
  const choices = typeof options.choices === "function" ? options.choices(field) : options.choices;
  if (!choices.includes(value)) {
    field.report(messages.enum, "enum", field, { choices });
  }
});
var _a14, _values;
var VineEnum = (_a14 = class extends BaseLiteralType {
  constructor(values, options, validations) {
    super(options, validations || [enumRule({ choices: values })]);
    __privateAdd(this, _values, void 0);
    __privateSet(this, _values, values);
  }
  /**
   * Returns the enum choices
   */
  getChoices() {
    return __privateGet(this, _values);
  }
  /**
   * Clones the VineEnum schema type. The applied options
   * and validations are copied to the new instance
   */
  clone() {
    return new _a14(__privateGet(this, _values), this.cloneOptions(), this.cloneValidations());
  }
}, _values = new WeakMap(), /**
 * Default collection of enum rules
 */
__publicField(_a14, "rules", {
  enum: enumRule
}), _a14);
var DEFAULT_DATE_FORMATS = ["YYYY-MM-DD", "YYYY-MM-DD HH:mm:ss"];
import_dayjs2.default.extend(import_customParseFormat.default);
import_dayjs2.default.extend(import_isSameOrAfter.default);
import_dayjs2.default.extend(import_isSameOrBefore.default);
var dateRule = createRule((value, options, field) => {
  if (typeof value !== "string" && typeof value !== "number") {
    field.report(messages.date, "date", field);
    return;
  }
  let isTimestampAllowed = false;
  let formats = options.formats || DEFAULT_DATE_FORMATS;
  if (Array.isArray(formats)) {
    formats = [...formats];
    isTimestampAllowed = formats.includes("x");
  } else if (typeof formats !== "string") {
    formats = { ...formats };
    isTimestampAllowed = formats.format === "x";
  }
  const valueAsNumber = isTimestampAllowed ? helpers.asNumber(value) : value;
  const dateTime = isTimestampAllowed && !Number.isNaN(valueAsNumber) ? (0, import_dayjs2.default)(valueAsNumber) : (0, import_dayjs2.default)(value, formats, true);
  if (!dateTime.isValid()) {
    field.report(messages.date, "date", field);
    return;
  }
  field.meta.$value = dateTime;
  field.meta.$formats = formats;
  field.mutate(dateTime.toDate(), field);
});
var equalsRule = createRule((_, options, field) => {
  if (!field.meta.$value) {
    return;
  }
  const compare = options.compare || "day";
  const format = options.format || DEFAULT_DATE_FORMATS;
  const dateTime = field.meta.$value;
  const expectedValue = typeof options.expectedValue === "function" ? options.expectedValue(field) : options.expectedValue;
  const expectedDateTime = (0, import_dayjs2.default)(expectedValue, format, true);
  if (!expectedDateTime.isValid()) {
    throw new Error(`Invalid datetime value "${expectedValue}" value provided to the equals rule`);
  }
  if (!dateTime.isSame(expectedDateTime, compare)) {
    field.report(messages["date.equals"], "date.equals", field, {
      expectedValue,
      compare
    });
  }
});
var afterRule = createRule((_, options, field) => {
  if (!field.meta.$value) {
    return;
  }
  const compare = options.compare || "day";
  const format = options.format || DEFAULT_DATE_FORMATS;
  const dateTime = field.meta.$value;
  const expectedValue = typeof options.expectedValue === "function" ? options.expectedValue(field) : options.expectedValue;
  const expectedDateTime = expectedValue === "today" ? (0, import_dayjs2.default)() : expectedValue === "tomorrow" ? (0, import_dayjs2.default)().add(1, "day") : (0, import_dayjs2.default)(expectedValue, format, true);
  if (!expectedDateTime.isValid()) {
    throw new Error(`Invalid datetime value "${expectedValue}" value provided to the after rule`);
  }
  if (!dateTime.isAfter(expectedDateTime, compare)) {
    field.report(messages["date.after"], "date.after", field, {
      expectedValue,
      compare
    });
  }
});
var afterOrEqualRule = createRule((_, options, field) => {
  if (!field.meta.$value) {
    return;
  }
  const compare = options.compare || "day";
  const format = options.format || DEFAULT_DATE_FORMATS;
  const dateTime = field.meta.$value;
  const expectedValue = typeof options.expectedValue === "function" ? options.expectedValue(field) : options.expectedValue;
  const expectedDateTime = expectedValue === "today" ? (0, import_dayjs2.default)() : expectedValue === "tomorrow" ? (0, import_dayjs2.default)().add(1, "day") : (0, import_dayjs2.default)(expectedValue, format, true);
  if (!expectedDateTime.isValid()) {
    throw new Error(
      `Invalid datetime value "${expectedValue}" value provided to the afterOrEqual rule`
    );
  }
  if (!dateTime.isSameOrAfter(expectedDateTime, compare)) {
    field.report(messages["date.afterOrEqual"], "date.afterOrEqual", field, {
      expectedValue,
      compare
    });
  }
});
var beforeRule = createRule((_, options, field) => {
  if (!field.meta.$value) {
    return;
  }
  const compare = options.compare || "day";
  const format = options.format || DEFAULT_DATE_FORMATS;
  const dateTime = field.meta.$value;
  const expectedValue = typeof options.expectedValue === "function" ? options.expectedValue(field) : options.expectedValue;
  const expectedDateTime = expectedValue === "today" ? (0, import_dayjs2.default)() : expectedValue === "yesterday" ? (0, import_dayjs2.default)().subtract(1, "day") : (0, import_dayjs2.default)(expectedValue, format, true);
  if (!expectedDateTime.isValid()) {
    throw new Error(`Invalid datetime value "${expectedValue}" value provided to the before rule`);
  }
  if (!dateTime.isBefore(expectedDateTime, compare)) {
    field.report(messages["date.before"], "date.before", field, {
      expectedValue,
      compare
    });
  }
});
var beforeOrEqualRule = createRule((_, options, field) => {
  if (!field.meta.$value) {
    return;
  }
  const compare = options.compare || "day";
  const format = options.format || DEFAULT_DATE_FORMATS;
  const dateTime = field.meta.$value;
  const expectedValue = typeof options.expectedValue === "function" ? options.expectedValue(field) : options.expectedValue;
  const expectedDateTime = expectedValue === "today" ? (0, import_dayjs2.default)() : expectedValue === "yesterday" ? (0, import_dayjs2.default)().subtract(1, "day") : (0, import_dayjs2.default)(expectedValue, format, true);
  if (!expectedDateTime.isValid()) {
    throw new Error(
      `Invalid datetime value "${expectedValue}" value provided to the beforeOrEqual rule`
    );
  }
  if (!dateTime.isSameOrBefore(expectedDateTime, compare)) {
    field.report(messages["date.beforeOrEqual"], "date.beforeOrEqual", field, {
      expectedValue,
      compare
    });
  }
});
var sameAsRule = createRule((_, options, field) => {
  if (!field.meta.$value) {
    return;
  }
  const compare = options.compare || "day";
  const dateTime = field.meta.$value;
  const format = options.format || field.meta.$formats;
  const expectedValue = helpers.getNestedValue(options.otherField, field);
  const expectedDateTime = (0, import_dayjs2.default)(expectedValue, format, true);
  if (!expectedDateTime.isValid()) {
    return;
  }
  if (!dateTime.isSame(expectedDateTime, compare)) {
    field.report(messages["date.sameAs"], "date.sameAs", field, {
      otherField: options.otherField,
      expectedValue,
      compare
    });
  }
});
var notSameAsRule = createRule((_, options, field) => {
  if (!field.meta.$value) {
    return;
  }
  const compare = options.compare || "day";
  const dateTime = field.meta.$value;
  const format = options.format || field.meta.$formats;
  const expectedValue = helpers.getNestedValue(options.otherField, field);
  const expectedDateTime = (0, import_dayjs2.default)(expectedValue, format, true);
  if (!expectedDateTime.isValid()) {
    return;
  }
  if (dateTime.isSame(expectedDateTime, compare)) {
    field.report(messages["date.notSameAs"], "date.notSameAs", field, {
      otherField: options.otherField,
      expectedValue,
      compare
    });
  }
});
var afterFieldRule = createRule((_, options, field) => {
  if (!field.meta.$value) {
    return;
  }
  const compare = options.compare || "day";
  const dateTime = field.meta.$value;
  const format = options.format || field.meta.$formats;
  const expectedValue = helpers.getNestedValue(options.otherField, field);
  const expectedDateTime = (0, import_dayjs2.default)(expectedValue, format, true);
  if (!expectedDateTime.isValid()) {
    return;
  }
  if (!dateTime.isAfter(expectedDateTime, compare)) {
    field.report(messages["date.afterField"], "date.afterField", field, {
      otherField: options.otherField,
      expectedValue,
      compare
    });
  }
});
var afterOrSameAsRule = createRule((_, options, field) => {
  if (!field.meta.$value) {
    return;
  }
  const compare = options.compare || "day";
  const dateTime = field.meta.$value;
  const format = options.format || field.meta.$formats;
  const expectedValue = helpers.getNestedValue(options.otherField, field);
  const expectedDateTime = (0, import_dayjs2.default)(expectedValue, format, true);
  if (!expectedDateTime.isValid()) {
    return;
  }
  if (!dateTime.isSameOrAfter(expectedDateTime, compare)) {
    field.report(messages["date.afterOrSameAs"], "date.afterOrSameAs", field, {
      otherField: options.otherField,
      expectedValue,
      compare
    });
  }
});
var beforeFieldRule = createRule((_, options, field) => {
  if (!field.meta.$value) {
    return;
  }
  const compare = options.compare || "day";
  const dateTime = field.meta.$value;
  const format = options.format || field.meta.$formats;
  const expectedValue = helpers.getNestedValue(options.otherField, field);
  const expectedDateTime = (0, import_dayjs2.default)(expectedValue, format, true);
  if (!expectedDateTime.isValid()) {
    return;
  }
  if (!dateTime.isBefore(expectedDateTime, compare)) {
    field.report(messages["date.beforeField"], "date.beforeField", field, {
      otherField: options.otherField,
      expectedValue,
      compare
    });
  }
});
var beforeOrSameAsRule = createRule((_, options, field) => {
  if (!field.meta.$value) {
    return;
  }
  const compare = options.compare || "day";
  const dateTime = field.meta.$value;
  const format = options.format || field.meta.$formats;
  const expectedValue = helpers.getNestedValue(options.otherField, field);
  const expectedDateTime = (0, import_dayjs2.default)(expectedValue, format, true);
  if (!expectedDateTime.isValid()) {
    return;
  }
  if (!dateTime.isSameOrBefore(expectedDateTime, compare)) {
    field.report(messages["date.beforeOrSameAs"], "date.beforeOrSameAs", field, {
      otherField: options.otherField,
      expectedValue,
      compare
    });
  }
});
var weekendRule = createRule((_, __, field) => {
  if (!field.meta.$value) {
    return;
  }
  const dateTime = field.meta.$value;
  const day = dateTime.day();
  if (day !== 0 && day !== 6) {
    field.report(messages["date.weekend"], "date.weekend", field);
  }
});
var weekdayRule = createRule((_, __, field) => {
  if (!field.meta.$value) {
    return;
  }
  const dateTime = field.meta.$value;
  const day = dateTime.day();
  if (day === 0 || day === 6) {
    field.report(messages["date.weekday"], "date.weekday", field);
  }
});
var _a15, _b, _c;
var VineDate = (_a15 = class extends BaseLiteralType {
  constructor(options, validations) {
    super(options, validations || [dateRule(options || {})]);
    /**
     * The property must be implemented for "unionOfTypes"
     */
    __publicField(this, _b, "vine.date");
    /**
     * Checks if the value is of date type. The method must be
     * implemented for "unionOfTypes"
     */
    __publicField(this, _c, (value) => {
      if (typeof value !== "string") {
        return false;
      }
      return (0, import_dayjs.default)(value, this.options.formats || DEFAULT_DATE_FORMATS, true).isValid();
    });
  }
  /**
   * The equals rule compares the input value to be same
   * as the expected value.
   *
   * By default, the comparions of day, month and years are performed.
   */
  equals(expectedValue, options) {
    return this.use(equalsRule({ expectedValue, ...options }));
  }
  /**
   * The after rule compares the input value to be after
   * the expected value.
   *
   * By default, the comparions of day, month and years are performed.
   */
  after(expectedValue, options) {
    return this.use(afterRule({ expectedValue, ...options }));
  }
  /**
   * The after or equal rule compares the input value to be
   * after or equal to the expected value.
   *
   * By default, the comparions of day, month and years are performed.
   */
  afterOrEqual(expectedValue, options) {
    return this.use(afterOrEqualRule({ expectedValue, ...options }));
  }
  /**
   * The before rule compares the input value to be before
   * the expected value.
   *
   * By default, the comparions of day, month and years are performed.
   */
  before(expectedValue, options) {
    return this.use(beforeRule({ expectedValue, ...options }));
  }
  /**
   * The before rule compares the input value to be before
   * the expected value.
   *
   * By default, the comparions of day, month and years are performed.
   */
  beforeOrEqual(expectedValue, options) {
    return this.use(beforeOrEqualRule({ expectedValue, ...options }));
  }
  /**
   * The sameAs rule expects the input value to be same
   * as the value of the other field.
   *
   * By default, the comparions of day, month and years are performed
   */
  sameAs(otherField, options) {
    return this.use(sameAsRule({ otherField, ...options }));
  }
  /**
   * The notSameAs rule expects the input value to be different
   * from the other field's value
   *
   * By default, the comparions of day, month and years are performed
   */
  notSameAs(otherField, options) {
    return this.use(notSameAsRule({ otherField, ...options }));
  }
  /**
   * The afterField rule expects the input value to be after
   * the other field's value.
   *
   * By default, the comparions of day, month and years are performed
   */
  afterField(otherField, options) {
    return this.use(afterFieldRule({ otherField, ...options }));
  }
  /**
   * The afterOrSameAs rule expects the input value to be after
   * or equal to the other field's value.
   *
   * By default, the comparions of day, month and years are performed
   */
  afterOrSameAs(otherField, options) {
    return this.use(afterOrSameAsRule({ otherField, ...options }));
  }
  /**
   * The beforeField rule expects the input value to be before
   * the other field's value.
   *
   * By default, the comparions of day, month and years are performed
   */
  beforeField(otherField, options) {
    return this.use(beforeFieldRule({ otherField, ...options }));
  }
  /**
   * The beforeOrSameAs rule expects the input value to be before
   * or same as the other field's value.
   *
   * By default, the comparions of day, month and years are performed
   */
  beforeOrSameAs(otherField, options) {
    return this.use(beforeOrSameAsRule({ otherField, ...options }));
  }
  /**
   * The weekend rule ensures the date falls on a weekend
   */
  weekend() {
    return this.use(weekendRule());
  }
  /**
   * The weekday rule ensures the date falls on a weekday
   */
  weekday() {
    return this.use(weekdayRule());
  }
  /**
   * Clones the VineDate schema type. The applied options
   * and validations are copied to the new instance
   */
  clone() {
    return new _a15(this.cloneOptions(), this.cloneValidations());
  }
}, _b = UNIQUE_NAME, _c = IS_OF_TYPE, /**
 * Available VineDate rules
 */
__publicField(_a15, "rules", {
  equals: equalsRule,
  after: afterRule,
  afterOrEqual: afterOrEqualRule,
  before: beforeRule,
  beforeOrEqual: beforeOrEqualRule,
  sameAs: sameAsRule,
  notSameAs: notSameAsRule,
  afterField: afterFieldRule,
  afterOrSameAs: afterOrSameAsRule,
  beforeField: beforeFieldRule,
  beforeOrSameAs: beforeOrSameAsRule,
  weekend: weekendRule,
  weekday: weekdayRule
}), _a15);
var _conditionals, _otherwiseCallback, _a16;
var VineUnion = (_a16 = class {
  constructor(conditionals) {
    __privateAdd(this, _conditionals, void 0);
    __privateAdd(this, _otherwiseCallback, (_, field) => {
      field.report(messages.union, "union", field);
    });
    __privateSet(this, _conditionals, conditionals);
  }
  /**
   * Define a fallback method to invoke when all of the union conditions
   * fail. You may use this method to report an error.
   */
  otherwise(callback) {
    __privateSet(this, _otherwiseCallback, callback);
    return this;
  }
  /**
   * Clones the VineUnion schema type.
   */
  clone() {
    const cloned = new _a16(__privateGet(this, _conditionals));
    cloned.otherwise(__privateGet(this, _otherwiseCallback));
    return cloned;
  }
  /**
   * Compiles to a union
   */
  [PARSE](propertyName, refs, options) {
    return {
      type: "union",
      fieldName: propertyName,
      propertyName: options.toCamelCase ? camelCase(propertyName) : propertyName,
      elseConditionalFnRefId: refs.trackConditional(__privateGet(this, _otherwiseCallback)),
      conditions: __privateGet(this, _conditionals).map(
        (conditional) => conditional[PARSE](propertyName, refs, options)
      )
    };
  }
}, _conditionals = new WeakMap(), _otherwiseCallback = new WeakMap(), _a16);
var _schema, _conditional, _a17;
var UnionConditional = (_a17 = class {
  constructor(conditional, schema) {
    /**
     * Properties to merge when conditonal is true
     */
    __privateAdd(this, _schema, void 0);
    /**
     * Conditional to evaluate
     */
    __privateAdd(this, _conditional, void 0);
    __privateSet(this, _schema, schema);
    __privateSet(this, _conditional, conditional);
  }
  /**
   * Compiles to a union conditional
   */
  [PARSE](propertyName, refs, options) {
    return {
      conditionalFnRefId: refs.trackConditional(__privateGet(this, _conditional)),
      schema: __privateGet(this, _schema)[PARSE](propertyName, refs, options)
    };
  }
}, _schema = new WeakMap(), _conditional = new WeakMap(), _a17);
function union(conditionals) {
  return new VineUnion(conditionals);
}
union.if = function unionIf(conditon, schema) {
  return new UnionConditional(conditon, schema);
};
union.else = function unionElse(schema) {
  return new UnionConditional(() => true, schema);
};
var BaseModifiersType2 = class extends Macroable {
  /**
   * Mark the field under validation as optional. An optional
   * field allows both null and undefined values.
   */
  optional() {
    return new OptionalModifier2(this);
  }
  /**
   * Mark the field under validation to be null. The null value will
   * be written to the output as well.
   *
   * If `optional` and `nullable` are used together, then both undefined
   * and null values will be allowed.
   */
  nullable() {
    return new NullableModifier2(this);
  }
};
var _parent5, _a18;
var NullableModifier2 = (_a18 = class extends BaseModifiersType2 {
  constructor(parent) {
    super();
    __privateAdd(this, _parent5, void 0);
    __privateSet(this, _parent5, parent);
  }
  /**
   * Creates a fresh instance of the underlying schema type
   * and wraps it inside the nullable modifier
   */
  clone() {
    return new _a18(__privateGet(this, _parent5).clone());
  }
  /**
   * Compiles to compiler node
   */
  [PARSE](propertyName, refs, options) {
    const output = __privateGet(this, _parent5)[PARSE](propertyName, refs, options);
    if (output.type !== "union") {
      output.allowNull = true;
    }
    return output;
  }
}, _parent5 = new WeakMap(), _a18);
var _parent6, _a19;
var OptionalModifier2 = (_a19 = class extends BaseModifiersType2 {
  constructor(parent) {
    super();
    __privateAdd(this, _parent6, void 0);
    __privateSet(this, _parent6, parent);
  }
  /**
   * Creates a fresh instance of the underlying schema type
   * and wraps it inside the optional modifier
   */
  clone() {
    return new _a19(__privateGet(this, _parent6).clone());
  }
  /**
   * Compiles to compiler node
   */
  [PARSE](propertyName, refs, options) {
    const output = __privateGet(this, _parent6)[PARSE](propertyName, refs, options);
    if (output.type !== "union") {
      output.isOptional = true;
    }
    return output;
  }
}, _parent6 = new WeakMap(), _a19);
var BaseType = class extends BaseModifiersType2 {
  constructor(options, validations) {
    super();
    /**
     * Field options
     */
    __publicField(this, "options");
    /**
     * Set of validations to run
     */
    __publicField(this, "validations");
    this.options = options || {
      bail: true,
      allowNull: false,
      isOptional: false
    };
    this.validations = validations || [];
  }
  /**
   * Shallow clones the validations. Since, there are no API's to mutate
   * the validation options, we can safely copy them by reference.
   */
  cloneValidations() {
    return this.validations.map((validation) => {
      return {
        options: validation.options,
        rule: validation.rule
      };
    });
  }
  /**
   * Shallow clones the options
   */
  cloneOptions() {
    return { ...this.options };
  }
  /**
   * Compiles validations
   */
  compileValidations(refs) {
    return this.validations.map((validation) => {
      return {
        ruleFnId: refs.track({
          validator: validation.rule.validator,
          options: validation.options
        }),
        implicit: validation.rule.implicit,
        isAsync: validation.rule.isAsync
      };
    });
  }
  /**
   * Define a method to parse the input value. The method
   * is invoked before any validation and hence you must
   * perform type-checking to know the value you are
   * working it.
   */
  parse(callback) {
    this.options.parse = callback;
    return this;
  }
  /**
   * Push a validation to the validations chain.
   */
  use(validation) {
    this.validations.push(VALIDATION in validation ? validation[VALIDATION]() : validation);
    return this;
  }
  /**
   * Enable/disable the bail mode. In bail mode, the field validations
   * are stopped after the first error.
   */
  bail(state) {
    this.options.bail = state;
    return this;
  }
};
var _schemas, _allowUnknownProperties, _a20, _b2, _c2;
var VineTuple = (_c2 = class extends BaseType {
  constructor(schemas, options, validations) {
    super(options, validations);
    __privateAdd(this, _schemas, void 0);
    /**
     * Whether or not to allow unknown properties
     */
    __privateAdd(this, _allowUnknownProperties, false);
    /**
     * The property must be implemented for "unionOfTypes"
     */
    __publicField(this, _a20, "vine.array");
    /**
     * Checks if the value is of array type. The method must be
     * implemented for "unionOfTypes"
     */
    __publicField(this, _b2, (value) => {
      return Array.isArray(value);
    });
    __privateSet(this, _schemas, schemas);
  }
  /**
   * Copy unknown properties to the final output.
   */
  allowUnknownProperties() {
    __privateSet(this, _allowUnknownProperties, true);
    return this;
  }
  /**
   * Clone object
   */
  clone() {
    const cloned = new _c2(
      __privateGet(this, _schemas).map((schema) => schema.clone()),
      this.cloneOptions(),
      this.cloneValidations()
    );
    if (__privateGet(this, _allowUnknownProperties)) {
      cloned.allowUnknownProperties();
    }
    return cloned;
  }
  /**
   * Compiles to array data type
   */
  [(_a20 = UNIQUE_NAME, _b2 = IS_OF_TYPE, PARSE)](propertyName, refs, options) {
    return {
      type: "tuple",
      fieldName: propertyName,
      propertyName: options.toCamelCase ? camelCase(propertyName) : propertyName,
      bail: this.options.bail,
      allowNull: this.options.allowNull,
      isOptional: this.options.isOptional,
      allowUnknownProperties: __privateGet(this, _allowUnknownProperties),
      parseFnId: this.options.parse ? refs.trackParser(this.options.parse) : void 0,
      validations: this.compileValidations(refs),
      properties: __privateGet(this, _schemas).map((schema, index) => schema[PARSE](String(index), refs, options))
    };
  }
}, _schemas = new WeakMap(), _allowUnknownProperties = new WeakMap(), _c2);
var minLengthRule = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (value.length < options.min) {
    field.report(messages["array.minLength"], "array.minLength", field, options);
  }
});
var maxLengthRule = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (value.length > options.max) {
    field.report(messages["array.maxLength"], "array.maxLength", field, options);
  }
});
var fixedLengthRule = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (value.length !== options.size) {
    field.report(messages["array.fixedLength"], "array.fixedLength", field, options);
  }
});
var notEmptyRule = createRule((value, _, field) => {
  if (!field.isValid) {
    return;
  }
  if (value.length <= 0) {
    field.report(messages.notEmpty, "notEmpty", field);
  }
});
var distinctRule = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (!helpers.isDistinct(value, options.fields)) {
    field.report(messages.distinct, "distinct", field, options);
  }
});
var compactRule = createRule((value, _, field) => {
  if (!field.isValid) {
    return;
  }
  field.mutate(
    value.filter((item) => helpers.exists(item) && item !== ""),
    field
  );
});
var _a21, _schema2, _b3, _c3;
var VineArray = (_a21 = class extends BaseType {
  constructor(schema, options, validations) {
    super(options, validations);
    __privateAdd(this, _schema2, void 0);
    /**
     * The property must be implemented for "unionOfTypes"
     */
    __publicField(this, _b3, "vine.array");
    /**
     * Checks if the value is of array type. The method must be
     * implemented for "unionOfTypes"
     */
    __publicField(this, _c3, (value) => {
      return Array.isArray(value);
    });
    __privateSet(this, _schema2, schema);
  }
  /**
   * Enforce a minimum length on an array field
   */
  minLength(expectedLength) {
    return this.use(minLengthRule({ min: expectedLength }));
  }
  /**
   * Enforce a maximum length on an array field
   */
  maxLength(expectedLength) {
    return this.use(maxLengthRule({ max: expectedLength }));
  }
  /**
   * Enforce a fixed length on an array field
   */
  fixedLength(expectedLength) {
    return this.use(fixedLengthRule({ size: expectedLength }));
  }
  /**
   * Ensure the array is not empty
   */
  notEmpty() {
    return this.use(notEmptyRule());
  }
  /**
   * Ensure array elements are distinct/unique
   */
  distinct(fields2) {
    return this.use(distinctRule({ fields: fields2 }));
  }
  /**
   * Removes empty strings, null and undefined values from the array
   */
  compact() {
    return this.use(compactRule());
  }
  /**
   * Clones the VineArray schema type. The applied options
   * and validations are copied to the new instance
   */
  clone() {
    return new _a21(__privateGet(this, _schema2).clone(), this.cloneOptions(), this.cloneValidations());
  }
  /**
   * Compiles to array data type
   */
  [(_b3 = UNIQUE_NAME, _c3 = IS_OF_TYPE, PARSE)](propertyName, refs, options) {
    return {
      type: "array",
      fieldName: propertyName,
      propertyName: options.toCamelCase ? camelCase(propertyName) : propertyName,
      bail: this.options.bail,
      allowNull: this.options.allowNull,
      isOptional: this.options.isOptional,
      each: __privateGet(this, _schema2)[PARSE]("*", refs, options),
      parseFnId: this.options.parse ? refs.trackParser(this.options.parse) : void 0,
      validations: this.compileValidations(refs)
    };
  }
}, _schema2 = new WeakMap(), /**
 * Default collection of array rules
 */
__publicField(_a21, "rules", {
  compact: compactRule,
  notEmpty: notEmptyRule,
  distinct: distinctRule,
  minLength: minLengthRule,
  maxLength: maxLengthRule,
  fixedLength: fixedLengthRule
}), _a21);
var _schema3, _a22, _b4, _c4;
var VineCamelCaseObject = (_c4 = class extends BaseModifiersType2 {
  constructor(schema) {
    super();
    __privateAdd(this, _schema3, void 0);
    /**
     * The property must be implemented for "unionOfTypes"
     */
    __publicField(this, _a22, "types.object");
    /**
     * Checks if the value is of object type. The method must be
     * implemented for "unionOfTypes"
     */
    __publicField(this, _b4, (value) => {
      return value !== null && typeof value === "object" && !Array.isArray(value);
    });
    __privateSet(this, _schema3, schema);
  }
  /**
   * Clone object
   */
  clone() {
    return new _c4(__privateGet(this, _schema3).clone());
  }
  /**
   * Compiles the schema type to a compiler node
   */
  [(_a22 = UNIQUE_NAME, _b4 = IS_OF_TYPE, PARSE)](propertyName, refs, options) {
    options.toCamelCase = true;
    return __privateGet(this, _schema3)[PARSE](propertyName, refs, options);
  }
}, _schema3 = new WeakMap(), _c4);
var _properties, _groups, _allowUnknownProperties2, _a23, _b5, _c5;
var VineObject = (_c5 = class extends BaseType {
  constructor(properties, options, validations) {
    super(options, validations);
    /**
     * Object properties
     */
    __privateAdd(this, _properties, void 0);
    /**
     * Object groups to merge based on conditionals
     */
    __privateAdd(this, _groups, []);
    /**
     * Whether or not to allow unknown properties
     */
    __privateAdd(this, _allowUnknownProperties2, false);
    /**
     * The property must be implemented for "unionOfTypes"
     */
    __publicField(this, _a23, "vine.object");
    /**
     * Checks if the value is of object type. The method must be
     * implemented for "unionOfTypes"
     */
    __publicField(this, _b5, (value) => {
      return value !== null && typeof value === "object" && !Array.isArray(value);
    });
    __privateSet(this, _properties, properties);
  }
  /**
   * Returns a clone copy of the object properties. The object groups
   * are not copied to keep the implementations simple and easy to
   * reason about.
   */
  getProperties() {
    return Object.keys(__privateGet(this, _properties)).reduce((result, key) => {
      result[key] = __privateGet(this, _properties)[key].clone();
      return result;
    }, {});
  }
  /**
   * Copy unknown properties to the final output.
   */
  allowUnknownProperties() {
    __privateSet(this, _allowUnknownProperties2, true);
    return this;
  }
  /**
   * Merge a union to the object groups. The union can be a "vine.union"
   * with objects, or a "vine.object.union" with properties.
   */
  merge(group2) {
    __privateGet(this, _groups).push(group2);
    return this;
  }
  /**
   * Clone object
   */
  clone() {
    const cloned = new _c5(
      this.getProperties(),
      this.cloneOptions(),
      this.cloneValidations()
    );
    __privateGet(this, _groups).forEach((group2) => cloned.merge(group2));
    if (__privateGet(this, _allowUnknownProperties2)) {
      cloned.allowUnknownProperties();
    }
    return cloned;
  }
  /**
   * Applies camelcase transform
   */
  toCamelCase() {
    return new VineCamelCaseObject(this);
  }
  /**
   * Compiles the schema type to a compiler node
   */
  [(_a23 = UNIQUE_NAME, _b5 = IS_OF_TYPE, PARSE)](propertyName, refs, options) {
    return {
      type: "object",
      fieldName: propertyName,
      propertyName: options.toCamelCase ? camelCase(propertyName) : propertyName,
      bail: this.options.bail,
      allowNull: this.options.allowNull,
      isOptional: this.options.isOptional,
      parseFnId: this.options.parse ? refs.trackParser(this.options.parse) : void 0,
      allowUnknownProperties: __privateGet(this, _allowUnknownProperties2),
      validations: this.compileValidations(refs),
      properties: Object.keys(__privateGet(this, _properties)).map((property) => {
        return __privateGet(this, _properties)[property][PARSE](property, refs, options);
      }),
      groups: __privateGet(this, _groups).map((group2) => {
        return group2[PARSE](refs, options);
      })
    };
  }
}, _properties = new WeakMap(), _groups = new WeakMap(), _allowUnknownProperties2 = new WeakMap(), _c5);
var minLengthRule2 = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (Object.keys(value).length < options.min) {
    field.report(messages["record.minLength"], "record.minLength", field, options);
  }
});
var maxLengthRule2 = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (Object.keys(value).length > options.max) {
    field.report(messages["record.maxLength"], "record.maxLength", field, options);
  }
});
var fixedLengthRule2 = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (Object.keys(value).length !== options.size) {
    field.report(messages["record.fixedLength"], "record.fixedLength", field, options);
  }
});
var validateKeysRule = createRule(
  (value, callback, field) => {
    if (!field.isValid) {
      return;
    }
    callback(Object.keys(value), field);
  }
);
var _a24, _schema4, _b6, _c6;
var VineRecord = (_a24 = class extends BaseType {
  constructor(schema, options, validations) {
    super(options, validations);
    __privateAdd(this, _schema4, void 0);
    /**
     * The property must be implemented for "unionOfTypes"
     */
    __publicField(this, _b6, "vine.object");
    /**
     * Checks if the value is of object type. The method must be
     * implemented for "unionOfTypes"
     */
    __publicField(this, _c6, (value) => {
      return value !== null && typeof value === "object" && !Array.isArray(value);
    });
    __privateSet(this, _schema4, schema);
  }
  /**
   * Enforce a minimum length on an object field
   */
  minLength(expectedLength) {
    return this.use(minLengthRule2({ min: expectedLength }));
  }
  /**
   * Enforce a maximum length on an object field
   */
  maxLength(expectedLength) {
    return this.use(maxLengthRule2({ max: expectedLength }));
  }
  /**
   * Enforce a fixed length on an object field
   */
  fixedLength(expectedLength) {
    return this.use(fixedLengthRule2({ size: expectedLength }));
  }
  /**
   * Register a callback to validate the object keys
   */
  validateKeys(...args) {
    return this.use(validateKeysRule(...args));
  }
  /**
   * Clones the VineRecord schema type. The applied options
   * and validations are copied to the new instance
   */
  clone() {
    return new _a24(
      __privateGet(this, _schema4).clone(),
      this.cloneOptions(),
      this.cloneValidations()
    );
  }
  /**
   * Compiles to record data type
   */
  [(_b6 = UNIQUE_NAME, _c6 = IS_OF_TYPE, PARSE)](propertyName, refs, options) {
    return {
      type: "record",
      fieldName: propertyName,
      propertyName: options.toCamelCase ? camelCase(propertyName) : propertyName,
      bail: this.options.bail,
      allowNull: this.options.allowNull,
      isOptional: this.options.isOptional,
      each: __privateGet(this, _schema4)[PARSE]("*", refs, options),
      parseFnId: this.options.parse ? refs.trackParser(this.options.parse) : void 0,
      validations: this.compileValidations(refs)
    };
  }
}, _schema4 = new WeakMap(), /**
 * Default collection of record rules
 */
__publicField(_a24, "rules", {
  maxLength: maxLengthRule2,
  minLength: minLengthRule2,
  fixedLength: fixedLengthRule2,
  validateKeys: validateKeysRule
}), _a24);
var stringRule = createRule((value, _, field) => {
  if (typeof value !== "string") {
    field.report(messages.string, "string", field);
  }
});
var emailRule = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (!helpers.isEmail(value, options)) {
    field.report(messages.email, "email", field);
  }
});
var mobileRule = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  const normalizedOptions = options && typeof options === "function" ? options(field) : options;
  const locales = normalizedOptions?.locale || "any";
  if (!helpers.isMobilePhone(value, locales, normalizedOptions)) {
    field.report(messages.mobile, "mobile", field);
  }
});
var ipAddressRule = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (!helpers.isIP(value, options?.version)) {
    field.report(messages.ipAddress, "ipAddress", field);
  }
});
var regexRule = createRule((value, expression, field) => {
  if (!field.isValid) {
    return;
  }
  if (!expression.test(value)) {
    field.report(messages.regex, "regex", field);
  }
});
var hexCodeRule = createRule((value, _, field) => {
  if (!field.isValid) {
    return;
  }
  if (!helpers.isHexColor(value)) {
    field.report(messages.hexCode, "hexCode", field);
  }
});
var urlRule = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (!helpers.isURL(value, options)) {
    field.report(messages.url, "url", field);
  }
});
var activeUrlRule = createRule(async (value, _, field) => {
  if (!field.isValid) {
    return;
  }
  if (!await helpers.isActiveURL(value)) {
    field.report(messages.activeUrl, "activeUrl", field);
  }
});
var alphaRule = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  let characterSet = "a-zA-Z";
  if (options) {
    if (options.allowSpaces) {
      characterSet += "\\s";
    }
    if (options.allowDashes) {
      characterSet += "-";
    }
    if (options.allowUnderscores) {
      characterSet += "_";
    }
  }
  const expression = new RegExp(`^[${characterSet}]+$`);
  if (!expression.test(value)) {
    field.report(messages.alpha, "alpha", field);
  }
});
var alphaNumericRule = createRule(
  (value, options, field) => {
    if (!field.isValid) {
      return;
    }
    let characterSet = "a-zA-Z0-9";
    if (options) {
      if (options.allowSpaces) {
        characterSet += "\\s";
      }
      if (options.allowDashes) {
        characterSet += "-";
      }
      if (options.allowUnderscores) {
        characterSet += "_";
      }
    }
    const expression = new RegExp(`^[${characterSet}]+$`);
    if (!expression.test(value)) {
      field.report(messages.alphaNumeric, "alphaNumeric", field);
    }
  }
);
var minLengthRule3 = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (value.length < options.min) {
    field.report(messages.minLength, "minLength", field, options);
  }
});
var maxLengthRule3 = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (value.length > options.max) {
    field.report(messages.maxLength, "maxLength", field, options);
  }
});
var fixedLengthRule3 = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (value.length !== options.size) {
    field.report(messages.fixedLength, "fixedLength", field, options);
  }
});
var endsWithRule = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (!value.endsWith(options.substring)) {
    field.report(messages.endsWith, "endsWith", field, options);
  }
});
var startsWithRule = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (!value.startsWith(options.substring)) {
    field.report(messages.startsWith, "startsWith", field, options);
  }
});
var sameAsRule2 = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  const input = helpers.getNestedValue(options.otherField, field);
  if (input !== value) {
    field.report(messages.sameAs, "sameAs", field, options);
    return;
  }
});
var notSameAsRule2 = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  const input = helpers.getNestedValue(options.otherField, field);
  if (input === value) {
    field.report(messages.notSameAs, "notSameAs", field, options);
    return;
  }
});
var confirmedRule = createRule(
  (value, options, field) => {
    if (!field.isValid) {
      return;
    }
    const otherField = options?.confirmationField || `${field.name}_confirmation`;
    const input = field.parent[otherField];
    if (input !== value) {
      field.report(messages.confirmed, "confirmed", field, { otherField });
      return;
    }
  }
);
var trimRule = createRule((value, _, field) => {
  if (!field.isValid) {
    return;
  }
  field.mutate(value.trim(), field);
});
var normalizeEmailRule = createRule(
  (value, options, field) => {
    if (!field.isValid) {
      return;
    }
    field.mutate(import_normalizeEmail.default.default(value, options), field);
  }
);
var toUpperCaseRule = createRule(
  (value, locales, field) => {
    if (!field.isValid) {
      return;
    }
    field.mutate(value.toLocaleUpperCase(locales), field);
  }
);
var toLowerCaseRule = createRule(
  (value, locales, field) => {
    if (!field.isValid) {
      return;
    }
    field.mutate(value.toLocaleLowerCase(locales), field);
  }
);
var toCamelCaseRule = createRule((value, _, field) => {
  if (!field.isValid) {
    return;
  }
  field.mutate(camelCase(value), field);
});
var escapeRule = createRule((value, _, field) => {
  if (!field.isValid) {
    return;
  }
  field.mutate(import_escape.default.default(value), field);
});
var normalizeUrlRule = createRule(
  (value, options, field) => {
    if (!field.isValid) {
      return;
    }
    field.mutate(normalizeUrl(value, options), field);
  }
);
var inRule = createRule(
  (value, options, field) => {
    if (!field.isValid) {
      return;
    }
    const choices = typeof options.choices === "function" ? options.choices(field) : options.choices;
    if (!choices.includes(value)) {
      field.report(messages.in, "in", field, options);
      return;
    }
  }
);
var notInRule = createRule(
  (value, options, field) => {
    if (!field.isValid) {
      return;
    }
    const list = typeof options.list === "function" ? options.list(field) : options.list;
    if (list.includes(value)) {
      field.report(messages.notIn, "notIn", field, options);
      return;
    }
  }
);
var creditCardRule = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  const providers = options ? typeof options === "function" ? options(field)?.provider || [] : options.provider : [];
  if (!providers.length) {
    if (!helpers.isCreditCard(value)) {
      field.report(messages.creditCard, "creditCard", field, {
        providersList: "credit"
      });
    }
  } else {
    const matchesAnyProvider = providers.find(
      (provider) => helpers.isCreditCard(value, { provider })
    );
    if (!matchesAnyProvider) {
      field.report(messages.creditCard, "creditCard", field, {
        providers,
        providersList: providers.join("/")
      });
    }
  }
});
var passportRule = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  const countryCodes = typeof options === "function" ? options(field).countryCode : options.countryCode;
  const matchesAnyCountryCode = countryCodes.find(
    (countryCode) => helpers.isPassportNumber(value, countryCode)
  );
  if (!matchesAnyCountryCode) {
    field.report(messages.passport, "passport", field, { countryCodes });
  }
});
var postalCodeRule = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  const countryCodes = options ? typeof options === "function" ? options(field)?.countryCode || [] : options.countryCode : [];
  if (!countryCodes.length) {
    if (!helpers.isPostalCode(value, "any")) {
      field.report(messages.postalCode, "postalCode", field);
    }
  } else {
    const matchesAnyCountryCode = countryCodes.find(
      (countryCode) => helpers.isPostalCode(value, countryCode)
    );
    if (!matchesAnyCountryCode) {
      field.report(messages.postalCode, "postalCode", field, { countryCodes });
    }
  }
});
var uuidRule = createRule(
  (value, options, field) => {
    if (!field.isValid) {
      return;
    }
    if (!options || !options.version) {
      if (!helpers.isUUID(value)) {
        field.report(messages.uuid, "uuid", field);
      }
    } else {
      const matchesAnyVersion = options.version.find(
        (version) => helpers.isUUID(value, version)
      );
      if (!matchesAnyVersion) {
        field.report(messages.uuid, "uuid", field, options);
      }
    }
  }
);
var asciiRule = createRule((value, _, field) => {
  if (!field.isValid) {
    return;
  }
  if (!helpers.isAscii(value)) {
    field.report(messages.ascii, "ascii", field);
  }
});
var ibanRule = createRule((value, _, field) => {
  if (!field.isValid) {
    return;
  }
  if (!helpers.isIBAN(value)) {
    field.report(messages.iban, "iban", field);
  }
});
var jwtRule = createRule((value, _, field) => {
  if (!field.isValid) {
    return;
  }
  if (!helpers.isJWT(value)) {
    field.report(messages.jwt, "jwt", field);
  }
});
var coordinatesRule = createRule((value, _, field) => {
  if (!field.isValid) {
    return;
  }
  if (!helpers.isLatLong(value)) {
    field.report(messages.coordinates, "coordinates", field);
  }
});
var _a25, _b7, _c7;
var VineString = (_a25 = class extends BaseLiteralType {
  constructor(options, validations) {
    super(options, validations || [stringRule()]);
    /**
     * The property must be implemented for "unionOfTypes"
     */
    __publicField(this, _b7, "vine.string");
    /**
     * Checks if the value is of string type. The method must be
     * implemented for "unionOfTypes"
     */
    __publicField(this, _c7, (value) => {
      return typeof value === "string";
    });
  }
  /**
   * Validates the value to be a valid URL
   */
  url(...args) {
    return this.use(urlRule(...args));
  }
  /**
   * Validates the value to be an active URL
   */
  activeUrl() {
    return this.use(activeUrlRule());
  }
  /**
   * Validates the value to be a valid email address
   */
  email(...args) {
    return this.use(emailRule(...args));
  }
  /**
   * Validates the value to be a valid mobile number
   */
  mobile(...args) {
    return this.use(mobileRule(...args));
  }
  /**
   * Validates the value to be a valid IP address.
   */
  ipAddress(version) {
    return this.use(ipAddressRule(version ? { version } : void 0));
  }
  /**
   * Validates the value to be a valid hex color code
   */
  hexCode() {
    return this.use(hexCodeRule());
  }
  /**
   * Validates the value to be an active URL
   */
  regex(expression) {
    return this.use(regexRule(expression));
  }
  /**
   * Validates the value to contain only letters
   */
  alpha(options) {
    return this.use(alphaRule(options));
  }
  /**
   * Validates the value to contain only letters and
   * numbers
   */
  alphaNumeric(options) {
    return this.use(alphaNumericRule(options));
  }
  /**
   * Enforce a minimum length on a string field
   */
  minLength(expectedLength) {
    return this.use(minLengthRule3({ min: expectedLength }));
  }
  /**
   * Enforce a maximum length on a string field
   */
  maxLength(expectedLength) {
    return this.use(maxLengthRule3({ max: expectedLength }));
  }
  /**
   * Enforce a fixed length on a string field
   */
  fixedLength(expectedLength) {
    return this.use(fixedLengthRule3({ size: expectedLength }));
  }
  /**
   * Ensure the field under validation is confirmed by
   * having another field with the same name.
   */
  confirmed(options) {
    return this.use(confirmedRule(options));
  }
  /**
   * Trims whitespaces around the string value
   */
  trim() {
    return this.use(trimRule());
  }
  /**
   * Normalizes the email address
   */
  normalizeEmail(options) {
    return this.use(normalizeEmailRule(options));
  }
  /**
   * Converts the field value to UPPERCASE.
   */
  toUpperCase() {
    return this.use(toUpperCaseRule());
  }
  /**
   * Converts the field value to lowercase.
   */
  toLowerCase() {
    return this.use(toLowerCaseRule());
  }
  /**
   * Converts the field value to camelCase.
   */
  toCamelCase() {
    return this.use(toCamelCaseRule());
  }
  /**
   * Escape string for HTML entities
   */
  escape() {
    return this.use(escapeRule());
  }
  /**
   * Normalize a URL
   */
  normalizeUrl(...args) {
    return this.use(normalizeUrlRule(...args));
  }
  /**
   * Ensure the value starts with the pre-defined substring
   */
  startsWith(substring) {
    return this.use(startsWithRule({ substring }));
  }
  /**
   * Ensure the value ends with the pre-defined substring
   */
  endsWith(substring) {
    return this.use(endsWithRule({ substring }));
  }
  /**
   * Ensure the value ends with the pre-defined substring
   */
  sameAs(otherField) {
    return this.use(sameAsRule2({ otherField }));
  }
  /**
   * Ensure the value ends with the pre-defined substring
   */
  notSameAs(otherField) {
    return this.use(notSameAsRule2({ otherField }));
  }
  /**
   * Ensure the field's value under validation is a subset of the pre-defined list.
   */
  in(choices) {
    return this.use(inRule({ choices }));
  }
  /**
   * Ensure the field's value under validation is not inside the pre-defined list.
   */
  notIn(list) {
    return this.use(notInRule({ list }));
  }
  /**
   * Validates the value to be a valid credit card number
   */
  creditCard(...args) {
    return this.use(creditCardRule(...args));
  }
  /**
   * Validates the value to be a valid passport number
   */
  passport(...args) {
    return this.use(passportRule(...args));
  }
  /**
   * Validates the value to be a valid postal code
   */
  postalCode(...args) {
    return this.use(postalCodeRule(...args));
  }
  /**
   * Validates the value to be a valid UUID
   */
  uuid(...args) {
    return this.use(uuidRule(...args));
  }
  /**
   * Validates the value contains ASCII characters only
   */
  ascii() {
    return this.use(asciiRule());
  }
  /**
   * Validates the value to be a valid IBAN number
   */
  iban() {
    return this.use(ibanRule());
  }
  /**
   * Validates the value to be a valid JWT token
   */
  jwt() {
    return this.use(jwtRule());
  }
  /**
   * Ensure the value is a string with latitude and longitude coordinates
   */
  coordinates() {
    return this.use(coordinatesRule());
  }
  /**
   * Clones the VineString schema type. The applied options
   * and validations are copied to the new instance
   */
  clone() {
    return new _a25(this.cloneOptions(), this.cloneValidations());
  }
}, _b7 = UNIQUE_NAME, _c7 = IS_OF_TYPE, __publicField(_a25, "rules", {
  in: inRule,
  jwt: jwtRule,
  url: urlRule,
  iban: ibanRule,
  uuid: uuidRule,
  trim: trimRule,
  email: emailRule,
  alpha: alphaRule,
  ascii: asciiRule,
  notIn: notInRule,
  regex: regexRule,
  escape: escapeRule,
  sameAs: sameAsRule2,
  mobile: mobileRule,
  string: stringRule,
  hexCode: hexCodeRule,
  passport: passportRule,
  endsWith: endsWithRule,
  confirmed: confirmedRule,
  activeUrl: activeUrlRule,
  minLength: minLengthRule3,
  notSameAs: notSameAsRule2,
  maxLength: maxLengthRule3,
  ipAddress: ipAddressRule,
  creditCard: creditCardRule,
  postalCode: postalCodeRule,
  startsWith: startsWithRule,
  toUpperCase: toUpperCaseRule,
  toLowerCase: toLowerCaseRule,
  toCamelCase: toCamelCaseRule,
  fixedLength: fixedLengthRule3,
  coordinates: coordinatesRule,
  normalizeUrl: normalizeUrlRule,
  alphaNumeric: alphaNumericRule,
  normalizeEmail: normalizeEmailRule
}), _a25);
var numberRule = createRule((value, options, field) => {
  const valueAsNumber = options.strict ? value : helpers.asNumber(value);
  if (typeof valueAsNumber !== "number" || Number.isNaN(valueAsNumber) || valueAsNumber === Number.POSITIVE_INFINITY || valueAsNumber === Number.NEGATIVE_INFINITY) {
    field.report(messages.number, "number", field);
    return;
  }
  field.mutate(valueAsNumber, field);
});
var minRule = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (value < options.min) {
    field.report(messages.min, "min", field, options);
  }
});
var maxRule = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (value > options.max) {
    field.report(messages.max, "max", field, options);
  }
});
var rangeRule = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (value < options.min || value > options.max) {
    field.report(messages.range, "range", field, options);
  }
});
var positiveRule = createRule((value, _, field) => {
  if (!field.isValid) {
    return;
  }
  if (value < 0) {
    field.report(messages.positive, "positive", field);
  }
});
var negativeRule = createRule((value, _, field) => {
  if (!field.isValid) {
    return;
  }
  if (value >= 0) {
    field.report(messages.negative, "negative", field);
  }
});
var decimalRule = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (!helpers.isDecimal(String(value), {
    force_decimal: options.range[0] !== 0,
    decimal_digits: options.range.join(",")
  })) {
    field.report(messages.decimal, "decimal", field, { digits: options.range.join("-") });
  }
});
var withoutDecimalsRule = createRule((value, _, field) => {
  if (!field.isValid) {
    return;
  }
  if (!Number.isInteger(value)) {
    field.report(messages.withoutDecimals, "withoutDecimals", field);
  }
});
var inRule2 = createRule((value, options, field) => {
  if (!field.isValid) {
    return;
  }
  if (!options.values.includes(value)) {
    field.report(messages["number.in"], "in", field, options);
  }
});
var _a26, _b8, _c8;
var VineNumber = (_a26 = class extends BaseLiteralType {
  constructor(options, validations) {
    super(options, validations || [numberRule(options || {})]);
    /**
     * The property must be implemented for "unionOfTypes"
     */
    __publicField(this, _b8, "vine.number");
    /**
     * Checks if the value is of number type. The method must be
     * implemented for "unionOfTypes"
     */
    __publicField(this, _c8, (value) => {
      const valueAsNumber = helpers.asNumber(value);
      return !Number.isNaN(valueAsNumber);
    });
  }
  /**
   * Enforce a minimum value for the number input
   */
  min(value) {
    return this.use(minRule({ min: value }));
  }
  /**
   * Enforce a maximum value for the number input
   */
  max(value) {
    return this.use(maxRule({ max: value }));
  }
  /**
   * Enforce value to be within the range of minimum and maximum output.
   */
  range(value) {
    return this.use(rangeRule({ min: value[0], max: value[1] }));
  }
  /**
   * Enforce the value be a positive number
   */
  positive() {
    return this.use(positiveRule());
  }
  /**
   * Enforce the value be a negative number
   */
  negative() {
    return this.use(negativeRule());
  }
  /**
   * Enforce the value to have fixed or range
   * of decimal places
   */
  decimal(range) {
    return this.use(decimalRule({ range: Array.isArray(range) ? range : [range] }));
  }
  /**
   * Enforce the value to be an integer (aka without decimals)
   */
  withoutDecimals() {
    return this.use(withoutDecimalsRule());
  }
  /**
   * Clones the VineNumber schema type. The applied options
   * and validations are copied to the new instance
   */
  clone() {
    return new _a26(this.cloneOptions(), this.cloneValidations());
  }
  /**
   * Enforce the value to be in a list of allowed values
   */
  in(values) {
    return this.use(inRule2({ values }));
  }
}, _b8 = UNIQUE_NAME, _c8 = IS_OF_TYPE, /**
 * Default collection of number rules
 */
__publicField(_a26, "rules", {
  in: inRule2,
  max: maxRule,
  min: minRule,
  range: rangeRule,
  number: numberRule,
  decimal: decimalRule,
  negative: negativeRule,
  positive: positiveRule,
  withoutDecimals: withoutDecimalsRule
}), _a26);
var booleanRule = createRule((value, options, field) => {
  const valueAsBoolean = options.strict === true ? value : helpers.asBoolean(value);
  if (typeof valueAsBoolean !== "boolean") {
    field.report(messages.boolean, "boolean", field);
    return;
  }
  field.mutate(valueAsBoolean, field);
});
var _a27, _b9, _c9;
var VineBoolean = (_a27 = class extends BaseLiteralType {
  constructor(options, validations) {
    super(options, validations || [booleanRule(options || {})]);
    /**
     * The property must be implemented for "unionOfTypes"
     */
    __publicField(this, _b9, "vine.boolean");
    /**
     * Checks if the value is of boolean type. The method must be
     * implemented for "unionOfTypes"
     */
    __publicField(this, _c9, (value) => {
      const valueAsBoolean = this.options.strict === true ? value : helpers.asBoolean(value);
      return typeof valueAsBoolean === "boolean";
    });
  }
  /**
   * Clones the VineBoolean schema type. The applied options
   * and validations are copied to the new instance
   */
  clone() {
    return new _a27(this.cloneOptions(), this.cloneValidations());
  }
}, _b9 = UNIQUE_NAME, _c9 = IS_OF_TYPE, /**
 * Default collection of boolean rules
 */
__publicField(_a27, "rules", {
  boolean: booleanRule
}), _a27);
var equalsRule2 = createRule((value, options, field) => {
  let input = value;
  if (typeof options.expectedValue === "boolean") {
    input = helpers.asBoolean(value);
  } else if (typeof options.expectedValue === "number") {
    input = helpers.asNumber(value);
  }
  if (input !== options.expectedValue) {
    field.report(messages.literal, "literal", field, options);
    return;
  }
  field.mutate(input, field);
});
var _a28, _value;
var VineLiteral = (_a28 = class extends BaseLiteralType {
  constructor(value, options, validations) {
    super(options, validations || [equalsRule2({ expectedValue: value })]);
    __privateAdd(this, _value, void 0);
    __privateSet(this, _value, value);
  }
  /**
   * Clones the VineLiteral schema type. The applied options
   * and validations are copied to the new instance
   */
  clone() {
    return new _a28(__privateGet(this, _value), this.cloneOptions(), this.cloneValidations());
  }
}, _value = new WeakMap(), /**
 * Default collection of literal rules
 */
__publicField(_a28, "rules", {
  equals: equalsRule2
}), _a28);
var ACCEPTED_VALUES = ["on", "1", "yes", "true", true, 1];
var acceptedRule = createRule((value, _, field) => {
  if (!ACCEPTED_VALUES.includes(value)) {
    field.report(messages.accepted, "accepted", field);
  }
});
var _a29;
var VineAccepted = (_a29 = class extends BaseLiteralType {
  constructor(options, validations) {
    super(options, validations || [acceptedRule()]);
  }
  /**
   * Clones the VineAccepted schema type. The applied options
   * and validations are copied to the new instance
   */
  clone() {
    return new _a29(this.cloneOptions(), this.cloneValidations());
  }
}, /**
 * Default collection of accepted rules
 */
__publicField(_a29, "rules", {
  accepted: acceptedRule
}), _a29);
var _conditionals2, _otherwiseCallback2, _a30;
var ObjectGroup = (_a30 = class {
  constructor(conditionals) {
    __privateAdd(this, _conditionals2, void 0);
    __privateAdd(this, _otherwiseCallback2, (_, field) => {
      field.report(messages.unionGroup, "unionGroup", field);
    });
    __privateSet(this, _conditionals2, conditionals);
  }
  /**
   * Clones the ObjectGroup schema type.
   */
  clone() {
    const cloned = new _a30(__privateGet(this, _conditionals2));
    cloned.otherwise(__privateGet(this, _otherwiseCallback2));
    return cloned;
  }
  /**
   * Define a fallback method to invoke when all of the group conditions
   * fail. You may use this method to report an error.
   */
  otherwise(callback) {
    __privateSet(this, _otherwiseCallback2, callback);
    return this;
  }
  /**
   * Compiles the group
   */
  [PARSE](refs, options) {
    return {
      type: "group",
      elseConditionalFnRefId: refs.trackConditional(__privateGet(this, _otherwiseCallback2)),
      conditions: __privateGet(this, _conditionals2).map((conditional) => conditional[PARSE](refs, options))
    };
  }
}, _conditionals2 = new WeakMap(), _otherwiseCallback2 = new WeakMap(), _a30);
var _properties2, _conditional2, _a31;
var GroupConditional = (_a31 = class {
  constructor(conditional, properties) {
    /**
     * Properties to merge when conditonal is true
     */
    __privateAdd(this, _properties2, void 0);
    /**
     * Conditional to evaluate
     */
    __privateAdd(this, _conditional2, void 0);
    __privateSet(this, _properties2, properties);
    __privateSet(this, _conditional2, conditional);
  }
  /**
   * Compiles to a union conditional
   */
  [PARSE](refs, options) {
    return {
      schema: {
        type: "sub_object",
        properties: Object.keys(__privateGet(this, _properties2)).map((property) => {
          return __privateGet(this, _properties2)[property][PARSE](property, refs, options);
        }),
        groups: []
        // Compiler allows nested groups, but we are not implementing it
      },
      conditionalFnRefId: refs.trackConditional(__privateGet(this, _conditional2))
    };
  }
}, _properties2 = new WeakMap(), _conditional2 = new WeakMap(), _a31);
function group(conditionals) {
  return new ObjectGroup(conditionals);
}
group.if = function groupIf(conditon, properties) {
  return new GroupConditional(conditon, properties);
};
group.else = function groupElse(properties) {
  return new GroupConditional(() => true, properties);
};
var _a32, _values2;
var VineNativeEnum = (_a32 = class extends BaseLiteralType {
  constructor(values, options, validations) {
    super(options, validations || [enumRule({ choices: Object.values(values) })]);
    __privateAdd(this, _values2, void 0);
    __privateSet(this, _values2, values);
  }
  /**
   * Clones the VineNativeEnum schema type. The applied options
   * and validations are copied to the new instance
   */
  clone() {
    return new _a32(__privateGet(this, _values2), this.cloneOptions(), this.cloneValidations());
  }
}, _values2 = new WeakMap(), /**
 * Default collection of enum rules
 */
__publicField(_a32, "rules", {
  enum: enumRule
}), _a32);
var _schemas2, _otherwiseCallback3, _a33;
var VineUnionOfTypes = (_a33 = class {
  constructor(schemas) {
    __privateAdd(this, _schemas2, void 0);
    __privateAdd(this, _otherwiseCallback3, (_, field) => {
      field.report(messages.unionOfTypes, "unionOfTypes", field);
    });
    __privateSet(this, _schemas2, schemas);
  }
  /**
   * Define a fallback method to invoke when all of the union conditions
   * fail. You may use this method to report an error.
   */
  otherwise(callback) {
    __privateSet(this, _otherwiseCallback3, callback);
    return this;
  }
  /**
   * Clones the VineUnionOfTypes schema type.
   */
  clone() {
    const cloned = new _a33(__privateGet(this, _schemas2));
    cloned.otherwise(__privateGet(this, _otherwiseCallback3));
    return cloned;
  }
  /**
   * Compiles to a union
   */
  [PARSE](propertyName, refs, options) {
    return {
      type: "union",
      fieldName: propertyName,
      propertyName: options.toCamelCase ? camelCase(propertyName) : propertyName,
      elseConditionalFnRefId: refs.trackConditional(__privateGet(this, _otherwiseCallback3)),
      conditions: __privateGet(this, _schemas2).map((schema) => {
        return {
          conditionalFnRefId: refs.trackConditional((value, field) => {
            return schema[IS_OF_TYPE](value, field);
          }),
          schema: schema[PARSE](propertyName, refs, options)
        };
      })
    };
  }
}, _schemas2 = new WeakMap(), _otherwiseCallback3 = new WeakMap(), _a33);
var SchemaBuilder = class extends Macroable {
  constructor() {
    super(...arguments);
    /**
     * Define a sub-object as a union
     */
    __publicField(this, "group", group);
    /**
     * Define a union value
     */
    __publicField(this, "union", union);
  }
  /**
   * Define a string value
   */
  string() {
    return new VineString();
  }
  /**
   * Define a boolean value
   */
  boolean(options) {
    return new VineBoolean(options);
  }
  /**
   * Validate a checkbox to be checked
   */
  accepted() {
    return new VineAccepted();
  }
  /**
   * Define a number value
   */
  number(options) {
    return new VineNumber(options);
  }
  /**
   * Define a datetime value
   */
  date(options) {
    return new VineDate(options);
  }
  /**
   * Define a schema type in which the input value
   * matches the pre-defined value
   */
  literal(value) {
    return new VineLiteral(value);
  }
  /**
   * Define an object with known properties. You may call "allowUnknownProperties"
   * to merge unknown properties.
   */
  object(properties) {
    return new VineObject(properties);
  }
  /**
   * Define an array field and validate its children elements.
   */
  array(schema) {
    return new VineArray(schema);
  }
  /**
   * Define an array field with known length and each children
   * element may have its own schema.
   */
  tuple(schemas) {
    return new VineTuple(schemas);
  }
  /**
   * Define an object field with key-value pair. The keys in
   * a record are unknown and values can be of a specific
   * schema type.
   */
  record(schema) {
    return new VineRecord(schema);
  }
  enum(values) {
    if (Array.isArray(values) || typeof values === "function") {
      return new VineEnum(values);
    }
    return new VineNativeEnum(values);
  }
  /**
   * Allow the field value to be anything
   */
  any() {
    return new VineAny();
  }
  /**
   * Define a union of unique schema types.
   */
  unionOfTypes(schemas) {
    const schemasInUse = /* @__PURE__ */ new Set();
    schemas.forEach((schema) => {
      if (!schema[IS_OF_TYPE] || !schema[UNIQUE_NAME]) {
        throw new Error(
          `Cannot use "${schema.constructor.name}". The schema type is not compatible for use with "vine.unionOfTypes"`
        );
      }
      if (schemasInUse.has(schema[UNIQUE_NAME])) {
        throw new Error(
          `Cannot use duplicate schema "${schema[UNIQUE_NAME]}". "vine.unionOfTypes" needs distinct schema types only`
        );
      }
      schemasInUse.add(schema[UNIQUE_NAME]);
    });
    schemasInUse.clear();
    return new VineUnionOfTypes(schemas);
  }
};
var COMPILER_ERROR_MESSAGES = {
  required: messages.required,
  array: messages.array,
  object: messages.object
};
var _compiled, _parse, parse_fn, _a34;
var VineValidator = (_a34 = class {
  constructor(schema, options) {
    /**
     * Parses schema to compiler nodes.
     */
    __privateAdd(this, _parse);
    /**
     * Reference to the compiled schema
     */
    __privateAdd(this, _compiled, void 0);
    /**
     * Messages provider to use on the validator
     */
    __publicField(this, "messagesProvider");
    /**
     * Error reporter to use on the validator
     */
    __publicField(this, "errorReporter");
    const { compilerNode, refs } = __privateMethod(this, _parse, parse_fn).call(this, schema);
    __privateSet(this, _compiled, { schema: compilerNode, refs });
    const metaDataValidator = options.metaDataValidator;
    const validateFn = new Compiler(compilerNode, {
      convertEmptyStringsToNull: options.convertEmptyStringsToNull,
      messages: COMPILER_ERROR_MESSAGES
    }).compile();
    this.errorReporter = options.errorReporter;
    this.messagesProvider = options.messagesProvider;
    if (metaDataValidator) {
      this.validate = (data, validateOptions) => {
        let normalizedOptions = validateOptions ?? {};
        const meta = normalizedOptions.meta ?? {};
        const errorReporter = normalizedOptions.errorReporter ?? this.errorReporter;
        const messagesProvider = normalizedOptions.messagesProvider ?? this.messagesProvider;
        metaDataValidator(meta);
        return validateFn(data, meta, refs, messagesProvider, errorReporter());
      };
    } else {
      this.validate = (data, validateOptions) => {
        let normalizedOptions = validateOptions ?? {};
        const meta = normalizedOptions.meta ?? {};
        const errorReporter = normalizedOptions.errorReporter ?? this.errorReporter;
        const messagesProvider = normalizedOptions.messagesProvider ?? this.messagesProvider;
        return validateFn(data, meta, refs, messagesProvider, errorReporter());
      };
    }
  }
  /**
   * Performs validation without throwing the validation
   * exception. Instead, the validation errors are
   * returned as the first argument.
   *
   *
   * ```ts
   * await validator.tryValidate(data)
   * await validator.tryValidate(data, { meta: {} })
   *
   * await validator.tryValidate(data, {
   *   meta: { userId: auth.user.id },
   *   errorReporter,
   *   messagesProvider
   * })
   * ```
   *
   */
  async tryValidate(data, ...[options]) {
    try {
      const result = await this.validate(data, options);
      return [null, result];
    } catch (error) {
      if (error instanceof ValidationError) {
        return [error, null];
      }
      throw error;
    }
  }
  /**
   * Returns the compiled schema and refs.
   */
  toJSON() {
    const { schema, refs } = __privateGet(this, _compiled);
    return {
      schema: structuredClone(schema),
      refs
    };
  }
}, _compiled = new WeakMap(), _parse = new WeakSet(), parse_fn = function(schema) {
  const refs = refsBuilder();
  return {
    compilerNode: {
      type: "root",
      schema: schema[PARSE]("", refs, { toCamelCase: false })
    },
    refs: refs.toJSON()
  };
}, _a34);
var Vine = class extends SchemaBuilder {
  constructor() {
    super(...arguments);
    /**
     * Messages provider to use on the validator
     */
    __publicField(this, "messagesProvider", new SimpleMessagesProvider(messages, fields));
    /**
     * Error reporter to use on the validator
     */
    __publicField(this, "errorReporter", () => new SimpleErrorReporter());
    /**
     * Control whether or not to convert empty strings to null
     */
    __publicField(this, "convertEmptyStringsToNull", false);
    /**
     * Helpers to perform type-checking or cast types keeping
     * HTML forms serialization behavior in mind.
     */
    __publicField(this, "helpers", helpers);
    /**
     * Convert a validation function to a Vine schema rule
     */
    __publicField(this, "createRule", createRule);
  }
  /**
   * Pre-compiles a schema into a validation function.
   *
   * ```ts
   * const validate = vine.compile(schema)
   * await validate({ data })
   * ```
   */
  compile(schema) {
    return new VineValidator(schema, {
      convertEmptyStringsToNull: this.convertEmptyStringsToNull,
      messagesProvider: this.messagesProvider,
      errorReporter: this.errorReporter
    });
  }
  /**
   * Define a callback to validate the metadata given to the validator
   * at runtime
   */
  withMetaData(callback) {
    return {
      compile: (schema) => {
        return new VineValidator(schema, {
          convertEmptyStringsToNull: this.convertEmptyStringsToNull,
          messagesProvider: this.messagesProvider,
          errorReporter: this.errorReporter,
          metaDataValidator: callback
        });
      }
    };
  }
  /**
   * Validate data against a schema. Optionally, you can define
   * error messages, fields, a custom messages provider,
   * or an error reporter.
   *
   * ```ts
   * await vine.validate({ schema, data })
   * await vine.validate({ schema, data, messages, fields })
   *
   * await vine.validate({ schema, data, messages, fields }, {
   *   errorReporter
   * })
   * ```
   */
  validate(options) {
    const validator = this.compile(options.schema);
    return validator.validate(options.data, options);
  }
  /**
   * Validate data against a schema without throwing the
   * "ValidationError" exception. Instead the validation
   * errors are returned within the return value.
   *
   * ```ts
   * await vine.tryValidate({ schema, data })
   * await vine.tryValidate({ schema, data, messages, fields })
   *
   * await vine.tryValidate({ schema, data, messages, fields }, {
   *   errorReporter
   * })
   * ```
   */
  tryValidate(options) {
    const validator = this.compile(options.schema);
    return validator.tryValidate(options.data, options);
  }
};
var vine = new Vine();
var vine_default = vine;

// src/EnvironmentManager.ts
var EnvironmentManager = class _EnvironmentManager {
  constructor(schemaBuilder, options) {
    __publicField(this, "schema");
    __publicField(this, "rootPath");
    __publicField(this, "envs");
    __publicField(this, "logs");
    __publicField(this, "throwErrorOnValidationFail");
    __publicField(this, "envFileHierarchy");
    this.rootPath = options?.rootPath || path.resolve(__dirname);
    this.logs = options?.logs ?? true;
    this.throwErrorOnValidationFail = options?.throwErrorOnValidationFail ?? true;
    this.envFileHierarchy = options?.envFileHierarchy || [".env"];
    this.envs = this.collectEnvs();
    this.schema = schemaBuilder(vine_default);
  }
  /**
   *
   * @returns - Returns all the environment variables
   */
  getAll() {
    if (!this.envs) {
      this.envs = this.collectEnvs();
    }
    return this.envs;
  }
  /**
   * @description - Used for schema-less environment variable retrieval
   * @param cb - A callback function that returns the schema for the environment variables
   */
  static getInstance(options) {
    const envFileHierarchy = options?.envFileHierarchy || [".env"];
    const logs = options?.logs ?? true;
    const throwErrorOnValidationFail = false;
    const rootPath = options?.rootPath || path.resolve(__dirname);
    const envManagerInstance = new _EnvironmentManager(() => vine_default.object({}), {
      logs,
      rootPath,
      throwErrorOnValidationFail,
      envFileHierarchy
    });
    envManagerInstance.envs = envManagerInstance.collectEnvs();
    return envManagerInstance;
  }
  /**
   * @description - This function is used to create the schema for the environment variables
   * @param cb - A callback function that returns the schema for the environment variables
   * @param options - An object that contains the options for the environment manager
   */
  static async createEnvSchema(schemaBuilder, options) {
    const envFileHierarchy = options?.envFileHierarchy || [".env"];
    const logs = options?.logs ?? true;
    const throwErrorOnValidationFail = options?.throwErrorOnValidationFail ?? true;
    const rootPath = options?.rootPath || path.resolve(__dirname);
    const envManagerInstance = new _EnvironmentManager(schemaBuilder, {
      logs,
      rootPath,
      throwErrorOnValidationFail,
      envFileHierarchy
    });
    envManagerInstance.envs = envManagerInstance.collectEnvs();
    envManagerInstance.schema = schemaBuilder(vine_default);
    try {
      await vine_default.validate({
        schema: envManagerInstance.schema,
        data: envManagerInstance.envs
      });
    } catch (error) {
      if (envManagerInstance.throwErrorOnValidationFail) {
        throw error;
      }
      console.error(error);
    }
    return envManagerInstance;
  }
  /**
   * @description - This function is used to get a raw value from the environment variables outside the schema
   * @param key
   * @param defaultValue
   * @returns
   */
  getRaw(key, defaultValue) {
    if (!this.envs) {
      this.envs = this.collectEnvs();
    }
    return this.envs[key] || defaultValue;
  }
  /**
   * @description - This function is used to get a value from the environment variables from the schema
   * @description - In order to retrieve an outside schema value, use the getRaw function
   * @param key
   * @param defaultValue
   * @returns
   */
  get(key, defaultValue, schema = this.schema) {
    if (!this.envs) {
      this.envs = this.collectEnvs();
    }
    const value = this.envs[key];
    if (value === void 0) {
      return defaultValue;
    }
    return schema[key].parse(value);
  }
  collectEnvs() {
    const envFileHierarchy = this.envFileHierarchy;
    if (typeof envFileHierarchy === "string") {
      const envPath = `${this.rootPath}/${envFileHierarchy}`;
      if (!fs.existsSync(envPath) && !this.throwErrorOnValidationFail) {
        log(`Environment file not found: ${envPath}`, this.logs);
        return {};
      }
      if (!fs.existsSync(envPath)) {
        throw new Error(`Environment file not found: ${envPath}`);
      }
      return this.parseEnvFile(envPath);
    }
    for (const envFile of envFileHierarchy) {
      const envPath = `${this.rootPath}/${envFile}`;
      if (!fs.existsSync(envPath)) {
        log(`Environment file not found: ${envPath}`, this.logs);
        log(`Trying next environment file...`, this.logs);
        continue;
      }
      return this.parseEnvFile(envPath);
    }
    if (this.throwErrorOnValidationFail) {
      throw new Error("Environment file not found");
    }
    log("No environment file in the hierarchy list found", this.logs);
    return {};
  }
  parseEnvFile(envPath) {
    const envFile = fs.readFileSync(envPath, "utf8");
    const envs = envFile.split("\n");
    const envsObject = {};
    const regex = /^(\S+)=\s*(?:"([^"#]*)"|([^#]*))/;
    for (const env of envs) {
      if (env.trim().startsWith("#")) {
        continue;
      }
      const match = env.match(regex);
      if (match) {
        const key = match[1];
        let value = match[2] || match[3];
        if (!match[2]) {
          value = value.trim();
        }
        if (value === "") {
          continue;
        }
        envsObject[key] = value;
      }
    }
    return envsObject;
  }
};

// src/index.ts
var getInstance = EnvironmentManager.getInstance;
var src_default = EnvironmentManager.createEnvSchema;
export {
  src_default as default,
  getInstance
};
//# sourceMappingURL=index.mjs.map