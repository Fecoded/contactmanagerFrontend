import {
  GET_CONTACTS,
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  CONTACT_ERROR,
} from './contact.types';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

// GET USER CONTACTS
export const getContacts = (pagination) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`/api/user/contact/get-all/`);

    dispatch({
      type: GET_CONTACTS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.data.message,
    });
  }
};

// ADD CONTACT
export const addContact = (formData) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/user/contact/add', formData, config);

    dispatch({
      type: ADD_CONTACT,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.data.message,
    });
  }
};

// UPDATE CONTACT
export const updateContact = (formData) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(
      `/api/user/contact/update/${formData.id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_CONTACT,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.data.message,
    });
  }
};

// DELETE CONTACT
export const deleteContact = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    await axios.delete(`/api/user/contact/delete/${id}`);

    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.data.message,
    });
  }
};

// GET CURRENT CONTACT
export const getCurrentContact = (contact) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT,
    payload: contact,
  });
};

// CLEAR CURRENT CONTACT
export const clearCurrent = () => async (dispatch) => {
  dispatch({ type: CLEAR_CURRENT });
};
