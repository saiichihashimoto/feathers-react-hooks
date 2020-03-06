[![current version](https://img.shields.io/npm/v/feathers-react-hooks.svg)](https://www.npmjs.com/package/feathers-react-hooks)
[![Build Status](https://travis-ci.org/saiichihashimoto/feathers-react-hooks.svg?branch=master)](https://travis-ci.org/saiichihashimoto/feathers-react-hooks)
[![Coverage Status](https://coveralls.io/repos/github/saiichihashimoto/feathers-react-hooks/badge.svg?branch=master)](https://coveralls.io/github/saiichihashimoto/feathers-react-hooks?branch=master)
[![Mutation testing badge](https://badge.stryker-mutator.io/github.com/saiichihashimoto/feather-react-hooks/master)](https://stryker-mutator.github.io)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


React hooks for use with [feathersjs](https://feathersjs.com).

# Install

```bash
npm install --save feathers-react-hooks
```

# Hooks

- [`useAuthentication`](#useauthentication) &mdash; tracks authentication status. _calls [`app.authenticate()`](https://docs.feathersjs.com/api/authentication/client.html#appauthenticate)_
- [`useSetting`](#useauthentication) &mdash; tracks an application setting.

## useAuthentication

Tracks authentication status. _Calls [`app.authenticate()`](https://docs.feathersjs.com/api/authentication/client.html#appauthenticate)_.

```js
import { useAuthentication } from 'feathers-react-hooks';

export default function YourReactComponent() {
  const isAuthenticated = useAuthentication(app);

  if (isAuthenticated === null) {
    return 'authenticating...';
  }

  return isAuthenticated
    ? 'authenticated!'
    : 'not authenticated';
}
```

## useSetting

Tracks an application setting.

```js
import { useSetting } from 'feathers-react-hooks';

export default function YourReactComponent() {
  const [value, setValue] = useSetting(app, 'setting_name', 'default value');

  return (
    <button type="button" onClick={() => setValue('new value')}>
      {value}
    </button>
  );
}
```
