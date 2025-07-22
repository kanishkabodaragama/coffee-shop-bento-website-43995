"use client";

import Image from "next/image";
import BentoBoxSection from "../components/BentoBoxSection";
import { useState } from "react";

// Dynamic menu data
const menuItems = [
  { name: "Espresso", description: "Rich and bold espresso shots", price: "$3" },
  { name: "Cappuccino", description: "Espresso with steamed milk & foam", price: "$4" },
  { name: "Iced Latte", description: "Cold espresso, milk, and ice", price: "$4.5" },
  { name: "Matcha Latte", description: "Ceremonial matcha with milk", price: "$5" },
  { name: "Chocolate Croissant", description: "Flaky pastry with dark chocolate", price: "$3.5" },
  { name: "Avocado Toast", description: "Sourdough topped with avocado & seeds", price: "$6" },
];

// Gallery photos (blend local and remote if desired)
const galleryImages = [
  {
    src: "/gallery-espresso.jpg",
    alt: "Espresso in a rustic cup",
    caption: "Signature espresso",
  },
  {
    src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=facearea&w=512&q=80",
    alt: "Cozy coffee shop interior",
    caption: "Cozy shop",
  },
  {
    src: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=facearea&w=512&q=80",
    alt: "Latte art",
    caption: "Barista Art",
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=512&q=80",
    alt: "Pastries",
    caption: "Fresh pastries",
  },
];

function validateContact(values: { name: string; email: string; message: string }): Record<string, string> {
  const errors: Record<string, string> = {};
  // Proper JS email regex: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#validation
  // This covers standard emails, not all advanced cases
  const emailRegex = /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,}$/;
  if (!values.name.trim()) errors.name = "Name required";
  if (!emailRegex.test(values.email)) errors.email = "Valid email required";
  if (!values.message.trim()) errors.message = "Message required";
  return errors;
}

