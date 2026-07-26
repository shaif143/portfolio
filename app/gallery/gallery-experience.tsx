"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StudioUploader } from "../studio/studio-uploader";

type GalleryItem = {
  key: string;
  url: string;
  title: string;
  uploaded: string;
};

export function GalleryExperience() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(2);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadGallery = useCallback(async (resetVisible = false) => {
    setLoading(true);
    setLoadError("");

    try {
      const response = await fetch(`/api/portfolio/gallery?t=${Date.now()}`, {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("The collection could not be opened.");

      const data = (await response.json()) as { items?: GalleryItem[] };
      const nextItems = Array.isArray(data.items) ? data.items : [];
      setItems(nextItems);
      setVisibleCount((current) =>
        resetVisible ? Math.min(2, nextItems.length) : Math.min(Math.max(current, 2), nextItems.length),
      );
    } catch {
      setLoadError("The gallery is resting. Please return in a moment.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadGallery(true);
  }, [loadGallery]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || loading || visibleCount >= items.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((current) => Math.min(current + 2, items.length));
        }
      },
      { rootMargin: "70% 0px", threshold: 0.01 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [items.length, loading, visibleCount]);

  const rooms = useMemo(() => {
    const visibleItems = items.slice(0, visibleCount);
    return Array.from(
      { length: Math.ceil(visibleItems.length / 2) },
      (_, index) => visibleItems.slice(index * 2, index * 2 + 2),
    );
  }, [items, visibleCount]);

  return (
    <main className="museum-page">
      <div className="noise" aria-hidden="true" />

      <header className="museum-nav">
        <a className="museum-mark" href="/" aria-label="Return to portfolio">
          <span>S</span><i /><span>AT</span>
        </a>
        <p>Private observations · public exhibition</p>
        <nav aria-label="Gallery navigation">
          <a href="/">Portfolio</a>
          <a href="#collection">Collection</a>
          <a href="#atelier">Upload</a>
        </nav>
      </header>

      <section className="museum-hero" id="top">
        <div className="museum-hero-orbit" aria-hidden="true">
          <i /><i /><i />
        </div>
        <p className="museum-kicker">Shaif Ahamed Tamim · Photographic archive</p>
        <h1>
          The Nocturne
          <span>Gallery</span>
        </h1>
        <div className="museum-hero-foot">
          <p>
            Years of ordinary moments, held long enough to become extraordinary.
            Two works at a time. No feed. No noise.
          </p>
          <div>
            <span>{String(items.length).padStart(2, "0")}</span>
            <small>works in collection</small>
          </div>
          <a href="#collection">Enter exhibition <b>↓</b></a>
        </div>
      </section>

      <section className="museum-collection" id="collection" aria-label="Photography collection">
        {loading && rooms.length === 0 ? (
          <GalleryRoomSkeleton />
        ) : loadError ? (
          <div className="museum-message">
            <span>Gallery notice</span>
            <p>{loadError}</p>
            <button type="button" onClick={() => void loadGallery(true)}>
              Try again
            </button>
          </div>
        ) : rooms.length > 0 ? (
          rooms.map((room, roomIndex) => (
            <article className="museum-room" key={`room-${roomIndex}`}>
              <div className="museum-ceiling" aria-hidden="true">
                <i /><i />
              </div>
              <div className="museum-room-index" aria-hidden="true">
                Room {String(roomIndex + 1).padStart(2, "0")}
              </div>
              <div className="museum-wall">
                {room.map((item, itemIndex) => {
                  const absoluteIndex = roomIndex * 2 + itemIndex;
                  return (
                    <figure
                      className={`museum-artwork museum-artwork-${itemIndex + 1}`}
                      key={item.key}
                    >
                      <div className="museum-wire" aria-hidden="true" />
                      <div className="museum-frame">
                        <div className="museum-mat">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.url}
                            alt={item.title}
                            loading={roomIndex === 0 ? "eager" : "lazy"}
                            decoding="async"
                          />
                        </div>
                      </div>
                      <figcaption>
                        <span>NT·{String(absoluteIndex + 1).padStart(3, "0")}</span>
                        <div>
                          <p>{item.title}</p>
                          <small>
                            Digital photograph · {new Date(item.uploaded).getFullYear()}
                          </small>
                        </div>
                      </figcaption>
                    </figure>
                  );
                })}
                {room.length === 1 && (
                  <div className="museum-awaiting" aria-label="Space reserved for the next photograph">
                    <span>Next acquisition</span>
                    <i />
                    <p>A wall waiting for another moment.</p>
                  </div>
                )}
              </div>
              <div className="museum-floor" aria-hidden="true" />
            </article>
          ))
        ) : (
          <article className="museum-room museum-room-empty">
            <div className="museum-wall">
              <div className="museum-awaiting">
                <span>Opening exhibition</span>
                <i />
                <p>The first two walls are waiting for your photographs.</p>
              </div>
              <div className="museum-awaiting">
                <span>Future acquisition</span>
                <i />
                <p>Light, place, memory.</p>
              </div>
            </div>
            <div className="museum-floor" aria-hidden="true" />
          </article>
        )}

        <div className="museum-sentinel" ref={sentinelRef}>
          {visibleCount < items.length ? (
            <>
              <i aria-hidden="true" />
              <span>Approaching the next room</span>
            </>
          ) : items.length > 0 ? (
            <span>End of the current exhibition · the archive keeps growing</span>
          ) : null}
        </div>
      </section>

      <section className="museum-atelier" id="atelier">
        <div className="museum-atelier-copy">
          <p className="museum-kicker">Owner atelier · private access</p>
          <h2>Hang new work<br />on the wall.</h2>
          <p>
            Select many photographs at once. HEIC and HEIF files are converted
            locally to high-quality JPG or lossless PNG before upload; the
            originals never enter cloud storage.
          </p>
          <a href="#collection">Return to exhibition <span>↑</span></a>
        </div>
        <div className="museum-uploader">
          <StudioUploader galleryOnly onPublished={() => void loadGallery(false)} />
        </div>
      </section>

      <footer className="museum-footer">
        <a href="/">Shaif Ahamed Tamim</a>
        <span>The Nocturne Gallery · Dhaka</span>
        <a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          First room ↑
        </a>
      </footer>
    </main>
  );
}

function GalleryRoomSkeleton() {
  return (
    <article className="museum-room museum-room-loading" aria-label="Loading gallery">
      <div className="museum-wall">
        <div className="museum-loading-frame" />
        <div className="museum-loading-frame" />
      </div>
      <div className="museum-floor" aria-hidden="true" />
    </article>
  );
}
