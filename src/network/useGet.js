import { useEffect } from "react";
import GLOBAL_NETWORK_API_URL_AND_DELAY from "./netwokDelay";

function useGet(url, respHandler) {

  useEffect(() => {
    // Create AbortController to terminate the fetching if the user leaves the page before result is obtained 
    console.log("Called Get");
    if(url){
      console.log("Called Get 1");
      const abortCont = new AbortController();

      setTimeout(() => {
        fetch(`${GLOBAL_NETWORK_API_URL_AND_DELAY["base_url"]}${url}`, {
          signal: abortCont.signal
        })
        .then((res) => {
          if(res.status === 200){
            return res.json();
          }
          else{
            console.log(`RETURNED STATUS: ${res.status}`);
            throw Error("The data you tried to get doesn't seem to exist.");
          }
        })
        .then((data) => {
            console.log("Finished alright.");
            respHandler(200, data);
        })
        .catch((err) => {
          if(err.name === "AbortError"){
            console.log("Left page before delete could finish");
          }
          else{
            console.log(`====> ${err.message}`);
            respHandler(404, err.message);
          }
        });

      }, GLOBAL_NETWORK_API_URL_AND_DELAY["delay"]);

      return () => abortCont.abort();
    }
    // eslint-disable-next-line
  }, [url]);
  
}

export default useGet;








// import { useState, useEffect } from "react";
// import GLOBAL_NETWORK_API_URL_AND_DELAY from "./netwokDelay";

// function useGet(url) {
//   const [jsonData, setJsonData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [fetchErr, setFetchErr] = useState(null);

//   useEffect(() => {
//     // Create AbortController to terminate the fetching if the user leaves the page before result is obtained 
//     const abortCont = new AbortController();

//     setTimeout(() => {
//       fetch(`${GLOBAL_NETWORK_API_URL_AND_DELAY["base_url"]}${url}`, {signal: abortCont.signal})
//       .then((res) => {
//         if(res.status === 200){
//           return res.json();
//         }
//         throw Error("The data requested does not exist");
//       })
//       .then((data) => {
//         setIsLoading(false);
//         setJsonData(data);
//         setFetchErr(null);
//       })
//       .catch((err) => {
//         if(err.name === "AbortError"){
//           console.log("Left page before data could load");
//         }
//         else{
//           setIsLoading(false);
//           setFetchErr(err.message);
//           setJsonData(null);
//         }
//       });

//     }, GLOBAL_NETWORK_API_URL_AND_DELAY["delay"]);

//     return () => abortCont.abort();
//   }, [url]);

//   return { jsonData, isLoading, fetchErr };
// }

// export default useGet;

