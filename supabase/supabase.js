import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    realtime: { enabled: false },
    auth: {
        persistSession: true,
        storage: AsyncStorage,
        autoRefreshToken: true,
        detectSessionInUrl: false,
    },
});