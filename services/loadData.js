export async function LoadData() {
  const response = await fetch("/data/data.json");
  return await response.json();
}
