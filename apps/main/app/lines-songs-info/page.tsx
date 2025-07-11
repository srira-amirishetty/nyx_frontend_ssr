import React from "react";
interface Song {
  component: string;
  definition: string;
  examples: string;
  possibleTypes: string;
  specific: string;
}
export default function About() {
  const songs: Song[] = [
    {
      component: "Genre",
      definition:
        "The distinct category or style of music characterized by its specific musical elements, cultural influences, and audience appeal.",
      examples:
        " Bollywood: Music characterized by its integration with Indian cinema, featuring lively rhythms, catchy melodies, and expressive lyrics often centered around themes of love, celebration, and drama. <br>- Pop: Upbeat and catchy music with mainstream appeal, featuring memorable hooks, simple melodies, and lyrics that often revolve around love, relationships, and self-expression. <br>- Indian Classical: Traditional music rooted in Indian classical music traditions, characterized by intricate melodies, rhythmic patterns, and spiritual or philosophical themes. <br>- Folk: Music originating from the traditions of a particular region or community, featuring storytelling lyrics, acoustic instrumentation, and a strong connection to cultural heritage and traditions.",
      possibleTypes:
        "Bollywood, Pop, Indian Classical, Folk, Ghazal, Sufi, Hip-Hop, Indie, Rock, Electronic Dance Music (EDM), Jazz, Blues, Qawwali, Bhangra, Devotional",
      specific:
        "Bollywood: Dilbaro, Dilbaro, Mere Dilbaro... (From the movie Raazi), Pop: I wanna dance with somebody, I wanna feel the heat with somebody... (Whitney Houston - I Wanna Dance with Somebody), Indian Classical: Vaishnava Jana To (Traditional Indian Bhajan), Folk: Jhoom Barabar Jhoom Sharabi (Folk song from India)",
    },

    {
      component: "Mood",
      definition:
        "The emotional tone or atmosphere conveyed through the lyrical content and musical arrangement, evoking specific feelings or states of mind in the listener.",
      examples:
        "Sentimental: Music that evokes tender emotions, nostalgia, or introspection, often featuring heartfelt lyrics and gentle melodies. <br>- Energetic: Upbeat and dynamic music that inspires excitement, enthusiasm, and a sense of vitality, characterized by fast tempos, lively rhythms, and energetic vocals. <br>- Inspirational: Uplifting and motivational music that encourages optimism, perseverance, and self-improvement, featuring empowering lyrics and anthemic melodies. <br>- Romantic: Music that celebrates love, passion, and romance, conveying tender emotions and affectionate sentiments through poetic lyrics and soulful melodies. <br>- Melancholic: Music that expresses feelings of sadness, longing, or melancholy, often featuring introspective lyrics and haunting melodies that resonate with deep emotions. <br>- Humorous: Music that elicits laughter, amusement, or lightheartedness, featuring witty lyrics, playful melodies, and comedic elements. <br>- Peaceful: Serene and tranquil music that induces a sense of calm, relaxation, and inner peace, characterized by gentle melodies, soothing vocals, and ambient sounds. <br>- Nostalgic: Music that evokes memories of the past, nostalgia, or longing for bygone days, featuring wistful lyrics and melodies that transport listeners to another time or place. <br>- Hopeful: Music that inspires optimism, resilience, and belief in a better future, featuring uplifting lyrics and melodies that instill hope and confidence. <br>- Excited: Music that ignites excitement, thrill, or anticipation, featuring energetic rhythms, powerful vocals, and exhilarating instrumentation.",
      possibleTypes:
        "Happy, Sad, Angry, Peaceful, Excited, Romantic, Inspirational, Nostalgic, Humorous, Serious",

      specific:
        "Happy: Example lyrics for Happy., Sad: Example lyrics for Sad., Angry: Example lyrics for Angry., Peaceful: Example lyrics for Peaceful., Excited: Example lyrics for Excited., Romantic: Example lyrics for Romantic., Inspirational: Example lyrics for Inspirational., Nostalgic: Example lyrics for Nostalgic., Humorous: Example lyrics for Humorous., Serious: Example lyrics for Serious.",
    },
    {
      component: "Theme",
      definition:
        "The central idea, concept, or message explored and conveyed through the lyrical content, serving as the backbone of the song's narrative or emotional resonance.",
      examples:
        "Love Story: Explores the journey of love and romance. <br>- Celebration: Commemorates joyous occasions and achievements. <br>- Social Commentary: Addresses pressing social issues and cultural norms. <br>- Historical/Mythological Tales: Draws inspiration from history and mythology. <br>- Nature: Celebrates the beauty and wonder of the natural world. <br>- Adventure: Embarks on journeys of discovery and excitement. <br>- Friendship: Celebrates the bonds of camaraderie and mutual support. <br>- Heartbreak: Expresses the pain and sorrow of lost love. <br>- Victory: Celebrates triumph and overcoming adversity. <br>- Struggle: Acknowledges challenges and obstacles on life's journey.",
      possibleTypes:
        "AABB (Couplets) ,ABAB (Alternate Rhyme) ,ABCB (Ballad Stanza) ,ABBA (Envelope Rhyme) ,ABCABC (Sestet) ,No Rhyme (Free Verse)",

      specific:
        "AABB (Couplets): Example lyrics for AABB (Couplets)., ABAB (Alternate Rhyme): Example lyrics for ABAB (Alternate Rhyme)., ABCB (Ballad Stanza): Example lyrics for ABCB (Ballad Stanza)., ABBA (Envelope Rhyme): Example lyrics for ABBA (Envelope Rhyme)., ABCABC (Sestet): Example lyrics for ABCABC (Sestet)., No Rhyme (Free Verse): Example lyrics for No Rhyme (Free Verse).",
    },
    {
      component: "Persona",
      definition:
        "The identity or character adopted by the AI in its creative process.",
      examples:
        "Romantic Poet: Focuses on love and emotion. <br>- Witty Songwriter: Crafts clever, humorous lines. <br>- Reflective Storyteller: Tells stories with deeper meanings. <br>- Inspirational Leader: Uplifts with empowering messages. <br>- Nostalgic Narrator: Evokes longing and reminiscence. <br>- Futuristic Visionary: Explores innovative ideas ahead of their time. <br>- Spiritual Guru: Delivers spiritual insights and wisdom. <br>- Social Activist: Raises awareness for social change. <br>- Philosophical Thinker: Explores profound questions and concepts. <br>- Party Enthusiast: Creates high-energy anthems. <br>- Devotional Singer: Expresses devotion and reverence. <br>- Patriotic Songwriter: Celebrates national pride and unity.",
      possibleTypes:
        "Young Adults, Adults, Seniors, Children, Teenagers, All Ages",

      specific: "",
    },
    {
      component: "Format",
      definition:
        "The structure or organization of the lyrical content within a song, dictating the flow, pacing, and arrangement of verses, choruses, bridges, and other sections.",
      examples:
        " Structured Verses: Follows a traditional format with consistent rhyme schemes and meter. <br>- Call and Response: Features alternating sections of call and response vocals. <br>- Free Verses: Embraces a spontaneous approach to lyrical composition. <br>- Rap Verses: Characterized by rhythmic delivery and distinctive flow. <br>- Rhyming Couplets: Utilizes matching end rhymes for rhythmic cohesion. <br>- Chorus-Verse-Chorus: Alternates between verses and choruses for thematic reinforcement. <br>- AABA: Features two contrasting verses, a bridge, and a return to the initial verse. <br>- ABAB: Structured with alternating verses and choruses. <br>- AAA: Multiple verses with identical or similar content. <br>- Verse-Refrain: Incorporates a repeating refrain or chorus.",
      possibleTypes:
        "Structured Verses, Call and Responses, Free Verses, Rap Verses, Rhyming Couplets, Chorus-Verse-Chorus, AABA, ABAB (Alternating verses and choruses), AAA (All verses), Verse-Refrain",

      specific: "",
    },
    {
      component: "Target Listeners",
      definition:
        "The specific demographic or audience segment for which the lyrical content is intended to resonate.",
      examples:
        "Young Adults: Connects with the experiences and aspirations of young adults. <br>- Adults: Appeals to mature listeners with relatable themes and messages. <br>- Seniors: Engages older audiences with nostalgic or reflective content. <br>- Children: Offers fun and educational content suitable for young listeners. <br>- Teenagers: Speaks to the challenges and emotions of adolescence. <br>- All Ages: Appeals to a wide demographic range with universal themes and messages.",
      possibleTypes:
        "Young Adults, Adults, Seniors, Children, Teenagers, All Ages",

      specific: "",
    },
  ];
  return (
    <>
      <section className="bg-[#130625] h-full">
        <div className="w-[90%] container mx-auto py-16 px-6 h-full">
          <div className="flex mt-10 h-full g-6 text-white min-h-screen flex-col">
            <div className="w-full flex justify-center items-center text-3xl font-bold mb-6">
              Lines & Songs Information
            </div>
            <div>
              <table className="border-collapse border border-gray-400">
                <thead>
                  <tr className="text-xl font-bold border-b border-gray-400">
                    <th className="border-r border-gray-400">Component</th>
                    <th className="border-r border-gray-400">Definition</th>
                    <th className="border-r border-gray-400">
                      Examples in Lyrics Generation
                    </th>
                    <th className="border-r border-gray-400">Possible Types</th>
                    <th>Specific Examples for Each Type</th>
                  </tr>
                </thead>
                <tbody>
                  {songs.map((song, index) => (
                    <tr
                      key={index}
                      className="text-base font-normal border-b border-gray-400"
                    >
                      <td className="border-r border-gray-400">
                        {song.component}
                      </td>
                      <td className="border-r border-gray-400">
                        {song.definition}
                      </td>
                      <td className="border-r border-gray-400">
                        {song.examples}
                      </td>
                      <td className="border-r border-gray-400">
                        {song.possibleTypes}
                      </td>
                      <td>{song.specific}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
    // </Layout>
  );
}
