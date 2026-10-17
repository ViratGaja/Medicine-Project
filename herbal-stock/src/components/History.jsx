export default function History({ history }) {
  return (
    <>
      <h2>History</h2>
      {history.length === 0 && (
        <section className="panel"><p className="muted">No medicines made yet.</p></section>
      )}
      {history.map((h) => (
        <section className="panel" key={h.id}>
          <div className="hist-head">
            <b>{h.medicine}</b>
            <span className="muted">{h.user}, {new Date(h.date).toLocaleString()}</span>
          </div>
          <table>
            <tbody>
              {h.items.map((it) => (
                <tr key={it.ingredientId}>
                  <td>{it.name}</td>
                  <td className="num">{it.grams} g used</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </>
  );
}
