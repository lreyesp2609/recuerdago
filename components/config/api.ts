// api.ts

export const API_BASE_URL = '';


export const API_ENDPOINTS = {
    REGISTER: '/usuarios/registrar/',
    LOGIN: '/login/',
    DECODE: '/login/decodificar'
};

// Helper
export const buildApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;

// Headers por defecto (para JSON, no aplica a FormData)
export const DEFAULT_HEADERS = {
    'Accept': 'application/json',
};

// POST FormData
export const postFormData = async (endpoint: string, data: Record<string, any>, timeout = 10000) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    const fetchPromise = fetch(buildApiUrl(endpoint), {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: formData,
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('No response from server')), timeout)
    );

    const response = await Promise.race([fetchPromise, timeoutPromise]);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Error ${response.status}`);
    }

    return response.json();
};


export const decodeToken = async (token: string) => {
    const response = await fetch(buildApiUrl(API_ENDPOINTS.DECODE), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Error ${response.status}`);
    }

    return response.json();
};