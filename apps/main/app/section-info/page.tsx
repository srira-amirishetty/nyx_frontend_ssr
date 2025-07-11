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
      component: "Style",
      definition:
        "The distinctive musical genre or category that influences the sound, instrumentation, and overall aesthetic of the song.",
      examples:
        "Pop: Features catchy melodies and upbeat rhythms with mainstream appeal. <br>- Rock: Emphasizes guitar-driven instrumentation and powerful vocals. <br>- Country: Incorporates storytelling lyrics and traditional country music elements. <br>- Rap: Characterized by rhythmic delivery and poetic lyrics often accompanied by beats. <br>- Classical: Showcases orchestral arrangements and timeless compositions. <br>- Jazz: Features improvisation, complex harmonies, and syncopated rhythms. <br>- Blues: Expresses emotions through soulful vocals and bluesy guitar riffs. <br>- R&B: Blends soulful vocals with rhythm and blues influences. <br>- Electronic: Utilizes synthesizers and electronic beats to create innovative sounds. <br>- Folk: Embraces acoustic instrumentation and storytelling traditions.",
      possibleTypes:
        "Pop Rock Country Rap Classical Jazz Blues R&B Electronic Folk",
      specific:
        "Pop: Example lyrics for Pop,Rock: Example lyrics for Rock,Country: Example lyrics for Country,Rap: Example lyrics for Rap,Classical: Example lyrics for Classical,Jazz: Example lyrics for Jazz,Blues: Example lyrics for Blues,R&B: Example lyrics for R&B.ElectronicExample lyrics for Electronic,Folk: Example lyrics for Folk.",
    },

    {
      component: "Tone",
      definition:
        "The emotional quality or atmosphere conveyed through the lyrical content and musical arrangement .",
      examples:
        "Happy: Elicits feelings of joy and positivity. <br>- Sad: Evokes emotions of melancholy and sorrow. <br>- Angry: Expresses feelings of frustration, rage, or indignation. <br>- Peaceful: Induces a sense of calm and tranquility. <br>- Excited: Ignites feelings of enthusiasm and anticipation. <br>- Romantic: Celebrates love and affection. <br>- Inspirational: Uplifts and motivates listeners. <br>- Nostalgic: Evokes fond memories of the past. <br>- Humorous: Elicits laughter and amusement. <br>- Serious: Conveys weighty or profound themes with gravitas.",
      possibleTypes:
        "Happy, Sad, Angry, Peaceful, Excited, Romantic, Inspirational, Nostalgic, Humorous, Serious",

      specific:
        "Happy: Example lyrics for Happy., Sad: Example lyrics for Sad., Angry: Example lyrics for Angry., Peaceful: Example lyrics for Peaceful., Excited: Example lyrics for Excited., Romantic: Example lyrics for Romantic., Inspirational: Example lyrics for Inspirational., Nostalgic: Example lyrics for Nostalgic., Humorous: Example lyrics for Humorous., Serious: Example lyrics for Serious.",
    },
    {
      component: "Rhyme Scheme",
      definition:
        "The pattern of rhymes at the end of each line in a song's lyrics.",
      examples:
        "AABB (Couplets): Features rhyming couplets, where two consecutive lines rhyme. <br>- ABAB (Alternate Rhyme): Alternates rhyme scheme between successive lines. <br>- ABCB (Ballad Stanza): Follows a pattern where the second and fourth lines rhyme. <br>- ABBA (Envelope Rhyme): Features a rhyme scheme where the first and fourth lines rhyme, and the second and third lines rhyme. <br>- ABCABC (Sestet): Follows a six-line stanza with a consistent pattern of rhymes. <br>- No Rhyme (Free Verse): Lacks a consistent rhyme scheme, allowing for greater flexibility in expression.",
      possibleTypes:
        "AABB (Couplets) ,ABAB (Alternate Rhyme) ,ABCB (Ballad Stanza) ,ABBA (Envelope Rhyme) ,ABCABC (Sestet) ,No Rhyme (Free Verse)",

      specific:
        "AABB (Couplets): Example lyrics for AABB (Couplets)., ABAB (Alternate Rhyme): Example lyrics for ABAB (Alternate Rhyme)., ABCB (Ballad Stanza): Example lyrics for ABCB (Ballad Stanza)., ABBA (Envelope Rhyme): Example lyrics for ABBA (Envelope Rhyme)., ABCABC (Sestet): Example lyrics for ABCABC (Sestet)., No Rhyme (Free Verse): Example lyrics for No Rhyme (Free Verse).",
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
              Sections Information
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
