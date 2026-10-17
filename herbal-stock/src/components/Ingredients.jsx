import { useState } from "react";
import { LOW_STOCK_G, kg } from "../data";

export default function Ingredients({ ingredients, setIngredients }) {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [amountKg, setAmountKg] = useState("");

  const shown = ingredients.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));

  function addIngredient() {
    //It changes the kg you typed into grams
    const grams = Math.round(Number(amountKg) * 1000);
    if (!name.trim() || !grams || grams <= 0) return;
    const nextId = Math.max(0, ...ingredients.map((i) => i.id)) + 1;
    setIngredients([...ingredients, { id: nextId, name: name.trim(), stockG: grams }]);
    setName("");
    setAmountKg("");
  }

  function addStock(ing) {
    const input = window.prompt(`Add how many kg to ${ing.name}?`);
    const grams = Math.round(Number(input) * 1000);
    if (!grams || grams <= 0) return;
    setIngredients(ingredients.map((i) => (i.id === ing.id ? { ...i, stockG: i.stockG + grams } : i)));
  }

  return (
    <>
      <h2>Ingredients</h2>

      <section className="panel">
        <h3>Add new ingredient</h3>
        <div className="form-row">
          <label className="grow">
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Stock (kg)
            <input type="number" min="0" step="0.1" value={amountKg} onChange={(e) => setAmountKg(e.target.value)} />
          </label>
          <button className="primary" onClick={addIngredient}>Add ingredient</button>
        </div>
      </section>

      <section className="panel">
        <input className="search" placeholder="Search ingredient" value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>#</th><th>Name</th><th className="num">Stock</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {shown.map((i) => (
                <tr key={i.id}>
                  <td>{i.id}</td>
                  <td>{i.name}</td>
                  <td className="num">{kg(i.stockG)}</td>
                  <td>{i.stockG < LOW_STOCK_G ? <span className="tag low">Low</span> : <span className="tag ok">OK</span>}</td>
                  <td><button className="ghost small" onClick={() => addStock(i)}>Add stock</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
