import { useEffect } from "react";
import GLOBAL_NETWORK_API_URL_AND_DELAY from "./netwokDelay";

function useDelete(url, respHandler) {

  useEffect(() => {
    // Create AbortController to terminate the fetching if the user leaves the page before result is obtained 
    console.log("Called Delete");
    if(url){
      console.log("Called Delete 1");
      const abortCont = new AbortController();

      setTimeout(() => {
        console.log(`DELETE URL: ${GLOBAL_NETWORK_API_URL_AND_DELAY["base_url"]}${url}`);
        fetch(`${GLOBAL_NETWORK_API_URL_AND_DELAY["base_url"]}${url}`, {
          signal: abortCont.signal,
          method: "DELETE"
        })
        .then((res) => {
          if(res.status === 200){
            console.log("Finished alright.");
            respHandler(res.status);
          }
          else{
            console.log(`DELETE RETURNED STATUS: ${res.status}`);
            throw Error("The data you tried to delete doesn't seem to exist.");
          }
        })
        .catch((err) => {
          if(err.name === "AbortError"){
            console.log("Left page before delete could finish");
          }
          else{
            console.log(`====> ${err.message}`);
            respHandler(err.message);
          }
        });

      }, GLOBAL_NETWORK_API_URL_AND_DELAY["delay"]);

      return () => abortCont.abort();
    }
  }, [url, respHandler]);
  
}

export default useDelete;