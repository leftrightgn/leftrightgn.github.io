import * as THREE from 'three';

/**
 * CONFIG & DATA
 * Update these values to customize your portfolio content and timings.
 * 
 * HOW TO ADD A NEW PROJECT CARD:
 * Simply copy and paste an entire `<article class="project-card">` block in index.html!
 */
const CONFIG = {
    learningTopics: ['shaders', 'fantasy lore', 'ECS', 'game mechanics', 'IK', 'worldbuilding', 'C++'],
    tickerSpeed: 2000,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

/* --- BILINGUAL CONTENT (ENGLISH & JAPANESE) --- */
const TRANSLATIONS = {
    en: {
        page_title: "HEIN SOE KHANT - Game Developer & Programmer",
        mode_free: "Free mode",
        mode_locked: "Locked in",
        learning_prefix: "currently learning:",
        hero_intro: "Hi, I'm HEIN SOE KHANT.",
        hero_statement: "I turn boundless imagination into playable reality. Fantasy inspired, always building.",
        btn_see_games: "See my games",
        btn_about: "About me",
        btn_say_hi: "Say hi",
        projects_title: "Things I Built",
        click_to_open_hint: "Click to open full project page ↗",
        hero_3d_hint: "Touch & drag to inspect 🎮",
        
        // Homepage Card 1 (DUAL)
        project1_title: "DUAL",
        dual_status: "In Active Dev (2026~)",
        dual_preview_badge: "Gameplay • In-Engine",
        dual_video_badge: "Gameplay Footage • In-Engine",
        project1_teaser: "A dark fantasy Souls-like x Chivalry melee combat game built on a custom C++ game engine. Experience body impermanence, wandering spirit mechanics, and dynamic vessel possession.",
        btn_explore_dual: "Open Project & Engine Deep Dive →",
        project1_role: "Role: Solo Dev & Engine Programmer",
        
        // Homepage Card 2 (MEINEKO)
        project2_title: "廻猫 - MEINEKO -",
        meineko_award_badge: "🏆 優秀賞 / Excellence Award",
        meineko_status: "IGCC Game Jam 優秀賞",
        project2_teaser: "Fast Action × Card Strategy 2D platformer developed in a 10-day sprint for IGCC Game Jam. Theme: 'Time and Again' (七転八起). Directed and led the 8-person team to win the Excellence Award.",
        btn_explore_meineko: "Open MEINEKO Deep Dive →",
        project2_role: "Role: Game Director × Main Programmer × Leader",
        meineko_tag_award: "🏆 優秀賞 (Excellence Award)",
        meineko_tag_role: "Team Leader & Main Programmer",
        meineko_tag_genre: "Fast Action × Card Strategy",
        meineko_tag_theme: "Theme: Time and Again (七転八起)",
        meineko_tag_sprint: "10-Day Sprint",

        // Modal MEINEKO
        meineko_eyebrow_award: "🏆 優秀賞 (Excellence Award)",
        meineko_eyebrow_jam: "IGCC Game Jam 2026",
        meineko_eyebrow_team: "Team of 8 • 10-Day Sprint",
        meineko_modal_subtitle: "2D Fast Action × Card Strategy • Theme: Time and Again (七転八起) • IGCC Game Jam Excellence Award Winner",
        meineko_video_badge: "🏆 優秀賞 受賞作 PRムービー",
        meineko_modal_media_caption: "▲ Official PR Presentation & Gameplay Movie: Team A concept breakdown, theme interpretation, team member roles, and live gameplay showcase.",
        meineko_meta_event_label: "Event / Contest",
        meineko_meta_event_val: "IGCC Game Jam (10-Day Sprint)",
        meineko_meta_award_label: "Result / Award",
        meineko_meta_award_val: "🏆 優秀賞 (Excellence Award)",
        meineko_meta_role_label: "My Role",
        meineko_meta_role_val: "Game Director × Main Programmer × Team Leader",
        meineko_meta_theme_label: "Jam Theme",
        meineko_meta_theme_val: "Time and Again (七転八起 / 何度も何度も)",

        meineko_sec1_title: "Game Concept: Fast Action × Card Strategy",
        meineko_sec1_callout: "\"When given the jam theme <strong>'Time and Again'</strong>, we interpreted it as the Japanese proverb <strong>「七転八起」 (Fall seven times, stand up eight)</strong> — translating <em>'again and again'</em> into a time loop seamlessly woven into the worldbuilding and folklore.\"",
        meineko_core_heading: "Swift Cat Controls × Tactical Card Selection",
        meineko_core_p1: "<strong>廻猫 - MEINEKO -</strong> is a high-speed 2D action platformer where players control an agile spirit cat navigating a mist-shrouded shrine forest. Combining rapid acrobatics (wall climbs, quick dashes, vertical leaps) with real-time tactical card selection, the player activates sacred talisman cards (札) to unleash elemental slashes, barrier wards, and special traversal buffs.",
        meineko_core_p2: "<strong>The 9-Lives Time Loop:</strong> Reinterpreting the cat's nine lives through the lens of reincarnation and time loops, each defeat is not a failure, but a cycle of learning that advances the narrative and reveals the hidden truth behind the shrine: <em>'Can you uncover the truth behind the story?'</em>",

        meineko_sec2_title: "Official Poster & Visual Aesthetics",
        meineko_poster_badge: "Team A Official B1 Poster",
        meineko_poster_heading: "Art Direction & Yokai Folklore Aesthetic",
        meineko_poster_desc1: "Illustrated by team artist <strong>Zi Ning</strong> for the game jam showcase. The visual identity merges traditional Japanese Shinto shrine mysticism, ofuda talismans, ghostly turquoise soul flames, and expressive pixel-art characters.",
        meineko_poster_desc2: "The watchful golden eye lingering in the darkness hints at the supreme deity/yokai overseeing the forest time loop that the player must overcome.",

        meineko_sec3_title: "Team Leadership & Technical Responsibilities",
        meineko_tech_intro: "As <strong>Game Director, Main Programmer, and Team Leader</strong> of Team A (8 members), I was responsible for uniting the vision, establishing the development pipeline, and implementing the core gameplay systems:",
        meineko_my_role_title: "Director & Core Programmer",
        meineko_my_task1: "<strong>Card System (札システム):</strong> Designed and implemented the real-time card deck selection, elemental triggers, cooldown states, and player ability modifications.",
        meineko_my_task2: "<strong>Build & Integration Pipeline:</strong> Established Git workflows, automated daily playable builds, and integrated work across 5 programmers and 3 artists with zero merge conflicts.",
        meineko_my_task3: "<strong>Game Integration & Direction:</strong> Maintained scope discipline, directed overall feel (game feel, camera shake, feedback), and balanced difficulty across the 10 days.",
        meineko_team_credits_title: "Team of 8 • Credits & Roles",
        meineko_credits_art: "<strong>Artists (3):</strong> Zi Ning (Character Sprites, Background, B1 Poster, Cutscenes), Sakura (Character, Background, Design, Animation), Asuma (Art & Visual Assets)",
        meineko_credits_prog: "<strong>Programmers (5):</strong> HEIN (Leader / Core Systems & Integration), Koushi (UI, BGM, Title Screen, HP Bars, Credits), Tetsuya (System Adjustments, Audio), Hinata (Dialogue System), Ethan (Basic Enemy Behavior)",

        meineko_sec4_title: "Team Leadership Reflections: What I Gained & Learned",
        meineko_ref1_badge: "Management & Trust",
        meineko_ref1_title: "Team Communication & Direction",
        meineko_ref1_text: "Leading an 8-person team (3 artists and 5 programmers) in a high-intensity 10-day sprint taught me that a leader's chief responsibility is clarity and active listening. I learned to bridge communication between artists and programmers, translating visual ideas into actionable code tasks while keeping everyone aligned on the core concept.",
        meineko_ref2_badge: "Collaboration & Support",
        meineko_ref2_title: "Finish Your Part, Help Others Advance",
        meineko_ref2_text: "In our team collaboration, every member owned their assigned part—and whenever anyone finished their tasks early, they immediately checked on other teammates to see who needed help. Nobody worked in isolation or sat idle; we actively reached out to solve blockers, assist with implementations, and ensure the entire 8-person team advanced together to hit the deadline.",
        meineko_ref3_badge: "Outcome",
        meineko_ref3_title: "Delivering Under 10-Day Deadline",
        meineko_ref3_text: "A game jam is won by the finish and polish, not unrealized ambition. By ruthless prioritization and relentless daily integration, we submitted the most complete, cohesive, and enjoyable game build in the jam, earning the prestigious <strong>Excellence Award (優秀賞)</strong>.",

        // Tags
        tag_engine: "Custom Game Engine",
        tag_cpp: "C++",
        tag_shaders: "Shaders",
        tag_ecs: "Hybrid ECS / OOP",
        tag_research: "Student Research",
        tag_souls: "Souls-like x Chivalry",

        // Modal Common
        modal_btn_back: "Back to Portfolio",
        modal_press_esc: "Press ESC or click outside to return",

        // Modal DUAL
        dual_modal_status: "Active Dev • Started Early 2026",
        dual_modal_type: "Student Research • Solo Dev",
        dual_modal_tag_engine: "Custom C++ Engine",
        dual_modal_subtitle: "Dark Fantasy Souls-like x Chivalry Melee Combat • Custom C++ Game Engine • Student Research",
        dual_modal_media_caption: "▲ In-Engine Gameplay Video: Real-time melee swordplay, camera physics, and HUD system captured live in the custom C++ engine.",
        
        meta_timeline_label: "Timeline",
        meta_timeline_val: "Jan 2026 ~ Ongoing Active Development",
        meta_role_label: "Role",
        meta_role_val: "Solo Developer, Engine & Gameplay Programmer",
        meta_tech_label: "Core Technologies",
        meta_arch_label: "Architecture",
        meta_arch_val: "Hybrid ECS / OOP Component System",

        dual_sec1_title: "The Game: Elden Ring / Dark Souls × Chivalry",
        dual_sec1_callout: "\"I started DUAL because I wanted to unite the punishing atmosphere, dark fantasy dread, and exploration of <strong>Elden Ring / Dark Souls</strong> with the directional melee mastery, stamina dueling, and tactile weapon impact of <strong>Chivalry</strong>.\"",
        dual_concept_lore_heading: "The Core Mechanic: Impermanence of the Flesh & Ghost Possession",
        dual_concept_lore_p1: "In <strong>DUAL</strong>, the player's physical vessel is never permanent. When struck down in battle, you don't merely restart at a checkpoint. Instead, your soul detaches from the body, and you awaken as an ethereal <strong>wandering ghost/spirit</strong> cast across a foggy, perilous realm.",
        dual_concept_lore_p2: "As a spirit, you journey through the mist to discover new dormant or defeated physical bodies across the map. Through the core mechanic <code>PossessVessel</code>, you inhabit these bodies, adapt to their unique weights and armaments, defeat dangerous adversaries, and seek to uncover the truth of a divided world where souls cannot cross to the other side.",
        dual_concept_lore_p3: "<strong>Active Solo Development (2026~):</strong> Development began at the start of 2026 as a dedicated student research project. Both the gameplay systems and custom engine are continuously growing side by side.",

        dual_sec2_title: "The Custom Engine: Why Build in C++ from Scratch?",
        dual_engine_intro: "Rather than relying on commercial black-box engines, I chose to build a custom game engine in C++ from the ground up. I wanted complete control over the rendering pipeline, shader systems, and memory layout—learning game development from the metal up.",
        dual_engine_p1: "<strong>A Hybrid ECS / OOP Foundation:</strong> Instead of dogmatic pure ECS, the engine uses a pragmatic Hybrid Component architecture. This allows me to write complex hierarchical combat state machines and AI intuitively, while maintaining component modularity and runtime flexibility for the dynamic <code>PossessVessel</code> mechanic.",
        dual_engine_p2: "The engine is built to grow directly alongside DUAL's game design. As features mature, deeper engine architecture deep-dives and technical breakdowns will be documented.",

        dual_sec3_title: "Dev Reflections: What I Failed, What I Gained & What I Learned",
        ref_fail_badge: "Error / Struggle",
        ref_fail_title: "What I Failed & Struggled With",
        ref_fail_item1: "<strong>Low-Level Complexity:</strong> Wrestling with matrix transforms, custom camera collisions, and shader debugging without visual tools led to countless game-crashing bugs early on.",
        ref_fail_item2: "<strong>Combat Spacing & Physics:</strong> Replicating Chivalry-style directional melee hitboxes from scratch in C++ was far harder than expected—early hitboxes clipped through terrain or lagged behind animations.",
        ref_fail_item3: "<strong>Scope Creep vs. Tooling:</strong> At first, I tried to write every engine feature under the sun before nailing the core possession loop. I had to rein myself in and focus on what the game actually needed.",

        ref_gain_badge: "Gained & Achieved",
        ref_gain_title: "What I Gained",
        ref_gain_item1: "<strong>Deep C++ & Graphics Mastery:</strong> An intimate understanding of memory management, cache locality, shaders, and rendering pipelines that no high-level engine tutorial could ever teach.",
        ref_gain_item2: "<strong>Complete Architectural Freedom:</strong> Every single engine system is tailored precisely to DUAL's unique spirit possession mechanics—no fighting another engine's assumptions.",
        ref_gain_item3: "<strong>Creative Confidence:</strong> Seeing an armored knight walk across misty peaks rendered by my own engine code gave me unshakeable confidence as a solo student developer.",

        ref_learn_badge: "Takeaways",
        ref_learn_title: "What I Learned",
        ref_learn_item1: "<strong>Build for the Game, Not for Dogma:</strong> A pragmatic hybrid architecture that lets you ship features easily beats pure architectural theory every day of the week.",
        ref_learn_item2: "<strong>Fail Fast & Iterate:</strong> The only way to truly understand a low-level engine bug is to break it, trace the pointers, and rebuild it stronger.",
        ref_learn_item3: "<strong>Turning Imagination into Reality:</strong> Big fantasy visions (inspired by donghua, anime, and manhwa) require deep technical discipline to become playable games.",

        // Modal Aetheria
        aetheria_modal_subtitle: "Atmospheric Fantasy Exploration & Magic Mechanics Prototype",
        aetheria_sec1_title: "Vision & Inspiration",
        aetheria_sec1_p1: "An exploration prototype heavily inspired by high-concept donghua animation and fantasy manhwa aesthetics. Built to study atmospheric environmental shaders, responsive character kinematics, and elemental spellcasting loops.",

        fail_title: "The Fail Log",
        fail_sub: "Things I broke, and what I learned.",
        fail1_header: "Error: Custom Physics Engine",
        fail1_broke: "Tried writing a custom gravity and collision system instead of engine colliders. Players clipped straight into the void.",
        fail1_learned: "Don't reinvent the wheel without a benchmark reason. Standard engine colliders are battle-tested.",
        fail2_header: "Error: Scope Creep",
        fail2_broke: "Planned an epic fantasy RPG with 10 classes and massive lore for a 48h game jam. Finished zero playable loops.",
        fail2_learned: "Cut the scope in half, then cut it again. Nail the core gameplay loop first, then expand the world.",
        fail_what_broke: "What broke:",
        fail_what_learned: "What I learned:",
        about_title: "About Me",
        photo_badge: "Game Dev & Storyteller",
        photo_languages: "Speaks 4 Languages",
        story_tag: "My Journey & Vision",
        bio_heading: "Turning Boundless Imagination into Playable Reality",
        bio_p1: "Hi, I'm <strong>HEIN SOE KHANT</strong>. My world revolves around epic fantasy—deeply inspired by high-concept donghua, anime movies, and fantasy manhwa.",
        bio_p2: "I chose the game development path because I want to bridge the gap between imagination and reality. As a multilingual developer fluent in 4 languages, I bring rich global perspectives to fantasy storytelling—turning boundless imagination into interactive universes players worldwide can explore.",
        hobbies_title: "What Inspires Me",
        hobby_1: "Donghua & Anime Movies",
        hobby_2: "Manhwa & Epic Worldbuilding",
        hobby_3: "Fantasy Lore & Exploration",
        skills_title: "What I'm Good At",
        skill_1: "Gameplay Logic & Systems",
        skill_2: "C# / Unity / C++",
        skill_3: "Rapid Prototyping",
        skill_4: "Speaks 4 Languages (Multilingual)",
        learning_title: "What I'm Learning",
        learn_1: "Shader Graph & Visual VFX",
        learn_2: "Procedural Worlds",
        learn_3: "Technical Art & Lighting",
        contact_title: "Let's talk.",
        btn_email: "Email me",
        marquee: [
            "FANTASY WORLDS", "DONGHUA & ANIME", "MANHWA", "SPEAKS 4 LANGUAGES", "GAME DEV", "IMAGINATION TO REALITY",
            "FANTASY WORLDS", "DONGHUA & ANIME", "MANHWA", "SPEAKS 4 LANGUAGES", "GAME DEV", "IMAGINATION TO REALITY"
        ],
        learningTopics: ['shaders', 'fantasy lore', 'ECS', 'game mechanics', 'IK', '4 languages', 'worldbuilding', 'C++']
    },
    ja: {
        page_title: "HEIN SOE KHANT - ゲーム開発者 / プログラマー",
        mode_free: "自由モード",
        mode_locked: "集中モード",
        learning_prefix: "勉強中:",
        hero_intro: "こんにちは、HEIN SOE KHANTです。",
        hero_statement: "無限の想像を、プレイできる現実へ。ファンタジーに魅せられ、挑戦を続けます。",
        btn_see_games: "制作ゲーム",
        btn_about: "自己紹介",
        btn_say_hi: "連絡する",
        
        projects_title: "制作実績",
        click_to_open_hint: "クリックで詳細ページを開く ↗",
        hero_3d_hint: "スワイプで3D回転 🎮",

        // Homepage Card 1 (DUAL)
        project1_title: "DUAL (デュアル)",
        dual_status: "研究開発中 (2026年〜)",
        dual_preview_badge: "実機プレイ動画 • 自作エンジン",
        dual_video_badge: "実機ゲームプレイ映像",
        project1_teaser: "自作C++エンジンで挑む、魂の憑依と剣戟のダークファンタジー。肉体の永続性を排した霊体探索メカニクス。",
        btn_explore_dual: "プロジェクト詳細・エンジン解説を見る →",
        project1_role: "担当: ソロ開発 & エンジンプログラマー",

        // Homepage Card 2 (MEINEKO)
        project2_title: "廻猫 - MEINEKO -",
        meineko_award_badge: "🏆 優秀賞 / Excellence Award",
        meineko_status: "IGCC Game Jam 優秀賞",
        project2_teaser: "IGCCゲームジャムにて10日間の短期集中で開発した、2D高速アクション×カード戦略ゲーム。テーマ「Time and Again（七転八起）」。ディレクター兼メインプログラマー兼リーダーとして8人チームを率い、優秀賞を受賞。",
        btn_explore_meineko: "MEINEKO プロジェクト詳細を見る →",
        project2_role: "担当: ゲームディレクター × メインプログラマー × リーダー",
        meineko_tag_award: "🏆 優秀賞受賞",
        meineko_tag_role: "リーダー & メインプログラマー",
        meineko_tag_genre: "高速アクション × カード戦略",
        meineko_tag_theme: "テーマ: 七転八起 (Time and Again)",
        meineko_tag_sprint: "10日間短期開発",

        // Modal MEINEKO
        meineko_eyebrow_award: "🏆 優秀賞 受賞作",
        meineko_eyebrow_jam: "IGCC Game Jam 2026",
        meineko_eyebrow_team: "8人チーム • 10日間開発",
        meineko_modal_subtitle: "2D高速アクション×カード戦略 • テーマ: 七転八起 (Time and Again) • IGCCゲームジャム 優秀賞受賞作",
        meineko_video_badge: "🏆 優秀賞 受賞作 PRムービー",
        meineko_modal_media_caption: "▲ 公式PRプレゼンテーション＆ゲームプレイ動画：チームAのコンセプト紹介・テーマ解釈・開発メンバー役割・実機プレイ映像。",
        meineko_meta_event_label: "参加イベント",
        meineko_meta_event_val: "IGCC Game Jam（10日間開発スプリント）",
        meineko_meta_award_label: "受賞結果",
        meineko_meta_award_val: "🏆 優秀賞 (Excellence Award)",
        meineko_meta_role_label: "担当役割",
        meineko_meta_role_val: "ゲームディレクター × メインプログラマー × チームリーダー",
        meineko_meta_theme_label: "ジャムテーマ",
        meineko_meta_theme_val: "Time and Again (七転八起 / 何度も何度も)",

        meineko_sec1_title: "ゲームコンセプト：高速アクション × カード戦略",
        meineko_sec1_callout: "「ジャムのテーマ<strong>『Time and Again』</strong>を、日本のことわざ<strong>『七転八起』</strong>と解釈しました。何度も何度も（again and again）立ち上がるループの概念を、世界観とゲームプレイの根幹に融合させました。」",
        meineko_core_heading: "軽快な猫のアクション操作 × 瞬時の札（カード）選択",
        meineko_core_p1: "<strong>『廻猫 - MEINEKO -』</strong>は、霊体となった俊敏な猫を操り、霧深き神社の森を駆ける2Dハイスピードアクションです。壁登り・高速ダッシュ・跳躍という軽快な操作性に加え、状況に応じて手札の神聖な「お札」を選択・発動。属性攻撃や結界、特殊移動スキルを駆使して立ち向かいます。",
        meineko_core_p2: "<strong>『猫の9つの命』とタイムループ:</strong> ことわざや伝承にある「猫の9つの命」を輪廻とタイムループとして再解釈。力尽きることは単なるゲームオーバーではなく、神社の奥底に隠された真実へと近づくサイクルとなります。「物語の深層にある真実を解き明かせるか？」",

        meineko_sec2_title: "公式ポスターとアートワーク",
        meineko_poster_badge: "チームA 公式B1ポスター",
        meineko_poster_heading: "アートディレクション & 和風妖怪・神道フォークロアの世界観",
        meineko_poster_desc1: "チームのアーティスト<strong>Zi Ning</strong>が描き下ろした公式B1ポスター。神道の荘厳さ、お札の呪術性、霊火の青緑、そして愛らしくも神秘的なドット絵の猫キャラクターが見事に調和しています。",
        meineko_poster_desc2: "暗闇から見下ろす金色の巨大な眼差しは、森のタイムループを司る神・妖怪の存在を示唆しており、プレイヤーが解き明かすべき真実を象徴しています。",

        meineko_sec3_title: "チームリーダーシップと技術的担当領域",
        meineko_tech_intro: "チームA（8名体制）の<strong>ゲームディレクター、メインプログラマー、およびチームリーダー</strong>として、全体のビジョン統一、開発パイプラインの構築、そしてコアゲームシステムの設計・実装を担当しました：",
        meineko_my_role_title: "ディレクション & コアプログラミング",
        meineko_my_task1: "<strong>札（カード）システム:</strong> リアルタイムなデッキ選択、属性発動、クールダウン管理、プレイヤー能力の動的書き換えシステムを設計・実装。",
        meineko_my_task2: "<strong>ビルド＆統合パイプライン:</strong> Gitワークフローの整備と毎日のテスト用ビルド自動化を実施。プログラマー5名・アーティスト3名の成果物を競合なくスムーズに統合。",
        meineko_my_task3: "<strong>ゲーム統合・ディレクション:</strong> 10日間で確実に完成させるためのスコープ管理、ゲームフィール（手触り・ヒットストップ・カメラワーク）の演出統括、難易度調整を牽引。",
        meineko_team_credits_title: "8名体制の開発クレジット & 役割分担",
        meineko_credits_art: "<strong>アーティスト (3名):</strong> Zi Ning (キャラドット絵、背景、B1ポスター、カットシーン), Sakura (キャラクター、背景、デザイン、アニメーション), Asuma (アート＆ビジュアル制作)",
        meineko_credits_prog: "<strong>プログラマー (5名):</strong> HEIN (リーダー / コアシステム・統合), Koushi (UI、BGM、タイトル、HPバー、スタッフロール), Tetsuya (システム調整、SE), Hinata (会話システム実装), Ethan (基本敵AI)",

        meineko_sec4_title: "リーダーとしての学びと成長",
        meineko_ref1_badge: "チームマネジメントと信頼",
        meineko_ref1_title: "チームの意思疎通とディレクション",
        meineko_ref1_text: "10日間という超短期のプレッシャー下で8人のチーム（アーティスト3名・プログラマー5名）を率いる中、リーダーにとって最も大切なのは「明確なビジョン伝達」と「傾聴」だと学びました。アートの感性とプログラムの実装要件の橋渡しを行い、全員が迷わず走れる環境を作りました。",
        meineko_ref2_badge: "自発的な助け合い",
        meineko_ref2_title: "自分のパートを終えたら、仲間をチェックして手助けに回る",
        meineko_ref2_text: "チーム開発において、各自が自分の担当パートに責任を持つと同時に、『自分の作業が終わった人は、手が止まっている人や支援が必要な仲間をチェックして積極的に手助けに回る』という助け合いのルールを徹底しました。誰かが一人で悩んで遅れることなく、チーム全員で声を掛け合いながら一歩一歩前進し続けたことが、10日間で最高完成度のゲームを届ける原動力となりました。",
        meineko_ref3_badge: "成果と受賞",
        meineko_ref3_title: "10日間の制限時間内で最高完成度を達成",
        meineko_ref3_text: "ゲームジャムの勝敗を分けるのは、未完の壮大な構想ではなく「完成度と手触りの研ぎ澄まし」です。妥協なきスコープ管理と毎日の統合テストを貫き、ジャム内で最も完成されたプロダクトを提出し、<strong>優秀賞</strong>を勝ち取ることができました。",

        // Tags
        tag_engine: "自作ゲームエンジン",
        tag_cpp: "C++",
        tag_shaders: "シェーダー",
        tag_ecs: "ハイブリッドECS/OOP",
        tag_research: "学生研究",
        tag_souls: "ソウルライク × Chivalry",

        // Modal Common
        modal_btn_back: "ポートフォリオに戻る",
        modal_press_esc: "ESCキーまたは背景クリックで戻る",

        // Modal DUAL
        dual_modal_status: "研究開発中 • 2026年初頭開始",
        dual_modal_type: "学生研究 • 個人開発",
        dual_modal_tag_engine: "自作C++エンジン",
        dual_modal_subtitle: "ソウルライク × Chivalry 剣戟アクション • 自作C++ゲームエンジン • 学生研究",
        dual_modal_media_caption: "▲ 自作C++エンジン実機プレイ映像：リアルタイム剣戟アクション、カメラ物理、HUDシステム稼働中。",

        meta_timeline_label: "開発時期",
        meta_timeline_val: "2026年1月〜 現在も研究開発中",
        meta_role_label: "担当領域",
        meta_role_val: "ソロ開発者、エンジン＆ゲームプレイプログラマー",
        meta_tech_label: "使用技術",
        meta_arch_label: "設計構造",
        meta_arch_val: "ハイブリッドECS/OOPコンポーネントシステム",

        dual_sec1_title: "ゲーム構想：ELDEN RING / DARK SOULS × Chivalry",
        dual_sec1_callout: "「<strong>ELDEN RING / DARK SOULS</strong>のダークファンタジーな重厚感と探検の緊張感、そして<strong>Chivalry</strong>のような精密な方向指示剣戟・スタミナの駆け引きを融合させたいという情熱から始まりました。」",
        dual_concept_lore_heading: "世界観と核となるシステム：肉体の不確定性と霊体憑依",
        dual_concept_lore_p1: "『<strong>DUAL</strong>』において、プレイヤーの肉体は永続するものではありません。力尽きるとチェックポイントに戻るのではなく、意識が肉体を離れ、霧深き大地を彷徨う<strong>霊体（ゴースト）</strong>として目覚めます。",
        dual_concept_lore_p2: "霊体となったプレイヤーは広大なマップを探索し、各地に横たわる新たな器（肉体）を発見します。コア能力<code>PossessVessel</code>（憑依）によって器を乗っ取り、異なる武器や機動力を駆使して強敵を撃破しながら、「なぜ向こう側の世界へ渡ることができないのか」という世界の真実を解き明かしていきます。",
        dual_concept_lore_p3: "<strong>継続的な個人開発 (2026年〜):</strong> 2026年初頭より学生研究・個人開発としてスタート。自作C++エンジンとゲームプレイ機能を同時並行で拡張し続けており、エンジン自体の進化がゲーム表現の深化に直結しています。",

        dual_sec2_title: "自作エンジンの思想：なぜゼロからC++で作るのか",
        dual_engine_intro: "市販のブラックボックスなエンジンに頼るのではなく、描画パイプラインやシェーダー、メモリ構造を根本から深く理解するため、C++でゼロから自作エンジンを構築する道を選びました。",
        dual_engine_p1: "<strong>ハイブリッドECS/OOPの採用:</strong> 純粋なECSの教条主義にとらわれず、実用的なハイブリッド構造を採用。これにより、階層的な剣戟ステートマシンや敵AIを直感的に記述しつつ、実行時の「憑依（PossessVessel）」に必要な動的コンポーネント組み立てと高いモジュール性を両立しています。",
        dual_engine_p2: "エンジンは『DUAL』のゲームデザインの進化と完全に同期して拡張されています。機能の成熟に伴い、詳細な設計資料やコード解説も順次公開していく予定です。",

        dual_sec3_title: "開発の軌跡：失敗、得られたもの、そして学んだこと",
        ref_fail_badge: "直面した壁・失敗",
        ref_fail_title: "失敗と直面した壁",
        ref_fail_item1: "<strong>低レイヤーの複雑さ:</strong> 視覚的エディタがない中での行列計算、カメラの衝突判定、シェーダーのバグ修正に苦闘し、初期はクラッシュの連続でした。",
        ref_fail_item2: "<strong>剣戟判定の難しさ:</strong> Chivalryのような方向指示の剣戟判定をゼロから自作する際、初期は当たり判定が地形をすり抜けたりアニメーションとズレるなど多くの壁にぶつかりました。",
        ref_fail_item3: "<strong>スコープと機能の誘惑:</strong> 当初は憑依のコアゲームループを固める前に、あらゆるエンジン機能を実装しようとして迷走。ゲームに真に必要な機能に絞り込む重要性を痛感しました。",

        ref_gain_badge: "得られた成果",
        ref_gain_title: "得られた成果と技術",
        ref_gain_item1: "<strong>C++とグラフィックスの深い理解:</strong> メモリ管理、キャッシュ効率、シェーダー、描画パイプラインなど、高位の市販エンジン教材では得られない本質的な技術力を獲得。",
        ref_gain_item2: "<strong>自由度の高い設計:</strong> 既成エンジンの制約と戦うことなく、DUALの独自ギミック（霊体憑依）のために最適化されたエンジン基盤を手に入れました。",
        ref_gain_item3: "<strong>形にする自信:</strong> 自身がゼロから書いたコードによって、霧深い山嶺を歩く騎士が画面に映し出された瞬間、ソロ開発者として確固たる自信を得ました。",

        ref_learn_badge: "学んだ教訓",
        ref_learn_title: "学んだ教訓",
        ref_learn_item1: "<strong>理論よりゲーム本位:</strong> 純粋な設計論に固執するより、実際のゲームプレイを直感的に拡張できるハイブリッド構成こそが真に価値があると学びました。",
        ref_learn_item2: "<strong>失敗から学ぶ迅速な反復:</strong> 低レイヤーのバグを真に克服する唯一の方法は、壊してポインタを追い、より堅牢に再構築することだと知りました。",
        ref_learn_item3: "<strong>想像を現実に変える力:</strong> 壮大なファンタジー世界への情熱も、それを支える地道な技術的探求と規律があって初めてプレイ可能な現実になると実感しています。",
        fail_title: "失敗と学びの記録 (Fail Log)",
        fail_sub: "失敗した経験と、そこから得た教訓。",
        fail1_header: "エラー: 独自物理エンジンの罠",
        fail1_broke: "エンジン標準機能を使わずゼロから衝突判定を作成。プレイヤーが壁をすり抜け続けた。",
        fail1_learned: "目的なく車輪の再発明をしない。標準コライダーに切り替えて堅牢な挙動を実現。",
        fail2_header: "エラー: ゲームジャムでの風呂敷の広げすぎ",
        fail2_broke: "48時間のジャムで10種以上の職業を持つオープンワールドRPGを計画し、完成に至らず。",
        fail2_learned: "スコープは半分にし、さらに半分に削る。まずは確実なコアゲームループを完成させる。",
        fail_what_broke: "失敗点:",
        fail_what_learned: "学んだこと:",
        about_title: "自己紹介",
        photo_badge: "ゲーム開発者 & ストーリーテラー",
        photo_languages: "4言語対応 (マルチリンガル)",
        story_tag: "原点と情熱",
        bio_heading: "頭の中の想像を、プレイできる現実へ",
        bio_p1: "こんにちは、<strong>HEIN SOE KHANT</strong>です。私の原動力はファンタジーの世界です。アニメ、劇場版アニメ、中国アニメ（動画）、そしてファンタジーマンガ・ウェブトゥーンに深く夢中になってきました。",
        bio_p2: "「頭の中にある壮大なイマジネーションを、現実の体験として形にしたい」という強い想いから、ゲーム開発の道を選びました。4つの言語を自在に操るマルチリンガルとしての強みを活かし、グローバルな開発チームと連携しながら、世界中のプレイヤーが夢中になれるゲーム体験を創り出します。",
        hobbies_title: "インスピレーションの源",
        hobby_1: "中国アニメ（動画） & ファンタジーアニメ",
        hobby_2: "マンガ・ウェブトゥーン & 壮大な世界観設計",
        hobby_3: "ゲームメカニクス & システム構築",
        skills_title: "得意分野",
        skill_1: "ゲームプレイロジック & システム設計",
        skill_2: "C# / Unity / C++",
        skill_3: "迅速なプロトタイピング",
        skill_4: "4言語対応 (マルチリンガル・国際連携)",
        learning_title: "現在学んでいること",
        learn_1: "シェーダーグラフ & VFX表現",
        learn_2: "プロシージャル生成（自動生成）",
        learn_3: "テクニカルアート & ライティング",
        contact_title: "お気軽にご連絡ください",
        btn_email: "メールを送る",
        marquee: [
            "ファンタジー世界", "アニメ・中国動画", "マンガ・ウェブトゥーン", "4言語対応 (マルチリンガル)", "ゲーム開発", "想像から現実へ",
            "ファンタジー世界", "アニメ・中国動画", "マンガ・ウェブトゥーン", "4言語対応 (マルチリンガル)", "ゲーム開発", "想像から現実へ"
        ],
        learningTopics: ['シェーダー', 'ファンタジー世界観', 'ECS', 'ゲームプレイ', 'IK', '4言語対応', 'ワールド制作', 'C++']
    }
};

/* --- LANGUAGE STATE & TOGGLE --- */
let currentLang = localStorage.getItem('portfolio-lang') || 'en';
const langBtn = document.getElementById('lang-toggle');

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('portfolio-lang', lang);
    document.documentElement.setAttribute('lang', lang);

    if (langBtn) {
        const pillEn = langBtn.querySelector('.pill-en');
        const pillJa = langBtn.querySelector('.pill-ja');
        if (pillEn && pillJa) {
            pillEn.classList.toggle('active', lang === 'en');
            pillJa.classList.toggle('active', lang === 'ja');
        }
    }

    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    if (dict.page_title) document.title = dict.page_title;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });

    const marqueeEl = document.getElementById('marquee-text');
    if (marqueeEl && dict.marquee) {
        marqueeEl.innerHTML = dict.marquee.map(item => `<span>${item}</span> <span>*</span>`).join(' ');
    }

    CONFIG.learningTopics = dict.learningTopics || CONFIG.learningTopics;
    if (tickerEl) {
        tickerIdx = 0;
        tickerEl.textContent = CONFIG.learningTopics[0];
    }

    renderHeadline(dict.hero_intro, dict.hero_statement);
}

