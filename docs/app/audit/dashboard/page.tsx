// @ts-nocheck
'use client';

/**
 * TaskFlow — Dashboard Page
 *
 * AUDIT TEST: Tests the following DS0 components in composition:
 * - Card (compound: Header, Title, Description, Content)
 * - Button (primary, secondary, ghost, outline, destructive)
 * - Badge (status indicators)
 * - Avatar (user avatars in a team member list)
 * - Heading (section headers)
 * - Text (body text, muted text)
 * - Stack (vertical + horizontal layout)
 * - Table (data display)
 * - Tabs (view switching)
 * - Grid (responsive layout)
 * - Progress (completion bar)
 * - Divider (section separation)
 * - Tooltip (supplementary info)
 */

import { useState } from 'react';

import { Card } from '../../../../components/react/card';
import { Button } from '../../../../components/react/button';
import { Badge } from '../../../../components/react/badge';
import { Avatar } from '../../../../components/react/avatar';
import { Heading } from '../../../../components/react/heading';
import { Text } from '../../../../components/react/text';
import { Stack } from '../../../../components/react/stack';
import { Table } from '../../../../components/react/table';
import { Tabs } from '../../../../components/react/tabs';
import { Progress } from '../../../../components/react/progress';
import { Divider } from '../../../../components/react/divider';
import { Tooltip } from '../../../../components/react/tooltip';

// Mock data
const stats = [
    { label: 'Total Projects', value: '12', change: '+3 this month' },
    { label: 'Active Tasks', value: '47', change: '8 due today' },
    { label: 'Completion', value: '73%', change: '+5% this week' },
    { label: 'Team Members', value: '9', change: '2 online' },
];

const tasks = [
    { id: 1, title: 'Design system audit', status: 'in-progress', priority: 'high', assignee: 'AJ', dueDate: 'Mar 24' },
    { id: 2, title: 'Token pipeline fix', status: 'todo', priority: 'critical', assignee: 'MK', dueDate: 'Mar 25' },
    { id: 3, title: 'Button a11y update', status: 'done', priority: 'medium', assignee: 'SR', dueDate: 'Mar 22' },
    { id: 4, title: 'CLI publish prep', status: 'in-progress', priority: 'high', assignee: 'AJ', dueDate: 'Mar 26' },
    { id: 5, title: 'Storybook stories', status: 'todo', priority: 'low', assignee: 'LP', dueDate: 'Mar 28' },
];

const statusColors: Record<string, string> = {
    'todo': 'secondary',
    'in-progress': 'default',
    'done': 'outline',
};

const priorityColors: Record<string, string> = {
    'critical': 'destructive',
    'high': 'default',
    'medium': 'secondary',
    'low': 'outline',
};

