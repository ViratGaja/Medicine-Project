import { useState } from "react";
import { USERS, kg } from "../data";

const MAX_ITEMS = 10;
const emptyRow = () => ({ key: Math.random(), ingredientId: "", grams: "" });

export default function MakeMedicine({ ingredients, onComplete }) {
  const [user, setUser] = useState(USERS[0]);
  const [medicine, setMedicine] = useState("");
  const [rows, setRows] = useState([emptyRow()]);
  const [errors, setErrors] = useState([]);
  const [done, setDone] = useState("");

  const byId = (id) => ingredients.find((i) => i.id === Number(id));

  function updateRow(key, patch) {
    setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)));
    setDone("");
  }

  function validate() {
    const problems = [];
    if (!medicine.trim()) problems.push("Enter the medicine name.");

    const seen = new Set();
    rows.forEach((r, n) => {
      const label = `Row ${n + 1}`;
      if (!r.ingredientId) return problems.push(`${label}: choose an ingredient.`);
      if (seen.has(r.ingredientId)) problems.push(`${label}: this ingredient is already added.`);
      seen.add(r.ingredientId);

      const grams = Number(r.grams);
      if (!grams || grams <= 0) return problems.push(`${label}: enter grams greater than 0.`);
      const ing = byId(r.ingredientId);
      if (grams > ing.stockG) {
        problems.push(`${label}: ${ing.name} has only ${ing.stockG} g, you need ${grams} g.`);
      }
    });
    return problems;
  }

  function submit() {
    const problems = validate();
    setErrors(problems);
    if (problems.length) return;

    const items = rows.map((r) => ({
      ingredientId: Number(r.ingredientId),
      name: byId(r.ingredientId).name,
      grams: Number(r.grams),
    }));
    onComplete({ user, medicine: medicine.trim(), items });
    setDone(`${medicine.trim()} completed. Stock updated.`);
    setMedicine("");
    setRows([emptyRow()]);
  }

  return (
    <>
      <h2>Make medicine</h2>

      <section className="panel">
        <div className="form-row">
          <label>
            Maker
            <select value={user} onChange={(e) => setUser(e.target.value)}>
              {USERS.map((u) => <option key={u}>{u}</option>)}
            </select>
          </label>
          <label className="grow">
            Medicine name
            <input value={medicine} onChange={(e) => setMedicine(e.target.value)} placeholder="e.g. Kabasura Kudineer" />
          </label>
        </div>

        <h3>Ingredients ({rows.length} of {MAX_ITEMS})</h3>
        {rows.map((r) => {
          const ing = byId(r.ingredientId);
          const left = ing ? ing.stockG - (Number(r.grams) || 0) : null;
          return (
            <div className="ing-row" key={r.key}>
              <select value={r.ingredientId} onChange={(e) => updateRow(r.key, { ingredientId: e.target.value })}>
                <option value="">Choose ingredient</option>
                {ingredients.map((i) => (
                  <option key={i.id} value={i.id}>{i.name} ({kg(i.stockG)})</option>
                ))}
              </select>
              <input
                type="number" min="0" placeholder="grams"
                value={r.grams}
                onChange={(e) => updateRow(r.key, { grams: e.target.value })}
              />
              <span className={left !== null && left < 0 ? "after bad" : "after"}>
                {ing ? `Left: ${left} g` : ""}
              </span>
              <button className="ghost" disabled={rows.length === 1}
                onClick={() => setRows((rs) => rs.filter((x) => x.key !== r.key))}>
                Remove
              </button>
            </div>
          );
        })}

        <div className="actions">
          <button className="ghost" disabled={rows.length >= MAX_ITEMS}
            onClick={() => setRows((rs) => [...rs, emptyRow()])}>
            Add ingredient
          </button>
          <button className="primary" onClick={submit}>Complete medicine</button>
        </div>

        {errors.length > 0 && (
          <ul className="errors">{errors.map((e) => <li key={e}>{e}</li>)}</ul>
        )}
        {done && <p className="success">{done}</p>}
      </section>
    </>
  );
}
