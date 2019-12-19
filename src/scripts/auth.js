import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import auth0 from 'auth0-js';

export const isBrowser = typeof window !== 'undefined';

const tokens = {
  idToken: false,
  accessToken: false,
};

let user = {};

export const isAuthenticated = () => tokens.idToken !== false;

const auth = isBrowser
  ? new auth0.WebAuth({
    domain: process.env.GATSBY_AUTH0_DOMAIN,
    clientID: process.env.GATSBY_AUTH0_CLIENTID,
    redirectUri: process.env.GATSBY_AUTH0_CALLBACK,
    audience: `https://${process.env.GATSBY_AUTH0_DOMAIN}/api/v2/`,
    responseType: 'token id_token',
    scope: 'openid profile email',
  })
  : {};

export const login = () => {
  if (!isBrowser) {
    return;
  }

  auth.authorize();
};

export const logout = () => {
  tokens.accessToken = false;
  tokens.idToken = false;
  user = {};
  window.localStorage.removeItem('userName');

  auth.logout({
    returnTo: window.location.origin,
  });
};

const setSession = (cb = () => {}) => (err, authResult) => {
  if (err) {
    if (err.error === 'login_required') {
      login();
    }
  }
  if (authResult && authResult.accessToken && authResult.idToken) {
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    tokens.idToken = authResult.idToken;
    tokens.accessToken = authResult.accessToken;
    tokens.expiresAt = expiresAt;

    auth.client.userInfo(tokens.accessToken, (_err, userProfile) => {
      user = userProfile;
      window.localStorage.setItem('userName', user.name);
      navigate('');
      cb();
    });
  }
};

export const checkSession = (callback) => {
  const protectedRoutes = ['/account', '/callback'];
  const isProtectedRoute = protectedRoutes
    .map(route => window.location.pathname.includes(route))
    .some(route => route);
  if (isProtectedRoute) {
    auth.checkSession({}, setSession(callback));
  } else if (window.navigator.onLine) {
    auth.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
        tokens.idToken = authResult.idToken;
        tokens.accessToken = authResult.accessToken;
        tokens.expiresAt = expiresAt;

        auth.client.userInfo(tokens.accessToken, (_err, userProfile) => {
          user = userProfile;
          window.localStorage.setItem('userName', user.name);
        });
      }
      callback();
    });
  } else {
    callback();
  }
};

export const handleAuthentication = () => {
  auth.parseHash(setSession());
};

export const getProfile = () => user;

export const SessionCheck = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(
    () => checkSession(() => setLoading(false)),
  );
  return loading === false && <>{children}</>;
};
