
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface AssessmentResult {
  depression?: number;
  stress?: number;
  anxiety?: number;
  adhd?: number;
  wellbeing?: number;
  overall?: number;
}

interface AssessmentData {
  id: string;
  user_id: string;
  categories: string[];
  responses: any;
  results?: AssessmentResult;
  completed_at: string;
}

interface AssessmentHistoryProps {
  assessmentData: AssessmentData[];
  getRiskLevel: (percentage: number) => string;
  getRiskBadgeColor: (level: string) => string;
}

export const AssessmentHistory = ({ 
  assessmentData, 
  getRiskLevel, 
  getRiskBadgeColor 
}: AssessmentHistoryProps) => {
  const [visibleCount, setVisibleCount] = useState(3); // Start with 3 assessments
  
  // Sort assessments by date (newest first)
  const sortedAssessments = [...assessmentData].sort((a, b) => 
    new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime()
  );
  
  // Determine which assessments to display
  const visibleAssessments = sortedAssessments.slice(0, visibleCount);
  
  // Check if there are more assessments to show
  const hasMore = visibleCount < sortedAssessments.length;
  
  // Show 3 more assessments
  const handleViewMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + 3, sortedAssessments.length));
  };
  
  // Show less (back to initial 3)
  const handleShowLess = () => {
    setVisibleCount(3);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assessment History</CardTitle>
        <CardDescription>Your completed assessments and results</CardDescription>
      </CardHeader>
      <CardContent>
        {assessmentData.length > 0 ? (
          <div className="space-y-4">
            {visibleAssessments.map((assessment, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">
                      {assessment.categories.map((cat: string) => 
                        cat.charAt(0).toUpperCase() + cat.slice(1)
                      ).join(', ')} Assessment
                    </p>
                    <p className="text-sm text-gray-500">
                      Completed on {new Date(assessment.completed_at).toLocaleDateString()}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {assessment.results && Object.entries(assessment.results).map(([category, score]) => (
                        <Badge 
                          key={category}
                          className={getRiskBadgeColor(getRiskLevel(score as number).split(' ')[0])}
                        >
                          {category}: {score}%
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {hasMore ? (
              <div className="flex justify-center mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleViewMore}
                  className="flex items-center gap-1"
                >
                  <ChevronDown className="h-4 w-4" />
                  View More
                </Button>
              </div>
            ) : visibleCount > 3 && (
              <div className="flex justify-center mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleShowLess}
                  className="flex items-center gap-1"
                >
                  <ChevronUp className="h-4 w-4" />
                  Show Less
                </Button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No assessments completed yet.</p>
        )}
      </CardContent>
    </Card>
  );
};
