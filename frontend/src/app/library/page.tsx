import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-medium text-heading">Library</h1>
      <Card>
        <CardTitle>Browse Books</CardTitle>
        <CardDescription>
          Browse the books of the Bible, translations, and apocrypha.
        </CardDescription>
      </Card>
    </div>
  );
}
