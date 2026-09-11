import DashboardLayout from '../../layouts/DashboardLayout';
import { matchResults } from '../../data/mockData';

const BuyerMatchesPage = () => {
  return (
    <DashboardLayout role="buyer" title="Matched Supply">
      <div className="section-block">
        <div className="section-header">
          <h3>Ranked Suppliers</h3>
        </div>
        <div className="match-list">
          {matchResults.map((item) => (
            <div key={item.supplier} className="match-details-card">
              <div className="match-card__top">
                <h4>{item.supplier}</h4>
                <span className="score-badge">{item.matchScore}%</span>
              </div>
              <div className="match-card__meta">
                <span>{item.quantity}</span>
                <span>{item.distance}</span>
                <span>{item.price}</span>
                <span>{item.quality}</span>
              </div>
              <div className="checklist">
                <div>Quantity Fit <span>✓</span></div>
                <div>Price Compatibility <span>✓</span></div>
                <div>Distance <span>✓</span></div>
                <div>Quality <span>✓</span></div>
                <div>Delivery Window <span>✓</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BuyerMatchesPage;
