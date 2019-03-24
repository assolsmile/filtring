import * as actionTypes from "./actionTypes"
import * as _ from "lodash"

const initialState = {
  listings: {
    all: [],
    display: []
  },
  geoName: "",
  features: [],
  types: [],
  filters: {
    features: [],
    type: ""
  }
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.LOAD_ALL_SUCCESS: {
      const result = action.listings.resultlistEntries;
      const all = _.orderBy(
        result,
        ["productType"],
        ["asc"]
      );
      const features = _.uniq(result.map(r => r.features).flat());
      const types = _.uniq(result.map(r => r.commercializationType));

      return {
        ...state,
        listings: {all, display: all},
        geoName: action.listings.geoName,
        features,
        types
      };
    }
    case actionTypes.FILTER_RESULT: {
      const {filters: {features, type}} = action;
      const {listings: {all}} = state;
      let display = all;
      if (type !== "") {
        display = all.filter(v => v.commercializationType === type);
      }
      if (features.length !== 0) {
        const use = type !== "" ? display : all;
        display =
          use.filter(
            v => _.intersection(features, v.features).length === features.length
          );
      }

      return {
        ...state,
        filters: {
          features,
          type
        },
        listings: {
          all,
          display
        }
      };
    }
    default:
      return initialState;
  }
};

export default reducer;
