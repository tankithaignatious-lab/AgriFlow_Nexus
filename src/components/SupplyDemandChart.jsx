import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SupplyDemandChart = ({ data }) => {
  return (
    <div className="chart-card">
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="supplyFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1d6f42" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#1d6f42" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#dfe7df" />
          <XAxis dataKey="crop" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="supply" stackId="1" stroke="#1d6f42" fill="url(#supplyFill)" />
          <Area type="monotone" dataKey="demand" stackId="1" stroke="#23483a" fill="#dff1e2" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SupplyDemandChart;
