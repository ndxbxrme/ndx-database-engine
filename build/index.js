(function() {
  'use strict';
  var ObjectID, callbacks, camelize, humanize, safeCallback, settings, underscored, version;

  ObjectID = require('bson-objectid');

  settings = require('./settings');

  underscored = require('underscore.string').underscored;

  humanize = require('underscore.string').humanize;

  camelize = require('underscore.string').camelize;

  version = require('../package.json').version;

  callbacks = {
    ready: [],
    insert: [],
    update: [],
    select: [],
    "delete": [],
    restore: []
  };

  safeCallback = function(name, obj) {
    var cb, i, len, ref, results;
    ref = callbacks[name];
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      cb = ref[i];
      results.push(cb(obj));
    }
    return results;
  };

  module.exports = {
    config: function(config) {
      var key, keyC, keyU;
      for (key in config) {
        keyU = underscored(humanize(key)).toUpperCase();
        keyC = camelize(humanize(key)).replace(/^./, key[0].toLowerCase());
        settings[keyU] = config[keyC] || config[keyU] || settings[keyU];
      }
      return this;
    },
    start: function() {
      return this;
    },
    on: function(name, callback) {
      callbacks[name].push(callback);
      return this;
    },
    off: function(name, callback) {
      callbacks[name].splice(callbacks[name].indexOf(callback), 1);
      return this;
    },
    serverExec: function(type, args) {},
    exec: function(sql, props, notCritical) {},
    select: function(table, whereObj) {},
    update: function(table, obj, whereObj) {},
    insert: function(table, obj) {},
    upsert: function(table, obj, whereObj) {},
    maintenanceOn: function() {
      var maintenanceMode;
      return maintenanceMode = true;
    },
    maintenanceOff: function() {
      var maintenanceMode;
      return maintenanceMode = false;
    },
    version: function() {
      return version;
    },
    maintenance: function() {
      return maintenanceMode;
    },
    getDb: function() {},
    restoreFromBackup: function(data) {},
    consolidate: function() {},
    uploadDatabase: function(cb) {},
    cacheSize: function() {},
    resetSqlCache: function() {}
  };

}).call(this);

//# sourceMappingURL=index.js.map
