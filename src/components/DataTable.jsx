const DataTable = ({ columns, rows = [], emptyMessage = 'No data available.' }) => {
  if (!rows.length) {
    return <div className="table-empty">{emptyMessage}</div>;
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key || column.label}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || `${row.name || 'row'}-${index}`}>
              {columns.map((column) => (
                <td key={`${row.id || index}-${column.key || column.label}`}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
