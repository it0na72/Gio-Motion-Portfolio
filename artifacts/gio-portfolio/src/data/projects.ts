export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  discipline: string;
  description: string;
  role: string;
  software: string[];
  cover: string;
  video: string;
  heroVideo?: string;
  accent: string;
  gallery: string[];
};

export const projects: Project[] = [
  {
    slug: 'afterimage',
    title: 'Afterimage',
    client: 'Independent short',
    year: '2024',
    discipline: 'Edit / Motion',
    description: 'A study of memory in motion — a 90-second film built from fractured rhythm, hand-processed frames and the spaces between a thought.',
    role: 'Editor, motion designer, colour',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    cover: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=1600',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
    heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
    accent: '#bf553d',
    gallery: [
      'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/161853/architecture-building-city-lights-city-161853.jpeg?auto=compress&cs=tinysrgb&w=1400',
    ],
  },
  {
    slug: 'field-notes',
    title: 'Field Notes',
    client: 'Aesop / Editorial',
    year: '2023',
    discipline: 'Edit / Film',
    description: 'An intimate visual essay made with a small crew across the northern coast. Quiet gestures, hard weather, no voice-over.',
    role: 'Editor',
    software: ['Premiere Pro', 'Audition', 'Lightroom'],
    cover: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1600',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-rocky-coastline-1091-large.mp4',
    accent: '#2f6560',
    gallery: [
      'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/1571738/pexels-photo-1571738.jpeg?auto=compress&cs=tinysrgb&w=1400',
    ],
  },
  {
    slug: 'new-myths',
    title: 'New Myths',
    client: 'NOWNESS',
    year: '2024',
    discipline: 'Motion / Titles',
    description: 'Main titles for a speculative series about the stories we inherit. Typography behaves like an object: it folds, drifts and leaves a mark.',
    role: 'Motion designer, title direction',
    software: ['After Effects', 'Cinema 4D', 'Illustrator'],
    cover: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=1600',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-1196-large.mp4',
    accent: '#9b7c54',
    gallery: [
      'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=1400',
    ],
  },
  {
    slug: 'soft-focus',
    title: 'Soft Focus',
    client: 'Mubi / Campaign',
    year: '2022',
    discipline: 'Edit / Motion',
    description: 'A set of short social films for films that reward a second look. Modular cuts, tactile type and a little room for silence.',
    role: 'Editor, motion designer',
    software: ['Premiere Pro', 'After Effects', 'Photoshop'],
    cover: 'https://images.pexels.com/photos/713664/pexels-photo-713664.jpeg?auto=compress&cs=tinysrgb&w=1600',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-under-colored-lights-1165-large.mp4',
    accent: '#6c5361',
    gallery: [
      'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg?auto=compress&cs=tinysrgb&w=1400',
    ],
  },
  {
    slug: 'common-ground',
    title: 'Common Ground',
    client: 'Monocle Films',
    year: '2021',
    discipline: 'Edit',
    description: 'A portrait of shared space in a city that never stops changing. Cut with a documentary instinct and an ear for incidental music.',
    role: 'Editor, finishing',
    software: ['Premiere Pro', 'DaVinci Resolve'],
    cover: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1600',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-11-large.mp4',
    accent: '#465a68',
    gallery: [
      'https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/1139556/pexels-photo-1139556.jpeg?auto=compress&cs=tinysrgb&w=1400',
    ],
  },
  {
    slug: 'the-long-way',
    title: 'The Long Way',
    client: 'Sonder Journal',
    year: '2020',
    discipline: 'Film / Edit',
    description: 'A travel piece about moving slowly, assembled from super 8, stills and long-held shots that refuse to rush to the next thing.',
    role: 'Director, editor',
    software: ['Premiere Pro', 'After Effects', 'Resolve'],
    cover: 'https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=1600',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-road-in-the-mountains-under-a-cloudy-sky-4633-large.mp4',
    accent: '#87644e',
    gallery: [
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/533923/pexels-photo-533923.jpeg?auto=compress&cs=tinysrgb&w=1400',
    ],
  },
];

export const featuredProject = projects[0];