const initialState = {
  state: null,
  orders: {
    active: 0,
    pending: 0,
    completed: 0,
  },
  location: {
    latitude: 34.0151,
    longitude: 71.5249,
    altitude: null,
    heading: null,
    speed: 0,
    distance: 0,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "rider/set/state": {
      return {
        ...state,
        state: action.payload,
      };
    }
    case "rider/set/orders": {
      return {
        ...state,
        orders: action.payload,
      };
    }
    case "rider/update/location": {
      return {
        ...state,
        location: {
          ...state.location,
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
}
