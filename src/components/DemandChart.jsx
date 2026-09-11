import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DemandChart = ({ data }) => {
  return (
    <div className="chart-card">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#dfe7df" />
          <XAxis dataKey="crop" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="demand" radius={[8, 8, 0, 0]} fill="#1d6f42" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DemandChart;
