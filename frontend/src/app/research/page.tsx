import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export default function ResearchPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-medium text-heading">Research</h1>
      <Card>
        <CardTitle>Research Workspace</CardTitle>
        <CardDescription>
          Multi-panel research workspace coming in v1.5.
        </CardDescription>
      </Card>
    </div>
  );
}
