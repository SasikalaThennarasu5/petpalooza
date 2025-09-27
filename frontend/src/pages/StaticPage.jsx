import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function StaticPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await api.get(`pages/${slug}/`);
        setPage(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPage();
  }, [slug]);

  if (!page) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
      {page.image && (
        <img
          src={page.image}
          alt={page.title}
          className="mb-4 rounded w-full max-h-96 object-cover"
        />
      )}
      <p className="text-gray-700">{page.content}</p>
    </div>
  );
}
