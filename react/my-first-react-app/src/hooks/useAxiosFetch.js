import { useEffect, useState } from "react";
import { api } from "./../api/axios_post"; // Assuming 'api' is your axios instance

const useAxiosFetch = (dataUrl) => {
	const [data, setData] = useState([]);
	const [fetchError, setFetchError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const fetchData = async (url) => {
			setIsLoading(true);
			try {
				const response = await api.get(url, {
					signal: controller.signal,
				});

				if (isMounted) {
					setData(response.data);
					setFetchError(null);
				}
			} catch (err) {
				if (isMounted) {
					// Only set error if it wasn't a manual cancellation
					if (
						err.name !== "CanceledError" &&
						err.name !== "AbortError"
					) {
						setFetchError(err.message);
						setData([]);
					}
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		fetchData(dataUrl);

		// Cleanup function
		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [dataUrl]);

	return { data, fetchError, isLoading };
};

export default useAxiosFetch;
