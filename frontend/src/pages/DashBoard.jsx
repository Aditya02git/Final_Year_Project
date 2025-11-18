import { useState } from 'react';
import {
  Brain,
  Heart,
  Activity,
  Moon,
  Smile,
  TrendingUp,
  Calendar,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Clock,
} from 'lucide-react';
import { AppWrapper } from '../layouts/AppWrapper';

export default function DashBoard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock data - replace with actual user data from your backend
  const userStats = {
    overallScore: 75,
    moodTrend: 'improving',
    streakDays: 12,
    lastCheckIn: '2 hours ago',
  };

  const moodData = [
    { day: 'Mon', score: 70, emoji: '😊' },
    { day: 'Tue', score: 65, emoji: '🙂' },
    { day: 'Wed', score: 80, emoji: '😄' },
    { day: 'Thu', score: 75, emoji: '😊' },
    { day: 'Fri', score: 85, emoji: '😁' },
    { day: 'Sat', score: 78, emoji: '😊' },
    { day: 'Sun', score: 82, emoji: '😄' },
  ];

  const wellnessMetrics = [
    { name: 'Sleep Quality', value: 78, icon: Moon, color: 'text-blue-500' },
    { name: 'Stress Level', value: 45, icon: Activity, color: 'text-orange-500', inverse: true },
    { name: 'Mood', value: 82, icon: Smile, color: 'text-pink-500' },
    { name: 'Energy', value: 70, icon: Heart, color: 'text-red-500' },
  ];

  const recentActivities = [
    { id: 1, type: 'chat', title: 'AI Chat Session', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'appointment', title: 'Counselor Meeting', time: 'Yesterday', status: 'completed' },
    { id: 3, type: 'resource', title: 'Read: Managing Anxiety', time: '2 days ago', status: 'completed' },
    { id: 4, type: 'appointment', title: 'Upcoming Session', time: 'Tomorrow 3 PM', status: 'upcoming' },
  ];

  const quickActions = [
    { name: 'Talk to AI', icon: MessageCircle, href: '/aiChat', color: 'bg-blue-500' },
    { name: 'Book Session', icon: Calendar, href: '/appointments', color: 'bg-green-500' },
    { name: 'Mood Check', icon: Smile, href: '#', color: 'bg-pink-500' },
    { name: 'Resources', icon: Brain, href: '/resources', color: 'bg-purple-500' },
  ];

  const getMoodColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <AppWrapper>
      <div className="min-h-screen bg-base-200 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
            <p className="text-base-content/60">Track your wellness journey and progress</p>
          </div>

          {/* Overall Score Card */}
          <div className="card bg-gradient-to-br from-primary to-secondary text-primary-content mb-6 shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="card-title text-2xl mb-2">Overall Wellness Score</h2>
                  <p className="opacity-90">Last updated: {userStats.lastCheckIn}</p>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-bold">{userStats.overallScore}</div>
                  <div className="flex items-center gap-2 mt-2 justify-center">
                    <TrendingUp className="h-5 w-5" />
                    <span className="capitalize">{userStats.moodTrend}</span>
                  </div>
                </div>
                <div className="stats bg-base-100 text-base-content shadow">
                  <div className="stat place-items-center">
                    <div className="stat-title">Current Streak</div>
                    <div className="stat-value text-primary">{userStats.streakDays}</div>
                    <div className="stat-desc">days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {quickActions.map((action) => (
              <a
                key={action.name}
                href={action.href}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="card-body items-center text-center p-6">
                  <div className={`${action.color} p-4 rounded-full text-white mb-2`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">{action.name}</h3>
                </div>
              </a>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Mood Tracker */}
            <div className="lg:col-span-2 card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="card-title">
                    <BarChart3 className="h-5 w-5" />
                    Weekly Mood Tracker
                  </h2>
                  <select
                    className="select select-sm select-bordered"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>

                <div className="flex items-end justify-between gap-2 h-48">
                  {moodData.map((day, index) => (
                    <div key={index} className="flex flex-col items-center flex-1 gap-2">
                      <div className="text-2xl">{day.emoji}</div>
                      <div
                        className={`w-full ${getMoodColor(day.score)} rounded-t-lg transition-all hover:opacity-80`}
                        style={{ height: `${day.score}%` }}
                      ></div>
                      <span className="text-xs font-medium">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Wellness Metrics */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">
                  <Activity className="h-5 w-5" />
                  Wellness Metrics
                </h2>
                <div className="space-y-4">
                  {wellnessMetrics.map((metric, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <metric.icon className={`h-4 w-4 ${metric.color}`} />
                          <span className="text-sm font-medium">{metric.name}</span>
                        </div>
                        <span className={`text-sm font-bold ${getScoreColor(metric.inverse ? 100 - metric.value : metric.value)}`}>
                          {metric.value}%
                        </span>
                      </div>
                      <progress
                        className={`progress ${metric.inverse && metric.value > 60 ? 'progress-error' : metric.inverse && metric.value > 40 ? 'progress-warning' : 'progress-success'} w-full`}
                        value={metric.value}
                        max="100"
                      ></progress>
                    </div>
                  ))}
                </div>

                <div className="alert alert-info mt-4">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">Keep up the great work! Your stress levels are manageable.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4">
                <Clock className="h-5 w-5" />
                Recent Activities
              </h2>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${activity.status === 'completed' ? 'bg-success' : 'bg-info'}`}>
                        {activity.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-success-content" />
                        ) : (
                          <Calendar className="h-5 w-5 text-info-content" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{activity.title}</h3>
                        <p className="text-sm text-base-content/60">{activity.time}</p>
                      </div>
                    </div>
                    <div className={`badge ${activity.status === 'completed' ? 'badge-success' : 'badge-info'}`}>
                      {activity.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Insights Section */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-success">
                  <CheckCircle className="h-5 w-5" />
                  What's Going Well
                </h2>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-1">•</span>
                    <span>Your sleep quality has improved by 15% this week</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-1">•</span>
                    <span>Consistent daily mood tracking for 12 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-1">•</span>
                    <span>Regular engagement with wellness resources</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-warning">
                  <AlertCircle className="h-5 w-5" />
                  Areas for Focus
                </h2>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-warning mt-1">•</span>
                    <span>Consider scheduling a counselor session this week</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-warning mt-1">•</span>
                    <span>Try stress reduction exercises during peak hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-warning mt-1">•</span>
                    <span>Explore peer support groups for additional connection</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppWrapper>
  );
}