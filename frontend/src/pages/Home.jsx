import { useMemo, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import PaperCard from "../components/PaperCard";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import Footer from "../components/Footer";
import Stats from "../components/Stats";
import SearchHistory from "../components/SearchHistory";
import SortDropdown from "../components/SortDropdown";

function Home() {
  const [query, setQuery] = useState("");
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [sortBy, setSortBy] = useState("similarity");

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("searchHistory");
    return saved ? JSON.parse(saved) : [];
  });

  async function searchPaper(searchQuery) {
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) return;

    setLoading(true);

    try {
      const response = await api.get("/search/", {
        params: {
          query: trimmedQuery,
          top_k: 5,
        },
      });

      setPapers(response.data.results);
      setSearched(true);

      // Update search history (case-insensitive)
      const updatedHistory = [
        trimmedQuery,
        ...history.filter(
          (item) =>
            item.toLowerCase() !== trimmedQuery.toLowerCase()
        ),
      ].slice(0, 5);

      setHistory(updatedHistory);

      localStorage.setItem(
        "searchHistory",
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.error(error);
      alert("Unable to fetch papers.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch() {
    setShowHistory(false);
    await searchPaper(query);
  }

  const sortedPapers = useMemo(() => {
    const sorted = [...papers];

    switch (sortBy) {
      case "newest":
        sorted.sort(
          (a, b) =>
            new Date(b.published) -
            new Date(a.published)
        );
        break;

      case "oldest":
        sorted.sort(
          (a, b) =>
            new Date(a.published) -
            new Date(b.published)
        );
        break;

      case "title":
        sorted.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;

      default:
        sorted.sort(
          (a, b) => b.similarity - a.similarity
        );
    }

    return sorted;
  }, [papers, sortBy]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">
            AI Research Intelligence
          </h1>

          <p className="mt-6 text-lg text-blue-100">
            Discover research papers using Semantic Search,
            Sentence Transformers, FAISS and Gemini AI.
          </p>

          <div className="relative mt-10">
            <SearchBar
              query={query}
              setQuery={setQuery}
              onSearch={handleSearch}
              onFocus={() => setShowHistory(true)}
              onBlur={() =>
                setTimeout(() => setShowHistory(false), 150)
              }
            />

            {showHistory && history.length > 0 && (
              <SearchHistory
                history={history}
                onSelect={(item) => {
                  setQuery(item);
                  setShowHistory(false);
                  searchPaper(item);
                }}
              />
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <Stats />
      </section>

      {/* Search Results */}
      <section className="max-w-6xl mx-auto px-6 py-12">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Search Results
          </h2>

          {papers.length > 0 && (
            <SortDropdown
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          )}

        </div>

        {loading && <Loading />}

        {!loading && searched && papers.length === 0 && (
          <EmptyState />
        )}

        {!loading && sortedPapers.length > 0 && (
          <div className="grid gap-6">
            {sortedPapers.map((paper) => (
              <PaperCard
                key={paper.id}
                paper={paper}
              />
            ))}
          </div>
        )}

      </section>

      <Footer />
    </div>
  );
}

export default Home;