// /app/events/[id]/page.tsx

import EventDetails from "@/components/admin/EventDetails";

interface Props {
  params: { id: string };
}

export default function Page({ params }: Props) {
  return <EventDetails eventId={params.id} />;
}
