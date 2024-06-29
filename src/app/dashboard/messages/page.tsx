import MessageCard from "./_MessageCard";

export default async function Messages() {
  return (
    <div className="relative flex h-full flex-col gap-5">
      <MessageCard />
    </div>
  );
}
