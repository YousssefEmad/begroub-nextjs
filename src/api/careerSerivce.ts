const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchCareerData(lang = "en") {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_BASE_URL}/careers`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch career data:", data);
      return { success: false, message: "Failed To Fetch Career Data" };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Career data fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}

export async function sendCareerData(formData: FormData) { // FormData built in and available in next.js globally
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_BASE_URL}/save-career-application`,
      {
        method: "POST",
        body: formData,
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to send career data:", data);
      return {
        success: false,
        message: data?.message || "Failed to send career data",
      };
    }

    return { success: true, data };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Career form submission error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}
