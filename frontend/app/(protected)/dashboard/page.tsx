'use client';

import { useState, useEffect } from 'react';
import { useSocket } from '@/components/providers/SocketProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Radio, ShieldAlert, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/axios';

interface AlertData {
  _id: string;
  sensorId: string;
  location: string;
  confidence: number;
  severity: string;
  detectedAt: string;
}

export default function DashboardPage() {
  const { socket, isConnected } = useSocket();
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [activeSensors, setActiveSensors] = useState(0);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [alertsRes, sensorsRes] = await Promise.all([
          api.get('/alerts'),
          api.get('/sensors')
        ]);
        setAlerts(alertsRes.data.slice(0, 10)); // Top 10 recent
        setActiveSensors(sensorsRes.data.length);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!socket) return;
    
    const handleMotion = (data: any) => {
      const newAlert = {
        _id: data.alertId,
        sensorId: `PIR_${data.location.replace(' ', '_').toUpperCase()}`,
        location: data.location,
        confidence: data.confidence,
        severity: data.severity,
        detectedAt: data.detectedAt
      };
      setAlerts(prev => [newAlert, ...prev].slice(0, 10));
    };

    socket.on('motion_detected', handleMotion);
    return () => {
      socket.off('motion_detected', handleMotion);
    };
  }, [socket]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100">Live Monitor</h2>
          <p className="text-zinc-400 mt-1">Real-time system overview and alerts</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">System Status</CardTitle>
            <Radio className={isConnected ? "text-green-500 animate-pulse" : "text-red-500"} size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">{isConnected ? 'ONLINE' : 'OFFLINE'}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Active Sensors</CardTitle>
            <Cpu className="text-blue-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">{activeSensors}</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Total Alerts Today</CardTitle>
            <ShieldAlert className="text-red-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">{alerts.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Activity Level</CardTitle>
            <Activity className="text-yellow-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">
              {alerts.length > 5 ? 'HIGH' : alerts.length > 0 ? 'MODERATE' : 'LOW'}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-zinc-900 border-zinc-800 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950/20 to-zinc-950/80"></div>
          
          <div className="relative z-10 w-64 h-64 border border-red-500/30 rounded-full flex items-center justify-center">
            {/* Animated radar effect */}
            <div className="absolute inset-0 rounded-full border border-red-500/50 animate-ping opacity-20"></div>
            <div className="absolute w-full h-full rounded-full border border-red-500/20"></div>
            <div className="absolute w-3/4 h-3/4 rounded-full border border-red-500/20"></div>
            <div className="absolute w-1/2 h-1/2 rounded-full border border-red-500/20"></div>
            
            <motion.div 
              className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
            <ShieldAlert className="text-red-500 w-16 h-16 animate-pulse" />
          </div>
          <p className="mt-8 text-zinc-400 z-10">Monitoring 6 Zones in Real-time</p>
        </Card>

        <Card className="col-span-3 bg-zinc-900 border-zinc-800 flex flex-col">
          <CardHeader>
            <CardTitle className="text-zinc-100">Recent Detections</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-4">
              <AnimatePresence>
                {alerts.length === 0 ? (
                  <p className="text-zinc-500 text-sm">No recent activity detected.</p>
                ) : (
                  alerts.map((alert, index) => (
                    <motion.div 
                      key={alert._id || index}
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-zinc-950 border border-zinc-800"
                    >
                      <div>
                        <p className="text-sm font-medium text-zinc-100">{alert.location}</p>
                        <p className="text-xs text-zinc-500">
                          {new Date(alert.detectedAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <Badge variant={alert.severity === 'HIGH' ? 'destructive' : alert.severity === 'MEDIUM' ? 'default' : 'secondary'} className={
                        alert.severity === 'HIGH' ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20' : ''
                      }>
                        {alert.severity} ({alert.confidence}%)
                      </Badge>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
