'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import api from '@/lib/axios';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    telegramEnabled: false,
    buzzerEnabled: true,
    simulationMode: true,
    telegramConfigured: false,
    telegramEnvIssues: '',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        setSettings({
          telegramEnabled: res.data.telegramEnabled,
          buzzerEnabled: res.data.buzzerEnabled,
          simulationMode: res.data.simulationMode,
          telegramConfigured: res.data.telegramConfigured,
          telegramEnvIssues: res.data.telegramEnvIssues || '',
        });
      } catch (error) {
        console.error('Failed to fetch settings', error);
      }
    };
    fetchSettings();
  }, []);

  const handleToggle = async (key: string, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    try {
      await api.patch('/settings', { [key]: value });
      toast.success('Settings updated');
    } catch (error) {
      toast.error('Failed to update settings');
      // Revert on error
      setSettings(settings);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100">Settings</h2>
        <p className="text-zinc-400 mt-1">Manage system configurations and integrations</p>
      </div>

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
                  {settings.telegramEnvIssues ? ` (${settings.telegramEnvIssues})` : ''}
                </p>
              ) : settings.telegramEnabled ? (
                <p className="text-sm text-emerald-400">Telegram is enabled and configured.</p>
              ) : (
                <p className="text-sm text-zinc-400">Telegram is currently disabled in the system settings.</p>
              )}
            </div>
            <input 
              type="checkbox" 
              checked={settings.telegramEnabled}
              onChange={(e) => handleToggle('telegramEnabled', e.target.checked)}
              className="w-5 h-5 rounded border-zinc-700 bg-zinc-950 text-red-500 focus:ring-red-500 focus:ring-offset-zinc-900"
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
              onChange={(e) => handleToggle('buzzerEnabled', e.target.checked)}
              className="w-5 h-5 rounded border-zinc-700 bg-zinc-950 text-red-500 focus:ring-red-500 focus:ring-offset-zinc-900"
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
              onChange={(e) => handleToggle('simulationMode', e.target.checked)}
              className="w-5 h-5 rounded border-zinc-700 bg-zinc-950 text-red-500 focus:ring-red-500 focus:ring-offset-zinc-900"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