if (langBtn) {
    langBtn.addEventListener('click', () => {
        const nextLang = currentLang === 'en' ? 'ja' : 'en';
        setLanguage(nextLang);
    });
}

/* --- MODE TOGGLE (LOCKED IN / FREE) --- */
const body = document.body;
const toggleBtn = document.getElementById('mode-toggle');

let currentMode = localStorage.getItem('portfolio-mode');
if (!currentMode) {
    currentMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'locked' : 'free';
}
setMode(currentMode);

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        setMode(currentMode === 'free' ? 'locked' : 'free');
    });
}

function setMode(mode) {
    currentMode = mode;
    body.setAttribute('data-mode', mode);
    localStorage.setItem('portfolio-mode', mode);
    if (typeof updateSceneMode === 'function') updateSceneMode(mode);
    if (typeof window.updateBgMode === 'function') window.updateBgMode(mode);
}

/* --- LEARNING TICKER --- */
const tickerEl = document.getElementById('learning-ticker');
let tickerIdx = 0;
if (tickerEl && !CONFIG.reducedMotion) {
    setInterval(() => {
        tickerIdx = (tickerIdx + 1) % CONFIG.learningTopics.length;
        tickerEl.style.opacity = 0;
        setTimeout(() => {
            tickerEl.textContent = CONFIG.learningTopics[tickerIdx];
            tickerEl.style.opacity = 1;
        }, 200);
    }, CONFIG.tickerSpeed);
}

