"use client";
import { useState } from "react";
import BlogsPage from "@/components/blogs/BlogsPage";
import { BlogsListResponse } from "@/types/apiDataTypes";
import { fetchBlogsData } from "@/api/blogsService";
import { useLocale } from "next-intl";

export default function BlogsPageRoute({
  blogApiData: initialData,
}: {
  blogApiData: BlogsListResponse;
}) {
  const locale = useLocale();

  const [currentPage, setCurrentPage] = useState<number>(
    initialData.meta?.current_page || 1
  );
  const [blogData, setBlogData] = useState(initialData.data || []);
  const [totalPages, setTotalPages] = useState(
    initialData.meta?.last_page || 1
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  const handlePageChange = async (newPage: number) => {
    if (newPage === currentPage) return;

    setCurrentPage(newPage);
    setLoading(true);

    const newPageData = await fetchBlogsData(locale, newPage);

    if ("data" in newPageData) {
      setBlogData(newPageData.data);
      setTotalPages(newPageData.meta?.last_page || 1);
    } else {
      console.error("Failed to fetch paginated data", newPageData);
    }

    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <BlogsPage
      items={blogData.map((b) => ({
        id: b.id,
        image: b.image,
        desc: b.meta_title,
        date: b.date || "Coming Soon",
        slug: b.slug,
      }))}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
