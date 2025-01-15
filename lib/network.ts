interface RequestBody { 
  [key: string]: any;
}

const externalApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
const apiRequest = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body: RequestBody | null = null,
  baseUrl: string = process.env.BASE_URL || '' 
): Promise<any> => {
  const options: RequestInit = {
      method,
      headers: {
          'Content-Type': 'application/json',
      },
  };

  if (body) {
      options.body = JSON.stringify(body);
  }

  try {
      const res = await fetch(baseUrl + url, options);

      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Something went wrong');
      }

      return await res.json();
  } catch (error: any) {
      throw new Error(error.message || 'Network error');
  }
};

const api = {
  post: async (url: string, body: RequestBody): Promise<any> => {
      return apiRequest(url, 'POST', body);
  },

  get: async (url: string): Promise<any> => {
      return apiRequest(url, 'GET');
  },

  put: async (url: string, body: RequestBody): Promise<any> => {
      return apiRequest(url, 'PUT', body);
  },

  delete: async (url: string): Promise<any> => {
      return apiRequest(url, 'DELETE');
  },
};

const externalApi = { 
  post: async (url: string, body: RequestBody): Promise<any> => {
      return apiRequest(url, 'POST', body, externalApiBaseUrl) 
  },

  get: async (url: string): Promise<any> => {
      return apiRequest(url, 'GET', null, externalApiBaseUrl)
  },

  put: async (url: string, body: RequestBody): Promise<any> => {
      return apiRequest(url, 'PUT', body, externalApiBaseUrl) 
  },

  delete: async (url: string): Promise<any> => {
      return apiRequest(url, 'DELETE', null, externalApiBaseUrl)
  },
};

export { api, externalApi };