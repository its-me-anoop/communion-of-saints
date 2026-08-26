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

export function saintDisplayName(saint: Pick<Saint, "name" | "shortName">) {
  const honorific = saint.name.startsWith("Saints ") ? "Sts." : "St.";
  return `${honorific} ${saint.shortName}`;
}

export function saintPatronageLabel(saint: Pick<Saint, "name" | "patronage">) {
  const prefix = saint.name.startsWith("Saints ") ? "Patrons of" : "Patron of";
  return `${prefix} ${saint.patronage}`;
}

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
      "St John Paul II, intercede for us,\nthat we may always remain faithful to the Gospel;\nthat we may know how to open wide the doors to Christ;\nthat in difficult times we may be witnesses of joy and mercy;\nand that we may respond to our brothers and sisters who suffer,\nrecognising in their faces the Face of the Lord.",
      "Through your intercession,\nobtain for us the grace that we now ask…",
      "Help us not to allow ourselves to be robbed of hope,\nbut to journey in the certainty of faith.",
      "St John Paul II, pray for us. Amen.",
    ],
    prayerAttribution: "Adapted from Pope Francis’s prayer for the centenary of the birth of St John Paul II (18 May 2020).",
    prayerSourceName: "The Holy See",
    prayerSource: "https://www.vatican.va/content/francesco/en/prayers/documents/papa-francesco_preghiere_20200518_preghiera-centenario-gpii.html",
    patronage: "World Youth Day and young people",
  },
  {
    slug: "carlo-acutis",
    name: "Saint Carlo Acutis",
    shortName: "Carlo Acutis",
    epithet: "Holiness in the digital age",
    lifespan: "1991–2006",
    feast: "12 October",
    status: "Confirmed",
    image: "/saints/carlo-acutis.jpg",
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
      "O God, our Father,\nthank you for giving us Carlo,\na model of life for young people\nand a message of love for everyone.",
      "You made him fall in love with your Son Jesus,\nmaking the Eucharist his “Highway to Heaven.”",
      "You gave him Mary as a most loving Mother,\nand through the Rosary made him\na singer of her tenderness.",
      "Receive his prayer for us.\nLook especially upon the poor,\nwhom he loved and helped.",
      "Grant me also, through his intercession,\nthe grace that I need…",
      "Help us, following Carlo’s example,\nto remain close to Jesus\nand to journey towards Heaven.",
      "St Carlo Acutis, pray for us. Amen.",
    ],
    prayerAttribution: "Adapted from the official prayer published by the Carlo Acutis Association with ecclesiastical approval; the former petition for canonisation has been updated following his canonisation.",
    prayerSourceName: "Association of Carlo Acutis",
    prayerSource: "https://www.carloacutis.com/en/association/preghiera-ufficiale",
    patronage: "young people and the digital age",
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
      "God of infinite goodness,\nYou love the innocent and exalt the humble.\nThrough the intercession of the Immaculate Mother of Your Son,\nand of Saints Francisco and Jacinta,\ngrant that we may follow their example,\nserving You in simplicity of heart.",
      "Teach us to love prayer,\nto make sacrifices for the conversion of sinners,\nand to console the Hearts of Jesus and Mary.",
      "Through their intercession,\nobtain for us the grace that we now ask…",
      "Saint Francisco and Saint Jacinta,\nintercede for us and for our families,\nand lead us closer to Jesus.",
      "Amen.",
    ],
    prayerAttribution: "Adapted from the concluding prayer and themes of the official Litany of Saints Francisco and Jacinta published by the Shrine of Fátima.",
    prayerSourceName: "Shrine of Fátima",
    prayerSource: "https://www.fatima.pt/en/pages/litany-of-saints-francisco-and-jacinta",
    patronage: "children and the conversion of sinners",
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
      "St Maria Goretti,\nstrengthened by God’s grace,\nyou did not hesitate, even at a young age,\nto sacrifice your life rather than offend God.",
      "Teach us, and especially our young people,\nto have the courage to turn away from anything\nthat separates us from Jesus.",
      "Obtain for us from the Lord\nstrength in temptation,\ncomfort in the sorrows of life,\nand the grace which we now ask through your intercession…",
      "Teach us also, by your example,\nto forgive those who hurt us\nand to desire their salvation.",
      "May we one day rejoice with you\nin the everlasting glory of Heaven.",
      "St Maria Goretti, pray for us. Amen.",
    ],
    prayerAttribution: "Lightly adapted from the traditional Official Prayer to St Maria Goretti.",
    prayerSourceName: "World Apostolate of St Maria Goretti",
    prayerSource: "https://www.mariagoretti.org/specialprayers.htm",
    patronage: "young people, purity and forgiveness",
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
      "St John Vianney, holy Curé of Ars,\nfaithful priest and shepherd of souls,\nyou gave your life to lead others to the mercy of God.",
      "Teach us to love Jesus in the Holy Eucharist,\nto seek His mercy in the Sacrament of Reconciliation,\nand to persevere in prayer.",
      "Through your intercession,\nobtain for us the grace that we now ask…",
      "Pray especially for our priests.\nMay they grow in holiness,\nremain faithful to their vocation,\nand lead many souls to Christ.",
      "St John Vianney, pray for us. Amen.",
    ],
    prayerAttribution: "Intercessory prayer for chapel use, drawing on the Church’s presentation of St John Vianney’s priestly spirituality.",
    prayerSourceName: "The Holy See",
    prayerSource: "https://www.vatican.va/content/benedict-xvi/en/letters/2009/documents/hf_ben-xvi_let_20090616_anno-sacerdotale.html",
    patronage: "parish priests",
  },
  {
    slug: "therese-of-lisieux",
    name: "Saint Thérèse of Lisieux",
    shortName: "Thérèse of Lisieux",
    epithet: "The little way of love",
    lifespan: "1873–1897",
    feast: "1 October",
    status: "Not confirmed",
    image: "/saints/therese-lisieux.jpg",
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
      "St Thérèse of the Child Jesus,\nLittle Flower of Jesus,",
      "teach us your “Little Way” —\nto trust completely in God’s merciful love\nand to do even the smallest things with great love.",
      "Help us to love Jesus as you loved Him,\nand to make Him loved by others.",
      "Through your intercession,\nobtain for us the grace that we now ask…",
      "Pray for all missionaries\nand give us hearts filled with missionary zeal,\nso that through our prayer, sacrifice and witness,\nJesus may be known and loved.",
      "St Thérèse of Lisieux, pray for us. Amen.",
    ],
    prayerAttribution: "Intercessory prayer based on St Thérèse’s spirituality and the Church’s presentation of her missionary vocation.",
    prayerSourceName: "Sanctuary of Lisieux",
    prayerSource: "https://www.therese-de-lisieux.catholique.fr/en/lhistoire/la-spiritualite-de-therese/",
    patronage: "missions and missionaries",
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
      "St Augustine, our father and teacher,\nyou knew both the shining paths of God\nand the restless paths of the human heart.",
      "You searched for truth\nuntil you found the One\nwho alone could bring peace to your restless heart.",
      "Intercede for all who are searching for God,\nfor those who have wandered away from Him,\nand for those longing to return.",
      "Obtain for us the courage\nnever to give up our search for Truth,\nand lead us to a deeper love of Christ\nand His Church.",
      "Through your intercession,\nobtain for us the grace that we now ask…",
      "May our restless hearts find their rest in God\nand may we one day rejoice with you\nin our heavenly home.",
      "St Augustine, pray for us. Amen.",
    ],
    prayerAttribution: "Adapted from themes in St John Paul II’s Prayer to St Augustine, prayed before the saint’s relics in 2004.",
    prayerSourceName: "The Holy See",
    prayerSource: "https://www.vatican.va/content/john-paul-ii/en/speeches/2004/november/documents/hf_jp-ii_spe_20041111_prayer-st-augustine.html",
    patronage: "seekers, converts and theologians",
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
      "St Padre Pio,\nyou shared in a special way\nin the suffering and Passion of Jesus.",
      "Help us to remain close to Christ\nin times of suffering and trial.\nTeach us to pray with faith,\nto seek God’s mercy in Confession,\nand to love Jesus in the Holy Eucharist.",
      "Through your intercession,\nobtain for us the grace that we now ask…",
      "May we learn to unite our sufferings with Christ\nand live in the hope of His Resurrection.",
      "St Padre Pio, pray for us. Amen.",
    ],
    prayerAttribution: "Display adaptation inspired by the approved Prayer to Saint Pio and the spirituality of his life.",
    prayerSourceName: "Convent Shrine of Saint Pio of Pietrelcina",
    prayerSource: "https://www.conventosantuariopadrepio.it/en/archivio/le-preghiere/prayer-to-saint-pio.html",
    patronage: "the sick and those who suffer",
  },
  {
    slug: "alphonsa",
    name: "Saint Alphonsa of the Immaculate Conception",
    shortName: "Alphonsa",
    epithet: "Hope in suffering",
    lifespan: "1910–1946",
    feast: "28 July",
    status: "Not confirmed",
    image: "/saints/alphonsa.jpg",
    imageAlt: "Historical portrait of Saint Alphonsa in her Franciscan Clarist habit",
    imageCredit: "Saint Alphonsa, India Post, Government of India (1996), GODL-India, via Wikimedia Commons",
    imageSource: "https://commons.wikimedia.org/wiki/File:Saint_Alphonsa_1996_stamp_of_India_(cropped).jpg",
    introduction:
      "A Franciscan Clarist from Kerala whose joyful surrender to Christ transformed years of illness and suffering into a witness of hope.",
    story: [
      "Born Anna Muttathupadathu in Kudamalur, Kerala, in 1910, she felt drawn to consecrated life from childhood and joined the Franciscan Clarist community at Bharananganam. Taking the name Alphonsa of the Immaculate Conception, she served children as a teacher and catechist despite persistent ill health.",
      "Alphonsa understood her suffering as a way of sharing in Christ’s Cross and offered it in prayer for the Church and others. She died at Bharananganam on 28 July 1946, was beatified by Saint John Paul II in 1986 and canonised by Pope Benedict XVI in 2008.",
    ],
    prayer: [
      "St Alphonsa, beloved daughter of the Church,\nyou united your sufferings with the sufferings of Jesus\nand offered your whole life to Him with love.",
      "Intercede for all who are sick,\nfor those who suffer in body, mind or spirit,\nand for those who find their crosses difficult to bear.",
      "Help us to trust in God in times of suffering,\nto recognise His presence even in our trials,\nand never to lose our hope in Him.",
      "Through your intercession,\nobtain for us the grace that we now ask…",
      "Teach us to offer our lives completely to Jesus\nand to accept each day with faith, love and joy.",
      "May our sufferings draw us ever closer to Christ\nand lead us one day to the joy of Heaven.",
      "St Alphonsa, pray for us. Amen.",
    ],
    prayerAttribution: "Intercessory prayer for chapel use, based on the spirituality highlighted in official Church texts about St Alphonsa.",
    prayerSourceName: "The Holy See",
    prayerSource: "https://www.vatican.va/content/john-paul-ii/en/homilies/1986/documents/hf_jp-ii_hom_19860208_stadio-kattayam.html",
    patronage: "the sick and those who suffer",
  },
  {
    slug: "euphrasia-eluvathingal",
    name: "Saint Euphrasia Eluvathingal",
    shortName: "Euphrasia Eluvathingal",
    epithet: "The praying mother",
    lifespan: "1877–1952",
    feast: "29 August",
    status: "Not confirmed",
    image: "/saints/euphrasia-eluvathingal.jpg",
    imageAlt: "Statue of Saint Euphrasia kneeling in prayer at the Saint Euphrasia Museum",
    imageCredit: "Saint Euphrasia Museum scene by Smokingsingh, CC BY 4.0, via Wikimedia Commons; cropped",
    imageSource: "https://commons.wikimedia.org/wiki/File:Euphrasia_Eluvathingal1.JPG",
    introduction:
      "A Carmelite sister from Kerala whose deep life of Eucharistic prayer overflowed into quiet service, counsel and intercession.",
    story: [
      "Born Rosa Eluvathingal in Kattoor, Kerala, in 1877, she entered the Congregation of the Mother of Carmel and took the name Euphrasia of the Sacred Heart of Jesus. At Saint Mary’s Convent in Ollur she served as novice mistress and, from 1913 to 1916, as superior.",
      "Her life was marked by continual prayer, devotion to the Eucharist, the Sacred Heart of Jesus, Mary and the Rosary, and compassionate care for those who sought her help. Known as the “Praying Mother” and the “Mobile Tabernacle,” she died on 29 August 1952 and was canonised by Pope Francis in 2014.",
    ],
    prayer: [
      "St Euphrasia, Praying Mother,\nyou lived your life in deep union with God\nand found your joy in remaining close to Jesus\nin the Holy Eucharist.",
      "Teach us to become people of prayer,\nto seek Jesus in the silence of our hearts\nand to remain in His presence with love.",
      "Intercede for those who find it difficult to pray,\nfor those who feel far from God,\nand for all who long for a deeper friendship with Jesus.",
      "Through your intercession,\nobtain for us the grace that we now ask…",
      "Help us to love Jesus in the Blessed Sacrament,\nto entrust ourselves completely to Him,\nand to carry His presence with us\ninto the lives of those we meet.",
      "St Euphrasia, pray for us. Amen.",
    ],
    prayerAttribution: "Intercessory prayer for chapel use, based on the Eucharistic and prayerful spirituality highlighted in Church texts about St Euphrasia.",
    prayerSourceName: "The Holy See",
    prayerSource: "https://www.vatican.va/news_services/liturgy/saints/ns_lit_doc_20061203_eufrasia_en.html",
    patronage: "prayer and Eucharistic adoration",
  },
];

export function getSaint(slug: string) {
  return saints.find((saint) => saint.slug === slug);
}
