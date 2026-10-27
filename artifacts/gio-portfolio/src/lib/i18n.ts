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
        invalidName: "Enter a name containing at least one letter.",
        invalidEmail: "Enter a valid email address.",
        invalidUrl: "Enter a valid link starting with http:// or https://.",
        invalidDate: "Enter a valid date.",
        futureDate: "Choose a date in the future.",
      },
      sendMessage: "Send message",
      sending: "Sending...",
      error: "Could not send the message. Please try again.",
    },
    footer: {
      role: "VIDEO EDITOR / MOTION DESIGNER",
      email: "Email",
      backToTop: "Back to top",
      rights: "All rights reserved.",
    },
    project: {
      notes: "Project notes",
      role: "Role",
      software: "Software",
      client: "Client",
      close: "Close project details",
      openDetails: "Open project details",
      videoError: "This video could not be loaded. Please try again later.",
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
      openVideo: "Open video larger",
    },
    projectRoles: { motion: "Motion design", editing: "Video editing" },
    projectDescriptions: {
      "project-01":
        "A dark, Spotify-green interface introduces a shared listening-party idea: friends add tracks to one queue and listen together in real time. The film moves between short feature messages, the party-creation screen and a collaborative playlist, using restrained type and interface animation to make the flow easy to follow.",
      "project-02":
        "A launch film for luso日本語 moves from the wordmark into lesson setup and course screens, then closes on the site address. A spare white, black and red palette and short text-led transitions keep attention on the learning product.",
      "project-03":
        "A Portuguese text-led film pairs numbered passages with documentary fragments, including a letter and personal imagery. Analog-TV scanlines, chromatic offsets and abrupt switches between quote cards and captured details give the reflective sequence a deliberately worn, editorial texture.",
      "project-04":
        "A vlog-style walk through Japan follows Gio speaking directly to camera outdoors and later indoors. Yellow subtitles, changes in framing and a pronounced zoom transition give the personal footage a brisk, social-video edit.",
      "project-05":
        "A luso日本語 learning piece introduces Japanese study through manga, chat-style prompts and short video inserts of the teachers. White and blush-pink cards, speech bubbles and a simple brand end card keep the lesson approachable and easy to scan.",
      "project-06":
        "Bold Portuguese phrases appear as rough, grain-textured title cards, then give way to a short outdoor shot of the presenter. The edit punctuates its message with oversized words, clipped transitions and a high-contrast paper-like finish.",
      "project-07":
        "A personal, vertical montage opens with a Japanese-and-Portuguese title card before cutting between creator footage and graphic inserts. CRT scanlines, a neon grid, large overlaid words and quick scene changes give the sequence a retro, arcade-like frame.",
      "project-08":
        "Two speakers appear in stacked video windows throughout this vertical conversation. Japanese and Portuguese subtitles sit over the footage while the framed layout keeps both sides of the exchange visible.",
      "project-09":
        "A Japanese vocabulary explainer builds from a word and its Portuguese meaning to short example cards. Warm coral-to-yellow gradients, bold type, small UI-like panels and a closing brand mark give the vertical lesson a clear, repeatable structure.",
      "project-10":
        "A presenter appears in a circular crop beside large Japanese-learning headlines and short speech bubbles. The piece switches from vocabulary-style cards to a mock video-call screen, then resolves on the luso日本語 mark.",
      "project-11":
        "This vocabulary reel presents a Japanese term with its reading, Portuguese meaning and an example phrase. Repeated coral-and-yellow cards, a soft textured background and compact type keep each learning step legible in the vertical frame.",
      "project-12":
        "Japanese and Portuguese text cards introduce a term for kidney stones before the presenter appears on camera. The sequence alternates between cool blue graphic backgrounds, the speaker and short captioned explanations.",
      "project-13":
        "A presenter-led Japanese lesson moves between a circular face crop, highlighted phrase cards and a brief manga or anime image. Large Portuguese labels and smaller Japanese text make the vocabulary the focus of each quick visual change.",
      "project-14":
        "A casual, close-framed conversation cuts between several warm-lit shots of the presenter. Portuguese subtitles follow the speech, while changes in crop and brief reaction moments keep the direct-to-camera edit moving.",
      "project-15":
        "A vertical screen recording moves through a map and place-listing interface, pairing location names with photographs and detail cards. The edit stays close to the phone screen as the map view changes between stops.",
      "project-16":
        "A personal vertical montage moves from close-ups of a book and a puzzle cube to street scenes, food and creator footage in Japan. Short captions connect the varied clips, with quick cuts carrying the sequence from small details to wider travel moments.",
      "project-17":
        "The presenter speaks to camera between bold caption cards, city footage and illustrated or anime imagery. Large Portuguese phrases and varied portrait layouts break the commentary into short, emphatic beats.",
      "project-18":
        "A presenter-led language reel combines direct-to-camera footage with Japanese and Portuguese captions, chat-like graphics and a brief brand graphic. The repeated overlays keep key phrases visible while the speaker remains central.",
      "project-19":
        "A bright pink social-style sequence alternates between two-speaker clips, creator tiles and large text cards about favourite YouTubers. A visible like counter and stacked portrait frames borrow familiar elements from social feeds.",
      "project-20":
        "A low-light, front-facing night vlog is punctuated by Portuguese captions about food and everyday experiences in Japan. The handheld footage stays close to the speaker, with bright text providing contrast against the dark image.",
      "project-21":
        "A quick montage moves through Japanese interiors, streets and food, shifting from a distorted title treatment into full-colour location footage. Short, high-contrast overlays and abrupt cuts give the travel imagery a compact, energetic edit.",
      "project-22":
        "A Japanese-with-manga lesson opens on a colourful title card, then places the presenter over black-and-white manga panels. Japanese dialogue and Portuguese subtitles appear in short, timed captions as the page details change.",
      "project-23":
        "This longer manga-based lesson keeps the presenter beside changing black-and-white panels while Japanese phrases and Portuguese explanations appear over the page. Selective highlights and repeated panel crops guide attention through the examples.",
      "project-24":
        "Two people speak in stacked portrait windows, with Japanese captions and Portuguese subtitles appearing around their footage. The edit holds the paired layout through the conversation and changes the highlighted text as the exchange continues.",
      "project-25":
        "A short product film moves through the luso日本語 lesson interface, showing a learning screen, a completed-lesson state and the site's closing mark. Soft white and blush-pink fields, subtle interface movement and clear labels keep the focus on the product."
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
    nav: {
      work: "Vídeos",
      about: "Sobre",
      contact: "Contacto",
      home: "Início",
    },
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
      confirmationDetails:
        "Podes tambem enviar-me um email diretamente se preferires.",
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
        invalidName: "Introduz um nome que contenha pelo menos uma letra.",
        invalidEmail: "Introduz um endereço de email válido.",
        invalidUrl: "Introduz um link válido começado por http:// ou https://.",
        invalidDate: "Introduz uma data válida.",
        futureDate: "Escolhe uma data futura.",
      },
      sendMessage: "Enviar mensagem",
      sending: "A enviar...",
      error: "Não foi possível enviar a mensagem. Tente novamente.",
    },
    footer: {
      role: "EDITOR DE VÍDEO / motion designer",
      email: "Email",
      backToTop: "Voltar ao topo",
      rights: "Todos os direitos reservados.",
    },
    project: {
      notes: "Notas do projeto",
      role: "Função",
      software: "Software",
      client: "Cliente",
      close: "Fechar detalhes do projeto",
      openDetails: "Abrir detalhes do projeto",
      videoError:
        "Não foi possível carregar este vídeo. Tenta novamente mais tarde.",
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
      openVideo: "Ampliar vídeo",
    },
    projectRoles: { motion: "Motion design", editing: "Edição de vídeo" },
    projectDescriptions: {
      "project-01":
        "Uma interface escura em tons de verde Spotify apresenta a ideia de uma sessão de escuta partilhada: os amigos juntam músicas à mesma fila e ouvem-nas em tempo real. O vídeo alterna entre mensagens curtas sobre a funcionalidade, o ecrã de criação da sessão e uma lista colaborativa, com texto discreto e animações de interface que tornam o fluxo fácil de acompanhar.",
      "project-02":
        "Um vídeo de lançamento da luso日本語 passa do logótipo para os ecrãs de configuração de aulas e cursos, terminando no endereço do site. A paleta simples de branco, preto e vermelho e as transições curtas com texto mantêm o foco no produto de aprendizagem.",
      "project-03":
        "Este vídeo, conduzido por texto em português, combina passagens numeradas com fragmentos documentais, incluindo uma carta e imagens pessoais. Linhas de televisão analógica, desvios cromáticos e mudanças bruscas entre frases e imagens captadas dão à sequência uma textura editorial, intencionalmente gasta.",
      "project-04":
        "Um passeio em estilo vlog pelo Japão acompanha o Gio a falar diretamente para a câmara, primeiro no exterior e depois no interior. Legendas amarelas, mudanças de enquadramento e um zoom marcado dão ritmo à edição pessoal, pensada para vídeo social.",
      "project-05":
        "Uma peça da luso日本語 apresenta a aprendizagem de japonês através de manga, mensagens em formato de chat e pequenos vídeos dos professores. Cartões brancos e rosa-claro, balões de fala e um cartão final com a marca tornam a aula fácil de acompanhar.",
      "project-06":
        "Frases em português surgem em cartões de texto grandes, com textura granulada e aspecto de papel, antes de darem lugar a um breve plano do apresentador no exterior. Palavras destacadas, transições cortadas e contraste forte pontuam a mensagem.",
      "project-07":
        "Uma montagem vertical pessoal abre com um cartão de título em japonês e português e alterna depois entre imagens do criador e elementos gráficos. Linhas de televisão, uma grelha néon, palavras grandes e mudanças rápidas dão à sequência um ambiente retro de videojogo.",
      "project-08":
        "Duas pessoas aparecem em janelas de vídeo empilhadas ao longo desta conversa vertical. As legendas em japonês e português acompanham as imagens, enquanto o enquadramento mantém os dois lados da conversa visíveis.",
      "project-09":
        "Um explicador de vocabulário japonês apresenta uma palavra, o seu significado em português e cartões curtos com exemplos. Gradientes de coral e amarelo, tipografia forte, pequenos painéis de interface e a marca no final dão uma estrutura clara à aula vertical.",
      "project-10":
        "O apresentador aparece num recorte circular ao lado de títulos grandes sobre a aprendizagem de japonês e pequenas mensagens. A peça passa de cartões de vocabulário para um ecrã simulado de videochamada e termina com a marca luso日本語.",
      "project-11":
        "Este vídeo de vocabulário apresenta uma palavra japonesa com a leitura, o significado em português e uma frase de exemplo. Cartões repetidos em coral e amarelo, um fundo com textura suave e texto compacto tornam cada passo legível no formato vertical.",
      "project-12":
        "Cartões de texto em japonês e português introduzem um termo para pedras nos rins antes de o apresentador surgir em câmara. A sequência alterna entre fundos gráficos azuis, a pessoa a falar e explicações curtas legendadas.",
      "project-13":
        "Uma aula de japonês conduzida pelo apresentador alterna entre um retrato circular, cartões com frases destacadas e uma breve imagem de manga ou anime. Os rótulos grandes em português e o texto japonês mais pequeno mantêm o vocabulário em destaque.",
      "project-14":
        "Uma conversa descontraída, filmada de perto, alterna entre vários planos quentes do apresentador. As legendas em português acompanham a fala e as mudanças de enquadramento e breves reacções mantêm a edição em movimento.",
      "project-15":
        "Uma gravação vertical do ecrã percorre um mapa e uma interface de locais, juntando nomes, fotografias e cartões de detalhe. A edição acompanha o ecrã do telemóvel enquanto a vista do mapa muda entre pontos.",
      "project-16":
        "Uma montagem vertical pessoal passa de planos próximos de um livro e de um cubo de Rubik para ruas, comida e imagens do criador no Japão. Legendas curtas ligam os vários momentos e os cortes rápidos alternam entre pormenores e cenas de viagem.",
      "project-17":
        "O apresentador fala para a câmara entre cartões de texto, imagens da cidade e ilustrações ou imagens de anime. Frases grandes em português e diferentes enquadramentos verticais dividem o comentário em momentos curtos e enfáticos.",
      "project-18":
        "Um vídeo de língua conduzido pelo apresentador combina imagem directa para a câmara com legendas em japonês e português, grafismos de chat e uma breve imagem da marca. As sobreposições mantêm as frases visíveis sem tirar o foco de quem fala.",
      "project-19":
        "Uma sequência social em rosa vivo alterna entre vídeos de duas pessoas, cartões de criadores e títulos grandes sobre YouTubers favoritos. Um contador de gostos e os retratos empilhados evocam elementos comuns dos feeds sociais.",
      "project-20":
        "Um vlog nocturno, filmado de frente e com pouca luz, é pontuado por legendas em português sobre comida e experiências quotidianas no Japão. A imagem permanece próxima de quem fala e o texto luminoso destaca-se sobre o fundo escuro.",
      "project-21":
        "Uma montagem rápida percorre interiores, ruas e comida no Japão, passando de um título distorcido para imagens a cores dos vários locais. Sobreposições curtas e cortes abruptos dão uma edição compacta e enérgica às imagens de viagem.",
      "project-22":
        "Uma aula de japonês com manga começa num título colorido e coloca depois o apresentador sobre páginas a preto e branco. O diálogo em japonês e as legendas em português surgem em frases curtas e temporizadas à medida que a página muda.",
      "project-23":
        "Nesta aula mais longa com manga, o apresentador permanece ao lado de páginas a preto e branco que vão mudando, enquanto frases japonesas e explicações em português aparecem sobre as imagens. Destaques pontuais e recortes repetidos orientam a atenção pelos exemplos.",
      "project-24":
        "Duas pessoas falam em janelas de vídeo verticais empilhadas, com legendas em japonês e português junto às imagens. A edição mantém o enquadramento duplo ao longo da conversa e altera o texto destacado à medida que o diálogo avança.",
      "project-25":
        "Um breve vídeo de produto percorre a interface de aulas da luso日本語, mostrando um ecrã de aprendizagem, o estado de aula concluída e a marca no final. Fundos brancos e rosa-claro, movimentos subtis da interface e rótulos claros mantêm o foco no produto."
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
    nav: {
      work: "制作実績",
      about: "プロフィール",
      contact: "お問い合わせ",
      home: "ホーム",
    },
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
      confirmationDetails:
        "直接メールをご希望の場合は、下のリンクをご利用ください。",
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
      budget: "ご予算の目安 (JPY)",
      budgets: {
        under500: "¥80,000未満",
        from500To1000: "¥80,000–¥160,000",
        from1000To2500: "¥160,000–¥400,000",
        from2500To5000: "¥400,000–¥800,000",
        over5000: "¥800,000以上",
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
        invalidName: "名前には少なくとも1つの文字を入力してください。",
        invalidEmail: "有効なメールアドレスを入力してください。",
        invalidUrl:
          "http:// または https:// で始まる有効なリンクを入力してください。",
        invalidDate: "有効な日付を入力してください。",
        futureDate: "未来の日付を選択してください。",
      },
      sendMessage: "送信",
      sending: "送信中...",
      error: "メッセージを送信できませんでした。もう一度お試しください。",
    },
    footer: {
      role: "映像編集 / モーションデザイン",
      email: "メール",
      backToTop: "ページ上部へ戻る",
      rights: "All rights reserved.（全著作権所有）",
    },
    project: {
      notes: "プロジェクトノート",
      role: "役割",
      software: "ソフトウェア",
      client: "クライアント",
      close: "プロジェクトの詳細を閉じる",
      openDetails: "プロジェクトの詳細を開く",
      videoError:
        "動画を読み込めませんでした。時間をおいてもう一度お試しください。",
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
      openVideo: "動画を拡大",
    },
    projectRoles: { motion: "モーションデザイン", editing: "映像編集" },
    projectDescriptions: {
      "project-01":
        "Spotifyグリーンを基調とした暗い画面で、友人同士が曲を追加し、リアルタイムで一緒に聴くリスニングパーティーのアイデアを紹介します。パーティーの作成画面や共有プレイリストを短いメッセージとともに切り替え、控えめな文字とUIの動きで操作の流れを伝えます。",
      "project-02":
        "luso日本語のローンチ映像です。ロゴからレッスン設定やコースの画面へ移り、最後にサイトのアドレスを表示します。白・黒・赤のシンプルな配色と短いテキスト主体のトランジションで、学習サービスに目を向けさせます。",
      "project-03":
        "ポルトガル語の番号付きテキストに、手紙や個人的な写真などの記録映像を組み合わせた作品です。アナログテレビ風の走査線や色ずれを加え、文章と映像の断片を急に切り替えることで、意図的に使い込まれたような編集の質感を生み出しています。",
      "project-04":
        "日本での散策を追うVlog形式の映像で、Gioが屋外や室内でカメラに向かって話します。黄色い字幕、画角の変化、印象的なズームトランジションで、個人的な映像に軽快なテンポを加えています。",
      "project-05":
        "luso日本語の学習コンテンツで、マンガやチャット形式の問いかけ、講師の短い映像を通して日本語学習を紹介します。白や淡いピンクのカード、吹き出し、最後のブランド表示で、内容を追いやすくまとめています。",
      "project-06":
        "ざらついた紙のような質感と大きなポルトガル語の文字を見せたあと、屋外にいる話し手の短い映像へ切り替わります。強調された単語、切り詰めたトランジション、強いコントラストでメッセージを際立たせています。",
      "project-07":
        "日本語とポルトガル語のタイトルで始まる、個人的な縦型モンタージュです。クリエイターの映像とグラフィックを行き来し、テレビの走査線、ネオングリッド、大きな文字、素早いカットでレトロなゲーム画面のような雰囲気を作っています。",
      "project-08":
        "縦型の画面に二人の話し手を上下に並べ、会話のあいだ両方の映像を見せています。日本語とポルトガル語の字幕を重ね、二つの視点を同時に追える構成です。",
      "project-09":
        "日本語の単語とポルトガル語の意味から、短い例文カードへ進む語彙解説です。コーラルから黄色へのグラデーション、太い文字、小さなUI風パネル、最後のブランド表示で縦型のレッスンを構成しています。",
      "project-10":
        "円形に切り抜いた話し手の映像と、日本語学習についての大きな見出し、短い吹き出しを組み合わせています。語彙カードからビデオ通話風の画面へ移り、luso日本語のロゴで締めくくります。",
      "project-11":
        "日本語の単語と読み方、ポルトガル語の意味、例文を紹介する語彙リールです。コーラルと黄色のカード、柔らかな質感の背景、コンパクトな文字で、縦型画面でも各ステップを読みやすくしています。",
      "project-12":
        "腎臓結石を表す言葉を日本語とポルトガル語のテキストカードで紹介し、その後、話し手が登場します。青系のグラフィック背景、話し手の映像、短い字幕付きの説明を切り替えています。",
      "project-13":
        "話し手による日本語レッスンで、円形の顔映像、強調されたフレーズカード、短いマンガやアニメの画像を切り替えます。大きなポルトガル語の見出しと小さな日本語の文字で、語彙を中心に見せています。",
      "project-14":
        "話し手を近くから捉えた、くつろいだ雰囲気の会話です。暖色の照明の複数のカットをつなぎ、ポルトガル語字幕や画角の変化、短いリアクションでテンポを保っています。",
      "project-15":
        "縦型の画面収録で、地図と場所の一覧を行き来しながら、場所の名前、写真、詳細カードを見せます。スマートフォンの画面を中心に、地図上の表示が次々と切り替わります。",
      "project-16":
        "本やルービックキューブの接写から、日本の街並み、食べ物、クリエイターの映像へ移る個人的な縦型モンタージュです。短い字幕が場面をつなぎ、素早いカットで細部から旅行の風景へ展開します。",
      "project-17":
        "話し手の映像に、大きな字幕、街の映像、イラストやアニメの画像を組み合わせています。ポルトガル語のフレーズと縦型のレイアウトを切り替え、コメントを短く印象的なまとまりに分けています。",
      "project-18":
        "話し手による語学リールで、カメラに向かって話す映像に、日本語とポルトガル語の字幕、チャット風のグラフィック、短いブランド表示を重ねています。話し手を中心にしながら、重要なフレーズを画面に残しています。",
      "project-19":
        "鮮やかなピンクを基調としたソーシャル風の映像で、二人の映像、クリエイターのカード、お気に入りのYouTuberを紹介する大きな文字を切り替えます。いいね数や縦に並ぶポートレートなど、SNSの画面を思わせる要素が使われています。",
      "project-20":
        "暗い場所で撮影した夜の自撮りVlogに、日本での食事や日常の体験についてポルトガル語の字幕を重ねています。手持ちカメラで話し手を近くから捉え、明るい文字を暗い映像に際立たせています。",
      "project-21":
        "日本の室内、街並み、食べ物をテンポよくつなぎ、歪んだタイトル表現から各地のカラー映像へ移ります。短いテキストと急なカットで、旅行映像をコンパクトで勢いのある編集にまとめています。",
      "project-22":
        "カラフルなタイトルで始まる、マンガを使った日本語レッスンです。白黒のマンガのコマに話し手の映像を重ね、日本語のセリフとポルトガル語字幕を短く表示しながらページを切り替えます。",
      "project-23":
        "より長いマンガ教材のレッスンで、話し手の映像と白黒のコマを並べ、日本語のフレーズにポルトガル語の説明を重ねています。部分的な強調やコマの切り抜きで、例文に視線を誘導します。",
      "project-24":
        "二人の会話を縦型の画面に上下に並べ、日本語とポルトガル語の字幕を映像のそばに表示します。会話中は二画面の構成を保ち、やり取りに合わせて強調するテキストを変えています。",
      "project-25":
        "luso日本語のレッスン画面を見せる短いプロダクト映像です。学習画面、レッスン完了の表示、最後のサイトロゴへと移ります。白と淡いピンクの背景、控えめなUIの動き、分かりやすいラベルで製品に焦点を当てています。"
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
