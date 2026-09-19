import { IconName } from "../components/Icons";

export type ChoiceType = "choice" | "question" | "puzzle" | "match";

export interface Choice {
  text: string;
  correct?: boolean;
  next?: string;
  feedback?: string;
  points?: number;
}

export interface MatchPair {
  term: string;
  definition: string;
}

export interface StoryNode {
  id: string;
  type: "narrative" | "choice" | "question" | "puzzle" | "match" | "ending";
  scene?: string;
  title?: string;
  text: string;
  image?: string;
  sceneArt?: string;
  concept?: string;
  choices?: Choice[];
  matchPairs?: MatchPair[];
  next?: string;
  hint?: string;
  xp?: number;
}

export interface Story {
  id: string;
  title: string;
  subject: string;
  grade: string;
  region: string;
  regionIcon: IconName;
  difficulty: "سهل" | "متوسط" | "صعب";
  duration: string;
  description: string;
  cover: string;
  mapPosition: { x: number; y: number };
  concepts: string[];
  nodes: Record<string, StoryNode>;
  startNode: string;
}

// ─── Story 1: Water Cycle ───────────────────────────────────────────────────
export const waterCycleStory: Story = {
  id: "water-cycle-ahsa",
  title: "سر المياه المختفية في واحة الأحساء",
  subject: "علوم الأرض — دورة الماء",
  grade: "الصف الخامس الابتدائي",
  region: "واحة الأحساء",
  regionIcon: "palm-tree",
  difficulty: "متوسط",
  duration: "٢٠ دقيقة",
  description: "مغامرة في أعمق واحة في العالم للكشف عن سر اختفاء المياه وإنقاذ النخيل",
  cover: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=450&fit=crop&auto=format",
  mapPosition: { x: 72, y: 52 },
  concepts: ["التبخر", "التكثف", "التساقط", "الجريان السطحي", "المياه الجوفية"],
  startNode: "intro",
  nodes: {
    intro: {
      id: "intro",
      type: "narrative",
      scene: "فجر الواحة",
      title: "الاستدعاء",
      text: "تُفتح عيناك على صوت جدتك تُنادي بقلق: «يا بطل! شيخ القبيلة يطلبك — النخيل يتعطش والآبار تجفّ!»\n\nتنظر من نافذة بيت الطين القديم؛ سعف النخل يتدلى صفراء تحت شمس الأحساء. مئات الأشجار التي غذّت القرية لقرون تحتضر.\n\nالشيخ يعتقد أن دورة الماء اختُطفت من السماء. أنت الوحيد الذي قرأ عنها في الكتب.",
      image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&h=500&fit=crop&auto=format",
      xp: 10,
      next: "sheikh_meeting",
    },
    sheikh_meeting: {
      id: "sheikh_meeting",
      type: "choice",
      scene: "مجلس الشيخ",
      title: "لقاء الشيخ حمد",
      text: "يجلس الشيخ حمد محاطاً بكبار القوم. يقول:\n\n«الحكماء القدامى كانوا يعرفون أين تذهب المياه وتعود. لكننا نسينا. أخبرني يا فتى — من أين تأتي مياه الأمطار أصلاً؟»",
      concept: "دورة الماء",
      hint: "تذكّر: الماء لا يُخلق ولا يُفنى، بل يسير في دورة مستمرة.",
      choices: [
        {
          text: "«تأتي من البحر — تتبخر مياهه وتصبح سحاباً يحمل المطر»",
          correct: true,
          feedback: "أحسنت! التبخر هو المحرك الأول لدورة الماء. حرارة الشمس تحوّل مياه الخليج إلى بخار يرتفع نحو السماء.",
          points: 30,
          next: "evaporation_lesson",
        },
        {
          text: "«تأتي من الجبال والثلوج في الشمال»",
          correct: false,
          feedback: "هذا صحيح في مناطق أخرى، لكن في شبه الجزيرة العربية، البحار هي المصدر الرئيسي للبخار.",
          points: 10,
          next: "evaporation_lesson",
        },
        {
          text: "«لا أعرف، المطر يأتي من عند الله مباشرة»",
          correct: false,
          feedback: "الله هو خالق الأسباب، والعلم يكشف آليات هذه الأسباب. دعنا نتعلم معاً كيف يتحرك الماء.",
          points: 5,
          next: "evaporation_lesson",
        },
      ],
    },
    evaporation_lesson: {
      id: "evaporation_lesson",
      type: "narrative",
      scene: "شاطئ الخليج العربي",
      title: "عند شاطئ الخليج",
      text: "يصطحبك الشيخ الشاب نايف إلى مشارف الواحة حيث يلمح الأفق الأزرق للخليج.\n\nيُشير بيده: «انظر — الشمس تضرب الماء بلا رحمة منذ الفجر. أين تذهب كل هذه الطاقة؟»\n\nتلاحظ خيوطاً شفافة ترتفع فوق سطح الماء. هذا هو **التبخر**: الشمس تُعطي الجزيئات طاقة تكفي لتهرب من سطح الماء وتطير في الهواء كبخار لا يُرى.",
      image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&h=500&fit=crop&auto=format",
      concept: "التبخر",
      xp: 15,
      next: "match_water_cycle",
    },
    match_water_cycle: {
      id: "match_water_cycle",
      type: "match",
      scene: "مخطوطة الشيخ",
      title: "ربط المفاهيم",
      text: "وجدتَ في خيمة الشيخ مخطوطة قديمة بها تعريفات مبعثرة. ساعد في ترتيبها بربط كل مفهوم بتعريفه الصحيح.",
      concept: "مفاهيم الماء",
      hint: "فكّر في كل مرحلة: هل الماء يرتفع؟ يتجمع؟ ينزل؟",
      xp: 20,
      matchPairs: [
        { term: "التبخر", definition: "تحول الماء السائل إلى بخار بفعل الحرارة" },
        { term: "التكثف", definition: "تحول البخار إلى قطرات ماء بالتبريد" },
        { term: "التساقط", definition: "نزول الماء من السحب مطراً أو ثلجاً" },
        { term: "الجريان", definition: "تدفق الماء على سطح الأرض نحو الأودية" },
      ],
      next: "clouds_puzzle",
    },
    clouds_puzzle: {
      id: "clouds_puzzle",
      type: "question",
      scene: "ارتفاع في الجو",
      title: "لغز السحاب",
      text: "يشير نايف إلى السحابة البيضاء البعيدة:\n\n«بخار الماء صعد للأعلى — لكن كيف تحوّل من بخار شفاف إلى سحابة بيضاء يمكن رؤيتها؟»",
      concept: "التكثف",
      hint: "فكّر: ماذا يحدث للبخار الساخن حين يصعد إلى طبقات الجو الباردة؟",
      choices: [
        {
          text: "البخار يبرد في الأعلى فيتكثّف ويتحول إلى قطرات ماء صغيرة جداً تشكّل السحاب",
          correct: true,
          feedback: "ممتاز! هذه هي عملية التكثّف. البرودة تسلب الجزيئات طاقتها فتتجمع مرة أخرى كقطرات. الأبراج العالية في الرياض تظهر أحياناً داخل السحاب لهذا السبب!",
          points: 40,
          next: "rain_challenge",
        },
        {
          text: "البخار يختلط بالغبار فيصبح مرئياً",
          correct: false,
          feedback: "الغبار يساعد على تكوين السحاب كنواة تكثف، لكن العملية الأساسية هي التبريد والتكثف.",
          points: 15,
          next: "rain_challenge",
        },
        {
          text: "البخار يتجمد ويصبح بلورات جليد",
          correct: false,
          feedback: "في السحب العالية جداً يحدث هذا، لكن السحب العادية تتكون من قطرات ماء سائلة لا جليد.",
          points: 15,
          next: "rain_challenge",
        },
      ],
    },
    rain_challenge: {
      id: "rain_challenge",
      type: "narrative",
      scene: "قمة جبل طويق",
      title: "اللحظة الحاسمة",
      text: "تتسلق قمة قريبة مع نايف. السحابة تقترب وهي مثقلة بالماء.\n\nيقول نايف: «القطرات الصغيرة تتجمع وتكبر حتى يصبح وزنها أثقل من طاقة الهواء على حملها.»\n\nفجأة — **تساقط**! قطرات المطر تغسل وجهك. الأرض الجافة تمتص بعجلة.",
      image: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=900&h=500&fit=crop&auto=format",
      concept: "التساقط",
      xp: 20,
      next: "water_flow_question",
    },
    water_flow_question: {
      id: "water_flow_question",
      type: "question",
      scene: "بعد المطر",
      title: "أين يذهب ماء المطر؟",
      text: "المطر توقف. تنظر حولك — بعض الماء يجري على السطح في جداول صغيرة، وبعضه يختفي في الأرض.\n\nالشيخ حمد الذي لحق بكم يسأل: «يا فتى، لماذا لا تصل كل مياه الأمطار إلى آبار الواحة؟»",
      concept: "الجريان السطحي والتسرب",
      hint: "الأرض الصلبة لا تسمح للماء بالدخول، لكن الرمال والتربة الطرية...",
      choices: [
        {
          text: "لأن جزءاً منه يتبخر، وجزءاً يجري على السطح بعيداً، وجزءاً فقط يتسرب للمياه الجوفية",
          correct: true,
          feedback: "دقيق جداً! هذا التوزيع الثلاثي يحدد كمية المياه الجوفية. في الأحساء، النخيل يستمد مياهه من المياه الجوفية العميقة.",
          points: 50,
          next: "underground_water",
        },
        {
          text: "لأن الأرض الرملية تمتص كل الماء دفعة واحدة",
          correct: false,
          feedback: "الرمال تمتص جيداً، لكن سرعة التسرب تعتمد على نوع التربة والطبقات الصخرية تحتها.",
          points: 20,
          next: "underground_water",
        },
        {
          text: "لأن المطر في الأحساء قليل وكله يتبخر فوراً",
          correct: false,
          feedback: "كمية المطر تؤثر، لكن السؤال عن ما يحدث للماء الذي يصل الأرض، ليس كميته.",
          points: 10,
          next: "underground_water",
        },
      ],
    },
    underground_water: {
      id: "underground_water",
      type: "narrative",
      scene: "البئر القديمة",
      title: "الكنز تحت الأرض",
      text: "تجدون البئر القديمة التي جفّت. تنزل بحبل مع نايف.\n\nفي الأسفل، يُضيء مصباحه على طبقات الصخور. يُفسّر: «هذه طبقات الأرض — الرمال تسمح بمرور الماء، لكن هذه الطبقة الطينية الصلبة تمنعه وتحبسه فيصنع **خزاناً جوفياً**.»\n\nتلمس الصخرة الرطبة. هذه المياه ربما رحلتها بدأت من مطر سقط قبل مئات السنين.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&h=500&fit=crop&auto=format",
      concept: "المياه الجوفية",
      xp: 25,
      next: "final_challenge",
    },
    final_challenge: {
      id: "final_challenge",
      type: "puzzle",
      scene: "مجلس الشيخ — الفصل الأخير",
      title: "اختبار البطولة",
      text: "تعود إلى الشيخ حمد وكبار القرية. يقول: «أثبت لنا أنك تفهم لماذا جفّت آبارنا.»\n\nتنظر إلى الخريطة أمامك وتفكر. المزارعون قطعوا الأشجار شمال الواحة. هطل مطر أقل. ضخّ الآبار ازداد ثلاثة أضعاف.\n\nما السبب الرئيسي لجفاف الآبار؟",
      concept: "التوازن في دورة الماء",
      hint: "دورة الماء منظومة متكاملة — ما يدخل يجب أن يساوي ما يخرج على المدى البعيد.",
      choices: [
        {
          text: "الضخ الزائد أفرغ الخزان الجوفي أسرع مما تتجدد فيه المياه بالتسرب",
          correct: true,
          feedback: "بالضبط! الخزان الجوفي مثل وعاء يُملأ ببطء ويُفرغ بسرعة. الأشجار أيضاً تساعد على التسرب وتقليل الجريان السطحي.",
          points: 60,
          next: "ending_success",
        },
        {
          text: "الجفاف الجوي منع التبخر فلم تتكون سحب ولم يمطر",
          correct: false,
          feedback: "هذا عامل مساهم، لكن ليس السبب الرئيسي المباشر لجفاف الآبار الموجودة.",
          points: 20,
          next: "ending_partial",
        },
        {
          text: "قطع الأشجار منع التكثف ووقف المطر تماماً",
          correct: false,
          feedback: "الأشجار تؤثر على المناخ المحلي، لكن تأثيرها على آبار الواحة أكثر تعقيداً.",
          points: 15,
          next: "ending_partial",
        },
      ],
    },
    ending_success: {
      id: "ending_success",
      type: "ending",
      scene: "النهاية المجيدة",
      title: "بطل الواحة",
      text: "ينهض الشيخ حمد ويصفق بيديه.\n\n«هذا الفتى فهم ما نسيناه! الماء أمانة — ندخله بالتسرب الطبيعي ونُخرجه باعتدال.»\n\nيُقرر مجلس القرية: إيقاف بعض الآبار، زراعة أشجار جديدة، وحفر أحواض لتجميع مياه الأمطار وتعزيز التسرب.\n\nبعد موسمين — النخيل يعود أخضر والآبار تفيض. **أنت من أنقذ الواحة.**",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=500&fit=crop&auto=format",
      xp: 100,
    },
    ending_partial: {
      id: "ending_partial",
      type: "ending",
      scene: "درس مكتسب",
      title: "على الطريق الصحيح",
      text: "الشيخ حمد يومئ: «قاربت الصواب يا فتى. الإجابة الكاملة تحتاج مراجعة أعمق.»\n\nتعود إلى مكتبة القرية وتقرأ أكثر عن دورة الماء. في الأسبوع التالي، تعود بخطة أفضل لإنقاذ الواحة.\n\nالتعلم رحلة لا تنتهي.",
      image: "https://images.unsplash.com/photo-1456428746267-a1756408f782?w=900&h=500&fit=crop&auto=format",
      xp: 40,
    },
  },
};

