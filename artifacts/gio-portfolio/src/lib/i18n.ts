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
    nav: { work: "Work", about: "About", contact: "Contact", home: "Home" },
    navigation: {
      primary: "Primary navigation",
      mobile: "Mobile navigation",
      project: "Project navigation",
      filterWork: "Filter selected work",
      open: "Open navigation",
      close: "Close navigation",
      language: "Language",
      lightMode: "Switch to light mode",
      darkMode: "Switch to dark mode",
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
      lead: "Make your next idea move.",
      intro:
        "I turn complex ideas from brands and creators into cinematic visual stories. Share what you’re building, who it’s for, and what you need. It takes about 2 minutes; I’ll reply within 3 working days.",
      messageNoted: "Message received.",
      thanks: "I’ll get back to you shortly.",
      confirmationDetails: "You can also contact me directly via email below.",
      emailDirect: "Email Gio directly",
      sendAnother: "Send another",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@studio.com",
      project: "Project / brand",
      projectPlaceholder: "SaaS brand, artist, creator...",
      clientType: "I am a",
      clientTypes: {
        saas: "SaaS / tech brand",
        creator: "Content creator",
        brand: "Company / product brand",
        other: "Other",
      },
      service: "I'm looking for",
      services: {
        videoEditing: "Video editing",
        motionDesign: "Motion design",
        productVideo: "Product / launch video",
        socialContent: "Social media content",
        ongoing: "Ongoing creative support",
      },
      budget: "Estimated budget (EUR)",
      budgets: {
        under500: "Under €500",
        from500To1000: "€500–€1,000",
        from1000To2500: "€1,000–€2,500",
        from2500To5000: "€2,500–€5,000",
        over5000: "€5,000+",
      },
      deadline: "Target timeline",
      deadlines: {
        under2Weeks: "Within 2 weeks",
        from2To4Weeks: "2–4 weeks",
        from1To2Months: "1–2 months",
        flexible: "Flexible / no fixed deadline",
      },
      deadlineDate: "Exact target date (optional)",
      chooseOption: "Choose an option",
      reference: "Reference link (optional)",
      referencePlaceholder: "https://...",
      message: "Project brief",
      messagePlaceholder:
        "What do you need? Who is it for? Share the format, timeline, and any references...",
      validation: {
        required: "This field is required.",
        invalidEmail: "Enter a valid email address.",
        invalidUrl: "Enter a valid link starting with http:// or https://.",
        invalidDate: "Enter a valid date.",
      },
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
    nav: { work: "Vídeos", about: "Sobre", contact: "Contacto", home: "Início" },
    navigation: {
      primary: "Navegação principal",
      mobile: "Navegação móvel",
      project: "Navegação do projeto",
      filterWork: "Filtrar vídeos",
      open: "Abrir navegação",
      close: "Fechar navegação",
      language: "Idioma",
      lightMode: "Mudar para modo claro",
      darkMode: "Mudar para modo escuro",
    },
    hero: {
      eyebrow: "Editor independente / motion designer",
      editor: "Editor de vídeo",
      motion: "Motion designer",
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
      copy: "Crio filmes e motion design para empresas e criadores de conteúdo, com foco no ritmo, clareza e no detalhe.",
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
      lead: "Vamos dar vida à tua próxima ideia.",
      intro:
        "Transformo ideias complexas de marcas e criadores em histórias visuais cinematográficas. Conta-me o que estás a construir, para quem e de que precisas. Leva cerca de 2 minutos; respondo em até 3 dias úteis.",
      messageNoted: "Mensagem recebida.",
      thanks: "Entrarei em contacto o mais rápido possível.",
      confirmationDetails: "Podes tambem enviar-me um email diretamente se preferires.",
      emailDirect: "Enviar email direto ao Gio",
      sendAnother: "Enviar outra",
      name: "Nome",
      namePlaceholder: "O teu nome",
      email: "Email",
      emailPlaceholder: "tu@email.com",
      project: "Projeto / marca",
      projectPlaceholder: "Marca SaaS, artista, criador...",
      clientType: "Sou",
      clientTypes: {
        saas: "Marca SaaS / tecnologia",
        creator: "Criador de conteúdo",
        brand: "Empresa / marca de produto",
        other: "Outro",
      },
      service: "Procuro",
      services: {
        videoEditing: "Edição de vídeo",
        motionDesign: "Motion design",
        productVideo: "Vídeo de produto / lançamento",
        socialContent: "Conteúdo para redes sociais",
        ongoing: "Apoio criativo recorrente",
      },
      budget: "Investimento estimado (EUR)",
      budgets: {
        under500: "Menos de 500 €",
        from500To1000: "500 €–1.000 €",
        from1000To2500: "1.000 €–2.500 €",
        from2500To5000: "2.500 €–5.000 €",
        over5000: "5.000 €+",
      },
      deadline: "Prazo pretendido",
      deadlines: {
        under2Weeks: "Até 2 semanas",
        from2To4Weeks: "2–4 semanas",
        from1To2Months: "1–2 meses",
        flexible: "Flexível / sem prazo definido",
      },
      deadlineDate: "Data exata pretendida (opcional)",
      chooseOption: "Escolhe uma opção",
      reference: "Link de referência (opcional)",
      referencePlaceholder: "https://...",
      message: "Brief do projeto",
      messagePlaceholder:
        "Do que precisas? Para quem é? Partilha o formato, o prazo e referências que já tenhas...",
      validation: {
        required: "Este campo é obrigatório.",
        invalidEmail: "Introduz um endereço de email válido.",
        invalidUrl: "Introduz um link válido começado por http:// ou https://.",
        invalidDate: "Introduz uma data válida.",
      },
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
    nav: { work: "制作実績", about: "プロフィール", contact: "お問い合わせ", home: "ホーム" },
    navigation: {
      primary: "メインナビゲーション",
      mobile: "モバイルナビゲーション",
      project: "プロジェクトナビゲーション",
      filterWork: "主な制作実績を絞り込む",
      open: "ナビゲーションを開く",
      close: "ナビゲーションを閉じる",
      language: "言語",
      lightMode: "ライトモードに切り替える",
      darkMode: "ダークモードに切り替える",
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
      copy: "カットを軸に、リズムと伝わりやすさを大切にしながら、映像編集とモーションデザインを手がけています。細部まで意図を込め、見る人に自然と伝わる表現を目指しています。",
      photoAlt: "Gio",
      focus: "分野",
      videoEditing: "映像編集",
      motionDesign: "モーションデザイン",
    },
    contact: {
      bandEyebrow: "プロジェクトのご相談ですか？",
      bandTitleFirst: "何かを",
      bandTitleSecond: "動かしましょう。",
      startConversation: "相談はこちら",
      eyebrow: "お問い合わせ / こんにちは",
      title: "お気軽にご相談ください。",
      lead: "アイデアに、動きを。",
      intro:
        "ブランドやクリエイターのアイデアを、映像編集とモーションデザインで形にします。ご依頼内容や目的、ご希望の納期などをお聞かせください。フォームの入力は約2分、通常3営業日以内にご返信いたします。",
      messageNoted: "メッセージを受け取りました。",
      thanks: "近日中にご返信いたします。",
      confirmationDetails: "直接メールをご希望の場合は、下のリンクをご利用ください。",
      emailDirect: "Gioに直接メールする",
      sendAnother: "別のメッセージを送る",
      name: "お名前",
      namePlaceholder: "お名前",
      email: "メールアドレス",
      emailPlaceholder: "you@studio.com",
      project: "プロジェクト / ブランド",
      projectPlaceholder: "SaaSブランド、アーティスト、クリエイター...",
      clientType: "依頼者",
      clientTypes: {
        saas: "SaaS / テックブランド",
        creator: "コンテンツクリエイター",
        brand: "企業 / プロダクトブランド",
        other: "その他",
      },
      service: "ご希望の内容",
      services: {
        videoEditing: "映像編集",
        motionDesign: "モーションデザイン",
        productVideo: "製品 / ローンチ動画",
        socialContent: "SNSコンテンツ",
        ongoing: "継続的なクリエイティブサポート",
      },
      budget: "ご予算の目安 (EUR)",
      budgets: {
        under500: "500ユーロ未満",
        from500To1000: "500–1,000ユーロ",
        from1000To2500: "1,000–2,500ユーロ",
        from2500To5000: "2,500–5,000ユーロ",
        over5000: "5,000ユーロ以上",
      },
      deadline: "ご希望の納期",
      deadlines: {
        under2Weeks: "2週間以内",
        from2To4Weeks: "2–4週間",
        from1To2Months: "1–2か月",
        flexible: "柔軟 / 期限なし",
      },
      deadlineDate: "ご希望の具体的な日付 (任意)",
      chooseOption: "選択してください",
      reference: "参考リンク (任意)",
      referencePlaceholder: "https://...",
      message: "プロジェクトの概要",
      messagePlaceholder:
        "必要なもの、対象、形式、スケジュール、参考資料などをご記入ください...",
      validation: {
        required: "この項目は必須です。",
        invalidEmail: "有効なメールアドレスを入力してください。",
        invalidUrl: "http:// または https:// で始まる有効なリンクを入力してください。",
        invalidDate: "有効な日付を入力してください。",
      },
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
