export async function getPlaces() {
    const response = await fetch("http://localhost:3000/places");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
    return data.places;
}
export async function getUserPlaces() {
    const response = await fetch("http://localhost:3000/user-places");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
    return data.places; 
}

export async function addPlace(places) {
    const response = await fetch("http://localhost:3000/user-places", {
      method: "PUT",
      body: JSON.stringify({places}),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
    return data.message;

}