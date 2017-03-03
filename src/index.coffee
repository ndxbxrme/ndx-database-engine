'use strict'

ObjectID = require 'bson-objectid'
settings = require './settings'
underscored = require('underscore.string').underscored
humanize = require('underscore.string').humanize
camelize = require('underscore.string').camelize
version = require('../package.json').version
callbacks =
  ready: []
  insert: []
  update: []
  select: []
  delete: []
  restore: []
safeCallback = (name, obj) ->
  for cb in callbacks[name]
    cb obj
    
module.exports =
  config: (config) ->
    #configure the database here
    for key of config
      keyU = underscored(humanize(key)).toUpperCase()
      keyC = camelize(humanize(key)).replace(/^./, key[0].toLowerCase())
      settings[keyU] = config[keyC] or config[keyU] or settings[keyU]
    @
  start: ->
    #connect to/start the database
    @
  on: (name, callback) ->
    #register a callback
    callbacks[name].push callback
    @
  off: (name, callback) ->
    #unregister a callback
    callbacks[name].splice callbacks[name].indexOf(callback), 1
    @
  serverExec: (type, args) ->
    #used by ndx-sync
  exec: (sql, props, notCritical) ->
    #execute arbitrary sql
  select: (table, whereObj) ->
    #return an array of selected objects
  update: (table, obj, whereObj) ->
    #update an object
  insert: (table, obj) ->
    #insert an object
  upsert: (table, obj, whereObj) ->
    #update or insert an object
  maintenanceOn: ->
    maintenanceMode = true
  maintenanceOff: ->
    maintenanceMode = false
  version: ->
    version
  maintenance: ->
    maintenanceMode
  getDb: ->
    #returns a copy of the database, used by ndx-database-backup
  restoreFromBackup: (data) ->
    #restore the database from a backup
  consolidate: ->
    #cleans up the data directory - ndxdb specific
  uploadDatabase: (cb) ->
    #save the database immediately into storage
  cacheSize: ->
    #used by ndx-profiler
  resetSqlCache: ->
    #clears the sql cache - ndxdb specific