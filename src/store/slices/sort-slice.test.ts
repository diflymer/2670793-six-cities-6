import sortReducer, { setSortType, toggleSortMenu, closeSortMenu, type SortState, type SortType } from './sort-slice';

describe('Sort Slice', () => {

  const initialState: SortState = {
    sortType: 'Popular',
    isOpen: false,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = sortReducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return initial state with undefined', () => {
    const emptyAction = { type: '' };

    const result = sortReducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set sort type and close menu on setSortType action', () => {
    const sortType: SortType = 'Price: low to high';
    const expectedState = {
      sortType: sortType,
      isOpen: false,
    };

    const result = sortReducer(initialState, setSortType(sortType));

    expect(result).toEqual(expectedState);
  });

  it('should toggle menu state on toggleSortMenu action', () => {
    const expectedState = {
      sortType: 'Popular',
      isOpen: true,
    };

    const result = sortReducer(initialState, toggleSortMenu());

    expect(result).toEqual(expectedState);
  });

  it('should toggle menu state from open to closed on toggleSortMenu action', () => {
    const openState: SortState = {
      sortType: 'Popular',
      isOpen: true,
    };
    const expectedState = {
      sortType: 'Popular',
      isOpen: false,
    };

    const result = sortReducer(openState, toggleSortMenu());

    expect(result).toEqual(expectedState);
  });

  it('should close menu on closeSortMenu action', () => {
    const openState: SortState = {
      sortType: 'Top rated first',
      isOpen: true,
    };
    const expectedState = {
      sortType: 'Top rated first',
      isOpen: false,
    };

    const result = sortReducer(openState, closeSortMenu());

    expect(result).toEqual(expectedState);
  });

  it('should set all sort types correctly', () => {
    const sortTypes: SortType[] = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

    sortTypes.forEach((sortType) => {
      const result = sortReducer(initialState, setSortType(sortType));
      expect(result.sortType).toEqual(sortType);
      expect(result.isOpen).toBe(false);
    });
  });

});
