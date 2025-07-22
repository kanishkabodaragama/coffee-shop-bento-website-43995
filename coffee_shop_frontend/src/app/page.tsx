import Image from "next/image";
import BentoBoxSection from "../components/BentoBoxSection";

export default function Home() {
  return (
    <main className="min-h-screen w-full px-2 pt-10 pb-10 sm:p-10 bg-background grid gap-8">
      <h1 className="text-center text-2xl sm:text-4xl font-bold mb-6 tracking-tight text-primary font-[family-name:var(--font-geist-sans)] drop-shadow">
        <span className="text-accent">Brew &amp; Bean</span> Coffee
      </h1>
      <div
        className={`grid gap-6
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-4
        auto-rows-[minmax(160px,1fr)]
        bento-grid sm:bento-grid-pattern`}
      >
        {/* Menu Section */}
        <BentoBoxSection title="Menu" accent>
          <ul className="mt-2 text-sm space-y-2 font-mono">
            <li>
              <span className="font-semibold text-accent">Espresso</span> - $3
            </li>
            <li>
              <span className="font-semibold text-accent">Cappuccino</span> - $4
            </li>
            <li>
              <span className="font-semibold text-accent">Latte</span> - $4.5
            </li>
            <li>
              <span className="font-semibold text-accent">Croissant</span> - $2.5
            </li>
          </ul>
        </BentoBoxSection>

        {/* Gallery Section */}
        <BentoBoxSection title="Gallery" className="md:col-span-2">
          <div className="flex gap-2 mt-1">
            <div className="relative w-1/3 aspect-[1/1] rounded-xl overflow-hidden border border-secondary">
              <Image alt="Espresso" src="/gallery-espresso.jpg" fill className="object-cover" />
            </div>
            <div className="relative w-1/3 aspect-[1/1] rounded-xl overflow-hidden border border-secondary">
              <Image alt="Interior" src="/gallery-interior.jpg" fill className="object-cover" />
            </div>
            <div className="relative w-1/3 aspect-[1/1] rounded-xl overflow-hidden border border-secondary">
              <Image alt="Coffee art" src="/gallery-art.jpg" fill className="object-cover" />
            </div>
          </div>
          <p className="text-xs mt-2 text-secondary">
            Snapshots from our cozy shop.
          </p>
        </BentoBoxSection>

        {/* Location Section */}
        <BentoBoxSection title="Find Us">
          <div className="mt-2 mb-2 flex flex-col gap-2">
            <div className="rounded-lg overflow-hidden border border-secondary h-[90px] relative">
              {/* Simple map iframe */}
              <iframe
                title="Google Maps"
                className="w-full h-full"
                src="https://maps.google.com/maps?q=coffee%20shop%20downtown&t=&z=16&ie=UTF8&iwloc=&output=embed"
                allowFullScreen={false}
              ></iframe>
            </div>
            <div>
              <p className="font-semibold">123 Main St, Downtown City</p>
              <span className="text-xs text-secondary">Open: 8am – 6pm</span>
            </div>
          </div>
        </BentoBoxSection>

        {/* Contact Section */}
        <BentoBoxSection title="Contact" accent className="md:col-span-1 md:row-span-2 flex flex-col justify-between">
          <form className="flex flex-col gap-2 mt-2">
            <label htmlFor="name" className="text-xs font-semibold text-primary">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              className="rounded px-2 py-1 bg-white/60 border border-primary/40 outline-none focus:border-accent transition text-sm"
            />
            <label htmlFor="message" className="text-xs font-semibold text-primary">
              Message
            </label>
            <textarea
              id="message"
              placeholder="How can we help you?"
              className="rounded px-2 py-1 bg-white/60 border border-primary/40 outline-none focus:border-accent transition text-sm"
              rows={3}
            />
            <button
              type="submit"
              className="mt-2 rounded bg-accent text-background font-semibold py-2 transition hover:bg-primary/90"
            >
              Send
            </button>
          </form>
          <div className="mt-6 text-xs text-left text-secondary">
            or email us: <a href="mailto:hello@brewbean.com" className="underline text-accent">hello@brewbean.com</a>
          </div>
        </BentoBoxSection>
      </div>
      <footer className="flex justify-center items-center mt-8 text-secondary text-sm">
        &copy; {new Date().getFullYear()} Brew &amp; Bean. All rights reserved.
      </footer>
    </main>
  );
}
