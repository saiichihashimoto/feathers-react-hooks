import { name as pkgName } from '../package';

export const HAS_ATTEMPTED_AUTHENTICATION = `${pkgName}:authentication:hasAttemptedAuthentication`;

export const HAS_BEEN_WRAPPED = `${pkgName}:setting:hasBeenWrapped`;

export const IS_AUTHENTICATED = `${pkgName}:authentication:isAuthenticated`;

export const SETTING_CHANGED = (name) => `${pkgName}:setting:changed:${name}`;
