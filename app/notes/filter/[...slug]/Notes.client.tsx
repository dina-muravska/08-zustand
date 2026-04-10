"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";
import Error from "./error";
import Loading from "@/app/loading";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";

interface NotesClientProps {
  category: string | undefined;
}
export default function NotesClient({ category }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, error, isSuccess, isError } = useQuery({
    queryKey: ["notes", page, debouncedSearch, category],
    queryFn: () => fetchNotes({ page, search: debouncedSearch, tag: category }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>No data</p>;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data?.totalPages}
            currentPage={page}
            onPageChange={(page) => setPage(page)}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {isLoading && <Loading />}
      {isError && <Error error={error} />}
      {data.notes.length > 0 && <NoteList notes={data.notes} />}
      {data.notes.length === 0 && <p>No notes found</p>}
    </div>
  );
}
