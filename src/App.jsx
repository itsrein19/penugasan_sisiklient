import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux"; // Mengimpor Provider dari react-redux
import store from "./Redux/Store"; // Mengimpor store dari file Store
import "./App.css";
import RouteList from "./RouteList";


function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={RouteList} />
    </Provider>
  );
}

export default App;
