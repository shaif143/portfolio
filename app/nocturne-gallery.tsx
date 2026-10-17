"use client";

import { useEffect, useState } from "react";

type GalleryItem = {
  key: string;
  url: string;
  title: string;
  uploaded: string;
};

export function NocturneGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/portfolio/gallery", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : { items: [] }))
      .then((data) =>
        setItems(Array.isArray(data.items) ? data.items.slice(0, 2) : []),
      )
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return (
    <section className="profile-section profile-photography" id="archive">
      <div className="profile-container">
        <div className="profile-section-heading">
          <p className="profile-label">
            <span>07</span>Photography
          </p>
          <div>
            <h2>Life, through my lens.</h2>
            <p>
              Places, quiet moments, and details collected over the years. All
              photographed on my phone.
            </p>
          </div>
        </div>
        <div className="profile-photo-collection">
          {items.map((item) => (
            <figure key={item.key}>
              <div className="profile-gallery-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption>
                <span>{item.title}</span>
                <span>{new Date(item.uploaded).getFullYear()}</span>
              </figcaption>
            </figure>
          ))}
          {items.length === 0 && (
            <p className="profile-gallery-empty">
              {loading
                ? "Opening the photography collection…"
                : "Explore the full photography collection in the gallery."}
            </p>
          )}
        </div>
        <a className="profile-inline-link" href="/gallery">
          Visit the complete gallery <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
