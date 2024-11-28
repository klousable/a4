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
      setToken(data.token);
      return true;
    } else {
      throw new Error(data.message);
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

    // Log the response for debugging
    const text = await res.text(); // Read response as text
    console.log("Response Text:", text);

    // Check if the response status is 200 and parse JSON
    if (res.status === 200) {
      return true;
    } else {
      // If the response is not JSON, throw an error with the raw response
      let data;
      try {
        // Try parsing the response as JSON
        data = JSON.parse(text);
        throw new Error(data.message || "Registration failed");
      } catch (err) {
        // If the response is not valid JSON, log and throw a custom error
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
