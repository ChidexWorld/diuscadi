// app/events/gallery/page.tsx (Server Component)

import EventsGalleryClient from "@/components/EventsGalleryClient";
import Header from "@/components/Header";

export const metadata = {
  title: "Events Gallery | LASCADS",
};

export default async function EventsGalleryPage() {
  return (
    <div>
        <Header/>
      <EventsGalleryClient />
    </div>
  );
}
