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
  },
  chart: {
    labels: [],
    data: []
  },
};

function extractChartData(listings) {
  const none = "none";
  const zips = listings
    .map(r => {
      const zipRegx = /([\d]+) Berlin/g;
      let res = zipRegx.exec(r.addressToDisplay);
      if (res.length > 1) return res[1];
      else return none;
    })
    .filter(zip => zip !== none)
    .map(r => r.slice(0, 2));
  return _.countBy(zips);
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.LOAD_ALL_SUCCESS: {
      const result = action.listings.resultlistEntries;
      const all = _.orderBy(
        result,
        ["productType"],
        ["asc"]
      );
      const features = [...new Set(result.map(r => r.features).flat())];
      const types = [...new Set(result.map(r => r.commercializationType))];
      const chartData = extractChartData(result);
      return {
        ...state,
        listings: {all, display: all},
        geoName: action.listings.geoName,
        features,
        types,
        chart: {
          labels: Object.keys(chartData),
          data: Object.values(chartData)
        }
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

      const chartData = extractChartData(display);

      return {
        ...state,
        filters: {
          features,
          type
        },
        listings: {
          all,
          display
        },
        chart: {
          labels: Object.keys(chartData),
          data: Object.values(chartData)
        }
      };
    }
    default:
      return initialState;
  }
};

export default reducer;
