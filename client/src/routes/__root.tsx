import {  createRootRoute } from "@tanstack/react-router";
import "./../index.css";
import Header from "@/components/nav";
import TypingTest from "@/components/typer";
import TypingKeyboard from "@/components/keyboard";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/footer";


function RootComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [songLyrics, setSongLyrics] = useState<string | null>(null);

  useEffect(() => {
    async function getUserSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        return;
      }
      setSession(data.session);
      setIsAuthenticated(!!data.session);
      console.log(data.session);
    }
    getUserSession();
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !session) return;

    async function getCurrentSong() {
      try {
        const getCurrSongRawRes = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${session.provider_token}`,
          },
        });

        if (getCurrSongRawRes.status === 204) {
          setCurrentSong(null);
          return;
        }

        const { item } = await getCurrSongRawRes.json();
        const songData = {
          id: item.id,
          image: encodeURIComponent(item.album.images[0].url),
          name: item.name,
          artist: item.artists[0].name
        };
        if (JSON.stringify(songData) !== JSON.stringify(currentSong)) {
          setCurrentSong(songData);
          console.log(songData);
        }
      } catch (error) {
        console.error('Error in fetch:', error);
      }
    }

    getCurrentSong();
  }, [isAuthenticated, session]); 

  useEffect(() => {
    if (!currentSong) return;

    async function getCurrentSongLyrics() {
      try {
        const rawSongLyrics = await fetch("https://twffnqmwqvpgvpdxkbvb.supabase.co/functions/v1/add-cache", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
          },
          body: JSON.stringify({
            song: currentSong.name,
            artist_name: currentSong.artist,
          }),
      })

        if (!rawSongLyrics.ok) {
          console.error('Failed to fetch lyrics');
          return;
        }

        const songLyricsData = await rawSongLyrics.json();
        if (songLyricsData.lyrics !== songLyrics) {
          console.log(songLyricsData.data.lyrics);
          setSongLyrics(songLyricsData.data.lyrics);
        }
      } catch (error) {
        console.error('Error fetching lyrics:', error);
      }
    }

    getCurrentSongLyrics();
  }, [currentSong]); 


  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        session={session}
        setIsAuthenticated={setIsAuthenticated}
        setSession={setSession}
      />
      <TypingTest sampleText={songLyrics ? songLyrics : "Please"+"login"+"(or)"+"listen"+"to"+"song"} />
      <TypingKeyboard />
      <Footer/>
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
