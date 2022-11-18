

import * as Location from 'expo-location';
import store from "../store";
import ThemeStyles from '../theme/styles';
export const serviceName = "LOCATION_SERVICE";
export const options = {
    accuracy: Location.Accuracy.Highest,
    timeInterval: 0,
    distanceInterval: 5,
}

export const watch = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(serviceName);
    if(!hasStarted) return;
    Location.watchPositionAsync(options, (location) => {
        store.dispatch({
            type: "rider/update/location",
            payload: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                altitude: location.coords.altitude,
                heading: location.coords.heading,
                speed: location.coords.speed
            }
        });
    }).catch(e => {


    })
}

export const start = () => {
    return new Promise(async (resolve,reject) => {
        let res = await Location.requestForegroundPermissionsAsync();
        if (res.status !== 'granted') {
            return reject({code: "LOCATION_PERMISSION_FAILED"});
        }
        try{
            await Location.startLocationUpdatesAsync(serviceName, {
                ...options,
                foregroundService: {
                    notificationTitle: "Location Tracking Is On",
                    notificationBody: "We are tracking your location",
                    // notificationColor: ThemeStyles.colors.primary,
                },
            });
        }catch(e){
            return reject({code: "LOCATION_UPDATES_FAILED"})
        }
        await watch();
        resolve();
    });
}

export const stop = () => {
    return Location.stopLocationUpdatesAsync(serviceName);
}


export const isServiceStarted = () => {
    return Location.hasStartedLocationUpdatesAsync(serviceName);
}

export const toggleService = () => {
    const {status} = store.getState()._location;
    if(status){
        Location.stopLocationUpdatesAsync(serviceName).then(result => {
            console.log(result);
        })
    }
}