const apiURL = process.env.NEXT_PUBLIC_API_URL;

interface ClientOptions {
  data?: any;
  token?: string;
  headers?: Record<string, any>;
  [key: string]: any;
}

const client = async <T = any>(endpoint: string, options: ClientOptions = {}): Promise<T> => {
  const config: RequestInit = {
    method: options.data ? "POST" : "GET",
    body: options.data ? JSON.stringify(options.data) : undefined,
    headers: {
      Authorization: options.token ? `Bearer ${options.token}` : undefined,
      "Content-Type": options.data ? "application/json" : undefined,
      ...options.headers,
    },
    ...options,
  };

  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        return Promise.reject({ message: "Please re-authenticate." });
      }

      if (response.status === 400) {
        console.log("response: ", response)
        return Promise.reject({message: "Invalid form entry"});
      }

      const data = await response.json();

      if (response.ok && (data).code < 400) {
        return Promise.resolve(data);
      }

      return Promise.reject(data);
    });
}

export { client };
