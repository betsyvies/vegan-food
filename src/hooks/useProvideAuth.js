const fakeAuth = {
  signin(cb) {
    setTimeout(cb, 100);
  },
  signout(cb) {
    setTimeout(cb, 100);
  },
};

export default () => {
  const signin = (cb) => fakeAuth.signin(() => {
    cb();
  });

  const signout = (cb) => fakeAuth.signout(() => {
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    cb();
  });

  return {
    signin,
    signout,
  };
};