/* --- TEXT REVEAL ANIMATION --- */
const headline = document.getElementById('hero-headline');

function renderHeadline(intro, statement) {
    if (!headline) return;
    headline.textContent = '';
    
    // Line 1: Introduction ("Hi, I'm HEIN SOE KHANT." / "こんにちは、HEIN SOE KHANTです。")
    const lineIntro = document.createElement('span');
    lineIntro.className = 'headline-line headline-intro';

    // Line 2: Vision / Manifesto statement on next line
    const lineStatement = document.createElement('span');
    lineStatement.className = 'headline-line headline-statement';

    function addTokens(container, text, baseDelay) {
        if (!text) return;
        if (currentLang === 'ja') {
            if (container.classList.contains('headline-intro')) {
                // Keep 'こんにちは、' and 'HEIN SOE KHANTです。' as semantic chunks, with nowrap on full name
                const spanHello = document.createElement('span');
                spanHello.className = 'split-word ja-phrase';
                spanHello.textContent = 'こんにちは、';
                spanHello.style.transitionDelay = `${baseDelay}ms`;

                const spanName = document.createElement('span');
                spanName.className = 'split-word ja-phrase ja-name-nowrap';
                spanName.textContent = 'HEIN SOE KHANTです。';
                spanName.style.whiteSpace = 'nowrap';
                spanName.style.transitionDelay = `${baseDelay + 50}ms`;

                container.appendChild(spanHello);
                container.appendChild(spanName);
                return;
            }

            // Statement: split on punctuation only, preserving word flow
            const phrases = text.split(/(?<=[、。！？])/);
            phrases.forEach((phrase, i) => {
                if (!phrase.trim()) return;
                const span = document.createElement('span');
                span.className = 'split-word ja-phrase';
                span.textContent = phrase.trim();
                span.style.transitionDelay = `${baseDelay + i * 45}ms`;
                container.appendChild(span);
            });
        } else {
            // English: individual words with margin-right spacing
            const words = text.split(' ');
            words.forEach((word, i) => {
                if (!word) return;
                const span = document.createElement('span');
                span.className = 'split-word';
                span.textContent = word;
                span.style.transitionDelay = `${baseDelay + Math.min(i * 22, 380)}ms`;
                container.appendChild(span);
            });
        }
    }

    addTokens(lineIntro, intro, 0);
    addTokens(lineStatement, statement, 160);

    headline.appendChild(lineIntro);
    headline.appendChild(lineStatement);

    setTimeout(() => {
        headline.querySelectorAll('.split-word').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    }, 40);
}

