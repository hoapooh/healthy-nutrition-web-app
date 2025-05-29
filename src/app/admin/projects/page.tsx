export default function ProjectsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Projects</h1>
      <div className="grid gap-6">
        <div className="bg-card rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Project Management</h2>
          <p className="text-muted-foreground">
            This is the projects page. You can manage your projects, create new
            ones, and track progress here.
          </p>
        </div>
      </div>
    </div>
  );
}
