const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchBlogsData(lang = "en", page = 1) {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_BASE_URL}/blogs?page=${page}`,
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
      console.error("Failed to fetch blogs data:", data);
      return { success: false, message: "Failed To Fetch Blogs Data" };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Home data fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}

export async function fetchBlogsDetailsData(lang = "en", id:string) {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_BASE_URL}/blogs/${id}`,
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
      console.error("Failed to fetch blogs details data:", data);
      return { success: false, message: "Failed To Fetch Blogs Details Data" };
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Home data fetch error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}


