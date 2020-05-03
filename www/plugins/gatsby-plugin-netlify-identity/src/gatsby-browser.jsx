import React from 'react';
import { IdentityContextProvider } from 'react-netlify-identity';
export const wrapRootElement = ({ element }, { url }) =>
    <IdentityContextProvider url={url}>{element}</IdentityContextProvider>