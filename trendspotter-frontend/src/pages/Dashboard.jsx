import { useEffect, useState } from "react";
import { loadJSON, loadCSV } from "../utils/loadData";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [categories, setCategories] = useState([]);
  const [demographics, setDemographics] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const json = await loadJSON("/data/trendspotter_analysis.json");
      const cat = await loadCSV("/data/category_trends_enhanced.csv");
      const demo = await loadCSV("/data/demographic_analysis.csv");
      setSummary(json);
      setCategories(cat);
      setDemographics(demo);
    }
    fetchData();
  }, []);

  if (!summary) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">L'Oréal Trendspotter Dashboard</h1>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded-lg">Total Videos: {summary.total_videos}</div>
        <div className="p-4 bg-white shadow rounded-lg">Unique Keywords: {summary.unique_keywords}</div>
        <div className="p-4 bg-white shadow rounded-lg">Avg Engagement: {summary.avg_engagement}</div>
      </div>

      {/* Demographics Pie */}
      <div className="bg-white shadow p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Demographic Breakdown</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={demographics}
            dataKey="count"
            nameKey="demographic"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {demographics.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={["#8884d8", "#82ca9d", "#ffc658"][idx % 3]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Top Categories */}
      <div className="bg-white shadow p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Top Categories</h2>
        <BarChart width={600} height={300} data={categories.slice(0,5)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avg_engagement" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}
