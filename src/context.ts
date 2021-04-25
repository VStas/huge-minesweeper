import React from 'react';

import { RootStore } from "./store/Root";

export const rootStore = new RootStore();
export const RootContext = React.createContext(rootStore);
