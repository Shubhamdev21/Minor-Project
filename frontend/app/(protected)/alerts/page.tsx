'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { CheckCircle2, ShieldAlert } from 'lucide-react';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await api.get('/alerts');
      setAlerts(res.data);
    } catch (error) {
      console.error('Failed to fetch alerts', error);
    }
  };

  const handleResolve = async (id: string) => {
    try {
      await api.patch(`/alerts/${id}/resolve`);
      toast.success('Alert marked as resolved');
      fetchAlerts(); // Refresh list
    } catch (error) {
      toast.error('Failed to resolve alert');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100">Alert History</h2>
        <p className="text-zinc-400 mt-1">Review and manage past intrusion events</p>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-100">All Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-400">
              <thead className="text-xs uppercase bg-zinc-950 text-zinc-500 border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-3 font-medium">Time</th>
                  <th className="px-6 py-3 font-medium">Location</th>
                  <th className="px-6 py-3 font-medium">Severity</th>
                  <th className="px-6 py-3 font-medium">Confidence</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert) => (
                  <tr key={alert._id} className="border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-zinc-300">
                      {new Date(alert.detectedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-zinc-200">
                      {alert.location}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={alert.severity === 'HIGH' ? 'destructive' : alert.severity === 'MEDIUM' ? 'default' : 'secondary'}>
                        {alert.severity}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-zinc-300">
                      {alert.confidence}%
                    </td>
                    <td className="px-6 py-4">
                      {alert.isResolved ? (
                        <span className="flex items-center text-green-500">
                          <CheckCircle2 className="w-4 h-4 mr-1" /> Resolved
                        </span>
                      ) : (
                        <span className="flex items-center text-yellow-500">
                          <ShieldAlert className="w-4 h-4 mr-1" /> Active
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {!alert.isResolved && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleResolve(alert._id)}
                          className="border-zinc-700 hover:bg-zinc-800 text-zinc-300"
                        >
                          Resolve
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
                {alerts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-zinc-500">
                      No alerts found in the database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
