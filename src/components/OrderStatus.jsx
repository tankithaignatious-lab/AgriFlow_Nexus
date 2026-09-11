const statuses = [
  'Demand Created',
  'Supply Matched',
  'Order Confirmed',
  'Pickup',
  'In Transit',
  'Delivered',
];

const OrderStatus = ({ steps = statuses, currentStep = 3 }) => {
  return (
    <div className="order-status">
      {steps.map((step, index) => (
        <div key={step} className={`status-step ${index <= currentStep ? 'status-step--active' : ''}`}>
          <span className="status-step__dot" />
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
};

export default OrderStatus;
