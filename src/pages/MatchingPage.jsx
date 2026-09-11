import DashboardLayout from '../layouts/DashboardLayout';
import { matchResults } from '../data/mockData';

const MatchingPage = () => {
  const selected = matchResults[0];

  return (
    <DashboardLayout role="Buyer" title="Matching">
      <div className="section-block">
        <div className="section-header">
          <h3>Buyer Requirement</h3>
        </div>
        <div className="requirement-card">
          <h4>Tomato</h4>
          <div className="requirement-grid">
            <div><span>Quantity</span><strong>2,000 kg</strong></div>
            <div><span>Required by</span><strong>16 Sep</strong></div>
            <div><span>Grade</span><strong>Grade A</strong></div>
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Quantity</th>
                <th>Distance</th>
                <th>Price</th>
                <th>Quality</th>
                <th>Match Score</th>
              </tr>
            </thead>
            <tbody>
              {matchResults.map((supplier) => (
                <tr key={supplier.supplier}>
                  <td>{supplier.supplier}</td>
                  <td>{supplier.quantity}</td>
                  <td>{supplier.distance}</td>
                  <td>{supplier.price}</td>
                  <td>{supplier.quality}</td>
                  <td>{supplier.matchScore}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="explain-card">
          <h4>Why matched?</h4>
          <div className="checklist">
            <div>Quantity Fit <span>✓</span></div>
            <div>Price Compatibility <span>✓</span></div>
            <div>Distance <span>✓</span></div>
            <div>Quality <span>✓</span></div>
            <div>Delivery Window <span>✓</span></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MatchingPage;
