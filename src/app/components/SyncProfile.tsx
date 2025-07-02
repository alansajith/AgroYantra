"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SyncProfile() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const sync = async () => {
      if (isSignedIn && user) {
        // Check if profile exists
        const { data, error: selectError } = await supabase
          .from("profiles")
          .select("id")
          .eq("user_id", user.id)
          .single();

        if (selectError && selectError.code !== "PGRST116") {
          // PGRST116 = No rows found, which is expected if profile doesn't exist
          console.error("Error checking profile existence:", selectError);
        }

        if (!data) {
          // Insert new profile
          const insertResponse = await supabase.from("profiles").insert([
            {
              user_id: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              full_name: user.fullName,
            },
          ]);
          if (insertResponse.error) {
            console.error(
              "Error inserting profile:",
              insertResponse.error,
              insertResponse
            );
          } else {
            console.log("Profile created for user:", user.id);
          }
        } else {
          console.log("Profile already exists for user:", user.id);
        }
      }
    };
    sync();
  }, [isSignedIn, user]);

  return null;
}
