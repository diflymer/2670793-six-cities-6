import { render, screen } from '@testing-library/react';
import PlaceCard from './PlaceCard';
import { withBrowserRouter } from '../../hocs/withBrowserRouter';

describe('Component: PlaceCard', () => {
  it('should render correctly', () => {
    const mockProps = {
      id: '1',
      image: 'https://example.com/image.jpg',
      price: 120,
      rating: 4.5,
      title: 'Beautiful Apartment',
      type: 'apartment',
    };

    const preparedComponent = withBrowserRouter(<PlaceCard {...mockProps} />);

    render(preparedComponent);

    expect(screen.getByText('Beautiful Apartment')).toBeInTheDocument();
    expect(screen.getByText(/€120/i)).toBeInTheDocument();
    expect(screen.getByText('apartment')).toBeInTheDocument();
  });
});

