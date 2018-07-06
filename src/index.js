// @flow strict-local

/**
 * Facebook-specific wrapper around Undux. Enables the following features
 * automatically in Sandbox mode:
 *
 * - Runtime cycle detection in Effects
 * - Redux Devtools integration
 */

declare var __DEV__: boolean

export type {
  Plugin,
  Store,
  StoreDefinition,
  StoreSnapshot
} from 'undux'

import type {StoreDefinition} from 'undux'

import {
  connect,
  connectAs,
  createStore as _createStore,
  withLogger,
  withReduxDevtools,
} from 'undux'

type Exactly<T> = T

module.exports.createStore = function createStore<State: Object>(
  initialState: State,
): StoreDefinition<Exactly<State>> {
  if (__DEV__) {
    return withReduxDevtools(_createStore(initialState, {isDevMode: true}))
  }
  return _createStore(initialState)
}

module.exports.connect = connect
module.exports.connectAs = connectAs
module.exports.withLogger = withLogger