// ─── Story 2: Food Chains ───────────────────────────────────────────────────
export const foodChainsStory: Story = {
  id: "food-chains-rub-al-khali",
  title: "مملكة الحياة في الربع الخالي",
  subject: "علم الأحياء — السلاسل الغذائية",
  grade: "الصف السادس الابتدائي",
  region: "الربع الخالي",
  regionIcon: "eagle",
  difficulty: "متوسط",
  duration: "٢٥ دقيقة",
  description: "اكتشف أسرار الحياة في أكبر صحراء رملية في العالم وافهم كيف تتصل الكائنات بعضها ببعض",
  cover: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=450&fit=crop&auto=format",
  mapPosition: { x: 55, y: 68 },
  concepts: ["المنتجون", "المستهلكون", "السلسلة الغذائية", "الشبكة الغذائية", "التوازن البيئي"],
  startNode: "desert_dawn",
  nodes: {
    desert_dawn: {
      id: "desert_dawn",
      type: "narrative",
      scene: "فجر الربع الخالي",
      title: "صحوة الصحراء",
      text: "تستيقظ على صوت نسر يحلق فوق خيمتك في قلب الربع الخالي.\n\nالمرشد البدوي سالم يجلس بجانب النار ويقول: «قبل أن نرحل، أخبرني — هل تعرف لماذا لا تموت هذه الصحراء رغم قسوتها؟»\n\nأنت تنظر حولك. رمال لا نهاية لها، لكنك تُلاحظ نباتات صغيرة هنا وهناك، وآثار حيوانات على الرمال...",
      image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&h=500&fit=crop&auto=format",
      xp: 10,
      next: "producers_question",
    },
    producers_question: {
      id: "producers_question",
      type: "question",
      scene: "واحة صغيرة",
      title: "من يبدأ السلسلة؟",
      text: "تجد واحة صغيرة بها نباتات خضراء شحيحة.\n\nسالم يسألك: «كل الحياة في هذه الصحراء تبدأ من هذه النباتات. لماذا نسمّيها **المنتجين**؟»",
      concept: "المنتجون",
      hint: "فكّر: من يصنع الغذاء من لا شيء؟ النباتات تحتاج شمساً وماءً فقط.",
      choices: [
        {
          text: "لأنها تصنع غذاءها بنفسها من ضوء الشمس والماء وثاني أكسيد الكربون عبر التمثيل الضوئي",
          correct: true,
          feedback: "ممتاز! النباتات هي الوحيدة التي تُنتج طاقة جديدة من مصادر غير حية. كل كائن حي آخر يعتمد عليها مباشرة أو بشكل غير مباشر.",
          points: 35,
          next: "consumers_lesson",
        },
        {
          text: "لأنها تُنتج الأكسجين الذي يتنفسه الجميع",
          correct: false,
          feedback: "الأكسجين ناتج مهم، لكن السبب الحقيقي لتسميتها منتجين هو تصنيع الغذاء من مصادر غير حية.",
          points: 15,
          next: "consumers_lesson",
        },
        {
          text: "لأنها تتكاثر وتنتج بذوراً ونباتات جديدة",
          correct: false,
          feedback: "التكاثر صفة كل الكائنات الحية، لكن المقصود بـ«المنتج» هو إنتاج الغذاء من مواد غير عضوية.",
          points: 10,
          next: "consumers_lesson",
        },
      ],
    },
    consumers_lesson: {
      id: "consumers_lesson",
      type: "narrative",
      scene: "مشاهدة الحيوانات",
      title: "سلسلة الحياة",
      text: "مع المغرب، تتحرك الحياة في الصحراء. تُشاهد:\n\n**عشب الصحراء** تأكله **الجرابيع الصغيرة** التي تصطادها **الثعابين**، وهي بدورها فريسة **النسر الذهبي** المحلّق فوقك.\n\nيقول سالم: «هذا ما نسميه **السلسلة الغذائية** — كل كائن يأكل ما دونه ويُؤكل بما فوقه. وحين يموت الجميع، تعود المواد للتربة لتُغذي العشب من جديد.»",
      image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=900&h=500&fit=crop&auto=format",
      concept: "السلسلة الغذائية",
      xp: 20,
      next: "chain_match",
    },
    chain_match: {
      id: "chain_match",
      type: "match",
      scene: "دفتر المرشد",
      title: "رتّب السلسلة الغذائية",
      text: "وجدتَ في دفتر سالم ملاحظات مبعثرة عن الكائنات الحية. ساعد في تصنيفها بربط كل كائن بدوره في السلسلة الغذائية.",
      concept: "أدوار الكائنات",
      hint: "من الذي يصنع؟ من يأكل النباتات؟ من يأكل الآكلين للنباتات؟",
      xp: 25,
      matchPairs: [
        { term: "عشب الصحراء", definition: "منتِج — يصنع غذاءه بالتمثيل الضوئي" },
        { term: "الجربوع", definition: "مستهلك أول — يأكل النباتات مباشرة" },
        { term: "الثعبان", definition: "مستهلك ثانٍ — يأكل آكلات النبات" },
        { term: "النسر", definition: "مستهلك قمة — يأكل في أعلى السلسلة" },
      ],
      next: "balance_challenge",
    },
    balance_challenge: {
      id: "balance_challenge",
      type: "puzzle",
      scene: "الأزمة البيئية",
      title: "كارثة في الصحراء!",
      text: "في الصباح، تجد سالم قلقاً. يقول:\n\n«الصيادون أمضوا الشهر الماضي يصيدون الثعابين بكثرة. الآن الجرابيع تتكاثر بجنون وتأكل كل العشب. قريباً لن يبقى نبات واحد!»\n\nما الحل الصحيح لإعادة التوازن؟",
      concept: "التوازن البيئي",
      hint: "السلسلة الغذائية كلها متصلة — إزالة حلقة واحدة تُربك الكل.",
      choices: [
        {
          text: "وقف صيد الثعابين فوراً حتى تعود أعدادها وتُعيد السيطرة على الجرابيع",
          correct: true,
          feedback: "صحيح تماماً! الثعابين تُوازن أعداد الجرابيع. بدونها، ينهار النظام البيئي من الأسفل. هذا ما يسميه العلماء «تأثير الكائن المحوري».",
          points: 60,
          next: "ending_hero",
        },
        {
          text: "قتل الجرابيع الزائدة مباشرة لإنقاذ العشب",
          correct: false,
          feedback: "هذا يحل المشكلة مؤقتاً لكنه لا يُصلح السبب الجذري. السلسلة ستظل مكسورة بدون الثعابين.",
          points: 25,
          next: "ending_partial_food",
        },
        {
          text: "زراعة المزيد من العشب ليكفي للجميع",
          correct: false,
          feedback: "زيادة الغذاء ستزيد أعداد الجرابيع أكثر! المشكلة ليست قلة الغذاء بل غياب المفترس.",
          points: 15,
          next: "ending_partial_food",
        },
      ],
    },
    ending_hero: {
      id: "ending_hero",
      type: "ending",
      scene: "الصحراء تتنفس",
      title: "حارس التوازن",
      text: "أقنعت زعماء القبائل بوقف الصيد. بعد ثلاثة أشهر، تعود الثعابين، وتنخفض أعداد الجرابيع، ويعود العشب للنمو.\n\nيقول سالم وهو يضرب كتفك: «أنت فهمت ما يعرفه أجدادنا البدو — كل كائن في الصحراء له دور، وحذف أي واحد يُفسد البقية.»\n\n**الربع الخالي يتنفس من جديد بفضلك.**",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=500&fit=crop&auto=format",
      xp: 100,
    },
    ending_partial_food: {
      id: "ending_partial_food",
      type: "ending",
      scene: "درس الصحراء",
      title: "خطوة على الطريق",
      text: "الحل ساعد قليلاً، لكن المشكلة عادت بعد أشهر. سالم يقول: «الطبيعة أعقد من أن نُدير أجزاءها بشكل منفصل — عليك التفكير في الصورة الكاملة.»\n\nتعود وتقرأ أكثر عن السلاسل الغذائية والتوازن البيئي.",
      image: "https://images.unsplash.com/photo-1456428746267-a1756408f782?w=900&h=500&fit=crop&auto=format",
      xp: 45,
    },
  },
};

