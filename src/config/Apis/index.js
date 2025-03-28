//local
// const BASE_URL = 'http://192.168.0.119/bio-calendar/public/api/';

// Staging
// const BASE_URL = `https://appdevprojects.co/bio-calendar/public/api/`

// Production
const BASE_URL = `https://biocalendar.net/api/`;
// const BASE_URL = `https://server1.pearl-developer.com/bio-calendar/public/`;

export const API_KEY = "apikey";

export const stripCardStroe = "https://api.stripe.com/v1/tokens";

const Apis = {
  //Auth
  login: `${BASE_URL}login`,
  logout: `${BASE_URL}logout`,
  // socialSignup: `${BASE_URL}socialSignup`,
  signup: `${BASE_URL}sign_up`,
  verify_code: `${BASE_URL}verify_code`,
  resend_code: `${BASE_URL}resend_code`,
  completeProfile: `${BASE_URL}complete_profile`,
  forgot_password: `${BASE_URL}forgot_password`,
  verify_token: `${BASE_URL}verify_token`,
  change_password: `${BASE_URL}change_password`,
  getUserData: `${BASE_URL}get_user_data`,
  updateProfile: `${BASE_URL}edit_profile`,
  contact_us: `${BASE_URL}contact_us`,
  social_login: `${BASE_URL}social_login`,
  pages: `${BASE_URL}pages`,
  get_faqs: `${BASE_URL}get_faqs`,
  delete_account: `${BASE_URL}delete_account`,

  //App
  help_center: `${BASE_URL}help_center`,
  edit_profile: `${BASE_URL}edit_profile`,
  // payment_cards: `${BASE_URL}payment_cards`,
  payment_cards: `${BASE_URL}get-all-cards-by-user`,

  delete_card: `${BASE_URL}delete_card`,
  // store_card: `${BASE_URL}store_card`,

  subscriptions: `${BASE_URL}subscriptions`,
  // buy_subscription: `${BASE_URL}buy_subscription`,
  buy_subscription: `${BASE_URL}pay-via-stripe-token`,
  cancel_subscription: `${BASE_URL}cancel_subscription`,
};

export default Apis;
