import React from "react";

type TrType = {
  original: {
    key: any;
  };
  reference: {
    key: any;
  };
  "reference 1": {
    key: any;
  };
  "reference 2": {
    key: any;
  };
  "hit benchmark": {
    key: any;
  };
};

type TableType = {
  data: TrType;
};

const Tr: React.FC<{ name: string; keyObject: string; data: TrType }> = ({
  name,
  keyObject,
  data,
}) => {
  const isReference1 = "reference 1" in data;
  const isReference2 = "reference 2" in data;

  return (
    <tr className="border-b-[0.2px] border-b-[#D9D9D933]">
      <td className="p-3  font-Montserrat font-light">{name}</td>
      <td className="p-3  font-Montserrat font-light">
        {data?.original?.key?.[keyObject]?.toFixed(2)}
      </td>
      <td className="p-3  font-Montserrat font-light">
        {data?.reference?.key?.[keyObject]?.toFixed(2)}
      </td>
      {isReference1 ? (
        <td className="p-3  font-Montserrat font-light">
          {data?.["reference 1"]?.key?.[keyObject]?.toFixed(2)}
        </td>
      ) : null}
      {isReference2 ? (
        <td className="p-3  font-Montserrat font-light">
          {data?.["reference 2"]?.key?.[keyObject]?.toFixed(2)}
        </td>
      ) : null}
      <td className="p-3  text-[#4CAF50] ">
        {data?.["hit benchmark"]?.key?.[keyObject]}
      </td>
    </tr>
  );
};

export default function Table({ data }: TableType) {
  if (!data) {
    return null;
  }

  const isReference1 = "reference 1" in data;
  const isReference2 = "reference 2" in data;

  return (
    <table className="min-w-[100%]  text-white">
      <thead className="text-white">
        <tr>
          <th className="p-3 text-start right-[146px]">Parameters</th>
          <th className="p-3 text-start right-[58px]">Original</th>
          <th className="p-3 text-start right-[60px]">Reference</th>
          {isReference1 ? (
            <th className="p-3 text-start right-[60px]">Reference 1</th>
          ) : null}
          {isReference2 ? (
            <th className="p-3 text-start right-[60px]">Reference 2</th>
          ) : null}
          <th className="p-3 text-start right-[76px] text-[#4CAF50]">
            Hit Values
          </th>
        </tr>
      </thead>
      <tbody>
        <Tr name="Emotional Appeal" keyObject="emotional_appeal" data={data} />
        <Tr
          name="Instrumental Elements"
          keyObject="instrumental_elements"
          data={data}
        />
        <Tr
          name="Accoustic Presence"
          keyObject="acoustic_presence"
          data={data}
        />
        <Tr name="Energetic Vibes" keyObject="energetic_vibes" data={data} />
        <Tr
          name="Danceability Factor"
          keyObject="danceability_factor"
          data={data}
        />
        <Tr name="Lyrics clarity" keyObject="lyrics_clarity" data={data} />
        <Tr name="Sound Loudness" keyObject="sound_loudness" data={data} />
        <Tr name="Song Duration" keyObject="song_duration" data={data} />
        <Tr
          name="Vibe Intensity"
          // name="VibeLive Performance Energy"
          keyObject="live_performance_energy"
          data={data}
        />
        <Tr name="Tempo" keyObject="tempo" data={data} />
      </tbody>
    </table>
  );
}
