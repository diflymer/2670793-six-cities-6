import { render, screen } from '@testing-library/react';
import FavoritesCard from './FavoritesCard';
import { withBrowserRouter } from '../../../hocs/withBrowserRouter';

describe('Component: FavoritesCard', () => {
  it('should render correctly', () => {
    const mockProps = {
      id: '1',
      image: 'https://example.com/image.jpg',
      price: 120,
      rating: 4.5,
      title: 'Beautiful Apartment',
      type: 'apartment',
    };

    const preparedComponent = withBrowserRouter(<FavoritesCard {...mockProps} />);

    render(preparedComponent);

    expect(screen.getByText('Beautiful Apartment')).toBeInTheDocument();
    expect(screen.getByText(/€120/i)).toBeInTheDocument();
    expect(screen.getByText('apartment')).toBeInTheDocument();
  });
});

