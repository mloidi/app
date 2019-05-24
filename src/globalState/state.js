import React from 'react';

import { AuthProvider } from './auth.context';
import { AlertProvider } from './alert.context';

function ProviderComposer({ context, children }) {
  return context.reduceRight(
    (kids, parent) => React.cloneElement(parent, { children: kids }),
    children
  );
}

function ContextProvider({ children }) {
  return (
    <ProviderComposer context={[<AuthProvider />, <AlertProvider />]}>
      {children}
    </ProviderComposer>
  );
}

export { ContextProvider };
