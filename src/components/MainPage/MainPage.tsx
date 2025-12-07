import { type FC, useEffect, useRef } from 'react';
import Sprite from '../Sprite/Sprite';
import OffersList from '../OffersList/OffersList';
import Map from '../Map/Map';
import CitiesList from '../CitiesList/CitiesList';
import Spinner from '../Spinner/Spinner';
import Header from '../Header/Header';
import { useAppSelector, useAppDispatch, selectSortedOffersByCity, selectCity, changeCity, selectPointsByCity, selectOffersLoadingStatus, selectCities, selectSortType, selectSortMenuOpen, setSortType, toggleSortMenu, closeSortMenu, type SortType } from '../../store';

const MainPage: FC = () => {
  const offers = useAppSelector(selectSortedOffersByCity);
  const city = useAppSelector(selectCity);
  const points = useAppSelector(selectPointsByCity);
  const cities = useAppSelector(selectCities);
  const isOffersLoading = useAppSelector(selectOffersLoadingStatus);
  const sortType = useAppSelector(selectSortType);
  const isSortMenuOpen = useAppSelector(selectSortMenuOpen);
  const dispatch = useAppDispatch();
  const sortMenuRef = useRef<HTMLFormElement>(null);

  const getCityByName = (cityName: string) => cities.find((candidateCity) => candidateCity.title === cityName);

  const handleCityClick = (cityName: string) => {
    const selectedCity = getCityByName(cityName);
    if (selectedCity) {
      dispatch(changeCity(selectedCity));
    }
  };

  const handleSortTypeClick = (type: SortType) => {
    dispatch(setSortType(type));
  };

  const handleSortMenuToggle = () => {
    dispatch(toggleSortMenu());
  };

  const sortOptions: SortType[] = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

  // Close sort menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target as Node)) {
        dispatch(closeSortMenu());
      }
    };

    if (isSortMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSortMenuOpen, dispatch]);
  if (isOffersLoading) {
    return (
      <>
        <Sprite />
        <div className="page page--gray page--main">
          <main className="page__main page__main--index">
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <Spinner />
                </section>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Sprite />

      <div className="page page--gray page--main">
        <Header showNavigation />

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <CitiesList cities={cities} activeCity={city} onCityClick={handleCityClick} />
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {city.title}</b>
                <form className="places__sorting" action="#" method="get" ref={sortMenuRef}>
                  <span className="places__sorting-caption">Sort by</span>{' '}
                  <span 
                    className="places__sorting-type" 
                    tabIndex={0}
                    onClick={handleSortMenuToggle}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSortMenuToggle();
                      }
                    }}
                  >
                    {sortType}
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className={`places__options places__options--custom ${isSortMenuOpen ? 'places__options--opened' : ''}`}>
                    {sortOptions.map((option) => (
                      <li
                        key={option}
                        className={`places__option ${sortType === option ? 'places__option--active' : ''}`}
                        tabIndex={0}
                        onClick={() => handleSortTypeClick(option)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSortTypeClick(option);
                          }
                        }}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </form>
                <OffersList offers={offers} />
              </section>
              <div className="cities__right-section">
                <Map city={city} points={points} />

              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MainPage;
