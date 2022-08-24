const apiUrl = process.env.REACT_APP_API_URL;

export const fetchGetJson = async (url) => {
  try {
    const response = await fetch(apiUrl + url);
    const data = await response.json();
    return [response, data];
  } catch (error) {
    return error;
  }
};

export const fetchPutJson = async (url, userName) => {
  try {
    const response = await fetch(apiUrl + url, {
      method: "PUT",
      body: JSON.stringify({
        name: userName,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    return [response, data];
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
