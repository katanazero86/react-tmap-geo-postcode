import "./App.css";
import TmapGeoPostcode from "./components/TmapGeoPostcode";

function App() {
  return (
    <div className="App">
      <TmapGeoPostcode
        appKey={"l7xx5680091346d34dd69f230143577d1e37"}
        count={10}
        onSuccess={(targetRow) => console.log(targetRow)}
      />
    </div>
  );
}

export default App;
