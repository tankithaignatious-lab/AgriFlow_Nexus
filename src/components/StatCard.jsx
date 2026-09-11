const StatCard = ({ title, value, subtitle, trend, accent = 'green' }) => (
  <div className="stat-card">
    <div className="stat-card__header">
      <span className={`stat-card__dot stat-card__dot--${accent}`} />
      <span>{title}</span>
    </div>
    <div className="stat-card__value">{value}</div>
    <div className="stat-card__meta">
      {subtitle}
      {trend ? <span className="trend-pill">{trend}</span> : null}
    </div>
  </div>
);

export default StatCard;
