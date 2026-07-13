import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-medium text-heading">Profile</h1>
      <Card>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Sign in to sync highlights, bookmarks, and notes across devices.
        </CardDescription>
      </Card>
    </div>
  );
}
