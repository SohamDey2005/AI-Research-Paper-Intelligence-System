import { Link } from "react-router-dom";
import {
  User,
  Calendar,
  Tag,
  ArrowRight,
  FileText
} from "lucide-react";

function PaperCard({ paper }) {

  const similarity = Math.round((paper.similarity || 0) * 100);

  const preview =
    paper.abstract && paper.abstract.length > 220
      ? paper.abstract.substring(0, 220) + "..."
      : paper.abstract;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-7 border border-gray-200">

      {/* Title */}

      <div className="flex items-start gap-3">

        <FileText
          className="text-blue-600 mt-1"
          size={26}
        />

        <h2 className="text-2xl font-bold text-gray-800 leading-tight">
          {paper.title}
        </h2>

      </div>

      {/* Authors */}

      <div className="mt-5 flex items-center gap-2 text-gray-600">

        <User size={18} />

        <span>{paper.authors}</span>

      </div>

      {/* Category & Date */}

      <div className="mt-4 flex flex-wrap gap-6">

        <div className="flex items-center gap-2 text-gray-600">

          <Tag size={18} />

          {paper.categories}

        </div>

        <div className="flex items-center gap-2 text-gray-600">

          <Calendar size={18} />

          {paper.published}

        </div>

      </div>

      {/* Abstract */}

      {preview && (

        <div className="mt-6">

          <h3 className="font-semibold text-gray-800 mb-2">

            Abstract Preview

          </h3>

          <p className="text-gray-600 leading-7">

            {preview}

          </p>

        </div>

      )}

      {/* Similarity */}

      <div className="mt-7">

        <div className="flex justify-between mb-2">

          <span className="font-medium text-gray-700">

            Similarity

          </span>

          <span className="font-semibold text-blue-700">

            {similarity}%

          </span>

        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{
              width: `${similarity}%`
            }}
          />

        </div>

      </div>

      {/* Button */}

      <div className="mt-8 flex justify-end">

        <Link
          to={`/paper/${paper.id}`}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >

          View Details

          <ArrowRight size={18} />

        </Link>

      </div>

    </div>
  );
}

export default PaperCard;