export const stories: Story[] = [waterCycleStory, foodChainsStory];

export const subjectPresets: {
  subject: string;
  lesson: string;
  grade: string;
  icon: IconName;
  color: string;
  story: string | null;
  region: string;
  regionIcon: IconName;
  difficulty: "سهل" | "متوسط" | "صعب";
  duration: string;
}[] = [
  {
    subject: "علوم الأرض",
    lesson: "دورة الماء",
    grade: "الصف الخامس",
    icon: "droplet",
    color: "from-blue-900 to-teal-900",
    story: "water-cycle-ahsa",
    region: "واحة الأحساء",
    regionIcon: "palm-tree",
    difficulty: "متوسط",
    duration: "٢٠ دقيقة",
  },
  {
    subject: "علم الأحياء",
    lesson: "السلاسل الغذائية",
    grade: "الصف السادس",
    icon: "eagle",
    color: "from-amber-900 to-orange-900",
    story: "food-chains-rub-al-khali",
    region: "الربع الخالي",
    regionIcon: "dune",
    difficulty: "متوسط",
    duration: "٢٥ دقيقة",
  },
  {
    subject: "الفيزياء",
    lesson: "الضوء والانعكاس",
    grade: "الصف السابع",
    icon: "telescope",
    color: "from-purple-900 to-indigo-900",
    story: null,
    region: "محافظة العُلا",
    regionIcon: "columns",
    difficulty: "صعب",
    duration: "٣٠ دقيقة",
  },
  {
    subject: "الرياضيات",
    lesson: "الكسور والنسب",
    grade: "الصف الرابع",
    icon: "mosque",
    color: "from-emerald-900 to-green-900",
    story: null,
    region: "سوق الدرعية",
    regionIcon: "jar",
    difficulty: "سهل",
    duration: "١٥ دقيقة",
  },
];
