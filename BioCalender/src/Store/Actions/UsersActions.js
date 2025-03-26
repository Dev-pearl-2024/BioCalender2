import ActionTypes from './ActionTypes';

const getAllUsers = payload => {
  return {
    type: ActionTypes.GET_ALLUSERS,
    payload,
  };
};
const resetGetAllUsers = () => {
  return {
    type: ActionTypes.RESET_GET_ALLUSERS,
  };
};

const getAllFriends = payload => {
  return {
    type: ActionTypes.GET_ALLFRIENDS,
    payload,
  };
};
const getAllFriendsCount = payload => {
  return {
    type: ActionTypes.GET_ALLFRIENDS_COUNT,
    payload,
  };
};
const resetGetAllFriends = () => {
  return {
    type: ActionTypes.RESET_GET_ALLFRIENDS,
  };
};

const getAllRequests = payload => {
  return {
    type: ActionTypes.GET_ALLREQUESTS,
    payload,
  };
};

const resetGetAllRequests = () => {
  return {
    type: ActionTypes.RESET_GET_ALLREQUESTS,
  };
};

const getActiveFriends = payload => {
  return {
    type: ActionTypes.GET_ACTIVEFRIENDS,
    payload,
  };
};

const getNotification = payload => {
  return {
    type: ActionTypes.get_notification,
    payload,
  };
};
const getNotificationCount = payload => {
  return {
    type: ActionTypes.GET_NOTIFICATION_COUNT,
    payload,
  };
};
const resetNotification = () => {
  return {
    type: ActionTypes.reset_notification,
  };
};
const notificationSwitch = payload => {
  return {
    type: ActionTypes.notificationSwitch,
    payload,
  };
};
const isSubscribed = payload => {
  return {
    type: ActionTypes.Is_Subscribed,
    payload,
  };
};
const getMySubscription = payload => {
  return {
    type: ActionTypes.GET_MY_SUBSCRIPTION,
    payload,
  };
};
const getSubscriptions = payload => {
  return {
    type: ActionTypes.GET_SUBSCRIPTIONS,
    payload,
  };
};
const getCards = payload => {
  return {
    type: ActionTypes.GET_CARDS,
    payload,
  };
};
const getAdverts = payload => {
  return {
    type: ActionTypes.GET_ADVERTS,
    payload,
  };
};
const getFaq = payload => {
  return {
    type: ActionTypes.GET_FAQ,
    payload,
  };
};
const storeCard = payload => {
  return {
    type: ActionTypes.STORE_CARD,
    payload,
  };
};
const deleteStoreCard = payload => {
  return {
    type: ActionTypes.DELETE_CARD,
    payload,
  };
};

export {
  deleteStoreCard,
  storeCard,
  getFaq,
  getAllUsers,
  resetGetAllUsers,
  getAllFriends,
  resetGetAllFriends,
  getAllFriendsCount,
  getAllRequests,
  resetGetAllRequests,
  getActiveFriends,
  getNotification,
  resetNotification,
  notificationSwitch,
  getMySubscription,
  getSubscriptions,
  getCards,
  getNotificationCount,
  isSubscribed,
  getAdverts,
};
