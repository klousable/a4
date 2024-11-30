import { jwtDecode } from "jwt-decode";
const dotenv = require("dotenv");
dotenv.config();

function setToken(token) {
  localStorage.setItem("access_token", token);
}

export async function authenticateUser(user, password) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ userName: user, password: password }),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      const token = data.token;
      setToken(token);
      return true;
    } else {
      // Handle cases where the response is not 200
      const errorMessage = data.message || "Authentication failed";
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Authentication failed:", error.message);
    throw error;
  }
}

export async function registerUser(user, password, password2) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      body: JSON.stringify({
        userName: user,
        password: password,
        password2: password2,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    const text = await res.text(); // Read response as text
    console.log("Response Text:", text);

    if (res.status === 200) {
      return true;
    } else {
      let data;
      try {
        data = JSON.parse(text);
        throw new Error(data.message || "Registration failed");
      } catch (err) {
        throw new Error("Unexpected response format: " + text);
      }
    }
  } catch (error) {
    console.error("Registration failed:", error.message);
    throw error;
  }
}

export function isAuthenticated() {
  const token = readToken();
  return token ? true : false;
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (err) {
    return null;
  }
}

export function getToken() {
  try {
    return localStorage.getItem("access_token");
  } catch (err) {
    return null;
  }
}

export function removeToken() {
  localStorage.removeItem("access_token");
}
