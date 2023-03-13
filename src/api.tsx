const API_BASE_URL = 'http://localhost:3001';

function handleErrors(response: Response): Response {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function getApi(): Promise<any> {
  const url = `${API_BASE_URL}/api`;
  return fetch(url)
    .then(handleErrors)
    .then((res) => res.json())
    .catch((error) => {
      console.error(`Error fetching api data: ${error.message}`);
      throw error;
    });
}
