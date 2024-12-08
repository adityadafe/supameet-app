import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { AiOutlineSpotify } from "react-icons/ai";
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [session, setSession] = useState<any>(null);
    const [currentSong, setCurrentSong] = useState<any>(null);

    useEffect(() => {
        async function getUserSession() {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching session:', error);
                return;
            }
            setSession(data.session);
            setIsAuthenticated(!!data.session);
            console.log(data.session)
        }
        getUserSession();
    }, []);

    useEffect(() => {
        async function getCurrentSong() {
            if (session && session.provider_token) {
                try {
                    const getCurrSongRawRes = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${session.provider_token}`,
                        },
                    });

                    if (getCurrSongRawRes.status === 204) {
                        // No song currently playing
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
                    setCurrentSong(songData);
                    console.log(songData)
                } catch (error) {
                    console.error('Error in fetch:', error);
                }
            }
        }

        async function getCurrentSongLyrics() {
            if (currentSong) {
                try {
                    const rawSongLyrics = await fetch(
                        `https://spclient.wg.spotify.com/color-lyrics/v2/track/${currentSong.id}/image/${currentSong.image}?format=json&vocalRemoval=false&market=from_token`, 
                        {
                            method: "GET",
                            headers: {
                                "accept": "application/json",
                                "accept-language": "en",
                                "app-platform": "WebPlayer",
                                "authorization": `Bearer ${session.provider_token}`,
                                "client-token": `${import.meta.env.VITE_SPOTIFY_TOKEN}`,
                                "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A_Brand";v="24"',
                                "sec-ch-ua-mobile": "?0",
                                "sec-ch-ua-platform": '"Linux"',
                                "spotify-app-version": "1.2.53.257.g47fa6c39",
                                "origin": "https://open.spotify.com",
                                "referer": "https://open.spotify.com/"
                            },
                            credentials: "include",
                            mode: "cors"
                        }
                    );
    
                    if (!rawSongLyrics.ok) {
                        console.error('Failed to fetch lyrics');
                        return;
                    }
    
                    const songLyrics = await rawSongLyrics.json();
                    console.log(songLyrics);
                } catch (error) {
                    console.error('Error fetching lyrics:', error);
                }
            }
        }
    
        if (isAuthenticated) {
            getCurrentSong().then(() => {
                getCurrentSongLyrics();
            });
        }

    }, [isAuthenticated, session]);

async function signInWithSpotify() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "spotify",
        options: {
            scopes: "user-read-currently-playing",
        }
    });

    if (error) {
        console.error("Error signing in:", error.message);
        alert("Failed to sign in with Spotify. Please try again.");
    }
}

return (
    <motion.header
        className="bg-transparent backdrop-blur-sm opacity-100 bg-size-4 mask-gradient"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="/" className="text-2xl font-bold text-gray-900">
                Typify
            </a>
            <nav>
                <ul className="flex space-x-8">
                    {isAuthenticated ? (
                        <Button
                            className='bg-green-300'
                            onClick={() => console.log(currentSong)}
                        >
                            {currentSong ? 'Now Playing' : 'Signed In'}
                        </Button>
                    ) : (
                        <Button
                            className='bg-green-300'
                            onClick={signInWithSpotify}
                        >
                            <AiOutlineSpotify size={20} />
                        </Button>
                    )}
                </ul>
            </nav>
        </div>
    </motion.header>
);
}