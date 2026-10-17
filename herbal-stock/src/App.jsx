import { useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { makeSeedIngredients } from "./data";
import Dashboard from "./components/Dashboard";
import MakeMedicine from "./components/MakeMedicine";
import Ingredients from "./components/Ingredients";
import History from "./components/History";

const TABS = ["Dashboard", "Make medicine", "Ingredients", "History"];

export default function App() {
  const [tab, setTab] = useState("Dashboard");
  const [ingredients, setIngredients] = useLocalStorage("hs_ingredients", makeSeedIngredients());
  const [history, setHistory] = useLocalStorage("hs_history", []);

  // Called when a user finishes a medicine: reduce stock + save a record
  function completeMedicine({ user, medicine, items }) {
    setIngredients((list) =>
      list.map((ing) => {
        const used = items.find((it) => it.ingredientId === ing.id);
        return used ? { ...ing, stockG: ing.stockG - used.grams } : ing;
      })
    );
    setHistory((h) => [
      { id: Date.now(), date: new Date().toISOString(), user, medicine, items },
      ...h,
    ]);
  }

  function resetAll() {
    if (!window.confirm("Reset all stock and history to the starting data?")) return;
    setIngredients(makeSeedIngredients());
    setHistory([]);
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <h1 className="brand">Herbal Stock</h1>
        <nav>
          {TABS.map((t) => (
            <button key={t} className={t === tab ? "nav active" : "nav"} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </nav>
        <button className="reset" onClick={resetAll}>Reset demo data</button>
      </aside>

      <main className="content">
        {tab === "Dashboard" && <Dashboard ingredients={ingredients} history={history} />}
        {tab === "Make medicine" && (
          <MakeMedicine ingredients={ingredients} onComplete={completeMedicine} />
        )}
        {tab === "Ingredients" && (
          <Ingredients ingredients={ingredients} setIngredients={setIngredients} />
        )}
        {tab === "History" && <History history={history} />}
      </main>
    </div>
  );
}
