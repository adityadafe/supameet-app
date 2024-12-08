/* @global-imports */
import {  createRootRoute } from "@tanstack/react-router";
/* @local-imports */
import "./../index.css";
import Header from "@/components/nav";
import TypingTest from "@/components/typer";
import TypingKeyboard from "@/components/keyboard";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


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
  }, [isAuthenticated, session]); // Only run when isAuthenticated or session changes

  useEffect(() => {
    if (!currentSong) return;

    async function getCurrentSongLyrics() {
      try {
        const rawSongLyrics = await fetch(`https://api.lyrics.ovh/v1/${currentSong.artist}/${currentSong.name}`, {
          headers: {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Linux\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site"
          },
          referrer: "https://lyrics.ovh/",
          referrerPolicy: "strict-origin-when-cross-origin",
          method: "GET",
          mode: "cors",
          credentials: "omit"
        });

        if (!rawSongLyrics.ok) {
          console.error('Failed to fetch lyrics');
          return;
        }

        const songLyricsData = await rawSongLyrics.json();
        if (songLyricsData.lyrics !== songLyrics) {
          console.log(songLyricsData.lyrics);
          setSongLyrics(songLyricsData.lyrics);
        }
      } catch (error) {
        console.error('Error fetching lyrics:', error);
      }
    }

    getCurrentSongLyrics();
  }, [currentSong]); // Only run when currentSong changes


  // useEffect(() => {
  //   async function getCurrentSong() {
  //     if (session && session.provider_token) {
  //       try {
  //         const getCurrSongRawRes = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
  //           method: "GET",
  //           headers: {
  //             "Authorization": `Bearer ${session.provider_token}`,
  //           },
  //         });

  //         if (getCurrSongRawRes.status === 204) {
  //           // No song currently playing
  //           setCurrentSong(null);
  //           return;
  //         }

  //         const { item } = await getCurrSongRawRes.json();
  //         const songData = {
  //           id: item.id,
  //           image: encodeURIComponent(item.album.images[0].url),
  //           name: item.name,
  //           artist: item.artists[0].name
  //         };
  //         setCurrentSong(songData);
  //         console.log(songData);
  //       } catch (error) {
  //         console.error('Error in fetch:', error);
  //       }
  //     }
  //   }

  //   async function getCurrentSongLyrics() {
  //     if (currentSong) {
  //       try {
  //         const rawSongLyrics = await fetch(`https://api.lyrics.ovh/v1/${currentSong.artist}/${currentSong.name}`, {
  //           headers: {
  //             "accept": "application/json, text/javascript, */*; q=0.01",
  //             "accept-language": "en-US,en;q=0.9",
  //             "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
  //             "sec-ch-ua-mobile": "?0",
  //             "sec-ch-ua-platform": "\"Linux\"",
  //             "sec-fetch-dest": "empty",
  //             "sec-fetch-mode": "cors",
  //             "sec-fetch-site": "same-site"
  //           },
  //           referrer: "https://lyrics.ovh/",
  //           referrerPolicy: "strict-origin-when-cross-origin",
  //           method: "GET",
  //           mode: "cors",
  //           credentials: "omit"
  //         });

  //         if (!rawSongLyrics.ok) {
  //           console.error('Failed to fetch lyrics');
  //           return;
  //         }

  //         const songLyrics = await rawSongLyrics.json();
  //         console.log(songLyrics.lyrics);
  //         setSongLyrics(songLyrics.lyrics);
  //       } catch (error) {
  //         console.error('Error fetching lyrics:', error);
  //       }
  //     }
  //   }

  //   if (isAuthenticated && session) {
  //     getCurrentSong();
  //     getCurrentSongLyrics();
  //   }
  // }, [isAuthenticated, session, currentSong]);

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        session={session}
        setIsAuthenticated={setIsAuthenticated}
        setSession={setSession}
      />
      <TypingTest sampleText={songLyrics ? songLyrics : "Please"+"login"} />
      <TypingKeyboard />
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
