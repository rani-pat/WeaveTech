import axios from "axios";
import { AUTH_API_URL } from "./auth";

export const getCreateProData = async () => {
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };
  try {
    const res = await axios.get(
      `${AUTH_API_URL}/ProductionOrder/DisplayProOrd`
    );
    const returnData = await res.data;
    responseBody.responseData = returnData;

    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage = responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors;
    return responseBody;
  }
};

export const getAllProductionData = async (branchId, ProId) => {
  branchId = 1;
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };

  try {
    const res = await axios.get(
      `${AUTH_API_URL}/ProductionOrder/GetProductionDetails?BranchId=${branchId}&ProId=${ProId}`
    );
    const returnData = await res.data;
    responseBody.responseData = returnData;

    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage =
      error.response?.data?.statusMsg || error.response?.data?.errors;

    return responseBody;
  }
};
