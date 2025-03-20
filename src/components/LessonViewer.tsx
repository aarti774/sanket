
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface LessonViewerProps {
  title: string;
  description: string;
  videoUrl: string;
  lessonId: string;
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
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [actualVideoUrl, setActualVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the video URL is a storage URL or a local path
    const loadVideo = async () => {
      setLoading(true);
      setVideoError(false);
      
      try {
        if (videoUrl.startsWith('http') || videoUrl.startsWith('/')) {
          // Direct URL or local path, use as is
          setActualVideoUrl(videoUrl);
        } else if (videoUrl.startsWith('videos/')) {
          // It's a reference to a file in Supabase storage
          const { data, error } = await supabase.storage
            .from('videos')
            .createSignedUrl(videoUrl.replace('videos/', ''), 3600); // 1 hour expiry
          
          if (error) {
            console.error('Error loading video from Supabase:', error);
            toast.error('Failed to load video');
            setVideoError(true);
          } else if (data) {
            setActualVideoUrl(data.signedUrl);
          }
        } else {
          // Assume it's a direct reference to a video in the videos bucket
          const { data, error } = await supabase.storage
            .from('videos')
            .createSignedUrl(videoUrl, 3600); // 1 hour expiry
          
          if (error) {
            console.error('Error loading video from Supabase:', error);
            toast.error('Failed to load video');
            setVideoError(true);
          } else if (data) {
            setActualVideoUrl(data.signedUrl);
          }
        }
      } catch (error) {
        console.error('Error processing video URL:', error);
        setVideoError(true);
        toast.error('Error loading video');
      } finally {
        setLoading(false);
      }
    };
    
    loadVideo();
  }, [videoUrl]);

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    const percentage = (video.currentTime / video.duration) * 100;
    setProgress(percentage);
    
    // Mark video as complete when finished
    if (percentage >= 100 && !videoCompleted) {
      setVideoCompleted(true);
      toast.success("Video completed!");
      onComplete();
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
    toast.error("Failed to load video");
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
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : videoError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                  <p>Video could not be loaded</p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </Button>
                </div>
              ) : actualVideoUrl ? (
                <video
                  className="w-full h-full"
                  controls
                  onTimeUpdate={handleVideoTimeUpdate}
                  onError={handleVideoError}
                  src={actualVideoUrl}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <p>No video available</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Video Progress</span>
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
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LessonViewer;
