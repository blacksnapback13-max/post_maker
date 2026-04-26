"use strict";

(function () {
  const scriptureLibrary = [
    {
      id: "gen-2-24",
      reference: "Бытие 2:24",
      text: "Оставит человек отца своего и мать свою и прилепится к жене своей; и будут одна плоть.",
      tags: ["брак", "завет", "мужчина", "женщина", "семья", "единство"],
      focus:
        "Бог ведет отношения не к игре чувств, а к зрелому завету, единству и ответственности.",
    },
    {
      id: "mark-10-9",
      reference: "Марка 10:9",
      text: "Итак, что Бог сочетал, того человек да не разлучает.",
      tags: ["брак", "завет", "верность", "семья"],
      focus:
        "Здоровые отношения строятся с уважением к Божьему замыслу, а не только к личным желаниям.",
    },
    {
      id: "ps-126-1",
      reference: "Псалом 126:1",
      text: "Если Господь не созиждет дома, напрасно трудятся строящие его.",
      tags: ["семья", "дом", "основание", "Бог", "брак"],
      focus:
        "Семья держится крепко тогда, когда ее основание не в эмоциях, а в Божьем присутствии.",
    },
    {
      id: "prov-4-23",
      reference: "Притчи 4:23",
      text: "Больше всего хранимого храни сердце твое, потому что из него источники жизни.",
      tags: ["сердце", "мудрость", "границы", "чистота", "до брака"],
      focus:
        "До брака особенно важно хранить сердце, мотивы и границы, чтобы чувства не стали источником раны.",
    },
    {
      id: "1thes-4-3-4",
      reference: "1 Фессалоникийцам 4:3-4",
      text: "Ибо воля Божия есть освящение ваше, чтобы вы воздерживались от блуда; чтобы каждый из вас умел соблюдать свой сосуд в святости и чести.",
      tags: ["чистота", "святость", "до брака", "границы", "отношения"],
      focus:
        "Любовь до брака не отменяет святость; наоборот, настоящая близость умеет уважать честь и пределы.",
    },
    {
      id: "song-8-4",
      reference: "Песнь песней 8:4",
      text: "Не будите и не тревожьте любви, доколе ей угодно.",
      tags: ["время", "любовь", "ожидание", "до брака", "мудрость"],
      focus:
        "Не всякое чувство нужно ускорять; любовь раскрывается красиво, когда ей дают Божье время.",
    },
    {
      id: "amos-3-3",
      reference: "Амос 3:3",
      text: "Пойдут ли двое вместе, не сговорившись между собою?",
      tags: ["согласие", "ценности", "отношения", "выбор", "единство"],
      focus:
        "Отношения становятся крепче, когда люди совпадают не только в симпатии, но и в ценностях, направлении и вере.",
    },
    {
      id: "matt-6-33",
      reference: "Матфея 6:33",
      text: "Ищите же прежде Царства Божия и правды Его, и это все приложится вам.",
      tags: ["Бог", "приоритет", "поиск", "отношения", "мудрость"],
      focus:
        "Когда Бог на первом месте, человек получает ясность и мир даже в самых чувствительных вопросах.",
    },
    {
      id: "prov-3-5-6",
      reference: "Притчи 3:5-6",
      text: "Надейся на Господа всем сердцем твоим и не полагайся на разум твой. Во всех путях твоих познавай Его, и Он направит стези твои.",
      tags: ["доверие", "Бог", "решение", "выбор", "мудрость"],
      focus:
        "В важных отношениях нужна не только логика или эмоции, но и доверие к Божьему водительству.",
    },
    {
      id: "eccl-4-9-10",
      reference: "Екклесиаст 4:9-10",
      text: "Двоим лучше, нежели одному; потому что у них есть доброе вознаграждение в труде их. Ибо если упадет один, то другой поднимет товарища своего.",
      tags: ["поддержка", "дружба", "брак", "единство", "партнерство"],
      focus:
        "Близость раскрывается там, где люди умеют поднимать, поддерживать и идти рядом, а не использовать друг друга.",
    },
    {
      id: "1cor-13-4-7",
      reference: "1 Коринфянам 13:4-7",
      text: "Любовь долготерпит, милосердствует, не ищет своего, не раздражается, все покрывает, всему верит, всего надеется, все переносит.",
      tags: ["любовь", "характер", "терпение", "милость", "брак"],
      focus:
        "Библейская любовь измеряется не словами, а характером: терпением, добротой и готовностью не искать своего.",
    },
    {
      id: "phil-2-3-4",
      reference: "Филиппийцам 2:3-4",
      text: "По смиренномудрию почитайте один другого высшим себя. Не о себе только каждый заботься, но каждый и о других.",
      tags: ["смирение", "уважение", "служение", "отношения", "брак"],
      focus:
        "Отношения вызревают там, где есть уважение, смирение и способность думать не только о себе.",
    },
    {
      id: "james-1-19",
      reference: "Иакова 1:19",
      text: "Всякий человек да будет скор на слышание, медлен на слова, медлен на гнев.",
      tags: ["общение", "конфликт", "мир", "слушание", "мудрость"],
      focus:
        "Теплые отношения сохраняются не громкостью аргументов, а вниманием, терпением и умением слышать.",
    },
    {
      id: "gal-5-22-23",
      reference: "Галатам 5:22-23",
      text: "Плод же духа: любовь, радость, мир, долготерпение, благость, милосердие, вера, кротость, воздержание.",
      tags: ["характер", "плод духа", "любовь", "мир", "воздержание"],
      focus:
        "Зрелые отношения можно узнать по плодам Духа: миру, кротости, верности и внутреннему самообладанию.",
    },
    {
      id: "2tim-2-22",
      reference: "2 Тимофею 2:22",
      text: "Юношеских похотей убегай, а держись правды, веры, любви, мира со всеми призывающими Господа.",
      tags: ["чистота", "молодежь", "воздержание", "праведность", "до брака"],
      focus:
        "Писание учит не заигрывать с соблазном, а сознательно выбирать чистоту, правду и мир.",
    },
    {
      id: "eph-4-2-3",
      reference: "Ефесянам 4:2-3",
      text: "Со всяким смиренномудрием и кротостью и долготерпением, снисходя друг ко другу любовью, стараясь сохранять единство духа в союзе мира.",
      tags: ["единство", "кротость", "мир", "любовь", "брак"],
      focus:
        "Единство не падает с неба само собой; его нужно хранить кротостью, терпением и любовью.",
    },
    {
      id: "col-3-13-14",
      reference: "Колоссянам 3:13-14",
      text: "Снисходя друг ко другу и прощая взаимно. Более же всего облекитесь в любовь, которая есть совокупность совершенства.",
      tags: ["прощение", "любовь", "милость", "брак", "единство"],
      focus:
        "Даже самые близкие люди нуждаются в милости; любовь крепнет там, где люди умеют прощать.",
    },
    {
      id: "rom-12-10",
      reference: "Римлянам 12:10",
      text: "Будьте братолюбивы друг к другу с нежностью; в почтительности друг друга предупреждайте.",
      tags: ["нежность", "уважение", "любовь", "отношения"],
      focus:
        "Нежность и почтительность создают в отношениях пространство безопасности и тепла.",
    },
    {
      id: "1pet-4-8",
      reference: "1 Петра 4:8",
      text: "Более же всего имейте усердную любовь друг ко другу, потому что любовь покрывает множество грехов.",
      tags: ["любовь", "милость", "прощение", "отношения"],
      focus:
        "Любовь не делает человека слепым, но помогает смотреть на другого с милостью, а не с холодным судом.",
    },
    {
      id: "eph-5-25",
      reference: "Ефесянам 5:25",
      text: "Мужья, любите своих жен, как и Христос возлюбил Церковь и предал Себя за нее.",
      tags: ["муж", "жена", "жертвенность", "брак", "любовь"],
      focus:
        "Божий взгляд на любовь включает жертвенность, заботу и готовность служить, а не владеть.",
    },
    {
      id: "prov-19-14",
      reference: "Притчи 19:14",
      text: "Дом и имение - наследство от родителей, а разумная жена - от Господа.",
      tags: ["брак", "выбор", "мудрость", "жена", "семья"],
      focus:
        "В вопросе брака особенно важно видеть не только внешнее, но и Божий дар мудрого человека рядом.",
    },
  ];

  const scriptureTranslations = {
    "gen-2-24": {
      uk: {
        reference: "Буття 2:24",
        text: "Покине чоловік батька свого та матір свою, і пристане до дружини своєї, і будуть вони одним тілом.",
      },
      pl: {
        reference: "Rodzaju 2:24",
        text: "Dlatego opuści człowiek ojca swego i matkę swoją, a połączy się z żoną swoją, i będą jednym ciałem.",
      },
    },
    "mark-10-9": {
      uk: {
        reference: "Марка 10:9",
        text: "Отже, що Бог спарував, того людина нехай не розлучає.",
      },
      pl: {
        reference: "Marka 10:9",
        text: "Co więc Bóg złączył, człowiek niech nie rozdziela.",
      },
    },
    "ps-126-1": {
      uk: {
        reference: "Псалом 126:1",
        text: "Якщо Господь не збудує дому, даремно працюють ті, що його будують.",
      },
      pl: {
        reference: "Psalm 126:1",
        text: "Jeśli Pan domu nie zbuduje, na próżno trudzą się ci, którzy go budują.",
      },
    },
    "prov-4-23": {
      uk: {
        reference: "Приповісті 4:23",
        text: "Над усе, що лише стережеться, серце своє стережи, бо з нього походить життя.",
      },
      pl: {
        reference: "Przysłów 4:23",
        text: "Czujniej niż wszystkiego innego strzeż swego serca, bo z niego tryska życie.",
      },
    },
    "1thes-4-3-4": {
      uk: {
        reference: "1 Солунян 4:3-4",
        text: "Бо така воля Божа: освячення ваше, щоб ви утримувалися від розпусти; щоб кожен із вас умів тримати свою посудину у святості та честі.",
      },
      pl: {
        reference: "1 Tesaloniczan 4:3-4",
        text: "Taka jest bowiem wola Boża: wasze uświęcenie, abyście powstrzymywali się od nierządu; aby każdy z was umiał utrzymać swoje ciało w świętości i czci.",
      },
    },
    "song-8-4": {
      uk: {
        reference: "Пісня над піснями 8:4",
        text: "Не будіть і не тривожте любові, доки їй не буде завгодно.",
      },
      pl: {
        reference: "Pieśń nad Pieśniami 8:4",
        text: "Nie budźcie ani nie rozniecajcie miłości, dopóki sama tego nie zapragnie.",
      },
    },
    "amos-3-3": {
      uk: {
        reference: "Амоса 3:3",
        text: "Чи підуть двоє разом, якщо не домовилися між собою?",
      },
      pl: {
        reference: "Amosa 3:3",
        text: "Czy pójdą razem dwaj, jeśli się wcześniej nie umówili?",
      },
    },
    "matt-6-33": {
      uk: {
        reference: "Матвія 6:33",
        text: "Шукайте ж найперше Царства Божого та правди Його, а все це вам додасться.",
      },
      pl: {
        reference: "Mateusza 6:33",
        text: "Szukajcie najpierw Królestwa Bożego i jego sprawiedliwości, a to wszystko będzie wam dodane.",
      },
    },
    "prov-3-5-6": {
      uk: {
        reference: "Приповісті 3:5-6",
        text: "Покладайся на Господа всім серцем своїм і не покладайся на власний розум. На всіх дорогах своїх пізнавай Його, і Він вирівняє твої стежки.",
      },
      pl: {
        reference: "Przysłów 3:5-6",
        text: "Zaufaj Panu z całego swego serca i nie polegaj na własnym rozumie. Pamiętaj o Nim na wszystkich swoich drogach, a On prostować będzie twoje ścieżki.",
      },
    },
    "eccl-4-9-10": {
      uk: {
        reference: "Еклезіяста 4:9-10",
        text: "Двом ліпше, ніж одному, бо вони мають добру нагороду за свою працю. Бо коли впаде один, то другий підведе товариша свого.",
      },
      pl: {
        reference: "Kaznodziei Salomona 4:9-10",
        text: "Lepiej dwom niż jednemu, bo mają dobrą zapłatę za swój trud. Bo jeśli jeden upadnie, drugi podniesie swego towarzysza.",
      },
    },
    "1cor-13-4-7": {
      uk: {
        reference: "1 Коринтян 13:4-7",
        text: "Любов довготерпить, милосердствує, не шукає свого, не дратується, усе зносить, у все вірить, усього сподівається, усе терпить.",
      },
      pl: {
        reference: "1 Koryntian 13:4-7",
        text: "Miłość jest cierpliwa, miłość jest łaskawa, nie szuka swego, nie unosi się gniewem, wszystko znosi, wszystkiemu wierzy, wszystkiego się spodziewa, wszystko przetrzyma.",
      },
    },
    "phil-2-3-4": {
      uk: {
        reference: "Филип'ян 2:3-4",
        text: "У покорі вважайте один одного вищим за себе. Нехай кожен дбає не тільки про себе, але й про інших.",
      },
      pl: {
        reference: "Filipian 2:3-4",
        text: "W pokorze uważajcie jedni drugich za wyższych od siebie. Niech każdy troszczy się nie tylko o siebie, ale i o innych.",
      },
    },
    "james-1-19": {
      uk: {
        reference: "Якова 1:19",
        text: "Кожна людина нехай буде скорою на слухання, повільною на слова, повільною на гнів.",
      },
      pl: {
        reference: "Jakuba 1:19",
        text: "Niech każdy człowiek będzie skory do słuchania, nieskory do mówienia, nieskory do gniewu.",
      },
    },
    "gal-5-22-23": {
      uk: {
        reference: "Галатів 5:22-23",
        text: "Плід же Духа: любов, радість, мир, довготерпіння, доброта, милосердя, віра, лагідність, стриманість.",
      },
      pl: {
        reference: "Galacjan 5:22-23",
        text: "Owocem zaś Ducha jest: miłość, radość, pokój, cierpliwość, dobroć, miłosierdzie, wiara, łagodność, powściągliwość.",
      },
    },
    "2tim-2-22": {
      uk: {
        reference: "2 Тимофія 2:22",
        text: "Утікай від юнацьких пожадливостей, а тримайся правди, віри, любові та миру з усіма, хто кличе Господа.",
      },
      pl: {
        reference: "2 Tymoteusza 2:22",
        text: "Uciekaj od młodzieńczych pożądliwości, a zabiegaj o sprawiedliwość, wiarę, miłość i pokój ze wszystkimi, którzy wzywają Pana.",
      },
    },
    "eph-4-2-3": {
      uk: {
        reference: "Ефесян 4:2-3",
        text: "З усякою покорою та лагідністю, з довготерпінням, терплячи один одного в любові, стараючись берегти єдність духа в союзі миру.",
      },
      pl: {
        reference: "Efezjan 4:2-3",
        text: "Z wszelką pokorą i łagodnością, z cierpliwością, znosząc jedni drugich w miłości, starając się zachować jedność Ducha w więzi pokoju.",
      },
    },
    "col-3-13-14": {
      uk: {
        reference: "Колосян 3:13-14",
        text: "Терпіть один одного та прощайте взаємно. А понад усе зодягніться в любов, яка є сукупністю досконалості.",
      },
      pl: {
        reference: "Kolosan 3:13-14",
        text: "Znosząc jedni drugich i przebaczając sobie nawzajem. A nade wszystko przyobleczcie się w miłość, która jest więzią doskonałości.",
      },
    },
    "rom-12-10": {
      uk: {
        reference: "Римлян 12:10",
        text: "Будьте братолюбні один до одного з ніжністю; випереджайте один одного в пошані.",
      },
      pl: {
        reference: "Rzymian 12:10",
        text: "Miłujcie się wzajemnie serdecznie; w okazywaniu szacunku jedni drugich wyprzedzajcie.",
      },
    },
    "1pet-4-8": {
      uk: {
        reference: "1 Петра 4:8",
        text: "Найперше майте щиру любов один до одного, бо любов покриває багато гріхів.",
      },
      pl: {
        reference: "1 Piotra 4:8",
        text: "Przede wszystkim miejcie gorliwą miłość jedni ku drugim, bo miłość zakrywa wiele grzechów.",
      },
    },
    "eph-5-25": {
      uk: {
        reference: "Ефесян 5:25",
        text: "Чоловіки, любіть своїх дружин, як і Христос полюбив Церкву та віддав Себе за неї.",
      },
      pl: {
        reference: "Efezjan 5:25",
        text: "Mężowie, miłujcie swoje żony, jak i Chrystus umiłował Kościół i wydał za niego samego siebie.",
      },
    },
    "prov-19-14": {
      uk: {
        reference: "Приповісті 19:14",
        text: "Дім і майно - спадщина від батьків, а розумна дружина - від Господа.",
      },
      pl: {
        reference: "Przysłów 19:14",
        text: "Dom i majątek są dziedzictwem po rodzicach, lecz roztropna żona jest od Pana.",
      },
    },
  };

  const turkishScriptureTranslations = {
    "gen-2-24": {
      reference: "Yaratılış 2:24",
      text: "Bu nedenle adam annesini babasını bırakıp karısına bağlanacak, ikisi tek beden olacak.",
    },
    "mark-10-9": {
      reference: "Markos 10:9",
      text: "O halde Tanrı'nın birleştirdiğini insan ayırmasın.",
    },
    "ps-126-1": {
      reference: "Mezmurlar 127:1",
      text: "Evi RAB yapmazsa, yapıcılar boşuna çalışır.",
    },
    "prov-4-23": {
      reference: "Süleyman'ın Özdeyişleri 4:23",
      text: "Her şeyden önce yüreğini koru, çünkü yaşam ondan kaynaklanır.",
    },
    "1thes-4-3-4": {
      reference: "1 Selanikliler 4:3-4",
      text: "Tanrı'nın isteği şudur: kutsal olmanız, fuhuştan kaçınmanız; her biriniz bedenini kutsallık ve saygınlık içinde denetlemeyi bilsin.",
    },
    "song-8-4": {
      reference: "Ezgiler Ezgisi 8:4",
      text: "Sevgiyi zamanı gelmeden uyandırmayın, harekete geçirmeyin.",
    },
    "amos-3-3": {
      reference: "Amos 3:3",
      text: "İki kişi anlaşmadan birlikte yürür mü?",
    },
    "matt-6-33": {
      reference: "Matta 6:33",
      text: "Siz önce Tanrı'nın Egemenliği'nin ve doğruluğunun ardından gidin; o zaman size bütün bunlar da verilecektir.",
    },
    "prov-3-5-6": {
      reference: "Süleyman'ın Özdeyişleri 3:5-6",
      text: "RAB'be bütün yüreğinle güven, kendi aklına bel bağlama. Her yolunda O'nu an, O da senin yollarını düze çıkarır.",
    },
    "eccl-4-9-10": {
      reference: "Vaiz 4:9-10",
      text: "İki kişi bir kişiden iyidir, çünkü emeklerine iyi karşılık alırlar. Biri düşerse, öbürü arkadaşını kaldırır.",
    },
    "1cor-13-4-7": {
      reference: "1 Korintliler 13:4-7",
      text: "Sevgi sabırlıdır, sevgi şefkatlidir; kendi çıkarını aramaz, kolayca öfkelenmez, her şeye katlanır, her şeye inanır, her şeyi umut eder, her şeye dayanır.",
    },
    "phil-2-3-4": {
      reference: "Filipililer 2:3-4",
      text: "Hiçbir şeyi bencil tutkularla ya da boş övünmeyle yapmayın; alçakgönüllülükle başkalarını kendinizden üstün sayın. Yalnız kendi yararınızı değil, başkalarının yararını da gözetin.",
    },
    "james-1-19": {
      reference: "Yakup 1:19",
      text: "Herkes dinlemekte çabuk, konuşmakta yavaş, öfkelenmekte yavaş olsun.",
    },
    "gal-5-22-23": {
      reference: "Galatyalılar 5:22-23",
      text: "Ruh'un meyvesi sevgi, sevinç, esenlik, sabır, şefkat, iyilik, bağlılık, yumuşak huyluluk ve özdenetimdir.",
    },
    "2tim-2-22": {
      reference: "2 Timoteos 2:22",
      text: "Gençlik tutkularından kaç; temiz yürekle Rab'be yakaranlarla birlikte doğruluk, iman, sevgi ve esenliğin ardından git.",
    },
    "eph-4-2-3": {
      reference: "Efesliler 4:2-3",
      text: "Her bakımdan alçakgönüllü, yumuşak huylu ve sabırlı olun. Birbirinize sevgiyle katlanın. Ruh'un birliğini esenlik bağıyla korumaya gayret edin.",
    },
    "col-3-13-14": {
      reference: "Koloseliler 3:13-14",
      text: "Birbirinize katlanın ve birbirinizi bağışlayın. Bunların hepsinin üzerine sevgiyi giyinin; sevgi yetkin birliğin bağıdır.",
    },
    "rom-12-10": {
      reference: "Romalılar 12:10",
      text: "Birbirinizi kardeşlik sevgisiyle sevin. Birbirinize saygı göstermekte yarışın.",
    },
    "1pet-4-8": {
      reference: "1 Petrus 4:8",
      text: "Her şeyden önce birbirinizi candan sevin, çünkü sevgi birçok günahı örter.",
    },
    "eph-5-25": {
      reference: "Efesliler 5:25",
      text: "Ey kocalar, Mesih'in kiliseyi sevip onun uğruna kendini feda ettiği gibi siz de karılarınızı sevin.",
    },
    "prov-19-14": {
      reference: "Süleyman'ın Özdeyişleri 19:14",
      text: "Ev ve servet babalardan mirastır; sağduyulu eş RAB'dendir.",
    },
  };

  Object.keys(turkishScriptureTranslations).forEach(function (id) {
    scriptureTranslations[id] = Object.assign({}, scriptureTranslations[id], {
      tr: turkishScriptureTranslations[id],
    });
  });

  const tagTranslations = {
    uk: {
      брак: "шлюб",
      завет: "завіт",
      мужчина: "чоловік",
      женщина: "жінка",
      семья: "сім'я",
      единство: "єдність",
      верность: "вірність",
      дом: "дім",
      основание: "основа",
      Бог: "Бог",
      сердце: "серце",
      мудрость: "мудрість",
      границы: "межі",
      чистота: "чистота",
      "до брака": "до шлюбу",
      святость: "святість",
      отношения: "стосунки",
      время: "час",
      любовь: "любов",
      ожидание: "очікування",
      согласие: "згода",
      ценности: "цінності",
      выбор: "вибір",
      приоритет: "пріоритет",
      поиск: "пошук",
      доверие: "довіра",
      решение: "рішення",
      поддержка: "підтримка",
      дружба: "дружба",
      партнерство: "партнерство",
      характер: "характер",
      терпение: "терпіння",
      милость: "милість",
      смирение: "смирення",
      уважение: "повага",
      служение: "служіння",
      общение: "спілкування",
      конфликт: "конфлікт",
      мир: "мир",
      слушание: "слухання",
      "плод духа": "плід Духа",
      воздержание: "стриманість",
      молодежь: "молодь",
      праведность: "праведність",
      кротость: "лагідність",
      прощение: "прощення",
      нежность: "ніжність",
      муж: "чоловік",
      жена: "дружина",
      жертвенность: "жертовність",
    },
    pl: {
      брак: "małżeństwo",
      завет: "przymierze",
      мужчина: "mężczyzna",
      женщина: "kobieta",
      семья: "rodzina",
      единство: "jedność",
      верность: "wierność",
      дом: "dom",
      основание: "fundament",
      Бог: "Bóg",
      сердце: "serce",
      мудрость: "mądrość",
      границы: "granice",
      чистота: "czystość",
      "до брака": "przed ślubem",
      святость: "świętość",
      отношения: "relacje",
      время: "czas",
      любовь: "miłość",
      ожидание: "oczekiwanie",
      согласие: "zgoda",
      ценности: "wartości",
      выбор: "wybór",
      приоритет: "priorytet",
      поиск: "szukanie",
      доверие: "zaufanie",
      решение: "decyzja",
      поддержка: "wsparcie",
      дружба: "przyjaźń",
      партнерство: "partnerstwo",
      характер: "charakter",
      терпение: "cierpliwość",
      милость: "miłosierdzie",
      смирение: "pokora",
      уважение: "szacunek",
      служение: "służba",
      общение: "komunikacja",
      конфликт: "konflikt",
      мир: "pokój",
      слушание: "słuchanie",
      "плод духа": "owoc Ducha",
      воздержание: "powściągliwość",
      молодежь: "młodość",
      праведность: "sprawiedliwość",
      кротость: "łagodność",
      прощение: "przebaczenie",
      нежность: "czułość",
      муж: "mąż",
      жена: "żona",
      жертвенность: "ofiarność",
    },
  };

  tagTranslations.tr = {
    брак: "evlilik",
    завет: "antlaşma",
    мужчина: "erkek",
    женщина: "kadın",
    семья: "aile",
    единство: "birlik",
    верность: "sadakat",
    дом: "ev",
    основание: "temel",
    Бог: "Tanrı",
    сердце: "yürek",
    мудрость: "bilgelik",
    границы: "sınırlar",
    чистота: "paklık",
    "до брака": "evlilikten önce",
    святость: "kutsallık",
    отношения: "ilişkiler",
    время: "zaman",
    любовь: "sevgi",
    ожидание: "bekleyiş",
    согласие: "uyum",
    ценности: "değerler",
    выбор: "seçim",
    приоритет: "öncelik",
    поиск: "arayış",
    доверие: "güven",
    решение: "karar",
    поддержка: "destek",
    дружба: "dostluk",
    партнерство: "ortaklık",
    характер: "karakter",
    терпение: "sabır",
    милость: "merhamet",
    смирение: "alçakgönüllülük",
    уважение: "saygı",
    служение: "hizmet",
    общение: "iletişim",
    конфликт: "çatışma",
    мир: "esenlik",
    слушание: "dinleme",
    "плод духа": "Ruh'un meyvesi",
    воздержание: "özdenetim",
    молодежь: "gençlik",
    праведность: "doğruluk",
    кротость: "yumuşak huyluluk",
    прощение: "bağışlama",
    нежность: "şefkat",
    муж: "koca",
    жена: "eş",
    жертвенность: "fedakarlık",
  };

  const categoryRules = [
    {
      category: "до брака",
      keywords: [
        "до брака",
        "до шлюбу",
        "przed ślub",
        "przedmalżeń",
        "evlilikten önce",
        "свидан",
        "отношен",
        "стосунк",
        "ilişk",
        "relacj",
        "związk",
        "женщин",
        "мужчин",
        "жінк",
        "чолов",
        "kadın",
        "erkek",
        "kobiet",
        "mężczyzn",
        "пар",
        "пара",
        "çift",
        "роман",
        "близост",
        "yakın",
        "встреч",
      ],
    },
    {
      category: "брак",
      keywords: [
        "брак",
        "шлюб",
        "małżeń",
        "evlilik",
        "муж",
        "жена",
        "чоловік",
        "дружин",
        "koca",
        "eş",
        "mąż",
        "żona",
        "семь",
        "семья",
        "родин",
        "aile",
        "rodzin",
        "венч",
        "супруг",
      ],
    },
    {
      category: "чистота",
      keywords: [
        "чистот",
        "czysto",
        "paklık",
        "temizlik",
        "целомудр",
        "грех",
        "гріх",
        "günah",
        "grzech",
        "соблаз",
        "спокус",
        "ayart",
        "pokus",
        "страст",
        "похот",
        "tutku",
        "границ",
        "межі",
        "sınır",
        "granic",
        "святост",
        "святість",
        "kutsal",
        "święto",
      ],
    },
    {
      category: "любовь",
      keywords: ["любов", "кохан", "sevgi", "miło", "нежност", "şefkat", "сердц", "серц", "yürek", "serc", "забот", "турбот", "romant"],
    },
    {
      category: "общение",
      keywords: ["ссор", "конфликт", "конфлікт", "çatış", "konflikt", "разговор", "розмов", "konuş", "rozmow", "слуш", "слух", "dinle", "słuch", "пониман", "anla", "rozum", "общен", "спілку", "iletişim", "komunik"],
    },
    {
      category: "доверие",
      keywords: ["довер", "довір", "güven", "zauf", "выбор", "seçim", "wybor", "wybór", "решен", "рішен", "karar", "decyz", "страх", "korku", "неувер", "belirsiz", "ожидан", "bekley", "oczekiw", "воля бож", "воля божа", "tanrı'nın isteği", "tanrının isteği", "wola boża"],
    },
    {
      category: "прощение",
      keywords: ["прощ", "пробач", "bağış", "affet", "przebacz", "обид", "образ", "incin", "uraż", "ран", "zran", "восстанов", "віднов", "onar", "odnow", "милост", "merhamet", "łaska"],
    },
    {
      category: "единство",
      keywords: ["един", "єдн", "birlik", "uyum", "jedn", "соглас", "zgod", "ценност", "цінност", "değer", "wartoś", "совмест", "спільн", "ortak", "wspóln", "партнер", "partner"],
    },
    {
      category: "тревога",
      keywords: ["тревог", "тривог", "kaygı", "endiş", "lęk", "lek", "страх", "korku", "anx", "беспокой", "неспок", "huzursuz", "непевн", "неувер", "belirsiz", "future", "майбут", "будущ", "gelecek"],
    },
    {
      category: "одиночество",
      keywords: ["одиноч", "самотн", "yalnız", "samotn", "изоляц", "ізоляц", "izol", "isolac", "покинут", "залишен", "terk", "opuszcz"],
    },
    {
      category: "финансы",
      keywords: ["деньг", "грош", "para", "pien", "финанс", "finans", "економ", "эконом", "ekonomi", "інфляц", "inflac", "fiyat", "цен", "кошти", "оплат", "рахунк", "fatura", "bills"],
    },
    {
      category: "цифровой шум",
      keywords: ["соцсет", "соцмер", "sosyal medya", "social", "instagram", "tiktok", "лайк", "beğeni", "like", "цифров", "dijital", "digital", "інформац", "информац", "bilgi", "шум", "akış", "feed"],
    },
    {
      category: "выгорание",
      keywords: ["выгор", "вигор", "tüken", "burnout", "втом", "устал", "yorgun", "bitkin", "zmęcz", "przeciąż", "перегруз", "aşırı yük", "перевтом"],
    },
  ];

  const categoryBridgeTags = {
    "до брака": ["до брака", "чистота", "границы", "святость", "воздержание", "отношения", "время"],
    брак: ["брак", "семья", "муж", "жена", "завет", "единство", "жертвенность"],
    чистота: ["чистота", "святость", "границы", "воздержание", "сердце", "мудрость"],
    любовь: ["любовь", "нежность", "уважение", "служение", "милость", "терпение"],
    общение: ["общение", "слушание", "мир", "конфликт", "кротость", "уважение"],
    доверие: ["доверие", "Бог", "выбор", "решение", "мудрость", "приоритет"],
    прощение: ["прощение", "милость", "любовь", "мир", "смирение"],
    единство: ["единство", "согласие", "ценности", "партнерство", "дружба", "мир"],
    тревога: ["доверие", "Бог", "мир", "мудрость", "приоритет"],
    одиночество: ["поддержка", "дружба", "единство", "любовь", "нежность"],
    финансы: ["дом", "Бог", "доверие", "мудрость", "основание", "семья"],
    "цифровой шум": ["сердце", "границы", "мудрость", "приоритет", "молодежь", "воздержание"],
    выгорание: ["мир", "Бог", "поддержка", "дружба", "доверие"],
  };

  const insightBank = {
    "до брака": [
      "До брака особенно важно не торопить близость, а строить уважение, ясность и доверие.",
      "Настоящая симпатия не боится границ, потому что границы сохраняют достоинство обоих.",
      "То, что рождается в честности и молитве, обычно оказывается крепче того, что выросло из спешки.",
    ],
    брак: [
      "Брак в Писании показан не как красивый эпизод, а как завет, в котором есть верность и ежедневная ответственность.",
      "Если отношения готовят человека к браку, в них уже сейчас должны быть уважение, зрелость и способность служить.",
      "Дом строится надежно там, где оба человека ищут не победы друг над другом, а Божьего мира между собой.",
    ],
    чистота: [
      "Чистота нужна не для внешней религиозности, а для свободы сердца и ясной совести перед Богом.",
      "Границы не обедняют любовь, а помогают ей не превращаться в давление и зависимость.",
      "Святость делает чувства чище, а решения спокойнее и глубже.",
    ],
    любовь: [
      "Библейская любовь заметна в том, как человек говорит, слушает, ждет и бережет другого.",
      "Любовь становится зрелой, когда перестает искать только своего удобства.",
      "Нежность и почтительность часто говорят о любви громче, чем сильные обещания.",
    ],
    общение: [
      "Честный и мягкий разговор часто спасает отношения лучше, чем попытка выиграть спор.",
      "Там, где люди умеют слушать, появляется место для мира и восстановления.",
      "Иногда духовная зрелость проявляется просто в том, чтобы говорить тише и слышать внимательнее.",
    ],
    доверие: [
      "Когда путь вперед не до конца ясен, лучше искать Божьего направления, чем поддаваться тревоге.",
      "Мудрые решения в отношениях рождаются там, где человек не живет только чувствами момента.",
      "Божий мир часто приходит тогда, когда сердце перестает все контролировать и учится доверять.",
    ],
    прощение: [
      "Прощение не отменяет правду, но снимает из сердца яд обиды и открывает путь к исцелению.",
      "Без милости даже близкие люди быстро устают друг от друга, а с милостью учатся расти вместе.",
      "Любовь умеет не только радоваться, но и покрывать, восстанавливать и поднимать.",
    ],
    единство: [
      "Единство начинается не с одинаковых вкусов, а с общего направления сердца.",
      "Когда люди совпадают в ценностях и в поиске Бога, отношения получают глубину и устойчивость.",
      "Согласие в главном помогает проходить даже разные сезоны без внутреннего разрыва.",
    ],
    default: [
      "Бог смотрит на отношения глубже привычных формулировок и ведет человека к зрелости сердца.",
      "Даже короткое место Писания способно дать точное направление там, где эмоции дают слишком много шума.",
      "Когда слово Божье становится фильтром для темы, появляется мир, ясность и трезвость.",
    ],
  };

  const posterScenes = ["sea", "forest", "mountains", "meadow", "sunrise"];

  const sampleTopicsByLanguage = {
    ru: [
      "связь между женщиной и мужчиной до брака",
      "как хранить чистоту в отношениях",
      "как строить брак на Божьем основании",
      "когда в отношениях много обид и недопонимания",
      "как понять, что человек подходит для брака",
      "любовь как служение, а не только чувства",
    ],
    uk: [
      "стосунки між жінкою і чоловіком до шлюбу",
      "як берегти чистоту у стосунках",
      "як будувати шлюб на Божій основі",
      "коли у стосунках багато образ і непорозуміння",
      "як зрозуміти, що людина готова до шлюбу",
      "любов як служіння, а не лише почуття",
    ],
    pl: [
      "relacja między kobietą a mężczyzną przed ślubem",
      "jak zachować czystość w relacji",
      "jak budować małżeństwo na Bożym fundamencie",
      "co robić, gdy w relacji jest dużo zranień i nieporozumień",
      "jak rozpoznać, czy ta osoba nadaje się do małżeństwa",
      "miłość jako służba, a nie tylko emocje",
    ],
  };

  const currentConcernTopicsByLanguage = {
    ru: [
      "как сохранять мир сердца, когда тревожат новости и будущее",
      "что говорит Библия о стрессе, который не отпускает",
      "как не выгореть, когда усталость стала образом жизни",
      "как проходить сезон одиночества без ожесточения",
      "как строить глубокие отношения в эпоху поверхностного общения",
      "что делать, когда соцсети усиливают сравнение и зависть",
      "как сохранить чистое сердце в цифровом мире соблазнов",
      "как христианину относиться к тревоге за деньги и будущее семьи",
      "как доверять Богу, когда цены растут, а уверенности меньше",
      "что делать, когда работа забирает смысл и силы",
      "как искать Божью волю, когда пугают перемены и неопределенность",
      "как жить с надеждой, когда вокруг слишком много плохих новостей",
      "как строить брак, когда общество не верит в верность",
      "как говорить правду с любовью в культуре агрессии и поляризации",
      "что говорит Библия о внутренней пустоте при внешней занятости",
      "как не потерять сострадание, когда сердце устало от чужой боли",
      "как родителям сохранять мир в семье в цифровую эпоху",
      "как молодежи хранить разум и сердце среди информационного шума",
      "как проходить страх за здоровье без паники",
      "как сохранять доверие, когда мир полон фейков и манипуляции",
      "как жить верой, когда технологии меняют привычную жизнь",
      "как не строить свою ценность на лайках и чужом одобрении",
      "как учиться тишине и молитве, когда ум постоянно перегружен",
      "что делать, когда отношения ранят сильнее, чем ожидалось",
      "как пережить финансовое давление в семье без взаимных обвинений",
      "как не потерять надежду, когда кажется, что будущее туманно",
    ],
    uk: [
      "як зберігати мир у серці, коли тривожать новини і майбутнє",
      "що говорить Біблія про стрес, який не відпускає",
      "як не вигоріти, коли втома стала способом життя",
      "як проходити сезон самотності без озлоблення",
      "як будувати глибокі стосунки в епоху поверхневого спілкування",
      "що робити, коли соцмережі посилюють порівняння і заздрість",
      "як зберегти чисте серце у цифровому світі спокус",
      "як християнину ставитися до тривоги за гроші і майбутнє сім'ї",
      "як довіряти Богові, коли ціни зростають, а впевненості менше",
      "що робити, коли робота забирає сенс і сили",
      "як шукати Божу волю, коли лякають зміни й невизначеність",
      "як жити з надією, коли навколо надто багато поганих новин",
      "як будувати шлюб, коли суспільство не вірить у вірність",
      "як говорити правду з любов'ю в культурі агресії та поляризації",
      "що говорить Біблія про внутрішню порожнечу при зовнішній зайнятості",
      "як не втратити співчуття, коли серце втомилося від чужого болю",
      "як батькам зберігати мир у сім'ї в цифрову епоху",
      "як молоді берегти розум і серце серед інформаційного шуму",
      "як проходити страх за здоров'я без паніки",
      "як зберігати довіру, коли світ повний фейків і маніпуляцій",
      "як жити вірою, коли технології змінюють звичне життя",
      "як не будувати власну цінність на лайках і чужому схваленні",
      "як вчитися тиші й молитві, коли розум постійно перевантажений",
      "що робити, коли стосунки ранять сильніше, ніж очікувалося",
      "як пережити фінансовий тиск у сім'ї без взаємних звинувачень",
      "як не втратити надію, коли майбутнє здається туманним",
    ],
    pl: [
      "jak zachować pokój serca, gdy niepokoją wiadomości i przyszłość",
      "co Biblia mówi o stresie, który nie odpuszcza",
      "jak nie wypalić się, gdy zmęczenie stało się stylem życia",
      "jak przejść przez czas samotności bez zgorzknienia",
      "jak budować głębokie relacje w epoce powierzchownej komunikacji",
      "co robić, gdy media społecznościowe wzmacniają porównywanie się i zazdrość",
      "jak zachować czyste serce w cyfrowym świecie pokus",
      "jak chrześcijanin ma podchodzić do lęku o pieniądze i przyszłość rodziny",
      "jak ufać Bogu, gdy ceny rosną, a pewności jest mniej",
      "co robić, gdy praca odbiera sens i siły",
      "jak szukać Bożej woli, gdy przerażają zmiany i niepewność",
      "jak żyć nadzieją, gdy wokół jest zbyt wiele złych wiadomości",
      "jak budować małżeństwo, gdy społeczeństwo nie wierzy już w wierność",
      "jak mówić prawdę z miłością w kulturze agresji i polaryzacji",
      "co Biblia mówi o wewnętrznej pustce przy zewnętrznym zabieganiu",
      "jak nie stracić współczucia, gdy serce zmęczyło się cudzym bólem",
      "jak rodzice mogą zachować pokój w rodzinie w cyfrowej epoce",
      "jak młodzi mają strzec umysłu i serca pośród informacyjnego szumu",
      "jak przejść przez lęk o zdrowie bez paniki",
      "jak zachować zaufanie, gdy świat pełen jest manipulacji i fałszu",
      "jak żyć wiarą, gdy technologia zmienia codzienne życie",
      "jak nie budować swojej wartości na lajkach i cudzej aprobacie",
      "jak uczyć się ciszy i modlitwy, gdy umysł jest stale przeciążony",
      "co robić, gdy relacje ranią mocniej, niż się spodziewaliśmy",
      "jak przejść przez finansową presję w rodzinie bez wzajemnych oskarżeń",
      "jak nie stracić nadziei, gdy przyszłość wydaje się zamglona",
    ],
  };

  sampleTopicsByLanguage.tr = [
    "evlilikten önce kadın ve erkek arasındaki ilişki",
    "ilişkilerde paklığı nasıl korumalı",
    "evliliği Tanrı'nın temeli üzerine nasıl kurmalı",
    "ilişkide çok kırgınlık ve yanlış anlaşılma olduğunda ne yapmalı",
    "bir kişinin evliliğe hazır olup olmadığını nasıl anlamalı",
    "sevgi yalnızca duygu değil, hizmet olarak nasıl yaşanır",
  ];

  currentConcernTopicsByLanguage.tr = [
    "haberler ve gelecek kaygılandırırken yüreğin esenliğini nasıl korumalı",
    "Kutsal Kitap bırakmayan stres hakkında ne söyler",
    "yorgunluk yaşam tarzına dönüştüğünde tükenmemek için ne yapmalı",
    "yalnızlık döneminden acılaşmadan nasıl geçilir",
    "yüzeysel iletişim çağında derin ilişkiler nasıl kurulur",
    "sosyal medya kıyaslamayı ve kıskançlığı artırdığında ne yapmalı",
    "dijital ayartılar dünyasında temiz yürek nasıl korunur",
    "bir Hristiyan para ve ailenin geleceği konusundaki kaygıya nasıl yaklaşmalı",
    "fiyatlar artarken ve güven azalırken Tanrı'ya nasıl güvenilir",
    "iş anlamı ve gücü tükettiğinde ne yapmalı",
    "değişim ve belirsizlik korkutuyorsa Tanrı'nın isteği nasıl aranır",
    "etrafta çok kötü haber varken umutla nasıl yaşanır",
    "toplum sadakate inanmazken evlilik nasıl inşa edilir",
    "agresyon ve kutuplaşma kültüründe gerçeği sevgiyle nasıl söylemeli",
    "dışarıda yoğunluk varken iç boşluk hakkında Kutsal Kitap ne söyler",
    "yürek başkalarının acısından yorulduğunda merhamet nasıl kaybedilmez",
    "ebeveynler dijital çağda ailede esenliği nasıl korur",
    "gençler bilgi gürültüsü içinde zihin ve yüreği nasıl korur",
    "sağlık korkusundan panik yapmadan nasıl geçilir",
    "dünya sahte haber ve manipülasyonla doluyken güven nasıl korunur",
    "teknoloji gündelik hayatı değiştirirken imanla nasıl yaşanır",
    "kendi değerini beğeniler ve başkalarının onayı üzerine kurmamak",
    "zihin sürekli aşırı yüklüyken sessizlik ve duaya nasıl öğrenilir",
    "ilişkiler beklenenden daha çok yaraladığında ne yapmalı",
    "ailede finansal baskı karşılıklı suçlama olmadan nasıl aşılır",
    "gelecek sisli göründüğünde umut nasıl kaybedilmez",
  ];

  const TOPIC_ROTATION_STORAGE_KEY = "post-maker-topic-rotation-v2026-04-26";
  const TOPIC_DECK_SIZE = 1000;
  const topicTranslationCatalog = buildTopicTranslationCatalog();

  const languageOptions = [
    { id: "ru", nativeLabel: "Русский" },
    { id: "uk", nativeLabel: "Українська" },
    { id: "pl", nativeLabel: "Polski" },
    { id: "tr", nativeLabel: "Türkçe" },
  ];

  const scriptureMatchOptions = [
    { id: "explicit" },
    { id: "implicit" },
  ];

  const postStyleOptions = [
    { id: "soft" },
    { id: "inspiring" },
    { id: "conservative" },
    { id: "modern" },
    { id: "historical" },
    { id: "pastoral" },
    { id: "evangelistic" },
    { id: "meditative" },
    { id: "poetic" },
  ];

  const posterSubjectOptions = [
    { id: "landscape" },
    { id: "sea" },
    { id: "forest" },
    { id: "mountains" },
    { id: "meadow" },
    { id: "sunrise" },
    { id: "sunset" },
    { id: "sky" },
    { id: "lake" },
    { id: "river" },
    { id: "desert" },
    { id: "flowers" },
    { id: "rain" },
    { id: "city" },
    { id: "old_town" },
    { id: "street" },
    { id: "architecture" },
    { id: "interior" },
    { id: "people" },
    { id: "couple" },
    { id: "journey" },
    { id: "night" },
    { id: "abstract" },
    { id: "texture" },
  ];

  const posterVisualStyleOptions = [
    { id: "natural" },
    { id: "editorial" },
    { id: "cinematic" },
    { id: "minimalist" },
    { id: "painterly" },
    { id: "vintage_film" },
    { id: "dreamy" },
    { id: "modernism" },
    { id: "postmodern" },
    { id: "glitch" },
    { id: "luxury" },
    { id: "analog" },
  ];

  const posterFormatOptions = [
    { id: "portrait_4_5", width: 1080, height: 1350 },
    { id: "story_9_16", width: 1080, height: 1920 },
    { id: "square_1_1", width: 1080, height: 1080 },
    { id: "landscape_16_9", width: 1920, height: 1080 },
  ];

  const typographyOptions = [
    { id: "noto_sans" },
    { id: "noto_serif" },
    { id: "manrope" },
    { id: "montserrat" },
    { id: "pt_serif" },
    { id: "lora" },
    { id: "merriweather" },
    { id: "source_serif" },
    { id: "playfair" },
    { id: "cormorant" },
    { id: "oswald" },
    { id: "roboto_slab" },
  ];

  const layoutOptions = [
    { id: "top" },
    { id: "center" },
    { id: "bottom" },
  ];

  const logoPositionOptions = [
    { id: "top_left" },
    { id: "top_center" },
    { id: "top_right" },
    { id: "middle_center" },
    { id: "bottom_left" },
    { id: "bottom_center" },
    { id: "bottom_right" },
  ];

  const uiStrings = {
    ru: {
      heroKicker: "Мини-приложение для христианских постов от команды Shtunda13",
      heroTitle: "Тема, место Писания, текст и готовая картинка в одном окне",
      heroDescription:
        "Введите тему, выберите подходящее место Писания и сразу получите короткий пост вместе с иллюстрацией, которую можно скачать как изображение.",
      heroCardTitle: "Как это работает",
      heroStep1: "Введите тему поста.",
      heroStep2: "Выберите одно из предложенных мест Писания.",
      heroStep3: "Скопируйте текст и скачайте картинку.",
      supportTeaserTitle: "Поддержать миссию",
      supportTeaserCopy:
        "Если приложение помогает вам в служении, можно поддержать дальнейшую разработку и развитие.",
      supportTeaserButton: "Поддержать",
      step1Eyebrow: "Шаг 1",
      step1Title: "Тема",
      scriptureModeButton: "Явный подбор",
      topicLabel: "О чем будет пост?",
      topicPlaceholder: "Например: связь между женщиной и мужчиной до брака",
      topicSubmit: "Подобрать места Писания",
      surpriseTopic: "Случайная тема",
      step2Eyebrow: "Шаг 2",
      step2Title: "Короткий пост",
      postStyleButton: "Выбрать стиль подачи",
      emojiToggleOn: "Смайлики: да",
      emojiToggleOff: "Смайлики: нет",
      regeneratePost: "Перегенерировать",
      copyPost: "Скопировать",
      copied: "Скопировано",
      step3Eyebrow: "Шаг 3",
      step3Title: "Картинка поста",
      referenceUploadButton: "Загрузить референс",
      posterSettingsButton: "Настройки постера",
      newPoster: "Новый фон",
      generatingPoster: "Генерирую...",
      downloadPng: "Скачать PNG",
      scriptureModalEyebrow: "Шаг 1.5",
      scriptureModalTitle: "Выберите место Писания",
      scriptureModalTopicPrefix: 'Тема: "',
      scriptureModalTopicSuffix: '". Нажмите на карточку, чтобы построить пост на этом месте Писания.',
      scriptureModalModePrefix: "Режим подбора:",
      scriptureModeEyebrow: "Подбор мест Писания",
      scriptureModeTitle: "Выберите глубину подбора",
      scriptureModeSubtitle: "Можно искать прямые или более глубокие, неявные связи с темой.",
      scriptureModeExplicitLabel: "Явный",
      scriptureModeExplicitDescription:
        "Подбирает стихи, которые прямо и очевидно говорят о вашей теме.",
      scriptureModeImplicitLabel: "Неявный",
      scriptureModeImplicitDescription:
        "Подбирает более глубокие стихи о корне проблемы, мотивах, мудрости и состоянии сердца.",
      scriptureReasonExplicitPrefix: "Прямо затрагивает:",
      scriptureReasonImplicitPrefix: "Глубже раскрывает:",
      languageModalEyebrow: "Язык",
      languageModalTitle: "Выберите язык",
      languageModalSubtitle: "Язык интерфейса, поста и постера.",
      supportModalEyebrow: "Поддержка",
      supportModalTitle: "Поддержать миссию и разработку",
      supportModalSubtitle: "Можно поддержать развитие приложения по ссылке или через QR-код.",
      supportModalIntro:
        "Спасибо за любую поддержку. Она помогает развивать приложение, улучшать генерацию постов и выпускать следующие функции.",
      supportMonobankCopy: "Поддержать миссию через банку Monobank.",
      supportBuyMeCopy: "Поддержать дальнейшую разработку через Buy Me a Coffee.",
      supportPayPalCopy: "Можно поддержать через PayPal, отсканировав QR-код.",
      supportOpenLink: "Открыть ссылку",
      supportQrOnly: "Сканируйте QR-код",
      postStyleModalEyebrow: "Стиль подачи",
      postStyleModalTitle: "Выберите стиль текста",
      postStyleModalSubtitle: "Это влияет на интонацию и подачу короткого поста.",
      posterSettingsEyebrow: "Настройки постера",
      posterSettingsTitle: "Гибкая настройка фона и текста",
      posterSettingsSubtitle: "Фон, стиль генерации, типографика, референс, логотип и расположение текста.",
      posterFormatLabel: "Формат картинки",
      posterSubjectLabel: "Сюжет фона",
      posterVisualStyleLabel: "Художественный стиль",
      posterTypographyLabel: "Типографика",
      posterLayoutLabel: "Расположение текста",
      posterOpacityLabel: "Прозрачность текста",
      posterStrokeLabel: "Сила обводки",
      posterReferenceLabel: "Референс для генерации",
      posterReferenceUpload: "Загрузить референс",
      posterReferenceClear: "Очистить",
      posterReferenceEmpty: "Референс не загружен.",
      posterLogoLabel: "PNG-логотип",
      posterLogoUpload: "Загрузить логотип",
      posterLogoClear: "Очистить",
      posterLogoEmpty: "Логотип не загружен.",
      posterLogoPositionLabel: "Позиция логотипа",
      posterLogoSizeLabel: "Размер логотипа",
      posterLogoOpacityLabel: "Прозрачность логотипа",
      posterApply: "Применить",
      posterReset: "Сбросить",
      selectedVersePrefix: "Выбрано место Писания:",
      postEmpty: "Введите тему и выберите место Писания, чтобы здесь появился готовый короткий текст для публикации.",
      postWaiting: "Выберите место Писания, чтобы сгенерировать короткий пост по теме",
      postGenerating: "Генерирую новый пост с учетом темы, богословия, языка и стиля подачи.",
      postReady: "Пост готов. При желании можно сменить стиль подачи и перегенерировать его.",
      postFallback:
        "AI-генерация текста сейчас недоступна, поэтому я собрал запасной вариант локально. Можно попробовать еще раз.",
      posterChecking: "Проверяю, доступен ли Nano Banana для фона.",
      posterAwaiting: "Ожидаю выбор места Писания, чтобы подобрать фон.",
      posterWaiting: "Сначала выберите стих, а затем приложение соберет пост и подготовит фон.",
      posterPreparing: "Подбираю AI-фон под настроение темы и стиха.",
      placeholderTheme: "Введите тему",
      placeholderReference: "Выберите место Писания",
      placeholderPosterMessage:
        "После выбора здесь появится готовая картинка поста с фоном, который будет подбираться по настроению темы.",
      waitingPosterMessage:
        "Как только вы нажмете на карточку со стихом, приложение соберет короткий пост и подготовит изображение.",
      postSummaryPrefix: "Язык:",
      postSummaryStylePrefix: "Стиль:",
      postSummaryEmojiPrefix: "Смайлики:",
      posterSummaryPrefix: "Фон:",
      posterSummaryFormatPrefix: "Формат:",
      posterSummaryTypographyPrefix: "Типографика:",
      posterSummaryReferencePrefix: "Референс:",
      posterSummaryLogoPrefix: "Логотип:",
      emojiEnabledLabel: "да",
      emojiDisabledLabel: "нет",
      appTitle: "Штунда 13 Postmaker",
      serverUnavailable: "Локальный сервер не отвечает.",
      missingGeminiKey: "Ключ Gemini не задан.",
      postRequestFailed: "Не удалось получить пост от AI.",
      backgroundRequestFailed: "Не удалось получить изображение от AI-модели.",
      imageLoadFailed: "Не удалось загрузить изображение, полученное от AI.",
      imageUploadFailed: "Не удалось загрузить изображение. Используйте PNG, JPG или WEBP.",
      logoUploadFailed: "Не удалось загрузить логотип. Используйте PNG с прозрачностью.",
      referenceAppliedStatus: "Референс загружен. Использую его при следующей генерации фона.",
      referenceClearedStatus: "Референс очищен. Следующий фон будет без него.",
      logoAppliedStatus: "Логотип загружен и готов к размещению на постере.",
      logoClearedStatus: "Логотип убран с постера.",
      configRequestFailed: "Сервер не ответил на запрос конфигурации.",
      openViaServer: "Откройте приложение через node server.js.",
      addGeminiToEnv: "Добавьте GEMINI_API_KEY в файл .env.",
      generatingScripturesOverlay: "Подождите, идет подбор мест Писания",
      generatingPostOverlay: "Подождите, идет генерация поста",
      generatingPosterOverlay: "Подождите, идет генерация картинки",
    },
    uk: {
      heroKicker: "Мінізастосунок для християнських дописів від команди Shtunda13",
      heroTitle: "Тема, місце Писання, текст і готова картинка в одному вікні",
      heroDescription:
        "Введіть тему, виберіть відповідне місце Писання й одразу отримайте короткий допис разом з ілюстрацією, яку можна завантажити як зображення.",
      heroCardTitle: "Як це працює",
      heroStep1: "Введіть тему допису.",
      heroStep2: "Виберіть одне із запропонованих місць Писання.",
      heroStep3: "Скопіюйте текст і завантажте картинку.",
      supportTeaserTitle: "Підтримати місію",
      supportTeaserCopy:
        "Якщо застосунок допомагає вам у служінні, можна підтримати подальшу розробку і розвиток.",
      supportTeaserButton: "Підтримати",
      step1Eyebrow: "Крок 1",
      step1Title: "Тема",
      scriptureModeButton: "Явний добір",
      topicLabel: "Про що буде допис?",
      topicPlaceholder: "Наприклад: стосунки між жінкою і чоловіком до шлюбу",
      topicSubmit: "Підібрати місця Писання",
      surpriseTopic: "Випадкова тема",
      step2Eyebrow: "Крок 2",
      step2Title: "Короткий допис",
      postStyleButton: "Обрати стиль подачі",
      emojiToggleOn: "Смайлики: так",
      emojiToggleOff: "Смайлики: ні",
      regeneratePost: "Перегенерувати",
      copyPost: "Скопіювати",
      copied: "Скопійовано",
      step3Eyebrow: "Крок 3",
      step3Title: "Картинка допису",
      referenceUploadButton: "Завантажити референс",
      posterSettingsButton: "Налаштування постера",
      newPoster: "Новий фон",
      generatingPoster: "Генерую...",
      downloadPng: "Завантажити PNG",
      scriptureModalEyebrow: "Крок 1.5",
      scriptureModalTitle: "Виберіть місце Писання",
      scriptureModalTopicPrefix: 'Тема: "',
      scriptureModalTopicSuffix: '". Натисніть на картку, щоб побудувати допис на цьому місці Писання.',
      scriptureModalModePrefix: "Режим добору:",
      scriptureModeEyebrow: "Добір місць Писання",
      scriptureModeTitle: "Виберіть глибину добору",
      scriptureModeSubtitle: "Можна шукати прямі або глибші, неявні зв'язки з темою.",
      scriptureModeExplicitLabel: "Явний",
      scriptureModeExplicitDescription:
        "Добирає вірші, які прямо й очевидно говорять про вашу тему.",
      scriptureModeImplicitLabel: "Неявний",
      scriptureModeImplicitDescription:
        "Добирає глибші вірші про корінь проблеми, мотиви, мудрість і стан серця.",
      scriptureReasonExplicitPrefix: "Прямо торкається:",
      scriptureReasonImplicitPrefix: "Глибше розкриває:",
      languageModalEyebrow: "Мова",
      languageModalTitle: "Виберіть мову",
      languageModalSubtitle: "Мова інтерфейсу, допису та постера.",
      supportModalEyebrow: "Підтримка",
      supportModalTitle: "Підтримати місію та розробку",
      supportModalSubtitle: "Можна підтримати розвиток застосунку за посиланням або через QR-код.",
      supportModalIntro:
        "Дякуємо за будь-яку підтримку. Вона допомагає розвивати застосунок, покращувати генерацію дописів і випускати наступні функції.",
      supportMonobankCopy: "Підтримати місію через банку Monobank.",
      supportBuyMeCopy: "Підтримати подальшу розробку через Buy Me a Coffee.",
      supportPayPalCopy: "Можна підтримати через PayPal, відсканувавши QR-код.",
      supportOpenLink: "Відкрити посилання",
      supportQrOnly: "Скануйте QR-код",
      postStyleModalEyebrow: "Стиль подачі",
      postStyleModalTitle: "Виберіть стиль тексту",
      postStyleModalSubtitle: "Це впливає на інтонацію та подачу короткого допису.",
      posterSettingsEyebrow: "Налаштування постера",
      posterSettingsTitle: "Гнучке налаштування фону і тексту",
      posterSettingsSubtitle: "Фон, стиль генерації, типографіка, референс, логотип і розташування тексту.",
      posterFormatLabel: "Формат картинки",
      posterSubjectLabel: "Сюжет фону",
      posterVisualStyleLabel: "Художній стиль",
      posterTypographyLabel: "Типографіка",
      posterLayoutLabel: "Розташування тексту",
      posterOpacityLabel: "Прозорість тексту",
      posterStrokeLabel: "Сила обводки",
      posterReferenceLabel: "Референс для генерації",
      posterReferenceUpload: "Завантажити референс",
      posterReferenceClear: "Очистити",
      posterReferenceEmpty: "Референс не завантажено.",
      posterLogoLabel: "PNG-логотип",
      posterLogoUpload: "Завантажити логотип",
      posterLogoClear: "Очистити",
      posterLogoEmpty: "Логотип не завантажено.",
      posterLogoPositionLabel: "Позиція логотипа",
      posterLogoSizeLabel: "Розмір логотипа",
      posterLogoOpacityLabel: "Прозорість логотипа",
      posterApply: "Застосувати",
      posterReset: "Скинути",
      selectedVersePrefix: "Вибране місце Писання:",
      postEmpty: "Введіть тему й виберіть місце Писання, щоб тут з’явився готовий короткий допис для публікації.",
      postWaiting: "Виберіть місце Писання, щоб згенерувати короткий допис на тему",
      postGenerating: "Генерую новий допис з урахуванням теми, богослов’я, мови та стилю подачі.",
      postReady: "Допис готовий. За потреби можна змінити стиль подачі й перегенерувати його.",
      postFallback:
        "AI-генерація тексту зараз недоступна, тому я зібрав запасний варіант локально. Можна спробувати ще раз.",
      posterChecking: "Перевіряю, чи доступний Nano Banana для фону.",
      posterAwaiting: "Очікую вибір місця Писання, щоб підібрати фон.",
      posterWaiting: "Спочатку виберіть вірш, а потім застосунок підготує допис і фон.",
      posterPreparing: "Підбираю AI-фон під настрій теми та вірша.",
      placeholderTheme: "Введіть тему",
      placeholderReference: "Виберіть місце Писання",
      placeholderPosterMessage:
        "Після вибору тут з’явиться готова картинка допису з фоном, який підбиратиметься під настрій теми.",
      waitingPosterMessage:
        "Щойно ви натиснете на картку з віршем, застосунок збере короткий допис і підготує зображення.",
      postSummaryPrefix: "Мова:",
      postSummaryStylePrefix: "Стиль:",
      postSummaryEmojiPrefix: "Смайлики:",
      posterSummaryPrefix: "Фон:",
      posterSummaryFormatPrefix: "Формат:",
      posterSummaryTypographyPrefix: "Типографіка:",
      posterSummaryReferencePrefix: "Референс:",
      posterSummaryLogoPrefix: "Логотип:",
      emojiEnabledLabel: "так",
      emojiDisabledLabel: "ні",
      appTitle: "Штунда 13 Postmaker",
      serverUnavailable: "Локальний сервер не відповідає.",
      missingGeminiKey: "Ключ Gemini не задано.",
      postRequestFailed: "Не вдалося отримати допис від AI.",
      backgroundRequestFailed: "Не вдалося отримати зображення від AI-моделі.",
      imageLoadFailed: "Не вдалося завантажити зображення, отримане від AI.",
      imageUploadFailed: "Не вдалося завантажити зображення. Використайте PNG, JPG або WEBP.",
      logoUploadFailed: "Не вдалося завантажити логотип. Використайте PNG з прозорістю.",
      referenceAppliedStatus: "Референс завантажено. Використаю його під час наступної генерації фону.",
      referenceClearedStatus: "Референс очищено. Наступний фон буде без нього.",
      logoAppliedStatus: "Логотип завантажено і готово до розміщення на постері.",
      logoClearedStatus: "Логотип прибрано з постера.",
      configRequestFailed: "Сервер не відповів на запит конфігурації.",
      openViaServer: "Відкрийте застосунок через node server.js.",
      addGeminiToEnv: "Додайте GEMINI_API_KEY у файл .env.",
      generatingScripturesOverlay: "Зачекайте, триває добір місць Писання",
      generatingPostOverlay: "Зачекайте, триває генерація допису",
      generatingPosterOverlay: "Зачекайте, триває генерація картинки",
    },
    pl: {
      heroKicker: "Miniaplikacja do chrześcijańskich postów od zespołu Shtunda13",
      heroTitle: "Temat, fragment Pisma, tekst i gotowa grafika w jednym oknie",
      heroDescription:
        "Wpisz temat, wybierz odpowiedni fragment Pisma i od razu otrzymaj krótki post wraz z ilustracją, którą można pobrać jako obraz.",
      heroCardTitle: "Jak to działa",
      heroStep1: "Wpisz temat postu.",
      heroStep2: "Wybierz jeden z proponowanych fragmentów Pisma.",
      heroStep3: "Skopiuj tekst i pobierz grafikę.",
      supportTeaserTitle: "Wesprzyj misję",
      supportTeaserCopy:
        "Jeśli aplikacja pomaga ci w służbie, możesz wesprzeć dalszy rozwój i kolejne funkcje.",
      supportTeaserButton: "Wesprzyj",
      step1Eyebrow: "Krok 1",
      step1Title: "Temat",
      scriptureModeButton: "Dobór jawny",
      topicLabel: "O czym będzie post?",
      topicPlaceholder: "Na przykład: relacja między kobietą a mężczyzną przed ślubem",
      topicSubmit: "Dobierz fragmenty Pisma",
      surpriseTopic: "Losowy temat",
      step2Eyebrow: "Krok 2",
      step2Title: "Krótki post",
      postStyleButton: "Wybierz styl przekazu",
      emojiToggleOn: "Emoji: tak",
      emojiToggleOff: "Emoji: nie",
      regeneratePost: "Wygeneruj ponownie",
      copyPost: "Kopiuj",
      copied: "Skopiowano",
      step3Eyebrow: "Krok 3",
      step3Title: "Grafika postu",
      referenceUploadButton: "Wgraj referencję",
      posterSettingsButton: "Ustawienia plakatu",
      newPoster: "Nowe tło",
      generatingPoster: "Generuję...",
      downloadPng: "Pobierz PNG",
      scriptureModalEyebrow: "Krok 1.5",
      scriptureModalTitle: "Wybierz fragment Pisma",
      scriptureModalTopicPrefix: 'Temat: "',
      scriptureModalTopicSuffix: '". Kliknij kartę, aby zbudować post na tym fragmencie Pisma.',
      scriptureModalModePrefix: "Tryb doboru:",
      scriptureModeEyebrow: "Dobór fragmentów Pisma",
      scriptureModeTitle: "Wybierz głębokość doboru",
      scriptureModeSubtitle: "Możesz szukać powiązań bezpośrednich albo głębszych, mniej oczywistych.",
      scriptureModeExplicitLabel: "Jawny",
      scriptureModeExplicitDescription:
        "Dobiera wersety, które mówią o twoim temacie wprost i bardzo wyraźnie.",
      scriptureModeImplicitLabel: "Niejawny",
      scriptureModeImplicitDescription:
        "Dobiera głębsze wersety o źródle problemu, motywach, mądrości i stanie serca.",
      scriptureReasonExplicitPrefix: "Bezpośrednio dotyczy:",
      scriptureReasonImplicitPrefix: "Głębiej odsłania:",
      languageModalEyebrow: "Język",
      languageModalTitle: "Wybierz język",
      languageModalSubtitle: "Język interfejsu, postu i plakatu.",
      supportModalEyebrow: "Wsparcie",
      supportModalTitle: "Wesprzyj misję i rozwój",
      supportModalSubtitle: "Możesz wesprzeć rozwój aplikacji przez link lub kod QR.",
      supportModalIntro:
        "Dziękujemy za każde wsparcie. Pomaga ono rozwijać aplikację, ulepszać generowanie postów i wydawać kolejne funkcje.",
      supportMonobankCopy: "Wesprzyj misję przez skarbonkę Monobank.",
      supportBuyMeCopy: "Wesprzyj dalszy rozwój przez Buy Me a Coffee.",
      supportPayPalCopy: "Możesz wesprzeć przez PayPal, skanując kod QR.",
      supportOpenLink: "Otwórz link",
      supportQrOnly: "Zeskanuj kod QR",
      postStyleModalEyebrow: "Styl przekazu",
      postStyleModalTitle: "Wybierz styl tekstu",
      postStyleModalSubtitle: "To wpływa na ton i sposób podania krótkiego postu.",
      posterSettingsEyebrow: "Ustawienia plakatu",
      posterSettingsTitle: "Elastyczne ustawienia tła i tekstu",
      posterSettingsSubtitle: "Tło, styl generacji, typografia, referencja, logo i układ tekstu.",
      posterFormatLabel: "Format grafiki",
      posterSubjectLabel: "Motyw tła",
      posterVisualStyleLabel: "Styl artystyczny",
      posterTypographyLabel: "Typografia",
      posterLayoutLabel: "Układ tekstu",
      posterOpacityLabel: "Przezroczystość tekstu",
      posterStrokeLabel: "Siła obrysu",
      posterReferenceLabel: "Referencja do generacji",
      posterReferenceUpload: "Wgraj referencję",
      posterReferenceClear: "Wyczyść",
      posterReferenceEmpty: "Referencja nie została wgrana.",
      posterLogoLabel: "Logo PNG",
      posterLogoUpload: "Wgraj logo",
      posterLogoClear: "Wyczyść",
      posterLogoEmpty: "Logo nie zostało wgrane.",
      posterLogoPositionLabel: "Pozycja logo",
      posterLogoSizeLabel: "Rozmiar logo",
      posterLogoOpacityLabel: "Przezroczystość logo",
      posterApply: "Zastosuj",
      posterReset: "Resetuj",
      selectedVersePrefix: "Wybrany fragment Pisma:",
      postEmpty: "Wpisz temat i wybierz fragment Pisma, aby pojawił się tutaj gotowy krótki post do publikacji.",
      postWaiting: "Wybierz fragment Pisma, aby wygenerować krótki post na temat",
      postGenerating: "Generuję nowy post z uwzględnieniem tematu, teologii, języka i stylu przekazu.",
      postReady: "Post jest gotowy. W razie potrzeby możesz zmienić styl i wygenerować go ponownie.",
      postFallback:
        "Generowanie tekstu przez AI jest teraz niedostępne, więc przygotowałem wersję zapasową lokalnie. Możesz spróbować ponownie.",
      posterChecking: "Sprawdzam, czy Nano Banana jest dostępny do generowania tła.",
      posterAwaiting: "Czekam na wybór fragmentu Pisma, aby dobrać tło.",
      posterWaiting: "Najpierw wybierz werset, a potem aplikacja przygotuje post i tło.",
      posterPreparing: "Dobieram AI-tło do nastroju tematu i wersetu.",
      placeholderTheme: "Wpisz temat",
      placeholderReference: "Wybierz fragment Pisma",
      placeholderPosterMessage:
        "Po wyborze pojawi się tutaj gotowa grafika postu z tłem dobieranym do nastroju tematu.",
      waitingPosterMessage:
        "Gdy klikniesz kartę z wersetem, aplikacja przygotuje krótki post i obraz.",
      postSummaryPrefix: "Język:",
      postSummaryStylePrefix: "Styl:",
      postSummaryEmojiPrefix: "Emoji:",
      posterSummaryPrefix: "Tło:",
      posterSummaryFormatPrefix: "Format:",
      posterSummaryTypographyPrefix: "Typografia:",
      posterSummaryReferencePrefix: "Referencja:",
      posterSummaryLogoPrefix: "Logo:",
      emojiEnabledLabel: "tak",
      emojiDisabledLabel: "nie",
      appTitle: "Штунда 13 Postmaker",
      serverUnavailable: "Lokalny serwer nie odpowiada.",
      missingGeminiKey: "Klucz Gemini nie został ustawiony.",
      postRequestFailed: "Nie udało się pobrać postu z AI.",
      backgroundRequestFailed: "Nie udało się pobrać obrazu z modelu AI.",
      imageLoadFailed: "Nie udało się załadować obrazu otrzymanego od AI.",
      imageUploadFailed: "Nie udało się wgrać obrazu. Użyj PNG, JPG lub WEBP.",
      logoUploadFailed: "Nie udało się wgrać logo. Użyj pliku PNG z przezroczystością.",
      referenceAppliedStatus: "Referencja została wgrana i będzie użyta przy następnym generowaniu tła.",
      referenceClearedStatus: "Referencja została usunięta. Kolejne tło będzie bez niej.",
      logoAppliedStatus: "Logo zostało wgrane i jest gotowe do umieszczenia na plakacie.",
      logoClearedStatus: "Logo zostało usunięte z plakatu.",
      configRequestFailed: "Serwer nie odpowiedział na żądanie konfiguracji.",
      openViaServer: "Otwórz aplikację przez node server.js.",
      addGeminiToEnv: "Dodaj GEMINI_API_KEY do pliku .env.",
      generatingScripturesOverlay: "Poczekaj, trwa dobieranie fragmentów Pisma",
      generatingPostOverlay: "Poczekaj, trwa generowanie posta",
      generatingPosterOverlay: "Poczekaj, trwa generowanie grafiki",
    },
  };

  uiStrings.tr = Object.assign({}, uiStrings.ru, {
    heroKicker: "Shtunda13 ekibinden Hristiyan paylaşımları için mini uygulama",
    heroTitle: "Konu, Kutsal Yazı, metin ve hazır görsel tek ekranda",
    heroDescription:
      "Konuyu yazın, uygun Kutsal Yazı bölümünü seçin ve indirilebilir görselle birlikte kısa bir paylaşım alın.",
    heroCardTitle: "Nasıl çalışır",
    heroStep1: "Paylaşım konusunu yazın.",
    heroStep2: "Önerilen Kutsal Yazı bölümlerinden birini seçin.",
    heroStep3: "Metni kopyalayın ve görseli indirin.",
    supportTeaserTitle: "Misyonu destekle",
    supportTeaserCopy:
      "Uygulama hizmetinizde yardımcı oluyorsa, geliştirme ve yeni özellikleri destekleyebilirsiniz.",
    supportTeaserButton: "Destekle",
    step1Eyebrow: "Adım 1",
    step1Title: "Konu",
    scriptureModeButton: "Açık seçim",
    topicLabel: "Paylaşım ne hakkında olacak?",
    topicPlaceholder: "Örneğin: evlilikten önce kadın ve erkek arasındaki ilişki",
    topicSubmit: "Kutsal Yazı bölümlerini seç",
    surpriseTopic: "Rastgele konu",
    step2Eyebrow: "Adım 2",
    step2Title: "Kısa paylaşım",
    postStyleButton: "Anlatım stilini seç",
    emojiToggleOn: "Emoji: evet",
    emojiToggleOff: "Emoji: hayır",
    regeneratePost: "Yeniden oluştur",
    copyPost: "Kopyala",
    copied: "Kopyalandı",
    step3Eyebrow: "Adım 3",
    step3Title: "Paylaşım görseli",
    referenceUploadButton: "Referans yükle",
    posterSettingsButton: "Poster ayarları",
    newPoster: "Yeni arka plan",
    generatingPoster: "Oluşturuluyor...",
    downloadPng: "PNG indir",
    scriptureModalEyebrow: "Adım 1.5",
    scriptureModalTitle: "Kutsal Yazı seçin",
    scriptureModalTopicPrefix: 'Konu: "',
    scriptureModalTopicSuffix: '". Bu bölüm üzerine paylaşım oluşturmak için karta tıklayın.',
    scriptureModalModePrefix: "Seçim modu:",
    scriptureModeEyebrow: "Kutsal Yazı seçimi",
    scriptureModeTitle: "Seçim derinliğini belirleyin",
    scriptureModeSubtitle: "Konuyla açık veya daha derin, dolaylı bağlantılar aranabilir.",
    scriptureModeExplicitLabel: "Açık",
    scriptureModeExplicitDescription:
      "Konunuzdan doğrudan ve belirgin şekilde söz eden ayetleri seçer.",
    scriptureModeImplicitLabel: "Dolaylı",
    scriptureModeImplicitDescription:
      "Sorunun kökünü, motivasyonları, bilgeliği ve yüreğin durumunu aydınlatan ayetleri seçer.",
    scriptureReasonExplicitPrefix: "Doğrudan değinir:",
    scriptureReasonImplicitPrefix: "Daha derinden açar:",
    languageModalEyebrow: "Dil",
    languageModalTitle: "Dil seçin",
    languageModalSubtitle: "Arayüz, paylaşım ve poster dili.",
    supportModalEyebrow: "Destek",
    supportModalTitle: "Misyonu ve geliştirmeyi destekle",
    supportModalSubtitle: "Uygulamanın gelişimini bağlantı veya QR kod ile destekleyebilirsiniz.",
    supportModalIntro:
      "Her destek için teşekkürler. Bu destek, uygulamayı geliştirmeye ve yeni özellikler çıkarmaya yardım eder.",
    supportMonobankCopy: "Misyonu Monobank üzerinden destekleyin.",
    supportBuyMeCopy: "Geliştirmeyi Buy Me a Coffee üzerinden destekleyin.",
    supportPayPalCopy: "PayPal için QR kodu tarayabilirsiniz.",
    supportOpenLink: "Bağlantıyı aç",
    supportQrOnly: "QR kodu tarayın",
    postStyleModalEyebrow: "Anlatım stili",
    postStyleModalTitle: "Metin stilini seçin",
    postStyleModalSubtitle: "Bu, kısa paylaşımın tonunu ve anlatımını etkiler.",
    posterSettingsEyebrow: "Poster ayarları",
    posterSettingsTitle: "Arka plan ve metin için esnek ayarlar",
    posterSettingsSubtitle: "Format, arka plan, üretim stili, tipografi, referans, logo ve metin konumu.",
    posterFormatLabel: "Görsel formatı",
    posterSubjectLabel: "Arka plan konusu",
    posterVisualStyleLabel: "Sanatsal stil",
    posterTypographyLabel: "Tipografi",
    posterLayoutLabel: "Metin konumu",
    posterOpacityLabel: "Metin opaklığı",
    posterStrokeLabel: "Kontur gücü",
    posterReferenceLabel: "Üretim referansı",
    posterReferenceUpload: "Referans yükle",
    posterReferenceClear: "Temizle",
    posterReferenceEmpty: "Referans yüklenmedi.",
    posterLogoLabel: "PNG logo",
    posterLogoUpload: "Logo yükle",
    posterLogoClear: "Temizle",
    posterLogoEmpty: "Logo yüklenmedi.",
    posterLogoPositionLabel: "Logo konumu",
    posterLogoSizeLabel: "Logo boyutu",
    posterLogoOpacityLabel: "Logo opaklığı",
    posterApply: "Uygula",
    posterReset: "Sıfırla",
    selectedVersePrefix: "Seçilen Kutsal Yazı:",
    postEmpty: "Hazır kısa paylaşım burada görünsün diye konu yazın ve Kutsal Yazı seçin.",
    postWaiting: "Bu konu için kısa paylaşım oluşturmak üzere Kutsal Yazı seçin",
    postGenerating: "Konu, teoloji, dil ve anlatım stiline göre yeni paylaşım oluşturuluyor.",
    postReady: "Paylaşım hazır. İsterseniz stili değiştirip yeniden oluşturabilirsiniz.",
    postFallback:
      "AI metin üretimi şu anda kullanılamıyor; bu yüzden yerel yedek metin hazırlandı. Yeniden deneyebilirsiniz.",
    posterChecking: "Nano Banana arka plan üretimi için kontrol ediliyor.",
    posterAwaiting: "Arka planı seçmek için Kutsal Yazı seçimi bekleniyor.",
    posterWaiting: "Önce ayeti seçin; ardından uygulama paylaşımı ve arka planı hazırlayacak.",
    posterPreparing: "Konu ve ayetin ruhuna uygun AI arka planı hazırlanıyor.",
    placeholderTheme: "Konu yazın",
    placeholderReference: "Kutsal Yazı seçin",
    placeholderPosterMessage:
      "Seçimden sonra burada konunun ruhuna göre oluşturulmuş arka planlı hazır görsel görünecek.",
    waitingPosterMessage:
      "Ayet kartına tıkladığınızda uygulama kısa paylaşımı ve görseli hazırlayacak.",
    postSummaryPrefix: "Dil:",
    postSummaryStylePrefix: "Stil:",
    postSummaryEmojiPrefix: "Emoji:",
    posterSummaryPrefix: "Arka plan:",
    posterSummaryFormatPrefix: "Format:",
    posterSummaryTypographyPrefix: "Tipografi:",
    posterSummaryReferencePrefix: "Referans:",
    posterSummaryLogoPrefix: "Logo:",
    emojiEnabledLabel: "evet",
    emojiDisabledLabel: "hayır",
    appTitle: "Штунда 13 Postmaker",
    serverUnavailable: "Yerel sunucu yanıt vermiyor.",
    missingGeminiKey: "Gemini anahtarı tanımlı değil.",
    postRequestFailed: "AI'dan paylaşım alınamadı.",
    backgroundRequestFailed: "AI modelinden görsel alınamadı.",
    imageLoadFailed: "AI'dan gelen görsel yüklenemedi.",
    imageUploadFailed: "Görsel yüklenemedi. PNG, JPG veya WEBP kullanın.",
    logoUploadFailed: "Logo yüklenemedi. Şeffaf PNG kullanın.",
    referenceAppliedStatus: "Referans yüklendi. Sonraki arka plan üretiminde kullanılacak.",
    referenceClearedStatus: "Referans temizlendi. Sonraki arka plan onsuz üretilecek.",
    logoAppliedStatus: "Logo yüklendi ve postere yerleştirilmeye hazır.",
    logoClearedStatus: "Logo posterden kaldırıldı.",
    configRequestFailed: "Sunucu yapılandırma isteğine yanıt vermedi.",
    openViaServer: "Uygulamayı node server.js üzerinden açın.",
    addGeminiToEnv: "GEMINI_API_KEY değerini .env dosyasına ekleyin.",
    generatingScripturesOverlay: "Lütfen bekleyin, Kutsal Yazı bölümleri hazırlanıyor",
    generatingPostOverlay: "Lütfen bekleyin, paylaşım metni oluşturuluyor",
    generatingPosterOverlay: "Lütfen bekleyin, paylaşım görseli oluşturuluyor",
  });

  const state = {
    language: "ru",
    scriptureMatchMode: "explicit",
    postStyle: "inspiring",
    allowEmojis: false,
    topic: "",
    suggestions: [],
    suggestionReasons: {},
    selectedVerse: null,
    generatedPost: "",
    localizedVerseText: "",
    localizedReference: "",
    postPending: false,
    postVariant: 0,
    posterVariant: 0,
    backgroundImageUrl: "",
    backgroundSource: "fallback",
    backgroundModel: "",
    backgroundPrompt: "",
    backgroundPending: false,
    serverConfig: null,
    serverConfigPromise: null,
    renderToken: 0,
    posterSettings: getDefaultPosterSettings(),
    referenceImage: null,
    logoImage: null,
    topicRotation: loadTopicRotationState(),
    topicTranslationToken: 0,
  };

  const elements = {
    inputPanel: document.querySelector(".input-panel"),
    textPanel: document.querySelector(".text-panel"),
    posterPanel: document.querySelector(".poster-panel"),
    heroKicker: document.getElementById("hero-kicker"),
    heroTitle: document.getElementById("hero-title"),
    heroDescription: document.getElementById("hero-description"),
    heroCardTitle: document.getElementById("hero-card-title"),
    heroStep1: document.getElementById("hero-step-1"),
    heroStep2: document.getElementById("hero-step-2"),
    heroStep3: document.getElementById("hero-step-3"),
    supportTeaserTitle: document.getElementById("support-teaser-title"),
    supportTeaserCopy: document.getElementById("support-teaser-copy"),
    supportOpenBtn: document.getElementById("support-open-btn"),
    step1Eyebrow: document.getElementById("step1-eyebrow"),
    step1Title: document.getElementById("step1-title"),
    step2Eyebrow: document.getElementById("step2-eyebrow"),
    step2Title: document.getElementById("step2-title"),
    step3Eyebrow: document.getElementById("step3-eyebrow"),
    step3Title: document.getElementById("step3-title"),
    topicForm: document.getElementById("topic-form"),
    topicLabel: document.getElementById("topic-label"),
    topicInput: document.getElementById("topic-input"),
    topicSubmitBtn: document.getElementById("topic-submit-btn"),
    surpriseBtn: document.getElementById("surprise-btn"),
    scriptureModeBtn: document.getElementById("scripture-mode-btn"),
    languageBtn: document.getElementById("language-btn"),
    selectedVerse: document.getElementById("selected-verse"),
    postStyleBtn: document.getElementById("post-style-btn"),
    emojiToggleBtn: document.getElementById("emoji-toggle-btn"),
    regeneratePostBtn: document.getElementById("regenerate-post-btn"),
    postOptionsSummary: document.getElementById("post-options-summary"),
    postStatus: document.getElementById("post-status"),
    postOutput: document.getElementById("post-output"),
    copyPostBtn: document.getElementById("copy-post-btn"),
    downloadBtn: document.getElementById("download-btn"),
    referenceUploadBtn: document.getElementById("reference-upload-btn"),
    referenceUploadInput: document.getElementById("reference-upload-input"),
    logoInput: document.getElementById("poster-logo-input"),
    posterSettingsBtn: document.getElementById("poster-settings-btn"),
    posterOptionsSummary: document.getElementById("poster-options-summary"),
    newPosterBtn: document.getElementById("new-poster-btn"),
    posterStatus: document.getElementById("poster-status"),
    canvasFrame: document.querySelector(".canvas-frame"),
    canvas: document.getElementById("poster-canvas"),
    scriptureModal: document.getElementById("scripture-modal"),
    scriptureModalEyebrow: document.getElementById("scripture-modal-eyebrow"),
    scriptureModalTitle: document.getElementById("scripture-modal-title"),
    modalSubtitle: document.getElementById("modal-subtitle"),
    scriptureGrid: document.getElementById("scripture-grid"),
    closeScriptureModalBtn: document.getElementById("close-scripture-modal-btn"),
    languageModal: document.getElementById("language-modal"),
    languageModalEyebrow: document.getElementById("language-modal-eyebrow"),
    languageModalTitle: document.getElementById("language-modal-title"),
    languageModalSubtitle: document.getElementById("language-modal-subtitle"),
    languageGrid: document.getElementById("language-grid"),
    supportModal: document.getElementById("support-modal"),
    supportModalEyebrow: document.getElementById("support-modal-eyebrow"),
    supportModalTitle: document.getElementById("support-modal-title"),
    supportModalSubtitle: document.getElementById("support-modal-subtitle"),
    supportModalIntro: document.getElementById("support-modal-intro"),
    supportMonobankCopy: document.getElementById("support-monobank-copy"),
    supportBuyMeCopy: document.getElementById("support-bmc-copy"),
    supportPayPalCopy: document.getElementById("support-paypal-copy"),
    supportMonobankLink: document.getElementById("support-monobank-link"),
    supportBuyMeLink: document.getElementById("support-bmc-link"),
    supportPayPalNote: document.getElementById("support-paypal-note"),
    scriptureModeModal: document.getElementById("scripture-mode-modal"),
    scriptureModeEyebrow: document.getElementById("scripture-mode-eyebrow"),
    scriptureModeTitle: document.getElementById("scripture-mode-title"),
    scriptureModeSubtitle: document.getElementById("scripture-mode-subtitle"),
    scriptureModeGrid: document.getElementById("scripture-mode-grid"),
    postStyleModal: document.getElementById("post-style-modal"),
    postStyleModalEyebrow: document.getElementById("post-style-modal-eyebrow"),
    postStyleModalTitle: document.getElementById("post-style-modal-title"),
    postStyleModalSubtitle: document.getElementById("post-style-modal-subtitle"),
    postStyleGrid: document.getElementById("post-style-grid"),
    posterSettingsModal: document.getElementById("poster-settings-modal"),
    posterSettingsEyebrow: document.getElementById("poster-settings-eyebrow"),
    posterSettingsTitle: document.getElementById("poster-settings-title"),
    posterSettingsSubtitle: document.getElementById("poster-settings-subtitle"),
    posterSettingsForm: document.getElementById("poster-settings-form"),
    posterFormatLabel: document.getElementById("poster-format-label"),
    posterSubjectLabel: document.getElementById("poster-subject-label"),
    posterVisualStyleLabel: document.getElementById("poster-visual-style-label"),
    posterTypographyLabel: document.getElementById("poster-typography-label"),
    posterLayoutLabel: document.getElementById("poster-layout-label"),
    posterOpacityLabel: document.getElementById("poster-opacity-label"),
    posterStrokeLabel: document.getElementById("poster-stroke-label"),
    posterReferenceLabel: document.getElementById("poster-reference-label"),
    posterReferenceUploadBtn: document.getElementById("poster-reference-upload-btn"),
    posterReferenceClearBtn: document.getElementById("poster-reference-clear-btn"),
    posterReferenceName: document.getElementById("poster-reference-name"),
    posterLogoLabel: document.getElementById("poster-logo-label"),
    posterLogoUploadBtn: document.getElementById("poster-logo-upload-btn"),
    posterLogoClearBtn: document.getElementById("poster-logo-clear-btn"),
    posterLogoName: document.getElementById("poster-logo-name"),
    posterLogoPositionLabel: document.getElementById("poster-logo-position-label"),
    posterLogoSizeLabel: document.getElementById("poster-logo-size-label"),
    posterLogoOpacityLabel: document.getElementById("poster-logo-opacity-label"),
    posterFormatSelect: document.getElementById("poster-format-select"),
    posterSubjectSelect: document.getElementById("poster-subject-select"),
    posterVisualStyleSelect: document.getElementById("poster-visual-style-select"),
    posterTypographySelect: document.getElementById("poster-typography-select"),
    posterLayoutSelect: document.getElementById("poster-layout-select"),
    posterOpacityRange: document.getElementById("poster-opacity-range"),
    posterOpacityValue: document.getElementById("poster-opacity-value"),
    posterStrokeRange: document.getElementById("poster-stroke-range"),
    posterStrokeValue: document.getElementById("poster-stroke-value"),
    posterLogoPositionSelect: document.getElementById("poster-logo-position-select"),
    posterLogoSizeRange: document.getElementById("poster-logo-size-range"),
    posterLogoSizeValue: document.getElementById("poster-logo-size-value"),
    posterLogoOpacityRange: document.getElementById("poster-logo-opacity-range"),
    posterLogoOpacityValue: document.getElementById("poster-logo-opacity-value"),
    posterSettingsApplyBtn: document.getElementById("poster-settings-apply-btn"),
    posterSettingsResetBtn: document.getElementById("poster-settings-reset-btn"),
  };

  const ctx = elements.canvas.getContext("2d");
  let posterFontWarmupPromise = null;
  let activeGenerationTarget = null;

  init();

  function init() {
    syncPosterCanvasSize();
    syncPosterSettingsForm();
    renderLanguageOptions();
    renderScriptureModeOptions();
    renderPostStyleOptions();
    populatePosterSettingSelects();
    applyTranslations();
    drawPlaceholderPoster();
    void warmPosterFonts();
    setPosterStatus(t("posterChecking"), "loading");
    void loadServerConfig();

    elements.topicForm.addEventListener("submit", handleTopicSubmit);
    elements.surpriseBtn.addEventListener("click", applyRandomTopic);
    elements.scriptureModeBtn.addEventListener("click", function () {
      openModal(elements.scriptureModeModal);
    });
    elements.languageBtn.addEventListener("click", function () {
      openModal(elements.languageModal);
    });
    elements.supportOpenBtn.addEventListener("click", function () {
      openModal(elements.supportModal);
    });
    elements.postStyleBtn.addEventListener("click", function () {
      openModal(elements.postStyleModal);
    });
    elements.emojiToggleBtn.addEventListener("click", toggleEmojiMode);
    elements.posterSettingsBtn.addEventListener("click", function () {
      openModal(elements.posterSettingsModal);
    });
    elements.regeneratePostBtn.addEventListener("click", function () {
      if (!state.selectedVerse || state.postPending) {
        return;
      }
      void generatePostContent({ refreshPoster: false, forceRegenerate: true });
    });
    elements.copyPostBtn.addEventListener("click", copyPost);
    elements.downloadBtn.addEventListener("click", downloadPoster);
    elements.referenceUploadBtn.addEventListener("click", openReferenceUploadDialog);
    elements.referenceUploadInput.addEventListener("change", handleReferenceUpload);
    elements.logoInput.addEventListener("change", handleLogoUpload);
    elements.newPosterBtn.addEventListener("click", refreshPoster);
    elements.closeScriptureModalBtn.addEventListener("click", function () {
      closeModal(elements.scriptureModal);
    });
    elements.posterSettingsForm.addEventListener("submit", handlePosterSettingsSubmit);
    elements.posterSettingsResetBtn.addEventListener("click", resetPosterSettings);
    elements.posterReferenceUploadBtn.addEventListener("click", openReferenceUploadDialog);
    elements.posterReferenceClearBtn.addEventListener("click", clearReferenceImage);
    elements.posterLogoUploadBtn.addEventListener("click", openLogoUploadDialog);
    elements.posterLogoClearBtn.addEventListener("click", clearLogoImage);
    elements.posterOpacityRange.addEventListener("input", updatePosterRangeOutputs);
    elements.posterStrokeRange.addEventListener("input", updatePosterRangeOutputs);
    elements.posterLogoSizeRange.addEventListener("input", updatePosterRangeOutputs);
    elements.posterLogoOpacityRange.addEventListener("input", updatePosterRangeOutputs);

    document.querySelectorAll(".modal").forEach(function (modal) {
      modal.addEventListener("click", handleModalBackdrop);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        document.querySelectorAll(".modal").forEach(function (modal) {
          if (!modal.classList.contains("hidden")) {
            closeModal(modal);
          }
        });
      }
    });
  }

  function handleTopicSubmit(event) {
    event.preventDefault();

    const topic = elements.topicInput.value.trim();
    if (!topic) {
      elements.topicInput.focus();
      return;
    }

    state.topic = topic;
    state.posterVariant = 0;
    state.selectedVerse = null;
    state.generatedPost = "";
    state.suggestionReasons = {};
    const localSuggestions = getSuggestedScripturesLocal(topic);
    state.suggestions = localSuggestions.verses;
    state.suggestionReasons = localSuggestions.reasons;

    resetGeneratedOutput(topic);
    renderScriptureModal();
    openModal(elements.scriptureModal);
    void enhanceScriptureSuggestions(topic);
  }

  function applyRandomTopic() {
    const nextTopic = getNextRandomTopic(state.language);
    elements.topicInput.value = nextTopic;
    elements.topicInput.focus();
  }

  function getLocalizedVerseText(verse) {
    const translations = scriptureTranslations[verse.id];
    if (translations && translations[state.language] && translations[state.language].text) {
      return translations[state.language].text;
    }
    return verse.text;
  }

  function getLocalizedVerseReference(verse) {
    const translations = scriptureTranslations[verse.id];
    if (translations && translations[state.language] && translations[state.language].reference) {
      return translations[state.language].reference;
    }
    return verse.reference;
  }

  function getLocalizedTag(tag) {
    const translations = tagTranslations[state.language];
    if (!translations) {
      return tag;
    }
    return translations[tag] || tag;
  }

  function getLocalizedCategoryLabel(category) {
    const labels = {
      ru: {
        тревога: "тревога",
        одиночество: "одиночество",
        финансы: "финансовое давление",
        "цифровой шум": "цифровой шум",
        выгорание: "выгорание",
      },
      uk: {
        тревога: "тривога",
        одиночество: "самотність",
        финансы: "фінансовий тиск",
        "цифровой шум": "цифровий шум",
        выгорание: "вигорання",
      },
      pl: {
        тревога: "lęk",
        одиночество: "samotność",
        финансы: "presja finansowa",
        "цифровой шум": "cyfrowy szum",
        выгорание: "wypalenie",
      },
      tr: {
        тревога: "kaygı",
        одиночество: "yalnızlık",
        финансы: "finansal baskı",
        "цифровой шум": "dijital gürültü",
        выгорание: "tükenmişlik",
      },
    };

    return (labels[state.language] && labels[state.language][category]) || getLocalizedTag(category);
  }

  function getSuggestedScripturesLocal(topic) {
    const normalizedTopic = normalize(topic);
    const topicStems = tokenize(normalizedTopic).map(stemWord);
    const matchedCategories = detectCategories(normalizedTopic);
    const mode = state.scriptureMatchMode;

    const ranked = scriptureLibrary
      .map(function (verse, index) {
        const scoreData = scoreVerse(verse, normalizedTopic, topicStems, matchedCategories, mode);
        return {
          verse: verse,
          score: scoreData.score - index * 0.001,
          reason: buildLocalSuggestionReason(verse, scoreData, matchedCategories, mode),
        };
      })
      .sort(function (left, right) {
        return right.score - left.score;
      });

    const topEntries = ranked.slice(0, 8);
    const reasons = {};

    topEntries.forEach(function (entry) {
      reasons[entry.verse.id] = entry.reason;
    });

    return {
      verses: topEntries.map(function (entry) {
        return entry.verse;
      }),
      reasons: reasons,
    };
  }

  function scoreVerse(verse, normalizedTopic, topicStems, matchedCategories, mode) {
    const verseTags = verse.tags.map(normalize);
    const verseText = normalize([verse.text, verse.focus, verse.reference].join(" "));
    const explicitMode = mode !== "implicit";
    let score = explicitMode ? 1.2 : 1;
    let directHits = 0;
    let categoryHits = 0;
    let deepHits = 0;

    matchedCategories.forEach(function (category) {
      if (categoryMatchesVerse(verse, category)) {
        categoryHits += 1;
        score += explicitMode ? 11 : 7;
      }
    });

    topicStems.forEach(function (stem) {
      if (stem.length < 3) {
        return;
      }

      verseTags.forEach(function (tag) {
        if (tag.includes(stem) || stem.includes(tag)) {
          directHits += 1;
          score += explicitMode ? 5.5 : 3;
        }
      });

      if (verseText.includes(stem)) {
        directHits += 1;
        score += explicitMode ? 3.5 : 2.5;
      }

      if (normalizedTopic.includes(stem) && verse.focus && normalize(verse.focus).includes(stem)) {
        deepHits += 1;
        score += explicitMode ? 1.25 : 4;
      }
    });

    if (verse.tags.includes("отношения") || verse.tags.includes("брак")) {
      score += explicitMode ? 0.9 : 0.5;
    }

    if (matchedCategories.length === 0 && (verse.tags.includes("мудрость") || verse.tags.includes("любовь"))) {
      deepHits += 1;
      score += explicitMode ? 0.4 : 1.8;
    }

    if (!explicitMode) {
      if (verse.tags.includes("сердце") || verse.tags.includes("мудрость") || verse.tags.includes("Бог")) {
        deepHits += 1;
        score += 1.4;
      }
      if (verse.focus && /(основан|сердц|мудрост|зрел|ценност|границ|чистот|довер|мир|единств)/iu.test(verse.focus)) {
        deepHits += 1;
        score += 1.8;
      }
    } else if (directHits === 0 && categoryHits === 0) {
      score -= 1.8;
    }

    return {
      score: score,
      directHits: directHits,
      categoryHits: categoryHits,
      deepHits: deepHits,
    };
  }

  function categoryMatchesVerse(verse, category) {
    const verseTags = verse.tags.map(normalize);
    const bridgeTags = (categoryBridgeTags[category] || []).map(normalize);

    if (verseTags.some(function (tag) { return tag.includes(normalize(category)); })) {
      return true;
    }

    if (bridgeTags.some(function (bridgeTag) { return verseTags.includes(bridgeTag); })) {
      return true;
    }

    const verseText = normalize([verse.text, verse.focus, verse.reference].join(" "));
    return bridgeTags.some(function (bridgeTag) {
      return verseText.includes(bridgeTag);
    });
  }

  function buildLocalSuggestionReason(verse, scoreData, matchedCategories, mode) {
    const bridgeMatches = matchedCategories
      .filter(function (category) {
        return categoryMatchesVerse(verse, category);
      })
      .slice(0, 2)
      .map(function (category) {
        return getLocalizedCategoryLabel(category);
      });

    if (bridgeMatches.length) {
      return (
        (mode === "implicit" ? t("scriptureReasonImplicitPrefix") : t("scriptureReasonExplicitPrefix")) +
        " " +
        bridgeMatches.join(", ") +
        "."
      );
    }

    const topTags = verse.tags.slice(0, mode === "implicit" ? 3 : 2).map(getLocalizedTag);
    if (topTags.length) {
      return (
        (mode === "implicit" ? t("scriptureReasonImplicitPrefix") : t("scriptureReasonExplicitPrefix")) +
        " " +
        topTags.join(", ") +
        "."
      );
    }

    return mode === "implicit" ? t("scriptureReasonImplicitPrefix") : t("scriptureReasonExplicitPrefix");
  }

  function detectCategories(normalizedTopic) {
    const categories = [];

    categoryRules.forEach(function (rule) {
      const matched = rule.keywords.some(function (keyword) {
        return normalizedTopic.includes(normalize(keyword));
      });

      if (matched) {
        categories.push(rule.category);
      }
    });

    return categories;
  }

  function renderScriptureModal() {
    elements.modalSubtitle.textContent =
      t("scriptureModalTopicPrefix") +
      state.topic +
      t("scriptureModalTopicSuffix") +
      " " +
      t("scriptureModalModePrefix") +
      " " +
      getScriptureMatchModeLabel(state.scriptureMatchMode) +
      ".";

    elements.scriptureGrid.innerHTML = "";

    state.suggestions.forEach(function (verse) {
      const localizedReference = getLocalizedVerseReference(verse);
      const localizedText = getLocalizedVerseText(verse);
      const suggestionHint = state.suggestionReasons[verse.id];
      const button = document.createElement("button");
      button.type = "button";
      button.className = "scripture-card";
      button.innerHTML =
        "<strong>" +
        escapeHtml(localizedReference) +
        "</strong>" +
        "<p>" +
        escapeHtml(shortenText(localizedText, 120)) +
        "</p>" +
        (suggestionHint
          ? '<p class="scripture-hint">' + escapeHtml(suggestionHint) + "</p>"
          : "") +
        '<div class="scripture-tags">' +
        verse.tags
          .slice(0, 3)
          .map(function (tag) {
            return "<span>" + escapeHtml(getLocalizedTag(tag)) + "</span>";
          })
          .join("") +
        "</div>";

      button.addEventListener("click", function () {
        applySelectedVerse(verse);
      });

      elements.scriptureGrid.appendChild(button);
    });
  }

  async function applySelectedVerse(verse) {
    state.selectedVerse = verse;
    state.localizedVerseText = getLocalizedVerseText(verse);
    state.localizedReference = getLocalizedVerseReference(verse);
    state.postVariant = 0;

    renderSelectedVerse();
    closeModal(elements.scriptureModal);
    await generatePostContent({ refreshPoster: true, forceRegenerate: true });
  }

  function renderSelectedVerse() {
    elements.selectedVerse.classList.remove("hidden");
    elements.selectedVerse.innerHTML =
      "<h3>" +
      escapeHtml(t("selectedVersePrefix")) +
      " " +
      escapeHtml(state.localizedReference || state.selectedVerse.reference) +
      "</h3>" +
      "<p>" +
      escapeHtml(state.localizedVerseText || state.selectedVerse.text) +
      "</p>";
  }

  function renderPost() {
    elements.postOutput.classList.remove("empty-state");
    elements.postOutput.textContent = state.generatedPost;
    elements.copyPostBtn.disabled = false;
    elements.regeneratePostBtn.disabled = false;
  }

  async function enhanceScriptureSuggestions(topic) {
    showGenerationOverlay(t("generatingScripturesOverlay"), getScriptureGenerationTarget());
    try {
      const payload = await requestScriptureSuggestionsFromServer(topic);
      const verseMap = new Map(
        scriptureLibrary.map(function (verse) {
          return [verse.id, verse];
        })
      );
      const aiReasons = payload.reasons || {};
      const localSuggestions = getSuggestedScripturesLocal(topic);
      const combinedIds = uniqueItems(payload.ids.concat(localSuggestions.verses.map(function (verse) {
        return verse.id;
      }))).slice(0, 8);

      state.suggestions = combinedIds
        .map(function (id) {
          return verseMap.get(id);
        })
        .filter(Boolean);
      state.suggestionReasons = Object.assign({}, localSuggestions.reasons, aiReasons);
      renderScriptureModal();
    } catch {
      // Keep the local suggestion order if AI suggestions are unavailable.
    } finally {
      hideGenerationOverlay();
    }
  }

  async function requestScriptureSuggestionsFromServer(topic) {
    const config = await loadServerConfig();

    if (!config.available || !config.imageEnabled) {
      throw new Error("suggestions-unavailable");
    }

    const response = await fetch("/api/suggest-scriptures", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: topic,
        language: state.language,
        matchMode: state.scriptureMatchMode,
        library: buildLocalizedScriptureCatalog(),
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "suggestions-failed");
    }

    return {
      ids: Array.isArray(payload.ids) ? payload.ids : [],
      reasons: payload.reasons && typeof payload.reasons === "object" ? payload.reasons : {},
    };
  }

  function buildLocalizedScriptureCatalog() {
    return scriptureLibrary.map(function (verse) {
      return {
        id: verse.id,
        reference: getLocalizedVerseReference(verse),
        text: getLocalizedVerseText(verse),
        tags: verse.tags.map(getLocalizedTag),
      };
    });
  }

  function buildPost(topic, verse) {
    const normalizedTopic = normalize(topic);
    const categories = detectCategories(normalizedTopic);
    const combinedCategories = uniqueItems(categories.concat(verse.tags));
    const insights = pickInsights(combinedCategories, topic + verse.id, 3);
    const fallbackPack = getFallbackLanguagePack();
    const stylePack = getFallbackStylePack();
    const intro = pickDeterministic(fallbackPack.intros, topic + verse.reference);
    const closer = pickDeterministic(stylePack.callsToAction, verse.reference + topic + state.postStyle);
    const theologyLine = pickDeterministic(stylePack.theologyLines, verse.id + state.postStyle);
    const storyHook = pickDeterministic(getFallbackStoryHooks(), verse.id + topic + state.postStyle);
    const emojiPair = getFallbackEmojiPair();
    const excerpt = shortenText(state.localizedVerseText || verse.text, 190);
    const hashtags = buildFallbackHashtags(verse.tags);
    const body = prependTopicToPostBody([
      emojiPair.lead + storyHook + " " + intro.replace("{topic}", topic),
      (state.localizedReference || verse.reference) + " " + fallbackPack.reminds + ' "' + excerpt + '"',
      theologyLine + " " + verse.focus,
      insights.join(" "),
      emojiPair.close + closer,
    ].join("\n\n"), topic);
    const finalText = body + "\n\n" + hashtags.join(" ");

    if (finalText.length <= 2000) {
      return finalText;
    }

    const available = Math.max(620, 2000 - hashtags.join(" ").length - 2);
    return shortenText(body, available).replace(/[.,;:!?…\s]+$/u, "") + "\n\n" + hashtags.join(" ");
  }

  function prependTopicToPostBody(body, topic) {
    const cleanBody = String(body || "").trim();
    const cleanTopic = String(topic || "").trim();

    if (!cleanTopic) {
      return cleanBody;
    }

    if (normalize(cleanBody).startsWith(normalize(cleanTopic))) {
      return cleanBody;
    }

    return cleanTopic + "\n\n" + cleanBody;
  }

  function pickInsights(categories, seed, count) {
    const pool = [];

    categories.forEach(function (category) {
      if (insightBank[category]) {
        pool.push.apply(pool, insightBank[category]);
      }
    });

    if (!pool.length) {
      pool.push.apply(pool, insightBank.default);
    }

    const uniquePool = uniqueItems(pool);
    const startIndex = Math.abs(hashString(seed)) % uniquePool.length;
    const chosen = [];

    for (let step = 0; step < uniquePool.length && chosen.length < count; step += 1) {
      chosen.push(uniquePool[(startIndex + step) % uniquePool.length]);
    }

    return chosen;
  }

  async function generatePostContent(options) {
    if (!state.selectedVerse) {
      return;
    }

    const refreshPoster = options && options.refreshPoster;
    const forceRegenerate = options && options.forceRegenerate;

    if (forceRegenerate) {
      state.postVariant += 1;
    }

    state.postPending = true;
    showGenerationOverlay(t("generatingPostOverlay"), elements.textPanel);
    updatePostButtons(true);
    elements.postOutput.classList.add("empty-state");
    elements.postOutput.textContent = t("postGenerating");
    setPostStatus(t("postGenerating"), "loading");

    try {
      const generated = await requestPostFromServer();
      state.generatedPost = generated.post;
      state.localizedVerseText = generated.verseText || state.selectedVerse.text;
      state.localizedReference = generated.reference || state.selectedVerse.reference;

      renderSelectedVerse();
      renderPost();
      setPostStatus(t("postReady"), "ready");
    } catch (error) {
      state.generatedPost = buildPost(state.topic, state.selectedVerse);
      state.localizedVerseText = getLocalizedVerseText(state.selectedVerse);
      state.localizedReference = getLocalizedVerseReference(state.selectedVerse);

      renderSelectedVerse();
      renderPost();
      setPostStatus(t("postFallback") + " " + (error && error.message ? error.message : ""), "warning");
    } finally {
      state.postPending = false;
      updatePostButtons(false);
      updateSummaryLabels();
      hideGenerationOverlay();
    }

    if (refreshPoster) {
      drawWaitingPoster(state.topic, state.localizedReference, t("posterPreparing"));
      await generatePosterBackground();
    }
  }

  async function requestPostFromServer() {
    const config = await loadServerConfig();

    if (!config.available) {
      throw new Error(t("serverUnavailable"));
    }

    if (!config.imageEnabled) {
      throw new Error(t("missingGeminiKey"));
    }

    const response = await fetch("/api/generate-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: state.topic,
        reference: state.localizedReference || state.selectedVerse.reference,
        verseText: state.localizedVerseText || state.selectedVerse.text,
        verseFocus: state.selectedVerse.focus,
        selectionReason: state.suggestionReasons[state.selectedVerse.id] || "",
        tags: state.selectedVerse.tags,
        language: state.language,
        postStyle: state.postStyle,
        allowEmojis: state.allowEmojis,
        variant: state.postVariant,
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || t("postRequestFailed"));
    }

    return payload;
  }

  async function generatePosterBackground() {
    if (!state.selectedVerse) {
      return;
    }

    showGenerationOverlay(t("generatingPosterOverlay"), elements.posterPanel);
    state.posterVariant += 1;
    state.backgroundPending = true;
    updatePosterButtons(true);
    setPosterStatus(t("posterPreparing"), "loading");
    drawWaitingPoster(state.topic, state.localizedReference || state.selectedVerse.reference, t("posterPreparing"));

    const renderToken = state.renderToken + 1;
    state.renderToken = renderToken;

    try {
      const aiBackground = await requestBackgroundFromServer();

      if (state.renderToken !== renderToken) {
        return;
      }

      state.backgroundImageUrl = aiBackground.imageDataUrl;
      state.backgroundSource = aiBackground.provider;
      state.backgroundModel = aiBackground.model;
      state.backgroundPrompt = aiBackground.prompt;

      await renderPosterFromImage(aiBackground.imageDataUrl);

      state.backgroundPending = false;
      updatePosterButtons(false);
      setPosterStatus(
        localizeStatusSentence("posterReadyPrefix") +
          " " +
          friendlyModelName(aiBackground.model) +
          ". " +
          localizeStatusSentence("posterReadySuffix"),
        "ready"
      );
    } catch (error) {
      if (state.renderToken !== renderToken) {
        return;
      }

      state.backgroundPending = false;
      state.backgroundImageUrl = "";
      state.backgroundSource = "fallback";
      renderPosterFallback();
      updatePosterButtons(false);
      setPosterStatus(buildFallbackStatus(error), "warning");
    } finally {
      hideGenerationOverlay();
    }
  }

  async function requestBackgroundFromServer() {
    const config = await loadServerConfig();

    if (!config.available) {
      throw new Error(t("serverUnavailable") + " " + t("openViaServer"));
    }

    if (!config.imageEnabled) {
      throw new Error(t("missingGeminiKey") + " " + t("addGeminiToEnv"));
    }

    const response = await fetch("/api/generate-background", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: state.topic,
        reference: state.localizedReference || state.selectedVerse.reference,
        verseText: state.localizedVerseText || state.selectedVerse.text,
        verseFocus: state.selectedVerse.focus,
        tags: state.selectedVerse.tags,
        postText: state.generatedPost,
        variant: state.posterVariant,
        language: state.language,
        postStyle: state.postStyle,
        posterSettings: state.posterSettings,
        referenceImage: serializeImageAssetForApi(state.referenceImage),
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || t("backgroundRequestFailed"));
    }

    return payload;
  }

  async function renderPosterFromImage(imageUrl) {
    await warmPosterFonts();
    const image = await loadImageAsset(imageUrl);
    const posterTheme = getPosterTheme();

    ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
    drawImageBackground(ctx, image, elements.canvas.width, elements.canvas.height);
    drawLightOverlay(ctx, posterTheme);
    drawPosterText(ctx, {
      topic: "",
      reference: state.localizedReference || state.selectedVerse.reference,
      verseText: shortenText(state.localizedVerseText || state.selectedVerse.text, 220),
      palette: posterTheme,
      settings: state.posterSettings,
    });
    drawPosterLogo(ctx, state.logoImage, state.posterSettings);
  }

  async function renderPosterFallback() {
    if (!state.selectedVerse) {
      return;
    }

    await warmPosterFonts();
    const posterTheme = getPosterTheme();
    const scene = getLocalFallbackScene(state.posterSettings.subject);

    ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
    drawBackground(ctx, scene, posterTheme);
    drawLightOverlay(ctx, posterTheme);
    drawPosterText(ctx, {
      topic: "",
      reference: state.localizedReference || state.selectedVerse.reference,
      verseText: shortenText(state.localizedVerseText || state.selectedVerse.text, 220),
      palette: posterTheme,
      settings: state.posterSettings,
    });
    drawPosterLogo(ctx, state.logoImage, state.posterSettings);
  }

  function getLocalFallbackScene(subject) {
    const sceneMap = {
      landscape: "sunrise",
      sea: "sea",
      forest: "forest",
      mountains: "mountains",
      meadow: "meadow",
      sunrise: "sunrise",
      sunset: "sunrise",
      sky: "sunrise",
      lake: "sea",
      river: "sea",
      desert: "sunrise",
      flowers: "meadow",
      rain: "forest",
      city: "sunrise",
      old_town: "sunrise",
      street: "sunrise",
      architecture: "sunrise",
      interior: "forest",
      people: "meadow",
      couple: "meadow",
      journey: "mountains",
      night: "sea",
      abstract: "sunrise",
      texture: "forest",
    };

    return sceneMap[subject] || posterScenes[
      (Math.abs(hashString(state.topic + (state.selectedVerse ? state.selectedVerse.id : ""))) + state.posterVariant) %
        posterScenes.length
    ];
  }

  function refreshPoster() {
    if (!state.selectedVerse || state.backgroundPending) {
      return;
    }

    void generatePosterBackground();
  }

  function localizeStatusSentence(key) {
    const sentences = {
      ru: {
        posterReadyPrefix: "Фон сгенерирован через",
        posterReadySuffix: "Нажмите «Новый фон», чтобы получить еще один вариант в выбранном стиле.",
      },
      uk: {
        posterReadyPrefix: "Фон згенеровано через",
        posterReadySuffix: "Натисніть «Новий фон», щоб отримати ще один варіант у вибраному стилі.",
      },
      pl: {
        posterReadyPrefix: "Tło wygenerowano przez",
        posterReadySuffix: "Kliknij „Nowe tło”, aby otrzymać kolejny wariant w wybranym stylu.",
      },
      tr: {
        posterReadyPrefix: "Arka plan şu modelle oluşturuldu:",
        posterReadySuffix: "Seçilen stilde yeni bir seçenek için “Yeni arka plan”a basın.",
      },
    };

    const languageSentences = sentences[state.language] || sentences.ru;
    return languageSentences[key] || sentences.ru[key];
  }

  function getPosterTheme() {
    const tags = state.selectedVerse ? state.selectedVerse.tags : [];
    const normalizedTopic = normalize(state.topic);

    if (tags.includes("чистота") || normalizedTopic.includes("чист")) {
      return {
        skyTop: "#dff3f1",
        skyBottom: "#f8efe1",
        accent: "#5e8b8c",
        dark: "#274144",
        glow: "#fff4d8",
      };
    }

    if (tags.includes("брак") || tags.includes("семья")) {
      return {
        skyTop: "#e9d9c6",
        skyBottom: "#faf4ea",
        accent: "#8a6347",
        dark: "#3f2e27",
        glow: "#ffe5b7",
      };
    }

    if (tags.includes("общение") || tags.includes("прощение")) {
      return {
        skyTop: "#dce7f1",
        skyBottom: "#f9f1e4",
        accent: "#5978a0",
        dark: "#2b3c55",
        glow: "#fff0ca",
      };
    }

    return {
      skyTop: "#dcebdc",
      skyBottom: "#f7f0e2",
      accent: "#52745c",
      dark: "#243b2f",
      glow: "#ffe8af",
    };
  }

  function drawPlaceholderPoster() {
    const palette = {
      skyTop: "#dfece6",
      skyBottom: "#f8f2e8",
      accent: "#587561",
      dark: "#244034",
      glow: "#ffe9b6",
    };

    ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
    drawBackground(ctx, "sunrise", palette);
    drawLightOverlay(ctx, palette);
    drawPosterText(ctx, {
      topic: "",
      reference: t("placeholderReference"),
      message: t("placeholderPosterMessage"),
      palette: palette,
      placeholder: true,
      settings: state.posterSettings,
    });
    drawPosterLogo(ctx, state.logoImage, state.posterSettings);
  }

  function drawWaitingPoster(topic, reference, message) {
    const palette = {
      skyTop: "#e2ece7",
      skyBottom: "#f8f3e9",
      accent: "#577060",
      dark: "#244034",
      glow: "#ffe6b4",
    };

    ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
    drawBackground(ctx, "sea", palette);
    drawLightOverlay(ctx, palette);
    drawPosterText(ctx, {
      topic: "",
      reference: reference || t("placeholderReference"),
      message: message || t("waitingPosterMessage"),
      palette: palette,
      placeholder: true,
      settings: state.posterSettings,
    });
    drawPosterLogo(ctx, state.logoImage, state.posterSettings);
  }

  function drawImageBackground(context, image, targetWidth, targetHeight) {
    const imageRatio = image.width / image.height;
    const targetRatio = targetWidth / targetHeight;
    let drawWidth = targetWidth;
    let drawHeight = targetHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imageRatio > targetRatio) {
      drawHeight = targetHeight;
      drawWidth = drawHeight * imageRatio;
      offsetX = (targetWidth - drawWidth) / 2;
    } else {
      drawWidth = targetWidth;
      drawHeight = drawWidth / imageRatio;
      offsetY = (targetHeight - drawHeight) / 2;
    }

    context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  }

  function setPosterStatus(message, tone) {
    elements.posterStatus.textContent = message;
    elements.posterStatus.dataset.tone = tone || "info";
  }

  function friendlyModelName(model) {
    if (model === "gemini-3.1-flash-image-preview") {
      return "Nano Banana 2";
    }

    if (model === "gemini-2.5-flash-image") {
      return "Nano Banana";
    }

    return model || "AI-модель";
  }

  function buildFallbackStatus(error) {
    const fallbackPrefix = {
      ru: "AI-фон сейчас не загрузился, поэтому я оставил локальный спокойный фон.",
      uk: "AI-фон зараз не завантажився, тому я залишив локальний спокійний фон.",
      pl: "Tło AI nie załadowało się, dlatego pozostawiłem lokalne spokojne tło.",
      tr: "AI arka planı şu anda yüklenemedi, bu yüzden yerel sakin bir arka plan bırakıldı.",
    };
    const fallbackSuffix = {
      ru: "Попробуйте еще раз кнопкой «Новый фон».",
      uk: "Спробуйте ще раз кнопкою «Новий фон».",
      pl: "Spróbuj ponownie przyciskiem „Nowe tło”.",
      tr: "“Yeni arka plan” düğmesiyle tekrar deneyin.",
    };
    const language = fallbackPrefix[state.language] ? state.language : "ru";

    return (
      fallbackPrefix[language] +
      " " +
      (error && error.message ? error.message : fallbackSuffix[language])
    );
  }

  function loadImageAsset(src) {
    return new Promise(function (resolve, reject) {
      const image = new Image();
      image.onload = function () {
        resolve(image);
      };
      image.onerror = function () {
        reject(new Error(t("imageLoadFailed")));
      };
      image.src = src;
    });
  }

  function readFileAsDataUrl(file) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(String(reader.result || ""));
      };
      reader.onerror = function () {
        reject(new Error(t("imageUploadFailed")));
      };
      reader.readAsDataURL(file);
    });
  }

  function parseDataUrl(dataUrl) {
    const match = String(dataUrl || "").match(/^data:([^;]+);base64,(.+)$/u);
    if (!match) {
      throw new Error(t("imageUploadFailed"));
    }

    return {
      mimeType: match[1],
      data: match[2],
    };
  }

  async function prepareImageAsset(file, options) {
    const fileType = String(file.type || "").toLowerCase();
    if (!fileType.startsWith("image/")) {
      throw new Error(options.errorMessage || t("imageUploadFailed"));
    }
    if (options.allowedTypes && options.allowedTypes.indexOf(fileType) === -1) {
      throw new Error(options.errorMessage || t("imageUploadFailed"));
    }

    const rawDataUrl = await readFileAsDataUrl(file);
    const rawImage = await loadImageAsset(rawDataUrl);
    const maxDimension = options.maxDimension || Math.max(rawImage.width, rawImage.height);
    const targetMimeType = options.outputMimeType || fileType || "image/png";
    let finalDataUrl = rawDataUrl;
    const needsResize =
      Math.max(rawImage.width, rawImage.height) > maxDimension || rawDataUrl.length > 6_500_000;
    const shouldUseCanvas = needsResize || Boolean(options.trimTransparency);

    if (shouldUseCanvas) {
      const scale = Math.min(1, maxDimension / Math.max(rawImage.width, rawImage.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(rawImage.width * scale));
      canvas.height = Math.max(1, Math.round(rawImage.height * scale));
      const localContext = canvas.getContext("2d");

      if (!localContext) {
        throw new Error(options.errorMessage || t("imageUploadFailed"));
      }

      localContext.drawImage(rawImage, 0, 0, canvas.width, canvas.height);
      const outputCanvas = options.trimTransparency
        ? trimTransparentCanvas(canvas, options.trimPadding || 12)
        : canvas;
      finalDataUrl = outputCanvas.toDataURL(
        targetMimeType,
        targetMimeType === "image/png" ? undefined : 0.9
      );
    }

    const parsed = parseDataUrl(finalDataUrl);
    const finalImage = await loadImageAsset(finalDataUrl);

    return {
      name: file.name,
      mimeType: parsed.mimeType,
      data: parsed.data,
      dataUrl: finalDataUrl,
      width: finalImage.width,
      height: finalImage.height,
      image: finalImage,
    };
  }

  function serializeImageAssetForApi(asset) {
    if (!asset || !asset.data || !asset.mimeType) {
      return null;
    }

    return {
      mimeType: asset.mimeType,
      data: asset.data,
      name: asset.name || "",
    };
  }

  function trimTransparentCanvas(sourceCanvas, padding) {
    const localContext = sourceCanvas.getContext("2d");
    if (!localContext) {
      return sourceCanvas;
    }

    const width = sourceCanvas.width;
    const height = sourceCanvas.height;
    const imageData = localContext.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const alpha = pixels[(y * width + x) * 4 + 3];
        if (alpha > 8) {
          if (x < minX) {
            minX = x;
          }
          if (y < minY) {
            minY = y;
          }
          if (x > maxX) {
            maxX = x;
          }
          if (y > maxY) {
            maxY = y;
          }
        }
      }
    }

    if (maxX < 0 || maxY < 0) {
      return sourceCanvas;
    }

    const safePadding = Math.max(0, Math.round(padding || 0));
    const cropX = Math.max(0, minX - safePadding);
    const cropY = Math.max(0, minY - safePadding);
    const cropWidth = Math.min(width - cropX, maxX - minX + 1 + safePadding * 2);
    const cropHeight = Math.min(height - cropY, maxY - minY + 1 + safePadding * 2);

    if (cropWidth >= width && cropHeight >= height) {
      return sourceCanvas;
    }

    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = Math.max(1, cropWidth);
    croppedCanvas.height = Math.max(1, cropHeight);
    const croppedContext = croppedCanvas.getContext("2d");

    if (!croppedContext) {
      return sourceCanvas;
    }

    croppedContext.drawImage(
      sourceCanvas,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    return croppedCanvas;
  }

  function warmPosterFonts() {
    if (!document.fonts || typeof document.fonts.load !== "function") {
      return Promise.resolve();
    }

    if (posterFontWarmupPromise) {
      return posterFontWarmupPromise;
    }

    const sample = "Абвг Ґґ Єє Іі Її Łł Ąą Ęę Ńń Óó Śś Źź Żż Çç Ğğ İı Öö Şş Üü";
    const fonts = [
      "700 64px 'Noto Sans'",
      "700 64px 'Noto Serif'",
      "800 64px 'Manrope'",
      "700 64px 'Montserrat'",
      "700 64px 'PT Serif'",
      "700 64px 'Lora'",
      "700 64px 'Merriweather'",
      "700 64px 'Source Serif 4'",
      "700 64px 'Playfair Display'",
      "700 64px 'Cormorant Garamond'",
      "500 64px 'Oswald'",
      "700 64px 'Roboto Slab'",
    ];

    posterFontWarmupPromise = Promise.all(
      fonts.map(function (font) {
        return document.fonts.load(font, sample);
      })
    ).catch(function () {
      return [];
    });

    return posterFontWarmupPromise;
  }

  async function loadServerConfig(forceReload) {
    if (state.serverConfig && !forceReload) {
      return state.serverConfig;
    }

    if (state.serverConfigPromise && !forceReload) {
      return state.serverConfigPromise;
    }

    state.serverConfigPromise = fetch("/api/config")
      .then(function (response) {
        if (!response.ok) {
          throw new Error(t("configRequestFailed"));
        }

        return response.json();
      })
      .then(function (config) {
        state.serverConfig = config;
        setPosterStatus(describeServerState(config), config.imageEnabled ? "ready" : "warning");
        return config;
      })
      .catch(function () {
        const fallbackConfig = {
          available: false,
          imageEnabled: false,
          model: "",
        };

        state.serverConfig = fallbackConfig;
        setPosterStatus(describeServerState(fallbackConfig), "warning");
        return fallbackConfig;
      })
      .finally(function () {
        state.serverConfigPromise = null;
      });

    return state.serverConfigPromise;
  }

  function describeServerState(config) {
    if (!config.available) {
      return {
        ru: "AI-фон недоступен из этого запуска. Откройте приложение через node server.js.",
        uk: "AI-фон недоступний з цього запуску. Відкрийте застосунок через node server.js.",
        pl: "Tło AI jest niedostępne w tym uruchomieniu. Otwórz aplikację przez node server.js.",
        tr: "AI arka planı bu başlatmada kullanılamıyor. Uygulamayı node server.js ile açın.",
      }[state.language] || "AI-фон недоступен из этого запуска. Откройте приложение через node server.js.";
    }

    if (!config.imageEnabled) {
      return {
        ru: "Сервер запущен, но ключ Gemini не найден. Добавьте GEMINI_API_KEY в .env, чтобы включить Nano Banana.",
        uk: "Сервер запущено, але ключ Gemini не знайдено. Додайте GEMINI_API_KEY у .env, щоб увімкнути Nano Banana.",
        pl: "Serwer działa, ale nie znaleziono klucza Gemini. Dodaj GEMINI_API_KEY do .env, aby włączyć Nano Banana.",
        tr: "Sunucu çalışıyor, ancak Gemini anahtarı bulunamadı. Nano Banana'yı açmak için .env dosyasına GEMINI_API_KEY ekleyin.",
      }[state.language] || "Сервер запущен, но ключ Gemini не найден. Добавьте GEMINI_API_KEY в .env, чтобы включить Nano Banana.";
    }

    return {
      ru: "AI-фон включен: " + friendlyModelName(config.model) + ". После выбора стиха фон будет генерироваться автоматически.",
      uk: "AI-фон увімкнено: " + friendlyModelName(config.model) + ". Після вибору вірша фон генеруватиметься автоматично.",
      pl: "Tło AI jest włączone: " + friendlyModelName(config.model) + ". Po wybraniu wersetu tło będzie generowane automatycznie.",
      tr: "AI arka planı açık: " + friendlyModelName(config.model) + ". Ayet seçildikten sonra arka plan otomatik oluşturulacak.",
    }[state.language] || "AI-фон включен: " + friendlyModelName(config.model) + ". После выбора стиха фон будет генерироваться автоматически.";
  }

  function drawBackground(context, scene, palette) {
    const width = elements.canvas.width;
    const height = elements.canvas.height;

    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, palette.skyTop);
    gradient.addColorStop(1, palette.skyBottom);

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    context.save();
    context.globalAlpha = 0.88;

    const sunGradient = context.createRadialGradient(width * 0.74, height * 0.18, 20, width * 0.74, height * 0.18, 190);
    sunGradient.addColorStop(0, palette.glow);
    sunGradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = sunGradient;
    context.beginPath();
    context.arc(width * 0.74, height * 0.18, 220, 0, Math.PI * 2);
    context.fill();

    if (scene === "sea") {
      drawSeaScene(context, palette, width, height);
    } else if (scene === "forest") {
      drawForestScene(context, palette, width, height);
    } else if (scene === "mountains") {
      drawMountainScene(context, palette, width, height);
    } else if (scene === "meadow") {
      drawMeadowScene(context, palette, width, height);
    } else {
      drawSunriseScene(context, palette, width, height);
    }

    context.restore();
  }

  function drawSeaScene(context, palette, width, height) {
    context.fillStyle = "rgba(255,255,255,0.24)";
    context.fillRect(0, height * 0.55, width, height * 0.45);

    context.fillStyle = palette.accent;
    context.globalAlpha = 0.32;
    drawWave(context, width, height * 0.63, 36, 0.013);
    context.globalAlpha = 0.24;
    drawWave(context, width, height * 0.7, 48, 0.017);
    context.globalAlpha = 0.2;
    drawWave(context, width, height * 0.78, 54, 0.02);
  }

  function drawForestScene(context, palette, width, height) {
    context.fillStyle = "rgba(255,255,255,0.1)";
    context.fillRect(0, height * 0.62, width, height * 0.38);

    context.globalAlpha = 0.34;
    context.fillStyle = palette.accent;
    for (let x = 0; x <= width; x += 120) {
      drawTree(context, x + 40, height * 0.82, 130);
    }

    context.globalAlpha = 0.22;
    context.fillStyle = palette.dark;
    for (let x = -40; x <= width; x += 90) {
      drawTree(context, x + 50, height * 0.9, 92);
    }
  }

  function drawMountainScene(context, palette, width, height) {
    context.globalAlpha = 0.22;
    context.fillStyle = palette.accent;
    drawMountain(context, width * 0.05, height * 0.75, width * 0.42, height * 0.32);
    drawMountain(context, width * 0.28, height * 0.78, width * 0.38, height * 0.28);
    context.globalAlpha = 0.32;
    context.fillStyle = palette.dark;
    drawMountain(context, width * 0.12, height * 0.88, width * 0.52, height * 0.34);
    drawMountain(context, width * 0.48, height * 0.9, width * 0.44, height * 0.3);
  }

  function drawMeadowScene(context, palette, width, height) {
    context.globalAlpha = 0.18;
    context.fillStyle = palette.accent;
    context.beginPath();
    context.moveTo(0, height * 0.7);
    context.quadraticCurveTo(width * 0.25, height * 0.6, width * 0.5, height * 0.72);
    context.quadraticCurveTo(width * 0.75, height * 0.82, width, height * 0.7);
    context.lineTo(width, height);
    context.lineTo(0, height);
    context.closePath();
    context.fill();

    context.globalAlpha = 0.28;
    context.fillStyle = palette.dark;
    context.beginPath();
    context.moveTo(0, height * 0.82);
    context.quadraticCurveTo(width * 0.22, height * 0.74, width * 0.52, height * 0.88);
    context.quadraticCurveTo(width * 0.75, height * 0.98, width, height * 0.84);
    context.lineTo(width, height);
    context.lineTo(0, height);
    context.closePath();
    context.fill();

    context.globalAlpha = 0.14;
    context.strokeStyle = "#ffffff";
    context.lineWidth = 3;
    for (let x = 90; x < width; x += 95) {
      context.beginPath();
      context.moveTo(x, height * 0.84);
      context.quadraticCurveTo(x - 14, height * 0.74, x + 10, height * 0.65);
      context.stroke();
    }
  }

  function drawSunriseScene(context, palette, width, height) {
    context.globalAlpha = 0.18;
    context.fillStyle = palette.accent;
    context.beginPath();
    context.arc(width * 0.5, height * 0.8, width * 0.58, Math.PI, 0);
    context.fill();

    context.globalAlpha = 0.24;
    context.fillStyle = palette.dark;
    context.beginPath();
    context.arc(width * 0.5, height * 0.92, width * 0.62, Math.PI, 0);
    context.fill();
  }

  function drawLightOverlay(context, palette) {
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const overlay = context.createLinearGradient(0, 0, 0, height);
    overlay.addColorStop(0, "rgba(14, 20, 18, 0.36)");
    overlay.addColorStop(0.26, "rgba(14, 20, 18, 0.08)");
    overlay.addColorStop(0.58, "rgba(255, 255, 255, 0.02)");
    overlay.addColorStop(1, "rgba(12, 16, 15, 0.32)");

    context.fillStyle = overlay;
    context.fillRect(0, 0, width, height);

    const topGlow = context.createRadialGradient(width * 0.5, 160, 20, width * 0.5, 160, 320);
    topGlow.addColorStop(0, "rgba(255,255,255,0.18)");
    topGlow.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = topGlow;
    context.beginPath();
    context.arc(width * 0.5, 160, 320, 0, Math.PI * 2);
    context.fill();
  }

  function drawPosterLogo(context, logoAsset, settings) {
    if (!logoAsset || !logoAsset.image) {
      return;
    }

    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const opacity = clamp((settings.logoOpacity || 100) / 100, 0.2, 1);
    const sizeFactor = clamp((settings.logoSize || 14) / 100, 0.08, 0.34);
    const maxLogoWidth = width * sizeFactor;
    const ratio = logoAsset.image.width / logoAsset.image.height || 1;
    const maxLogoHeight = height * Math.max(0.12, sizeFactor * 1.45);
    let logoWidth = maxLogoWidth;
    let logoHeight = maxLogoWidth / ratio;

    if (logoHeight > maxLogoHeight) {
      logoHeight = maxLogoHeight;
      logoWidth = logoHeight * ratio;
    }
    const margin = Math.round(Math.min(width, height) * 0.045);
    const position = settings.logoPosition || "bottom_right";
    let x = margin;
    let y = margin;

    if (position === "top_center" || position === "middle_center" || position === "bottom_center") {
      x = (width - logoWidth) / 2;
    } else if (position === "top_right" || position === "bottom_right") {
      x = width - margin - logoWidth;
    }

    if (position === "middle_center") {
      y = (height - logoHeight) / 2;
    } else if (position === "bottom_left" || position === "bottom_center" || position === "bottom_right") {
      y = height - margin - logoHeight;
    }

    context.save();
    context.globalAlpha = opacity;
    context.shadowColor = "rgba(255, 248, 240, 0.26)";
    context.shadowBlur = 18;
    context.shadowOffsetY = 0;
    context.drawImage(logoAsset.image, x, y, logoWidth, logoHeight);
    context.shadowColor = "rgba(17, 21, 18, 0.28)";
    context.shadowBlur = 24;
    context.shadowOffsetY = 10;
    context.drawImage(logoAsset.image, x, y, logoWidth, logoHeight);
    context.restore();
  }

  function drawPosterText(context, data) {
    const width = elements.canvas.width;
    const settings = data.settings || state.posterSettings;
    const typographyPreset = getTypographyPreset(settings.typography);
    const layoutPreset = getLayoutPreset(settings.layout, data.placeholder);
    const layoutMode = String(settings.layout || "top");
    const hasTopic = Boolean(data.topic && data.topic.trim());
    const baseContentStartY = hasTopic
      ? layoutPreset.verseStartY
      : layoutPreset.verseStartY - layoutPreset.topiclessOffset;
    const textOpacity = clamp((settings.textOpacity || 92) / 100, 0.55, 1);
    const strokeStrength = clamp((settings.strokeStrength || 68) / 100, 0, 1);
    const fillColor = "rgba(22, 20, 18, " + textOpacity.toFixed(2) + ")";
    const strokeColor = "rgba(255, 248, 240, " + (strokeStrength * 0.9).toFixed(2) + ")";

    context.save();
    context.textAlign = "center";
    context.lineJoin = "round";
    context.fillStyle = fillColor;
    context.strokeStyle = strokeColor;

    if (hasTopic) {
      context.font = typographyPreset.topicFont;
      context.lineWidth = 6 + strokeStrength * 8;
      strokeFillText(context, data.topic, width / 2, layoutPreset.topicY);
    }

    if (data.placeholder && data.message) {
      context.font = typographyPreset.placeholderFont;
      const messageLines = buildWrappedLines(context, data.message, layoutPreset.verseMaxWidth);
      const messageBlockHeight =
        Math.max(0, (messageLines.length - 1) * layoutPreset.verseLineHeight) + layoutPreset.referenceGap;
      const contentStartY = resolveContentStartY(layoutMode, baseContentStartY, layoutPreset, messageBlockHeight);
      context.lineWidth = 8 + strokeStrength * 8;
      const messageMetrics = drawWrappedText(
        context,
        data.message,
        width / 2,
        contentStartY,
        layoutPreset.verseMaxWidth,
        layoutPreset.verseLineHeight,
        true
      );

      context.font = typographyPreset.referenceFont;
      context.lineWidth = 6 + strokeStrength * 8;
      strokeFillText(context, data.reference, width / 2, messageMetrics.endY + layoutPreset.referenceGap);
    } else {
      context.font = typographyPreset.verseFont;
      const verseLines = buildWrappedLines(context, data.verseText, layoutPreset.verseMaxWidth);
      const verseBlockHeight =
        Math.max(0, (verseLines.length - 1) * layoutPreset.verseLineHeight) + layoutPreset.referenceGap;
      const contentStartY = resolveContentStartY(layoutMode, baseContentStartY, layoutPreset, verseBlockHeight);
      context.lineWidth = 8 + strokeStrength * 10;
      const verseMetrics = drawWrappedText(
        context,
        data.verseText,
        width / 2,
        contentStartY,
        layoutPreset.verseMaxWidth,
        layoutPreset.verseLineHeight,
        true
      );

      context.font = typographyPreset.referenceFont;
      context.lineWidth = 6 + strokeStrength * 8;
      strokeFillText(context, data.reference, width / 2, verseMetrics.endY + layoutPreset.referenceGap);
    }

    context.restore();
  }

  function resolveContentStartY(layoutMode, baseContentStartY, layoutPreset, blockHeight) {
    if (layoutMode === "center") {
      return layoutPreset.contentAnchorY - blockHeight / 2;
    }

    if (layoutMode === "bottom") {
      return layoutPreset.contentAnchorY - blockHeight;
    }

    return baseContentStartY;
  }

  function drawWave(context, width, baseline, amplitude, frequency) {
    const height = elements.canvas.height;
    context.beginPath();
    context.moveTo(0, baseline);
    for (let x = 0; x <= width; x += 10) {
      const y = baseline + Math.sin(x * frequency) * amplitude;
      context.lineTo(x, y);
    }
    context.lineTo(width, height);
    context.lineTo(0, height);
    context.closePath();
    context.fill();
  }

  function drawTree(context, x, y, size) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + size * 0.22, y - size * 0.82);
    context.lineTo(x + size * 0.44, y);
    context.closePath();
    context.fill();
  }

  function drawMountain(context, x, baseY, width, height) {
    context.beginPath();
    context.moveTo(x, baseY);
    context.lineTo(x + width * 0.52, baseY - height);
    context.lineTo(x + width, baseY);
    context.closePath();
    context.fill();
  }

  function buildWrappedLines(context, text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach(function (word) {
      const candidate = currentLine ? currentLine + " " + word : word;
      const measuredWidth = context.measureText(candidate).width;

      if (measuredWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = candidate;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  function drawWrappedText(context, text, centerX, startY, maxWidth, lineHeight, withStroke) {
    const lines = buildWrappedLines(context, text, maxWidth);

    lines.forEach(function (line, index) {
      const y = startY + index * lineHeight;

      if (withStroke) {
        context.strokeText(line, centerX, y);
      }

      context.fillText(line, centerX, y);
    });

    return {
      lines: lines,
      endY: startY + (lines.length - 1) * lineHeight,
    };
  }

  function roundRect(context, x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
  }

  function strokeFillText(context, text, x, y) {
    context.strokeText(text, x, y);
    context.fillText(text, x, y);
  }

  function copyPost() {
    if (!state.generatedPost) {
      return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(state.generatedPost).then(showCopySuccess, fallbackCopyPost);
      return;
    }

    fallbackCopyPost();
  }

  function downloadPoster() {
    if (!state.selectedVerse) {
      return;
    }

    const fileSlug = slugify(state.topic || state.selectedVerse.reference);
    const link = document.createElement("a");
    link.href = elements.canvas.toDataURL("image/png");
    link.download = fileSlug + ".png";
    link.click();
  }

  function openModal(modalElement) {
    modalElement.classList.remove("hidden");
    modalElement.setAttribute("aria-hidden", "false");
    modalElement.scrollTop = 0;
    const dialog = modalElement.querySelector(".modal-dialog");
    if (dialog instanceof HTMLElement) {
      dialog.scrollTop = 0;
    }
    syncModalScrollLock();
  }

  function closeModal(modalElement) {
    modalElement.classList.add("hidden");
    modalElement.setAttribute("aria-hidden", "true");
    syncModalScrollLock();
  }

  function getScriptureGenerationTarget() {
    const dialog = elements.scriptureModal
      ? elements.scriptureModal.querySelector(".modal-dialog")
      : null;

    if (
      dialog instanceof HTMLElement &&
      !elements.scriptureModal.classList.contains("hidden")
    ) {
      return dialog;
    }

    return elements.inputPanel;
  }

  function showGenerationOverlay(message, targetElement) {
    const target = targetElement instanceof HTMLElement ? targetElement : document.body;
    let overlay = document.getElementById("generation-overlay");

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "generation-overlay";
      overlay.className = "generation-overlay hidden";
      overlay.setAttribute("role", "status");
      overlay.setAttribute("aria-live", "polite");
      overlay.setAttribute("aria-hidden", "true");
      overlay.innerHTML =
        '<div class="generation-overlay-badge" data-generation-message></div>';
    }

    if (activeGenerationTarget && activeGenerationTarget !== target) {
      activeGenerationTarget.classList.remove("is-generating");
    }

    if (overlay.parentElement !== target) {
      target.appendChild(overlay);
    }

    activeGenerationTarget = target;
    activeGenerationTarget.classList.add("is-generating");

    const messageNode = overlay.querySelector("[data-generation-message]");
    if (messageNode) {
      messageNode.textContent = message;
    }

    overlay.classList.remove("hidden");
    overlay.setAttribute("aria-hidden", "false");
  }

  function hideGenerationOverlay() {
    const overlay = document.getElementById("generation-overlay");
    if (!overlay) {
      return;
    }

    overlay.classList.add("hidden");
    overlay.setAttribute("aria-hidden", "true");

    if (activeGenerationTarget) {
      activeGenerationTarget.classList.remove("is-generating");
      activeGenerationTarget = null;
    }
  }

  function syncModalScrollLock() {
    const hasOpenModal = Array.from(document.querySelectorAll(".modal")).some(function (modal) {
      return !modal.classList.contains("hidden");
    });
    document.body.classList.toggle("modal-open", hasOpenModal);
  }

  function handleModalBackdrop(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const modalId = target.dataset.modalClose;
    if (modalId) {
      closeModal(document.getElementById(modalId));
    }
  }

  function resetGeneratedOutput(topic) {
    state.generatedPost = "";
    state.localizedVerseText = "";
    state.localizedReference = "";
    state.postPending = false;
    state.backgroundImageUrl = "";
    state.backgroundSource = "fallback";
    state.backgroundModel = "";
    state.backgroundPrompt = "";
    state.backgroundPending = false;
    state.renderToken += 1;

    elements.selectedVerse.classList.add("hidden");
    elements.selectedVerse.innerHTML = "";
    elements.postOutput.classList.add("empty-state");
    elements.postOutput.textContent =
      t("postWaiting") + ' "' + topic + '".';
    elements.copyPostBtn.disabled = true;
    elements.regeneratePostBtn.disabled = true;
    elements.newPosterBtn.disabled = true;
    elements.newPosterBtn.textContent = t("newPoster");
    elements.downloadBtn.disabled = true;
    drawWaitingPoster(topic || t("placeholderTheme"), t("placeholderReference"), t("posterWaiting"));
    setPostStatus("", "info");
    setPosterStatus(t("posterAwaiting"), "info");
    updateSummaryLabels();
  }

  function showCopySuccess() {
    const originalText = elements.copyPostBtn.textContent;
    elements.copyPostBtn.textContent = t("copied");
    setTimeout(function () {
      elements.copyPostBtn.textContent = originalText;
    }, 1600);
  }

  function fallbackCopyPost() {
    const helper = document.createElement("textarea");
    helper.value = state.generatedPost;
    helper.setAttribute("readonly", "true");
    helper.style.position = "absolute";
    helper.style.left = "-9999px";
    document.body.appendChild(helper);
    helper.select();

    try {
      document.execCommand("copy");
      showCopySuccess();
    } finally {
      document.body.removeChild(helper);
    }
  }

  function t(key) {
    return uiStrings[state.language][key] || uiStrings.ru[key] || key;
  }

  function applyTranslations() {
    document.documentElement.lang = state.language;
    document.title = t("appTitle");
    elements.heroKicker.textContent = t("heroKicker");
    elements.heroTitle.textContent = t("heroTitle");
    elements.heroDescription.textContent = t("heroDescription");
    elements.heroCardTitle.textContent = t("heroCardTitle");
    elements.heroStep1.textContent = t("heroStep1");
    elements.heroStep2.textContent = t("heroStep2");
    elements.heroStep3.textContent = t("heroStep3");
    elements.supportTeaserTitle.textContent = t("supportTeaserTitle");
    elements.supportTeaserCopy.textContent = t("supportTeaserCopy");
    elements.supportOpenBtn.textContent = t("supportTeaserButton");
    elements.step1Eyebrow.textContent = t("step1Eyebrow");
    elements.step1Title.textContent = t("step1Title");
    elements.step2Eyebrow.textContent = t("step2Eyebrow");
    elements.step2Title.textContent = t("step2Title");
    elements.step3Eyebrow.textContent = t("step3Eyebrow");
    elements.step3Title.textContent = t("step3Title");
    elements.scriptureModeBtn.textContent = getScriptureMatchModeButtonLabel(state.scriptureMatchMode);
    elements.topicLabel.textContent = t("topicLabel");
    elements.topicInput.placeholder = t("topicPlaceholder");
    elements.topicSubmitBtn.textContent = t("topicSubmit");
    elements.surpriseBtn.textContent = t("surpriseTopic");
    elements.copyPostBtn.textContent = t("copyPost");
    elements.postStyleBtn.textContent = t("postStyleButton");
    updateEmojiButton();
    elements.regeneratePostBtn.textContent = t("regeneratePost");
    elements.referenceUploadBtn.textContent = t("referenceUploadButton");
    elements.posterSettingsBtn.textContent = t("posterSettingsButton");
    elements.newPosterBtn.textContent = state.backgroundPending ? t("generatingPoster") : t("newPoster");
    elements.downloadBtn.textContent = t("downloadPng");
    elements.scriptureModalEyebrow.textContent = t("scriptureModalEyebrow");
    elements.scriptureModalTitle.textContent = t("scriptureModalTitle");
    elements.scriptureModeEyebrow.textContent = t("scriptureModeEyebrow");
    elements.scriptureModeTitle.textContent = t("scriptureModeTitle");
    elements.scriptureModeSubtitle.textContent = t("scriptureModeSubtitle");
    elements.languageModalEyebrow.textContent = t("languageModalEyebrow");
    elements.languageModalTitle.textContent = t("languageModalTitle");
    elements.languageModalSubtitle.textContent = t("languageModalSubtitle");
    elements.supportModalEyebrow.textContent = t("supportModalEyebrow");
    elements.supportModalTitle.textContent = t("supportModalTitle");
    elements.supportModalSubtitle.textContent = t("supportModalSubtitle");
    elements.supportModalIntro.textContent = t("supportModalIntro");
    elements.supportMonobankCopy.textContent = t("supportMonobankCopy");
    elements.supportBuyMeCopy.textContent = t("supportBuyMeCopy");
    elements.supportPayPalCopy.textContent = t("supportPayPalCopy");
    elements.supportMonobankLink.textContent = t("supportOpenLink");
    elements.supportBuyMeLink.textContent = t("supportOpenLink");
    elements.supportPayPalNote.textContent = t("supportQrOnly");
    elements.postStyleModalEyebrow.textContent = t("postStyleModalEyebrow");
    elements.postStyleModalTitle.textContent = t("postStyleModalTitle");
    elements.postStyleModalSubtitle.textContent = t("postStyleModalSubtitle");
    elements.posterSettingsEyebrow.textContent = t("posterSettingsEyebrow");
    elements.posterSettingsTitle.textContent = t("posterSettingsTitle");
    elements.posterSettingsSubtitle.textContent = t("posterSettingsSubtitle");
    elements.posterFormatLabel.textContent = t("posterFormatLabel");
    elements.posterSubjectLabel.textContent = t("posterSubjectLabel");
    elements.posterVisualStyleLabel.textContent = t("posterVisualStyleLabel");
    elements.posterTypographyLabel.textContent = t("posterTypographyLabel");
    elements.posterLayoutLabel.textContent = t("posterLayoutLabel");
    elements.posterOpacityLabel.textContent = t("posterOpacityLabel");
    elements.posterStrokeLabel.textContent = t("posterStrokeLabel");
    elements.posterReferenceLabel.textContent = t("posterReferenceLabel");
    elements.posterReferenceUploadBtn.textContent = t("posterReferenceUpload");
    elements.posterReferenceClearBtn.textContent = t("posterReferenceClear");
    elements.posterLogoLabel.textContent = t("posterLogoLabel");
    elements.posterLogoUploadBtn.textContent = t("posterLogoUpload");
    elements.posterLogoClearBtn.textContent = t("posterLogoClear");
    elements.posterLogoPositionLabel.textContent = t("posterLogoPositionLabel");
    elements.posterLogoSizeLabel.textContent = t("posterLogoSizeLabel");
    elements.posterLogoOpacityLabel.textContent = t("posterLogoOpacityLabel");
    elements.posterSettingsApplyBtn.textContent = t("posterApply");
    elements.posterSettingsResetBtn.textContent = t("posterReset");
    updateLanguageButton();
    renderLanguageOptions();
    renderScriptureModeOptions();
    renderPostStyleOptions();
    populatePosterSettingSelects();
    updateSummaryLabels();
    updateAssetMetaLabels();

    if (!state.selectedVerse && !state.topic) {
      elements.postOutput.textContent = t("postEmpty");
      drawPlaceholderPoster();
    }
  }

  function renderLanguageOptions() {
    elements.languageGrid.innerHTML = "";

    languageOptions.forEach(function (option) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-card" + (state.language === option.id ? " is-selected" : "");
      button.innerHTML = "<strong>" + option.nativeLabel + "</strong>";
      button.addEventListener("click", function () {
        applyLanguage(option.id);
      });
      elements.languageGrid.appendChild(button);
    });
  }

  function renderScriptureModeOptions() {
    elements.scriptureModeGrid.innerHTML = "";

    scriptureMatchOptions.forEach(function (option) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-card" + (state.scriptureMatchMode === option.id ? " is-selected" : "");
      button.innerHTML =
        "<strong>" +
        escapeHtml(getScriptureMatchModeLabel(option.id)) +
        "</strong><p>" +
        escapeHtml(getScriptureMatchModeDescription(option.id)) +
        "</p>";
      button.addEventListener("click", function () {
        applyScriptureMatchMode(option.id);
      });
      elements.scriptureModeGrid.appendChild(button);
    });
  }

  function renderPostStyleOptions() {
    elements.postStyleGrid.innerHTML = "";

    postStyleOptions.forEach(function (option) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-card" + (state.postStyle === option.id ? " is-selected" : "");
      button.innerHTML =
        "<strong>" +
        escapeHtml(getPostStyleLabel(option.id)) +
        "</strong><p>" +
        escapeHtml(getPostStyleDescription(option.id)) +
        "</p>";
      button.addEventListener("click", function () {
        applyPostStyle(option.id);
      });
      elements.postStyleGrid.appendChild(button);
    });
  }

  function populatePosterSettingSelects() {
    populateSelect(
      elements.posterFormatSelect,
      posterFormatOptions.map(function (option) {
        return { value: option.id, label: getPosterFormatLabel(option.id) };
      }),
      state.posterSettings.format
    );
    populateSelect(
      elements.posterSubjectSelect,
      posterSubjectOptions.map(function (option) {
        return { value: option.id, label: getPosterSubjectLabel(option.id) };
      }),
      state.posterSettings.subject
    );
    populateSelect(
      elements.posterVisualStyleSelect,
      posterVisualStyleOptions.map(function (option) {
        return { value: option.id, label: getPosterVisualStyleLabel(option.id) };
      }),
      state.posterSettings.visualStyle
    );
    populateSelect(
      elements.posterTypographySelect,
      typographyOptions.map(function (option) {
        return { value: option.id, label: getTypographyLabel(option.id) };
      }),
      state.posterSettings.typography
    );
    populateSelect(
      elements.posterLayoutSelect,
      layoutOptions.map(function (option) {
        return { value: option.id, label: getLayoutLabel(option.id) };
      }),
      state.posterSettings.layout
    );
    populateSelect(
      elements.posterLogoPositionSelect,
      logoPositionOptions.map(function (option) {
        return { value: option.id, label: getLogoPositionLabel(option.id) };
      }),
      state.posterSettings.logoPosition
    );
    syncPosterSettingsForm();
  }

  function populateSelect(select, items, selectedValue) {
    const previousValue = selectedValue || select.value;
    select.innerHTML = "";

    items.forEach(function (item) {
      const option = document.createElement("option");
      option.value = item.value;
      option.textContent = item.label;
      if (item.value === previousValue) {
        option.selected = true;
      }
      select.appendChild(option);
    });
  }

  function syncPosterSettingsForm() {
    elements.posterFormatSelect.value = state.posterSettings.format;
    elements.posterSubjectSelect.value = state.posterSettings.subject;
    elements.posterVisualStyleSelect.value = state.posterSettings.visualStyle;
    elements.posterTypographySelect.value = state.posterSettings.typography;
    elements.posterLayoutSelect.value = state.posterSettings.layout;
    elements.posterLogoPositionSelect.value = state.posterSettings.logoPosition;
    elements.posterOpacityRange.value = String(Math.round(state.posterSettings.textOpacity));
    elements.posterStrokeRange.value = String(Math.round(state.posterSettings.strokeStrength));
    elements.posterLogoSizeRange.value = String(Math.round(state.posterSettings.logoSize));
    elements.posterLogoOpacityRange.value = String(Math.round(state.posterSettings.logoOpacity));
    updatePosterRangeOutputs();
  }

  function updatePosterRangeOutputs() {
    elements.posterOpacityValue.textContent = elements.posterOpacityRange.value + "%";
    elements.posterStrokeValue.textContent = elements.posterStrokeRange.value + "%";
    elements.posterLogoSizeValue.textContent = elements.posterLogoSizeRange.value + "%";
    elements.posterLogoOpacityValue.textContent = elements.posterLogoOpacityRange.value + "%";
  }

  function updateLanguageButton() {
    elements.languageBtn.textContent = languageOptions.find(function (option) {
      return option.id === state.language;
    }).nativeLabel;
  }

  function updateEmojiButton() {
    elements.emojiToggleBtn.textContent = state.allowEmojis ? t("emojiToggleOn") : t("emojiToggleOff");
  }

  function updateAssetMetaLabels() {
    elements.posterReferenceName.textContent = state.referenceImage
      ? state.referenceImage.name
      : t("posterReferenceEmpty");
    elements.posterLogoName.textContent = state.logoImage ? state.logoImage.name : t("posterLogoEmpty");
    elements.posterReferenceClearBtn.disabled = !state.referenceImage;
    elements.posterLogoClearBtn.disabled = !state.logoImage;
  }

  function openReferenceUploadDialog() {
    elements.referenceUploadInput.click();
  }

  function openLogoUploadDialog() {
    elements.logoInput.click();
  }

  async function handleReferenceUpload(event) {
    const file = event.target.files && event.target.files[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    try {
      state.referenceImage = await prepareImageAsset(file, {
        maxDimension: 1600,
        outputMimeType: "image/jpeg",
        errorMessage: t("imageUploadFailed"),
      });
      updateAssetMetaLabels();
      updateSummaryLabels();
      setPosterStatus(t("referenceAppliedStatus"), "ready");

      if (state.selectedVerse) {
        void generatePosterBackground();
      }
    } catch (error) {
      setPosterStatus(error && error.message ? error.message : t("imageUploadFailed"), "warning");
    }
  }

  async function handleLogoUpload(event) {
    const file = event.target.files && event.target.files[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    try {
      state.logoImage = await prepareImageAsset(file, {
        maxDimension: 720,
        outputMimeType: "image/png",
        allowedTypes: ["image/png"],
        trimTransparency: true,
        trimPadding: 16,
        errorMessage: t("logoUploadFailed"),
      });
      updateAssetMetaLabels();
      updateSummaryLabels();
      setPosterStatus(t("logoAppliedStatus"), "ready");
      rerenderCurrentPoster();
    } catch (error) {
      setPosterStatus(error && error.message ? error.message : t("logoUploadFailed"), "warning");
    }
  }

  function clearReferenceImage() {
    if (!state.referenceImage) {
      return;
    }

    state.referenceImage = null;
    updateAssetMetaLabels();
    updateSummaryLabels();
    setPosterStatus(t("referenceClearedStatus"), "ready");

    if (state.selectedVerse) {
      void generatePosterBackground();
    }
  }

  function clearLogoImage() {
    if (!state.logoImage) {
      return;
    }

    state.logoImage = null;
    updateAssetMetaLabels();
    updateSummaryLabels();
    setPosterStatus(t("logoClearedStatus"), "ready");
    rerenderCurrentPoster();
  }

  function rerenderCurrentPoster() {
    if (!state.selectedVerse) {
      drawPlaceholderPoster();
      return;
    }

    if (state.backgroundImageUrl) {
      void renderPosterFromImage(state.backgroundImageUrl).catch(function () {
        void renderPosterFallback();
      });
      return;
    }

    void renderPosterFallback();
  }

  async function applyLanguage(language) {
    if (state.language === language) {
      closeModal(elements.languageModal);
      return;
    }

    const previousLanguage = state.language;
    const rawTopicInput = elements.topicInput.value.trim();
    const hadSubmittedTopic = Boolean(state.topic);
    const translationToken = state.topicTranslationToken + 1;
    state.topicTranslationToken = translationToken;
    state.language = language;
    applyTranslations();
    closeModal(elements.languageModal);

    let translatedTopic = rawTopicInput;
    if (rawTopicInput) {
      translatedTopic = await translateTopicForLanguage(rawTopicInput, previousLanguage, language);
      if (state.topicTranslationToken !== translationToken) {
        return;
      }

      if (translatedTopic) {
        elements.topicInput.value = translatedTopic;
      }

      if (hadSubmittedTopic) {
        state.topic = translatedTopic || rawTopicInput;
      }
    }

    if (state.selectedVerse) {
      state.localizedVerseText = getLocalizedVerseText(state.selectedVerse);
      state.localizedReference = getLocalizedVerseReference(state.selectedVerse);
      renderSelectedVerse();
      void generatePostContent({ refreshPoster: true, forceRegenerate: true });
    } else if (state.topic) {
      const localSuggestions = getSuggestedScripturesLocal(state.topic);
      state.suggestions = localSuggestions.verses;
      state.suggestionReasons = localSuggestions.reasons;
      renderScriptureModal();
      resetGeneratedOutput(state.topic);
      void enhanceScriptureSuggestions(state.topic);
    } else {
      resetGeneratedOutput(state.topic);
    }
  }

  function applyScriptureMatchMode(modeId) {
    state.scriptureMatchMode = modeId;
    elements.scriptureModeBtn.textContent = getScriptureMatchModeButtonLabel(modeId);
    renderScriptureModeOptions();
    closeModal(elements.scriptureModeModal);

    if (state.topic && !state.selectedVerse) {
      const localSuggestions = getSuggestedScripturesLocal(state.topic);
      state.suggestions = localSuggestions.verses;
      state.suggestionReasons = localSuggestions.reasons;
      renderScriptureModal();
      void enhanceScriptureSuggestions(state.topic);
    }
  }

  function applyPostStyle(styleId) {
    state.postStyle = styleId;
    renderPostStyleOptions();
    updateSummaryLabels();
    closeModal(elements.postStyleModal);

    if (state.selectedVerse) {
      void generatePostContent({ refreshPoster: false, forceRegenerate: true });
    }
  }

  function toggleEmojiMode() {
    state.allowEmojis = !state.allowEmojis;
    updateEmojiButton();
    updateSummaryLabels();

    if (state.selectedVerse) {
      void generatePostContent({ refreshPoster: false, forceRegenerate: true });
    }
  }

  function handlePosterSettingsSubmit(event) {
    event.preventDefault();

    state.posterSettings = {
      format: elements.posterFormatSelect.value,
      subject: elements.posterSubjectSelect.value,
      visualStyle: elements.posterVisualStyleSelect.value,
      typography: elements.posterTypographySelect.value,
      layout: elements.posterLayoutSelect.value,
      textOpacity: Number(elements.posterOpacityRange.value),
      strokeStrength: Number(elements.posterStrokeRange.value),
      logoPosition: elements.posterLogoPositionSelect.value,
      logoSize: Number(elements.posterLogoSizeRange.value),
      logoOpacity: Number(elements.posterLogoOpacityRange.value),
    };

    syncPosterSettingsForm();
    syncPosterCanvasSize();
    updateSummaryLabels();
    closeModal(elements.posterSettingsModal);

    if (!state.selectedVerse) {
      drawPlaceholderPoster();
      return;
    }

    if (state.backgroundImageUrl) {
      void renderPosterFromImage(state.backgroundImageUrl).catch(function () {
        renderPosterFallback();
      });
    }

    void generatePosterBackground();
  }

  function resetPosterSettings() {
    state.posterSettings = getDefaultPosterSettings();
    syncPosterSettingsForm();
    syncPosterCanvasSize();
    updateSummaryLabels();

    if (state.selectedVerse) {
      if (state.backgroundImageUrl) {
        void renderPosterFromImage(state.backgroundImageUrl).catch(function () {
          renderPosterFallback();
        });
      }
      void generatePosterBackground();
    } else {
      drawPlaceholderPoster();
    }
  }

  function updateSummaryLabels() {
    elements.postOptionsSummary.textContent =
      t("postSummaryPrefix") +
      " " +
      getLanguageNativeLabel(state.language) +
      "  •  " +
      t("postSummaryStylePrefix") +
      " " +
      getPostStyleLabel(state.postStyle) +
      "  •  " +
      t("postSummaryEmojiPrefix") +
      " " +
      (state.allowEmojis ? t("emojiEnabledLabel") : t("emojiDisabledLabel"));

    elements.posterOptionsSummary.textContent =
      t("posterSummaryPrefix") +
      " " +
      getPosterSubjectLabel(state.posterSettings.subject) +
      " / " +
      getPosterVisualStyleLabel(state.posterSettings.visualStyle) +
      "  •  " +
      t("posterSummaryFormatPrefix") +
      " " +
      getPosterFormatLabel(state.posterSettings.format) +
      "  •  " +
      t("posterSummaryTypographyPrefix") +
      " " +
      getTypographyLabel(state.posterSettings.typography) +
      "  •  " +
      getLayoutLabel(state.posterSettings.layout) +
      "  •  " +
      t("posterSummaryReferencePrefix") +
      " " +
      (state.referenceImage ? t("emojiEnabledLabel") : t("emojiDisabledLabel")) +
      "  •  " +
      t("posterSummaryLogoPrefix") +
      " " +
      (state.logoImage ? t("emojiEnabledLabel") : t("emojiDisabledLabel"));
  }

  function updatePostButtons(isBusy) {
    elements.regeneratePostBtn.disabled = !state.selectedVerse || isBusy;
    elements.copyPostBtn.disabled = !state.generatedPost || isBusy;
    elements.regeneratePostBtn.textContent = isBusy ? t("regeneratePost") : t("regeneratePost");
  }

  function updatePosterButtons(isBusy) {
    elements.posterSettingsBtn.disabled = false;
    elements.newPosterBtn.disabled = !state.selectedVerse || isBusy;
    elements.downloadBtn.disabled = !state.selectedVerse || isBusy;
    elements.newPosterBtn.textContent = isBusy ? t("generatingPoster") : t("newPoster");
  }

  function setPostStatus(message, tone) {
    elements.postStatus.textContent = message;
    elements.postStatus.dataset.tone = tone || "info";
  }

  function getDefaultPosterSettings() {
    return {
      format: "portrait_4_5",
      subject: "landscape",
      visualStyle: "natural",
      typography: "noto_serif",
      logoPosition: "bottom_right",
      logoSize: 14,
      logoOpacity: 100,
      layout: "top",
      textOpacity: 92,
      strokeStrength: 68,
    };
  }

  function getLanguageNativeLabel(languageId) {
    const option = languageOptions.find(function (entry) {
      return entry.id === languageId;
    });
    return option ? option.nativeLabel : "Русский";
  }

  function syncPosterCanvasSize() {
    const format = getPosterFormat(state.posterSettings.format);
    syncPosterAspectRatio(format);

    if (elements.canvas.width === format.width && elements.canvas.height === format.height) {
      return;
    }

    elements.canvas.width = format.width;
    elements.canvas.height = format.height;
  }

  function syncPosterAspectRatio(format) {
    const aspectRatio = format.width + " / " + format.height;
    elements.canvas.style.aspectRatio = aspectRatio;

    if (elements.canvasFrame) {
      elements.canvasFrame.style.setProperty("--poster-aspect-ratio", aspectRatio);
    }
  }

  function getPosterFormat(formatId) {
    return (
      posterFormatOptions.find(function (option) {
        return option.id === formatId;
      }) || posterFormatOptions[0]
    );
  }

  function getScriptureMatchModeLabel(modeId) {
    const labels = {
      ru: {
        explicit: t("scriptureModeExplicitLabel"),
        implicit: t("scriptureModeImplicitLabel"),
      },
      uk: {
        explicit: t("scriptureModeExplicitLabel"),
        implicit: t("scriptureModeImplicitLabel"),
      },
      pl: {
        explicit: t("scriptureModeExplicitLabel"),
        implicit: t("scriptureModeImplicitLabel"),
      },
      tr: {
        explicit: t("scriptureModeExplicitLabel"),
        implicit: t("scriptureModeImplicitLabel"),
      },
    };

    const languageLabels = labels[state.language] || labels.ru;
    return languageLabels[modeId] || languageLabels.explicit;
  }

  function getScriptureMatchModeButtonLabel(modeId) {
    const suffix = {
      ru: "подбор",
      uk: "добір",
      pl: "dobór",
      tr: "seçim",
    };

    return getScriptureMatchModeLabel(modeId) + " " + (suffix[state.language] || suffix.ru);
  }

  function getScriptureMatchModeDescription(modeId) {
    const descriptions = {
      explicit: t("scriptureModeExplicitDescription"),
      implicit: t("scriptureModeImplicitDescription"),
    };

    return descriptions[modeId] || descriptions.explicit;
  }

  function getPostStyleLabel(styleId) {
    const labels = {
      ru: {
        soft: "Мягкий",
        inspiring: "Вдохновляющий",
        conservative: "Консервативный",
        modern: "Современный",
        historical: "Исторический",
        pastoral: "Пасторский",
        evangelistic: "Евангелизационный",
        meditative: "Созерцательный",
        poetic: "Поэтичный",
      },
      uk: {
        soft: "М’який",
        inspiring: "Надихаючий",
        conservative: "Консервативний",
        modern: "Сучасний",
        historical: "Історичний",
        pastoral: "Пастирський",
        evangelistic: "Євангелізаційний",
        meditative: "Споглядальний",
        poetic: "Поетичний",
      },
      pl: {
        soft: "Łagodny",
        inspiring: "Inspirujący",
        conservative: "Konserwatywny",
        modern: "Nowoczesny",
        historical: "Historyczny",
        pastoral: "Pastoralny",
        evangelistic: "Ewangelizacyjny",
        meditative: "Medytacyjny",
        poetic: "Poetycki",
      },
      tr: {
        soft: "Yumuşak",
        inspiring: "İlham verici",
        conservative: "Muhafazakar",
        modern: "Modern",
        historical: "Tarihsel",
        pastoral: "Pastoral",
        evangelistic: "Müjdeleyici",
        meditative: "Derin düşünceli",
        poetic: "Şiirsel",
      },
    };

    const languageLabels = labels[state.language] || labels.ru;
    return languageLabels[styleId] || labels.ru[styleId] || styleId;
  }

  function getPostStyleDescription(styleId) {
    const descriptions = {
      ru: {
        soft: "Теплая, бережная и пасторская интонация.",
        inspiring: "Светлая и призывающая к действию подача.",
        conservative: "Более строгая и доктринально собранная речь.",
        modern: "Современная, ясная и доступная подача.",
        historical: "Тон с оттенком исторической протестантской проповеди.",
        pastoral: "Заботливая пасторская речь с духовным сопровождением.",
        evangelistic: "Ясный призыв к вере, покаянию и ответу Богу.",
        meditative: "Тихая, глубокая и молитвенно-сосредоточенная подача.",
        poetic: "Образный и красивый язык без потери богословской точности.",
      },
      uk: {
        soft: "Тепла, дбайлива і пастирська інтонація.",
        inspiring: "Світла подача, що спонукає до дії.",
        conservative: "Більш стримана і доктринально точна мова.",
        modern: "Сучасна, ясна й доступна подача.",
        historical: "Тон із відтінком історичної протестантської проповіді.",
        pastoral: "Турботлива пастирська мова з духовним супроводом.",
        evangelistic: "Чіткий заклик до віри, покаяння та відповіді Богові.",
        meditative: "Тиха, глибока і молитовно зосереджена подача.",
        poetic: "Образна й красива мова без втрати богословської точності.",
      },
      pl: {
        soft: "Ciepły, delikatny i pastoralny ton.",
        inspiring: "Jasny ton, który zachęca do działania.",
        conservative: "Bardziej zdyscyplinowany i doktrynalny sposób mówienia.",
        modern: "Nowoczesny, czytelny i przystępny styl.",
        historical: "Ton z nutą historycznego protestanckiego kaznodziejstwa.",
        pastoral: "Troskliwy, duszpasterski ton z prowadzeniem duchowym.",
        evangelistic: "Jasne wezwanie do wiary, pokuty i odpowiedzi Bogu.",
        meditative: "Cichy, głęboki i modlitewnie skupiony styl.",
        poetic: "Obrazowy i piękny język bez utraty teologicznej precyzji.",
      },
      tr: {
        soft: "Sıcak, dikkatli ve pastoral bir ton.",
        inspiring: "Umut veren ve eyleme çağıran anlatım.",
        conservative: "Daha ölçülü ve doktrinsel olarak toparlanmış dil.",
        modern: "Güncel, açık ve erişilebilir anlatım.",
        historical: "Tarihsel Protestan vaaz geleneğini hatırlatan ton.",
        pastoral: "Ruhsal eşlik hissi veren şefkatli pastoral anlatım.",
        evangelistic: "İmana, tövbeye ve Tanrı'ya cevaba açık çağrı.",
        meditative: "Sessiz, derin ve duaya odaklı anlatım.",
        poetic: "Teolojik doğruluğu kaybetmeden imgeli ve güzel dil.",
      },
    };

    const languageDescriptions = descriptions[state.language] || descriptions.ru;
    return languageDescriptions[styleId] || descriptions.ru[styleId] || "";
  }

  function getPosterFormatLabel(formatId) {
    const labels = {
      ru: {
        portrait_4_5: "Instagram 4:5",
        story_9_16: "Stories / Reels 9:16",
        square_1_1: "Квадрат 1:1",
        landscape_16_9: "Широкий 16:9",
      },
      uk: {
        portrait_4_5: "Instagram 4:5",
        story_9_16: "Stories / Reels 9:16",
        square_1_1: "Квадрат 1:1",
        landscape_16_9: "Широкий 16:9",
      },
      pl: {
        portrait_4_5: "Instagram 4:5",
        story_9_16: "Stories / Reels 9:16",
        square_1_1: "Kwadrat 1:1",
        landscape_16_9: "Szeroki 16:9",
      },
      tr: {
        portrait_4_5: "Instagram 4:5",
        story_9_16: "Stories / Reels 9:16",
        square_1_1: "Kare 1:1",
        landscape_16_9: "Geniş 16:9",
      },
    };

    return (labels[state.language] && labels[state.language][formatId]) || labels.ru.portrait_4_5;
  }

  function getPosterSubjectLabel(subjectId) {
    const labels = {
      ru: {
        landscape: "Пейзаж",
        sea: "Море",
        forest: "Лес",
        mountains: "Горы",
        meadow: "Поле",
        sunrise: "Рассвет",
        sunset: "Закат",
        sky: "Небо и облака",
        lake: "Озеро",
        river: "Река",
        desert: "Пустыня",
        flowers: "Цветы и сад",
        rain: "Дождь и туман",
        city: "Город",
        old_town: "Старый город",
        street: "Улица",
        architecture: "Архитектура",
        interior: "Интерьер",
        people: "Люди",
        couple: "Пара",
        journey: "Дорога и путь",
        night: "Ночной свет",
        abstract: "Абстракция",
        texture: "Текстура и свет",
      },
      uk: {
        landscape: "Пейзаж",
        sea: "Море",
        forest: "Ліс",
        mountains: "Гори",
        meadow: "Поле",
        sunrise: "Світанок",
        sunset: "Захід сонця",
        sky: "Небо і хмари",
        lake: "Озеро",
        river: "Річка",
        desert: "Пустеля",
        flowers: "Квіти і сад",
        rain: "Дощ і туман",
        city: "Місто",
        old_town: "Старе місто",
        street: "Вулиця",
        architecture: "Архітектура",
        interior: "Інтер’єр",
        people: "Люди",
        couple: "Пара",
        journey: "Дорога і шлях",
        night: "Нічне світло",
        abstract: "Абстракція",
        texture: "Текстура і світло",
      },
      pl: {
        landscape: "Pejzaż",
        sea: "Morze",
        forest: "Las",
        mountains: "Góry",
        meadow: "Łąka",
        sunrise: "Wschód słońca",
        sunset: "Zachód słońca",
        sky: "Niebo i chmury",
        lake: "Jezioro",
        river: "Rzeka",
        desert: "Pustynia",
        flowers: "Kwiaty i ogród",
        rain: "Deszcz i mgła",
        city: "Miasto",
        old_town: "Stare miasto",
        street: "Ulica",
        architecture: "Architektura",
        interior: "Wnętrze",
        people: "Ludzie",
        couple: "Para",
        journey: "Droga i podróż",
        night: "Nocne światło",
        abstract: "Abstrakcja",
        texture: "Tekstura i światło",
      },
      tr: {
        landscape: "Manzara",
        sea: "Deniz",
        forest: "Orman",
        mountains: "Dağlar",
        meadow: "Çayır",
        sunrise: "Gün doğumu",
        sunset: "Gün batımı",
        sky: "Gökyüzü ve bulutlar",
        lake: "Göl",
        river: "Nehir",
        desert: "Çöl",
        flowers: "Çiçekler ve bahçe",
        rain: "Yağmur ve sis",
        city: "Şehir",
        old_town: "Eski şehir",
        street: "Sokak",
        architecture: "Mimari",
        interior: "İç mekan",
        people: "İnsanlar",
        couple: "Çift",
        journey: "Yol ve yürüyüş",
        night: "Gece ışığı",
        abstract: "Soyut",
        texture: "Doku ve ışık",
      },
    };

    const languageLabels = labels[state.language] || labels.ru;
    return languageLabels[subjectId] || labels.ru[subjectId] || subjectId;
  }

  function getPosterVisualStyleLabel(styleId) {
    const labels = {
      ru: {
        natural: "Натуральный",
        editorial: "Редакционный",
        cinematic: "Кинематографичный",
        minimalist: "Минималистичный",
        painterly: "Живописный",
        vintage_film: "Винтажная пленка",
        dreamy: "Мечтательный",
        modernism: "Модернизм",
        postmodern: "Постмодерн",
        glitch: "Глич",
        luxury: "Премиальный",
        analog: "Аналоговый",
      },
      uk: {
        natural: "Натуральний",
        editorial: "Редакційний",
        cinematic: "Кінематографічний",
        minimalist: "Мінімалістичний",
        painterly: "Живописний",
        vintage_film: "Вінтажна плівка",
        dreamy: "Мрійливий",
        modernism: "Модернізм",
        postmodern: "Постмодерн",
        glitch: "Ґліч",
        luxury: "Преміальний",
        analog: "Аналоговий",
      },
      pl: {
        natural: "Naturalny",
        editorial: "Edytorialny",
        cinematic: "Filmowy",
        minimalist: "Minimalistyczny",
        painterly: "Malarski",
        vintage_film: "Vintage film",
        dreamy: "Marzycielski",
        modernism: "Modernizm",
        postmodern: "Postmodernizm",
        glitch: "Glitch",
        luxury: "Luksusowy",
        analog: "Analogowy",
      },
      tr: {
        natural: "Doğal",
        editorial: "Editoryal",
        cinematic: "Sinematik",
        minimalist: "Minimalist",
        painterly: "Resimsel",
        vintage_film: "Vintage film",
        dreamy: "Düşsel",
        modernism: "Modernizm",
        postmodern: "Postmodern",
        glitch: "Glitch",
        luxury: "Premium",
        analog: "Analog",
      },
    };

    const languageLabels = labels[state.language] || labels.ru;
    return languageLabels[styleId] || labels.ru[styleId] || styleId;
  }

  function getTypographyLabel(typographyId) {
    const labels = {
      ru: {
        noto_sans: "Noto Sans",
        noto_serif: "Noto Serif",
        manrope: "Manrope",
        montserrat: "Montserrat",
        pt_serif: "PT Serif",
        lora: "Lora",
        merriweather: "Merriweather",
        source_serif: "Source Serif 4",
        playfair: "Playfair Display",
        cormorant: "Cormorant Garamond",
        oswald: "Oswald",
        roboto_slab: "Roboto Slab",
      },
      uk: {
        noto_sans: "Noto Sans",
        noto_serif: "Noto Serif",
        manrope: "Manrope",
        montserrat: "Montserrat",
        pt_serif: "PT Serif",
        lora: "Lora",
        merriweather: "Merriweather",
        source_serif: "Source Serif 4",
        playfair: "Playfair Display",
        cormorant: "Cormorant Garamond",
        oswald: "Oswald",
        roboto_slab: "Roboto Slab",
      },
      pl: {
        noto_sans: "Noto Sans",
        noto_serif: "Noto Serif",
        manrope: "Manrope",
        montserrat: "Montserrat",
        pt_serif: "PT Serif",
        lora: "Lora",
        merriweather: "Merriweather",
        source_serif: "Source Serif 4",
        playfair: "Playfair Display",
        cormorant: "Cormorant Garamond",
        oswald: "Oswald",
        roboto_slab: "Roboto Slab",
      },
      tr: {
        noto_sans: "Noto Sans",
        noto_serif: "Noto Serif",
        manrope: "Manrope",
        montserrat: "Montserrat",
        pt_serif: "PT Serif",
        lora: "Lora",
        merriweather: "Merriweather",
        source_serif: "Source Serif 4",
        playfair: "Playfair Display",
        cormorant: "Cormorant Garamond",
        oswald: "Oswald",
        roboto_slab: "Roboto Slab",
      },
    };

    const languageLabels = labels[state.language] || labels.ru;
    return languageLabels[typographyId] || labels.ru[typographyId] || typographyId;
  }

  function getLayoutLabel(layoutId) {
    const labels = {
      ru: {
        top: "Сверху",
        center: "По центру",
        bottom: "Снизу",
      },
      uk: {
        top: "Згори",
        center: "По центру",
        bottom: "Знизу",
      },
      pl: {
        top: "U góry",
        center: "Na środku",
        bottom: "Na dole",
      },
      tr: {
        top: "Üstte",
        center: "Ortada",
        bottom: "Altta",
      },
    };

    const languageLabels = labels[state.language] || labels.ru;
    return languageLabels[layoutId] || labels.ru[layoutId] || layoutId;
  }

  function getLogoPositionLabel(positionId) {
    const labels = {
      ru: {
        top_left: "Сверху слева",
        top_center: "Сверху по центру",
        top_right: "Сверху справа",
        middle_center: "По центру",
        bottom_left: "Снизу слева",
        bottom_center: "Снизу по центру",
        bottom_right: "Снизу справа",
      },
      uk: {
        top_left: "Згори ліворуч",
        top_center: "Згори по центру",
        top_right: "Згори праворуч",
        middle_center: "По центру",
        bottom_left: "Знизу ліворуч",
        bottom_center: "Знизу по центру",
        bottom_right: "Знизу праворуч",
      },
      pl: {
        top_left: "U góry po lewej",
        top_center: "U góry na środku",
        top_right: "U góry po prawej",
        middle_center: "Na środku",
        bottom_left: "Na dole po lewej",
        bottom_center: "Na dole na środku",
        bottom_right: "Na dole po prawej",
      },
      tr: {
        top_left: "Üst sol",
        top_center: "Üst orta",
        top_right: "Üst sağ",
        middle_center: "Tam orta",
        bottom_left: "Alt sol",
        bottom_center: "Alt orta",
        bottom_right: "Alt sağ",
      },
    };

    const languageLabels = labels[state.language] || labels.ru;
    return languageLabels[positionId] || labels.ru[positionId] || positionId;
  }

  function getTypographyPreset(typographyId) {
    const scale = getPosterFontScale();
    function fontSpec(weight, size, family, fallback) {
      return weight + " " + Math.round(size * scale) + "px '" + family + "', " + fallback;
    }

    const presets = {
      noto_sans: {
        topicFont: fontSpec(600, 28, "Noto Sans", "sans-serif"),
        verseFont: fontSpec(600, 60, "Noto Sans", "sans-serif"),
        referenceFont: fontSpec(600, 54, "Noto Sans", "sans-serif"),
        placeholderFont: fontSpec(600, 40, "Noto Sans", "sans-serif"),
      },
      noto_serif: {
        topicFont: fontSpec(600, 28, "Noto Serif", "serif"),
        verseFont: fontSpec(600, 64, "Noto Serif", "serif"),
        referenceFont: fontSpec(600, 56, "Noto Serif", "serif"),
        placeholderFont: fontSpec(600, 41, "Noto Serif", "serif"),
      },
      manrope: {
        topicFont: fontSpec(700, 27, "Manrope", "sans-serif"),
        verseFont: fontSpec(800, 60, "Manrope", "sans-serif"),
        referenceFont: fontSpec(700, 54, "Manrope", "sans-serif"),
        placeholderFont: fontSpec(700, 40, "Manrope", "sans-serif"),
      },
      montserrat: {
        topicFont: fontSpec(600, 27, "Montserrat", "sans-serif"),
        verseFont: fontSpec(600, 60, "Montserrat", "sans-serif"),
        referenceFont: fontSpec(600, 54, "Montserrat", "sans-serif"),
        placeholderFont: fontSpec(600, 40, "Montserrat", "sans-serif"),
      },
      pt_serif: {
        topicFont: fontSpec(700, 28, "PT Serif", "serif"),
        verseFont: fontSpec(700, 63, "PT Serif", "serif"),
        referenceFont: fontSpec(700, 56, "PT Serif", "serif"),
        placeholderFont: fontSpec(700, 41, "PT Serif", "serif"),
      },
      lora: {
        topicFont: fontSpec(700, 28, "Lora", "serif"),
        verseFont: fontSpec(700, 62, "Lora", "serif"),
        referenceFont: fontSpec(700, 56, "Lora", "serif"),
        placeholderFont: fontSpec(700, 41, "Lora", "serif"),
      },
      merriweather: {
        topicFont: fontSpec(700, 27, "Merriweather", "serif"),
        verseFont: fontSpec(700, 58, "Merriweather", "serif"),
        referenceFont: fontSpec(700, 52, "Merriweather", "serif"),
        placeholderFont: fontSpec(700, 39, "Merriweather", "serif"),
      },
      source_serif: {
        topicFont: fontSpec(700, 28, "Source Serif 4", "serif"),
        verseFont: fontSpec(700, 64, "Source Serif 4", "serif"),
        referenceFont: fontSpec(700, 56, "Source Serif 4", "serif"),
        placeholderFont: fontSpec(700, 41, "Source Serif 4", "serif"),
      },
      playfair: {
        topicFont: fontSpec(700, 29, "Playfair Display", "serif"),
        verseFont: fontSpec(700, 66, "Playfair Display", "serif"),
        referenceFont: fontSpec(700, 58, "Playfair Display", "serif"),
        placeholderFont: fontSpec(700, 42, "Playfair Display", "serif"),
      },
      cormorant: {
        topicFont: fontSpec(700, 31, "Cormorant Garamond", "serif"),
        verseFont: fontSpec(700, 72, "Cormorant Garamond", "serif"),
        referenceFont: fontSpec(700, 62, "Cormorant Garamond", "serif"),
        placeholderFont: fontSpec(700, 45, "Cormorant Garamond", "serif"),
      },
      oswald: {
        topicFont: fontSpec(500, 28, "Oswald", "sans-serif"),
        verseFont: fontSpec(500, 62, "Oswald", "sans-serif"),
        referenceFont: fontSpec(500, 54, "Oswald", "sans-serif"),
        placeholderFont: fontSpec(500, 40, "Oswald", "sans-serif"),
      },
      roboto_slab: {
        topicFont: fontSpec(700, 27, "Roboto Slab", "serif"),
        verseFont: fontSpec(700, 60, "Roboto Slab", "serif"),
        referenceFont: fontSpec(700, 54, "Roboto Slab", "serif"),
        placeholderFont: fontSpec(700, 40, "Roboto Slab", "serif"),
      },
    };

    return presets[typographyId] || presets.noto_serif;
  }

  function getPosterFontScale() {
    const widthScale = elements.canvas.width / 1080;
    const heightScale = elements.canvas.height / 1350;
    return clamp(Math.min(widthScale, heightScale), 0.72, 1.12);
  }

  function getLayoutPreset(layoutId, isPlaceholder) {
    const presets = {
      top: {
        topicY: 112,
        verseStartY: isPlaceholder ? 248 : 236,
        verseMaxWidth: 860,
        verseLineHeight: isPlaceholder ? 60 : 82,
        referenceGap: isPlaceholder ? 126 : 124,
        topiclessOffset: isPlaceholder ? 92 : 108,
        contentAnchorY: isPlaceholder ? 280 : 280,
      },
      center: {
        topicY: 148,
        verseStartY: isPlaceholder ? 360 : 338,
        verseMaxWidth: 860,
        verseLineHeight: isPlaceholder ? 60 : 82,
        referenceGap: isPlaceholder ? 116 : 112,
        topiclessOffset: isPlaceholder ? 72 : 90,
        contentAnchorY: isPlaceholder ? 655 : 650,
      },
      bottom: {
        topicY: 124,
        verseStartY: isPlaceholder ? 670 : 628,
        verseMaxWidth: 860,
        verseLineHeight: isPlaceholder ? 58 : 80,
        referenceGap: isPlaceholder ? 92 : 88,
        topiclessOffset: isPlaceholder ? 34 : 48,
        contentAnchorY: isPlaceholder ? 1120 : 1110,
      },
    };

    const base = presets[layoutId] || presets.top;
    const widthScale = elements.canvas.width / 1080;
    const heightScale = elements.canvas.height / 1350;
    const lineScale = getPosterFontScale();

    return {
      topicY: base.topicY * heightScale,
      verseStartY: base.verseStartY * heightScale,
      verseMaxWidth: Math.min(base.verseMaxWidth * widthScale, elements.canvas.width * 0.84),
      verseLineHeight: base.verseLineHeight * lineScale,
      referenceGap: base.referenceGap * heightScale,
      topiclessOffset: base.topiclessOffset * heightScale,
      contentAnchorY: base.contentAnchorY * heightScale,
    };
  }

  function getFallbackLanguagePack() {
    const pack = {
      ru: {
        intros: [
          'Тема "{topic}" особенно нуждается в свете Писания.',
          'Когда речь идет о теме "{topic}", важно услышать Божий взгляд.',
          'В теме "{topic}" Писание возвращает нас к состоянию сердца.',
        ],
        reminds: "напоминает",
        closers: [
          "Пусть этот стих ведет не только к размышлению, но и к практическому послушанию Богу.",
          "Пусть Божье слово станет основанием для решений, молитвы и ежедневной верности.",
          "Ответом на такой текст должно быть не только вдохновение, но и покаяние, вера и послушание.",
        ],
      },
      uk: {
        intros: [
          'Тема "{topic}" особливо потребує світла Писання.',
          'Коли йдеться про тему "{topic}", важливо почути Божий погляд.',
          'У темі "{topic}" Писання повертає нас до стану серця.',
        ],
        reminds: "нагадує",
        closers: [
          "Нехай цей вірш веде не тільки до роздумів, але й до практичного послуху Богові.",
          "Нехай Боже слово стане підставою для рішень, молитви й щоденної вірності.",
          "Відповіддю на такий текст має бути не лише натхнення, а й покаяння, віра та послух.",
        ],
      },
      pl: {
        intros: [
          'Temat "{topic}" szczególnie potrzebuje światła Pisma.',
          'Gdy mówimy o temacie "{topic}", ważne jest usłyszeć Boży punkt widzenia.',
          'W temacie "{topic}" Pismo prowadzi nas z powrotem do stanu serca.',
        ],
        reminds: "przypomina",
        closers: [
          "Niech ten werset prowadzi nie tylko do refleksji, ale także do praktycznego posłuszeństwa Bogu.",
          "Niech Słowo Boże stanie się podstawą decyzji, modlitwy i codziennej wierności.",
          "Odpowiedzią na taki tekst powinno być nie tylko poruszenie, ale też pokuta, wiara i posłuszeństwo.",
        ],
      },
      tr: {
        intros: [
          "\"{topic}\" konusu özellikle Kutsal Yazı'nın ışığına ihtiyaç duyar.",
          "\"{topic}\" hakkında konuşurken Tanrı'nın bakışını duymak önemlidir.",
          '"{topic}" konusunda Kutsal Yazı bizi yüreğin durumuna geri götürür.',
        ],
        reminds: "hatırlatır",
        closers: [
          "Bu ayet yalnızca düşünceye değil, Tanrı'ya pratik itaat etmeye de götürsün.",
          "Tanrı'nın Sözü kararlar, dua ve günlük sadakat için temel olsun.",
          "Böyle bir metne cevap yalnızca ilham değil, tövbe, iman ve itaat olmalıdır.",
        ],
      },
    };

    return pack[state.language] || pack.ru;
  }

  function getFallbackStylePack() {
    const packs = {
      ru: {
        soft: {
          theologyLines: [
            "Евангелие говорит с сердцем бережно, но не размывает истину.",
            "Божья благодать не унижает человека, а мягко ведет к покаянию и зрелости.",
          ],
          callsToAction: [
            "Пусть ответом будет тихая молитва, честность перед Богом и послушание Его слову уже сегодня.",
            "Сделайте следующий шаг веры: доверьте тему Богу, проверьте сердце Писанием и выберите чистоту.",
          ],
        },
        inspiring: {
          theologyLines: [
            "Писание не просто освещает тему, но зовет жить смело, свято и с надеждой во Христе.",
            "Во Христе есть не только диагноз сердцу, но и сила для нового послушания.",
          ],
          callsToAction: [
            "Не оставляйте этот стих только на уровне вдохновения: превратите его в решение, молитву и конкретный шаг веры.",
            "Пусть этот текст поднимет вас к действию: искать Господа, отвергать компромисс и идти путем света.",
          ],
        },
        conservative: {
          theologyLines: [
            "Протестантское чтение Писания всегда возвращает нас к достаточности Слова, благодати и святой жизни как плоду веры.",
            "Божья истина требует не поверхностной эмоции, а покаяния, веры и упорядоченной жизни перед Господом.",
          ],
          callsToAction: [
            "Проверьте свои мотивы перед Богом, подчините решения Писанию и ищите не удобства, а верности Христу.",
            "Пусть этот текст станет поводом не спорить с Богом, а смириться перед Ним и идти путем послушания.",
          ],
        },
        modern: {
          theologyLines: [
            "Евангелие не украшает проблему, а честно называет ее и показывает путь к исцелению во Христе.",
            "Библия говорит в самую точку: сердце нуждается не в самообмане, а в обновлении под Божьим словом.",
          ],
          callsToAction: [
            "Спросите себя честно: какой следующий шаг верности Богу вы можете сделать уже сегодня?",
            "Не откладывайте внутреннюю работу: принесите тему в молитву, сверяйте решения с Писанием и идите за Христом на практике.",
          ],
        },
        historical: {
          theologyLines: [
            "Как и во всякой доброй протестантской проповеди, здесь слышен призыв возвратиться к Писанию, совести и святой жизни перед Богом.",
            "Верные поколения Церкви учили: Слово Божье обличает, утешает и направляет человека к Христу.",
          ],
          callsToAction: [
            "Пусть это слово не пройдет мимо совести, но приведет к смирению, вере и обновленной ревности о святости.",
            "Станьте под суд и утешение Писания, чтобы путь дальше определял не страх, а послушание Господу.",
          ],
        },
        pastoral: {
          theologyLines: [
            "Христос не только открывает истину, но и бережно ведет раненое сердце к исцелению и послушанию.",
            "Пасторская сила текста в том, что он соединяет благодать, истину и заботу о совести.",
          ],
          callsToAction: [
            "Принесите эту тему в молитву, откройте ее перед Богом честно и попросите у Него мудрости для следующего шага.",
            "Не оставайтесь с этим вопросом в одиночку: ищите Божьего слова, молитвы и зрелого духовного сопровождения.",
          ],
        },
        evangelistic: {
          theologyLines: [
            "Евангелие зовет не только улучшить поведение, но прежде всего обратиться ко Христу сердцем и верой.",
            "В центре любого правильного ответа Богу стоит не самосовершенствование, а покаяние и доверие Иисусу Христу.",
          ],
          callsToAction: [
            "Если Господь обличает вас через этот стих, не откладывайте: обратитесь к Нему в покаянии и вере уже сегодня.",
            "Пусть этот текст станет не просто мыслью для ленты, а личным призывом примириться с Богом и идти за Христом.",
          ],
        },
        meditative: {
          theologyLines: [
            "Слово Божье часто действует глубоко и тихо, освещая то, что невозможно распознать в суете.",
            "Благодать учит нас останавливаться, слушать и позволять Писанию судить и исцелять сердце.",
          ],
          callsToAction: [
            "Замедлитесь перед этим стихом, помолитесь над ним и спросите Господа, что именно Он хочет изменить в вашем сердце.",
            "Оставьте место тишине, молитве и честному размышлению, чтобы Божье слово пустило корень глубже эмоций.",
          ],
        },
        poetic: {
          theologyLines: [
            "Божья истина не становится слабее, когда звучит красиво; напротив, она глубже входит в сердце через ясный образ и живое слово.",
            "Писание умеет одновременно ранить и исцелять, обличать и вести к свету Христову.",
          ],
          callsToAction: [
            "Пусть этот стих станет для вас не только красивой строкой, но дорогой к покаянию, вере и новому послушанию.",
            "Сохраните эту мысль в сердце, помолитесь над ней и позвольте ей преобразить ваши решения перед Богом.",
          ],
        },
      },
      uk: {
        soft: {
          theologyLines: [
            "Євангеліє говорить до серця лагідно, але не розмиває істину.",
            "Божа благодать не принижує людину, а м’яко веде до покаяння і зрілості.",
          ],
          callsToAction: [
            "Нехай відповіддю стане тиха молитва, чесність перед Богом і послух Його слову вже сьогодні.",
            "Зробіть наступний крок віри: довірте тему Богові, перевірте серце Писанням і виберіть чистоту.",
          ],
        },
        inspiring: {
          theologyLines: [
            "Писання не лише висвітлює тему, а й кличе жити сміливо, свято і з надією у Христі.",
            "У Христі є не лише діагноз серцю, а й сила для нового послуху.",
          ],
          callsToAction: [
            "Не залишайте цей вірш лише на рівні натхнення: перетворіть його на рішення, молитву і конкретний крок віри.",
            "Нехай цей текст підніме вас до дії: шукати Господа, відкидати компроміс і йти шляхом світла.",
          ],
        },
        conservative: {
          theologyLines: [
            "Протестантське читання Писання завжди повертає нас до достатності Слова, благодаті та святого життя як плоду віри.",
            "Божа істина потребує не поверхової емоції, а покаяння, віри та впорядкованого життя перед Господом.",
          ],
          callsToAction: [
            "Перевірте свої мотиви перед Богом, підкоріть рішення Писанню і шукайте не зручності, а вірності Христу.",
            "Нехай цей текст стане приводом не сперечатися з Богом, а смиритися перед Ним і йти шляхом послуху.",
          ],
        },
        modern: {
          theologyLines: [
            "Євангеліє не прикрашає проблему, а чесно називає її і показує шлях до зцілення у Христі.",
            "Біблія говорить прямо в серце: воно потребує не самообману, а оновлення під Божим словом.",
          ],
          callsToAction: [
            "Запитайте себе чесно: який наступний крок вірності Богові ви можете зробити вже сьогодні?",
            "Не відкладайте внутрішню працю: принесіть тему в молитву, звіряйте рішення з Писанням і йдіть за Христом.",
          ],
        },
        historical: {
          theologyLines: [
            "Як і в кожній добрій протестантській проповіді, тут звучить заклик повернутися до Писання, совісті й святого життя перед Богом.",
            "Вірні покоління Церкви вчили: Слово Боже викриває, утішає і спрямовує людину до Христа.",
          ],
          callsToAction: [
            "Нехай це слово не мине совість, а приведе до смирення, віри і відновленої ревності про святість.",
            "Станьте під суд і розраду Писання, щоб подальший шлях визначав не страх, а послух Господу.",
          ],
        },
        pastoral: {
          theologyLines: [
            "Христос не лише відкриває істину, а й лагідно веде поранене серце до зцілення і послуху.",
            "Пастирська сила тексту в тому, що він поєднує благодать, істину і турботу про совість.",
          ],
          callsToAction: [
            "Принесіть цю тему в молитву, відкрийте її перед Богом чесно і попросіть у Нього мудрості для наступного кроку.",
            "Не залишайтеся з цим питанням наодинці: шукайте Божого слова, молитви і зрілого духовного супроводу.",
          ],
        },
        evangelistic: {
          theologyLines: [
            "Євангеліє кличе не лише виправити поведінку, але насамперед звернутися до Христа серцем і вірою.",
            "У центрі будь-якої правильної відповіді Богові стоїть не самовдосконалення, а покаяння і довіра Ісусу Христу.",
          ],
          callsToAction: [
            "Якщо Господь викриває вас через цей вірш, не відкладайте: зверніться до Нього в покаянні та вірі вже сьогодні.",
            "Нехай цей текст стане не просто думкою для стрічки, а особистим закликом примиритися з Богом і йти за Христом.",
          ],
        },
        meditative: {
          theologyLines: [
            "Боже слово часто діє глибоко і тихо, висвітлюючи те, чого не розпізнати в метушні.",
            "Благодать вчить нас зупинятися, слухати і дозволяти Писанню судити та зцілювати серце.",
          ],
          callsToAction: [
            "Сповільніться перед цим віршем, помоліться над ним і запитайте Господа, що саме Він хоче змінити у вашому серці.",
            "Залиште місце тиші, молитві й чесному роздуму, щоб Боже слово пустило корінь глибше за емоції.",
          ],
        },
        poetic: {
          theologyLines: [
            "Божа істина не слабшає, коли звучить красиво; навпаки, вона глибше входить у серце через ясний образ і живе слово.",
            "Писання вміє одночасно ранити і зцілювати, викривати і вести до світла Христового.",
          ],
          callsToAction: [
            "Нехай цей вірш стане для вас не лише красивим рядком, а дорогою до покаяння, віри та нового послуху.",
            "Збережіть цю думку в серці, помоліться над нею і дозвольте їй переобразити ваші рішення перед Богом.",
          ],
        },
      },
      pl: {
        soft: {
          theologyLines: [
            "Ewangelia mówi do serca łagodnie, ale nie rozmywa prawdy.",
            "Boża łaska nie upokarza człowieka, lecz delikatnie prowadzi do pokuty i dojrzałości.",
          ],
          callsToAction: [
            "Niech odpowiedzią będzie cicha modlitwa, uczciwość przed Bogiem i posłuszeństwo Jego słowu już dziś.",
            "Zrób kolejny krok wiary: powierz temat Bogu, zbadaj serce w świetle Pisma i wybierz czystość.",
          ],
        },
        inspiring: {
          theologyLines: [
            "Pismo nie tylko oświetla temat, ale wzywa do życia odważnego, świętego i pełnego nadziei w Chrystusie.",
            "W Chrystusie jest nie tylko diagnoza serca, ale też moc do nowego posłuszeństwa.",
          ],
          callsToAction: [
            "Nie zostawiaj tego wersetu jedynie na poziomie inspiracji: zamień go w decyzję, modlitwę i konkretny krok wiary.",
            "Niech ten tekst podniesie cię do działania: szukaj Pana, odrzuć kompromis i idź drogą światła.",
          ],
        },
        conservative: {
          theologyLines: [
            "Protestancka lektura Pisma zawsze prowadzi nas z powrotem do wystarczalności Słowa, łaski i świętego życia jako owocu wiary.",
            "Boża prawda wymaga nie powierzchownej emocji, lecz pokuty, wiary i uporządkowanego życia przed Panem.",
          ],
          callsToAction: [
            "Zbadaj swoje motywy przed Bogiem, podporządkuj decyzje Pismu i szukaj nie wygody, lecz wierności Chrystusowi.",
            "Niech ten tekst stanie się okazją nie do sporu z Bogiem, lecz do uniżenia się przed Nim i wejścia na drogę posłuszeństwa.",
          ],
        },
        modern: {
          theologyLines: [
            "Ewangelia nie upiększa problemu, ale uczciwie go nazywa i pokazuje drogę uzdrowienia w Chrystusie.",
            "Biblia mówi prosto do sedna: serce potrzebuje nie samooszukania, lecz odnowy pod Bożym słowem.",
          ],
          callsToAction: [
            "Zapytaj siebie uczciwie: jaki kolejny krok wierności Bogu możesz zrobić już dzisiaj?",
            "Nie odkładaj wewnętrznej pracy: zanieś temat do modlitwy, sprawdzaj decyzje przez Pismo i idź za Chrystusem.",
          ],
        },
        historical: {
          theologyLines: [
            "Jak w każdym dobrym protestanckim kazaniu, słychać tu wezwanie do powrotu do Pisma, sumienia i świętego życia przed Bogiem.",
            "Wierne pokolenia Kościoła uczyły, że Słowo Boże demaskuje, pociesza i prowadzi człowieka do Chrystusa.",
          ],
          callsToAction: [
            "Niech to słowo nie ominie sumienia, lecz prowadzi do pokory, wiary i odnowionej gorliwości o świętość.",
            "Stań pod sądem i pociechą Pisma, aby dalszą drogę wyznaczało nie przerażenie, lecz posłuszeństwo Panu.",
          ],
        },
        pastoral: {
          theologyLines: [
            "Chrystus nie tylko objawia prawdę, ale łagodnie prowadzi zranione serce ku uzdrowieniu i posłuszeństwu.",
            "Duszpasterska siła tego tekstu polega na połączeniu łaski, prawdy i troski o sumienie.",
          ],
          callsToAction: [
            "Przynieś ten temat do modlitwy, otwórz go uczciwie przed Bogiem i proś Go o mądrość do następnego kroku.",
            "Nie zostawaj z tym pytaniem sam: szukaj Bożego słowa, modlitwy i dojrzałego duchowego prowadzenia.",
          ],
        },
        evangelistic: {
          theologyLines: [
            "Ewangelia wzywa nie tylko do poprawy zachowania, lecz przede wszystkim do zwrócenia się do Chrystusa sercem i wiarą.",
            "W centrum właściwej odpowiedzi Bogu stoi nie samodoskonalenie, ale pokuta i zaufanie Jezusowi Chrystusowi.",
          ],
          callsToAction: [
            "Jeśli Pan napomina cię przez ten werset, nie odkładaj tego: zwróć się do Niego w pokucie i wierze już dziś.",
            "Niech ten tekst będzie nie tylko myślą do posta, ale osobistym wezwaniem do pojednania z Bogiem i pójścia za Chrystusem.",
          ],
        },
        meditative: {
          theologyLines: [
            "Słowo Boże często działa głęboko i cicho, oświetlając to, czego nie da się dostrzec w pośpiechu.",
            "Łaska uczy nas zatrzymać się, słuchać i pozwolić Pismu osądzić oraz uzdrowić serce.",
          ],
          callsToAction: [
            "Zwolnij przed tym wersetem, pomódl się nad nim i zapytaj Pana, co chce zmienić w twoim sercu.",
            "Zostaw miejsce na ciszę, modlitwę i uczciwą refleksję, aby Boże słowo zapuściło korzeń głębiej niż emocje.",
          ],
        },
        poetic: {
          theologyLines: [
            "Boża prawda nie słabnie, gdy brzmi pięknie; przeciwnie, głębiej wnika w serce przez jasny obraz i żywe słowo.",
            "Pismo potrafi jednocześnie zranić i uleczyć, napomnieć i poprowadzić ku światłu Chrystusa.",
          ],
          callsToAction: [
            "Niech ten werset będzie dla ciebie nie tylko pięknym zdaniem, ale drogą do pokuty, wiary i nowego posłuszeństwa.",
            "Zachowaj tę myśl w sercu, pomódl się nad nią i pozwól jej przemieniać twoje decyzje przed Bogiem.",
          ],
        },
      },
    };

    packs.tr = {
      soft: {
        theologyLines: [
          "Müjde yüreğe nazikçe konuşur, ama gerçeği bulanıklaştırmaz.",
          "Tanrı'nın lütfu insanı ezmez; onu tövbeye ve olgunluğa yumuşakça yöneltir.",
        ],
        callsToAction: [
          "Cevabınız sessiz bir dua, Tanrı önünde dürüstlük ve bugün O'nun Sözü'ne itaat olsun.",
          "Bir iman adımı atın: konuyu Tanrı'ya emanet edin, yüreğinizi Kutsal Yazı'yla sınayın ve paklığı seçin.",
        ],
      },
      inspiring: {
        theologyLines: [
          "Kutsal Yazı yalnızca konuyu aydınlatmaz; Mesih'te cesur, kutsal ve umutlu yaşamaya çağırır.",
          "Mesih'te yürek için yalnızca teşhis değil, yeni itaat için güç de vardır.",
        ],
        callsToAction: [
          "Bu ayeti sadece ilham olarak bırakmayın: onu karara, duaya ve somut bir iman adımına dönüştürün.",
          "Bu söz sizi eyleme kaldırsın: Rab'bi arayın, tavizi reddedin ve ışığın yolunda yürüyün.",
        ],
      },
      conservative: {
        theologyLines: [
          "Protestan Kutsal Yazı okuması bizi her zaman Söz'ün yeterliliğine, lütfa ve imanın meyvesi olan kutsal yaşama döndürür.",
          "Tanrı'nın gerçeği yüzeysel bir duygu değil, tövbe, iman ve Rab önünde düzenli bir yaşam ister.",
        ],
        callsToAction: [
          "Motivasyonlarınızı Tanrı önünde sınayın, kararlarınızı Kutsal Yazı'ya tabi kılın ve rahatlığı değil Mesih'e sadakati arayın.",
          "Bu metin Tanrı'yla tartışmak için değil, O'nun önünde alçalmak ve itaat yoluna girmek için bir çağrı olsun.",
        ],
      },
      modern: {
        theologyLines: [
          "Müjde problemi süslemez; onu dürüstçe adlandırır ve Mesih'te iyileşme yolunu gösterir.",
          "Kutsal Kitap doğrudan yüreğe konuşur: yürek kendini kandırmaya değil, Tanrı'nın Sözü altında yenilenmeye muhtaçtır.",
        ],
        callsToAction: [
          "Kendinize dürüstçe sorun: Tanrı'ya sadakat için bugün atabileceğiniz sonraki adım nedir?",
          "İçsel çalışmayı ertelemeyin: konuyu duaya taşıyın, kararları Kutsal Yazı'yla ölçün ve Mesih'i pratikte izleyin.",
        ],
      },
      historical: {
        theologyLines: [
          "İyi bir tarihsel Protestan vaazında olduğu gibi burada da Kutsal Yazı'ya, vicdana ve Tanrı önünde kutsal yaşama dönüş çağrısı duyulur.",
          "Kilisenin sadık kuşakları şunu öğretti: Tanrı'nın Sözü açığa çıkarır, teselli eder ve insanı Mesih'e yöneltir.",
        ],
        callsToAction: [
          "Bu söz vicdanınızın yanından geçip gitmesin; sizi alçakgönüllülüğe, imana ve kutsallık için yenilenmiş gayrete götürsün.",
          "Kutsal Yazı'nın yargısı ve tesellisi altında durun ki bundan sonraki yolu korku değil Rab'be itaat belirlesin.",
        ],
      },
      pastoral: {
        theologyLines: [
          "Mesih yalnızca gerçeği açıklamaz; yaralı yüreği şefkatle iyileşmeye ve itaate götürür.",
          "Bu metnin pastoral gücü lütfu, gerçeği ve vicdanla ilgilenmeyi birleştirmesindedir.",
        ],
        callsToAction: [
          "Bu konuyu duaya getirin, Tanrı'nın önünde dürüstçe açın ve sonraki adım için O'ndan bilgelik isteyin.",
          "Bu soruyla yalnız kalmayın: Tanrı'nın Sözü'nü, duayı ve olgun ruhsal rehberliği arayın.",
        ],
      },
      evangelistic: {
        theologyLines: [
          "Müjde yalnızca davranışı düzeltmeye değil, önce yüreğin Mesih'e imanla dönmesine çağırır.",
          "Tanrı'ya doğru cevabın merkezinde kendini geliştirme değil, tövbe ve İsa Mesih'e güven vardır.",
        ],
        callsToAction: [
          "Rab bu ayetle sizi uyarıyorsa ertelemeyin: bugün tövbe ve imanla O'na dönün.",
          "Bu metin sadece paylaşılacak bir düşünce değil, Tanrı'yla barışmaya ve Mesih'in ardından gitmeye kişisel çağrı olsun.",
        ],
      },
      meditative: {
        theologyLines: [
          "Tanrı'nın Sözü çoğu zaman derinden ve sessizce işler; acelede fark edemediğimiz şeyi aydınlatır.",
          "Lütuf bize durmayı, dinlemeyi ve Kutsal Yazı'nın yüreği yargılayıp iyileştirmesine izin vermeyi öğretir.",
        ],
        callsToAction: [
          "Bu ayetin önünde yavaşlayın, onun üzerinde dua edin ve Rab'bin yüreğinizde neyi değiştirmek istediğini sorun.",
          "Sessizliğe, duaya ve dürüst düşünmeye yer açın ki Tanrı'nın Sözü duygulardan daha derine kök salsın.",
        ],
      },
      poetic: {
        theologyLines: [
          "Tanrı'nın gerçeği güzel duyulduğunda zayıflamaz; açık bir imge ve canlı sözle yüreğe daha derin işler.",
          "Kutsal Yazı aynı anda yaralayabilir ve iyileştirebilir, uyarabilir ve Mesih'in ışığına götürebilir.",
        ],
        callsToAction: [
          "Bu ayet sizin için yalnızca güzel bir cümle değil, tövbeye, imana ve yeni itaate giden yol olsun.",
          "Bu düşünceyi yüreğinizde saklayın, üzerinde dua edin ve kararlarınızı Tanrı önünde dönüştürmesine izin verin.",
        ],
      },
    };

    const languagePacks = packs[state.language] || packs.ru;
    return languagePacks[state.postStyle] || languagePacks.inspiring || packs.ru.inspiring;
  }

  function getFallbackStoryHooks() {
    const hooks = {
      ru: {
        soft: [
          "Иногда сердце устает раньше, чем человек находит правильные слова.",
          "Бывает, что тема давно болит внутри, даже если снаружи все выглядит спокойно.",
        ],
        inspiring: [
          "Иногда один честный вопрос перед Богом меняет целое направление жизни.",
          "Даже в запутанной теме Божье слово способно зажечь ясность и надежду.",
        ],
        conservative: [
          "Часто проблема начинается там, где сердце перестает внимательно слушать Писание.",
          "Самые важные темы жизни требуют не спешки, а трезвого суда Божьего слова.",
        ],
        modern: [
          "Иногда все выглядит нормально, но внутри уже давно нужен честный разговор с Богом.",
          "Есть темы, в которых шум вокруг слишком громкий, чтобы без Писания услышать правду.",
        ],
        historical: [
          "Во все времена человеческое сердце боролось с теми же страхами, желаниями и заблуждениями.",
          "Церковь всегда знала: настоящая перемена начинается не с внешнего, а с сердца перед Богом.",
        ],
        pastoral: [
          "Бывает, что человек улыбается, а внутри давно несет тяжелый вопрос в одиночку.",
          "Иногда именно там, где больнее всего, Божье слово начинает лечить глубже всего.",
        ],
        evangelistic: [
          "Иногда тема кажется личной, но на самом деле Господь через нее зовет сердце к покаянию.",
          "За внешним вопросом часто стоит более главный: готово ли сердце снова обратиться ко Христу.",
        ],
        meditative: [
          "Есть вопросы, которые нельзя исцелить поспешным ответом.",
          "Иногда душе нужно остановиться, чтобы Божье слово прозвучало глубже тревоги.",
        ],
        poetic: [
          "Иногда сердце носит в себе целую бурю под видом одного короткого вопроса.",
          "Бывает, что даже тихая тема внутри человека звучит как целая ночь без рассвета.",
        ],
      },
      uk: {
        soft: [
          "Іноді серце втомлюється раніше, ніж людина знаходить правильні слова.",
          "Буває, що тема давно болить усередині, навіть якщо зовні все виглядає спокійно.",
        ],
        inspiring: [
          "Іноді одне чесне запитання перед Богом змінює цілий напрямок життя.",
          "Навіть у заплутаній темі Боже слово здатне запалити ясність і надію.",
        ],
        conservative: [
          "Часто проблема починається там, де серце перестає уважно слухати Писання.",
          "Найважливіші теми життя потребують не поспіху, а тверезого суду Божого слова.",
        ],
        modern: [
          "Іноді все виглядає нормально, але всередині вже давно потрібна чесна розмова з Богом.",
          "Є теми, у яких шум довкола надто гучний, щоб без Писання почути правду.",
        ],
        historical: [
          "У всі часи людське серце боролося з тими самими страхами, бажаннями й оманами.",
          "Церква завжди знала: справжня зміна починається не із зовнішнього, а з серця перед Богом.",
        ],
        pastoral: [
          "Буває, що людина усміхається, а всередині давно несе важке питання наодинці.",
          "Іноді саме там, де болить найбільше, Боже слово починає лікувати найглибше.",
        ],
        evangelistic: [
          "Іноді тема здається особистою, але насправді Господь через неї кличе серце до покаяння.",
          "За зовнішнім питанням часто стоїть важливіше: чи готове серце знову звернутися до Христа.",
        ],
        meditative: [
          "Є питання, які не можна зцілити поспішною відповіддю.",
          "Іноді душі потрібно зупинитися, щоб Боже слово прозвучало глибше за тривогу.",
        ],
        poetic: [
          "Іноді серце носить у собі цілу бурю під виглядом одного короткого питання.",
          "Буває, що навіть тиха тема всередині людини звучить як ціла ніч без світанку.",
        ],
      },
      pl: {
        soft: [
          "Czasem serce męczy się wcześniej, niż człowiek znajdzie właściwe słowa.",
          "Bywa, że temat boli od dawna w środku, nawet jeśli na zewnątrz wszystko wygląda spokojnie.",
        ],
        inspiring: [
          "Czasem jedno uczciwe pytanie zadane przed Bogiem zmienia cały kierunek życia.",
          "Nawet w zagmatwanym temacie Boże słowo potrafi rozpalić jasność i nadzieję.",
        ],
        conservative: [
          "Problem często zaczyna się tam, gdzie serce przestaje uważnie słuchać Pisma.",
          "Najważniejsze tematy życia wymagają nie pośpiechu, lecz trzeźwego sądu Bożego słowa.",
        ],
        modern: [
          "Czasem wszystko wygląda normalnie, a jednak w środku od dawna potrzebna jest szczera rozmowa z Bogiem.",
          "Są tematy, w których hałas wokół jest zbyt głośny, by bez Pisma usłyszeć prawdę.",
        ],
        historical: [
          "W każdej epoce ludzkie serce zmagało się z tymi samymi lękami, pragnieniami i złudzeniami.",
          "Kościół od dawna wiedział, że prawdziwa zmiana zaczyna się nie od zewnętrzności, lecz od serca przed Bogiem.",
        ],
        pastoral: [
          "Bywa, że człowiek się uśmiecha, a w środku od dawna niesie trudne pytanie w samotności.",
          "Niekiedy właśnie tam, gdzie boli najmocniej, Boże słowo zaczyna leczyć najgłębiej.",
        ],
        evangelistic: [
          "Czasem temat wydaje się tylko osobisty, a tymczasem Pan przez niego wzywa serce do pokuty.",
          "Za zewnętrznym pytaniem często kryje się ważniejsze: czy serce jest gotowe znów zwrócić się do Chrystusa.",
        ],
        meditative: [
          "Są pytania, których nie da się uzdrowić pośpieszną odpowiedzią.",
          "Czasem dusza musi się zatrzymać, aby Boże słowo zabrzmiało głębiej niż lęk.",
        ],
        poetic: [
          "Czasem serce nosi w sobie całą burzę pod postacią jednego krótkiego pytania.",
          "Bywa, że nawet cichy temat rozbrzmiewa w człowieku jak cała noc bez świtu.",
        ],
      },
      tr: {
        soft: [
          "Bazen yürek doğru kelimeleri bulmadan önce yorulur.",
          "Dışarıdan sakin görünse de bazı konular insanın içinde uzun zamandır acır.",
        ],
        inspiring: [
          "Tanrı'nın önünde sorulan dürüst bir soru bazen hayatın yönünü değiştirir.",
          "En karışık konuda bile Tanrı'nın Sözü açıklık ve umut yakabilir.",
        ],
        conservative: [
          "Sorun çoğu zaman yüreğin Kutsal Yazı'yı dikkatle dinlemeyi bırakmasıyla başlar.",
          "Hayatın en önemli konuları acele değil, Tanrı Sözü'nün ayık yargısını ister.",
        ],
        modern: [
          "Bazen her şey normal görünür, ama içeride Tanrı'yla dürüst bir konuşmaya çoktan ihtiyaç vardır.",
          "Bazı konularda etraftaki gürültü o kadar yüksektir ki Kutsal Yazı olmadan gerçeği duymak zorlaşır.",
        ],
        historical: [
          "Her çağda insan yüreği aynı korkular, arzular ve yanılgılarla mücadele etti.",
          "Kilise her zaman şunu bildi: gerçek değişim dıştan değil, Tanrı önündeki yürekten başlar.",
        ],
        pastoral: [
          "Bazen insan gülümser, ama içinde ağır bir soruyu tek başına taşır.",
          "Çoğu zaman en çok acıyan yerde Tanrı'nın Sözü en derinden iyileştirmeye başlar.",
        ],
        evangelistic: [
          "Bazen konu kişisel görünür, ama Rab onun aracılığıyla yüreği tövbeye çağırır.",
          "Dıştaki sorunun ardında çoğu zaman daha büyük bir soru vardır: yürek Mesih'e dönmeye hazır mı?",
        ],
        meditative: [
          "Bazı sorular acele bir cevapla iyileştirilemez.",
          "Bazen ruhun durması gerekir ki Tanrı'nın Sözü kaygıdan daha derin duyulsun.",
        ],
        poetic: [
          "Bazen yürek tek bir kısa sorunun içinde bütün bir fırtına taşır.",
          "Kimi zaman insanın içindeki sessiz konu, şafaksız bir gece gibi yankılanır.",
        ],
      },
    };

    const languageHooks = hooks[state.language] || hooks.ru;
    return languageHooks[state.postStyle] || languageHooks.inspiring || hooks.ru.inspiring;
  }

  function getFallbackEmojiPair() {
    if (!state.allowEmojis) {
      return { lead: "", close: "" };
    }

    const emojiSets = {
      soft: { lead: "🌿 ", close: "🤍 " },
      inspiring: { lead: "✨ ", close: "🔥 " },
      conservative: { lead: "📖 ", close: "🙏 " },
      modern: { lead: "✦ ", close: "🕊️ " },
      historical: { lead: "📜 ", close: "🙏 " },
      pastoral: { lead: "🕊️ ", close: "🤲 " },
      evangelistic: { lead: "📣 ", close: "✨ " },
      meditative: { lead: "🌙 ", close: "🙏 " },
      poetic: { lead: "☀️ ", close: "🌿 " },
    };

    return emojiSets[state.postStyle] || emojiSets.inspiring;
  }

  function buildFallbackHashtags(tags) {
    const baseSets = {
      ru: ["#вера", "#евангелие", "#библия", "#христианство", "#надежда"],
      uk: ["#віра", "#євангеліє", "#біблія", "#християнство", "#надія"],
      pl: ["#wiara", "#ewangelia", "#biblia", "#chrześcijaństwo", "#nadzieja"],
      tr: ["#iman", "#müjde", "#kutsalkitap", "#hristiyanlık", "#umut"],
    };

    const normalized = uniqueItems(
      (tags || [])
        .map(function (tag) {
          return "#" + normalizeHashtagLocal(tag);
        })
        .filter(Boolean)
        .concat(baseSets[state.language] || baseSets.ru)
    );

    return normalized.slice(0, 5);
  }

  function localizeVerseFallback(text) {
    return text;
  }

  function localizeReferenceFallback(reference) {
    return reference;
  }

  function normalizeHashtagLocal(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/ё/g, "е")
      .replace(/[^\p{L}\p{N}]+/gu, "")
      .trim();
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function getSampleTopicsForLanguage(language) {
    const targetLanguage = language || state.language;
    return uniqueItems(
      (sampleTopicsByLanguage[targetLanguage] || sampleTopicsByLanguage.ru).concat(
        currentConcernTopicsByLanguage[targetLanguage] || currentConcernTopicsByLanguage.ru
      )
    );
  }

  function buildTopicTranslationCatalog() {
    const catalog = Object.create(null);

    [sampleTopicsByLanguage, currentConcernTopicsByLanguage].forEach(function (topicPack) {
      const maxLength = Math.max(
        (topicPack.ru || []).length,
        (topicPack.uk || []).length,
        (topicPack.pl || []).length,
        (topicPack.tr || []).length
      );

      for (let index = 0; index < maxLength; index += 1) {
        const entry = {
          ru: topicPack.ru[index] || "",
          uk: topicPack.uk[index] || "",
          pl: topicPack.pl[index] || "",
          tr: topicPack.tr[index] || "",
        };

        Object.keys(entry).forEach(function (language) {
          const key = normalize(entry[language]);
          if (key) {
            catalog[key] = entry;
          }
        });
      }
    });

    return catalog;
  }

  async function translateTopicForLanguage(topic, sourceLanguage, targetLanguage) {
    const cleanTopic = String(topic || "").trim();
    if (!cleanTopic || sourceLanguage === targetLanguage) {
      return cleanTopic;
    }

    const localMatch = getTopicTranslationFromCatalog(cleanTopic, targetLanguage);
    if (localMatch) {
      return localMatch;
    }

    try {
      const payload = await requestTopicTranslationFromServer(cleanTopic, sourceLanguage, targetLanguage);
      return (payload && payload.topic ? String(payload.topic).trim() : cleanTopic) || cleanTopic;
    } catch {
      return cleanTopic;
    }
  }

  function getTopicTranslationFromCatalog(topic, targetLanguage) {
    const entry = topicTranslationCatalog[normalize(topic)];
    if (!entry) {
      return "";
    }

    return entry[targetLanguage] || "";
  }

  async function requestTopicTranslationFromServer(topic, sourceLanguage, targetLanguage) {
    const response = await fetch("/api/translate-topic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: topic,
        sourceLanguage: sourceLanguage,
        targetLanguage: targetLanguage,
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || t("postRequestFailed"));
    }

    return payload;
  }

  function getTopicDeckForLanguage(language, cycle) {
    const targetLanguage = language || state.language;
    const baseTopics = getSampleTopicsForLanguage(targetLanguage);
    const generatedTopics = buildGeneratedTopicCandidates(targetLanguage, cycle || 0);

    return uniqueItems(baseTopics.concat(generatedTopics)).slice(0, TOPIC_DECK_SIZE);
  }

  function buildGeneratedTopicCandidates(language, cycle) {
    const bank = getTopicGeneratorBank(language);
    const anchors = getSampleTopicsForLanguage(language);
    const template = bank.templates[Math.abs(cycle || 0) % bank.templates.length];
    const offset = Math.abs(hashString(language + ":" + cycle)) % anchors.length;
    const candidates = [];

    bank.actions.forEach(function (action) {
      for (let index = 0; index < anchors.length; index += 1) {
        const anchor = anchors[(index + offset) % anchors.length];
        candidates.push(
          template
            .replace("{anchor}", anchor)
            .replace("{action}", action)
            .replace(/\s+/g, " ")
            .trim()
        );
      }
    });

    return candidates;
  }

  function getTopicGeneratorBank(language) {
    const banks = {
      ru: {
        templates: [
          "{anchor} — как {action} по Писанию",
          "{anchor}: что значит {action} практически",
          "как {action}, если тема звучит так: {anchor}",
          "{anchor} — как Евангелие помогает {action}",
          "{anchor} — почему важно {action}",
        ],
        actions: [
          "сохранять мир сердца",
          "доверять Богу",
          "не строить ценность на чужом одобрении",
          "говорить правду с любовью",
          "проходить конфликт без ожесточения",
          "беречь чистоту сердца",
          "строить отношения без спешки",
          "искать Божью волю",
          "молиться, когда нет сил",
          "сохранять сострадание",
          "не выгорать в служении",
          "принимать мудрые решения",
          "не сравнивать себя с другими",
          "прощать, когда больно",
          "не терять надежду",
          "укреплять брак",
          "восстанавливать доверие",
          "хранить здоровые границы",
          "слушать ближнего внимательно",
          "воспитывать детей с миром",
          "жить верой в неопределенности",
          "относиться к деньгам без страха",
          "находить тишину для молитвы",
          "не зависеть от лайков",
          "проходить одиночество без ожесточения",
          "выбирать верность Христу",
          "не отвечать гневом",
          "видеть ценность человека",
          "строить дом на Божьем основании",
          "служить без гордости",
          "жить свято в цифровую эпоху",
          "сохранять радость",
          "учиться терпению",
          "признавать свои ошибки",
          "начинать снова после падения",
        ],
      },
      uk: {
        templates: [
          "{anchor} — як {action} за Писанням",
          "{anchor}: що означає {action} на практиці",
          "як {action}, якщо тема звучить так: {anchor}",
          "{anchor} — як Євангеліє допомагає {action}",
          "{anchor} — чому важливо {action}",
        ],
        actions: [
          "зберігати мир у серці",
          "довіряти Богові",
          "не будувати цінність на чужому схваленні",
          "говорити правду з любов'ю",
          "проходити конфлікт без озлоблення",
          "берегти чистоту серця",
          "будувати стосунки без поспіху",
          "шукати Божу волю",
          "молитися, коли немає сил",
          "зберігати співчуття",
          "не вигоряти у служінні",
          "приймати мудрі рішення",
          "не порівнювати себе з іншими",
          "прощати, коли боляче",
          "не втрачати надію",
          "зміцнювати шлюб",
          "відновлювати довіру",
          "берегти здорові межі",
          "уважно слухати ближнього",
          "виховувати дітей у мирі",
          "жити вірою в невизначеності",
          "ставитися до грошей без страху",
          "знаходити тишу для молитви",
          "не залежати від лайків",
          "проходити самотність без озлоблення",
          "обирати вірність Христу",
          "не відповідати гнівом",
          "бачити цінність людини",
          "будувати дім на Божій основі",
          "служити без гордості",
          "жити свято в цифрову епоху",
          "зберігати радість",
          "вчитися терпінню",
          "визнавати свої помилки",
          "починати знову після падіння",
        ],
      },
      pl: {
        templates: [
          "{anchor} — jak {action} według Pisma",
          "{anchor}: co znaczy {action} w praktyce",
          "jak {action}, gdy temat brzmi: {anchor}",
          "{anchor} — jak Ewangelia pomaga {action}",
          "{anchor} — dlaczego warto {action}",
        ],
        actions: [
          "zachować pokój serca",
          "ufać Bogu",
          "nie budować wartości na cudzej aprobacie",
          "mówić prawdę z miłością",
          "przechodzić konflikt bez zgorzknienia",
          "strzec czystości serca",
          "budować relacje bez pośpiechu",
          "szukać Bożej woli",
          "modlić się, kiedy brakuje sił",
          "zachować współczucie",
          "nie wypalić się w służbie",
          "podejmować mądre decyzje",
          "nie porównywać się z innymi",
          "przebaczać, kiedy boli",
          "nie tracić nadziei",
          "umacniać małżeństwo",
          "odbudowywać zaufanie",
          "strzec zdrowych granic",
          "uważnie słuchać bliźniego",
          "wychowywać dzieci w pokoju",
          "żyć wiarą w niepewności",
          "podchodzić do pieniędzy bez strachu",
          "znajdować ciszę do modlitwy",
          "nie zależeć od lajków",
          "przechodzić samotność bez zgorzknienia",
          "wybierać wierność Chrystusowi",
          "nie odpowiadać gniewem",
          "widzieć wartość człowieka",
          "budować dom na Bożym fundamencie",
          "służyć bez pychy",
          "żyć święcie w cyfrowej epoce",
          "zachować radość",
          "uczyć się cierpliwości",
          "przyznawać się do błędów",
          "zaczynać od nowa po upadku",
        ],
      },
      tr: {
        templates: [
          "{anchor} — Kutsal Yazı'ya göre {action}",
          "{anchor}: pratikte {action} ne demektir",
          "konu şuyken {action}: {anchor}",
          "{anchor} — Müjde {action} konusunda nasıl yardım eder",
          "{anchor} — neden {action} önemlidir",
        ],
        actions: [
          "yüreğin esenliğini korumak",
          "Tanrı'ya güvenmek",
          "değerini başkalarının onayına dayandırmamak",
          "gerçeği sevgiyle söylemek",
          "çatışmadan acılaşmadan geçmek",
          "yüreğin paklığını korumak",
          "ilişkileri acele etmeden kurmak",
          "Tanrı'nın isteğini aramak",
          "güç kalmadığında dua etmek",
          "merhameti kaybetmemek",
          "hizmette tükenmemek",
          "bilge kararlar vermek",
          "kendini başkalarıyla kıyaslamamak",
          "acı verdiğinde bağışlamak",
          "umudu kaybetmemek",
          "evliliği güçlendirmek",
          "güveni yeniden kurmak",
          "sağlıklı sınırları korumak",
          "yakınını dikkatle dinlemek",
          "çocukları esenlikle yetiştirmek",
          "belirsizlikte imanla yaşamak",
          "paraya korkusuzca yaklaşmak",
          "dua için sessizliği bulmak",
          "beğenilere bağımlı olmamak",
          "yalnızlıktan acılaşmadan geçmek",
          "Mesih'e sadakati seçmek",
          "öfkeyle cevap vermemek",
          "insanın değerini görmek",
          "evi Tanrı'nın temeli üzerine kurmak",
          "gurursuzca hizmet etmek",
          "dijital çağda kutsal yaşamak",
          "sevinci korumak",
          "sabrı öğrenmek",
          "hatalarını kabul etmek",
          "düşüşten sonra yeniden başlamak",
        ],
      },
    };

    return banks[language] || banks.ru;
  }

  function getNextRandomTopic(language) {
    const targetLanguage = language || state.language;
    let rotation = state.topicRotation[targetLanguage] || createEmptyTopicLanguageState();
    let topics = getTopicDeckForLanguage(targetLanguage, rotation.cycle || 0);
    const recentLimit = 18;
    let deckSize = topics.length;

    rotation.queue = (rotation.queue || []).filter(function (topic) {
      return topics.indexOf(topic) !== -1;
    });
    rotation.recent = (rotation.recent || []).filter(function (topic) {
      return topics.indexOf(topic) !== -1;
    });

    if (!rotation.queue.length || (rotation.used || 0) >= deckSize) {
      if ((rotation.used || 0) >= deckSize) {
        rotation.cycle = (rotation.cycle || 0) + 1;
      }

      rotation.used = 0;
      topics = getTopicDeckForLanguage(targetLanguage, rotation.cycle || 0);
      deckSize = topics.length;
      const recentSet = new Set(rotation.recent.slice(0, recentLimit));
      const freshPool = topics.filter(function (topic) {
        return !recentSet.has(topic);
      });
      rotation.queue = shuffleArray((freshPool.length ? freshPool : topics).slice());
    }

    let nextTopic = rotation.queue.pop() || topics[0] || "";
    const currentTopic = elements.topicInput.value.trim();

    if (nextTopic && currentTopic && nextTopic === currentTopic && rotation.queue.length) {
      rotation.queue.unshift(nextTopic);
      nextTopic = rotation.queue.pop();
    }

    rotation.used = Math.min(deckSize, (rotation.used || 0) + 1);
    rotation.recent = [nextTopic]
      .concat(
        rotation.recent.filter(function (topic) {
          return topic !== nextTopic;
        })
      )
      .slice(0, recentLimit);

    state.topicRotation[targetLanguage] = rotation;
    saveTopicRotationState();
    return nextTopic;
  }

  function loadTopicRotationState() {
    const emptyState = createEmptyTopicRotationState();

    try {
      if (!window.localStorage) {
        return emptyState;
      }

      const raw = window.localStorage.getItem(TOPIC_ROTATION_STORAGE_KEY);
      if (!raw) {
        return emptyState;
      }

      const parsed = JSON.parse(raw);
      return normalizeTopicRotationState(parsed);
    } catch {
      return emptyState;
    }
  }

  function saveTopicRotationState() {
    try {
      if (!window.localStorage) {
        return;
      }

      window.localStorage.setItem(
        TOPIC_ROTATION_STORAGE_KEY,
        JSON.stringify(normalizeTopicRotationState(state.topicRotation))
      );
    } catch {
      // Ignore storage issues and keep the in-memory rotation.
    }
  }

  function createEmptyTopicRotationState() {
    return {
      ru: createEmptyTopicLanguageState(),
      uk: createEmptyTopicLanguageState(),
      pl: createEmptyTopicLanguageState(),
      tr: createEmptyTopicLanguageState(),
    };
  }

  function createEmptyTopicLanguageState() {
    return {
      queue: [],
      recent: [],
      used: 0,
      cycle: 0,
    };
  }

  function normalizeTopicRotationState(value) {
    const normalized = createEmptyTopicRotationState();
    const source = value && typeof value === "object" ? value : {};

    Object.keys(normalized).forEach(function (language) {
      const entry = source[language] && typeof source[language] === "object" ? source[language] : {};
      normalized[language] = {
        queue: Array.isArray(entry.queue) ? entry.queue.filter(Boolean) : [],
        recent: Array.isArray(entry.recent) ? entry.recent.filter(Boolean) : [],
        used: Number.isFinite(Number(entry.used)) ? Math.max(0, Number(entry.used)) : 0,
        cycle: Number.isFinite(Number(entry.cycle)) ? Math.max(0, Number(entry.cycle)) : 0,
      };
    });

    return normalized;
  }

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/ё/g, "е")
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function tokenize(value) {
    return normalize(value).split(" ").filter(Boolean);
  }

  function stemWord(word) {
    return word.replace(
      /(иями|ями|ами|его|ого|ему|ому|ыми|ими|ией|ией|ией|ией|ой|ий|ый|ая|яя|ое|ее|ые|ие|ам|ям|ах|ях|ов|ев|ей|ою|ею|ую|юю|а|я|ы|и|е|о|у|ю)$/u,
      ""
    );
  }

  function shortenText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }

    return text.slice(0, maxLength - 1).trim() + "…";
  }

  function uniqueItems(items) {
    return Array.from(new Set(items));
  }

  function shuffleArray(items) {
    for (let index = items.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      const temporary = items[index];
      items[index] = items[swapIndex];
      items[swapIndex] = temporary;
    }

    return items;
  }

  function pickDeterministic(items, seed) {
    if (!items.length) {
      return "";
    }

    return items[Math.abs(hashString(seed)) % items.length];
  }

  function hashString(value) {
    let hash = 0;

    for (let index = 0; index < value.length; index += 1) {
      hash = (hash << 5) - hash + value.charCodeAt(index);
      hash |= 0;
    }

    return hash;
  }

  function slugify(value) {
    return normalize(value)
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "post-maker";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
