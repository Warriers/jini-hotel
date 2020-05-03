import React from 'react';
import { IdentityContextProvider } from 'react-netlify-identity';
export const wrapRootElement = ({ element }, { url }) =>
    React.createElement(
        IdentityContextProvider,
        {
            url: url,
        },
        element,
    );