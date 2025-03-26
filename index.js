import { registerRootComponent } from "expo";

import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

// [
//   {
//     brand: "Visa",
//     card_end_number: "4242",
//     card_holder_name: "Test",
//     created_at: "2024-09-20T13:55:51.000000Z",
//     deleted_at: null,
//     id: 24,
//     is_default_card: 1,
//     stripe_source_id: "card_1Q17JKA9RcFG9f0nst9Nkcb6",
//     updated_at: "2024-09-20T13:55:51.000000Z",
//     user_id: 17
//   }
// ];
// [
//   {
//     id: 24,
//     user_id: 17,
//     card_holder_name: "Test",
//     brand: "Visa",
//     card_end_number: "4242",
//     is_default_card: 1,
//     stripe_source_id: "card_1Q17JKA9RcFG9f0nst9Nkcb6",
//     created_at: "2024-09-20T13:55:51.000000Z",
//     updated_at: "2024-09-20T13:55:51.000000Z",
//     deleted_at: null
//   }
// ];
