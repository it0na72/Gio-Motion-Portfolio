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
  {
    slug: "project-06",
    title: "Project 06",
    category: "MOTION DESIGN",
    year: "—",
    description:
      "A place for another moving-image study. Replace this note with the real project context when media is available.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-06.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-06.jpg`,
    aspectRatio: "4/3",
    role: "Motion design",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-07",
    title: "Project 07",
    category: "VIDEO EDITING",
    year: "—",
    description:
      "A place for a vertical edit or social-first sequence. Note the pacing, format, and decisions that shaped the final version.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-07.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-07.jpg`,
    aspectRatio: "16/9",
    role: "Video editing",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-08",
    title: "Project 08",
    category: "VIDEO EDITING",
    year: "—",
    description:
      "A place for a vertical edit or social-first sequence. Note the pacing, format, and decisions that shaped the final version.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-08.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-08.jpg`,
    aspectRatio: "9/16",
    role: "Video editing",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-09",
    title: "Project 09",
    category: "MOTION DESIGN",
    year: "—",
    description:
      "A place for another moving-image study. Replace this note with the real project context when media is available.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-09.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-09.jpg`,
    aspectRatio: "9/16",
    role: "Motion design",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-10",
    title: "Project 10",
    category: "MOTION DESIGN",
    year: "—",
    description:
      "A place for another moving-image study. Replace this note with the real project context when media is available.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-10.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-10.jpg`,
    aspectRatio: "9/16",
    role: "Motion design",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-11",
    title: "Project 11",
    category: "MOTION DESIGN",
    year: "—",
    description:
      "A place for another moving-image study. Replace this note with the real project context when media is available.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-11.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-11.jpg`,
    aspectRatio: "9/16",
    role: "Motion design",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-12",
    title: "Project 12",
    category: "MOTION DESIGN",
    year: "—",
    description:
      "A place for another moving-image study. Replace this note with the real project context when media is available.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-12.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-12.jpg`,
    aspectRatio: "9/16",
    role: "Motion design",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-13",
    title: "Project 13",
    category: "MOTION DESIGN",
    year: "—",
    description:
      "A place for another moving-image study. Replace this note with the real project context when media is available.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-13.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-13.jpg`,
    aspectRatio: "9/16",
    role: "Motion design",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-14",
    title: "Project 14",
    category: "VIDEO EDITING",
    year: "—",
    description:
      "A place for a vertical edit or social-first sequence. Note the pacing, format, and decisions that shaped the final version.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-14.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-14.jpg`,
    aspectRatio: "16/9",
    role: "Video editing",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-15",
    title: "Project 15",
    category: "VIDEO EDITING",
    year: "—",
    description:
      "A place for a vertical edit or social-first sequence. Note the pacing, format, and decisions that shaped the final version.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-15.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-15.jpg`,
    aspectRatio: "1178/2556",
    role: "Video editing",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-16",
    title: "Project 16",
    category: "VIDEO EDITING",
    year: "—",
    description:
      "A place for a vertical edit or social-first sequence. Note the pacing, format, and decisions that shaped the final version.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-16.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-16.jpg`,
    aspectRatio: "9/16",
    role: "Video editing",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-17",
    title: "Project 17",
    category: "VIDEO EDITING",
    year: "—",
    description:
      "A place for a vertical edit or social-first sequence. Note the pacing, format, and decisions that shaped the final version.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-17.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-17.jpg`,
    aspectRatio: "9/16",
    role: "Video editing",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-18",
    title: "Project 18",
    category: "VIDEO EDITING",
    year: "—",
    description:
      "A place for a vertical edit or social-first sequence. Note the pacing, format, and decisions that shaped the final version.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-18.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-18.jpg`,
    aspectRatio: "9/16",
    role: "Video editing",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-19",
    title: "Project 19",
    category: "MOTION DESIGN",
    year: "—",
    description:
      "A place for another moving-image study. Replace this note with the real project context when media is available.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-19.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-19.jpg`,
    aspectRatio: "9/16",
    role: "Motion design",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-20",
    title: "Project 20",
    category: "MOTION DESIGN",
    year: "—",
    description:
      "A place for another moving-image study. Replace this note with the real project context when media is available.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-20.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-20.jpg`,
    aspectRatio: "9/16",
    role: "Motion design",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-21",
    title: "Project 21",
    category: "VIDEO EDITING",
    year: "—",
    description:
      "A place for a vertical edit or social-first sequence. Note the pacing, format, and decisions that shaped the final version.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-21.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-21.jpg`,
    aspectRatio: "16/9",
    role: "Video editing",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-22",
    title: "Project 22",
    category: "VIDEO EDITING",
    year: "—",
    description:
      "A place for a vertical edit or social-first sequence. Note the pacing, format, and decisions that shaped the final version.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-22.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-22.jpg`,
    aspectRatio: "9/16",
    role: "Video editing",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-23",
    title: "Project 23",
    category: "VIDEO EDITING",
    year: "—",
    description:
      "A place for a vertical edit or social-first sequence. Note the pacing, format, and decisions that shaped the final version.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-23.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-23.jpg`,
    aspectRatio: "9/16",
    role: "Video editing",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-24",
    title: "Project 24",
    category: "VIDEO EDITING",
    year: "—",
    description:
      "A place for a vertical edit or social-first sequence. Note the pacing, format, and decisions that shaped the final version.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-24.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-24.jpg`,
    aspectRatio: "9/16",
    role: "Video editing",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
];
