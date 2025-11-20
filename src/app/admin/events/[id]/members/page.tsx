import AdminEventMembersClient from "@/components/admin/AdminEventMembersServer";

export default async function Page({ params }: { params: { id: string } }) {
const eventId = params.id;
const eventTitle = "Your Event Title";
return <AdminEventMembersClient eventId={eventId} eventTitle={eventTitle} />;
}
