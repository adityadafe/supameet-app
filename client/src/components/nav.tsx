import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { AiOutlineSpotify } from "react-icons/ai";
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

interface HeaderProps {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    session: any; 
    setSession: React.Dispatch<React.SetStateAction<any>>; 
}

export default function Header({isAuthenticated, setIsAuthenticated, session, setSession}:HeaderProps) {
  

    async function logOut(){
       const{error}= await supabase.auth.signOut()
            if (error) {
                console.error('Error fetching session:', error);
                return;
            }
            setSession(null)
            setIsAuthenticated(false);
    }

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
                                onClick={logOut}
                            >
                               Sign-out 
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