import {
  Database,
  Brain,
  Bookmark
} from "lucide-react";

function Stats() {

  const stats = [
    {
      icon: <Database size={32} />,
      title: "Research Papers",
      value: "500+",
      color: "text-blue-600",
    },
    {
      icon: <Brain size={32} />,
      title: "AI Summaries",
      value: "Gemini AI",
      color: "text-green-600",
    },
    {
      icon: <Bookmark size={32} />,
      title: "Semantic Search",
      value: "FAISS",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">

      {stats.map((item, index) => (

        <div
          key={index}
          className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition"
        >

          <div className={item.color}>
            {item.icon}
          </div>

          <h3 className="text-2xl font-bold mt-5">
            {item.value}
          </h3>

          <p className="text-gray-600 mt-2">
            {item.title}
          </p>

        </div>

      ))}

    </div>
  );
}

export default Stats;