export default function DashboardPage(): React.ReactElement {
    const [activeTab, setActiveTab] = useState('tasks');

    return (
        <div className="min-h-screen p-6 lg:p-8">
            {/* Header */}
            <Stack direction="horizontal" justify="between" align="center" className="mb-8">
                <Stack gap="1">
                    <Heading level={1} size="2xl">TaskFlow Dashboard</Heading>
                    <Text color="muted">Welcome back! Here&apos;s your project overview.</Text>
                </Stack>
                <Stack direction="horizontal" gap="3">
                    <Button variant="outline" onClick={() => window.location.href = '/audit/settings'}>
                        Settings
                    </Button>
                    <Button variant="primary">
                        + New Project
                    </Button>
                </Stack>
            </Stack>

            {/* Stats Row */}
            {/* 🔥 FRICTION #5: Grid component doesn't have responsive column props.
                You need to use className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                instead of something like <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="4"> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                    <Card key={stat.label}>
                        <Card.Content className="pt-6">
                            <Stack gap="2">
                                <Text size="sm" color="muted">{stat.label}</Text>
                                <Heading level={2} size="3xl">{stat.value}</Heading>
                                <Text size="xs" color="muted">{stat.change}</Text>
                            </Stack>
                        </Card.Content>
                    </Card>
                ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Tasks Panel - takes 2 columns */}
                <div className="lg:col-span-2">
                    <Card>
                        <Card.Header>
                            <Stack direction="horizontal" justify="between" align="center">
                                <Card.Title>Tasks</Card.Title>
                                <Stack direction="horizontal" gap="2">
                                    {/* 🔥 FRICTION #6: No ButtonGroup component.
                                        You must compose buttons in a flex container manually. */}
                                    <Button variant="ghost" size="sm">Filter</Button>
                                    <Button variant="ghost" size="sm">Sort</Button>
                                </Stack>
                            </Stack>
                        </Card.Header>
                        <Card.Content>
                            <Tabs
                                value={activeTab}
                                onValueChange={(v) => setActiveTab(v)}
                            >
                                <Tabs.List>
                                    <Tabs.Trigger value="tasks">All Tasks</Tabs.Trigger>
                                    <Tabs.Trigger value="active">Active</Tabs.Trigger>
                                    <Tabs.Trigger value="completed">Completed</Tabs.Trigger>
                                </Tabs.List>

                                <Tabs.Content value="tasks">
                                    {/* 🔥 FRICTION #7: Table component requires manual composition of
                                        Header/Body/Row/Cell. There's no "data table" shorthand prop
                                        like <Table data={tasks} columns={...} />.
                                        The recipe DataTable exists but is separate. */}
                                    <Table>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.Head>Task</Table.Head>
                                                <Table.Head>Status</Table.Head>
                                                <Table.Head>Priority</Table.Head>
                                                <Table.Head>Assignee</Table.Head>
                                                <Table.Head>Due</Table.Head>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {tasks.map((task) => (
                                                <Table.Row key={task.id}>
                                                    <Table.Cell className="font-medium">{task.title}</Table.Cell>
                                                    <Table.Cell>
                                                        <Badge variant={statusColors[task.status] as 'default' | 'secondary' | 'outline' | 'destructive'}>
                                                            {task.status.replace('-', ' ')}
                                                        </Badge>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Badge variant={priorityColors[task.priority] as 'default' | 'secondary' | 'outline' | 'destructive'}>
                                                            {task.priority}
                                                        </Badge>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Tooltip content={`Assigned to ${task.assignee}`}>
                                                            <Avatar size="sm" fallback={task.assignee} />
                                                        </Tooltip>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Text size="sm" color="muted">{task.dueDate}</Text>
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))}
                                        </Table.Body>
                                    </Table>
                                </Tabs.Content>

                                <Tabs.Content value="active">
                                    <Table>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.Head>Task</Table.Head>
                                                <Table.Head>Priority</Table.Head>
                                                <Table.Head>Due</Table.Head>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {tasks.filter(t => t.status === 'in-progress').map((task) => (
                                                <Table.Row key={task.id}>
                                                    <Table.Cell className="font-medium">{task.title}</Table.Cell>
                                                    <Table.Cell>
                                                        <Badge variant={priorityColors[task.priority] as 'default' | 'secondary' | 'outline' | 'destructive'}>
                                                            {task.priority}
                                                        </Badge>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Text size="sm" color="muted">{task.dueDate}</Text>
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))}
                                        </Table.Body>
                                    </Table>
                                </Tabs.Content>

                                <Tabs.Content value="completed">
                                    <Text color="muted" className="py-8 text-center">
                                        1 task completed this week.
                                    </Text>
                                </Tabs.Content>
                            </Tabs>
                        </Card.Content>
                    </Card>
                </div>

                {/* Sidebar */}
                <Stack gap="6">
                    {/* Sprint Progress Card */}
                    <Card>
                        <Card.Header>
                            <Card.Title>Sprint Progress</Card.Title>
                            <Card.Description>Sprint 14 • Mar 18 – Apr 1</Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <Stack gap="4">
                                <Stack gap="2">
                                    <Stack direction="horizontal" justify="between">
                                        <Text size="sm">Overall</Text>
                                        <Text size="sm" color="muted">73%</Text>
                                    </Stack>
                                    <Progress value={73} />
                                </Stack>
                                <Divider />
                                <Stack gap="2">
                                    <Stack direction="horizontal" justify="between">
                                        <Text size="sm">Design</Text>
                                        <Text size="sm" color="muted">90%</Text>
                                    </Stack>
                                    <Progress value={90} />
                                </Stack>
                                <Stack gap="2">
                                    <Stack direction="horizontal" justify="between">
                                        <Text size="sm">Development</Text>
                                        <Text size="sm" color="muted">65%</Text>
                                    </Stack>
                                    <Progress value={65} />
                                </Stack>
                                <Stack gap="2">
                                    <Stack direction="horizontal" justify="between">
                                        <Text size="sm">Testing</Text>
                                        <Text size="sm" color="muted">40%</Text>
                                    </Stack>
                                    <Progress value={40} />
                                </Stack>
                            </Stack>
                        </Card.Content>
                    </Card>

                    {/* Team Members Card */}
                    <Card>
                        <Card.Header>
                            <Card.Title>Team</Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <Stack gap="3">
                                {['AJ', 'MK', 'SR', 'LP'].map((initials) => (
                                    <Stack key={initials} direction="horizontal" align="center" gap="3">
                                        <Avatar fallback={initials} size="sm" />
                                        <Stack gap="0">
                                            <Text size="sm" className="font-medium">Team Member {initials}</Text>
                                            <Text size="xs" color="muted">
                                                {initials === 'AJ' || initials === 'MK' ? '🟢 Online' : '⚫ Offline'}
                                            </Text>
                                        </Stack>
                                    </Stack>
                                ))}
                            </Stack>
                        </Card.Content>
                    </Card>
                </Stack>
            </div>

            {/* Navigation Footer */}
            <Divider className="my-8" />
            <Stack direction="horizontal" justify="center" gap="4">
                <Button variant="ghost" onClick={() => window.location.href = '/audit/login'}>← Login</Button>
                <Button variant="ghost" onClick={() => window.location.href = '/audit/settings'}>Settings →</Button>
            </Stack>
        </div>
    );
}
