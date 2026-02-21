import "./App.css";
import { Header } from "./components/Header";
import { Selectors } from "./components/Selectors";
import { Stats } from "./components/Stats";

function App() {
    return (
        <div className="flex flex-col gap-5">
            <Header />
            <Stats />
            <Selectors />
        </div>
    );
}

export default App;
