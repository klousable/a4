import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "../store";
import { getFavourites, getHistory } from "../lib/userData";
import { isAuthenticated } from "@/lib/authenticate";

const PUBLIC_PATHS = ["/login", "/", "/_error", "/register"];

export default function RouteGuard(props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [_, setFavourites] = useAtom(favouritesAtom);
  const [__, setSearchHistory] = useAtom(searchHistoryAtom);

  async function updateAtoms() {
    console.log("updateAtoms is being called"); // Log when the function is triggered
    try {
      const [favourites, searchHistory] = await Promise.all([
        getFavourites(),
        getHistory(),
      ]);

      // Log the actual arrays
      console.log("Favourites:", favourites.favourites); // Log the favourites array
      console.log("Search History:", searchHistory.history); // Log the history array

      // Update the atoms with just the arrays (not the full object)
      setFavourites(favourites.favourites); // Set the favourites atom with the array of favourites
      setSearchHistory(searchHistory.history); // Set the searchHistory atom with the array of history
    } catch (err) {
      console.error("Error updating atoms:", err);
    }
  }

  useEffect(() => {
    // Prevent running updateAtoms if the component has already been mounted and data is set
    if (authorized) return; // Don't call updateAtoms again if already authorized

    console.log("useEffect triggered");

    // Ensure updateAtoms runs only once at the start
    updateAtoms();

    // on initial load - run auth check
    authCheck(router.pathname);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [router.pathname, authorized]); // Include `authorized` to avoid infinite rerender

  async function authCheck(url) {
    const path = url.split("?")[0];
    console.log(`Checking path: ${path}`);

    // If not a public path and user is not authenticated, redirect to login
    if (!PUBLIC_PATHS.includes(path) && !isAuthenticated()) {
      console.log("Redirecting to login...");
      setAuthorized(false);
      router.push("/login");
    } else {
      // If user is authenticated, set to authorized
      setAuthorized(true);
    }
  }

  if (!authorized) {
    return null; // Prevent rendering if not authorized
  }

  return <>{props.children}</>;
}
