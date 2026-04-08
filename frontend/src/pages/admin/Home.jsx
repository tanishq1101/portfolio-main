import { useEffect, useState } from "react";
import API from "../services/api";

export default function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get("/profile").then(res => setProfile(res.data));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <>
      <h1>{profile.name}</h1>
      <p>{profile.title}</p>
      <p>{profile.bio}</p>
    </>
  );
}