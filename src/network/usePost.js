import { useEffect } from "react";
import GLOBAL_NETWORK_API_URL_AND_DELAY from "./netwokDelay";

function usePost(url, formData, respHandler) {

  useEffect(() => {
    // Create AbortController to terminate the fetching if the user leaves the page before result is obtained 
    console.log("Called Post");
    if(formData){
      console.log("Called Post 1");
      const abortCont = new AbortController();

      setTimeout(() => {
        fetch(`${GLOBAL_NETWORK_API_URL_AND_DELAY["base_url"]}${url}`, {
          signal: abortCont.signal,
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(formData)
        })
        .then((res) => {
          if(res.status === 201){
            console.log("Finished alright.");
            respHandler(res.status);
          }
          else{
            console.log(`RETURNED STATUS: ${res.status}`);
            throw Error("The data you tried to create doesn't seem to be valid.");
          }
        })
        .catch((err) => {
          if(err.name === "AbortError"){
            console.log("Left page before data could load");
          }
          else{
            console.log(`====> ${err.message}`);
            respHandler(err.message);
          }
        });

      }, GLOBAL_NETWORK_API_URL_AND_DELAY["delay"]);

      return () => abortCont.abort();
    }
  }, [url, formData, respHandler]);
  
}

export default usePost;