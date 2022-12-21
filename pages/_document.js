import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
      <title>AnimeVoid</title>
      <meta name="description" content="Keep Track Of Animes Using AnimeVoid!" />
      <meta name="keywords" content="Anime, Manga, AnimeList, AnimeVoid"></meta>
      <meta name="author" content="b1ink0"></meta>
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="apple-mobile-web-app-status-bar" content="#1c1c1c" />
      <meta name="theme-color" content="#1c1c1c" />
      </Head>
      <body id="root">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
