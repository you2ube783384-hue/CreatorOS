import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <Card>
      <h1 className="text-2xl font-semibold">Account Settings</h1>
      <p className="mt-2 text-sm text-muted">Upgrade to Pro for unlimited generations and priority model routing.</p>
      <form action="/api/stripe/checkout" method="POST" className="mt-4">
        <Button type="submit">Upgrade to Pro (₹999/month)</Button>
      </form>
    </Card>
  );
}
