"use client";
import { useAuth } from "@clerk/nextjs";
import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";

export default function SupabaseAuthSync() {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const setAuth = async () => {
      if (isSignedIn) {
        const token = await getToken({ template: "supabase" });
        console.log("Clerk JWT:", token);
        const { data, error } = await supabase.auth.setSession({
          access_token: token || "",
          refresh_token: "",
        });
        console.log("Supabase setSession result:", { data, error });
      } else {
        await supabase.auth.signOut();
      }
    };
    setAuth();
  }, [isSignedIn, getToken]);

  return null;
}
