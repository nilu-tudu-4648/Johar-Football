import { NAVIGATION } from "./routes";
import { IMAGES } from "./theme";
export const ACTIONS = {
  REGISTRATION: 'Registration',
  GET_OTP: "GetOTP",
  VERIFY_OTP: "VerifyOTP",
  SET_LOGIN_PIN: "SetLoginPin",
  LOGIN_WITH_PIN: "LoginwithPin",
  GET_USER_DETAIL: "GetUserDetail",
  DELETE_USER: "DeleteUser",
  GET_UNLOADING_LIST: "GetUnloadingList",
  GET_UNLOADING_STATUS: "GetUnloadingStatus",
  GET_DEPS_STATUS: "GetDEPSStatus",
  GET_PENDING_POD_DOCKET: "GetPendingPODDocket",
  POD_UPLOAD_IMAGE: "PODUploadImage",
  GET_DASHBOARD_DETAILS: "GetDashBoardDetails",
  GET_POD_DOCKET_FOR_STATEMENT: "GetPodDocketForStatement",
  ARRIVAL_UPLOAD_IMAGE: "ArrivalUploadImage",
  GET_POD_STATEMENT_LIST: "GetPODStatementList",
  GENERATE_POD_STATEMENT: "GeneratePODStatement",
  UPDATE_POD_COURIER_DETAIL: "UpdatePODCourierDetail",
  GET_POD_STATEMENT_DETAIL: "GetPODStatementDetail",
  DELETE_POD_STATEMENT: "DeletePODStatement",
  PROFILE_PIC_UPLOAD: "ProfilePicUpload",
  GET_LEADS_LIST: "GetLeadsList",
  GET_LEAD_DROPDOWN: "GetLeadDropdown",
  GET_LOADING_LIST: "GetLoadingList",
  GET_LEADS_VISIT_HISTORY: "GetLeadsVisitHistory",//DONE
  VISIT_ENTRY: "VisitEntry", //error
  ARRIVAL_SUBMIT: "ArrivalSubmit",
  GET_LOAD_STATUS: "GetLoadStatus",
  LOAD_STATUS_UPDATE: "LoadStatusUpdate",
};
export const IMAGES_KEYS = {
  'Back image before unloading': "",
  'Back image while unloading': "",
  'Back image after unloading': "",
  'After opening Rassa and Tripa': "",
  'Image after half Unloading': "",
  'Vehicle Image after Unloading': ""
}
export const IMAGES_KEYS_LOADING = {
  'Back image before unloading': "",
  'Engine and Chassis No.': "",
  'Vehicle Floor Image (Empty)': "",
  'Vehicle Image Full loaded': "",
  'Vehicle After Rassa Tripal 1': "",
  'Vehicle After Rassa Tripal 2': "",
  'Vehicle After Rassa Tripal 3': "",
}
export const POD_UPDATE_KEYS = {
  Courier_Name: "",
  Courier_Number: "",
  Date: "",
  Amount: ""
}
export const LEAD_DETAILS_DROPDOWN = {
  CommunicationTypes: "",
  PurposeList: "",
  VisitOutcomeList: "",
  StatusList: "",
}
