// import {
//   SET_USER_ADDRESS_FORM_DATA,
//   CLEAR_USER_ADDRESS_FORM_DATA,
//   GET_USER_ADDRESSES_REQUEST,
//   GET_USER_ADDRESSES_SUCCESS,
//   GET_USER_ADDRESSES_FAILURE,
//   ADD_USER_ADDRESS_SUCCESS,
//   UPDATE_USER_ADDRESS_SUCCESS,
//   DELETE_USER_ADDRESS_SUCCESS,
//   SELECT_POI,
//   selectPoi,
// } from "@/store/slices/addressManagementSlice";
// import {
//   EmptyUserAddress,
//   POIformatted,
//   UserAddress,
// } from "@/types/AddressManagement";

// interface State {
//   loading: boolean;
//   addresses: UserAddress[];
//   error: null | string;
//   UserAddressFormData: UserAddress | null;
//   selectedPoi: POIformatted | null; // 用户选择的POI
// }
// const initialState: State = {
//   loading: false,
//   addresses: [], // 用户保存的地址列表
//   error: null,
//   UserAddressFormData: EmptyUserAddress,
//   selectedPoi: null,
// };

// const addressManagementReducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     // case SET_USER_ADDRESS_FORM_DATA:
//     //   return {
//     //     ...state,
//     //     UserAddressFormData: action.payload,
//     //   };
//     // case CLEAR_USER_ADDRESS_FORM_DATA:
//     //   return {
//     //     ...state,
//     //     UserAddressFormData: EmptyUserAddress,
//     //     selectedPoi: null,
//     //   };
//     // case SELECT_POI:
//     //   return {
//     //     ...state,
//     //     selectedPoi: action.payload as POIformatted,
//     //   };
//     // case GET_USER_ADDRESSES_REQUEST:
//     //   return { ...state, loading: true };
//     // case GET_USER_ADDRESSES_SUCCESS:
//     //   return { ...state, loading: false, addresses: action.payload };
//     // case GET_USER_ADDRESSES_FAILURE:
//     //   return { ...state, loading: false, error: action.payload };
//     // case ADD_USER_ADDRESS_SUCCESS:
//     //   return {
//     //     ...state,
//     //     addresses: [...state.addresses, action.payload],
//     //   };
//     // case UPDATE_USER_ADDRESS_SUCCESS:
//     //   return {
//     //     ...state,
//     //     addresses: state.addresses.map((addr: any) =>
//     //       addr.id === action.payload.id ? action.payload : addr
//     //     ),
//     //   };
//     // case DELETE_USER_ADDRESS_SUCCESS:
//     //   return {
//     //     ...state,
//     //     addresses: state.addresses.filter(
//     //       (addr: any) => addr.id !== action.payload
//     //     ),
//     //   };
//     default:
//       return state;
//   }
// };

// export default addressManagementReducer;
