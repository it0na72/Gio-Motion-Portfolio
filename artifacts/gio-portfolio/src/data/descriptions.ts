// EASY EDIT FILE: change the text inside the quotes for any project.
// Each project has an English (en), Portuguese (pt) and Japanese (jp) version.
// "project-01" etc. match the project names in projects.ts / public/media.
// Tip: keep each description to 1-3 short sentences. Use \" if you need a quote mark inside the text.

export type Language = "en" | "pt" | "jp";

export const descriptions: Record<string, Record<Language, string>> = {
  // ---------- MOTION DESIGN ----------
  "project-01": {
    en: "Motion design for Spotify Portugal's listening party feature. Friends add songs to one queue and listen together. I kept the type clean and let the interface do the talking.",
    pt: "Motion design para a funcionalidade de listening party do Spotify Portugal. Os amigos adicionam músicas a uma fila e ouvem juntos. Mantive a tipografia limpa e deixei a interface falar por si.",
    jp: "Spotify Portugalのリスニングパーティー機能のモーションデザイン。友達が1つのキューに曲を追加して一緒に聴けます。タイポはシンプルに、UIの動きで見せています。",
  },
  "project-02": {
    en: "Launch video for luso日本語. It starts with the logo, goes through the lesson setup and the course screens, and ends on the website. Simple white, black and red.",
    pt: "Vídeo de lançamento do luso日本語. Começa com o logótipo, passa pela criação das aulas e pelo ecrã dos cursos, e termina no site. Branco, preto e vermelho, sem complicar.",
    jp: "luso日本語のローンチ動画。ロゴから始まり、レッスン設定とコース画面を見せて、サイトで締めます。白・黒・赤のシンプルな配色です。",
  },
  "project-03": {
    en: "A text-driven piece in Portuguese, mixing numbered quotes with real footage and a letter. I gave it an old TV look with scanlines and glitchy colour shifts.",
    pt: "Um vídeo em português guiado por texto, com citações numeradas, imagens reais e uma carta. Dei-lhe um look de TV antiga, com linhas de scan e cores a falhar.",
    jp: "ポルトガル語のテキスト中心の映像。番号付きの言葉、実際の映像、手紙を組み合わせました。走査線とカラーずれで古いテレビのような質感にしています。",
  },
  "project-05": {
    en: "An intro to learning Japanese through manga for luso日本語. Chat bubbles, short clips of the teachers and soft pink cards that keep it friendly and easy to follow.",
    pt: "Uma introdução ao japonês através do manga para o luso日本語. Balões de chat, pequenos clips dos professores e cartões rosa suaves para tudo ficar simpático e fácil de seguir.",
    jp: "luso日本語の、マンガで日本語を学ぶ紹介動画。チャット風の吹き出し、先生たちの短いクリップ、やさしいピンクのカードで親しみやすくしています。",
  },
  "project-06": {
    en: "Big rough Portuguese phrases on grainy paper-style cards, then a quick outdoor shot of the presenter. Loud words, fast cuts.",
    pt: "Frases grandes em português em cartões granulados, estilo papel, e depois um plano rápido da apresentadora no exterior. Palavras grandes, cortes rápidos.",
    jp: "ざらついた紙のようなカードに大きなポルトガル語のフレーズ、そのあと屋外のプレゼンターの短いカット。大きな言葉と速いカット割りです。",
  },
  "project-09": {
    en: "A Japanese vocabulary video: the word, its Portuguese meaning, then a few examples. Warm orange and yellow colours, same structure every time so it's easy to repeat.",
    pt: "Um vídeo de vocabulário japonês: a palavra, o significado em português e alguns exemplos. Cores quentes de laranja e amarelo, sempre com a mesma estrutura para ser fácil de repetir.",
    jp: "日本語の単語動画。単語、ポルトガル語の意味、そして例文の順に見せます。暖かいオレンジとイエローで、毎回同じ構成にして作りやすくしました。",
  },
  "project-10": {
    en: "The presenter sits in a round frame next to big Japanese learning headlines and speech bubbles. It switches to a fake video call and ends on the luso日本語 logo.",
    pt: "A apresentadora aparece num círculo ao lado de grandes títulos sobre aprender japonês e balões de fala. Passa para uma falsa videochamada e termina no logótipo do luso日本語.",
    jp: "丸いフレームのプレゼンターと、大きな日本語学習の見出しや吹き出し。途中でビデオ通話風の画面に切り替わり、luso日本語のロゴで終わります。",
  },
  "project-11": {
    en: "Vocabulary reel with a Japanese word, its reading, the Portuguese meaning and an example sentence. Orange and yellow cards on a soft textured background.",
    pt: "Reel de vocabulário com uma palavra japonesa, a leitura, o significado em português e uma frase de exemplo. Cartões laranja e amarelo sobre um fundo suave com textura.",
    jp: "日本語の単語、読み方、ポルトガル語の意味、例文を見せるボキャブラリーリール。柔らかいテクスチャの背景にオレンジとイエローのカードを使っています。",
  },
  "project-12": {
    en: "Japanese and Portuguese text cards introduce the word for kidney stones, then the presenter comes on camera. Cool blue backgrounds and short captions.",
    pt: "Cartões de texto em japonês e português apresentam a palavra para pedras nos rins, e depois aparece a apresentadora. Fundos azuis frios e legendas curtas.",
    jp: "日本語とポルトガル語のテキストカードで「腎臓結石」という言葉を紹介し、そのあとプレゼンターが登場します。涼しい青の背景と短いキャプションです。",
  },
  "project-13": {
    en: "A Japanese lesson with the presenter in a round crop, highlighted phrase cards and a quick manga or anime image. Big Portuguese labels so the vocabulary stands out.",
    pt: "Uma aula de japonês com a apresentadora num recorte redondo, cartões de frases destacadas e uma imagem rápida de manga ou anime. Etiquetas grandes em português para o vocabulário se destacar.",
    jp: "丸く切り抜いたプレゼンター、ハイライトしたフレーズカード、短いマンガやアニメの画像で見せる日本語レッスン。大きなポルトガル語のラベルで単語が目立ちます。",
  },
  "project-19": {
    en: "A bright pink, social-media style video about favourite YouTubers. Two-person clips, creator tiles, big text cards and a like counter.",
    pt: "Um vídeo cor-de-rosa vivo, ao estilo das redes sociais, sobre os youtubers favoritos. Clips de duas pessoas, cartões de criadores, texto grande e um contador de likes.",
    jp: "好きなYouTuberについての、鮮やかなピンクのSNS風動画。2人のクリップ、クリエイターのタイル、大きなテキストカード、いいねカウンターを使っています。",
  },
  "project-20": {
    en: "A night vlog filmed close to the camera in low light, with bright Portuguese captions about food and daily life in Japan.",
    pt: "Um vlog noturno filmado perto da câmara com pouca luz, com legendas brilhantes em português sobre comida e o dia a dia no Japão.",
    jp: "暗い場所でカメラに近づいて撮ったナイトVlog。日本での食事や日常について、明るいポルトガル語のキャプションを入れています。",
  },
  "project-25": {
    en: "A short product video for luso日本語. It shows a lesson screen, a finished lesson and the closing logo, with soft white and pink and small interface movements.",
    pt: "Um vídeo curto do produto luso日本語. Mostra um ecrã de aula, uma aula concluída e o logótipo final, com branco e rosa suaves e pequenos movimentos na interface.",
    jp: "luso日本語の短いプロダクト動画。レッスン画面、完了したレッスン、最後のロゴを見せます。やさしい白とピンク、控えめなUIの動きです。",
  },

  // ---------- VIDEO EDITING ----------
  "project-04": {
    en: "A vlog of me walking around Japan, talking to the camera outdoors and indoors. Yellow subtitles, different framings and a big zoom transition to keep it quick.",
    pt: "Um vlog meu a andar pelo Japão, a falar para a câmara no exterior e no interior. Legendas amarelas, enquadramentos diferentes e uma grande transição de zoom para manter o ritmo.",
    jp: "日本を歩きながら、屋外と屋内でカメラに向かって話すVlog。黄色い字幕、いろいろな構図、大きなズームトランジションでテンポよく見せています。",
  },
  "project-07": {
    en: "A vertical montage that starts with a Japanese and Portuguese title card, then cuts between creator footage and graphics. CRT scanlines and a neon grid for a retro arcade feel.",
    pt: "Uma montagem vertical que começa com um título em japonês e português e depois alterna entre imagens do criador e gráficos. Linhas CRT e uma grelha néon para um ar retro de arcade.",
    jp: "日本語とポルトガル語のタイトルから始まり、クリエイターの映像とグラフィックを切り替える縦型モンタージュ。CRTの走査線とネオンのグリッドでレトロなアーケード風にしました。",
  },
  "project-08": {
    en: "A vertical conversation with two speakers in stacked windows. Japanese and Portuguese subtitles on top so you can follow both sides.",
    pt: "Uma conversa vertical com duas pessoas em janelas empilhadas. Legendas em japonês e português por cima para acompanhar os dois lados.",
    jp: "2人が上下に並んだ縦型の会話動画。日本語とポルトガル語の字幕を重ねて、両方の話が追えるようにしています。",
  },
  "project-14": {
    en: "A relaxed close-up conversation cut between a few warm-lit shots. Portuguese subtitles, crop changes and small reaction moments keep it moving.",
    pt: "Uma conversa descontraída em grande plano, cortada entre vários planos com luz quente. Legendas em português, mudanças de enquadramento e pequenos momentos de reação mantêm o ritmo.",
    jp: "暖かい光の中、何カットかをつないだリラックスした近距離の会話。ポルトガル語の字幕、クロップの変化、小さなリアクションでテンポを保っています。",
  },
  "project-15": {
    en: "A vertical screen recording of a map and place listings, matching place names with photos and detail cards. I stayed close to the phone screen as the map moves between stops.",
    pt: "Uma gravação de ecrã vertical de um mapa e lista de locais, com nomes de sítios, fotos e cartões de detalhes. Fiquei perto do ecrã do telemóvel enquanto o mapa passa de paragem em paragem.",
    jp: "地図と場所リストの縦型画面収録。場所の名前に写真や詳細カードを合わせています。地図が各スポットに移るあいだ、スマホ画面に寄ったまま見せます。",
  },
  "project-16": {
    en: "A personal vertical montage: a book and a puzzle cube, then streets, food and creator footage in Japan. Short captions and quick cuts from small details to bigger travel moments.",
    pt: "Uma montagem vertical pessoal: um livro e um cubo mágico, depois ruas, comida e imagens do criador no Japão. Legendas curtas e cortes rápidos dos pequenos detalhes para os momentos de viagem.",
    jp: "本とパズルキューブから、日本の街並み、食べ物、クリエイターの映像へとつなぐ個人的な縦型モンタージュ。短いキャプションと速いカットで、小さなディテールから旅の瞬間へ広がります。",
  },
  "project-17": {
    en: "I talk to the camera between bold caption cards, city footage and anime images. Big Portuguese phrases split everything into short punchy moments.",
    pt: "Falo para a câmara entre cartões de legenda, imagens da cidade e imagens de anime. Frases grandes em português dividem tudo em momentos curtos e fortes.",
    jp: "太いキャプションカード、街の映像、アニメの画像のあいだにカメラへ向かって話します。大きなポルトガル語のフレーズで、短くインパクトのある区切りを作っています。",
  },
  "project-18": {
    en: "A language reel with the presenter talking to camera, Japanese and Portuguese captions, chat-style graphics and a quick logo at the end. Key phrases stay on screen.",
    pt: "Um reel de línguas com a apresentadora a falar para a câmara, legendas em japonês e português, gráficos estilo chat e um logótipo rápido no fim. As frases importantes ficam no ecrã.",
    jp: "カメラに向かって話すプレゼンター、日本語とポルトガル語のキャプション、チャット風グラフィック、最後に短いロゴ。大事なフレーズは画面に残します。",
  },
  "project-21": {
    en: "A fast montage of Japanese interiors, streets and food. It starts with a distorted title and turns into full-colour footage with short, punchy overlays.",
    pt: "Uma montagem rápida de interiores, ruas e comida do Japão. Começa com um título distorcido e passa para imagens a cores com textos curtos e fortes.",
    jp: "日本の室内、街、食べ物を見せるテンポの速いモンタージュ。歪んだタイトルから始まり、フルカラーの映像に変わって、短くはっきりしたテキストを重ねます。",
  },
  "project-22": {
    en: "A Japanese-with-manga lesson. It opens on a colourful title, then puts the presenter over black and white manga pages with timed Japanese and Portuguese captions.",
    pt: "Uma aula de japonês com manga. Abre com um título colorido e depois coloca a apresentadora sobre páginas de manga a preto e branco, com legendas temporizadas em japonês e português.",
    jp: "マンガで学ぶ日本語レッスン。カラフルなタイトルで始まり、白黒のマンガのページの上にプレゼンターを置いて、日本語とポルトガル語のキャプションをタイミングよく出します。",
  },
  "project-23": {
    en: "A longer manga lesson with me next to changing black and white panels. Japanese phrases and Portuguese explanations appear over the page, with highlights to guide your eyes.",
    pt: "Uma aula mais longa com manga, comigo ao lado de painéis a preto e branco que vão mudando. Frases em japonês e explicações em português aparecem por cima, com destaques para guiar o olhar.",
    jp: "白黒のコマが切り替わる横で話す、長めのマンガレッスン。日本語のフレーズとポルトガル語の説明がページの上に出て、ハイライトで視線を誘導します。",
  },
  "project-24": {
    en: "Two people talking in stacked portrait windows, with Japanese captions and Portuguese subtitles around them. The layout stays the same while the highlighted text changes.",
    pt: "Duas pessoas a conversar em janelas verticais empilhadas, com legendas em japonês e português à volta. O layout mantém-se enquanto o texto destacado muda.",
    jp: "縦長の窓に上下に並んで話す2人と、その周りの日本語キャプションとポルトガル語字幕。レイアウトは変えずに、ハイライトされる文字だけが変わります。",
  },
};

export function getDescriptions(language: Language): Record<string, string> {
  return Object.fromEntries(
    Object.entries(descriptions).map(([slug, text]) => [slug, text[language]]),
  );
}
