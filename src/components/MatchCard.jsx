const MatchCard = ({ buyer, quantity, distance, price, date, score, onView }) => {
  return (
    <div className="match-card">
      <div className="match-card__top">
        <div>
          <h4>{buyer}</h4>
          <p>{quantity}</p>
        </div>
        <span className="score-badge">{score}% Match</span>
      </div>
      <div className="match-card__meta">
        <span>{distance}</span>
        <span>{price}</span>
        <span>{date}</span>
      </div>
      <button type="button" className="text-button" onClick={onView}>View Details</button>
    </div>
  );
};

export default MatchCard;
