import { createContext, createElement, useContext, useEffect, useState, type ReactNode } from 'react';

export type Language = 'en' | 'pt' | 'jp';

export const languageOptions: { code: Language; label: string; htmlLang: string }[] = [
  { code: 'en', label: 'EN', htmlLang: 'en' },
  { code: 'pt', label: 'PT', htmlLang: 'pt' },
  { code: 'jp', label: 'JP', htmlLang: 'ja' },
];

const translations = {
  en: {
    nav: { work: 'Work', about: 'About', contact: 'Contact' },
    navigation: {
      primary: 'Primary navigation',
      mobile: 'Mobile navigation',
      project: 'Project navigation',
      filterWork: 'Filter selected work',
      open: 'Open navigation',
      close: 'Close navigation',
      language: 'Language',
    },
    hero: {
      eyebrow: 'Independent editor / motion designer',
      editor: 'Video editor',
      motion: 'Motion designer',
      description: 'Editing videos, building motion systems, and making things move.',
      based: 'Based in Japan',
      availability: 'Available worldwide',
    },
    home: {
      selectedWork: 'Selected work',
      sectionFirst: 'A moving',
      sectionSecond: 'picture.',
      workEyebrow: 'Work',
      statement: 'Selected work.',
    },
    filters: { all: 'ALL', motion: 'MOTION DESIGN', editing: 'VIDEO EDITING' },
    work: {
      archiveEyebrow: 'Archive / selected work',
      title: 'The work',
      lead: 'Video editing and motion design, with the project context left visible.',
      countSuffix: 'projects / currently being filled',
    },
    about: {
      eyebrow: 'About / the person behind the timeline',
      titleFirst: 'Make it move',
      titleSecond: 'with purpose.',
      indexName: 'GIO OLIVEIRA',
      lead: 'Gio is a video editor and motion designer based in Japan.',
      copy: 'Working from the cut outward, Gio builds films and motion systems around rhythm, clarity, and the details that stay in your head after the frame is gone.',
      focus: 'Focus',
      videoEditing: 'Video Editing',
      motionDesign: 'Motion Design',
    },
    contact: {
      bandEyebrow: 'Have a project in mind?',
      bandTitleFirst: 'Let’s make',
      bandTitleSecond: 'something move.',
      startConversation: 'Start a conversation',
      eyebrow: 'Contact / hello',
      title: 'Let’s talk.',
      lead: 'Have a project in mind?',
      messageNoted: 'Message noted.',
      thanks: 'Thanks for reaching out. Gio will be in touch soon.',
      sendAnother: 'Send another',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@studio.com',
      project: 'Project',
      projectPlaceholder: 'A few words about the project...',
      sendMessage: 'Send message',
    },
    footer: {
      role: 'VIDEO EDITOR / MOTION DESIGNER',
      email: 'Email',
    },
    project: {
      notes: 'Project notes',
      role: 'Role',
      software: 'Software',
      client: 'Client',
      additionalMedia: 'Additional media',
      previous: 'Previous',
      next: 'Next',
      backToWork: 'Back to work',
      placeholderStatus: 'Placeholder project — replace with Gio’s work',
      notFoundEyebrow: '404 / not found',
      notFoundTitle: 'No such cut.',
      notFoundBack: 'Back to the work',
      projectFilm: 'project film',
      videoPreview: 'video preview',
      thumbnail: 'thumbnail',
      additionalMediaAlt: 'additional media',
    },
    media: {
      placeholder: 'MEDIA PLACEHOLDER',
      placeholderBadge: 'Placeholder',
    },
    projectRoles: { motion: 'Motion design', editing: 'Video editing' },
    projectDescriptions: {
      'project-01': 'A place for a motion-led piece. Add a short note about the idea, rhythm, and visual language once the work is ready to share.',
      'project-02': 'A place for an edit-driven project. Describe the cut, the source material, and what the final piece needed to feel like.',
      'project-03': 'A place for a title, identity, or graphic system in motion. Keep the description specific to the problem and the movement.',
      'project-04': 'A place for a vertical edit or social-first sequence. Note the pacing, format, and decisions that shaped the final version.',
      'project-05': 'A place for another moving-image study. Replace this note with the real project context when media is available.',
    },
    notFound: {
      title: '404 Page Not Found',
      body: 'Did you forget to add the page to the router?',
    },
  },
  pt: {
    nav: { work: 'Trabalho', about: 'Sobre', contact: 'Contacto' },
    navigation: {
      primary: 'Navegação principal',
      mobile: 'Navegação móvel',
      project: 'Navegação do projeto',
      filterWork: 'Filtrar trabalho selecionado',
      open: 'Abrir navegação',
      close: 'Fechar navegação',
      language: 'Idioma',
    },
    hero: {
      eyebrow: 'Editor independente / designer de motion',
      editor: 'Editor de vídeo',
      motion: 'Designer de motion',
      description: 'A editar vídeos, a criar sistemas de motion e a dar movimento às ideias.',
      based: 'Com base no Japão',
      availability: 'Disponível em todo o mundo',
    },
    home: {
      selectedWork: 'Trabalho selecionado',
      sectionFirst: 'Uma imagem',
      sectionSecond: 'em movimento.',
      workEyebrow: 'Trabalho',
      statement: 'Trabalho selecionado.',
    },
    filters: { all: 'TODOS', motion: 'MOTION DESIGN', editing: 'EDIÇÃO DE VÍDEO' },
    work: {
      archiveEyebrow: 'Arquivo / trabalho selecionado',
      title: 'Vídeos',
      lead: 'Edição de vídeo e motion design, com o contexto de cada projeto visível.',
      countSuffix: 'projetos / em preenchimento',
    },
    about: {
      eyebrow: 'Sobre / a pessoa por detrás da timeline',
      titleFirst: 'Dar movimento',
      titleSecond: 'com intenção.',
      indexName: 'GIO OLIVEIRA',
      lead: 'Gio é editor de vídeo e designer de motion, com base no Japão.',
      copy: 'A partir do corte, Gio cria filmes e sistemas de motion com ritmo, clareza e atenção aos detalhes que ficam na memória depois do fim do plano.',
      focus: 'Áreas',
      videoEditing: 'Edição de vídeo',
      motionDesign: 'Motion design',
    },
    contact: {
      bandEyebrow: 'Tem um projeto em mente?',
      bandTitleFirst: 'Vamos dar',
      bandTitleSecond: 'movimento a algo.',
      startConversation: 'Iniciar conversa',
      eyebrow: 'Contacto / olá',
      title: 'Vamos falar.',
      lead: 'Tem um projeto em mente?',
      messageNoted: 'Mensagem registada.',
      thanks: 'Obrigado pelo contacto. O Gio responderá em breve.',
      sendAnother: 'Enviar outra',
      name: 'Nome',
      namePlaceholder: 'O seu nome',
      email: 'Email',
      emailPlaceholder: 'voce@studio.com',
      project: 'Projeto',
      projectPlaceholder: 'Algumas palavras sobre o projeto...',
      sendMessage: 'Enviar mensagem',
    },
    footer: {
      role: 'EDITOR DE VÍDEO / motion designer',
      email: 'Email',
    },
    project: {
      notes: 'Notas do projeto',
      role: 'Função',
      software: 'Software',
      client: 'Cliente',
      additionalMedia: 'Media adicional',
      previous: 'Anterior',
      next: 'Seguinte',
      backToWork: 'Voltar ao trabalho',
      placeholderStatus: 'Projeto de exemplo — substituir pelo trabalho do Gio',
      notFoundEyebrow: '404 / não encontrado',
      notFoundTitle: 'Este corte não existe.',
      notFoundBack: 'Voltar ao trabalho',
      projectFilm: 'filme do projeto',
      videoPreview: 'pré-visualização do vídeo',
      thumbnail: 'miniatura',
      additionalMediaAlt: 'media adicional',
    },
    media: {
      placeholder: 'MEDIA DE EXEMPLO',
      placeholderBadge: 'Exemplo',
    },
    projectRoles: { motion: 'Motion design', editing: 'Edição de vídeo' },
    projectDescriptions: {
      'project-01': 'Um espaço para uma peça guiada por motion. Adicione uma nota curta sobre a ideia, o ritmo e a linguagem visual quando o trabalho estiver pronto para partilhar.',
      'project-02': 'Um espaço para um projeto guiado pela edição. Descreva o corte, o material de origem e o que a peça final precisava de transmitir.',
      'project-03': 'Um espaço para um título, identidade ou sistema gráfico em movimento. Mantenha a descrição específica ao problema e ao movimento.',
      'project-04': 'Um espaço para uma edição vertical ou uma sequência pensada para redes sociais. Registe o ritmo, o formato e as decisões que definiram a versão final.',
      'project-05': 'Um espaço para outro estudo de imagem em movimento. Substitua esta nota pelo contexto real do projeto quando houver media disponível.',
    },
    notFound: {
      title: 'Página 404 não encontrada',
      body: 'Esqueceu-se de adicionar a página ao router?',
    },
  },
  jp: {
    nav: { work: '制作実績', about: 'プロフィール', contact: 'お問い合わせ' },
    navigation: {
      primary: 'メインナビゲーション',
      mobile: 'モバイルナビゲーション',
      project: 'プロジェクトナビゲーション',
      filterWork: '主な制作実績を絞り込む',
      open: 'ナビゲーションを開く',
      close: 'ナビゲーションを閉じる',
      language: '言語',
    },
    hero: {
      eyebrow: '独立系ビデオエディター / モーションデザイナー',
      editor: 'ビデオエディター',
      motion: 'モーションデザイナー',
      description: '映像を編集し、モーションをデザインし、映像に動きをつくる。',
      based: '日本を拠点に',
      availability: '世界中からの依頼に対応',
    },
    home: {
      selectedWork: '主な制作実績',
      sectionFirst: '動く',
      sectionSecond: '映像。',
      workEyebrow: '制作実績',
      statement: '主な制作実績。',
    },
    filters: { all: 'すべて', motion: 'モーションデザイン', editing: '映像編集' },
    work: {
      archiveEyebrow: 'アーカイブ / 主な制作実績',
      title: '制作実績',
      lead: '映像編集とモーションデザイン。プロジェクトの背景も掲載しています。',
      countSuffix: '件 / 準備中',
    },
    about: {
      eyebrow: 'プロフィール / タイムラインの向こう側',
      titleFirst: '意図を持って',
      titleSecond: '動かす。',
      indexName: 'GIO OLIVEIRA',
      lead: 'Gioは日本を拠点に活動するビデオエディター / モーションデザイナーです。',
      copy: 'カットを起点に、リズムと明快さ、映像の余韻に残る細部を大切にしながら、映像作品とモーションシステムをつくります。',
      focus: '分野',
      videoEditing: '映像編集',
      motionDesign: 'モーションデザイン',
    },
    contact: {
      bandEyebrow: 'プロジェクトのご相談ですか？',
      bandTitleFirst: '何かを',
      bandTitleSecond: '動かしましょう。',
      startConversation: '相談を始める',
      eyebrow: 'お問い合わせ / こんにちは',
      title: 'お話ししましょう。',
      lead: 'プロジェクトのご相談ですか？',
      messageNoted: 'メッセージを受け付けました。',
      thanks: 'お問い合わせありがとうございます。近日中にGioからご連絡します。',
      sendAnother: '別のメッセージを送る',
      name: 'お名前',
      namePlaceholder: 'お名前',
      email: 'メールアドレス',
      emailPlaceholder: 'you@studio.com',
      project: 'プロジェクト',
      projectPlaceholder: 'プロジェクトについてご記入ください...',
      sendMessage: 'メッセージを送る',
    },
    footer: {
      role: '映像編集 / モーションデザイン',
      email: 'メール',
    },
    project: {
      notes: 'プロジェクトノート',
      role: '役割',
      software: 'ソフトウェア',
      client: 'クライアント',
      additionalMedia: '追加メディア',
      previous: '前へ',
      next: '次へ',
      backToWork: '制作実績に戻る',
      placeholderStatus: 'プレースホルダープロジェクト — Gioの作品に置き換えてください',
      notFoundEyebrow: '404 / 見つかりません',
      notFoundTitle: 'このカットはありません。',
      notFoundBack: '制作実績に戻る',
      projectFilm: 'プロジェクト映像',
      videoPreview: '映像プレビュー',
      thumbnail: 'サムネイル',
      additionalMediaAlt: '追加メディア',
    },
    media: {
      placeholder: 'メディアプレースホルダー',
      placeholderBadge: 'プレースホルダー',
    },
    projectRoles: { motion: 'モーションデザイン', editing: '映像編集' },
    projectDescriptions: {
      'project-01': 'モーションを中心とした作品のためのスペースです。公開できる状態になったら、アイデアやリズム、ビジュアル言語について短い説明を追加します。',
      'project-02': '編集を中心としたプロジェクトのためのスペースです。カットや素材、完成作品で目指した感覚について説明します。',
      'project-03': 'タイトルやアイデンティティ、動きのあるグラフィックシステムのためのスペースです。課題と動きに沿って具体的に説明します。',
      'project-04': '縦型編集やソーシャル向けシーケンスのためのスペースです。完成版を形づくったテンポやフォーマット、判断について記載します。',
      'project-05': '別の映像作品のためのスペースです。メディアが用意できたら、この説明を実際のプロジェクトの背景に置き換えます。',
    },
    notFound: {
      title: '404 ページが見つかりません',
      body: 'ルーターにページを追加しましたか？',
    },
  },
};

export type Translation = (typeof translations)['en'];

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const LANGUAGE_STORAGE_KEY = 'gio-portfolio-language';

function isLanguage(value: string | null): value is Language {
  return value === 'en' || value === 'pt' || value === 'jp';
}

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return isLanguage(savedLanguage) ? savedLanguage : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = languageOptions.find((option) => option.code === language)?.htmlLang ?? 'en';
  }, [language]);

  return createElement(LanguageContext.Provider, { value: { language, setLanguage, t: translations[language] } }, children);
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}