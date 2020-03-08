import { EnthusiasmAction } from '../actions';
import { StoreState } from '../types/index';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../constants/index';
import { Reducer, Action } from 'redux';

export const enthusiasm : Reducer<StoreState | undefined, Action<any>> = function enthusiasm(state: StoreState | undefined, action: EnthusiasmAction): StoreState | undefined {
  if (!state){
    return undefined;
  }
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1};
    case DECREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
  }
  return state;
}