import Axios from "axios";
import { Alert } from "react-native";
import {
  getHeaders,
  getHeaders_formData,
  getMultiHeaders,
  getMultiHeadersFormUrlEncoded
} from "../../utilities";
import Storage from "../../utilities/AsyncStorage";
import Apis, { stripCardStroe } from "../../config/Apis";
import {
  ShowLoading,
  HideLoading,
  showAlert,
  showLoading,
  hideLoading
} from "../../Store/Actions/GeneralActions";
import {
  deleteStoreCard,
  getCards,
  getFaq,
  getSubscriptions,
  storeCard
} from "../Actions/UsersActions";
import { headers } from "../../utilities/utils";
import { userData } from "../Actions/AuthAction";
import axios from "axios";

// import { notificationSwitch } from '../Actions/NotificationAction';

class UsersMiddleware {
  static getAllSubscriptions = () => {
    return (dispatch) => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await Axios.get(
            Apis.subscriptions,
            await getHeaders()
          );
          if (data?.success) {
            dispatch(getSubscriptions(data.data));
            resolve(data.data);
            // dispatch(showAlert({message:""}))
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: "Get Subscription",
              message: error?.response?.data?.message
                ? error?.response?.data?.message
                : "Network Error",
              type: "Error",
              status: error?.response?.status
            })
          );
          //   dispatch(HideLoading());
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  };

  static getAllCards = () => {
    return (dispatch) => {
      console.log("getAll Cards");

      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        const userDetils = await Storage.getUser();
        const userParseDetails = await JSON.parse(userDetils);
        console.log(userParseDetails?.id);
        try {
          const { data, status } = await Axios.post(
            Apis.payment_cards,
            { user_id: userParseDetails?.id },
            await getHeaders_formData()
          );
          if (status == 200) {
            dispatch(getCards(data.data));
            resolve(data.data);
            console.log(data.data);
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: "Get Cards",
              message: error?.response?.data?.message
                ? error?.response?.data?.message
                : "Network Error",
              type: "Error",
              status: error?.response?.status
            })
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  };

  static storeCard = (userData) => {
    return async (dispatch) => {
      dispatch(showLoading());
      try {
        // Extract month and year

        const userDetils = await Storage.getUser();
        const userParseDetails = await JSON.parse(userDetils);
        console.log(userData?.card_holder_name);

        const [month, year] = userData?.exp_date.split("/");

        // Format data for Stripe API
        const formdata = new URLSearchParams();
        formdata.append("card[number]", userData?.card_number);
        formdata.append("card[exp_month]", month);
        formdata.append("card[exp_year]", year);
        formdata.append("card[cvc]", userData?.cvc);

        // Make the request
        const { data, status } = await axios.post(
          "https://api.stripe.com/v1/tokens",
          formdata,
          {
            headers: {
              Authorization:
                "Bearer pk_test_51PkJ4d06ShRfWNZFtQI3nuM25eMT1cbHjjSJRFHbNozetlH26nH2PENmyDVQt7F166VQk2KgSm48OKnrqE291A4A00F4WbmBYM",
              "Content-Type": "application/x-www-form-urlencoded"
            },
            mode: "no-cors"
          }
        );

        // If request is successful
        if (status === 200) {
          console.log("Card Token:", data);
          const adduserDetails = await {
            ...data,
            user_id: userParseDetails.id
          };
          console.log("userWith id", adduserDetails);
          const formData = new FormData();

          // Add each key-value pair to formData
          // Object.entries(adduserDetails).forEach(([key, value]) => {
          //   formData.append(key, value !== null ? value : ""); // Handle null values
          // });
          formData.append("user_id", userParseDetails.id);

          // const data54 = {
          //   card: {
          //     address_city: null,
          //     address_country: null,
          //     address_line1: null,
          //     address_line1_check: null,
          //     address_line2: null,
          //     address_state: null,
          //     address_zip: null,
          //     address_zip_check: null,
          //     brand: "Visa",
          //     country: "US",
          //     cvc_check: "unchecked",
          //     dynamic_last4: null,
          //     exp_month: 9,
          //     exp_year: 2026,
          //     funding: "credit",
          //     id: "card_1R67rZ06ShRfWNZFJuREXYFY",
          //     last4: "1111",
          //     name: null,
          //     networks: { preferred: null },
          //     object: "card",
          //     regulated_status: "unregulated",
          //     tokenization_method: null,
          //     wallet: null
          //   },
          //   client_ip: "103.182.161.55",
          //   created: 1742810649,
          //   id: "tok_1R67rZ06ShRfWNZFfeCwIj3r",
          //   livemode: false,
          //   object: "token",
          //   type: "card",
          //   used: false
          // };

          try {
            // Send FormData in POST request
            const storeResponseData = await axios.post(
              "https://www.biocalendar.net/api/save-stripe-user-token",
              {
                user_id: userParseDetails?.id,
                token_id: data?.id,
                card_exp_month: data?.card?.exp_month,
                card_exp_year: data?.card?.exp_year,
                card_id: data?.card?.id,
                country: data?.card?.country,
                last4: data?.card?.last4,
                brand: data?.card?.brand,
                card_holder_name: userData?.card_holder_name
              }
              // {
              //   headers: {
              //     "Content-Type": "multipart/form-data"
              //   }
              // }
            );

            console.log("Store form data response:", storeResponseData.data);
          } catch (error) {
            if (error.response) {
              // Server responded with a status code outside 2xx
              console.error("Error response:", {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
              });
            } else if (error.request) {
              // Request was made, but no response received
              console.error("Error request:", error.request);
            } else {
              // Something else happened
              console.error("Error message:", error.message);
            }
          }

          await dispatch(storeCard(data));
          await dispatch(showAlert({ message: "Card saved successfully!" }));
          return data;
        }
      } catch (error) {
        console.error("Store Card Error:", error);

        dispatch(
          showAlert({
            title: "Store Card",
            message: error?.response?.data?.error?.message || "Network Error",
            type: "Error",
            status: error?.response?.status
          })
        );
      } finally {
        dispatch(hideLoading());
      }
    };
  };

  static deleteCard = (userData) => {
    return (dispatch) => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let formdata = new FormData();
          formdata.append("stripe_source_id", userData?.stripe_source_id);
          const { data, status } = await Axios.post(
            Apis.delete_card,
            formdata,
            await getMultiHeaders()
          );
          if (status == 200) {
            dispatch(deleteStoreCard(userData?.item)),
              dispatch(showAlert({ message: data.message }));
            resolve(data.data);
          }
        } catch (error) {
          dispatch(hideLoading());

          reject(error);
          dispatch(
            showAlert({
              title: "Delete Card",
              message: error?.response?.data?.message
                ? error?.response?.data?.message
                : "Network Error",
              type: "Error",
              status: error?.response?.status
            })
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  };
  static buySubscription = (userData1) => {
    return (dispatch) => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const userDetils = await Storage.getUser();
          const userParseDetails = await JSON.parse(userDetils);
          console.log(userData1, userParseDetails?.id);

          let formdata = new FormData();
          formdata.append("token", userData1?.token_id);
          formdata.append("amount", userData1?.amount);
          formdata.append("currency", userData1?.currency);
          formdata.append("user_id", userParseDetails?.id);
          formdata.append("isSubscription", true);
          formdata.append("planName", "Premium Plan");
          formdata.append("interval", "month");
          formdata.append("email", "harshitk+02@pearlorganisation.com");
          formdata.append("name", "Harshit");

          const { data, status } = await Axios.post(
            Apis.buy_subscription,
            formdata,
            await getHeaders_formData()
          );
          if (status == 200) {
            await Storage.set("@user", JSON.stringify(data?.data));
            dispatch(userData(data?.data));
            resolve(data.data);
            dispatch(
              showAlert({
                title: "Subscription",
                message: data?.message
              })
            );
          }
        } catch (error) {
          reject(error);
          console.log(error.response.data.message);

          dispatch(
            showAlert({
              title: "Subscription",
              message: error?.response?.data?.message
                ? error?.response?.data?.message
                : "Network Error",
              type: "Error",
              status: error?.response?.status
            })
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  };
  static cancelSubscription = (id) => {
    return (dispatch) => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let formdata = new FormData();
          formdata.append("subscription_id", id);
          const { data, status } = await Axios.post(
            Apis.cancel_subscription,
            formdata,
            await getMultiHeaders()
          );
          if (status == 200) {
            dispatch(getSubscriptions(data.data));
            resolve(data.data);
            dispatch(
              showAlert({
                title: "Subscription",
                message: data?.message
              })
            );
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: "Subscription",
              message: error?.response?.data?.message
                ? error?.response?.data?.message
                : "Network Error",
              type: "Error",
              status: error?.response?.status
            })
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  };

  static setFaq = () => {
    return (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          const { data, status } = await Axios.get(Apis.get_faqs);
          if (status == 200) {
            resolve(true);
            dispatch(getFaq(data.data));
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: "Get Faq",
              message: error?.response?.data?.message
                ? error?.response?.data?.message
                : "Network Error",
              type: "Error",
              status: error?.response?.status
            })
          );
        }
      });
    };
  };

  static helpCenter = (params) => {
    return (dispatch) => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let formdata = new FormData();
          formdata.append("title", params?.title);
          formdata.append("message", params?.message);
          const { data, status } = await Axios.post(
            Apis.help_center,
            formdata,
            await headers.config()
          );
          if (status == 200) {
            resolve(true);
            dispatch(showAlert({ message: data?.message }));
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: "helpCenter",
              message: error?.response?.data?.message
                ? error?.response?.data?.message
                : "Network Error",
              type: "Error",
              status: error?.response?.status
            })
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  };
}

export default UsersMiddleware;
