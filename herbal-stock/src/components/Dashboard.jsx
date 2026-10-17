import { LOW_STOCK_G, kg } from "../data";

export default function Dashboard({ ingredients, history }) {
  const totalG = ingredients.reduce((sum, i) => sum + i.stockG, 0);
  const low = ingredients.filter((i) => i.stockG < LOW_STOCK_G).sort((a, b) => a.stockG - b.stockG);
  const recent = history.slice(0, 5);

  return (
    <>
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="stat"><b>{ingredients.length}</b><span>Ingredients</span></div>
        <div className="stat"><b>{(totalG / 1000).toFixed(0)} kg</b><span>Total stock</span></div>
        <div className="stat"><b>{history.length}</b><span>Medicines made</span></div>
        <div className={low.length ? "stat warn" : "stat"}><b>{low.length}</b><span>Low stock</span></div>
      </div>

      <div className="two-col">
        <section className="panel">
          <h3>Low stock (under {LOW_STOCK_G} g)</h3>
          {low.length === 0 ? (
            <p className="muted">Nothing is running low.</p>
          ) : (
            <table>
              <tbody>
                {low.slice(0, 8).map((i) => (
                  <tr key={i.id}><td>{i.name}</td><td className="num">{kg(i.stockG)}</td></tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="panel">
          <h3>Recent medicines</h3>
          {recent.length === 0 ? (
            <p className="muted">No medicine made yet. Open "Make medicine" to start.</p>
          ) : (
            <table>
              <tbody>
                {recent.map((h) => (
                  <tr key={h.id}>
                    <td>{h.medicine}</td>
                    <td>{h.user}</td>
                    <td className="num">{h.items.length} items</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </>
  );
}
