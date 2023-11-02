const API_BASE_URL = "http://localhost:4000/graphql";

export const fetchKeanuImage = async ({
  width,
  height,
  youngKeanu,
  grayscale,
}) => {
  const youngKeanuValue = youngKeanu ? "true" : "false";
  const grayscaleValue = grayscale ? "true" : "false";

  const query = `
    query {
      getImage(width: ${width}, height: ${height}, youngKeanu: ${youngKeanuValue}, grayscale: ${grayscaleValue}) {
        url
      }
    }
  `;

  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.data.getImage;
    } else {
      throw new Error("Failed to fetch Keanu image");
    }
  } catch (error) {
    throw new Error(error.message || "Error fetching Keanu image");
  }
};
