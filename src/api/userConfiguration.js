import axios from "axios";
import Cookies from "js-cookie";
import { AUTH_API_URL } from "./auth";

export async function getUserData() {
  // const myCookieValue = Cookies.get("token");
  // const userData = Cookies.get("User");
  const myCookieValue = localStorage.getItem("token");
  const userData = localStorage.getItem("User");
  const storedData = localStorage.getItem("AuthRule");

  // console.log("this is the token ", myCookieValue);
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };
  if (myCookieValue != null && userData != null && storedData != null) {
    try {
      const headers = {
        Authorization: `Bearer ${myCookieValue}`,
      };
      const response = await axios.get(`${AUTH_API_URL}/AuthUser/GetUser`, {
        headers: headers,
      });
      responseBody.responseData = response.data;
      // console.log("response", response.data);
      return responseBody;
    } catch (error) {
      responseBody.hasError = true;
      responseBody.errorMessage = responseBody.errorMessage =
        error.response?.data?.statusMsg || error.response?.data?.errors;
      return responseBody;
    }
  } else {
    responseBody.hasError = true;
    responseBody.errorMessage = "something wrong";
    return responseBody;
  }
}
export async function postAuthenticationRule(payload) {
  // console.log("payload : ",payload);
  // const myCookieValue = Cookies.get("token");
  // const userData = Cookies.get("User");
  const myCookieValue = localStorage.getItem("token");
  const userData = localStorage.getItem("User");
  const storedData = localStorage.getItem("AuthRule");
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };
  if (myCookieValue != null && userData != null && storedData != null) {
    try {
      const headers = {
        Authorization: `Bearer ${myCookieValue}`,
      };
      const response = await axios.post(
        `${AUTH_API_URL}/AuthUser/SaveAuthRule`,
        payload,
        {
          headers: headers,
        }
      );

      responseBody.responseData = response.data;
      // console.log("The api res is from Auth rule : ", responseBody);
      return responseBody;
    } catch (error) {
      responseBody.hasError = true;
      responseBody.errorMessage = responseBody.errorMessage =
        error.response?.data?.statusMsg || error.response?.data?.errors;
      return responseBody;
    }
  } else {
    responseBody.hasError = true;
    responseBody.errorMessage = "something wrong";
    return responseBody;
  }
}
export const saveUser = async (formData) => {
  // const myCookieValue = Cookies.get("token");
  // const userData = Cookies.get("User");
  const myCookieValue = localStorage.getItem("token");
  const userData = localStorage.getItem("User");
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };
  try {
    // if (myCookieValue != null && userData != null) {
    //   const headers = {
    //     Authorization: `Bearer ${myCookieValue}`,
    //   };

    // } else {
    //   responseBody.hasError = true;
    //   responseBody.errorMessage = "UnAuthorise for add user";
    //   return responseBody;
    // }
    const response = await axios.post(
      `${AUTH_API_URL}/AuthUser/Save`,
      formData
    );
    responseBody.responseData = response.data;
    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors;
    return responseBody;
  }
};
export const getUserAuthRole = async (reqObj) => {
  // const myCookieValue = Cookies.get("token");
  // const userData = Cookies.get("User");
  const myCookieValue = localStorage.getItem("token");
  const userData = localStorage.getItem("User");
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };
  try {
    if (myCookieValue != null && userData != null) {
      const headers = {
        Authorization: `Bearer ${myCookieValue}`,
      };
      const response = await axios.post(
        `${AUTH_API_URL}/AuthUser/GetAuthRule`,
        reqObj,
        {
          headers: headers,
        }
      );
      responseBody.responseData = response.data;
      // console.log("The api res is: ", responseBody);
      return responseBody;
    } else {
      responseBody.hasError = true;
      responseBody.errorMessage = "UnAuthorise for add user";
      return responseBody;
    }
  } catch (error) {
    // console.log("error", error);
    responseBody.hasError = true;
    responseBody.errorMessage =
      error.response?.data?.errorMessage || error.response?.data?.errors;
    return responseBody;
  }
};
export const bindUserToWarehouseController = async (warehouseData, UserIds) => {
  // console.log(warehouseData, UserIds);
  var responseArr = [];
  await Promise.all(
    warehouseData.map(async (item) => {
      const reqObj = {
        Warehouse_Code: item.whsCode,
        Warehouse_Name: item.whsName,
        Warehouse_Location: item.location,
        Warehouse_binActivat: item.binActivat,
        User_details: UserIds,
      };
      var resp = await bindUserToWarehouse(reqObj);
      // console.log(resp);
      responseArr.push(resp);
    })
  );
  return responseArr;
};

