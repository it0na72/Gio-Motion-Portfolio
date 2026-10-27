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
      "A dark, Spotify-green interface introduces a shared listening-party idea: friends add tracks to one queue and listen together in real time. The film moves between short feature messages, the party-creation screen and a collaborative playlist, using restrained type and interface animation to make the flow easy to follow.",
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
      "A launch film for luso日本語 moves from the wordmark into lesson setup and course screens, then closes on the site address. A spare white, black and red palette and short text-led transitions keep attention on the learning product.",
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
      "A Portuguese text-led film pairs numbered passages with documentary fragments, including a letter and personal imagery. Analog-TV scanlines, chromatic offsets and abrupt switches between quote cards and captured details give the reflective sequence a deliberately worn, editorial texture.",
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
      "A vlog-style walk through Japan follows Gio speaking directly to camera outdoors and later indoors. Yellow subtitles, changes in framing and a pronounced zoom transition give the personal footage a brisk, social-video edit.",
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
      "A luso日本語 learning piece introduces Japanese study through manga, chat-style prompts and short video inserts of the teachers. White and blush-pink cards, speech bubbles and a simple brand end card keep the lesson approachable and easy to scan.",
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
      "Bold Portuguese phrases appear as rough, grain-textured title cards, then give way to a short outdoor shot of the presenter. The edit punctuates its message with oversized words, clipped transitions and a high-contrast paper-like finish.",
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
      "A personal, vertical montage opens with a Japanese-and-Portuguese title card before cutting between creator footage and graphic inserts. CRT scanlines, a neon grid, large overlaid words and quick scene changes give the sequence a retro, arcade-like frame.",
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
      "Two speakers appear in stacked video windows throughout this vertical conversation. Japanese and Portuguese subtitles sit over the footage while the framed layout keeps both sides of the exchange visible.",
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
      "A Japanese vocabulary explainer builds from a word and its Portuguese meaning to short example cards. Warm coral-to-yellow gradients, bold type, small UI-like panels and a closing brand mark give the vertical lesson a clear, repeatable structure.",
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
      "A presenter appears in a circular crop beside large Japanese-learning headlines and short speech bubbles. The piece switches from vocabulary-style cards to a mock video-call screen, then resolves on the luso日本語 mark.",
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
      "This vocabulary reel presents a Japanese term with its reading, Portuguese meaning and an example phrase. Repeated coral-and-yellow cards, a soft textured background and compact type keep each learning step legible in the vertical frame.",
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
      "Japanese and Portuguese text cards introduce a term for kidney stones before the presenter appears on camera. The sequence alternates between cool blue graphic backgrounds, the speaker and short captioned explanations.",
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
      "A presenter-led Japanese lesson moves between a circular face crop, highlighted phrase cards and a brief manga or anime image. Large Portuguese labels and smaller Japanese text make the vocabulary the focus of each quick visual change.",
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
      "A casual, close-framed conversation cuts between several warm-lit shots of the presenter. Portuguese subtitles follow the speech, while changes in crop and brief reaction moments keep the direct-to-camera edit moving.",
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
      "A vertical screen recording moves through a map and place-listing interface, pairing location names with photographs and detail cards. The edit stays close to the phone screen as the map view changes between stops.",
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
      "A personal vertical montage moves from close-ups of a book and a puzzle cube to street scenes, food and creator footage in Japan. Short captions connect the varied clips, with quick cuts carrying the sequence from small details to wider travel moments.",
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
      "The presenter speaks to camera between bold caption cards, city footage and illustrated or anime imagery. Large Portuguese phrases and varied portrait layouts break the commentary into short, emphatic beats.",
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
      "A presenter-led language reel combines direct-to-camera footage with Japanese and Portuguese captions, chat-like graphics and a brief brand graphic. The repeated overlays keep key phrases visible while the speaker remains central.",
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
      "A bright pink social-style sequence alternates between two-speaker clips, creator tiles and large text cards about favourite YouTubers. A visible like counter and stacked portrait frames borrow familiar elements from social feeds.",
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
      "A low-light, front-facing night vlog is punctuated by Portuguese captions about food and everyday experiences in Japan. The handheld footage stays close to the speaker, with bright text providing contrast against the dark image.",
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
      "A quick montage moves through Japanese interiors, streets and food, shifting from a distorted title treatment into full-colour location footage. Short, high-contrast overlays and abrupt cuts give the travel imagery a compact, energetic edit.",
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
      "A Japanese-with-manga lesson opens on a colourful title card, then places the presenter over black-and-white manga panels. Japanese dialogue and Portuguese subtitles appear in short, timed captions as the page details change.",
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
      "This longer manga-based lesson keeps the presenter beside changing black-and-white panels while Japanese phrases and Portuguese explanations appear over the page. Selective highlights and repeated panel crops guide attention through the examples.",
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
      "Two people speak in stacked portrait windows, with Japanese captions and Portuguese subtitles appearing around their footage. The edit holds the paired layout through the conversation and changes the highlighted text as the exchange continues.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-24.mp4`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-24.jpg`,
    aspectRatio: "9/16",
    role: "Video editing",
    software: ["After Effects", "Premiere Pro"],
    placeholder: false,
  },
  {
    slug: "project-25",
    title: "Project 25",
    category: "MOTION DESIGN",
    year: "—",
    description:
      "A short product film moves through the luso日本語 lesson interface, showing a learning screen, a completed-lesson state and the site's closing mark. Soft white and blush-pink fields, subtle interface movement and clear labels keep the focus on the product.",
    videoUrl: `${import.meta.env.BASE_URL}media/project-25.m4v`,
    thumbnail: `${import.meta.env.BASE_URL}media/project-25.jpg`,
    aspectRatio: "1/1",
    role: "Motion design",
    software: [],
    placeholder: false,
  },
];
