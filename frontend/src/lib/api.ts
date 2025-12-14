const API_BASE_URL = "https://localhost:5002/api"; // change if needed

export async function apiPost<TRequest, TResponse>(
  url: string,
  data: TRequest
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
}
