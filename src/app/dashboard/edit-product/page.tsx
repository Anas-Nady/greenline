import EditProductForm from "./_EditForm";

export default function page({
  searchParams,
}: {
  searchParams: { slug: string };
}) {
  return (
    <main>
      <EditProductForm slug={searchParams.slug} />
    </main>
  );
}
