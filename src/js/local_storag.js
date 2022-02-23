const saveOnLocalStorag = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    return null;
  }
};

const getOnLocalStorage = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return null;
  }
};

const removeOnLocalStorage = key => {
  try {
    return localStorage.removeItem(key);
  } catch (error) {
    return null;
  }
};

export { saveOnLocalStorag, getOnLocalStorage, removeOnLocalStorage };
