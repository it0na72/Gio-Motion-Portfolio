import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Language = "en" | "pt" | "jp";

export const languageOptions: {
  code: Language;
  label: string;
  htmlLang: string;
}[] = [
  { code: "en", label: "EN", htmlLang: "en" },
  { code: "pt", label: "PT", htmlLang: "pt" },
  { code: "jp", label: "JP", htmlLang: "ja" },
];

const translations = {
  en: {
    nav: { work: "Work", about: "About", contact: "Contact" },
    navigation: {
      primary: "Primary navigation",
      mobile: "Mobile navigation",
      project: "Project navigation",
      filterWork: "Filter selected work",
      open: "Open navigation",
      close: "Close navigation",
      language: "Language",
    },
    hero: {
      eyebrow: "Independent editor / motion designer",
      editor: "Video editor",
      motion: "Motion designer",
      description:
        "Editing videos, building motion systems, and making things move.",
      based: "Based in Japan",
      availability: "Available worldwide",
    },
    home: {
      selectedWork: "Selected work",
      sectionFirst: "A moving",
      sectionSecond: "picture.",
    },
    filters: { all: "ALL", motion: "MOTION DESIGN", editing: "VIDEO EDITING" },
    work: {
      archiveEyebrow: "Archive / selected work",
      title: "Previous work",
      countSuffix: "projects / currently being filled",
    },
    about: {
      eyebrow: "About / the person behind the timeline",
      titleFirst: "Make it move",
      titleSecond: "with purpose.",
      lead: "Video editor and motion designer based in Japan.",
      copy: "Working from the cut outward, creating films and motion systems with a focus on rhythm, clarity, and detail.",
      photoAlt: "Gio",
      focus: "Focus",
      videoEditing: "Video Editing",
      motionDesign: "Motion Design",
    },
    contact: {
      bandEyebrow: "Have a project in mind?",
      bandTitleFirst: "Let’s make",
      bandTitleSecond: "something move.",
      startConversation: "Start a conversation",
      eyebrow: "Contact / hello",
      title: "Let’s talk.",
      lead: "Have a project in mind?",
      messageNoted: "Message received.",
      thanks: "I’ll get back to you shortly.",
      confirmationDetails: "You can also contact me directly via email below.",
      emailDirect: "Email Gio directly",
      sendAnother: "Send another",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@studio.com",
      project: "Project",
      projectPlaceholder: "Project name",
      message: "Message",
      messagePlaceholder: "A few words about the project...",
      sendMessage: "Send message",
      sending: "Sending...",
      error: "Could not send the message. Please try again.",
    },
    footer: {
      role: "VIDEO EDITOR / MOTION DESIGNER",
      email: "Email",
      backToTop: "Back to top",
    },
    project: {
      notes: "Project notes",
      role: "Role",
      software: "Software",
      client: "Client",
      additionalMedia: "Additional media",
      previous: "Previous",
      next: "Next",
      backToWork: "Back to work",
      placeholderStatus: "Placeholder project — replace with Gio’s work",
      notFoundEyebrow: "404 / not found",
      notFoundTitle: "No such cut.",
      notFoundBack: "Back to the work",
      projectFilm: "project film",
      videoPreview: "video preview",
      thumbnail: "thumbnail",
      additionalMediaAlt: "additional media",
    },
    media: {
      placeholder: "MEDIA PLACEHOLDER",
      placeholderBadge: "Placeholder",
    },
    projectRoles: { motion: "Motion design", editing: "Video editing" },
    projectDescriptions: {
      "project-01":
        "A place for a motion-led piece. Add a short note about the idea, rhythm, and visual language once the work is ready to share.",
      "project-02":
        "A place for an edit-driven project. Describe the cut, the source material, and what the final piece needed to feel like.",
      "project-03":
        "A place for a title, identity, or graphic system in motion. Keep the description specific to the problem and the movement.",
      "project-04":
        "A place for a vertical edit or social-first sequence. Note the pacing, format, and decisions that shaped the final version.",
      "project-05":
        "A place for another moving-image study. Replace this note with the real project context when media is available.",
    },
    projectTitles: {
      "project-01": "Spotify Portugal",
      "project-02": "luso日本語 Launch SAAS",
      "project-03": "Everything that happens once",
      "project-04": "Japan Embassy Vlog",
      "project-05": "luso日本語 SAAS - Japanese with Manga",
    },
    notFound: {
      title: "404 Page Not Found",
      body: "Did you forget to add the page to the router?",
    },
  },
  pt: {
    nav: { work: "Vídeos", about: "Sobre", contact: "Contacto" },
    navigation: {
      primary: "Navegação principal",
      mobile: "Navegação móvel",
      project: "Navegação do projeto",
      filterWork: "Filtrar vídeos",
      open: "Abrir navegação",
      close: "Fechar navegação",
      language: "Idioma",
    },
    hero: {
      eyebrow: "Editor independente / designer de motion",
      editor: "Editor de vídeo",
      motion: "Designer de motion",
      description: "A editar vídeos, e a transformar ideias em movimento.",
      based: "Baseado no Japão",
      availability: "Disponível mundialmente",
    },
    home: {
      selectedWork: "Vídeos",
      sectionFirst: "Uma imagem",
      sectionSecond: "em movimento.",
    },
    filters: {
      all: "TODOS",
      motion: "MOTION DESIGN",
      editing: "EDIÇÃO DE VÍDEO",
    },
    work: {
      archiveEyebrow: "Arquivo / vídeos selecionados",
      title: "Vídeos",
      countSuffix: "projetos / em preenchimento",
    },
    about: {
      eyebrow: "Sobre / a pessoa por detrás da timeline",
      titleFirst: "Movimento com",
      titleSecond: "intenção.",
      lead: "Editor de vídeo e motion designer baseado no Japão.",
      copy: "Crio filmes e motion design para empresas, com foco no ritmo, clareza e no detalhe.",
      photoAlt: "Gio",
      focus: "Áreas",
      videoEditing: "Edição de vídeo",
      motionDesign: "Motion design",
    },
    contact: {
      bandEyebrow: "Algum projecto em mente?",
      bandTitleFirst: "Vamos dar",
      bandTitleSecond: "movimento a algo.",
      startConversation: "Iniciar conversa",
      eyebrow: "Contacto / olá",
      title: "Vamos falar.",
      lead: "Algum projecto em mente?",
      messageNoted: "Mensagem recebida.",
      thanks: "Entrarei em contacto o mais rápido possível.",
      confirmationDetails: "Podes tambem enviar-me um email diretamente se preferires.",
      emailDirect: "Enviar email direto ao Gio",
      sendAnother: "Enviar outra",
      name: "Nome",
      namePlaceholder: "O teu nome",
      email: "Email",
      emailPlaceholder: "tu@email.com",
      project: "Projeto",
      projectPlaceholder: "Nome do projeto",
      message: "Mensagem",
      messagePlaceholder: "Algumas palavras sobre o projeto...",
      sendMessage: "Enviar mensagem",
      sending: "A enviar...",
      error: "Não foi possível enviar a mensagem. Tente novamente.",
    },
    footer: {
      role: "EDITOR DE VÍDEO / motion designer",
      email: "Email",
      backToTop: "Voltar ao topo",
    },
    project: {
      notes: "Notas do projeto",
      role: "Função",
      software: "Software",
      client: "Cliente",
      additionalMedia: "Media adicional",
      previous: "Anterior",
      next: "Seguinte",
      backToWork: "Voltar ao trabalho",
      placeholderStatus: "Projeto de exemplo — substituir pelo trabalho do Gio",
      notFoundEyebrow: "404 / não encontrado",
      notFoundTitle: "Este corte não existe.",
      notFoundBack: "Voltar ao trabalho",
      projectFilm: "filme do projeto",
      videoPreview: "pré-visualização do vídeo",
      thumbnail: "miniatura",
      additionalMediaAlt: "media adicional",
    },
    media: {
      placeholder: "MEDIA DE EXEMPLO",
      placeholderBadge: "Exemplo",
    },
    projectRoles: { motion: "Motion design", editing: "Edição de vídeo" },
    projectDescriptions: {
      "project-01":
        "A ideia explora uma funcionalidade que permitiria aos utilizadores criar sessões de escuta, adicionar músicas em conjunto e ouvir a mesma música em tempo real; quase como ter a sua própria festa de rádio privada com amigos.",
      "project-02":
        "Um espaço para um projeto guiado pela edição. Descreva o corte, o material de origem e o que a peça final precisava de transmitir.",
      "project-03":
        "Um espaço para um título, identidade ou sistema gráfico em movimento. Mantenha a descrição específica ao problema e ao movimento.",
      "project-04":
        "Um espaço para uma edição vertical ou uma sequência pensada para redes sociais. Registe o ritmo, o formato e as decisões que definiram a versão final.",
      "project-05":
        "Um espaço para outro estudo de imagem em movimento. Substitua esta nota pelo contexto real do projeto quando houver media disponível.",
    },
    projectTitles: {
      "project-01": "Spotify Portugal",
      "project-02": "luso日本語 Launch SAAS",
      "project-03": "Tudo o que acontece depois",
      "project-04": "Vlog da Embaixada do Japão",
      "project-05": "luso日本語 SAAS - Japonês com Manga",
    },
    notFound: {
      title: "Página 404 não encontrada",
      body: "Esqueceu-se de adicionar a página ao router?",
    },
  },
  jp: {
    nav: { work: "制作実績", about: "プロフィール", contact: "お問い合わせ" },
    navigation: {
      primary: "メインナビゲーション",
      mobile: "モバイルナビゲーション",
      project: "プロジェクトナビゲーション",
      filterWork: "主な制作実績を絞り込む",
      open: "ナビゲーションを開く",
      close: "ナビゲーションを閉じる",
      language: "言語",
    },
    hero: {
      eyebrow: "独立系ビデオエディター / モーションデザイナー",
      editor: "ビデオエディター",
      motion: "モーションデザイナー",
      description:
        "映像を編集して、モーションをデザインして、アイデアに動きを与える。",
      based: "日本を拠点に",
      availability: "世界中からの依頼に対応",
    },
    home: {
      selectedWork: "主な制作実績",
      sectionFirst: "映像編集",
      sectionSecond: "",
    },
    filters: {
      all: "すべて",
      motion: "モーションデザイン",
      editing: "映像編集",
    },
    work: {
      archiveEyebrow: "アーカイブ / 主な制作実績",
      title: "制作実績",
      countSuffix: "件 / 準備中",
    },
    about: {
      eyebrow: "プロフィール",
      titleFirst: "意図を持って",
      titleSecond: "動かす。",
      lead: "日本を拠点に活動するビデオエディター／モーションデザイナー。",
      copy: "カットを起点に、リズムと明快さを大切にしながら、映像とモーションを設計しております。細部まで意図を持って組み立て、見る人に自然と届く表現を追求しております。",
      photoAlt: "Gio",
      focus: "分野",
      videoEditing: "映像編集",
      motionDesign: "モーションデザイン",
    },
    contact: {
      bandEyebrow: "プロジェクトのご相談ですか？",
      bandTitleFirst: "何かを",
      bandTitleSecond: "動かしましょう。",
      startConversation: "相談を始める",
      eyebrow: "お問い合わせ / こんにちは",
      title: "お気軽にご相談ください。",
      lead: "",
      messageNoted: "メッセージを受け取りました。",
      thanks: "近日中にご返信いたします。",
      confirmationDetails: "直接メールをご希望の場合は、下のリンクをご利用ください。",
      emailDirect: "Gioに直接メールする",
      sendAnother: "別のメッセージを送る",
      name: "お名前",
      namePlaceholder: "お名前",
      email: "メールアドレス",
      emailPlaceholder: "you@studio.com",
      project: "プロジェクト名",
      projectPlaceholder: "プロジェクト名を入力してください",
      message: "メッセージ",
      messagePlaceholder: "プロジェクトについてご記入ください...",
      sendMessage: "送信",
      sending: "送信中...",
      error: "メッセージを送信できませんでした。もう一度お試しください。",
    },
    footer: {
      role: "映像編集 / モーションデザイン",
      email: "メール",
      backToTop: "ページ上部へ戻る",
    },
    project: {
      notes: "プロジェクトノート",
      role: "役割",
      software: "ソフトウェア",
      client: "クライアント",
      additionalMedia: "追加メディア",
      previous: "前へ",
      next: "次へ",
      backToWork: "制作実績に戻る",
      placeholderStatus:
        "プレースホルダープロジェクト — Gioの作品に置き換えてください",
      notFoundEyebrow: "404 / 見つかりません",
      notFoundTitle: "このカットはありません。",
      notFoundBack: "制作実績に戻る",
      projectFilm: "プロジェクト映像",
      videoPreview: "映像プレビュー",
      thumbnail: "サムネイル",
      additionalMediaAlt: "追加メディア",
    },
    media: {
      placeholder: "メディアプレースホルダー",
      placeholderBadge: "プレースホルダー",
    },
    projectRoles: { motion: "モーションデザイン", editing: "映像編集" },
    projectDescriptions: {
      "project-01":
        "モーションを中心とした作品のためのスペースです。公開できる状態になったら、アイデアやリズム、ビジュアル言語について短い説明を追加します。",
      "project-02":
        "編集を中心としたプロジェクトのためのスペースです。カットや素材、完成作品で目指した感覚について説明します。",
      "project-03":
        "タイトルやアイデンティティ、動きのあるグラフィックシステムのためのスペースです。課題と動きに沿って具体的に説明します。",
      "project-04":
        "縦型編集やソーシャル向けシーケンスのためのスペースです。完成版を形づくったテンポやフォーマット、判断について記載します。",
      "project-05":
        "別の映像作品のためのスペースです。メディアが用意できたら、この説明を実際のプロジェクトの背景に置き換えます。",
    },
    projectTitles: {
      "project-01": "Spotify Portugal",
      "project-02": "luso日本語 Launch SAAS",
      "project-03": "一度起きたことのすべて",
      "project-04": "日本大使館Vlog",
      "project-05": "luso日本語 SAAS - マンガで学ぶ日本語",
    },
    notFound: {
      title: "404 ページが見つかりません",
      body: "ルーターにページを追加しましたか？",
    },
  },
};

export type Translation = (typeof translations)["en"];

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const LANGUAGE_STORAGE_KEY = "gio-portfolio-language";

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "pt" || value === "jp";
}

function getBrowserLanguage(): Language {
  const browserLanguages = window.navigator.languages?.length
    ? window.navigator.languages
    : [window.navigator.language];

  for (const browserLanguage of browserLanguages) {
    const language = browserLanguage.toLowerCase().split("-")[0];
    if (language === "pt") return "pt";
    if (language === "ja") return "jp";
    if (language === "en") return "en";
  }

  return "en";
}

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return isLanguage(savedLanguage) ? savedLanguage : getBrowserLanguage();
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang =
      languageOptions.find((option) => option.code === language)?.htmlLang ??
      "en";
  }, [language]);

  return createElement(
    LanguageContext.Provider,
    { value: { language, setLanguage, t: translations[language] } },
    children,
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