// Initial language setup
setLanguage(currentLang);

/* --- SCROLL REVEAL --- */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

/* --- CUSTOM CURSOR & MAGNETIC BUTTONS --- */
const cursor = document.getElementById('cursor');
const cursorLabel = document.getElementById('cursor-label');

if (window.matchMedia('(pointer: fine)').matches && !CONFIG.reducedMotion) {
    window.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest('[data-cursor]');
        if (target) {
            cursor.classList.add('active');
            cursorLabel.textContent = target.getAttribute('data-cursor') || '';
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest('[data-cursor]');
        if (target) {
            if (!e.relatedTarget || !target.contains(e.relatedTarget)) {
                cursor.classList.remove('active');
                cursorLabel.textContent = '';
            }
        }
    });

    // Magnetic buttons
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            if(currentMode === 'locked') return; // Disable wobble in locked mode
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

/* --- THREE.JS HERO CANVAS --- */
const canvas = document.getElementById('hero-canvas');
window.updateSceneMode = null; // Exposed globally to toggle

if (canvas) {
    const scene = new THREE.Scene();
    
    // Transparent background so CSS card color shows through
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.7;

    // A chunky character/controller from primitives
    const group = new THREE.Group();
    
    // Materials
    const matFree = new THREE.MeshStandardMaterial({ 
        color: 0x7B5CFF, // Violet
        roughness: 0.3, 
        metalness: 0.1
    });
    const matLockedWire = new THREE.MeshBasicMaterial({
        color: 0xC8F32B, // Lime
        wireframe: true,
        wireframeLinewidth: 2
    });

    // Body
    const bodyGeo = new THREE.BoxGeometry(1.6, 1.1, 0.6);
    const bodyMesh = new THREE.Mesh(bodyGeo, matFree);
    group.add(bodyMesh);

    // Buttons
    const btnGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.2, 16);
    btnGeo.rotateX(Math.PI / 2);
    
    const btn1 = new THREE.Mesh(btnGeo, new THREE.MeshStandardMaterial({ color: 0xFF7A3D }));
    btn1.position.set(0.4, 0.15, 0.35);
    group.add(btn1);
    
    const btn2 = new THREE.Mesh(btnGeo, new THREE.MeshStandardMaterial({ color: 0xC8F32B }));
    btn2.position.set(0.65, -0.15, 0.35);
    group.add(btn2);
    
    // D-Pad
    const padGeo = new THREE.BoxGeometry(0.5, 0.5, 0.2);
    const pad = new THREE.Mesh(padGeo, new THREE.MeshStandardMaterial({ color: 0x111111 }));
    pad.position.set(-0.5, 0, 0.35);
    group.add(pad);

    scene.add(group);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Update material based on mode
    window.updateSceneMode = (mode) => {
        if (mode === 'locked') {
            bodyMesh.material = matLockedWire;
            btn1.material = matLockedWire;
            btn2.material = matLockedWire;
            pad.material = matLockedWire;
        } else {
            bodyMesh.material = matFree;
            btn1.material = new THREE.MeshStandardMaterial({ color: 0xFF7A3D });
            btn2.material = new THREE.MeshStandardMaterial({ color: 0xC8F32B });
            pad.material = new THREE.MeshStandardMaterial({ color: 0x111111 });
        }
    };
    updateSceneMode(currentMode);

    // Resize handler
    const container = canvas.parentElement;
    function resizeCanvas() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Multi-Device Interaction Engine (Touch, Mouse, Gyroscope & Idle Physics)
    let currentRotation = { x: 0, y: 0 };
    let targetRotation = { x: 0, y: 0 };
    let rotVelocity = { x: 0, y: 0 };
    let scaleY = 1;
    let isTouchDragging = false;
    let isMouseHovering = false;
    let touchStartPos = { x: 0, y: 0, time: 0 };
    let lastTouchPos = { x: 0, y: 0 };
    let heroGyro = { x: 0, y: 0 };

    const hintEl = document.getElementById('hero-3d-hint');
    const dismissHint = () => {
        if (hintEl && !hintEl.classList.contains('hidden')) {
            hintEl.classList.add('hidden');
        }
    };

    if (!CONFIG.reducedMotion) {
        // --- 1. MOUSE CONTROLS (PC) ---
        container.addEventListener('mousemove', (e) => {
            isMouseHovering = true;
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width * 2 - 1;
            const y = -(e.clientY - rect.top) / rect.height * 2 + 1;
            targetRotation.x = y * 0.45;
            targetRotation.y = x * 0.45;
        });
        container.addEventListener('mouseleave', () => {
            isMouseHovering = false;
            targetRotation.x = 0;
            targetRotation.y = 0;
        });
        container.addEventListener('mousedown', () => {
            dismissHint();
            scaleY = 0.72; // Squash
        });
        container.addEventListener('mouseup', () => {
            scaleY = 1.18; // Stretch bounce
        });

        // --- 2. TOUCH CONTROLS (SMARTPHONES & TABLETS) ---
        container.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                dismissHint();
                if (window.initBackgroundGyro) window.initBackgroundGyro();

                isTouchDragging = true;
                const t = e.touches[0];
                touchStartPos = { x: t.clientX, y: t.clientY, time: performance.now() };
                lastTouchPos = { x: t.clientX, y: t.clientY };
                rotVelocity = { x: 0, y: 0 };
                scaleY = 0.78; // Gentle tactile squash
            }
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (!isTouchDragging || e.touches.length !== 1) return;
            const t = e.touches[0];
            const dx = t.clientX - lastTouchPos.x;
            const dy = t.clientY - lastTouchPos.y;
            const totalDistX = Math.abs(t.clientX - touchStartPos.x);
            const totalDistY = Math.abs(t.clientY - touchStartPos.y);

            // If user is predominantly rotating horizontally or interacting with the 3D model, prevent scroll cancel
            if (totalDistX > 6 && totalDistX > totalDistY * 0.8) {
                if (e.cancelable) e.preventDefault();
            }

            const rect = container.getBoundingClientRect();
            const rotSpeed = 2.4;
            const deltaRotY = (dx / rect.width) * rotSpeed;
            const deltaRotX = -(dy / rect.height) * rotSpeed;

            currentRotation.y += deltaRotY;
            currentRotation.x = Math.max(-0.7, Math.min(0.7, currentRotation.x + deltaRotX));

            // Track velocity for inertia flick
            rotVelocity.y = deltaRotY * 0.6;
            rotVelocity.x = deltaRotX * 0.5;

            lastTouchPos = { x: t.clientX, y: t.clientY };
        }, { passive: false });

        const endTouch = () => {
            if (!isTouchDragging) return;
            isTouchDragging = false;
            const dt = performance.now() - touchStartPos.time;
            const totalDist = Math.hypot(lastTouchPos.x - touchStartPos.x, lastTouchPos.y - touchStartPos.y);

            // Quick tap: fun jump & pop bounce
            if (dt < 280 && totalDist < 10) {
                scaleY = 0.6;
                setTimeout(() => { scaleY = 1.25; }, 80);
                rotVelocity.y += 0.08;
            } else {
                scaleY = 1.15; // Spring recoil
            }
        };

        container.addEventListener('touchend', endTouch, { passive: true });
        container.addEventListener('touchcancel', () => {
            isTouchDragging = false;
            scaleY = 1.0;
        }, { passive: true });

        // --- 3. GYROSCOPE TILT (SMARTPHONE TILT) ---
        window.addEventListener('deviceorientation', (e) => {
            if (e.gamma !== null && e.beta !== null && !isTouchDragging) {
                const clampedGamma = Math.max(-25, Math.min(25, e.gamma));
                const clampedBeta = Math.max(-25, Math.min(25, e.beta - 45));
                heroGyro.y = (clampedGamma / 25) * 0.35;
                heroGyro.x = (-clampedBeta / 25) * 0.25;
            }
        }, { passive: true });
    }

    // Performance: Pause when hidden
    let isPaused = false;
    const canvasObserver = new IntersectionObserver(entries => {
        isPaused = !entries[0].isIntersecting;
    });
    canvasObserver.observe(container);
    document.addEventListener('visibilitychange', () => {
        isPaused = document.hidden;
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        if (isPaused) return;

        if (!CONFIG.reducedMotion) {
            const time = performance.now() * 0.002;

            // Apply inertia momentum decay after touch swipe
            if (!isTouchDragging) {
                currentRotation.y += rotVelocity.y;
                currentRotation.x = Math.max(-0.7, Math.min(0.7, currentRotation.x + rotVelocity.x));
                rotVelocity.y *= 0.92;
                rotVelocity.x *= 0.92;

                // When idle and not hovered with mouse, blend towards origin + subtle idle drift
                if (!isMouseHovering && Math.abs(rotVelocity.y) < 0.002 && Math.abs(rotVelocity.x) < 0.002) {
                    currentRotation.x += (0 - currentRotation.x) * 0.04;
                    // Keep gentle bobbing
                }
            }

            // Idle floating wave & natural breathing movement
            const idleBob = Math.sin(time) * 0.08;
            const idleTiltX = Math.sin(time * 0.8) * 0.05;
            const idleTiltY = Math.cos(time * 0.6) * 0.06;
            group.position.y = idleBob;

            // Target angles combining user input, inertia, gyro, and idle motion
            const finalTargetX = currentRotation.x + (isMouseHovering ? targetRotation.x : (heroGyro.x + idleTiltX));
            const finalTargetY = currentRotation.y + (isMouseHovering ? targetRotation.y : (heroGyro.y + idleTiltY));

            group.rotation.x += (finalTargetX - group.rotation.x) * 0.1;
            group.rotation.y += (finalTargetY - group.rotation.y) * 0.1;
            
            // Squash and stretch spring physics
            scaleY += (1 - scaleY) * 0.16; 
            const scaleX = 1 + (1 - scaleY) * 0.42; 
            group.scale.set(scaleX, scaleY, scaleX);
        }

        renderer.render(scene, camera);
    }
    animate();
}

