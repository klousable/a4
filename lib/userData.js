import { getToken } from "./authenticate";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchWithAuth(url, options = {}) {
  const token = getToken();
  if (!token) {
    console.error("No token found. Please log in.");
    return [];
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, { ...options, headers });

    console.log("Response Status:", response.status);

    // const clonedResponse = response.clone();
    // const text = await clonedResponse.text();
    // console.log("Response Body:", text);

    if (response.status === 200) {
      return await response.json();
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return [];
    }
  } catch (error) {
    console.error("Fetch Error: ", error);
    return [];
  }
}

export async function addToFavourites(id) {
  return fetchWithAuth(`${BASE_URL}/favourites/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id }),
  });
}

export async function removeFromFavourites(id) {
  return fetchWithAuth(`${BASE_URL}/favourites/${id}`, {
    method: "DELETE",
  });
}

export async function getFavourites() {
  return fetchWithAuth(`${BASE_URL}/favourites`, {
    method: "GET",
  });
}

export async function addToHistory(id) {
  return fetchWithAuth(`${BASE_URL}/history/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id }),
  });
}

export async function removeFromHistory(id) {
  return fetchWithAuth(`${BASE_URL}/history/${id}`, {
    method: "DELETE",
  });
}

export async function getHistory() {
  return fetchWithAuth(`${BASE_URL}/history`, {
    method: "GET",
  });
}
