import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    const title = note?.title ? `${note.title} — Note` : "Note details";

    const description = note?.content
      ? `${String(note.content).slice(0, 150).replace(/\n/g, " ")}...`
      : "View details of the note.";

    // const url = `${SITE_URL}notes/${id}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        // url,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
    };
  } catch (err) {
    const title = "Note — Not found";
    const description = "The requested note could not be loaded.";
    // const url = `${SITE_URL}notes/${id}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        // url,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
    };
  }
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
