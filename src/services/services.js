import HttpService from './http_service';

export const getEvent = (EVENT_ID) =>
  HttpService
    .get(`events/${EVENT_ID}`)
    .then(res => res.data)

export const getGroups = (EVENT_ID) =>
  HttpService
    .get(`events/${EVENT_ID}/groups`)
    .then(res => res.data)

export const getPlayoffMatches = (EVENT_ID) =>
  HttpService
    .get(`events/${EVENT_ID}/playoff`)
    .then(res => res.data)
