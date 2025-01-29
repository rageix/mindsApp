import InvoicesList from '@/components/InvoicesView/InvoicesList';

export default function InvoicesView() {
  return (
    <div className="max-w-3xl m-auto flex flex-col gap-y-12">
      <InvoicesList />
    </div>
  );
}
