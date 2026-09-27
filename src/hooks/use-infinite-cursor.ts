import { useEffect, useRef, useState, useTransition } from "react";

type CursorPage<T> = { data: T[]; nextCursor: string | null };

export const useInfiniteCursor = <T>(
  initialItems: T[],
  initialNextCursor: string | null,
  fetchAction: (lastCursor: string | null) => Promise<CursorPage<T> | null>,
  options: {
    rootMargin?: string;
    customErrorMessage?: string;
    additionalDeps?: unknown[];
    resetKey?: string;
  } = {},
) => {
  const { rootMargin, customErrorMessage, additionalDeps, resetKey } = options;

  const loadingRef = useRef(false);

  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);
  const [sentinelEl, setSentinelEl] = useState<HTMLDivElement | null>(null);
  const [items, setItems] = useState(initialItems);
  const [nextCursor, setNextCursor] = useState(initialNextCursor);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadingRef.current = false;
    setItems(initialItems);
    setNextCursor(initialNextCursor);
    setError(null);
  }, [resetKey, initialItems, initialNextCursor]);

  useEffect(() => {
    if (!sentinelEl || isPending || !nextCursor) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || loadingRef.current) return;

        loadingRef.current = true;

        startTransition(async () => {
          try {
            setError(null);

            const response = await fetchAction(nextCursor);
            if (!response) {
              setError(
                customErrorMessage ||
                  "Failed to load more items. Please try again.",
              );
              return;
            }

            const { nextCursor: resNextCursor, data } = response;

            setItems((prev) => [...prev, ...data]);
            setNextCursor(resNextCursor);
          } catch {
            setError(
              customErrorMessage ||
                "Failed to load more items. Please try again.",
            );
          } finally {
            loadingRef.current = false;
          }
        });
      },
      {
        rootMargin: rootMargin || "400px",
        root: containerEl,
      },
    );

    observer.observe(sentinelEl);

    return () => {
      observer.disconnect();
    };
  }, [
    containerEl,
    customErrorMessage,
    fetchAction,
    isPending,
    nextCursor,
    rootMargin,
    sentinelEl,
    ...(additionalDeps?.length ? additionalDeps : []),
  ]);

  return {
    containerRef: setContainerEl,
    sentinelRef: setSentinelEl,
    items,
    nextCursor,
    isPending,
    error,
  };
};
