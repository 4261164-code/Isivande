import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, FileText, CheckCircle2 } from "lucide-react";

export function StudentPortal() {
  const modules = [
    {
      id: "m1",
      title: "Programming Foundations",
      description: "Learn the basics of programming logic and syntax.",
      videos: [{ title: "Introduction to Variables", url: "#" }, { title: "Control Structures", url: "#" }],
      assessments: [{ title: "Quiz 1: Variables", status: "Completed" }]
    },
    {
      id: "m2",
      title: "Database Design",
      description: "Understand relational database concepts and SQL.",
      videos: [{ title: "SQL Basics", url: "#" }],
      assessments: [{ title: "Assignment: Database Schema", status: "Pending" }]
    }
  ];

  return (
    <div className="bg-base min-h-screen p-8">
      <h1 className="text-3xl font-bold text-ink mb-8">Student Portal</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {modules.map((module) => (
          <Card key={module.id} className="theme-card">
            <CardHeader>
              <CardTitle className="text-ink">{module.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-ink mb-4">{module.description}</p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-ink font-semibold mb-2">Videos</h4>
                  {module.videos.map((video) => (
                    <div key={video.title} className="flex items-center gap-2 text-ink hover:text-neon cursor-pointer">
                      <PlayCircle className="h-4 w-4" />
                      {video.title}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-ink font-semibold mb-2">Assessments</h4>
                  {module.assessments.map((assessment) => (
                    <div key={assessment.title} className="flex items-center justify-between text-ink">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {assessment.title}
                      </div>
                      <Badge className={assessment.status === "Completed" ? "bg-neon" : "bg-surface"}>
                        {assessment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${className}`}>{children}</span>;
}