export const bindUserToWarehouse = async (reqObj) => {
  // const myCookieValue = Cookies.get("token");
  // const userData = Cookies.get("User");
  const myCookieValue = localStorage.getItem("token");
  const userData = localStorage.getItem("User");
  // return reqObj;
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };
  try {
    if (myCookieValue != null && userData != null) {
      const headers = {
        Authorization: `Bearer ${myCookieValue}`,
      };
      const response = await axios.post(
        `${AUTH_API_URL}/AuthUser/SaveWarehouseRule`,
        reqObj,
        {
          headers: headers,
        }
      );
      responseBody.responseData = response.data;
      return responseBody;
    } else {
      responseBody.hasError = true;
      responseBody.errorMessage = "UnAuthorise for add user";
      return responseBody;
    }
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors;
    return responseBody;
  }
};

export const getAllBindUserData = async (reqObj) => {
  // const myCookieValue = Cookies.get("token");
  // const userData = Cookies.get("User");
  const myCookieValue = localStorage.getItem("token");
  const userData = localStorage.getItem("User");
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };
  try {
    if (myCookieValue != null && userData != null) {
      const headers = {
        Authorization: `Bearer ${myCookieValue}`,
      };
      const response = await axios.post(
        `${AUTH_API_URL}/AuthUser/GetWarehouseRule`,
        reqObj,
        {
          headers: headers,
        }
      );
      responseBody.responseData = response.data;
      //console.log("The api res is: ", responseBody);
      return responseBody;
    } else {
      responseBody.hasError = true;
      responseBody.errorMessage = "UnAuthorise for add user";
      return responseBody;
    }
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors;
    return responseBody;
  }
};

export async function getPIData() {
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };

  try {
    const response = await axios.get(`${AUTH_API_URL}/Commons/PeriodIndicator`);
    responseBody.responseData = response.data;
    // console.log("response", response.data);
    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors;
    return responseBody;
  }
}

export async function getPROData(ObjType, indicatore) {
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };
  // console.log("indicatore", indicatore);
  try {
    var api_url = ``;
    if (indicatore == undefined)
      api_url = `${AUTH_API_URL}/Commons/Series?ObjType=${ObjType}`;
    else
      api_url = `${AUTH_API_URL}/Commons/Series?Indicator=${indicatore}&ObjType=${ObjType}`;
    const response = await axios.get(api_url);
    responseBody.responseData = response.data;
    // console.log("response", response.data);
    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors;
    return responseBody;
  }
}

export const saveUserSeries = async (reqObj) => {
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };
  try {
    const response = await axios.post(
      `${AUTH_API_URL}/UserWiseSeries/SaveUserWiseSeries`,
      reqObj
    );
    responseBody.responseData = response.data;
    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors;
    return responseBody;
  }
};

export async function getUserSeriesData(id) {
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };

  try {
    const response = await axios.post(
      `${AUTH_API_URL}/UserWiseSeries/GetUserWiseSeries`,
      id
    );
    responseBody.responseData = response.data;
    // console.log("response", response.data);
    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors;
    return responseBody;
  }
}

export async function getUserDetails() {
  const userData = localStorage.getItem("User");
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };

  try {
    const response = await axios.get(
      `${AUTH_API_URL}/AuthUser/GetUser?username=${userData}`
    );
    responseBody.responseData = response.data;
    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors;
    return responseBody;
  }
}

export async function editUserDetails(payload) {
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };

  try {
    const response = await axios.put(`${AUTH_API_URL}/AuthUser/Edit`, payload);
    responseBody.responseData = response.data;
    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors;
    return responseBody;
  }
}

export const changeUserPassword = async (reqObj) => {
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };
  try {
    const response = await axios.put(
      `${AUTH_API_URL}/AuthUser/ChangePassword`,
      reqObj
    );
    responseBody.responseData = response.data;
    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors;
    return responseBody;
  }
};
