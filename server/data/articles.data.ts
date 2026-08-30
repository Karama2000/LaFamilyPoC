export interface ArticleRaw {
  id: string;
  titre: string;
  contenu: string;
  categorie: string; // une des 10 valeurs FR exactes ci-dessous
  image: string;
  date: string;
  dateISO: string;
}

export interface ArticleCategory {
  key: string; // DOIT correspondre aux valeurs de CATEGORY_KEY_MAP côté backend
  labelKey: string; // clé de traduction utilisée par ta fonction t()
}

export const articleCategories: ArticleCategory[] = [
  { key: "grossesse", labelKey: "catGrossesse" },
  { key: "bebe", labelKey: "catBebe" },
  { key: "petiteEnfance", labelKey: "catPetiteEnfance" },
  { key: "enfance", labelKey: "catEnfance" },
  { key: "adolescence", labelKey: "catAdolescence" },
  { key: "scolarite", labelKey: "catScolarite" },
  { key: "parents", labelKey: "catParents" },
  { key: "vieDeFamille", labelKey: "catVieDeFamille" },
  { key: "travail", labelKey: "catTravail" },
  { key: "assurances", labelKey: "catAssurances" },
];

// Catégories valides : Grossesse, Bébé, Petite enfance, Enfance, Adolescence,
// Scolarité, Parents, Vie de famille, Travail, Budget et assurance

