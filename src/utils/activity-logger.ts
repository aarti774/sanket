
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
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData.user) {
      console.error('Error getting current user:', userError);
      return;
    }
    
    const { error } = await supabase
      .from('user_activity')
      .insert({
        activity_type: activityType,
        activity_details: details || null,
        user_id: userData.user.id
      });
    
    if (error) {
      console.error('Error logging activity:', error);
    }
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};
