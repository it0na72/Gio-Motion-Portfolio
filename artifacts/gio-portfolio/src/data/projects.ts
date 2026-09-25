export type ProjectMedia = {
  src: string;
  alt?: string;
  aspectRatio?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: "MOTION DESIGN" | "VIDEO EDITING";
  year: string;
  client?: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  aspectRatio: string;
  role: string;
  software: string[];
  gallery?: ProjectMedia[];
  media?: string[];
  placeholder: boolean;
};

export const projects: Project[] = [
  {
    slug: "project-01",
    title: "Spotify Portugal",
    client: "Spotify Portugal",
    category: "MOTION DESIGN",
    year: "—",
    description:
      "The idea explores a feature where users could create listening parties, add songs together, and listen to the same music in real time; almost like having your own private radio party with friends.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-01.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-01.jpg`,
    aspectRatio: "16/9",
    role: "Motion design",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-02",
    title: "luso日本語 Launch SAAS",
    category: "MOTION DESIGN",
    year: "—",
    description:
      "A place for an edit-driven project. Describe the cut, the source material, and what the final piece needed to feel like.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-02.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-02.jpg`,
    aspectRatio: "4/3",
    role: "Motion design",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-03",
    title: "Everything that happens once",
    category: "MOTION DESIGN",
    year: "—",
    description:
      "A place for a title, identity, or graphic system in motion. Keep the description specific to the problem and the movement.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-03.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-03.jpg`,
    aspectRatio: "4/3",
    role: "Motion design",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-04",
    title: "Japan Embassy Vlog",
    category: "VIDEO EDITING",
    year: "—",
    description:
      "A place for a vertical edit or social-first sequence. Note the pacing, format, and decisions that shaped the final version.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-04.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-04.jpg`,
    aspectRatio: "16/9",
    role: "Video editing",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-05",
    title: "luso日本語 SAAS - Japanese with Manga",
    category: "MOTION DESIGN",
    year: "—",
    description:
      "A place for another moving-image study. Replace this note with the real project context when media is available.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-05.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-05.jpg`,
    aspectRatio: "16/9",
    role: "Motion design",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
];
