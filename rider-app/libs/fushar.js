
import * as Notifications from 'expo-notifications';
import _ from "lodash";

function Event({event, callback, scope}){
    this.event = event;
    this.scope = scope;
    this.callback = callback;
}

export const _onEvent = (event, callback, scope = "default") => {
    const eventObj = new Event({
        event: event,
        scope: scope,
        callback: callback,
    });
    if(global.fusharEvents){
        global.fusharEvents = [eventObj, ...global.fusharEvents];
    }else{
        global.fusharEvents = [eventObj];
    }
    return {
        event: eventObj,
        remove: () => {
            global.fusharEvents = _.remove(global.fusharEvents, eventObj);
        }
    }
}

export const _init = async () => {
    return new Promise((resolve,reject) => {
        Notifications.addNotificationResponseReceivedListener(_onRespond);
        Notifications.addNotificationReceivedListener(_onReceived);
        resolve()
    });
}

const _triggerEvent = ({event, payload}, source = null) => {
    if(!event) return null;
    const result = _.find(global.fusharEvents, {event: event});
    if(!result) return;
    try{
        result.callback(payload, {source});
    }catch(e){
    }
}

const _onReceived = ({request}) => {
    const {title, body, data} = request.content;
    _triggerEvent(data, "receive");
}


const _onRespond = ({notification}) => {
    const {title, body, data} = notification.request.content;
    setTimeout(() => _triggerEvent(data, "respond"), 1000);
}

export const _requestPermission = async () => {
    return new Promise(async (resolve,reject) => {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        if(existingStatus !== "granted"){
            const { status } = await Notifications.requestPermissionsAsync();
            if(status !== "granted"){
                return reject({code: "PERMISSION_DENIED"});
            }else{
                resolve({status : status});
            }
        }else{
            return resolve({status: existingStatus});
        }
    });
}


export const _getToken = () => {
    return new Promise(async (resolve, reject) => {
        try{
            const {status} = await _requestPermission();
            token = (await Notifications.getExpoPushTokenAsync()).data;
            return resolve({token: token});
        }catch(e){
            return reject(e)
        }
    });
}