import { render, screen } from '@testing-library/react'
import NotFound from './NotFound';
import { withBrowserRouter } from '../../hocs/withBrowserRouter';

describe('Component: Not Found', () => {

    it('should render correctly', () => {
        const expectedText = /404 Not Found/i;
        const preparedComponent = withBrowserRouter(<NotFound />)

        render(preparedComponent);

        expect(screen.getByText(expectedText)).toBeInTheDocument();
    })

})