export default function Home() {
  // Gallery modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  // Contact form state
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function openModal(idx: number) {
    setModalIndex(idx);
    setModalOpen(true);
    document.body.classList.add('modal-open');
  }
  function closeModal() {
    setModalOpen(false);
    document.body.classList.remove('modal-open');
  }

  function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newErrors = validateContact(contact);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setContact({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 2000);
    }
  }

  return (
    <main className="min-h-screen w-full px-2 pt-10 pb-10 sm:p-10 bg-background grid gap-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary drop-shadow-md tracking-widest mb-2">
          <span className="text-accent">Bento Box Cafe</span>
        </h1>
        <p className="text-secondary text-lg italic">Cozy meets modern &ndash; savor every sip.</p>
      </header>
      <div className={`grid gap-6
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-4
        auto-rows-[minmax(180px,1fr)]
        bento-grid sm:bento-grid-pattern`}>
        {/* Menu Section */}
        <BentoBoxSection title="Menu" accent>
          <ul className="divide-y divide-secondary">
            {menuItems.map((item, i) => (
              <li key={i} className="flex flex-col md:flex-row md:items-center py-2 md:justify-between">
                <span className="font-semibold text-accent">{item.name}</span>
                <span className="italic text-sm text-secondary md:ml-2">{item.description}</span>
                <span className="font-bold text-primary md:ml-4">{item.price}</span>
              </li>
            ))}
          </ul>
        </BentoBoxSection>

        {/* Gallery Section */}
        <BentoBoxSection title="Gallery" className="md:col-span-2">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {galleryImages.map((img, idx) => (
              <button
                type="button"
                key={img.src}
                className="focus:outline-none"
                aria-label={`Enlarge image: ${img.alt}`}
                onClick={() => openModal(idx)}>
                {/* Use next/image if src is local, otherwise fallback to img for remote */}
                {img.src.startsWith("/") ? (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={320}
                    height={200}
                    className="rounded shadow-sm object-cover w-full h-24 md:h-32 hover:scale-105 transition"
                  />
                ) : (
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="rounded shadow-sm object-cover w-full h-24 md:h-32 hover:scale-105 transition"
                  />
                )}
              </button>
            ))}
          </div>
          {modalOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center px-4" onClick={closeModal}>
              <div
                className="relative bg-white rounded-xl shadow-xl max-w-lg w-full p-6"
                onClick={e => e.stopPropagation()}
              >
                {galleryImages[modalIndex].src.startsWith("/") ? (
                  <Image
                    src={galleryImages[modalIndex].src}
                    alt={galleryImages[modalIndex].alt}
                    width={600}
                    height={350}
                    className="rounded-lg w-full max-h-80 object-contain"
                  />
                ) : (
                  <img
                    src={galleryImages[modalIndex].src}
                    alt={galleryImages[modalIndex].alt}
                    className="rounded-lg w-full max-h-80 object-contain"
                  />
                )}
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-primary text-base">{galleryImages[modalIndex].caption}</span>
                  <button
                    className="text-sm text-accent font-bold py-1 px-2 hover:underline"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
                {/* Prev/Next */}
                <div className="absolute top-1/2 left-2 -translate-y-1/2">
                  <button
                    className="bg-secondary/80 rounded-full px-3 py-1 shadow hover:bg-background"
                    aria-label="Previous image"
                    onClick={() => setModalIndex((modalIndex - 1 + galleryImages.length) % galleryImages.length)}
                  >
                    &#8592;
                  </button>
                </div>
                <div className="absolute top-1/2 right-2 -translate-y-1/2">
                  <button
                    className="bg-secondary/80 rounded-full px-3 py-1 shadow hover:bg-background"
                    aria-label="Next image"
                    onClick={() => setModalIndex((modalIndex + 1) % galleryImages.length)}
                  >
                    &#8594;
                  </button>
                </div>
              </div>
            </div>
          )}
        </BentoBoxSection>

        {/* Location Section */}
        <BentoBoxSection title="Find Us">
          <div className="mt-2 mb-2 flex flex-col gap-2">
            <div className="rounded-lg overflow-hidden border border-secondary h-[120px] relative">
              {/* Google maps embed */}
              <iframe
                title="Google Maps"
                className="w-full h-full"
                src="https://maps.google.com/maps?q=123%20Maple%20Lane%20Hometown%20USA&t=&z=17&ie=UTF8&iwloc=&output=embed"
                allowFullScreen={false}
              ></iframe>
            </div>
            <div>
              <p className="font-semibold">123 Maple Lane, Hometown, USA</p>
              <span className="text-xs text-secondary">Open: 8am &ndash; 6pm</span>
            </div>
            <a
              href="https://maps.google.com/?q=123+Maple+Lane+Hometown+USA"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-accent text-xs mt-1"
            >
              Get Directions
            </a>
          </div>
        </BentoBoxSection>

        {/* Contact Section */}
        <BentoBoxSection title="Contact" accent className="md:col-span-1 md:row-span-2 flex flex-col justify-between">
          <form className="flex flex-col gap-2 mt-2" onSubmit={handleContactSubmit} noValidate>
            <label htmlFor="name" className="text-xs font-semibold text-primary">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              className={`rounded px-2 py-1 bg-white/60 border text-sm ${errors.name ? "border-red-400" : "border-primary/40"} outline-none focus:border-accent transition`}
              value={contact.name}
              onChange={e => setContact({ ...contact, name: e.target.value })}
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
            <label htmlFor="email" className="text-xs font-semibold text-primary">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              className={`rounded px-2 py-1 bg-white/60 border text-sm ${errors.email ? "border-red-400" : "border-primary/40"} outline-none focus:border-accent transition`}
              value={contact.email}
              onChange={e => setContact({ ...contact, email: e.target.value })}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
            <label htmlFor="message" className="text-xs font-semibold text-primary">
              Message
            </label>
            <textarea
              id="message"
              placeholder="How can we help you?"
              className={`rounded px-2 py-1 bg-white/60 border text-sm ${errors.message ? "border-red-400" : "border-primary/40"} outline-none focus:border-accent transition`}
              rows={3}
              value={contact.message}
              onChange={e => setContact({ ...contact, message: e.target.value })}
            />
            {errors.message && <span className="text-red-500 text-xs">{errors.message}</span>}

            <button
              type="submit"
              className="mt-2 rounded bg-accent text-background font-semibold py-2 transition hover:bg-primary/90"
            >
              Send
            </button>
            {submitted && (
              <div className="text-green-600 text-sm font-semibold mt-1">
                Message sent! We&apos;ll get back to you soon.
              </div>
            )}
          </form>
          <div className="mt-6 text-xs text-left text-secondary">
            or email us: <a href="mailto:hello@bentoboxcafe.com" className="underline text-accent">hello@bentoboxcafe.com</a>
          </div>
        </BentoBoxSection>
      </div>
      <footer className="flex justify-center items-center mt-8 text-secondary text-sm">
        &copy; {new Date().getFullYear()} Bento Box Cafe. All rights reserved.
      </footer>
    </main>
  );
}
