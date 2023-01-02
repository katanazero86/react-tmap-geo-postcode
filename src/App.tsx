import "./App.css";
import TmapGeoPostcode from "./components/TmapGeoPostcode";

function App() {
  return (
    <div className="App">
      <TmapGeoPostcode
        appKey={""}
        count={10}
        onSuccess={(targetRow) => console.log(targetRow)}
      />
    </div>
  );
}

export default App;
