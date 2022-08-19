const apiUrl = process.env.REACT_APP_API_URL;

export const fetchGetRes = (url) => {
  try {
    return fetch(apiUrl + url);
  } catch (error) {
    return error;
  }
};

export const fetchPutRes = (url, userName) => {
  try {
    return fetch(apiUrl + url, {
      method: "PUT",
      body: JSON.stringify({
        name: userName,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
  } catch (error) {
    return error;
  }
};

export const fetchDeleteRes = (url) => {
  try {
    return fetch(apiUrl + url, { method: "DELETE" });
  } catch (error) {
    return error;
  }
};

export const fetchPostRes = (url, newUserName) => {
  try {
    return fetch(apiUrl + url, {
      method: "POST",
      body: JSON.stringify(newUserName),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return error;
  }
};
