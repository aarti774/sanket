
import { supabase } from "@/integrations/supabase/client";

export type ActivityType = 
  | 'user_login'
  | 'user_logout' 
  | 'lesson_view' 
  | 'quiz_attempt' 
  | 'quiz_completion'
  | 'role_change';

export interface ActivityDetails {
  [key: string]: any;
}

/**
 * Gets the current authenticated user
 */
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting current user:', error);
    return null;
  }
  return data.user;
};

/**
 * Logs user activity to the database
 */
export const logUserActivity = async (
  activityType: ActivityType, 
  details?: ActivityDetails
): Promise<void> => {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      console.error('No authenticated user found');
      return;
    }
    
    console.log('Logging activity for user:', user.id, 'Type:', activityType);
    
    const { error } = await supabase
      .from('user_activity')
      .insert({
        activity_type: activityType,
        activity_details: details || null,
        user_id: user.id
      });
    
    if (error) {
      console.error('Error logging activity:', error);
    } else {
      console.log('Activity logged successfully');
    }
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};
