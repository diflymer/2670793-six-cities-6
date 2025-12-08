import { type ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const withBrowserRouter = (component: ReactElement): ReactElement => (
  <BrowserRouter>
    {component}
  </BrowserRouter>
);

