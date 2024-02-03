import "./App.css";
import Convertor from "./Components/Convertor/Convertor";
import Header from "./Components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <h1 className="App__title">Ht Currency Convertor</h1>

        <Convertor />
      </main>
    </div>
  );
}

export default App;