/* ============================================================
   BIG PROJECT PAGE MODAL CONTROLLER
   ============================================================ */
const projectModal = document.getElementById('project-page-modal');
const modalNavBadge = document.getElementById('modal-nav-badge');
const modalBackBtn = document.getElementById('modal-back-btn');
const modalCloseIcon = document.getElementById('modal-close-icon');
const modalBackdrop = document.getElementById('modal-backdrop-blur');

let activeProject = null;

function openProjectModal(projectId) {
    if (!projectModal) return;
    activeProject = projectId;

    // Switch active article
    document.querySelectorAll('.project-detail-article').forEach(art => {
        art.classList.remove('active');
    });
    const targetArticle = document.getElementById(`project-detail-${projectId}`);
    if (targetArticle) {
        targetArticle.classList.add('active');
    }

    // Update nav badge
    if (modalNavBadge) {
        modalNavBadge.textContent = projectId === 'dual' ? 'DUAL' : '廻猫 MEINEKO';
        modalNavBadge.className = `modal-nav-badge badge ${projectId === 'dual' ? 'color-lime' : 'color-orange'}`;
    }

    // Show modal & prevent background scrolling
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Update URL hash without abrupt jump
    if (window.history && window.history.replaceState) {
        window.history.replaceState(null, null, `#project-${projectId}`);
    } else {
        window.location.hash = `#project-${projectId}`;
    }

    // Reset scroll position to top
    projectModal.scrollTop = 0;
}

