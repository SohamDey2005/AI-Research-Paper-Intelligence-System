import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Copy,
  Download,
  BookmarkPlus,
  Calendar,
  Users,
  Tag,
  Sparkles,
  FileText
} from "lucide-react";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

function PaperDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [paper, setPaper] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaper();
  }, []);

  async function fetchPaper() {
    try {
      const response = await api.get(`/paper/${id}`);

      setPaper(response.data);
    } catch (error) {
      console.log(error);

      toast.error("Unable to load paper.");
    }

    setLoading(false);
  }

  async function savePaper() {
    try {
      await api.post("/saved/", {
        paper_id: paper.id,
        title: paper.title,
        authors: paper.authors,
        categories: paper.categories,
        published: paper.published,
      });

      toast.success("Paper saved successfully.");
    } catch {
      toast.error("Paper already exists.");
    }
  }

  function copySummary() {
    navigator.clipboard.writeText(paper.summary);

    toast.success("Summary copied.");
  }

  function downloadSummary() {
    const blob = new Blob([paper.summary], {
      type: "text/plain",
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "paper_summary.txt";

    a.click();

    window.URL.revokeObjectURL(url);

    toast.success("Summary downloaded.");
  }

  if (loading)
    return <Loading />;

  if (!paper)
    return <div>Paper not found.</div>;

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Search
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">

          {/* Title */}

          <h1 className="text-4xl font-bold text-gray-800 leading-tight">
            {paper.title}
          </h1>

          {/* Metadata */}

          <div className="grid md:grid-cols-3 gap-5 mt-8">

            <div className="bg-gray-50 rounded-xl p-5">

              <div className="flex items-center gap-2 font-semibold">

                <Users size={20} />

                Authors

              </div>

              <p className="mt-3 text-gray-600">
                {paper.authors}
              </p>

            </div>

            <div className="bg-gray-50 rounded-xl p-5">

              <div className="flex items-center gap-2 font-semibold">

                <Tag size={20} />

                Category

              </div>

              <p className="mt-3 text-gray-600">
                {paper.categories}
              </p>

            </div>

            <div className="bg-gray-50 rounded-xl p-5">

              <div className="flex items-center gap-2 font-semibold">

                <Calendar size={20} />

                Published

              </div>

              <p className="mt-3 text-gray-600">
                {paper.published}
              </p>

            </div>

          </div>

          {/* AI Summary */}

          <div className="mt-10">

            <div className="flex justify-between items-center">

              <h2 className="text-2xl font-bold flex items-center gap-2">

                <Sparkles className="text-blue-600" />

                AI Summary

              </h2>

              <div className="flex gap-3">

                <button
                  onClick={copySummary}
                  className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
                >
                  <Copy size={18} />
                  Copy
                </button>

                <button
                  onClick={downloadSummary}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  <Download size={18} />
                  Download
                </button>

              </div>

            </div>

            <div className="bg-blue-50 rounded-xl p-6 mt-5">

              <p className="leading-8 text-gray-700 whitespace-pre-wrap">
                {paper.summary}
              </p>

            </div>

          </div>

          {/* Keywords */}

          <div className="mt-10">

            <h2 className="text-2xl font-bold mb-5">

              Keywords

            </h2>

            <div className="flex flex-wrap gap-3">

              {paper.keywords.map((keyword, index) => (

                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium"
                >
                  {keyword}
                </span>

              ))}

            </div>

          </div>

          {/* Abstract */}

          <div className="mt-10">

            <h2 className="text-2xl font-bold flex items-center gap-2">

              <FileText size={24} />

              Abstract

            </h2>

            <div className="bg-gray-50 rounded-xl p-6 mt-5">

              <p className="leading-8 text-gray-700 whitespace-pre-wrap">
                {paper.abstract}
              </p>

            </div>

          </div>

          {/* Save */}

          <div className="mt-10 flex justify-end">

            <button
              onClick={savePaper}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
            >
              <BookmarkPlus size={20} />

              Save Paper

            </button>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default PaperDetails;