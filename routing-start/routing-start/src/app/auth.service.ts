export class AuthService {
  loggedIn = false;

  isAuthenticated(): Promise<boolean> {
    const promise = new Promise((resolve: (value: boolean) => void) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });

    return promise;
  }

  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }
}
