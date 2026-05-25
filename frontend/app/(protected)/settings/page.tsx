"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import api from "@/lib/axios";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    telegramEnabled: false,
    buzzerEnabled: true,
    simulationMode: true,
    telegramConfigured: false,
    telegramEnvIssues: "",
  });

  const [chatId, setChatId] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings");
        setSettings({
          telegramEnabled: res.data.telegramEnabled,
          buzzerEnabled: res.data.buzzerEnabled,
          simulationMode: res.data.simulationMode,
          telegramConfigured: res.data.telegramConfigured,
          telegramEnvIssues: res.data.telegramEnvIssues || "",
        });
      } catch (error) {
        console.error("Failed to fetch settings", error);
      }
    };
    fetchSettings();
  }, []);

  const handleToggle = async (key: string, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    try {
      await api.patch("/settings", { [key]: value });
      toast.success("Settings updated");
    } catch (_error) {
      toast.error("Failed to update settings");
      setSettings(settings);
    }
  };

  const handleSubscribe = async () => {
    if (!chatId) {
      toast.error("Please enter your Telegram Chat ID!");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/subscribers", { chatId, name });
      if (res.status === 201) {
        toast.success("Subscribed! You will receive intruder alerts!");
        setChatId("");
        setName("");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100">Settings</h2>
        <p className="text-zinc-400 mt-1">Manage system configurations and integrations</p>
      </div>

      {/* Telegram Subscription Card */}
      <Card className="bg-zinc-900 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-zinc-100">Subscribe to Intruder Alerts</CardTitle>
          <CardDescription className="text-zinc-400">
            Get real-time intruder alerts directly on your Telegram!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-500/10 rounded-lg p-4 text-sm space-y-2">
            <p className="font-semibold text-red-400">How to get your Chat ID:</p>
            <ol className="list-decimal list-inside space-y-1 text-zinc-400">
              <li>Open Telegram app</li>
              <li>Search for @myidbot</li>
              <li>Send /getid</li>
              <li>Copy the ID number it gives you</li>
            </ol>
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-200">Your Name (optional)</Label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-red-500"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-200">Telegram Chat ID</Label>
            <input
              type="text"
              placeholder="e.g. 123456789"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-red-500"
            />
          </div>
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 text-red-400 rounded px-4 py-2 text-sm font-semibold transition-colors"
          >
            {loading ? "Subscribing..." : "?? Subscribe to Alerts"}
          </button>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-100">System Integrations</CardTitle>
          <CardDescription className="text-zinc-400">Configure external services like Telegram.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-zinc-200">Telegram Notifications</Label>
              <p className="text-sm text-zinc-400">Receive alerts directly to your Telegram device.</p>
              {!settings.telegramConfigured ? (
                <p className="text-sm text-red-400">
                  Telegram is not fully configured. Set backend environment variables: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.
                </p>
              ) : settings.telegramEnabled ? (
                <p className="text-sm text-emerald-400">Telegram is enabled and configured.</p>
              ) : (
                <p className="text-sm text-zinc-400">Telegram is currently disabled.</p>
              )}
            </div>
            <input
              type="checkbox"
              checked={settings.telegramEnabled}
              onChange={(e) => handleToggle("telegramEnabled", e.target.checked)}
              className="w-5 h-5 rounded border-zinc-700 bg-zinc-950 text-red-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-zinc-200">Dashboard Buzzer</Label>
              <p className="text-sm text-zinc-400">Play a sound on the dashboard when motion is detected.</p>
            </div>
            <input
              type="checkbox"
              checked={settings.buzzerEnabled}
              onChange={(e) => handleToggle("buzzerEnabled", e.target.checked)}
              className="w-5 h-5 rounded border-zinc-700 bg-zinc-950 text-red-500"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-100">Developer Options</CardTitle>
          <CardDescription className="text-zinc-400">Advanced settings for testing.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-zinc-200">PIR Sensor Simulator</Label>
              <p className="text-sm text-zinc-400">Generate random motion events for testing purposes.</p>
            </div>
            <input
              type="checkbox"
              checked={settings.simulationMode}
              onChange={(e) => handleToggle("simulationMode", e.target.checked)}
              className="w-5 h-5 rounded border-zinc-700 bg-zinc-950 text-red-500"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
