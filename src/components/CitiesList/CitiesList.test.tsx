import { render, screen } from '@testing-library/react';
import CitiesList from './CitiesList';
import type { City } from '../../types/city';
import { AMSTERDAM } from '../../types/city';

describe('Component: CitiesList', () => {
  const mockCities: City[] = [
    AMSTERDAM,
    {
      title: 'Paris',
      lat: 48.8566,
      lng: 2.3522,
      zoom: 12,
    },
  ];

  it('should render correctly', () => {
    render(
      <CitiesList
        cities={mockCities}
        activeCity={AMSTERDAM}
        onCityClick={() => {}}
      />
    );

    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });
});

