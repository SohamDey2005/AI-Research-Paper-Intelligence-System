import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Bookmark,
  Trash2,
  Search,
  Calendar,
  Tag,
  User,
} from "lucide-react";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

function SavedPapers() {

  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPapers();
  }, []);

  useEffect(() => {

    const filtered = papers.filter((paper) =>
      paper.title.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredPapers(filtered);

  }, [search, papers]);

  async function loadPapers() {

    try {

      const response = await api.get("/saved/");

      setPapers(response.data);
      setFilteredPapers(response.data);

    }

    catch {

      toast.error("Unable to load saved papers.");

    }

    setLoading(false);

  }

  async function deletePaper(id) {

    const confirmDelete = window.confirm(
      "Delete this paper from saved papers?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/saved/${id}`);

      toast.success("Paper removed.");

      loadPapers();

    }

    catch {

      toast.error("Unable to delete paper.");

    }

  }

  if (loading)
    return <Loading />;

  return (

    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="flex items-center gap-3">

          <Bookmark
            className="text-blue-600"
            size={34}
          />

          <h1 className="text-4xl font-bold">
            Saved Papers
          </h1>

        </div>

        {/* Search */}

        <div className="relative mt-8">

          <Search
            className="absolute left-4 top-3.5 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search saved papers..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Empty */}

        {

          filteredPapers.length===0 ?

          (

            <div className="bg-white rounded-xl shadow p-12 text-center mt-8">

              <Bookmark
                size={60}
                className="mx-auto text-gray-400"
              />

              <h2 className="text-2xl font-bold mt-5">

                No Saved Papers

              </h2>

              <p className="text-gray-600 mt-3">

                Save papers from the search page.

              </p>

            </div>

          )

          :

          (

            <div className="space-y-6 mt-8">

              {

                filteredPapers.map((paper)=>(

                  <div
                    key={paper.paper_id}
                    className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
                  >

                    <h2 className="text-2xl font-bold">

                      {paper.title}

                    </h2>

                    <div className="flex flex-wrap gap-6 mt-5 text-gray-600">

                      <div className="flex items-center gap-2">

                        <User size={18}/>

                        {paper.authors}

                      </div>

                      <div className="flex items-center gap-2">

                        <Tag size={18}/>

                        {paper.categories}

                      </div>

                      <div className="flex items-center gap-2">

                        <Calendar size={18}/>

                        {paper.published}

                      </div>

                    </div>

                    <div className="flex gap-4 mt-8">

                      <Link
                        to={`/paper/${paper.paper_id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                      >
                        View Details
                      </Link>

                      <button
                        onClick={()=>deletePaper(paper.paper_id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
                      >

                        <Trash2 size={18}/>

                        Delete

                      </button>

                    </div>

                  </div>

                ))

              }

            </div>

          )

        }

      </div>

      <Footer />

    </>

  );

}

export default SavedPapers;