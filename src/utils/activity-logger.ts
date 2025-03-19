
import { supabase } from "@/integrations/supabase/client";

export type ActivityType = 
  | 'user_login'
  | 'user_logout' 
  | 'lesson_view' 
  | 'quiz_attempt' 
  | 'quiz_completion';

export interface ActivityDetails {
  [key: string]: any;
}

/**
 * Logs user activity to the database
 */
export const logUserActivity = async (
  activityType: ActivityType, 
  details?: ActivityDetails
): Promise<void> => {
  try {
    const { error } = await supabase.rpc(
      'log_user_activity',
      { 
        activity_type: activityType,
        activity_details: details ? details : null
      }
    );
    
    if (error) {
      console.error('Error logging activity:', error);
    }
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};
