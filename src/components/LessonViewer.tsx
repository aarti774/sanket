
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface LessonViewerProps {
  title: string;
  description: string;
  videoUrl: string;
  onClose: () => void;
  onComplete: () => void;
}

const LessonViewer = ({
  title,
  description,
  videoUrl,
  onClose,
  onComplete,
}: LessonViewerProps) => {
  const [progress, setProgress] = useState(0);

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    const percentage = (video.currentTime / video.duration) * 100;
    setProgress(percentage);
    
    // Mark as complete when video is finished
    if (percentage >= 100) {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            <Button variant="ghost" onClick={onClose}>
              <ArrowLeft className="mr-2" /> Back to Lessons
            </Button>
          </div>

          <div className="space-y-6">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
              <video
                className="w-full h-full"
                controls
                onTimeUpdate={handleVideoTimeUpdate}
                src={videoUrl}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600">{description}</p>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={onClose}>
                Exit Lesson
              </Button>
              <Button
                onClick={onComplete}
                disabled={progress < 100}
                className="bg-primary hover:bg-primary/90"
              >
                Complete Lesson <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LessonViewer;
