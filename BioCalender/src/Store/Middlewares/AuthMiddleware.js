import Axios from "axios";
import {
  hideLoading,
  showLoading,
  showAlert,
  ShowLoading,
  HideLoading,
  getPages
} from "../Actions/GeneralActions";
import { login, userData, Logout, getIndustries } from "../Actions/AuthAction";
import Apis from "../../config/Apis/index";
import Storage from "../../utilities/AsyncStorage";
import { headers } from "../../utilities/utils";
import axios from "axios";
import moment from "moment";

export const AuthMiddleware = {
  login: (params) => {
    return (dispatch) => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let formdata = new FormData();
          formdata.append("email", params?.email);
          formdata.append("password", params?.password);

          const config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };

          const data = await Axios.post(Apis.login, formdata, config);

          if (data?.status === 200) {
            resolve(true);
            await Storage.setToken(data?.data?.data?.token);
            await Storage.set("@user", JSON.stringify(data?.data?.data));
            dispatch(userData(data?.data?.data));
            dispatch(login(true));
          }
        } catch (error) {
          console.log("Error:", error);
          let errorMessage = "Network Error!";
          if (error?.response) {
            errorMessage =
              error?.response?.data?.message || "Something went wrong!";
          } else if (error?.request) {
            errorMessage =
              "No response from server. Please check your connection.";
          }
          reject(errorMessage);
          dispatch(
            showAlert({
              title: "Login",
              message: errorMessage,
              type: "Error",
              status: error?.response?.status
            })
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

  signUp: (params) => {
    return (dispatch) => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let formdata = new FormData();
          formdata.append("last_name", params?.lastName);
          formdata.append("first_name", params?.firstName);
          formdata.append("email", params?.email);
          formdata.append("password", params?.password);
          formdata.append("confirm_password", params?.confirmPassword);
          formdata.append("dob", moment(params?.dob).format("YYYY-MM-DD"));

          const config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };

          const data = await Axios.post(Apis.signup, formdata, config);

          if (data?.status === 200) {
            console.log(data.data);
            
            resolve(data.data.data);
            dispatch(
              showAlert({
                title: "Signup",
                message: data?.data?.message,
                type: "Success",
                status: data?.status
              })
            );
          }
        } catch (error) {
          console.log("Error:", error);
          let errorMessage = "Network Error!";
          if (error?.response) {
            errorMessage =
              error?.response?.data?.message || "Something went wrong!";
          } else if (error?.request) {
            errorMessage =
              "No response from server. Please check your connection.";
          }
          reject(errorMessage);
          dispatch(
            showAlert({
              title: "Signup",
              message: errorMessage,
              type: "Error",
              status: error?.response?.status
            })
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

  forgotPassword: ({ email }) => {
    return (dispatch) => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let formdata = new FormData();
          formdata.append("email", email);

          const config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };

          const data = await Axios.post(Apis.forgot_password, formdata, config);

          if (data?.status === 200) {
            resolve(true);
            dispatch(
              showAlert({
                title: "Forgot Password",
                message: data?.data?.message,
                type: "Success",
                status: data?.status
              })
            );
          } else {
            reject(data?.data);
          }
        } catch (error) {
          console.log("Error:", error);
          let errorMessage = "Network Error!";
          if (error?.response) {
            errorMessage =
              error?.response?.data?.message || "Something went wrong!";
          } else if (error?.request) {
            errorMessage =
              "No response from server. Please check your connection.";
          }
          reject(errorMessage);
          dispatch(
            showAlert({
              title: "Forgot Password",
              message: errorMessage,
              type: "Error",
              status: error?.response?.status
            })
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

  verifyCode: (params) => {
    console.log(params.id);

    return (dispatch) => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let formdata = new FormData();
          if (params.id) {
            formdata.append("id", params.id);
          }
          if (params.email) {
            formdata.append("email", params.email);
          }
          formdata.append("code", params.code);

          const config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };

          const data = await Axios.post(Apis.verify_code, formdata, config);

          if (data?.status === 200) {
            resolve(true);
            dispatch(
              showAlert({
                title: "Verify Code",
                message: data?.data?.message,
                type: "Success",
                status: data?.status
              })
            );
          }
        } catch (error) {
          console.log("Error:", error);
          let errorMessage = "Network Error!";
          if (error?.response) {
            errorMessage =
              error?.response?.data?.message || "Something went wrong!";
          } else if (error?.request) {
            errorMessage =
              "No response from server. Please check your connection.";
          }
          reject(errorMessage);
          dispatch(
            showAlert({
              title: "Verify Code",
              message: errorMessage,
              type: "Error",
              status: error?.response?.status
            })
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

  resendCode: (params) => {
    console.log("oarmass", params);
    return (dispatch) => {
      // dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let formdata = new FormData();
          if (params.id) {
            formdata.append("id", params?.id);
          }
          if (params.email) {
            formdata.append("email", params?.email);
          }
          const data = await Axios.post(Apis.resend_code, formdata);
          if (data?.status == 200) {
            resolve(true);
            dispatch(
              showAlert({
                title: "Verify Code",
                message: data?.data?.message,
                type: "Success",
                status: data?.status
              })
            );
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: "Resend Code",
              message: error?.response?.data?.message
                ? error?.response?.data?.message
                : "Network Error!",
              type: "Error",
              status: error?.response?.status
            })
          );
        } finally {
          // dispatch(hideLoading());
        }
      });
    };
  },

  changePassword: (params) => {
    return (dispatch) => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let formdata = new FormData();
          formdata.append("email", params?.email);
          formdata.append("password", params?.password);
          formdata.append("confirm_password", params?.confirm_password);

          const config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };

          const data = await Axios.post(Apis.change_password, formdata, config);

          if (data?.status === 200) {
            resolve(true);
            dispatch(
              showAlert({
                title: "Change Password",
                message: data?.data?.message,
                type: "Success",
                status: data?.status
              })
            );
          }
        } catch (error) {
          console.log("Error:", error);
          let errorMessage = "Network Error!";
          if (error?.response) {
            errorMessage =
              error?.response?.data?.message || "Something went wrong!";
          } else if (error?.request) {
            errorMessage =
              "No response from server. Please check your connection.";
          }
          reject(errorMessage);
          dispatch(
            showAlert({
              title: "Change Password",
              message: errorMessage,
              type: "Error",
              status: error?.response?.status
            })
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

  onUpdateProfile: (params) => {
    return (dispatch) => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let formdata = new FormData();
          formdata.append("first_name", params?.firstName);
          formdata.append("last_name", params?.lastName);
          formdata.append("location", params?.address);
          formdata.append("dob", moment(params?.dob).format("YYYY-MM-DD"));

          if (params?.profileImg) {
            formdata.append("profile_image", params?.profileImg);
          }

          const config = await headers.config();
          const data = await Axios.post(Apis.edit_profile, formdata, config);

          if (data?.status === 200) {
            resolve(true);
            dispatch(
              showAlert({
                title: "Update Profile",
                message: data?.data?.message,
                type: "Success",
                status: data?.status
              })
            );

            await Storage.set("@user", JSON.stringify(data?.data?.data));
            dispatch(userData(data?.data?.data));
          }
        } catch (error) {
          console.error("Profile Update Error:", error);

          let errorMessage = "Network Error!";
          if (error?.response) {
            errorMessage =
              error?.response?.data?.message || "Something went wrong!";
          } else if (error?.request) {
            errorMessage =
              "No response from server. Please check your connection.";
          }

          reject(errorMessage);
          dispatch(
            showAlert({
              title: "Update Profile",
              message: errorMessage,
              type: "Error",
              status: error?.response?.status
            })
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

  logOut: () => {
    return (dispatch) => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const config = await headers.config();
          const response = await Axios.get(Apis.logout, config);

          if (response?.status === 200) {
            resolve(true);
          } else {
            reject("Logout failed. Please try again.");
          }
        } catch (error) {
          console.error("Logout Error:", error);

          let errorMessage = "Network Error!";
          if (error?.response) {
            errorMessage =
              error?.response?.data?.message || "Something went wrong!";
          } else if (error?.request) {
            errorMessage =
              "No response from server. Please check your connection.";
          }

          reject(errorMessage);
        } finally {
          await Storage.clearStorage();
          dispatch(Logout());
          dispatch(hideLoading());
        }
      });
    };
  },

  deleteAccount: () => {
    return (dispatch) => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const data = await Axios.post(
            Apis.delete_account,
            {},
            await headers.config()
          );
          if (data?.status == 200) {
            resolve(true);
          }
        } catch (error) {
          reject(error);
        } finally {
          Storage.clearStorage();
          dispatch(Logout());
          dispatch(hideLoading());
        }
      });
    };
  },

  social_login: (params) => {
    return (dispatch) => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let formdata = new FormData();
          formdata.append("email", params?.email);
          formdata.append("first_name", params?.first_name);
          formdata.append("last_name", params?.last_name);

          const data = await Axios.post(Apis.social_login, formdata);
          if (data?.status == 200) {
            resolve(true);
            await Storage.setToken(data?.data?.data?.token);
            await Storage.set("@user", JSON.stringify(data?.data?.data));
            dispatch(userData(data?.data?.data));
            dispatch(login(true));
          }
        } catch (error) {
          console.log("error--->social", error?.response?.data?.message);
          reject(error);
          dispatch(
            showAlert({
              title: "social login",
              message: error?.response?.data?.message
                ? error?.response?.data?.message
                : "Network Error!",
              type: "Error",
              status: error?.response?.status
            })
          );
        } finally {
          dispatch(hideLoading());
        }
      });
    };
  },

  appPages: (params) => {
    return (dispatch) => {
      // dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const data = await Axios.get(Apis.pages);
          if (data?.status == 200) {
            dispatch(getPages(data.data.data));
            resolve(true);
          }
        } catch (error) {
          reject(error);
          dispatch(
            showAlert({
              title: "social login",
              message: error?.response?.data?.message
                ? error?.response?.data?.message
                : "Network Error!",
              type: "Error",
              status: error?.response?.status
            })
          );
        } finally {
          // dispatch(hideLoading());
        }
      });
    };
  }
};
