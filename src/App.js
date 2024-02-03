import "./App.css";
import Convertor from "./Components/Convertor/Convertor";
import Header from "./Components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />

      <h1 className="App__title">Ht Currency Convertor</h1>

      <Convertor />
    </div>
  );
}

export default App;
