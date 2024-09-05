export async function LoadData() {
  const baseUrl = window.location.origin + window.location.pathname;
  const response = await fetch(`${baseUrl}/data/data.json`);
  return await response.json();
}
