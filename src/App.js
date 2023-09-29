import { Switch, Route } from "react-router-dom/cjs/react-router-dom";
import AllMeetupsPage from "./pages/AllMeetups";
import NewMeetupPage from "./pages/NewMeetup";
import FavoritesPage from "./pages/Favorites";
import Layout from "./components/layout/Layout";


function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <AllMeetupsPage />
        </Route>
        <Route exact path="/new-meetup">
          <NewMeetupPage />
        </Route>
        <Route path="/favorites">
          <FavoritesPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
