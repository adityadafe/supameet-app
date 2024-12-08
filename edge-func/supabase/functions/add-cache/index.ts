import { createClient } from 'jsr:@supabase/supabase-js@2'

import { corsHeaders } from './cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    // Handle CORS preflight request
    return new Response(null, {
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Allow-Origin': '*',
      },
      status: 204, // No Content
    });
  }
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { song, artist_name } = await req.json()

    let { data, error } = await supabase
      .from('lyrics-cache')
      .select('*')
      .eq('song_artist_name', song + artist_name)
      .single()

    if (error && error.code !== 'PGRST116') { 
      throw error
    }

    if (!data) {
      const fetchedData = await fetchSongArtistData(song, artist_name)

      let tempString = song + artist_name

      const { error: insertError } = await supabase
        .from('lyrics-cache')
        .insert({ song_artist_name:tempString, ...fetchedData })

      if (insertError) {
        throw insertError
      }

      data = fetchedData
    }

    return new Response(JSON.stringify({ data }), {
      headers: {
        ...corsHeaders, 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      status: 200,
    })
  } catch (err) {
    return new Response(String(err?.message ?? err), {
      status: 500,

      headers: {
        'Access-Control-Allow-Origin': '*' 
      }
    })
  }
})

// Placeholder function for making an API call to fetch song and artist data
async function fetchSongArtistData(song: string, artist_name: string) {
  try {
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist_name}/${song}`, {
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

    if (!response.ok) {
      console.error('Failed to fetch lyrics');
      return;
    }

    const songLyricsData = await response.json();
    return songLyricsData; // Return the fetched data
  } catch (error) {
    console.error('Error fetching lyrics:', error);
  }
}