import type { Metadata } from "next";
import ChapelTabs from "../chapel-tabs";

const litany = [
  "Holy Mary, Mother of God",
  "St Joseph",
  "St John Paul II",
  "St Carlo Acutis",
  "St Francisco Marto",
  "St Jacinta Marto",
  "St Maria Goretti",
  "St Pio of Pietrelcina",
  "St John Mary Vianney",
  "St Thérèse of Lisieux",
  "St Augustine of Hippo",
  "St Alphonsa of the Immaculate Conception",
  "St Euphrasia Eluvathingal",
  "All holy angels and saints of God",
];

const saintWitnesses = [
  {
    name: "St John Paul II",
    witness:
      "an ordinary Polish priest, Karol Wojtyła, who went on to change the course of the world.",
  },
  {
    name: "St John Vianney",
    witness:
      "a simple priest who found his deepest calling in a life spent in the confessional.",
  },
  {
    name: "St Carlo Acutis",
    witness:
      "a young teenager of the digital age who found more joy in the Eucharist than in the internet.",
  },
  {
    name: "Sts Jacinta and Francisco",
    witness:
      "two very young children who understood the call to prayer and penance for the conversion of the world.",
  },
  {
    name: "St Alphonsa",
    witness:
      "a young girl from a remote village in Kerala, willing even to walk on burning embers rather than give up her call to religious life.",
  },
  {
    name: "St Maria Goretti",
    witness:
      "a young girl, newly admitted to Confession and Holy Communion, who would choose death rather than sin.",
  },
  {
    name: "St Thérèse of Lisieux",
    witness:
      "a young French girl, formed in the holiness of her family, who desired to become ever smaller so that she might draw ever closer to Jesus.",
  },
  {
    name: "St Padre Pio",
    witness:
      "a simple priest whose holiness and simplicity of life drew the world to him.",
  },
  {
    name: "St Augustine",
    witness:
      "a young man who left behind the pleasures of the world when he discovered the true joy of knowing God.",
  },
  {
    name: "St Euphrasia",
    witness:
      "an unassuming nun from a village in Kerala who spent her life before the Eucharist, becoming known simply as “the Praying Mother.” What did she see in the Eucharist?",
  },
];

const meditationDescription =
  "A guided Saints Chapel meditation on Ephesians 3:14–19, the Communion of Saints and intercessory prayer.";

export const metadata: Metadata = {
  title: "Meditation",
  description: meditationDescription,
  alternates: {
    canonical: "/meditation",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "article",
    locale: "en_GB",
    url: "/meditation",
    siteName: "The Saints Chapel",
    title: "Meditation · The Saints Chapel",
    description: meditationDescription,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "The Saints Chapel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meditation · The Saints Chapel",
    description: meditationDescription,
    images: ["/og.jpg"],
  },
};

export default function MeditationPage() {
  return (
    <main className="exhibition-shell route-transition">
      <ChapelTabs active="meditation" />

      <article className="meditation-content">
        <header className="meditation-heading">
          <p className="gallery-kicker">The Saints Chapel</p>
          <p className="meditation-event">Jesus Youth Jubilee Conference 2026</p>
          <h1>Meditation</h1>
        </header>

        <section className="meditation-section" aria-labelledby="pause-and-reflect">
          <h2 id="pause-and-reflect">Pause and reflect</h2>
          <p className="reflection-question">
            What depth of love for Christ would lead these saints to give Him
            everything — even their lives?
          </p>
          <p>What did they discover in Jesus that made everything else seem small?</p>
        </section>

        <section className="meditation-section" aria-labelledby="with-all-the-saints">
          <h2 id="with-all-the-saints">With all the saints…</h2>
          <p>Take a moment and become still.</p>
          <p>Slow down. Quiet your heart. Become aware of where you are.</p>
          <p>
            You are surrounded by the presence of men and women who <strong>loved Jesus</strong>.
          </p>
          <p>
            They walked this earth as we do.<br />
            They knew joy and sorrow, weakness and temptation, suffering and sacrifice.<br />
            Yet they allowed the love of Christ to transform their lives.
          </p>
          <p>
            Their earthly lives have ended, but <strong>they are alive in Christ</strong>.
          </p>
          <p>
            In the stillness of this chapel, allow yourself to experience the{" "}
            <strong>Communion of Saints</strong> — the aroma of holiness that surrounds
            you, and the witness of lives completely surrendered to God.
          </p>
        </section>

        <blockquote className="meditation-scripture">
          <p>
            “For this reason I bow my knees before the Father, from whom every family
            in heaven and on earth takes its name. I pray that, according to the
            riches of his glory, he may grant that you may be strengthened in your
            inner being with power through his Spirit, and that Christ may dwell in
            your hearts through faith, as you are being rooted and grounded in love.
            I pray that you may have the power to comprehend, what is the breadth
            and length and height and depth, and to know the love of Christ that
            surpasses knowledge, so that you may be filled with all the fullness of
            God.”
          </p>
          <cite>Ephesians 3:14–19</cite>
        </blockquote>

        <section className="meditation-section reflection-section" aria-labelledby="saint-witnesses">
          <h2 id="saint-witnesses">With all the Saints</h2>
          <ul className="saint-witness-list">
            {saintWitnesses.map((saint) => (
              <li key={saint.name}>
                <strong>{saint.name}</strong>
                <span>{saint.witness}</span>
              </li>
            ))}
          </ul>
          <p>Stay here for a moment.</p>
          <p>
            The same God who called them to holiness calls <strong>you</strong>.
          </p>
          <p>
            The same Christ whom they loved loves <strong>you</strong>.
          </p>
          <p className="love-measure">
            <span>Can you begin to comprehend</span>
            <strong>the breadth and length,</strong>
            <strong>the height and depth</strong>
            <strong>of His love for you?</strong>
          </p>
          <p>Then look around you at these witnesses of that Love.</p>
          <p>
            Bring to them the intentions you carry in your heart and ask them to
            pray with you and for you.
          </p>
          <p>Let yourself be loved by God.</p>
        </section>

        <section className="meditation-section litany-section" aria-labelledby="litany-title">
          <h2 id="litany-title">Litany of the Saints</h2>
          <ul className="litany-list">
            {litany.map((saint) => (
              <li key={saint}>
                <strong>{saint},</strong>
                <span>pray for us.</span>
              </li>
            ))}
          </ul>
        </section>

        <p className="meditation-closing">
          May we, with all the saints, come to know the love of Christ that
          surpasses knowledge and be filled with all the fullness of God. Amen.
        </p>
      </article>
    </main>
  );
}
