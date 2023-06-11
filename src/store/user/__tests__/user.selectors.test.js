import {selectCurrentUser, selectUserIsLoading } from '../user.selectors';

const mockedState = {
  user: {
    isLoading: false,
    error: null,
    currentUser: {
      displayName: "sashan",
      email: "email@email.com",
      createdAt: new Date(2023, 5),
      id: "1"
    }
  }
};

describe('user selectors', () => {
  test('selectCurrentUser', () => {
    expect(selectCurrentUser(mockedState)).toEqual(mockedState.user.currentUser);
  })

  test('selectUserIsLoading', () => {
    expect(selectUserIsLoading(mockedState)).toBe(mockedState.user.isLoading);
  })
})