import { getPreciseDistance } from "geolib";

const initialState = {
  distance: 0,
  maxSpeed: 0,
  coords: {
    speed: 0,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "location/set/coords": {
      // let newState = {
      //     ...state,
      //     status: true,
      //     coords: action.payload,
      // }
      // if(state.coords.latitude && state.coords.longitude){
      //     const prevLocation = {
      //         latitude: state.coords.latitude,
      //         longitude: state.coords.longitude,
      //     }
      //     const newLocation = {
      //         latitude: newState.coords.latitude,
      //         longitude: newState.coords.longitude,
      //     }
      //     newState["distance"] += getPreciseDistance(prevLocation, newLocation);
      // }
      // if(newState.coords.speed > state.maxSpeed){
      //     newState["maxSpeed"] = newState.coords.speed;
      // }
      return newState;
    }

    default:
      return state;
  }
}
