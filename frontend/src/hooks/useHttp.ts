import { useCallback, useState } from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url: string, method = 'GET', body = null as any, headers = {} as any) => {
        setLoading(true);

        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(`http://127.0.0.1:8000/${url}`, { method, body, headers });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Method ${method} for ${url}`);
            }

            setLoading(false);

            return data;
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
            throw error;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { loading, error, request, clearError };
};
