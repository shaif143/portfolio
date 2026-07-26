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

  useEffect(() => {
    fetch("/api/portfolio/gallery")
      .then((response) => (response.ok ? response.json() : { items: [] }))
      .then((data) => setItems(Array.isArray(data.items) ? data.items : []))
      .catch(() => setItems([]));
  }, []);

  return (
    <section className="gallery section-shell" id="archive">
      <div className="section-intro" data-reveal>
        <div className="section-index">07</div>
        <div>
          <p className="eyebrow">Nocturne Archive</p>
          <h2>Phone photographs,<br />treated like secret cinema.</h2>
        </div>
        <p className="section-note">
          A living darkroom for the moments I notice before I know why.
        </p>
      </div>

      <div className={`gallery-stage${items.length > 0 ? " has-photos" : ""}`}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <figure
              className={`gallery-photo photo-${(index % 5) + 1} is-visible`}
              data-reveal
              key={item.key}
            >
              {/* The browser uses the photograph's real dimensions so no edge is cropped. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt={item.title} loading="lazy" decoding="async" />
              <figcaption>
                <span>N·{String(index + 1).padStart(2, "0")}</span>
                <p>{item.title}</p>
                <i>mobile frame</i>
              </figcaption>
            </figure>
          ))
        ) : (
          <>
            <div className="empty-negative negative-one" data-reveal>
              <span>01</span><i /><p>light awaiting capture</p>
            </div>
            <div className="empty-negative negative-two" data-reveal>
              <span>02</span><i /><p>an unseen street</p>
            </div>
            <div className="empty-negative negative-three" data-reveal>
              <span>03</span><i /><p>your next quiet frame</p>
            </div>
          </>
        )}
        <div className="gallery-manifesto" data-reveal>
          <p>
            Not content.<br />
            Not a feed.<br />
            <em>Evidence of attention.</em>
          </p>
          <span>
            The archive is intentionally sparse until Shaif’s first personal
            photography drop.
          </span>
          <a className="text-link" href="/studio">Enter owner studio <b>↗</b></a>
        </div>
      </div>
    </section>
  );
}
