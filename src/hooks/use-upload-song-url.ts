import {useSupabaseClient} from "@supabase/auth-helpers-react";

const useUploadSongUrl = (song: string): string => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return "";
  }

  const {data: songData} = supabaseClient
    .storage
    .from("songs")
    .getPublicUrl(song);

  return songData.publicUrl;
};

export default useUploadSongUrl;