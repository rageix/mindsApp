const NAME = 'token';

class TokenService {
  save = (jwt: string, remember = true) => {
    this.remove();
    console.log('save token', jwt, 'remember', remember);

    if (remember) {
      console.log('save token to localStorage');
      localStorage.setItem(NAME, jwt);
      return;
    }

    console.log('save token to sessionStorage');
    sessionStorage.setItem(NAME, jwt);
  };

  get = (): string => {
    console.log('getSession', sessionStorage.getItem(NAME));
    console.log('getLocal', localStorage.getItem(NAME));
    return sessionStorage.getItem(NAME) || localStorage.getItem(NAME) || '';
  };

  remove = () => {
    console.log('remove items!');
    sessionStorage.removeItem(NAME);
    localStorage.removeItem(NAME);
  };
}

const tokenService = new TokenService();
export default tokenService;
