import { useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import useGet from "../network/useGet";


function AllMeetupsPage() {
  // const { jsonData, isLoading, fetchErr } = useGet("meetups");

  const [jsonData, setJsonData] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [fetchErr, setFetchErr] = useState(null);

  useGet("meetups", respHandler);
  function respHandler(status, msg){
    setIsLoading(false);
    if(status === 200){
      setFetchErr(null);
      setJsonData(msg);
    }
    else{
      setJsonData(null);
      setFetchErr(msg);
    }
  }

  return (
    <section>
      <h1>All Meetups</h1>

      {isLoading && <div>Loading data...</div>}
      {fetchErr && <div>{fetchErr}</div>}
      {jsonData && <MeetupList meetups={jsonData} setMeetups={setJsonData} />}
    </section>
  );
}

export default AllMeetupsPage;