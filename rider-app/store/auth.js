
const initialState = {
    logged: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "auth/set/logged": {
            return {
                ...state,
                logged: action.payload
            }
        }
        default:
            return state;
    }
}