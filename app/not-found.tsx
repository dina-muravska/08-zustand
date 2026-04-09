import css from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Not Found",
  description: "The page you are looking for does not exist.",
  // url: "/not-found",
  openGraph: {
    title: "404 - Not Found",
    description: "Sorry, the page you are looking for does not exist",
    // url: `https://notehub.com/notes/${id}`,
    siteName: "Not Found",
    images: [
      {
        url: "https://placehold.co/1200x630/E5E7EB/6B7280?text=404+Not+Found",
        width: 1200,
        height: 630,
        alt: "404 - Not Found",
      },
    ],
    type: "website",
  },
};

const NotFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};

export default NotFound;
