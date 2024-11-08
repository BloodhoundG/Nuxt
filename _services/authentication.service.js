import { BehaviorSubject } from "rxjs";

import { handleResponse } from "~/_helpers/handle-response";
import { requestOptions } from "~/_helpers/request-options";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

function login(username, password) {
  return fetch(
    `/users/authenticate`,
    requestOptions.post({ username, password })
  )
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem("currentUser", JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
    });
}

function logout() {
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
