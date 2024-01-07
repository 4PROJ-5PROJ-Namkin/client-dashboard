export const isUserLoggedIn = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
  };
  