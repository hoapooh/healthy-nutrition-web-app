export default function TransactionsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-primary mb-6 text-3xl font-bold">Transactions</h1>
      <div className="grid gap-6">
        <div className="bg-card rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Transactions Overview</h2>
          <p className="text-muted-foreground">
            This is the transactions page. You can manage transactions available
            in the system, view transaction history, and perform related
            operations here.
          </p>
        </div>
      </div>
    </div>
  );
}
