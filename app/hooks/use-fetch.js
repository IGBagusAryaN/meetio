import { useState } from "react";
import toast from "react-hot-toast";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      toast.success("Successfully updated");
    } catch (err) {
      setError(err);
      toast.error(`${err?.message || "Something wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;
