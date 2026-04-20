const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchServicesData(lang = "en") {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_BASE_URL}/services`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": lang,
        },
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch services data:", data);
      return { success: false, message: "Failed To Fetch Services Data" };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Home data fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}

export async function fetchServiceDetailsData(lang = "en", id:string) {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_BASE_URL}/services/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": lang,
        },
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch service details data:", data);
      return { success: false, message: "Failed To Fetch Service Details Data" };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Home data fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}