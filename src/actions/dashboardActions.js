import axios from "axios";
import { API_BASE_URL } from "../constants";
import { checkResponseAuthHeaders, getHeaderConfigWithTokens } from "../utils";
import { showAlert } from "./alertActions";
import {
  FETCH_HADMIN_APPOINTMENT_TO_MONTH_METRICS,
  FETCH_HADMIN_APPOINTMENT_TO_STATUS_METRICS,
  FETCH_ADMIN_USERS_TO_MONTH_METRICS,
  FETCH_ADMIN_APPOINTMENTS_TO_MONTH_METRICS,
} from "../constants/reducerConstants";
const BASE_URL = `${API_BASE_URL}`;

export const getHospitalAdminDashboardMetrics = (values, history) => async (
  dispatch
) => {
  let { hospitalId } = values;
  await getHospitalAdminAppointmentMetrics(hospitalId, dispatch, history);
};

const getHospitalAdminAppointmentMetrics = async (
  hospitalId,
  dispatch,
  history
) => {
  try {
    let config = getHeaderConfigWithTokens();
    if (config) {
      let appointmentMetrics = await axios.get(
        `${BASE_URL}/hospital/metrics/appointment/${hospitalId}`,
        config
      );
      let tokens = checkResponseAuthHeaders(appointmentMetrics.headers);
      if (!tokens) {
        dispatch(showAlert({ type: "error", content: "Error with tokens" }));
        history.replace("/");
      }
    } else {
      history.replace("/");
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAdminDashboardMetrics = (values, history) => async (
  dispatch
) => {
  await getUsersMetrics(dispatch, history);
  await getAdminAppointmentMetrics(dispatch, history);
};

const getUsersMetrics = async (dispatch, history) => {
  try {
    let config = getHeaderConfigWithTokens();
    if (config) {
      let userMetrics = await axios.get(
        `${BASE_URL}/admin/metrics/users`,
        config
      );
      console.log(userMetrics);
    } else {
      history.replace("/");
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAdminAppointmentMetrics = async (dispatch, history) => {
  try {
    let config = getHeaderConfigWithTokens();
    if (config) {
      let appointmentMetrics = await axios.get(
        `${BASE_URL}/admin/metrics/appointments`,
        config
      );
      console.log(appointmentMetrics);

      let tokens = checkResponseAuthHeaders(appointmentMetrics.headers);
      if (!tokens) {
        dispatch(showAlert({ type: "error", content: "Error with tokens" }));
        history.replace("/");
      }
      // dispatch({
      //   type: FETCH_HADMIN_APPOINTMENT_TO_STATUS_METRICS,
      //   payload: pieChartData,
      // });
    } else {
      history.replace("/");
    }
  } catch (err) {
    console.log(err);
  }
};
