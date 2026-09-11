import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MarketPriceChart = ({ data }) => {
  return (
    <div className="chart-card">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#dfe7df" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Tomato" stroke="#1d6f42" strokeWidth={3} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="Onion" stroke="#a5d6a7" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="Potato" stroke="#2b7a4b" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketPriceChart;
