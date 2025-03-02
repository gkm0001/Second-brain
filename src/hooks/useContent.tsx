import { useEffect, useState } from "react";
import axios from "axios";

export const  useContent =() => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);

  console.log("How many times");
  

  async function refresh() {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/v1/content/allcontent`, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      setContents(res.data.content);
    } catch (err) {
      setError("Failed to load content");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  refresh();
     

    return () => {
      console.log("no run");
    };
  }, []);

  return { contents, refresh, loading, error };
}
