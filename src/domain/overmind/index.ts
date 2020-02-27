/* eslint-disable */
import {
  IConfig,
  IOnInitialize,
  IAction,
  IOperator,
  IDerive,
  IState
} from 'overmind';
import { createHook } from 'overmind-react';

import * as actions from './actions';
import { state } from './state';

export const config = {
  state,
  actions
};

export interface Config extends IConfig<typeof config> {}

export interface OnInitialize extends IOnInitialize<Config> {}

export interface Action<Input = void, Output = void>
  extends IAction<Config, Input, Output> {}

export interface AsyncAction<Input = void, Output = void>
  extends IAction<Config, Input, Promise<Output>> {}

export interface Operator<Input = void, Output = Input>
  extends IOperator<Config, Input, Output> {}

export interface Derive<Parent extends IState, Output>
  extends IDerive<Config, Parent, Output> {}

export const useOvermind = createHook<Config>();
