import * as React from 'react';
import {CommonActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function replace(name, params) {
  navigationRef.current?.replace(name, params);
}
export function reset(name, routes = [], index = 0, params = {}) {
  navigationRef.current.reset({
    index: index,
    routes: [...routes, {name: name, params: params}],
  });
}
export function resetWithParams(name, params) {
  navigationRef.current.resetRoot({
    index: 1,
    routes: [
      {
        name: name,
        params: params,
      },
    ],
  });
}
export function dispatch(name, params) {
  navigationRef.current.dispatch(
    CommonActions.navigate({
      name: name,
      params: params,
    }),
  );
}

export function goBack() {
  navigationRef.current.goBack();
}

export function setParams(obj) {
  navigationRef.current.setParams(obj);
}
