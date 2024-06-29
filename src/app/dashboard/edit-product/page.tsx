import EditProductForm from "./_EditForm";

export default function page({
  searchParams,
}: {
  searchParams: { slug: string };
}) {
  return (
    <div>
      <EditProductForm slug={searchParams.slug} />
    </div>
  );
}
