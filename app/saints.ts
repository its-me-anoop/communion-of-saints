export type RelicStatus = "Confirmed" | "Almost confirmed" | "Not confirmed";

export const relicAvailability: Record<
  RelicStatus,
  { label: string; cardLabel: string; detail: string }
> = {
  Confirmed: {
    label: "Relic available",
    cardLabel: "Relic available",
    detail: "Relic available at this exhibition",
  },
  "Almost confirmed": {
    label: "Final confirmation pending",
    cardLabel: "Nearly confirmed",
    detail: "Relic availability is awaiting final confirmation",
  },
  "Not confirmed": {
    label: "Availability pending",
    cardLabel: "Confirmation pending",
    detail: "Relic availability has not yet been confirmed",
  },
};

export type Saint = {
  slug: string;
  name: string;
  shortName: string;
  epithet: string;
  lifespan: string;
  feast: string;
  status: RelicStatus;
  image: string;
  imageAlt: string;
  imageCredit: string;
  imageSource: string;
  introduction: string;
  story: string[];
  prayer: string[];
  prayerAttribution: string;
  prayerSourceName: string;
  prayerSource: string;
  patronage: string;
};

export const saints: Saint[] = [
  {
    slug: "john-paul-ii",
    name: "Saint John Paul II",
    shortName: "John Paul II",
    epithet: "A shepherd to the world",
    lifespan: "1920–2005",
    feast: "22 October",
    status: "Almost confirmed",
    image: "/saints/john-paul-ii.jpg",
    imageAlt: "Saint John Paul II smiling in his white papal cassock",
    imageCredit: "Catholic Diocese of Hong Kong Archives",
    imageSource: "https://archives.catholic.org.hk/The%20Popes/265-St%20John%20Paul%20II.htm",
    introduction:
      "A Polish pope whose courage, warmth and tireless travels carried the Gospel to people across the world.",
    story: [
      "Born Karol Józef Wojtyła in Wadowice, Poland, he lived through both Nazi occupation and Communist rule. His early experiences of suffering, friendship and prayer shaped a deep conviction that every human life carries God-given dignity.",
      "Elected pope in 1978, he encouraged the Church with the words “Do not be afraid.” Across more than twenty-six years of ministry, he defended human dignity, reached out to young people and helped inspire peaceful change in Eastern Europe.",
    ],
    prayer: [
      "O Mary, help us to respond to our vocation. Guide us to know true love and bless our affections.",
      "Saint John Paul II, help us open our hearts to Christ, defend the dignity of every person and answer God’s call without fear. Amen.",
    ],
    prayerAttribution: "Adapted from Saint John Paul II’s Act of Entrustment to Mary",
    prayerSourceName: "The Holy See",
    prayerSource: "https://www.vatican.va/content/john-paul-ii/en/prayers/documents/hf_jp-ii_20030410_prayer-giovani.html",
    patronage: "Young people, families and World Youth Day",
  },
  {
    slug: "carlo-acutis",
    name: "Saint Carlo Acutis",
    shortName: "Carlo Acutis",
    epithet: "Holiness in the digital age",
    lifespan: "1991–2006",
    feast: "12 October",
    status: "Confirmed",
    image: "/saints/carlo-acutis.png",
    imageAlt: "Saint Carlo Acutis smiling outdoors in a red polo shirt",
    imageCredit: "Jersey Catholic",
    imageSource: "https://jerseycatholic.org/carlo-acutis-canonization-first-milllenial-saint-will-impact-youth-in-church",
    introduction:
      "A joyful teenager who loved the Eucharist and used his gift for technology to help others encounter Christ.",
    story: [
      "Born in London and raised in Milan, Carlo lived an ordinary teenage life filled with friendship, football, computers and a remarkable love for the Eucharist. He attended Mass frequently, cared for classmates who were excluded and quietly helped people in need.",
      "Carlo created websites that catalogued Eucharistic miracles, showing how technology could be used in service of faith. He died from leukaemia at fifteen, offering his suffering for the Church, and was canonised in 2025.",
    ],
    prayer: [
      "God our Father, thank you for Carlo, whose young life showed love for Jesus in the Eucharist and compassion for the poor.",
      "Through his intercession, draw us along the highway to heaven and help us use our gifts for your glory. Amen.",
    ],
    prayerAttribution: "Adapted from the official prayer for Carlo’s canonisation",
    prayerSourceName: "Association of Carlo Acutis",
    prayerSource: "https://www.carloacutis.com/en/association/preghiera-ufficiale",
    patronage: "Young people, students and internet users",
  },
  {
    slug: "jacinta-francisco-marto",
    name: "Saints Jacinta & Francisco Marto",
    shortName: "Jacinta & Francisco",
    epithet: "The children of Fátima",
    lifespan: "1908–1920",
    feast: "20 February",
    status: "Confirmed",
    image: "/saints/jacinta-francisco.jpg",
    imageAlt: "Saints Francisco and Jacinta Marto standing together",
    imageCredit: "Wikimedia Commons, CC BY-SA 4.0",
    imageSource: "https://commons.wikimedia.org/wiki/File:Saints_Francisco_and_Jacinta_Marto_double_portrait.jpg",
    introduction:
      "Young shepherd siblings whose lives became a simple, powerful witness to prayer, sacrifice and trust in Mary.",
    story: [
      "Francisco and Jacinta were shepherd children from Aljustrel, Portugal. In 1917, together with their cousin Lúcia, they reported apparitions of Our Lady at Cova da Iria near Fátima.",
      "They responded to Mary’s message with the Rosary, prayer for peace and small sacrifices offered for others. Both died during the influenza pandemic and were canonised together in Fátima in 2017.",
    ],
    prayer: [
      "My God, I believe, I adore, I hope and I love You!",
      "Saints Jacinta and Francisco, teach us to pray with trusting hearts, to offer small sacrifices for peace and to follow Mary towards Jesus. Amen.",
    ],
    prayerAttribution: "The Fatima prayer taught to the shepherd children, followed by an adapted intercession",
    prayerSourceName: "Sanctuary of Fatima",
    prayerSource: "https://www.fatima.pt/en/pages/fatima-prayers",
    patronage: "Children, the sick and those devoted to the Rosary",
  },
  {
    slug: "maria-goretti",
    name: "Saint Maria Goretti",
    shortName: "Maria Goretti",
    epithet: "Courage shaped by mercy",
    lifespan: "1890–1902",
    feast: "6 July",
    status: "Confirmed",
    image: "/saints/maria-goretti.jpg",
    imageAlt: "Devotional portrait of the young Saint Maria Goretti",
    imageCredit: "Beliefnet, public-domain devotional portrait",
    imageSource: "https://www.beliefnet.com/faiths/catholic/saints/m/maria-goretti.aspx",
    introduction:
      "A young Italian martyr remembered for moral courage and a final act of extraordinary forgiveness.",
    story: [
      "Maria grew up in a poor farming family and took on many responsibilities after her father died. She was known for her devotion, generosity and care for her younger siblings.",
      "At the age of eleven, Maria was fatally wounded while resisting an assault. Before her death she forgave her attacker, who later repented. Her witness is remembered as a call to protect the vulnerable and to believe in the transforming power of mercy.",
    ],
    prayer: [
      "Saint Maria Goretti, strengthened by God’s grace, obtain for us courage in temptation and comfort in sorrow.",
      "Pray for the protection of the vulnerable, healing for wounded hearts, and the grace to choose justice, mercy and peace. Amen.",
    ],
    prayerAttribution: "Adapted from the official prayer to Saint Maria Goretti",
    prayerSourceName: "World Apostolate of Fatima, USA",
    prayerSource: "https://www.mariagoretti.org/specialprayers.htm",
    patronage: "Young people, survivors of violence and purity of heart",
  },
  {
    slug: "john-vianney",
    name: "Saint John Vianney",
    shortName: "John Vianney",
    epithet: "The heart of a parish priest",
    lifespan: "1786–1859",
    feast: "4 August",
    status: "Confirmed",
    image: "/saints/john-vianney.jpg",
    imageAlt: "Portrait of Saint John Vianney in priestly vestments",
    imageCredit: "Omnes Magazine",
    imageSource: "https://www.omnesmag.com/en/focus/vocations/priests-saints-saint-juan-maria-vianney-the-holy-cure-of-ars/",
    introduction:
      "The humble Curé of Ars whose patient ministry of preaching, prayer and reconciliation renewed a whole parish.",
    story: [
      "John Vianney struggled with formal studies but persevered in his calling to the priesthood. Assigned to the small French village of Ars, he lived simply and devoted himself completely to his people.",
      "Pilgrims travelled from far away to hear him preach and receive the Sacrament of Reconciliation. His compassion, spiritual wisdom and long hours in the confessional made him an enduring model for parish priests.",
    ],
    prayer: [
      "My God, if my tongue cannot say in every moment that I love you, may my heart repeat it with every breath.",
      "Saint John Vianney, pray for our priests and parish communities, that our churches may be homes of mercy and faithful service. Amen.",
    ],
    prayerAttribution: "From Saint John Vianney’s Act of Love, followed by an adapted intercession",
    prayerSourceName: "The Holy See",
    prayerSource: "https://www.vatican.va/archive/compendium_ccc/documents/archive_2005_compendium-ccc_en.html?plain=true",
    patronage: "Parish priests and confessors",
  },
  {
    slug: "therese-of-lisieux",
    name: "Saint Thérèse of Lisieux",
    shortName: "Thérèse of Lisieux",
    epithet: "The little way of love",
    lifespan: "1873–1897",
    feast: "1 October",
    status: "Not confirmed",
    image: "/saints/therese-lisieux.png",
    imageAlt: "Historical portrait of Saint Thérèse of Lisieux in her Carmelite habit",
    imageCredit: "Pontifical Mission Societies",
    imageSource: "https://www.ppoomm.va/en/notizie-eventi/eventi/2020/santa-teresa-di-gesu-bambino-patrona-delle-missioni.html",
    introduction:
      "A young Carmelite whose “little way” finds holiness in trust, humility and small acts done with great love.",
    story: [
      "Thérèse Martin entered the Carmel of Lisieux at fifteen. Her hidden life was brief, but her spiritual memoir, Story of a Soul, revealed a path of deep confidence in God’s merciful love.",
      "She taught that holiness does not depend on extraordinary achievements. Instead, everyday tasks, weaknesses and relationships can all be offered to God with childlike trust. She was declared a Doctor of the Church in 1997.",
    ],
    prayer: [
      "O my God, I offer myself to your merciful love. Keep me small in your arms, and let every ordinary act become love for you and for others.",
      "Saint Thérèse, teach us your little way of trust, simplicity and joy. Amen.",
    ],
    prayerAttribution: "Adapted from Saint Thérèse’s Act of Oblation to Merciful Love",
    prayerSourceName: "Sanctuary of Lisieux",
    prayerSource: "https://www.therese-de-lisieux.catholique.fr/en/lhistoire/la-spiritualite-de-therese/",
    patronage: "Missionaries, florists and those seeking simplicity",
  },
  {
    slug: "augustine",
    name: "Saint Augustine of Hippo",
    shortName: "Augustine",
    epithet: "A restless heart found home",
    lifespan: "354–430",
    feast: "28 August",
    status: "Not confirmed",
    image: "/saints/augustine.jpg",
    imageAlt: "Renaissance painting of Saint Augustine writing as a bishop",
    imageCredit: "Sandro Botticelli, public domain",
    imageSource: "https://commons.wikimedia.org/wiki/Category:Saint_Augustine_in_His_Study_by_Sandro_Botticelli",
    introduction:
      "A brilliant seeker whose long journey to faith made him one of Christianity’s most influential teachers.",
    story: [
      "Born in North Africa, Augustine spent years searching for truth through study, ambition and competing philosophies. The prayers of his mother, Saint Monica, and the preaching of Saint Ambrose accompanied his gradual conversion.",
      "As bishop of Hippo, Augustine became a pastor, preacher and prolific writer. His Confessions explores memory, desire and grace, while The City of God reflects on hope in unsettled times. His insight continues to shape Christian thought.",
    ],
    prayer: [
      "Late have I loved you, Beauty ever ancient and ever new; late have I loved you.",
      "You have made us for yourself; turn our restless hearts home to you. Saint Augustine, pray that our searching may lead us to Christ. Amen.",
    ],
    prayerAttribution: "From Saint Augustine’s Confessions, with an adapted intercession",
    prayerSourceName: "The Holy See",
    prayerSource: "https://www.vatican.va/spirit/documents/spirit_20020903_agostino_en.html",
    patronage: "Theologians, printers and those seeking conversion",
  },
  {
    slug: "padre-pio",
    name: "Saint Padre Pio",
    shortName: "Padre Pio",
    epithet: "Prayer, mercy and perseverance",
    lifespan: "1887–1968",
    feast: "23 September",
    status: "Not confirmed",
    image: "/saints/padre-pio.jpg",
    imageAlt: "Saint Padre Pio wearing his Capuchin habit and priestly vestments",
    imageCredit: "Discerning Hearts",
    imageSource: "https://www.discerninghearts.com/catholic-podcasts/a-prayer-for-st-padre-pios-intercession/",
    introduction:
      "A Capuchin friar whose life of prayer, suffering and compassionate ministry drew countless people back to God.",
    story: [
      "Born Francesco Forgione in Pietrelcina, Italy, Padre Pio entered the Capuchins as a young man. He became known for his deep prayer, devotion to the Eucharist and patient attention to people seeking reconciliation and spiritual counsel.",
      "His life included long illness, misunderstanding and the visible wounds known as the stigmata. Through it all, he urged people to pray, hope and refuse anxiety. He also inspired the building of a hospital dedicated to relieving suffering.",
    ],
    prayer: [
      "Stay with me, Lord, for you are my life; without you I am without fervour. Stay with me, Lord, for you are my light.",
      "Saint Padre Pio, pray for all who carry pain in body, mind or spirit, and teach us to trust every burden to Jesus. Amen.",
    ],
    prayerAttribution: "From Saint Padre Pio’s prayer after Holy Communion, with an adapted intercession",
    prayerSourceName: "Opera Padre Pio Foundation",
    prayerSource: "https://www.operapadrepio.it/gruppidipreghiera/wp-content/uploads/2020/03/Stay-with-me-Lord-prayer-after-Communion.pdf",
    patronage: "The sick, confessors and those in need of healing",
  },
];

export function getSaint(slug: string) {
  return saints.find((saint) => saint.slug === slug);
}
