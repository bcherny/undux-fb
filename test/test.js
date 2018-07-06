// @flow strict-local

import type {Plugin, Store, StoreDefinition, StoreSnapshot} from '../dist'

const {connect, connectAs, createStore, withLogger} = require('../dist/index')

type State = {
  a: number,
  b: string
}

let initialState: State = {
  a: 1,
  b: 'x'
}

let store = createStore(initialState)

store.get('a').toPrecision(1)
store.get('b').toUpperCase()
store.set('b')('y')

let withStore = connect(store)
let withStores = connectAs({ a: store })

let withEffects: Plugin<State> = store => {
  store.on('a').subscribe(a => {
    a.toPrecision(4)
  })
  return store
}

let storeB: Store<State> = store
let storeC: StoreDefinition<State> = store
