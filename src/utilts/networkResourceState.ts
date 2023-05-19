import {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {AsyncThunk} from '@reduxjs/toolkit/src/createAsyncThunk';
import {AppDispatch, RootState} from '../store/store';

export enum NetworkResourceState {
  Idle = 'idle',
  Loading = 'loading',
  Error = 'error',
}

type StateWithResourceState<Key extends string | number | symbol> = {
  [index in Key]: NetworkResourceState;
};

export function addResourceStateCases<
  ThunkReturn,
  ThunkArg,
  Key extends keyof State,
  State extends StateWithResourceState<Key>,
>(
  builder: ActionReducerMapBuilder<State>,
  fieldKey: Key,
  asyncThunk: AsyncThunk<
    ThunkReturn,
    ThunkArg,
    {dispatch: AppDispatch; state: RootState}
  >,
) {
  const match = (type: string) => (action: any) => action.type === type;

  builder.addMatcher(match(asyncThunk.fulfilled.type), (state: any) => {
    state[fieldKey] = NetworkResourceState.Idle;
  });
  builder.addMatcher(match(asyncThunk.pending.type), (state: any) => {
    state[fieldKey] = NetworkResourceState.Loading;
  });
  builder.addMatcher(match(asyncThunk.rejected.type), (state: any) => {
    state[fieldKey] = NetworkResourceState.Error;
  });
}