export const articlesData: ArticleRaw[] = [
  // ===== GROSSESSE =====
  {
    id: "grossesse-1",
    titre:
      "Sport pendant la grossesse : que doivent savoir les futures mamans ?",
    contenu:
      "Les experts sont unanimes : une activité physique modérée favorise la santé et le bien-être. Cela vaut également pendant la grossesse, à condition de respecter certaines précautions. Durant cette période particulière, il est important que les futures mamans soient à l’écoute de leur corps et évitent de se surmener.\n\nUn entraînement adapté peut même soulager certains désagréments typiques de la grossesse. Après la grossesse, l’activité physique peut également aider à retrouver sa silhouette d’avant. Mais quels sports sont particulièrement adaptés ? Qui doit être prudente et qui devrait mieux s’abstenir complètement ?\n\nQuels sports sont adaptés aux femmes enceintes ?\n\nCertaines activités physiques sont plus bénéfiques et adaptées pendant la grossesse que d’autres. En règle générale, il convient d’éviter les sports présentant un risque particulier de blessure ainsi que les compétitions sportives. Le ski, la plongée ou l’escalade sont donc à éviter. La grossesse n’est pas une période de la vie pendant laquelle il faut chercher à atteindre des performances sportives maximales. Il s’agit plutôt de faire du bien au corps et à l’esprit.\n\nL’entraînement aérobique est particulièrement recommandé. Cela signifie que le corps reçoit suffisamment d’oxygène pendant toute la durée de l’entraînement. Les activités recommandées comprennent les exercices dans l’eau, la gymnastique douce ou les sports qui ménagent les articulations, comme le vélo et la marche. Le yoga prénatal est également considéré par de nombreuses femmes comme une activité très bénéfique. Il présente notamment l’avantage de faire travailler des techniques de respiration spécifiques, qui peuvent être précieuses lors de l’accouchement.\n\nLes exercices destinés à renforcer le plancher pelvien sont également une excellente idée. Un plancher pelvien solide joue un rôle important pendant la grossesse et l’accouchement, mais aussi durant la période de récupération après la naissance. Il peut ainsi contribuer à soulager efficacement, voire à prévenir, les problèmes de faiblesse de la vessie pendant et après la grossesse.\n\nComment bien s’entraîner pendant la grossesse ?\n\nLes femmes qui pratiquaient déjà une activité sportive avant leur grossesse peuvent généralement continuer à faire du sport pendant la grossesse, à condition qu’il ne s’agisse pas de sports à risque et que la grossesse ne présente pas de complications particulières. Durant les deux premiers trimestres de la grossesse, il est généralement possible de poursuivre son entraînement habituel, avec certaines adaptations.\n\nLes femmes qui pratiquent un sport de haut niveau ou qui s’entraînent de manière très intensive constituent toutefois une exception. Elles devraient en parler avec leur médecin et, si nécessaire, réduire l’intensité de leur entraînement.\n\nLes femmes enceintes qui ne faisaient pas de sport auparavant peuvent également commencer une activité physique pendant la grossesse. Dans ce cas, il est particulièrement important de procéder progressivement et avec prudence. Commencez par une faible intensité et environ dix minutes d’activité physique par jour. Avec le temps, vous pourrez augmenter progressivement la durée et l’intensité, toujours en tenant compte de votre condition physique et de vos sensations.\n\nQuand le sport est-il déconseillé pendant la grossesse ?\n\nLorsque la grossesse se déroule normalement, il est généralement possible de continuer à pratiquer une activité physique. Il existe toutefois certaines situations médicales dans lesquelles il est préférable de renoncer au sport. En règle générale, si vous souhaitez être prudente, demandez l’avis de votre gynécologue ou de votre médecin avant de commencer ou de poursuivre un entraînement.\n\nOn pensait autrefois que l’activité physique pouvait provoquer un accouchement prématuré et entraîner des contractions avant terme. Cette inquiétude s’est toutefois révélée infondée. Dans les grossesses normales, les études n’ont pas montré de risque accru d’accouchement prématuré chez les femmes pratiquant une activité physique. Au contraire, il semblerait que la pratique régulière d’un sport puisse même réduire le risque d’accouchement prématuré et de contractions avant terme.\n\nDe manière générale, pendant la grossesse, l’activité physique doit être pratiquée de manière à éviter tout effort excessif. Cela signifie que les femmes enceintes ne doivent pas avoir la sensation de manquer d’air pendant leur activité sportive.\n\nUne prudence particulière est nécessaire en cas de grossesse à risque. Cela peut notamment être le cas lorsqu’il existe un risque accru de fausse couche ou lorsque des problèmes de santé préexistants sont présents. En cas de grossesse multiple présentant un risque de contractions prématurées, il est également préférable d’éviter le sport.\n\nSi des difficultés respiratoires, des saignements, des vertiges ou des douleurs abdominales apparaissent pendant l’entraînement, il est important d’arrêter immédiatement l’activité physique. Dans ce cas, consultez votre médecin afin de vous assurer que tout va bien.",

    categorie: "Grossesse",
    image:
      "https://www.diefamilie.ch/data/dataimages/Upload/enceinte-sport-2.jpg",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "grossesse-2",

    titre: "Chute de cheveux pendant la grossesse : causes et traitements",
    contenu:
      "La chute de cheveux est un phénomène très répandu qui touche de nombreuses personnes. Lorsqu’elle survient pendant la grossesse, elle peut être particulièrement préoccupante. Pour les femmes, la perte de cheveux durant cette période peut être difficile à vivre, car elle s’accompagne de nombreux changements physiques et émotionnels. Mais pourquoi de nombreuses femmes souffrent-elles de chute de cheveux pendant et après la grossesse, et que peut-on faire pour y remédier ?\n\nLa chute de cheveux : un sujet particulièrement difficile pour les femmes\n\nLa chute de cheveux représente un défi pour de nombreuses personnes, mais elle peut être particulièrement difficile à vivre pour les femmes. Les cheveux sont souvent considérés comme un symbole de féminité, d’attractivité et d’estime de soi, et leur perte peut entraîner un stress émotionnel important. Pour de nombreuses femmes, la chute de cheveux est donc bien plus qu’un simple problème esthétique : elle peut affecter la confiance en soi et le bien-être général.\n\nLe sentiment de perdre le contrôle de son apparence peut entraîner de l’anxiété, une dépression et une image négative de son corps.\n\nPour les personnes souffrant d’une chute de cheveux avancée et à la recherche d’une solution, la greffe de cheveux peut constituer une option efficace pour retrouver une chevelure durablement plus dense. Selon la cause, d’autres méthodes peuvent également contribuer à réduire la chute de cheveux chez les femmes, notamment lorsque celle-ci est exclusivement liée à la grossesse.\n\nLes causes possibles de la chute de cheveux pendant la grossesse\n\nLes causes de la chute de cheveux pendant la grossesse sont multiples : changements hormonaux, maladies liées à la grossesse ou encore carences nutritionnelles. Toutefois, seul un médecin peut établir un diagnostic précis. En cas de chute de cheveux pendant la grossesse, un examen médical est donc indispensable pour en déterminer la cause.\n\nLes fluctuations hormonales\n\nPendant la grossesse, les femmes connaissent d’importants changements hormonaux qui peuvent avoir des effets sur l’ensemble de l’organisme. L’augmentation du taux d’œstrogènes peut notamment maintenir les cheveux plus longtemps dans leur phase de croissance et réduire leur chute habituelle. Cela peut donner une chevelure plus abondante et plus dense, dont beaucoup de femmes enceintes apprécient l’aspect.\n\nCependant, le taux d’hormones peut changer considérablement après la naissance du bébé, ce qui peut entraîner une chute de cheveux plus importante. Cette chute, également appelée alopécie post-partum, apparaît généralement environ trois mois après l’accouchement et peut durer jusqu’à un an. Il peut s’agir d’une étape normale du processus de récupération après l’accouchement, et la chute de cheveux disparaît généralement d’elle-même.\n\nLes maladies liées à la grossesse\n\nOutre les changements hormonaux, certaines maladies liées à la grossesse, comme la prééclampsie ou le diabète gestationnel, peuvent également entraîner une chute de cheveux. Ces problèmes peuvent mettre l’organisme à rude épreuve et provoquer une augmentation de la perte de cheveux. Un diagnostic et une prise en charge précoces de ces problèmes sont donc particulièrement importants pour réduire la chute de cheveux.\n\nLa carence en fer comme cause possible\n\nLa carence en fer est particulièrement fréquente pendant la grossesse, car les besoins en ce minéral augmentent afin de répondre aux besoins de la mère et de l’enfant. Une carence en fer peut également provoquer une anémie, qui peut à son tour entraîner une chute de cheveux. Les femmes qui souffrent d’une chute de cheveux importante pendant la grossesse devraient donc faire contrôler leur taux de fer et, si nécessaire, consommer des aliments riches en fer ou prendre des compléments alimentaires sur conseil médical.\n\nLa chute de cheveux comme signe de problèmes thyroïdiens\n\nLa chute de cheveux peut également être un indicateur de problèmes thyroïdiens, notamment en cas d’hypothyroïdie ou d’hyperthyroïdie. La thyroïde est un organe important qui régule le métabolisme et de nombreuses autres fonctions de l’organisme, notamment la croissance des cheveux. Lorsque la thyroïde ne fonctionne pas correctement, cela peut perturber le cycle de croissance des cheveux et provoquer leur chute.\n\nLes personnes souffrant de troubles de la thyroïde peuvent également présenter d’autres symptômes, comme de la fatigue, des changements de poids ou des variations d’humeur. Un diagnostic et un traitement précoces des problèmes thyroïdiens sont donc particulièrement importants afin de limiter la chute de cheveux et d’éviter d’autres problèmes de santé.\n\nLa chute de cheveux d’origine génétique chez les femmes\n\nLa chute de cheveux chez les femmes peut également être d’origine génétique. La chute de cheveux d’origine génétique, également appelée alopécie androgénétique féminine, touche des millions de femmes dans le monde. Ce type de chute de cheveux est souvent lié à l’hérédité de certains gènes qui rendent les cheveux sensibles aux hormones masculines, notamment à la dihydrotestostérone (DHT). Avec le temps, le cycle de croissance du cheveu se raccourcit, ce qui entraîne des cheveux plus fins et plus fragiles, pouvant finalement conduire à l’apparition de zones clairsemées.\n\nLa chute de cheveux d’origine génétique apparaît généralement après la ménopause, mais elle peut également survenir à un âge plus jeune. Bien que ce type de chute de cheveux ne puisse pas être complètement guéri, différentes possibilités de traitement peuvent aider à ralentir ou à stopper la perte de cheveux. Parmi celles-ci figurent certains médicaments comme le minoxidil et le finastéride, ainsi que les greffes de cheveux et d’autres traitements esthétiques.\n\nLa chute de cheveux peut également apparaître après la grossesse\n\nComme indiqué précédemment, une chute de cheveux peut également apparaître après la grossesse. Cette chute, également appelée alopécie post-partum, survient généralement environ trois mois après l’accouchement et peut durer jusqu’à un an. Elle est provoquée par la baisse rapide du taux d’œstrogènes après la naissance.\n\nLorsque les fluctuations hormonales sont à l’origine de la chute de cheveux, la plupart des femmes n’ont pas à s’inquiéter, car celle-ci est généralement temporaire et ne provoque pas de dommages permanents aux cheveux.\n\nComment prévenir la chute de cheveux pendant la grossesse ?\n\nBien qu’une certaine chute de cheveux soit normale et ne puisse pas être complètement évitée, les femmes enceintes peuvent prendre particulièrement soin de leurs cheveux afin de réduire leur perte. Deux aspects sont particulièrement importants : des soins capillaires adaptés ainsi qu’un apport suffisant en vitamines et minéraux pendant la grossesse.\n\nLes soins capillaires adaptés\n\nDes soins doux peuvent contribuer à réduire la chute de cheveux. Il est donc recommandé, particulièrement pendant la grossesse, d’éviter un brossage excessif ou de tirer sur les cheveux avec des coiffures trop serrées. Il est également conseillé d’utiliser des shampooings et après-shampooings doux, exempts de produits chimiques agressifs. Les appareils de coiffage utilisant la chaleur doivent également être utilisés avec modération afin de limiter autant que possible les agressions sur les cheveux.\n\nUn apport suffisant en vitamines et minéraux\n\nUne alimentation équilibrée et riche en vitamines et minéraux est importante pendant la grossesse, mais elle joue également un rôle essentiel dans la santé de la peau et des cheveux en général. Les femmes doivent notamment veiller à consommer des quantités suffisantes de fer, de vitamine D, de vitamines du groupe B et d’autres nutriments importants afin de favoriser la croissance des cheveux. Les compléments alimentaires peuvent apporter un soutien supplémentaire lorsque l’alimentation seule ne suffit pas, mais ils doivent être pris après avis médical.\n\nQue peut-on faire contre la chute de cheveux d’origine génétique ?\n\nEnviron 50 % des femmes sont concernées par une chute de cheveux d’origine génétique. Bien que ce type de chute de cheveux, contrairement à celle liée à la grossesse, ne puisse pas être complètement guéri, certaines méthodes reconnues peuvent contribuer à ralentir la perte de cheveux ou à restaurer les cheveux perdus.\n\nLa greffe de cheveux\n\nLa greffe de cheveux constitue une solution à long terme pour traiter la chute de cheveux d’origine génétique. Cette procédure consiste à prélever des follicules pileux sur une zone du cuir chevelu où les cheveux sont plus denses, puis à les transplanter dans les zones clairsemées. Les techniques modernes de transplantation, comme la FUE (Follicular Unit Extraction) ou la FUT (Follicular Unit Transplantation), permettent d’obtenir des résultats naturels et durables.\n\nLes médicaments\n\nUne autre approche courante pour traiter l’alopécie androgénétique féminine consiste à utiliser des médicaments tels que le minoxidil ou le finastéride. Le minoxidil, appliqué localement sur le cuir chevelu, peut stimuler la croissance des cheveux et ralentir leur chute. Le finastéride, pris sous forme de comprimé, bloque quant à lui l’enzyme qui transforme la testostérone en dihydrotestostérone (DHT), une hormone jouant un rôle important dans la chute de cheveux.\n\nCes médicaments peuvent toutefois entraîner des effets indésirables et doivent donc être utilisés uniquement sous surveillance médicale.\n\nLa thérapie au laser\n\nUne autre méthode de traitement esthétique de la chute de cheveux importante ou d’origine génétique consiste à utiliser des traitements au laser à faible énergie. Ceux-ci sont destinés à stimuler la croissance des cheveux et à ralentir leur chute. Ces traitements sont souvent proposés sous forme de peignes ou de casques laser pouvant être utilisés régulièrement à domicile.\n\nConclusion\n\nLa chute de cheveux pendant la grossesse peut avoir de nombreuses causes. Dans la plupart des cas, elle est cependant liée aux hormones et disparaît généralement d’elle-même dans l’année qui suit l’accouchement, lorsque l’équilibre hormonal se rétablit.\n\nNéanmoins, la chute de cheveux peut être particulièrement difficile à vivre pour les femmes. Il existe donc différentes approches esthétiques et médicamenteuses pour la traiter. Une consultation médicale est indispensable afin d’identifier la cause de la chute de cheveux et de déterminer la méthode de traitement la plus adaptée pour la réduire ou l’arrêter à long terme.",

    categorie: "Grossesse",
    image: "https://www.diefamilie.ch/data/dataimages/Upload/haarausfall.jpg",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "grossesse-3",

    titre: "Fromage pendant la grossesse – Se faire plaisir en toute sécurité",
    contenu:
      "Le fromage fait partie des aliments préférés dans de nombreux foyers, et ce pour une bonne raison : il apporte du calcium, des protéines et des vitamines précieux, particulièrement importants pendant la grossesse. Cependant, il convient d’être un peu plus attentif au choix du fromage, car tous les fromages ne sont pas sans danger pour les futures mamans. Les fromages au lait cru peuvent contenir la bactérie Listeria monocytogenes, responsable d’une infection rare mais grave appelée listériose. C’est pourquoi le type de lait utilisé et la pasteurisation sont essentiels pour minimiser les risques.\n\nAvec une sélection appropriée, il n’est toutefois pas nécessaire de renoncer au plaisir du fromage. Les fromages au lait de vache, de chèvre et de brebis existent sous forme pasteurisée et peuvent être consommés sans danger pendant la grossesse. Les fromages à pâte dure, les fromages affinés et les fromages frais pasteurisés offrent de nombreuses possibilités pour varier son alimentation tout en restant en bonne santé. Même les fromages à pâte molle populaires comme le camembert ou le brie peuvent être consommés sans problème lorsqu’ils sont pasteurisés, à condition d’éviter leur croûte. Avec quelques connaissances, le fromage peut donc continuer à faire partie de l’alimentation pendant la grossesse, sans compromis sur le goût ou la sécurité.\n\nDangers et mesures de prévention\n\nPendant la grossesse, certains types de fromages peuvent présenter un risque pour la santé. Les fromages au lait cru peuvent contenir la bactérie Listeria monocytogenes, qui peut provoquer une infection rare mais grave appelée listériose. Chez les femmes enceintes, la listériose peut avoir des conséquences importantes pour la mère et l’enfant à naître, notamment une fausse couche, un accouchement prématuré ou une infection chez le nouveau-né.\n\nMesures de sécurité :\n\n- Toujours vérifier que le fromage est fabriqué à partir de lait pasteurisé.\n- Éviter la croûte des fromages à pâte molle, même lorsqu’ils sont fabriqués avec du lait pasteurisé.\n- Privilégier les fromages à pâte dure ou les fromages ayant subi une longue période d’affinage.\n- Utiliser uniquement du fromage frais pasteurisé.\n- Vérifier attentivement les fromages de chèvre et de brebis, en particulier lorsqu’il s’agit de fromages à pâte molle.\n- Conserver le fromage au réfrigérateur et éviter de le laisser trop longtemps à température ambiante.\n\nFromages au lait de vache\n\nLes fromages au lait de vache pasteurisé sont généralement sans danger pendant la grossesse. Parmi les variétés considérées comme sûres, on trouve :\n\n- Fromages à pâte dure : Emmental, Gruyère, Appenzeller, Parmesan.\n- Fromages à pâte mi-dure : Tilsit, raclette pasteurisée.\n- Fromages frais : séré, cottage cheese, mozzarella.\n- Fromages à pâte molle : camembert, brie pasteurisés, en évitant la croûte.\n\nRemarque : les fromages à pâte molle au lait cru doivent être évités, car ils peuvent contenir des listérias.\n\nFromages au lait de chèvre\n\nLe fromage de chèvre est souvent apprécié pour son goût prononcé et sa facilité de digestion. Ici aussi, certaines précautions sont nécessaires :\n\n- Sûrs : fromage frais de chèvre pasteurisé, fromage de chèvre à pâte dure.\n- Déconseillés : fromages de chèvre à pâte molle au lait cru, comme certains crottins français ou le chabis.\n\nFromages au lait de brebis\n\nLe fromage de brebis est notamment apprécié sous forme de feta ou de pecorino :\n\n- Sûrs : feta fabriquée à partir de lait pasteurisé, pecorino affiné à pâte dure.\n- Prudence : fromage de brebis frais au lait cru ou fromage de brebis à pâte molle.\n\nLes fromages à pâte dure sont généralement considérés comme sûrs grâce à leur longue période d’affinage, même lorsqu’ils sont fabriqués à partir de lait cru.\n\nAperçu des principales variétés de fromages suisses",

    categorie: "Grossesse",
    image:
      "https://www.diefamilie.ch/data/dataimages/Upload/kase-schwangerschaft.jpg",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  // ===== BÉBÉ =====
  {
    id: "bebe-1",
    titre:
      "Plaisir du bain : conseils pour faire du bain de votre tout-petit une expérience amusante",
    contenu:
      "Faites du bain un moment de jeu\n\nLe bain ne doit pas seulement servir à l’hygiène, il peut également être un moment de jeu et de découverte. Quelques jouets sensoriels pour le bain, bien choisis, peuvent faire des merveilles. Les animaux flottants ou les livres de bain résistants à l’eau sont idéaux pour divertir votre enfant pendant le bain et stimuler son imagination. Un bain moussant doux qui produit beaucoup de bulles augmente encore le plaisir. Pour les tout-petits, jouer avec les bulles, les souffler dans l’air ou les faire éclater est une expérience très amusante.\n\nCréer une expérience sensorielle avec les bons ingrédients\n\nDes moyens simples suffisent pour transformer le bain en une expérience sensorielle. Essayez par exemple de colorer l’eau du bain. Des pastilles de bain adaptées peuvent changer la couleur de l’eau. Votre enfant peut ainsi choisir lui-même s’il souhaite barboter dans un « bain de boue » vert ou dans un « océan » bleu. Les craies de bain lavables offrent également une activité créative très amusante pour les petits. Ils prennent beaucoup de plaisir à dessiner sur les parois de la baignoire. Votre enfant peut ainsi s’occuper de manière créative sans laisser de traces. Les couleurs se rincent simplement avec l’eau du bain.\n\nCréez un environnement confortable pour les petits\n\nUn environnement chaud et sûr rend le moment du bain aussi agréable que possible. Préparez la salle de bain à l’avance : quelques mesures simples peuvent faire toute la différence. Pour éviter que votre enfant n’ait froid après avoir joué dans l’eau, vous pouvez par exemple réchauffer les serviettes dans le sèche-linge au préalable. Ainsi, votre enfant pourra se détendre immédiatement après le bain sans grelotter.\n\nVeillez également à placer un tapis antidérapant dans la baignoire. Les petits se lèvent souvent rapidement, ce qui peut entraîner un risque d’accident. Plus l’environnement est sûr pour votre enfant, plus il se sentira en sécurité et rassuré. Cela est particulièrement important pour les enfants qui ont peur du bain et ressentent un sentiment d’insécurité.\n\nChoisissez les bons produits de soin pour la peau sensible des enfants\n\nSi le shampooing pique les yeux et que le gel douche irrite la peau, les enfants s’en souviennent rapidement. Choisissez donc impérativement des produits de soin adaptés aux enfants si vous souhaitez rendre le moment du bain agréable et sans stress pour tout le monde. Les savons doux et les shampooings sans larmes sont spécialement conçus pour éviter les sensations de brûlure désagréables dans les yeux. Vous évitez ainsi que votre enfant développe des associations négatives avec le bain et favorisez au contraire une expérience placée sous le signe du plaisir et de l’amusement.\n\nLes routines constituent un facteur de sécurité important pour les enfants. Une routine de bain régulière peut être très utile. Choisissez un moment où votre enfant n’est ni trop fatigué ni affamé et essayez de faire en sorte que le bain dure toujours à peu près le même temps. Votre enfant saura ainsi exactement à quoi s’attendre et pourra même se réjouir dès le matin de son moment de bain du soir.",
    categorie: "Bébé",
    image:
      "https://www.diefamilie.ch/data/dataimages/Upload/Depositphotos_127767598_L.jpg",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "bebe-2",
    titre: "Bébé nageur",
    contenu:
      "Des études scientifiques ont démontré une relation positive entre l’activité dans l’eau, la coordination des mouvements et le développement de l’équilibre. L’enfant expérimente sa mobilité et sa créativité, et découvre les conséquences des risques qu’il prend sur lui-même et son environnement. Ce développement psychomoteur favorise l’acquisition des capacités motrices.\n\nL’eau – un espace de vie pour les enfants\n\nL’eau permet à l’enfant de découvrir l’espace en trois dimensions et lui offre ainsi de nouvelles expériences sensorielles. Les parents peuvent favoriser cet éveil physique et sensoriel et aider l’enfant à agir de manière autonome. L’eau peut constituer une expérience enrichissante et permet également aux enfants en situation de handicap de mieux découvrir et connaître leur corps.\n\nLa relation entre les parents et l’enfant dans l’eau\n\nL’enfant a besoin de sécurité. Cette sécurité, liée aux sens, comprend :\n\n- le toucher ;\n- l’ouïe, notamment les paroles apaisantes de la mère et du père ;\n- la vue : la confiance transmise par le regard permet à l’enfant de mieux s’orienter dans la situation.\n\nLe lien entre les parents et l’enfant dans l’eau est unique et se renforce grâce aux activités ludiques. L’animatrice du cours aide les parents à conserver leur confiance dans leurs propres compétences et leur apprend à profiter de l’élément aquatique avec leur enfant.\n\nEn Suisse, il existe différentes possibilités de découvrir la natation avec son bébé. La natation avec les bébés peut être une excellente activité pour renforcer le lien entre les parents et l’enfant, tout en favorisant les capacités motrices et la confiance dans l’eau. Voici quelques informations sur la natation avec les bébés en Suisse :\n\n- De nombreuses piscines en Suisse proposent des cours spécialement destinés à la natation pour bébés. Ces cours sont souvent animés par des moniteurs ou monitrices de natation qualifiés et offrent un environnement sécurisé permettant d’explorer l’eau avec votre bébé. Vous pouvez rechercher les piscines près de chez vous et vous renseigner sur les activités qu’elles proposent.\n\n- Il existe également en Suisse des professeurs ou moniteurs de natation privés qui proposent des cours individuels pour les bébés. Ces cours peuvent avoir lieu dans des piscines privées ou, dans certains cas, à votre domicile. Vous pouvez rechercher ces offres en ligne ou contacter des associations et écoles de natation pour obtenir des recommandations.\n\n- Certains clubs sportifs ou clubs de natation en Suisse proposent des groupes spécialement destinés aux bébés et aux jeunes enfants. Ces groupes vous permettent de nager avec votre bébé tout en échangeant avec d’autres parents. Renseignez-vous auprès des clubs locaux ou des associations de natation pour découvrir les offres disponibles.\n\nIl est important de rappeler que, lors de la pratique de la natation avec un bébé, la sécurité doit toujours être la priorité. Assurez-vous que la piscine ou le moniteur de natation applique les mesures de sécurité appropriées et possède les compétences nécessaires pour encadrer la natation des bébés.\n\nVeillez également à ce que l’eau soit à une température adaptée et à ce que vous et votre bébé vous sentiez à l’aise et en sécurité.\n\nPour trouver des activités de natation avec votre bébé, les piscines locales, les clubs de natation, les pédiatres ou les sages-femmes peuvent vous fournir des informations et des recommandations utiles. Renseignez-vous à l’avance sur les conditions, les tarifs des cours et les disponibilités afin de trouver l’option la plus adaptée à vous et à votre bébé.",
    categorie: "Bébé",
    image:
      "https://www.diefamilie.ch/data/dataimages/Upload/schwimmen-baby.jpg",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "bebe-3",

    titre: "Porte-bébés",
    contenu:
      "Ce n’est que depuis l’invention de la poussette que la relation entre les parents et les enfants s’est progressivement distanciée. Il y a environ 200 ans, les nourrissons et les jeunes enfants étaient également portés contre le corps en Europe, même si cette pratique concernait principalement les classes les plus modestes. Les familles riches, quant à elles, faisaient venir des nourrices pour allaiter leurs enfants et des gouvernantes pour assurer leur éducation à la maison.\n\nChez nous, les porte-bébés connaissent un nouvel essor, car de nombreux parents constatent ce que des études ont déjà démontré : les enfants qui sont portés pleurent nettement moins que ceux qui ne le sont pas.\n\nIl existe aujourd’hui différents systèmes de portage, allant de l’écharpe de portage classique aux slings élastiques, en passant par les porte-bébés. Chaque parent devrait choisir en fonction de ses préférences. Tous les modèles ne peuvent pas être utilisés aussi bien pour le portage ventral que pour le portage dorsal. Selon l’utilisation souhaitée, certains systèmes peuvent donc être plus pratiques que d’autres. Les sages-femmes, les maternités ainsi que les maisons de naissance proposent des cours de portage permettant de se familiariser avec les différentes techniques de nouage.\n\nBien que certains mouvements soient limités par le portage, comme s’asseoir ou se pencher, il reste tout à fait possible d’effectuer des tâches ménagères simples. Les déplacements à l’extérieur sont également beaucoup plus faciles et pratiques qu’avec une poussette, notamment dans les escaliers, les bus ou les tramways. Le portage répond ainsi à la fois au besoin naturel des nourrissons d’être proches du corps de leurs parents et au besoin de flexibilité et de mobilité de ces derniers.\n\nDu point de vue de la santé, rien ne s’oppose au portage avec un porte-bébé. Toutefois, si les parents souffrent de problèmes de dos connus, ils devraient en parler au préalable avec leur médecin.\n\nDes études montrent que le portage en écharpe n’est pas nocif pour la colonne vertébrale de l’enfant. Au contraire, la position des jambes écartées peut contribuer à prévenir la dysplasie de la hanche ou avoir un effet positif sur celle-ci.",

    categorie: "Bébé",
    image:
      "https://www.diefamilie.ch/images/partage/Portage_bb_echarpe_270.jpg?w=400&fit=max&q=80",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  // ===== PETITE ENFANCE =====
  {
    id: "petite-enfance-1",

    titre: "Gymnastique MuKi / VaKi",
    contenu:
      "MuKi et VaKi sont deux programmes de gymnastique mère-enfant ou père-enfant proposés en Suisse. Ils font partie des activités physiques destinées aux parents et à leurs enfants et visent à favoriser l’activité physique, le lien parent-enfant et le bien-être. L’idée de pratiquer des activités sportives avec ses enfants afin de favoriser leur développement et renforcer le lien familial n’est pas nouvelle. Dans de nombreux pays, des programmes similaires existent sous différentes appellations. Ces programmes reposent souvent sur le constat que le mouvement et l’activité physique sont des éléments importants du développement des enfants.\n\n« MuKi » signifie « Mutter-Kind », c’est-à-dire « mère-enfant », et s’adresse principalement aux mères ou aux figures de référence féminines accompagnées de leurs enfants. La gymnastique MuKi offre l’occasion de participer à des activités et à des jeux en commun, au cours desquels les mères accompagnent et soutiennent leurs enfants. L’accent est mis avant tout sur le plaisir de bouger.\n\n« VaKi » signifie « Vater-Kind », c’est-à-dire « père-enfant », et s’adresse spécifiquement aux pères ou aux figures de référence masculines accompagnés de leurs enfants. La gymnastique VaKi propose des activités similaires à celles du programme MuKi, tout en permettant aux pères de pratiquer une activité physique avec leurs enfants et de partager un moment privilégié avec eux.\n\nCes programmes sont proposés par différentes institutions et associations en Suisse, notamment des clubs sportifs, des centres familiaux ou des communes. Pour participer à une séance de gymnastique MuKi ou VaKi, vous pouvez contacter les clubs sportifs ou centres familiaux de votre région ou rechercher les offres disponibles en ligne. Vous y trouverez davantage d’informations sur les dates, les lieux et les conditions de participation.\n\nLes activités MuKi et VaKi offrent de nombreux avantages aux parents et à leurs enfants\n\n- Renforcement du lien parent-enfant : les activités MuKi et VaKi offrent une précieuse occasion aux parents et à leurs enfants de passer du temps ensemble et de renforcer leur lien. Grâce aux activités partagées, parents et enfants peuvent développer leur relation et s’entraider.\n- Activité physique : la gymnastique MuKi et VaKi favorise l’activité physique aussi bien chez les parents que chez les enfants. Grâce aux jeux de mouvement, aux exercices et aux différentes activités, les enfants peuvent développer leurs capacités motrices tandis que les parents améliorent leur condition physique et leur bien-être.\n- Interaction sociale : les activités MuKi et VaKi offrent une excellente occasion aux enfants d’interagir avec d’autres enfants de leur âge et de développer leurs compétences sociales. Ils peuvent jouer, partager et coopérer avec les autres enfants, ce qui favorise des compétences sociales importantes.\n- Soutien au développement : la gymnastique MuKi et VaKi peut contribuer au développement des enfants dans différents domaines, notamment les capacités motrices, la coordination, l’équilibre et la perception du corps. Les différentes activités physiques permettent de soutenir leur développement physique et sensoriel.\n- Plaisir et amusement : les activités MuKi et VaKi offrent un environnement amusant et positif pour les parents et les enfants. Les jeux, les exercices et les activités sont conçus pour favoriser le plaisir de bouger tout en créant une atmosphère agréable et joyeuse.",

    categorie: "Petite enfance",
    image:
      "https://www.diefamilie.ch/data/dataimages/Upload/muki-vaki-turnen2.jpg",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "petite-enfance-2",

    titre: "Choisir le bon siège auto pour enfant",
    contenu:
      "Le choix d’un siège auto adapté est essentiel pour assurer la sécurité de votre enfant en voiture. Un siège correctement choisi et correctement installé peut réduire considérablement le risque de blessures graves en cas d’accident. Selon la taille et l’âge de l’enfant, les différents sièges offrent une protection et un confort adaptés en stabilisant le corps et en répartissant efficacement les forces générées lors d’un impact.\n\nEn Suisse, l’utilisation de sièges auto pour enfants certifiés est obligatoire afin de garantir leur sécurité pendant les trajets. Voici quelques informations importantes concernant le choix et l’utilisation de sièges auto certifiés :\n\n- Normes d’homologation : les sièges auto pour enfants doivent être homologués selon les normes ECE R44/03 ou R44/04, ou selon la norme plus récente i-Size ECE R129. Ces normes garantissent que les sièges répondent à des exigences strictes en matière de sécurité.\n- Étiquetage : vérifiez la présence de l’étiquette orange sur le siège auto, qui confirme son homologation. Cette étiquette contient des informations sur la norme utilisée, le poids ou la taille de l’enfant pour lesquels le siège est adapté ainsi que le numéro d’homologation.\n- Critères de sécurité : les sièges auto certifiés sont conçus pour protéger le corps de l’enfant en cas d’impact en répartissant les forces de manière uniforme. Ils offrent également une protection supplémentaire contre les chocs latéraux.\n- Installation : la plupart des véhicules et des sièges auto modernes disposent du système Isofix, qui permet de fixer le siège facilement et en toute sécurité. Si vous utilisez Isofix, assurez-vous que votre véhicule figure dans la liste des véhicules compatibles avec le siège.\n- Âge et taille : les sièges auto sont répartis en différentes catégories selon l’âge, le poids et la taille de l’enfant. Choisissez toujours un siège correspondant à la taille et au poids actuels de votre enfant et passez à la catégorie suivante au moment approprié, lorsque votre enfant grandit.\n- Sièges dos à la route : pour les nourrissons et les jeunes enfants jusqu’à l’âge d’au moins 15 mois, il est recommandé d’utiliser un siège dos à la route, car cette position offre la meilleure protection pour la tête et le cou de l’enfant.\n\nQuel siège auto pour quel enfant ?\n\n- Jusqu’à 18 mois ou jusqu’à 18 kg : les jeunes enfants doivent être transportés aussi longtemps que possible dans une coque équipée d’une ceinture à trois points. Celle-ci doit de préférence être installée sur la banquette arrière et orientée dos à la route. Si la coque est installée sur le siège passager avant, l’airbag frontal doit être désactivé.\n\n- À partir de 9 kg ou de 8 mois jusqu’à 4 ans : lorsque la tête du bébé dépasse de la coque, il faut passer à la catégorie de siège suivante. Un enfant de taille moyenne peut alors être transporté dans un siège orienté face à la route. Celui-ci doit être solidement fixé au siège du véhicule.\n\n- De 15 à 36 kg et jusqu’à 12 ans ou 1,50 m : l’enfant a besoin d’un rehausseur avec dossier et appui-tête. À ce stade, la ceinture de sécurité maintient à la fois l’enfant et le siège.\n\nComment choisir le siège auto de son enfant ?\n\nAssurez-vous :\n\n- que le modèle correspond au poids, à la taille et à la morphologie de votre enfant ;\n- qu’il est compatible avec votre véhicule ;\n- que l’installation du siège et l’installation de l’enfant sont simples ;\n- que le modèle offre à votre enfant un confort optimal.\n\nPrivilégiez :\n\n- un siège Isofix si votre véhicule est équipé de ce système ;\n- un modèle équipé d’une protection contre les chocs latéraux ;\n- un siège ayant obtenu de bons résultats lors des tests de sécurité.\n\nN’oubliez pas :\n\n- d’attacher systématiquement votre enfant, même pour les trajets très courts ;\n- de placer les enfants jusqu’à 12 ans sur la banquette arrière ;\n- de vérifier que la ceinture de sécurité est parfaitement ajustée au corps de l’enfant ;\n- d’enlever les vestes d’hiver et les doudounes avant d’attacher votre enfant.\n\nOù acheter un siège auto pour enfant ?\n\nIl est préférable d’acheter le siège dans un magasin spécialisé proposant des conseils de qualité. N’hésitez pas à demander une démonstration de l’installation du siège directement dans votre véhicule.\n\nDispositions et réglementations concernant les sièges auto pour enfants\n\nLes taxis sont soumis aux mêmes normes de sécurité que les voitures. Toutefois, la possibilité de voyager avec votre enfant peut dépendre de l’équipement du véhicule et de la volonté du chauffeur. Certains taxis disposent de rehausseurs, d’autres non, et certains peuvent malgré tout accepter de vous transporter. D’autres encore peuvent refuser de prendre en charge votre enfant.\n\nLes enfants âgés de 4 à 12 ans et mesurant moins de 150 cm utilisent les ceintures de sécurité disponibles dans les bus scolaires et les autocars.\n\nL’installation de plusieurs sièges auto peut poser des difficultés dans certains véhicules familiaux. La plupart des modèles permettent certes de transporter trois à quatre enfants conformément aux nouvelles réglementations, mais certains rendent cette organisation plus compliquée pour les parents.\n\nSur le site du TCS, vous trouverez des documents téléchargeables très détaillés sur la sécurité des enfants en voiture ainsi que des résultats de tests. Afin de faciliter l’application de ces nouvelles règles, le Bureau de prévention des accidents et le Touring Club Suisse ont publié une brochure en neuf langues.\n\nEt surtout, n’oubliez pas : en voiture, comme partout ailleurs, les parents sont responsables de leurs enfants. Ils doivent veiller systématiquement à habituer leurs enfants dès leur plus jeune âge à voyager attachés, quelle que soit la distance parcourue. Plus de 40 % des accidents mortels impliquant des enfants passagers surviennent lors de trajets de moins de 3 km.",

    categorie: "Petite enfance",
    image:
      "https://www.diefamilie.ch/images/young-mother-child-car-baby-seat-chair-safety-driving-concept.jpg?w=400&fit=max&q=80",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "petite-enfance-3",

    titre: "Promenades estivales avec bébé – comment assurer son confort",
    contenu:
      "Même les nouveau-nés âgés de seulement quelques semaines devraient profiter de l’air frais. Cela est aujourd’hui scientifiquement reconnu. Plus le bébé grandit, plus cela est important, et même les promenades estivales plus longues sont tout à fait possibles. À condition, bien sûr, de veiller au confort et à la sécurité du bébé. Cet article présente les principaux éléments à prendre en compte lors des promenades estivales avec un bébé.\n\nUne hydratation suffisante est indispensable pour les bébés\n\nLes températures estivales sont agréables et généralement bénéfiques, mais elles favorisent également une déshydratation plus rapide. Comme les bébés se déshydratent plus rapidement que les adultes, il est important de veiller à ce qu’ils reçoivent suffisamment de liquides. La manière de procéder dépend largement de l’âge du bébé. S’il est encore allaité, il convient de lui proposer régulièrement le sein. S’il boit déjà au biberon, prévoyez suffisamment de lait, de préparation pour nourrissons et d’eau. Des aliments riches en eau peuvent également être proposés afin de contribuer à son hydratation.\n\nPour se protéger du soleil, une simple ombrelle de poussette ne suffit pas\n\nL’exposition directe au soleil peut être dangereuse pour les bébés et provoquer notamment des coups de soleil. Une ombrelle ou une protection solaire pour la poussette est donc indispensable pour des promenades estivales sûres. Elle ne suffit toutefois pas à elle seule à assurer une protection complète contre le soleil. Il est tout aussi important d’utiliser une crème solaire adaptée aux bébés et à leur peau sensible. Une protection solaire douce pour les bébés ne doit pas contenir de substances irritantes ni dessécher la peau. En complément, un chapeau à larges bords est recommandé. Il offre une protection supplémentaire du visage et de la nuque.\n\nLa poussette doit être suffisamment ventilée\n\nEn règle générale, les poussettes sont conçues pour assurer une ventilation suffisante. Cependant, une surchauffe peut théoriquement se produire, par exemple à cause d’une couverture épaisse ou d’une forte exposition au soleil. Il est donc conseillé de prendre des mesures supplémentaires, comme utiliser les ouvertures de ventilation prévues à cet effet, afin de garantir une bonne circulation de l’air. Cela contribue au confort et au bien-être du bébé.\n\nLes vêtements doivent être confortables et protecteurs\n\nChoisir les vêtements adaptés est l’une des décisions les plus difficiles lors des promenades estivales avec un bébé. Les conditions météorologiques peuvent en effet changer rapidement. En principe, des vêtements légers et respirants sont idéaux. Toutefois, si une brise soudaine se lève, le bébé peut rapidement avoir froid. Il est donc préférable de l’habiller selon le principe des couches superposées. Vous pourrez ainsi retirer ou ajouter facilement une couche si nécessaire.\n\nLes filets et les répulsifs protègent contre les piqûres\n\nLe soleil et les températures élevées ne sont pas les seuls dangers potentiels pour un bébé. Les piqûres de différents insectes représentent également un risque. Pour protéger votre bébé, vous pouvez installer une moustiquaire ou un filet de protection sur la poussette et utiliser un répulsif contre les insectes. Comme pour la crème solaire, il est important de choisir un produit adapté à la peau sensible des bébés. Les produits contenant des substances chimiques agressives ne sont pas adaptés aux bébés.\n\nLes itinéraires ombragés tôt le matin ou en fin d’après-midi sont les meilleurs\n\nMême lorsque toutes les recommandations précédentes sont respectées, il n’est pas nécessaire d’exposer inutilement le bébé au soleil direct. Il est donc préférable de choisir des itinéraires aussi ombragés que possible. Les promenades estivales sont également à privilégier tôt le matin ou en fin d’après-midi. À ces moments de la journée, l’exposition au soleil est moins intense et les températures sont plus douces.",

    categorie: "Petite enfance",
    image: "https://www.diefamilie.ch/data/dataimages/Upload/1000005011.jpg",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  // ===== ENFANCE =====
  {
    id: "enfance-1",

    titre: "Garde d’enfants – Guide pratique",
    contenu:
      "Qu’il s’agisse d’une crèche, d’une famille d’accueil de jour, d’une jeune fille ou d’un jeune homme au pair, d’une école maternelle privée ou d’un service de baby-sitting, il existe de nombreuses possibilités de garde d’enfants en complément de la garde familiale.\n\nMais à qui confier son enfant ? Qu’en est-il des horaires de garde et des coûts ? Quels sont les délais d’attente et dans quelle mesure les offres sont-elles flexibles ? Qui peut bénéficier de subventions et à quelle hauteur ?\n\nVous trouverez ici des informations sur les différentes possibilités et les différents systèmes de garde d’enfants, ainsi que les adresses des institutions situées près de chez vous.",

    categorie: "Enfance",
    image:
      "https://www.diefamilie.ch/images/partage/Accueil_jour_enfant_1200.jpg?w=400&fit=max&q=80",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "enfance-2",
    titre: "Instance de contrôle pour la garde d’enfants",
    contenu:
      "Les structures de garde d’enfants en complément de la famille désignent les services de garde proposés en plus de la prise en charge assurée par les parents ou les membres de la famille. Cela comprend notamment les crèches, les jardins d’enfants, les familles d’accueil de jour, les structures parascolaires et les établissements similaires.\n\nUne instance de contrôle pour ce type de garde est importante afin de garantir que les structures respectent des normes de qualité élevées et que le bien-être des enfants soit assuré.\n\nEn Suisse, la garde d’enfants en complément de la famille est une question importante, réglementée et contrôlée à différents niveaux. La responsabilité du contrôle et de la surveillance de ces structures incombe généralement aux cantons et aux communes. Plusieurs institutions et mécanismes permettent de veiller au respect des normes en matière de garde d’enfants.\n\nVoici quelques-uns des principaux acteurs et mécanismes de contrôle en Suisse :\n\n- Autorités cantonales : en Suisse, les cantons sont responsables de la réglementation et de la surveillance de la garde d’enfants en complément de la famille. Ils délivrent les autorisations d’exploitation, contrôlent le respect des dispositions légales et effectuent régulièrement des inspections.\n- Autorités communales : de nombreuses tâches dans le domaine de la garde d’enfants sont assumées au niveau communal. Les communes sont souvent responsables de la mise en œuvre pratique des directives cantonales et effectuent également des contrôles et des inspections.\n- KOKES (Conférence des directrices et directeurs cantonaux des affaires sociales) : cette conférence coordonne la politique sociale des cantons, notamment dans le domaine de la garde d’enfants, et élabore des normes et des recommandations communes.\n- Systèmes de gestion de la qualité : de nombreuses structures de garde en Suisse utilisent volontairement des systèmes de gestion de la qualité, comme le label « QualiKita », soutenu par la fondation « Réseau suisse d’accueil extrafamilial ». Ces labels fixent des normes élevées et prévoient des évaluations externes régulières.\n- Conseils de parents et associations de parents : les conseils de parents au sein des structures ainsi que les associations nationales et cantonales de parents s’engagent en faveur de la qualité de la garde d’enfants et constituent d’importants acteurs en matière de retour d’information et de contrôle.\n- Centre suisse de formation pour les jeunes adultes et les professionnels de la garde d’enfants en complément de la famille (EDK) : cette institution propose des programmes de formation initiale et continue et contribue à la professionnalisation et à l’assurance qualité dans le domaine de la garde d’enfants.\n\nLes conditions-cadres légales et les normes applicables à la garde d’enfants en complément de la famille peuvent varier d’un canton à l’autre. Elles comprennent toutefois généralement des dispositions concernant les locaux, les qualifications du personnel, les ratios d’encadrement, les concepts pédagogiques et la sécurité des enfants.\n\nLe respect de ces normes est vérifié au moyen d’inspections et d’audits réguliers. En cas d’infraction, des sanctions peuvent être imposées ou les autorisations d’exploitation peuvent être retirées. Les parents ont également souvent la possibilité de donner leur avis et de déposer des réclamations, qui sont ensuite examinées par les autorités compétentes.",
    categorie: "Enfance",
    image:
      "https://www.diefamilie.ch/images/medium-shot-woman-watching-kid-paint.jpg?w=400&fit=max&q=80",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "enfance-3",
    titre: "Groupe de rencontre pour tout-petits",
    contenu:
      "Les groupes de rencontre pour tout-petits s’adressent aux jeunes enfants de 0 à 5 ans maximum, accompagnés de leurs parents. Ils servent de lieu de rencontre pour les parents et les enfants, où ils peuvent jouer et chanter ensemble tout en échangeant leurs expériences.\n\nLes offres varient considérablement selon la manière dont les groupes sont organisés. Il s’agit généralement de groupes ouverts, sans inscription préalable, et dont la participation est gratuite ou coûte très peu. Les rencontres durent environ deux heures. Renseignez-vous auprès des adresses indiquées ci-dessous pour connaître les offres et les modalités exactes.",
    categorie: "Enfance",
    image:
      "https://www.diefamilie.ch/images/Chrabbelgruppen_150.jpg?w=400&fit=max&q=80",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  // ===== ADOLESCENCE =====
  {
    id: "adolescence-1",
    titre: "Violence des jeunes en Suisse – une tendance à la hausse ?",
    contenu:
      "La délinquance juvénile en Suisse est relativement faible par rapport à celle de nombreux autres pays. Il existe néanmoins un certain nombre de jeunes qui commettent des infractions. La plupart des jeunes délinquants commettent des délits tels que le vol, le vandalisme ou les lésions corporelles.\n\nEn Suisse, des lois et des dispositions spécifiques s’appliquent à la délinquance juvénile. Le droit pénal des mineurs se distingue du droit pénal des adultes et vise principalement à éduquer et à resocialiser les jeunes délinquants. L’objectif est de les aider à prendre conscience de leurs erreurs et à mettre fin à leur parcours délictueux.\n\nLes jeunes délinquants sont souvent examinés et évalués par des psychologues spécialisés dans la justice des mineurs. Les établissements pénitentiaires pour mineurs et les structures d’aide à la jeunesse proposent des programmes et des mesures visant à améliorer les compétences sociales des jeunes délinquants et à leur offrir des perspectives d’avenir.\n\nDans l’ensemble, la Suisse privilégie une approche préventive de la délinquance juvénile, en soutenant les jeunes et en les aidant à s’intégrer dans la société.\n\nComment se présente la situation actuelle en Suisse ?\n\nEn 2021, le nombre de jugements concernant des mineurs a augmenté de 7,5 % par rapport à l’année précédente, avec un total de 20 902 jugements prononcés. En revanche, les jugements liés aux infractions à la loi sur les stupéfiants ont diminué de 23 %. Les sanctions les plus fréquentes étaient les réprimandes, les prestations personnelles et les amendes. Au total, 1 038 jeunes ont fait l’objet d’un placement hors de leur milieu familial.\n\nLe nombre de jugements pour des infractions au Code pénal a augmenté de 6,4 %, atteignant 8 578 jugements. Cette valeur augmente continuellement depuis 2018, mais le niveau record de 2010 n’a pas encore été atteint. Les différentes catégories d’infractions se répartissent comme suit :\n\n- Infractions violentes : elles suivent une tendance similaire. Depuis 2018, elles ont augmenté de 37,2 %, avec une hausse de 2,4 % en 2021 par rapport à l’année précédente.\n- Infractions contre le patrimoine : +23,1 %.\n- Infractions contre l’autorité publique : +66,5 %.\n- Infractions contre l’intégrité sexuelle : elles ont doublé en l’espace de trois ans, passant de 419 infractions en 2018 à 837 en 2021.\n- Falsification de documents : il s’agit de la seule catégorie affichant une tendance à la baisse au cours des trois dernières années, avec une diminution de 47,7 %.\n- Infractions à la circulation routière : en 2021, le nombre de jugements concernant des mineurs a augmenté de 15,4 % par rapport à l’année précédente, avec un total de 4 458 jugements pour des infractions à la loi sur la circulation routière. Les violations des règles de circulation ont augmenté de 27,7 % pour les cas légers et de 51,1 % pour les infractions graves. Ces augmentations sont principalement dues aux excès de vitesse.\n- Infractions à la loi sur les stupéfiants : contrairement aux autres catégories, 3 541 jugements ont été prononcés en 2021 pour des infractions à la loi sur les stupéfiants, soit une baisse de 22,6 % par rapport à l’année précédente. La diminution progressive observée depuis 2017, de 39,2 %, s’explique principalement par la baisse du nombre de jugements liés à la consommation de stupéfiants.\n- Infractions à d’autres lois fédérales : en 2021, 8 726 jugements concernant des mineurs ont été prononcés pour des infractions à d’autres lois fédérales. Les infractions à la loi sur les armes, à la loi sur les étrangers et l’intégration ainsi qu’à la loi sur le transport de voyageurs étaient les plus fréquentes. Pour cette dernière catégorie, une augmentation de 30 % par rapport à l’année précédente a été enregistrée, principalement en raison de voyages effectués sans titre de transport valable.\n\nIl est préoccupant de constater que le nombre de jugements concernant des mineurs pour des infractions au Code pénal, et notamment pour des actes de violence, augmente continuellement. Cela montre que la prévention de la violence et le développement des compétences sociales chez les jeunes restent des défis importants.\n\nIl est essentiel que les institutions et les organisations qui travaillent dans le domaine de la violence des jeunes renforcent leurs actions et améliorent leurs programmes afin d’aider les jeunes à résoudre les conflits de manière pacifique et à construire des relations positives. C’est ainsi qu’il sera possible de contribuer à une société sûre et saine pour tous.\n\nComment ces infractions sont-elles finalement sanctionnées ?\n\nLes réprimandes restent la sanction la plus fréquente dans les jugements concernant des mineurs : elles ont été prononcées dans 35 % des cas, suivies des prestations personnelles avec 30,8 %. Les amendes et les peines privatives de liberté ne peuvent être prononcées qu’à partir de l’âge de 15 ans et ont été appliquées respectivement dans 27,5 % et 4,4 % des cas.\n\nEn 2021, 1 038 personnes ont été placées hors de leur milieu familial en vertu du droit pénal des mineurs, soit à titre préventif, soit à la suite d’un jugement. Parmi elles, 402 jeunes ont fait l’objet de mesures de protection préventives : 109 ont été placés dans une structure d’observation stationnaire, 270 dans une structure ouverte et 132 dans une structure fermée. Parmi les 271 jeunes placés à la suite d’un jugement, 221 se trouvaient dans une structure ouverte et 58 dans une structure fermée. Au total, 248 personnes condamnées en vertu du droit pénal des mineurs ont dû purger une peine privative de liberté. En 2021, la durée moyenne d’un placement hors du milieu familial était de 162 jours, la durée moyenne la plus longue étant enregistrée pour les placements ouverts effectués à la suite d’un jugement.\n\nSources : Office fédéral de la statistique, Admin.ch.\n\nConseils et services d’aide\n\n- Prévention Suisse de la Criminalité : la Prévention Suisse de la Criminalité (PSC) est un service spécialisé intercantonal dans le domaine de la prévention de la criminalité et de la peur de la criminalité.\n- Pro Juventute : cette organisation s’engage en faveur des droits des enfants et des jeunes, les accompagne dans leur quotidien et les soutient dans les situations difficiles.\n- Tschau.ch : ce service de conseil en ligne et d’information pour les jeunes est une plateforme professionnelle destinée aux jeunes en Suisse.\n- Addiction Suisse : cette organisation conçoit et met en œuvre des projets de prévention liés aux problématiques d’addiction, qui peuvent également concerner les jeunes.\n- lilli : cette plateforme propose des conseils anonymes en ligne et des informations sur la sexualité, la violence, les relations ainsi que les questions liées aux femmes et aux hommes.\n- Elternbildung.ch : cette plateforme fournit des conseils concernant les questions éducatives et le développement des enfants.",
    categorie: "Adolescence",
    image:
      "https://www.diefamilie.ch/data/dataimages/Upload/jeunes-violence-(1).jpg",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "adolescence-2",
    titre: "Les adolescents – La puberté",
    contenu:
      "La puberté peut être une période difficile aussi bien pour l’enfant que pour les parents, car elle s’accompagne de nombreux défis et changements. Pour l’enfant, la puberté peut être émotionnellement éprouvante, car il est souvent confronté à de nouveaux sentiments et à de nombreuses incertitudes. Il peut également être difficile de s’adapter aux changements physiques et de faire face aux nouvelles expériences sociales et sexuelles.\n\nPour les parents, la puberté peut également représenter un défi, car ils peuvent avoir le sentiment que leur enfant s’éloigne d’eux ou qu’il est moins facile de communiquer avec lui qu’auparavant.\n\nIl peut également être difficile de gérer les sautes d’humeur et les comportements parfois rebelles de l’enfant. Les parents doivent apprendre à comprendre les besoins de leur enfant pendant cette période et à l’aider à gérer ces changements, tout en respectant leurs propres limites et besoins.\n\nIl est important que les parents fassent preuve de patience et de compréhension pendant cette période et qu’ils offrent à leur enfant un espace de communication ouvert ainsi qu’un environnement bienveillant. Prendre soin de soi peut également aider les parents à mieux faire face aux défis liés à la puberté.\n\nLa puberté est la période de la vie qui correspond au début de la maturité sexuelle. Chez les filles, elle commence en moyenne entre 8 et 13 ans, tandis que chez les garçons, elle débute généralement entre 9 et 14 ans. Pendant la puberté, le corps connaît de nombreuses transformations, contrôlées par différentes hormones.\n\nLes changements physiques typiques de la puberté comprennent l’apparition des poils pubiens et des poils sous les bras, ainsi que de la barbe chez les garçons, le développement des seins chez les filles, les poussées de croissance, les changements de proportions corporelles et les premières règles chez les filles. La voix change également chez les garçons lors de la mue de la voix.\n\nOutre les changements physiques, des changements émotionnels peuvent également apparaître, comme les sautes d’humeur ou le sentiment de ne pas être compris. Il est important que les jeunes bénéficient d’un soutien et de conseils pendant cette période afin de pouvoir faire face aux nombreux changements et défis qu’elle implique.\n\nVoici quelques-uns des changements et des difficultés auxquels les adolescents, mais aussi leur entourage, doivent faire face pendant cette période importante :\n\n- Changements physiques : des changements physiques tels que l’acné, les douleurs de croissance ou une prise de poids inattendue peuvent affecter l’estime de soi de l’enfant et entraîner des difficultés émotionnelles.\n- Sautes d’humeur : les changements hormonaux peuvent provoquer des sautes d’humeur qui peuvent affecter émotionnellement l’enfant et avoir un impact sur ses relations avec ses amis et sa famille.\n- Recherche d’identité : la puberté est une période de découverte de soi durant laquelle l’enfant explore sa personnalité, ses valeurs et ses centres d’intérêt. Cela peut entraîner de l’incertitude, des doutes sur soi-même et des conflits avec les parents.\n- Difficultés relationnelles : la puberté est également une période durant laquelle l’enfant développe de nouvelles relations avec ses pairs, ses partenaires amoureux et les personnes représentant l’autorité. Les conflits, les séparations et le rejet peuvent être émotionnellement difficiles à vivre pour l’enfant.\n- Sexualité : la puberté est aussi une période durant laquelle l’enfant découvre et explore sa sexualité. Les questions liées à l’orientation sexuelle, à l’identité de genre et à la santé reproductive peuvent susciter de la confusion et être difficiles à gérer pour l’enfant.",
    categorie: "Adolescence",
    image: "https://www.diefamilie.ch/data/dataimages/Upload/ados-menu.jpg",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "adolescence-3",
    titre: "Check-In CRS",
    contenu:
      "Vous n’avez pas encore trouvé de place d’apprentissage ? Alors inscrivez-vous à Check-In !\n\nCheck-In CRS permet d’acquérir une expérience professionnelle concrète grâce à des missions pratiques dans des établissements médico-sociaux et des maisons de retraite. Les domaines d’activité proposés sont :\n\n• Soins\n• Accompagnement\n• Intendance\n• Gastronomie\n• Entretien et maintenance\n• Administration\n\nCheck-In CRS s’adresse aux jeunes âgés de 15 à 19 ans titulaires d’un diplôme de l’école secondaire, quel que soit le niveau, qui n’ont pas encore trouvé de place d’apprentissage ou qui ont interrompu leur apprentissage. Le programme dure de 6 à 12 mois et comprend 75 % de pratique en entreprise et 25 % de formation, soit un jour par semaine. Le programme commence après les vacances d’été.\n\nSi nécessaire, Check-In met à disposition des professionnels expérimentés qui accompagnent personnellement les jeunes en tant que mentors dans leur recherche d’une place d’apprentissage.\n\nPour plus d’informations, adressez-vous au Centre de formation de la Croix-Rouge suisse.",
    categorie: "Adolescence",
    image:
      "https://www.diefamilie.ch/images/Check-In_geschn.jpg?w=400&fit=max&q=80",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  // ===== SCOLARITÉ =====
  {
    id: "scolarite-1",
    titre: "Le système scolaire en Suisse",
    contenu:
      "Le système scolaire suisse est réglementé au niveau cantonal, ce qui signifie que chaque canton est responsable de ses propres écoles. En parallèle, des conditions-cadres nationales permettent d’assurer une certaine comparabilité de l’enseignement dans les différentes régions. La scolarité est généralement obligatoire pour les enfants de 4 à 16 ans.\n\nKindergarten\n\n- Âge : 4 à 6 ans\n- Durée : 2 ans\n- Objectif : favoriser le développement individuel, apprendre par le jeu et préparer à l’école primaire.\n- Organisation : horaires blocs le matin, généralement de 8 h à 12 h. En deuxième année, des cours ont également lieu l’après-midi. Des temps d’accueil et des offres de garde complètent l’enseignement.\n- Plans d’études : Lehrplan 21 en Suisse alémanique, PER en Suisse romande et Piano di studio au Tessin.\n\nÉcole primaire\n\n- Âge : environ 6 à 12 ans\n- Durée : 6 ans\n- Objectif : acquérir les connaissances fondamentales dans les principales matières, notamment l’allemand, le français, l’italien, les mathématiques, les sciences, les activités artistiques et le sport.\n- Organisation : elle est souvent divisée en cycle 1, de la 1re à la 3e année, et cycle 2, de la 4e à la 6e année.\n\nSecondaire I\n\n- Âge : environ 12 à 15 ans\n- Durée : 3 ans\n- Objectif : approfondir la formation générale et préparer les élèves au secondaire II, notamment à la formation professionnelle ou à une école de formation générale.\n- Organisation : selon le canton, les classes peuvent être réparties en différents niveaux de performance.\n\nSecondaire II\n\n- Âge : environ 15 à 19 ans\n- Options :\n\n1) Formation professionnelle, apprentissage ou école professionnelle : système dual combinant une formation pratique en entreprise et un enseignement théorique à l’école professionnelle.\n2) Gymnase, école de culture générale ou école de maturité professionnelle : formation scolaire permettant notamment d’accéder à l’université ou à une haute école spécialisée.\n\nFormation supérieure\n\n- Universités et hautes écoles spécialisées : formation supérieure accessible après le secondaire II, généralement avec une maturité gymnasiale ou professionnelle.\n- Hautes écoles pédagogiques : formation des enseignants pour les différents niveaux scolaires.\n\nParticularités du système scolaire suisse\n\n- Diversité linguistique : l’enseignement est dispensé dans la langue officielle du canton, à savoir l’allemand, le français, l’italien ou le romanche. L’apprentissage des langues étrangères commence dès l’école primaire.\n- Autonomie cantonale : les cantons présentent des différences concernant les plans d’études, l’organisation scolaire, les horaires et les systèmes d’évaluation.\n- Concordat HarmoS : il vise à harmoniser certains objectifs éducatifs entre les cantons, notamment dans les domaines de l’école enfantine, de l’école primaire et du secondaire I.",
    categorie: "Scolarité",
    image:
      "https://www.diefamilie.ch/images/schule-harmos-lehrplan21-(1).jpg?w=400&fit=max&q=80",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "scolarite-2",
    titre: "Apprendre une langue étrangère",
    contenu:
      "Apprendre une langue étrangère est une véritable richesse pour le jeune enfant. Cet apprentissage lui procure du plaisir, ouvre son esprit à d’autres cultures et favorise la tolérance.\n\nL’enfant a un rapport aux langues différent de celui des adolescents et des adultes. Il apprend plus facilement et de manière inconsciente, par imitation et à travers le jeu, de la même manière qu’il apprend sa langue maternelle.\n\nCette capacité exceptionnelle à apprendre les langues diminue progressivement avec l’âge et disparaît après l’âge de dix ans.\n\n- Le jeune enfant a une excellente capacité auditive et une grande facilité à reproduire les sonorités et les mots de nombreuses langues européennes.\n- Le jeune enfant est curieux et prend plaisir à apprendre.\n- Il aime jouer avec les mots et comprend rapidement que la nouvelle langue lui permet de communiquer. Il éprouve une certaine satisfaction à l’utiliser.\n- Plus l’enfant grandit, plus il perd de sa spontanéité et peut avoir peur de faire des erreurs.\n- Les adolescents craignent parfois de se ridiculiser devant les autres, ce qui peut les freiner dans leur apprentissage.",
    categorie: "Scolarité",
    image:
      "https://www.diefamilie.ch/images/partage/langues_article.jpg?w=400&fit=max&q=80",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "scolarite-3",
    titre: "Les écoles privées en Suisse",

    contenu: `
La Suisse est connue pour la qualité de son système éducatif, qui comprend à la fois des écoles publiques et privées. Les écoles privées jouent un rôle important et offrent aux parents et aux élèves une alternative au système éducatif public. Elles se distinguent par un accompagnement personnalisé, des concepts pédagogiques innovants et souvent une orientation internationale.

Les écoles privées en Suisse constituent une alternative intéressante au système éducatif public. Elles se caractérisent par une qualité élevée, un accompagnement individuel et des approches pédagogiques innovantes. Pour les familles qui sont prêtes à investir dans l'éducation de leurs enfants, elles peuvent représenter une option intéressante. Il est toutefois important de considérer également le rôle social des écoles privées et de veiller à ce que l'éducation reste accessible à tous.

## Que sont les écoles privées ?

Les écoles privées sont des établissements d'enseignement qui ne sont pas gérés par l'État, mais par des organismes privés tels que des associations, des fondations ou des organisations religieuses. Contrairement aux écoles publiques, elles demandent généralement des frais de scolarité, ce qui leur offre davantage de liberté financière et pédagogique.

## Avantages des écoles privées

* **Accompagnement personnalisé** : Les petites classes et un taux d'encadrement élevé permettent un accompagnement adapté aux besoins de chaque élève.
* **Orientation internationale** : De nombreuses écoles privées proposent un enseignement bilingue ou des programmes scolaires internationaux comme l'International Baccalaureate (IB), ce qui est particulièrement intéressant pour les familles expatriées.
* **Concepts pédagogiques innovants** : Les écoles privées expérimentent souvent de nouvelles approches pédagogiques, comme Montessori, Waldorf ou l'apprentissage par projets.
* **Flexibilité** : Elles peuvent répondre plus rapidement aux besoins individuels des élèves et disposent souvent d'équipements modernes.

## Défis

Malgré leurs avantages, les écoles privées présentent également certains défis. Les frais de scolarité peuvent être élevés, ce qui rend leur accès plus difficile pour les familles disposant de revenus modestes. Elles sont également parfois critiquées pour leur potentiel à renforcer les inégalités sociales, car elles accueillent souvent des enfants issus de familles privilégiées.

## Les écoles privées en Suisse

La Suisse compte un grand nombre d'écoles privées, qui se distinguent par leur orientation et leur public cible. Certaines sont spécialement adaptées aux besoins des familles internationales, comme l'International School of Geneva ou la Zurich International School. D'autres proposent des programmes scolaires spécialisés, comme les écoles secondaires suisses qui préparent aux études supérieures.
`,

    categorie: "Scolarité",
    image:
      "https://www.diefamilie.ch/images/privatschulenschweiz.jpg?w=400&fit=max&q=80",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  // ===== PARENTS =====
  {
    id: "parents-1",
    titre: "Couples - Liens familiaux",

    contenu: `
La vie de famille est une aventure riche en facettes, qui apporte à la fois de la joie, des difficultés et beaucoup de moments amusants. C'est un espace où naissent des moments inoubliables de bonheur et de complicité, que ce soit autour d'un repas partagé, lors de sorties ou simplement dans la vie quotidienne. Les petites choses, comme les rires des enfants, les jeux en famille ou le soutien dans les moments difficiles, contribuent à créer un lien affectif fort et renforcent le sentiment de sécurité et de cohésion.

Cependant, la vie de famille n'est pas toujours synonyme de joie. Les difficultés en font également partie. Les conflits, les malentendus ou les contraintes du quotidien peuvent perturber l'harmonie et nécessitent de la patience, de la compréhension et la volonté de faire des compromis. Ces moments difficiles peuvent être douloureux, mais ils contribuent souvent au développement personnel et collectif. Ils nous apprennent à résoudre les problèmes ensemble et à sortir plus forts des périodes de crise.

Parallèlement, les moments de plaisir dans la vie familiale apportent équilibre et joie. Qu'il s'agisse de sorties spontanées, de soirées jeux ou de loisirs partagés, ces activités renforcent non seulement les liens familiaux, mais offrent également un espace pour la créativité et la détente.

Dans l'ensemble, la vie de famille est un voyage unique, marqué par une grande diversité d'émotions et d'expériences. C'est un processus d'apprentissage permanent qui nous enseigne à apprécier les beaux moments et à ressortir plus forts des difficultés.
`,

    categorie: "Parents",
    image: "https://www.diefamilie.ch/images/family_L.jpg?w=400&fit=max&q=80",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "parents-2",
    titre: "Nous nous marions - Besoins en matière d'assurance",

    contenu: `

## Nous nous marions

Vous allez vous marier ou avez déjà franchi le grand pas devant l'autel ? Toutes nos félicitations ! Il est maintenant temps de vérifier votre situation commune en matière d'assurance.

## Vivre ensemble

Une assurance ménage pour plusieurs personnes est moins chère que deux assurances séparées. Si vous êtes assurés auprès de deux compagnies différentes, vous devriez résilier l'un des contrats à la prochaine échéance possible. Vérifiez également si le montant assuré pour vos biens correspond toujours à la valeur réelle de vos possessions.

## Cadeaux de mariage

Protégez les objets de valeur avec une assurance pour objets de valeur. Si l'un de ces objets est perdu ou volé, la perte peut être indemnisée. Cela s'applique également lorsque vous perdez ou égarez vous-même un objet assuré, comme un bijou de valeur.

## Voyage de noces

Avec une assurance voyage, les frais peuvent être remboursés si vous ne pouvez pas effectuer votre voyage ou si vous devez l'interrompre prématurément. Vous pouvez souscrire une assurance voyage individuellement ou pour plusieurs personnes vivant dans le même ménage.

## Prévoyance

Le mariage règle également la succession. Votre épouse ou votre époux bénéficie en principe de prestations d'assurance en cas de décès. Avec une assurance-vie, vous pouvez également vous protéger mutuellement en cas de décès ou d'invalidité. Un fonds de placement peut être intéressant si vous souhaitez épargner à long terme pour votre retraite ou pour réaliser un projet important.

Si l'un des conjoints s'occupe principalement des enfants pendant une longue période et exerce le rôle de parent au foyer, il est important de demander conseil en matière de prévoyance. Cela permet notamment d'éviter des lacunes de cotisations à l'AVS.
`,

    categorie: "Parents",
    image:
      "https://www.diefamilie.ch/images/couple-assurance_XL.jpg?w=400&fit=max&q=80",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "parents-3",
    titre: "Nous vivons en concubinage",

    contenu: `
Les personnes qui vivent avec leur partenaire dans une relation similaire au mariage devraient examiner attentivement leur situation commune en matière d'assurance. Il ne faut pas oublier que le droit civil ne réglemente que de manière limitée les droits et les obligations des partenaires en concubinage.

## Vivre ensemble

Une assurance ménage pour plusieurs personnes est moins chère que deux assurances séparées. Si vous êtes assurés auprès de deux compagnies différentes, vous devriez résilier l'un des contrats à la prochaine échéance possible. Vérifiez également si le montant assuré pour vos biens correspond toujours à la valeur réelle de vos possessions.

## Régler la prévoyance

Dans notre système de prévoyance, les couples en concubinage sont désavantagés par rapport aux couples mariés, car la succession n'est pas automatiquement réglée. Si le partenaire ou la partenaire décède, la personne survivante ne reçoit donc pas automatiquement de prestations des assurances sociales. Il existe également des désavantages en cas d'invalidité. Une assurance-vie peut permettre de protéger son partenaire ou sa partenaire.

Les caisses de pension appliquent des règles différentes. Renseignez-vous auprès de votre caisse de pension.

La conclusion d'un contrat de concubinage est recommandée, en particulier pour les couples ayant des enfants. Ce contrat permet de régler la répartition des biens ainsi que l'autorité parentale sur les enfants en cas de décès de l'un des partenaires ou en cas de séparation.
`,

    categorie: "Parents",
    image:
      "https://www.diefamilie.ch/images/konkubinat_5_L.jpg?w=400&fit=max&q=80",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  // ===== VIE DE FAMILLE =====
  {
    id: "vie-de-famille-1",
    titre: "Grands-parents - Liens familiaux",

    contenu: `
**Les grands-parents sont des personnes de référence importantes pour leurs petits-enfants. Ils leur offrent un soutien affectif, de l'amour et un sentiment de sécurité. Ils peuvent les aider à développer leur identité et à transmettre des valeurs. Ils peuvent également soulager les parents et les aider dans l'éducation de leurs enfants.**

## Soutien affectif

Les grands-parents peuvent donner aux enfants un sentiment de sécurité et de réconfort. Ils sont là pour eux, quoi qu'il arrive. Ils peuvent les écouter lorsqu'ils rencontrent des difficultés et les aider à les résoudre. Les grands-parents peuvent également être des modèles pour leurs petits-enfants et leur montrer comment faire face aux situations difficiles.

## Amour et attention

Les grands-parents ont souvent beaucoup de temps à consacrer à leurs petits-enfants. Ils peuvent leur offrir une attention et une affection que les parents ne sont pas toujours en mesure de leur donner. Ils peuvent jouer avec eux, leur lire des histoires ou simplement leur tenir compagnie.

## Transmission des valeurs

Les grands-parents peuvent transmettre à leurs petits-enfants des valeurs telles que le respect, l'entraide et la tolérance. Ils peuvent également les aider à développer leur propre identité. Les grands-parents peuvent raconter leurs propres expériences à leurs petits-enfants et ainsi les aider à développer leur propre opinion et leur propre manière de voir les choses.

## Soutien dans l'éducation

Les grands-parents peuvent aider les parents dans l'éducation de leurs enfants. Ils peuvent leur donner des conseils ou simplement garder les enfants afin que les parents puissent avoir du temps pour eux. Les grands-parents peuvent également aider les parents à adopter de nouvelles perspectives et à remettre en question leurs propres méthodes éducatives.

## Effets positifs des grands-parents sur les petits-enfants

Des études ont montré que les enfants qui entretiennent une relation étroite avec leurs grands-parents sont émotionnellement plus stables, gèrent mieux le stress et ont une meilleure estime d'eux-mêmes. Ils sont également moins susceptibles de présenter des problèmes comportementaux.

## Effets positifs des petits-enfants sur les grands-parents

Les petits-enfants peuvent apporter beaucoup de joie et une nouvelle énergie à leurs grands-parents. Ils sont une source de bonheur et peuvent les encourager à rester actifs. Les grands-parents se sentent souvent utiles et reconnus lorsqu'ils passent du temps avec leurs petits-enfants. Ils peuvent leur transmettre une partie de ce qu'ils ont eux-mêmes appris au cours de leur vie.

Bien sûr, toutes les relations entre grands-parents et petits-enfants ne sont pas identiques. Certains grands-parents sont très proches de leurs petits-enfants, tandis que d'autres entretiennent une relation moins étroite. Dans la plupart des cas, cependant, les grands-parents sont des personnes de référence importantes pour leurs petits-enfants et ont une influence positive sur leur vie.
`,

    categorie: "Vie de famille",
    image:
      "https://www.diefamilie.ch/images/full-shot-happy-family-sitting-couch.jpg?w=400&fit=max&q=80",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "vie-de-famille-2",
    titre: "Gestion de la vie familiale",

    contenu: `
**Les parents souhaitent que leurs enfants soient en bonne santé, heureux et épanouis, et qu'ils deviennent des adultes autonomes et accomplis.** C'est un souhait partagé par de nombreux parents. Afin de ne négliger ni le développement intellectuel, ni le développement social ou physique, de nombreux enfants ont déjà, dès leur plus jeune âge, un emploi du temps bien chargé.

École pendant la journée, entraînement le soir et compétitions ou fêtes d'anniversaire le week-end. Ce qui, dans l'idéal, procure du plaisir à l'enfant et l'aide à se développer peut également devenir une source de stress pour toute la famille.

Les parents parviennent-ils à tout concilier ? À gérer le ménage, à s'occuper des enfants, à les accompagner d'une activité à l'autre, ou bien tout le système familial finit-il par montrer des signes de surcharge ? Lorsque les parents ont le sentiment de devoir simplement fonctionner comme des machines, la situation peut rapidement devenir difficile à gérer.

Les signes d'alerte peuvent notamment être la fatigue ainsi qu'une consommation croissante d'alcool ou de cigarettes. Si une certaine indifférence face aux besoins ou aux difficultés des enfants apparaît également, il est grand temps d'envisager un changement : consacrer davantage de temps à la vie de couple et s'accorder des moments de liberté individuels afin de retrouver un meilleur équilibre énergétique. Si ces mesures ne permettent pas d'améliorer la situation, un accompagnement professionnel peut être utile.

**Notre recommandation de lecture sur ce thème :**

Bettina Mähler, Peter Musall : Eltern-Burnout - Wege aus dem Familienstress. RO

ISBN : 3499619903
`,

    categorie: "Vie de famille",
    image:
      "https://www.diefamilie.ch/images/our-dog-loves-hugs-from-us.jpg?w=400&fit=max&q=80",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "vie-de-famille-3",
    titre: "Planification familiale - L'importance de la contraception",

    contenu: `
**La contraception joue un rôle central dans les relations de couple modernes et constitue bien plus qu'un simple moyen d'éviter une grossesse. Elle concerne non seulement la santé physique, mais aussi la dynamique émotionnelle et psychologique entre les partenaires. À une époque où la sexualité est vécue de manière ouverte et autonome, la contraception contribue de manière essentielle à permettre aux couples d'assumer leur responsabilité dans la planification familiale et de construire une relation saine et stable.**

La contraception revêt une importance considérable, car elle permet de vivre sa sexualité de manière consciente et autonome. Elle protège non seulement contre les grossesses non désirées, mais renforce également la relation de couple en favorisant l'égalité, la santé sexuelle et le bien-être émotionnel. En choisissant ensemble la méthode contraceptive qui leur convient, les couples créent les bases d'une relation responsable et respectueuse, qui contribue à renforcer leur couple sur le long terme.

## Une planification familiale responsable

L'une des fonctions les plus évidentes de la contraception est de permettre de contrôler la planification familiale. Les couples peuvent décider eux-mêmes quand et s'ils souhaitent avoir des enfants. Cela leur donne la liberté de construire leur avenir selon leurs souhaits, que ce soit pour atteindre des objectifs professionnels ou financiers, consolider leur relation ou soutenir une famille déjà existante. L'utilisation de moyens contraceptifs permet aux couples de se préparer consciemment à la parentalité et d'accueillir leurs enfants dans un environnement stable.

## Favoriser l'égalité

La contraception renforce l'égalité au sein du couple. Les deux partenaires peuvent décider ensemble de la méthode contraceptive qui leur convient le mieux, ce qui favorise la communication et la compréhension mutuelle. Cette responsabilité partagée contribue à l'équilibre du couple en impliquant les femmes et les hommes de manière égale dans la planification familiale. La participation de l'homme à la contraception peut également être un signe de respect et de soutien face aux éventuelles contraintes physiques et émotionnelles que certaines méthodes contraceptives peuvent représenter pour la femme.

## Les avantages pour la santé

La contraception contribue de manière importante à la santé sexuelle. De nombreux moyens contraceptifs, notamment les préservatifs, protègent non seulement contre les grossesses non désirées, mais également contre les infections sexuellement transmissibles (IST). Il s'agit d'un aspect essentiel pour les couples qui souhaitent protéger leur propre santé ainsi que celle de leur partenaire. Par ailleurs, certaines méthodes contraceptives hormonales peuvent présenter des avantages pour la santé des femmes, comme le soulagement des douleurs menstruelles ou la régulation du cycle.

## Sécurité émotionnelle et psychologique

La sécurité offerte par des méthodes contraceptives fiables contribue largement au bien-être émotionnel des deux partenaires. La peur d'une grossesse non désirée peut entraîner du stress et des tensions dans une relation. Dans ce contexte, la contraception permet de créer une atmosphère plus sereine, dans laquelle les couples peuvent vivre leur sexualité ouvertement et sans crainte. Cette liberté peut favoriser une relation émotionnelle plus profonde et renforcer la confiance entre les partenaires.

## Faire face aux défis dans le couple

Dans de nombreuses relations, les questions liées au désir d'avoir des enfants ou au choix d'une méthode contraceptive sont sensibles et nécessitent une communication ouverte. Décider ensemble d'utiliser ou non certains moyens contraceptifs peut renforcer la compréhension et la capacité à trouver des compromis au sein du couple. Les discussions parfois difficiles sur la planification familiale ou sur les aspects de santé liés à la contraception peuvent également favoriser la proximité et la confiance mutuelle.

## Les avantages à long terme pour le couple

Les couples qui parlent tôt et ouvertement de contraception créent souvent une base solide pour une relation saine et stable. En assumant ensemble la responsabilité de leur santé sexuelle et reproductive, ils développent non seulement un sentiment de sécurité et de confiance, mais aussi une vision commune de l'avenir. Les couples qui organisent leur planification familiale de manière responsable peuvent souvent construire une relation plus stable et poursuivre leurs souhaits et leurs objectifs ensemble.
`,

    categorie: "Vie de famille",
    image:
      "https://www.diefamilie.ch/images/verhutung-bedeutung.jpg?w=400&fit=max&q=80",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  // ===== TRAVAIL =====
  {
    id: "travail-1",
    titre: "Cours de langues / Séjours linguistiques",

    contenu: `

## Parler plusieurs langues

Parler plusieurs langues ouvre les portes vers de nouvelles personnes, de nouveaux pays et de nouvelles cultures. De plus, les langues étrangères sont de plus en plus importantes dans de nombreux métiers et constituent souvent une condition requise pour une candidature.

Des cours préparant à des diplômes sont proposés et permettent d'obtenir une certification reconnue au niveau international, donnant ainsi une indication précise du niveau de langue. Pour approfondir une langue, vous pouvez également choisir un cours mettant davantage l'accent sur l'expression orale ou un cours axé sur le vocabulaire professionnel. D'autres cours sont spécialement destinés aux personnes travaillant comme jeunes au pair.

Pour les personnes étrangères qui s'installent en Suisse, des cours spécifiques sont proposés afin d'apprendre la langue de la région dans laquelle elles vivent. Une meilleure compréhension de la langue leur permet d'accéder plus facilement à l'ensemble de la vie sociale. Ces cours permettent également de découvrir les aspects culturels de la région. La commune de votre lieu de résidence pourra certainement vous renseigner et vous orienter.
`,

    categorie: "Travail",
    image:
      "https://www.diefamilie.ch/images/Sprachkurse_geschn.jpg?w=400&fit=max&q=80",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "travail-2",
    titre: "Travailler lorsque son enfant est malade",

    contenu: `Dès le 1er juillet 2021 : les parents d’enfants gravement malades bénéficient de jusqu’à 14 semaines de congé de prise en charge

Imaginez que vous soyez professionnellement actif et que votre enfant tombe soudainement gravement malade ou soit victime d’un accident. Il doit rester longtemps à l’hôpital, pendant plusieurs semaines, voire plusieurs mois. Votre monde bascule. En plus de l’inquiétude pour votre enfant et des bouleversements dans toute la famille, vous devez parfois compter sur la compréhension de votre employeur afin de pouvoir vous occuper de votre enfant sans devoir utiliser vos jours de vacances.

La loi prévoit que les employeurs doivent continuer à verser le salaire en cas d’absences de courte durée. Lorsqu’un enfant est malade, l’un des parents peut prendre jusqu’à trois jours de congé payé consécutifs, indépendamment de la durée de la maladie. Cette possibilité s’applique à chaque événement, dans la limite de dix jours par année.

Le congé payé ne concerne pas uniquement la prise en charge d’un enfant malade ou accidenté, mais également celle d’autres membres de la famille ou du partenaire ou de la partenaire.

En décembre 2020, le Parlement a approuvé une nouvelle réglementation concernant le congé de prise en charge, entrée en vigueur le 1er juillet 2021.

Désormais, les parents qui exercent une activité professionnelle peuvent bénéficier d’une allocation de prise en charge financée par le régime des allocations pour perte de gain (APG). Le congé de prise en charge peut durer jusqu’à 14 semaines. Les parents peuvent le prendre en une seule fois ou réparti sur plusieurs jours, dans un délai-cadre de 18 mois.

Lorsque les deux parents travaillent, les 14 semaines sont réparties entre eux. Pour les absences plus longues, il reste nécessaire de prendre un congé non payé ou de trouver une autre solution de prise en charge.

L’association Kind+Spital s’engage en faveur d’un soutien financier suffisant pour les parents qui travaillent et dont les enfants sont gravement malades. Elle défend notamment le droit des parents à pouvoir accompagner leurs enfants malades sans subir de pertes de revenus supplémentaires.

À propos de Kind+Spital

Kind+Spital s’engage en faveur des droits des enfants et des adolescents dans le domaine de la santé. L’objectif est d’améliorer les conditions psychologiques et physiques de séjour des enfants et des adolescents à l’hôpital.`,
    categorie: "Travail",
    image:
      "https://www.diefamilie.ch/images/Artikel-Krankes-Kind_500.jpg?w=400&fit=max&q=80",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "travail-3",
    titre: "Travail et famille - Égalité",

    contenu: `Comment concilier vie professionnelle, vie privée et vie familiale ? Aujourd’hui, de plus en plus d’hommes et de femmes souhaitent exercer une activité professionnelle sans pour autant sacrifier le temps consacré à leurs enfants et à leurs proches. La conciliation entre travail et famille signifie parvenir à maintenir un équilibre social et personnel dont chacun, ainsi que l’entreprise, peut bénéficier.

La gestion des tâches ménagères et familiales peut toutefois représenter une charge importante qui s’ajoute au travail professionnel et rend cette conciliation plus difficile. Voici les 8 points essentiels à prendre en compte lors de la réorganisation de sa vie professionnelle et privée.

Suivez Isabelle et Nicolas étape par étape dans leur quotidien familial et découvrez avec eux les huit éléments à prendre absolument en considération.

Nicolas et Isabelle avaient trouvé leur rythme : Nicolas travaillait à 100 % pour assurer le revenu principal de la famille, tandis qu’Isabelle s’occupait de leurs deux enfants tout en continuant à travailler un jour par semaine.

Lorsque le plus jeune enfant est entré à l’école, Isabelle a toutefois exprimé le souhait de travailler davantage, à 50 ou 60 %. Le précieux équilibre familial risque alors d’être bouleversé.

### 1. Exprimer ses attentes et ses besoins

Isabelle exprime le souhait d’augmenter son temps de travail. C’est alors au tour de Nicolas de réfléchir à ses propres souhaits : pourquoi ne réduirait-il pas son activité à quatre journées complètes et une matinée, afin de profiter du mercredi après-midi libre avec les enfants ?

### 2. Évaluer les futurs revenus du couple

Grâce à l’augmentation de son taux d’activité, le revenu d’Isabelle va augmenter. Mais la famille disposera-t-elle réellement de plus d’argent à la fin du mois ? Les éventuels frais supplémentaires de garde des enfants et les impôts plus élevés risquent-ils de réduire, voire d’annuler, ce revenu supplémentaire ?

### 3. Trouver une solution de garde pour les enfants

Peut-on compter sur la famille ou sur une famille de jour ? Existe-t-il une structure d’accueil extrascolaire pour les enfants lorsque Isabelle et Nicolas travaillent tous les deux ? Et surtout : quelle solution prévoir pendant les vacances scolaires ?

### 4. Repenser la répartition des tâches ménagères et familiales

Comme Isabelle travaille davantage, elle aura moins de temps pour les tâches ménagères. Il faut donc répartir les tâches entre tous les membres de la famille et éventuellement revoir les exigences de chacun. Pourquoi ne pas faire appel ponctuellement ou régulièrement à une aide-ménagère ?

### 5. Négocier avec son partenaire

Pour parvenir à un équilibre familial et individuel entre travail et famille, il est nécessaire de réfléchir ensemble, d’échanger et de négocier au sein du couple. La négociation s’apprend. Ces principes peuvent également être appliqués lorsqu’il faut décider qui s’occupera d’un enfant malade.

### 6. Considérer l’équilibre global

Isabelle et Nicolas sont prêts à modifier leurs habitudes, mais à condition de préserver l’équilibre de la famille ainsi que celui de chacun. Ils gardent toujours à l’esprit l’importance de disposer de temps de qualité avec leurs enfants, en couple et pour eux-mêmes.

### 7. Faire correspondre l’emploi au niveau de qualification

Isabelle souhaite évoluer professionnellement en trouvant un emploi correspondant à sa formation et à son niveau de qualification. Comment peut-elle valoriser les compétences qu’elle a acquises à la maison ? Comment assurer son évolution professionnelle et son accès à la formation continue ?

### 8. Négocier avec l’employeur

Isabelle et Nicolas, qui souhaitent réduire leur temps de travail, doivent discuter de l’organisation de leurs horaires. Ils réfléchissent également à d’autres possibilités : leurs horaires sont-ils compatibles avec ceux de l’école et des structures de garde ? Quelle flexibilité ont-ils en cas de maladie des enfants ? Une partie du travail peut-elle être effectuée à domicile afin de réduire les trajets ? Est-il possible d’organiser le temps de travail sur une base annuelle afin d’obtenir davantage de jours de congé ?`,
    categorie: "Travail",
    image:
      "https://www.diefamilie.ch/data/dataimages/Upload/beruf-familie4.jpg",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  // ===== BUDGET ET ASSURANCE =====
  {
    id: "budget-1",
    titre: "Idées d’investissement pour les couples",

    contenu: `Lorsqu’un couple possède un compte commun, il est important de prendre également des décisions communes en matière d’investissement. Mais quelles possibilités existent ? Faut-il laisser l’argent sur un compte à vue ou à terme, ou est-il préférable de se tourner vers les marchés financiers ou les cryptomonnaies ?

## Investir dans des actions, des fonds et des cryptomonnaies

Qu’il s’agisse d’investir en bourse, dans l’immobilier ou encore dans des matières premières, investir à deux présente l’avantage de disposer automatiquement d’un capital de départ plus important. Ensemble, il est possible d’investir une somme plus élevée.

Ainsi, lorsqu’on investit dans des sociétés, des fonds ou des ETF, les frais de transaction peuvent être réduits, puisqu’il n’est pas nécessaire que chacun investisse séparément. Cela permet d’investir des montants plus importants tout en limitant certains frais.

Il peut également être plus facile de prendre une décision à deux lorsque l’on hésite sur les secteurs dans lesquels investir. L’avis du partenaire peut aider à déterminer s’il est pertinent d’investir dans les actions d’une entreprise technologique ou de mettre en place un plan d’épargne en ETF.

Il est toutefois essentiel de parvenir à un accord. Par exemple, si l’un des partenaires s’interroge sur l’intérêt d’investir dans les cryptomonnaies et que l’autre est préoccupé par la volatilité du marché, une discussion approfondie et une réflexion à long terme peuvent permettre de prendre une décision commune.

Il est également important de veiller à la diversification. Un couple peut investir dans différentes entreprises, dans un fonds largement diversifié ou dans plusieurs classes d’actifs, plutôt que de placer tout son argent dans une seule entreprise ou uniquement dans le Bitcoin. Répartir son argent entre différents types d’investissements permet de réduire le risque global.

## Investir dans la formation

Il est également possible d’investir dans la formation continue. Suivre des formations peut ouvrir de nouvelles perspectives professionnelles et éventuellement permettre d’obtenir un salaire plus élevé. L’investissement dans la formation peut également contribuer au développement personnel et avoir des effets positifs sur la relation de couple. Il peut notamment permettre de découvrir de nouvelles perspectives.

Il est important que le couple décide ensemble d’investir dans la formation et dans l’avenir. Cela ne signifie toutefois pas que les deux partenaires doivent nécessairement commencer une nouvelle formation. Si l’un des deux est satisfait de sa situation professionnelle, l’investissement dans la formation peut tout à fait concerner uniquement l’un des partenaires.

Avant de commencer, il est recommandé de définir les montants que le couple souhaite consacrer à la formation ainsi que les objectifs recherchés. Avec un plan clair, il est plus facile d’obtenir des résultats concrets.`,
    categorie: "Budget et assurance",
    image:
      "https://www.diefamilie.ch/data/dataimages/Upload/budget_woman-3261425_1920.jpg",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "budget-2",
    titre: "Argent de poche",

    contenu: `Que vous donniez de l’argent de poche à votre enfant et quel montant vous choisissez de lui donner dépend de votre façon de voir les choses ainsi que de vos possibilités financières. En tant que parents, vous n’êtes pas obligés de lui verser de l’argent de poche. Les spécialistes estiment toutefois que l’argent de poche permet aux enfants de faire des expériences importantes avec l’argent et d’apprendre à le gérer. Les enfants doivent apprendre à répartir leur argent de poche et à épargner.

## Le bon moment

L’entrée à l’école est un moment approprié pour commencer à donner une petite somme d’argent de poche à l’enfant. À cet âge, il apprend à calculer et découvre la valeur de l’argent. Au début, il est recommandé de verser l’argent de poche chaque semaine. Choisissez ensemble un jour précis et respectez-le régulièrement. Selon le niveau de développement de votre enfant, vous pouvez passer à un versement mensuel vers la fin de l’école primaire.

## Que doit-on payer avec l’argent de poche ?

C’est à vous de décider ce que votre enfant doit payer avec son argent de poche. Là encore, il est important de définir des règles claires et précises. Réfléchissez-y à l’avance, établissez des règles simples et discutez-en avec votre enfant. Qui paie l’entrée au cinéma et le pop-corn ? Le crédit de téléphone portable doit-il être payé avec l’argent de poche ou faut-il prévoir une somme supplémentaire pour le téléphone ?

## Le contrôle parental

Les parents devraient aider leurs enfants à répartir leur argent et à établir un budget. Les enfants plus âgés, qui disposent déjà de sommes plus importantes, ont notamment besoin de conseils afin de ne pas avoir tout dépensé au milieu du mois.

Les enfants doivent toutefois pouvoir disposer librement de leur argent de poche et décider eux-mêmes de ce qu’ils souhaitent acheter. Vous pouvez simplement attirer leur attention sur les conséquences de leurs choix. Faire des erreurs fait partie du processus d’apprentissage : c’est aussi grâce aux erreurs que l’on apprend.

## Le montant

Le montant de l’argent de poche peut faire l’objet de discussions, notamment avec votre enfant !

Ne vous laissez pas influencer par les montants supposément reçus par les camarades de classe. Adaptez l’argent de poche à votre niveau de vie et à vos ressources financières, et parlez ouvertement et honnêtement avec votre enfant de la situation financière de la famille. Cela lui permet de développer progressivement une bonne compréhension de la valeur de l’argent.

En général, le montant de l’argent de poche augmente avec l’âge, tandis que les responsabilités de l’enfant s’élargissent progressivement. Le montant mensuel doit peu à peu permettre à l’enfant de prendre en charge lui-même certaines dépenses, comme les vêtements, le coiffeur, les repas de midi, etc. Vous pouvez éventuellement ouvrir un compte bancaire à son nom et y verser chaque mois le montant prévu. Il est recommandé de ne pas utiliser l’argent de poche comme moyen de pression éducatif.

Si votre enfant a besoin d’argent supplémentaire pour un achat important, il peut apprendre à le gagner, par exemple en participant à certaines tâches ménagères.

## Directives concernant l’argent de poche pour les élèves

L’argent de poche est une prestation volontaire recommandée par l’association faîtière Budgetberatung Schweiz. Seule une personne qui dispose d’argent peut apprendre à le gérer. Le montant de l’argent de poche dépend des possibilités financières de la famille. Parents et enfants discutent ensemble de l’utilisation prévue de cet argent. Dans le cadre convenu, l’enfant peut disposer librement de cette somme. Selon son âge et sa situation, les versements peuvent être effectués chaque semaine ou chaque mois.

## Les principales règles concernant l’argent de poche

- Verser l’argent régulièrement et sans que l’enfant ait besoin de le demander
- Définir clairement son utilisation
- Ne pas l’utiliser comme moyen de pression
- Laisser l’enfant disposer librement de l’argent dans le cadre convenu
- Ne pas combler les manques d’argent ni accorder d’avances`,
    categorie: "Budget et assurance",
    image:
      "https://www.diefamilie.ch/images/Depositphotos_320430338_L.jpg?w=400&fit=max&q=80",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },

  {
    id: "budget-3",
    titre: "Conseils en matière de budget et de dettes",

    contenu: `Les problèmes d’argent et les dettes sont un sujet sensible, souvent tabou dans de nombreuses familles. Pourtant, ils concernent plus de personnes qu’on ne pourrait le penser au premier abord. Lorsque les difficultés financières rythment le quotidien, leurs conséquences ne se font généralement pas attendre : les tensions augmentent, les inquiétudes pèsent sur les relations et même les décisions les plus simples deviennent difficiles. La situation est particulièrement délicate lorsque les dettes ne sont plus une difficulté temporaire, mais deviennent un problème durable.

Au sein des familles, différents besoins, attentes et responsabilités se rencontrent. Alors que les parents essaient d’assurer une certaine stabilité, les enfants et les adolescents ressentent souvent les conséquences indirectement, que ce soit par des restrictions dans leur quotidien ou par des conflits qui restent inexprimés. Par ailleurs, de nombreuses personnes ont du mal à parler ouvertement de leurs difficultés financières, ce qui peut encore aggraver la situation.

Ce dossier présente les causes et les conséquences des problèmes financiers au sein de la famille, décrit les situations typiques et donne un aperçu des différentes solutions permettant de sortir de l’endettement. Même si les crises financières peuvent être difficiles à vivre, il existe des stratégies et des possibilités de soutien qui peuvent aider à développer de nouvelles perspectives et à retrouver une stabilité durable.`,
    categorie: "Budget et assurance",
    image:
      "https://www.diefamilie.ch/images/Depositphotos_167349292_L.jpg?w=400&fit=max&q=80",
    date: "2026-08-01",
    dateISO: "2026-08-01",
  },
];
