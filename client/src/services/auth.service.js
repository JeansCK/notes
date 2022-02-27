import axios from "axios";

const register = (username, email, password) => {
  return axios.post(process.env.REACT_APP_API_URL + "/auth/signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(process.env.REACT_APP_API_URL + "/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const exportObj = {
  register,
  login,
  logout,
  getCurrentUser
}

export default exportObj;