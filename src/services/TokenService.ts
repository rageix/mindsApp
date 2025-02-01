const NAME = 'token';

class TokenService {
  save = (jwt: string, remember = true) => {
    this.remove();

    if (remember) {
      localStorage.setItem(NAME, jwt);
      return;
    }

    sessionStorage.setItem(NAME, jwt);
  };

  get = (): string => {
    return sessionStorage.getItem(NAME) || localStorage.getItem(NAME) || '';
  };

  remove = () => {
    sessionStorage.removeItem(NAME);
    localStorage.removeItem(NAME);
  };
}

const tokenService = new TokenService();
export default tokenService;
