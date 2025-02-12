"use client"
import { useState } from "react";
import { Card } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
export const DashboardIndex = () => {
    const [activeTab, setActiveTab] = useState('overview')
    return (
        <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Revenue', value: '$124,563.00', change: '+12.5%' },
                    { label: 'Active Projects', value: '45', change: '+3.2%' },
                    { label: 'Pending Orders', value: '18', change: '-2.1%' },
                    { label: 'Team Members', value: '24', change: '+1' },
                ].map((stat) => (
                    <Card key={stat.label} className="p-6">
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold mt-2">{stat.value}</p>
                        <p
                            className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                                }`}
                        >
                            {stat.change} from last month
                        </p>
                    </Card>
                ))}
            </div>

            {/* Main Dashboard Tabs */}
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-4"
            >
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card className="p-6">
                            <h3 className="font-semibold mb-4">Project Progress</h3>
                            <div className="space-y-4">
                                {[
                                    { name: 'Website Redesign', progress: 75 },
                                    { name: 'Mobile App Development', progress: 45 },
                                    { name: 'Database Migration', progress: 90 },
                                ].map((project) => (
                                    <div key={project.name} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>{project.name}</span>
                                            <span>{project.progress}%</span>
                                        </div>
                                        <Progress value={project.progress} />
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="font-semibold mb-4">Recent Activities</h3>
                            <div className="space-y-4">
                                {[
                                    { text: 'New order #1234 received', time: '2 minutes ago' },
                                    { text: 'Invoice #5678 paid', time: '1 hour ago' },
                                    {
                                        text: 'Project "Mobile App" completed',
                                        time: '3 hours ago',
                                    },
                                    {
                                        text: 'New employee John Smith joined',
                                        time: '5 hours ago',
                                    },
                                ].map((activity, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between items-center text-sm"
                                    >
                                        <span>{activity.text}</span>
                                        <span className="text-muted-foreground">
                                            {activity.time}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="analytics">
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Analytics Content</h3>
                        <p className="text-muted-foreground">
                            Detailed analytics will be displayed here.
                        </p>
                    </Card>
                </TabsContent>

                <TabsContent value="reports">
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Reports Content</h3>
                        <p className="text-muted-foreground">
                            Generated reports will be displayed here.
                        </p>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
};