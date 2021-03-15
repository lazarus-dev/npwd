import events from '../utils/events';
import { sendContactsEvent } from '../utils/messages';

onNet(events.CONTACTS_SEND_CONTACTS, (contacts: any) => {
  sendContactsEvent('setContacts', contacts);
});

RegisterNuiCallbackType(events.CONTACTS_ADD_CONTACT);
on(`__cfx_nui:${events.CONTACTS_ADD_CONTACT}`, (data: any, cb: Function) => {
  emitNet(events.CONTACTS_ADD_CONTACT, data.number, data.display, data.avatar);
  cb();
});

onNet(events.CONTACTS_ADD_CONTACT_SUCCESS, () => {
  emitNet(events.CONTACTS_GET_CONTACTS);
});

RegisterNuiCallbackType(events.CONTACTS_UPDATE_CONTACT);
on(`__cfx_nui:${events.CONTACTS_UPDATE_CONTACT}`, (data: any, cb: Function) => {
  emitNet(events.CONTACTS_UPDATE_CONTACT, data);
  cb();
});

onNet(events.CONTACTS_UPDATE_CONTACT_SUCCESS, () => {
  emitNet(events.CONTACTS_GET_CONTACTS);
});

RegisterNuiCallbackType(events.CONTACTS_DELETE_CONTACT);
on(`__cfx_nui:${events.CONTACTS_DELETE_CONTACT}`, (data: any, cb: Function) => {
  emitNet(events.CONTACTS_DELETE_CONTACT, data);
  cb();
});

onNet(events.CONTACTS_DELETE_CONTACT_SUCCESS, () => {
  emitNet(events.CONTACTS_GET_CONTACTS);
});

onNet(events.CONTACTS_ACTION_RESULT, (alert: any) => {
  sendContactsEvent('setAlert', alert);
});
