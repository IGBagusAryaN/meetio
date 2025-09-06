import { useState } from "react";
import toast from "react-hot-toast";

const useFetch = (cb, { successMessage, errorMessage, disableToast } = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const promise = cb(...args);

      const response = await (disableToast
        ? promise
        : toast.promise(promise, {
            loading: "Loading...",
            success: successMessage || "Successfully updated",
            error: errorMessage || "Something went wrong",
          })
      );

      setData(response);
      return response;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;
