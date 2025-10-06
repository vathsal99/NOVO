import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

// Import i18n configuration
import "./i18n";

// Pages
import Index from "./pages/Index";
import Assessment from "./pages/Assessment";
import Resources from "./pages/Resources";
import WellnessLayout from "./pages/wellness/WellnessLayout";
import DashboardPage from "./pages/wellness/DashboardPage";
import MoodPage from "./pages/wellness/MoodPage";
import JournalPage from "./pages/wellness/JournalPage";
import GoalsPage from "./pages/wellness/GoalsPage";
import BadgesPage from "./pages/wellness/BadgesPage";
import ContactPage from "./pages/wellness/ContactPage";
import FeedbackPage from "./pages/wellness/FeedbackPage";
import StudentDashboard from "./pages/StudentDashboard";
import SchoolDashboard from "./pages/SchoolDashboard";
import TeacherLayout from "@/components/teacher-dashboard/TeacherLayout";
import TeacherDashboard from "@/pages/teacher-dashboard/TeacherDashboard";
import StudentListPage from "@/pages/teacher-dashboard/StudentListPage";
import { AssessmentsPage } from "@/pages/teacher-dashboard/AssessmentsPage";
import { ResourcesPage } from "@/pages/teacher-dashboard/ResourcesPage";
import { SupportPage } from "@/pages/teacher-dashboard/SupportPage";
import ReportIncidentPage from "@/pages/teacher-dashboard/ReportIncidentPage";
import { ActivitiesPage } from "@/pages/teacher-dashboard/ActivitiesPage";
import ReadingMaterialPage from "@/pages/teacher-dashboard/ReadingMaterialPage";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ProgressTracking from "./pages/ProgressTracking";
import MyAssessments from "./pages/MyAssessments";
import ProfileSettings from "./pages/ProfileSettings";
import BuddySafe from "./pages/BuddySafe";
import { AcademicPressureSafety, CyberbullyingSafety, SubstanceAbuseViolenceAwareness, SexualHarassmentAwareness } from "./pages/safety";
import CognitiveTasks from "./pages/CognitiveTasks";
import AlertsPage from "./pages/alerts";
import ReportsPage from "./pages/ReportsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SchoolSettings from "./pages/SchoolSettings";
import ChatPage from "./pages/ChatPage";
import MasoomPage from "./pages/MasoomPage";
import MasoomPageHI from "./components/hindi/MasoomPage";
import CareerQuizPage from "./pages/career-quiz";

// Components
import { ProfanityFilterProvider } from "@/components/profanity-filter-provider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/AppLayout";
import ScrollToTop from "@/components/ScrollToTop";
import usePageTitle from "@/hooks/usePageTitle";

// Component to handle page title updates
const PageTitleHandler = () => {
  usePageTitle(); // This will use the current route to set the title
  return null;
};

const queryClient = new QueryClient();

// Create the router configuration
// Configure router with future flags
const router = createBrowserRouter([{
  path: "/",
  element: (
    <ProfanityFilterProvider>
      <QueryClientProvider client={queryClient}>
        <PageTitleHandler />
        <ScrollToTop />
        <AppLayout />
        <Toaster />
        <Sonner />
      </QueryClientProvider>
    </ProfanityFilterProvider>
  ),
  children: [
    // Public routes
    { index: true, element: <Index /> },
    { 
      path: "/resources",
      children: [
        { index: true, element: <Resources /> },
        { path: ":topicId", element: <Resources /> }
      ]
    },
    
    // Redirect legacy routes
    { 
      path: "/wellness-dashboard", 
      element: <Navigate to="/wellness/dashboard" replace /> 
    },
    
    // Safety pages
    { path: "/safety/cyberbullying", element: <CyberbullyingSafety /> },
    { path: "/safety/substance-abuse-violence", element: <SubstanceAbuseViolenceAwareness /> },
    { path: "/safety/academic-pressure", element: <AcademicPressureSafety /> },
    { path: "/safety/sexual-harassment", element: <SexualHarassmentAwareness /> },
    
    // Auth route - no layout
    { path: "/auth", element: <Auth /> },
    
    // Protected student routes
    {
      element: <ProtectedRoute allowedRoles={['student']} />,
      children: [
        { path: "/assessment", element: <Assessment /> },
        {
          path: "/wellness",
          element: <WellnessLayout />,
          children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: "dashboard", element: <DashboardPage /> },
            { path: "mood", element: <MoodPage /> },
            { path: "journal", element: <JournalPage /> },
            { path: "goals", element: <GoalsPage /> },
            { path: "badges", element: <BadgesPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "feedback", element: <FeedbackPage /> },
            { path: "*", element: <Navigate to="/404" replace /> }
          ]
        },
        { path: "/student-dashboard", element: <StudentDashboard /> },
        { path: "/progress-tracking", element: <ProgressTracking /> },
        { path: "/my-assessments", element: <MyAssessments /> },
        { path: "/profile-settings", element: <ProfileSettings /> },
        { path: "/cognitive-tasks", element: <CognitiveTasks /> },
        { path: "/chat", element: <ChatPage /> },
        { path: "/career-counseling", element: <CareerQuizPage /> }
      ]
    },
    
    // Shared routes for student, teacher and management
    {
      element: <ProtectedRoute allowedRoles={['student', 'teacher', 'management']} />,
      children: [
        { path: "/buddysafe", element: <BuddySafe /> },
        { path: "/masoom", element: <MasoomPage /> },
        { path: "/masoom-hi", element: <MasoomPageHI /> }
      ]
    },
    
    // Protected teacher routes
    {
      element: <ProtectedRoute allowedRoles={['teacher']} />,
      children: [
        {
          path: "/teacher",
          element: <TeacherLayout />,
          children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: "dashboard", element: <TeacherDashboard /> },
            { path: "students", element: <StudentListPage /> },
            { path: "assessments", element: <AssessmentsPage /> },
            { path: "resources", element: <ResourcesPage /> },
            { path: "support", element: <SupportPage /> },
            { path: "report-incident", element: <ReportIncidentPage /> },
            { path: "activities", element: <ActivitiesPage /> },
            { path: "sessions", element: <SupportPage /> }, // Reuse support page for sessions
            { path: "reading-material", element: <ReadingMaterialPage /> },
          ]
        }
      ]
    },
    
    // Protected management routes
    {
      element: <ProtectedRoute allowedRoles={['management']} />,
      children: [
        { path: "/school-dashboard", element: <SchoolDashboard /> },
        { path: "/alerts", element: <AlertsPage /> },
        { path: "/alerts/:category", element: <AlertsPage /> },
        { path: "/reports", element: <ReportsPage /> },
        { path: "/analytics", element: <AnalyticsPage /> },
        { path: "/school-settings", element: <SchoolSettings /> }
      ]
    },
    
    // Fallback route - handle 404s
    { 
      path: "*", 
      element: <NotFound />,
      // Prevent infinite redirects by not replacing the URL
      handle: { preventNavigation: true }
    }
  ]
}], {
  future: {
    // Use only supported future flags
    v7_relativeSplatPath: true
  }
});

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