function closeProjectModal() {
    if (!projectModal || !projectModal.classList.contains('active')) return;
    
    // Pause any playing modal video
    projectModal.querySelectorAll('video').forEach(v => {
        try { v.pause(); } catch(e) {}
    });

    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeProject = null;

    // Clear hash if it was a project hash
    const currentHash = window.location.hash.toLowerCase();
    if (currentHash.startsWith('#project-') || currentHash === '#dual' || currentHash === '#meineko') {
        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, null, window.location.pathname + window.location.search);
        } else {
            window.location.hash = '';
        }
    }
}

// Bind modal triggers for project cards & buttons
document.querySelectorAll('[data-project]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        // Prevent opening if clicking on an external link inside
        if (e.target.tagName === 'A' && !e.target.classList.contains('open-project-trigger')) return;
        const pid = trigger.getAttribute('data-project');
        if (pid) {
            openProjectModal(pid);
        }
    });

    // Keyboard navigation (Enter / Space on card)
    if (trigger.classList.contains('project-card-interactive')) {
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const pid = trigger.getAttribute('data-project');
                if (pid) openProjectModal(pid);
            }
        });
    }
});

// Bind close triggers
if (modalBackBtn) modalBackBtn.addEventListener('click', closeProjectModal);
if (modalCloseIcon) modalCloseIcon.addEventListener('click', closeProjectModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

document.querySelectorAll('.modal-back-btn-bottom').forEach(btn => {
    btn.addEventListener('click', closeProjectModal);
});

// ESC key closes modal
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});

// Hash routing support (deep link and browser back/forward)
function handleHashRoute() {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#project-dual' || hash === '#dual') {
        openProjectModal('dual');
    } else if (hash === '#project-meineko' || hash === '#meineko') {
        openProjectModal('meineko');
    } else if (projectModal && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
}
window.addEventListener('hashchange', handleHashRoute);
window.addEventListener('DOMContentLoaded', handleHashRoute);

// Also check immediately in case DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    handleHashRoute();
}

