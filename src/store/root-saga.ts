import { all, call } from 'typed-redux-saga/macro';

import { categoriesSaga } from './categories/categories.saga';
import { userSaga } from './user/user.saga';

export function* rootSaga() {
  yield* all([call(categoriesSaga), call(userSaga)]);
}

// function* testGenFunc() {
//   yield "hello, ";
//   yield "there!";
// }

// function* genWrapper() {
//   yield "Wild Obi-Wan appears";
//   yield* testGenFunc();
// }

// const gen = genWrapper();
