// app/products/[id]/page.tsx
export default function TestPage({ params }: any) {
  return (
    <div>
      TEST PRODUIT: {params.id}
    </div>
  );
}
