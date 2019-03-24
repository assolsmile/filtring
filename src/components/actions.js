import * as actionTypes from "./actionTypes";

export const loadAll = () => ({
  type: actionTypes.LOAD_ALL,
});

export const loadAllSuccess = (listings) => ({
  type: actionTypes.LOAD_ALL_SUCCESS,
  listings
});

export const loadAllError = (error) => ({
  type: actionTypes.LOAD_ALL_ERROR,
  error
});

export const filterResult = (filters) => ({
  type: actionTypes.FILTER_RESULT,
  filters
});
