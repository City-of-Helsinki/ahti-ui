import React from 'react';

import styles from './TermsOfServicePage.module.scss';

const TermsOfService = () => {
  return (
    <div className={styles.content} lang="fi">
      <h1>Ahti -palvelua koskevat käyttöehdot</h1>
      <p>
        Ahti -palvelu (jäljempänä “Palvelu”) on Helsingin kaupungin (jäljempänä
        “Palveluntarjoaja”) verkkopalvelu. Palvelun käyttö edellyttää seuraavien
        ehtojen hyväksymistä. Palvelun käyttö ei ole sallittua, ellet hyväksy
        näitä ehtoja. Palveluntarjoajalla on milloin tahansa oikeus muuttaa
        näitä käyttöehtoja.
      </p>

      <h2>Palvelun käyttö</h2>
      <p>
        Palvelun sisältöä saa tarkastella tietokoneella tai vastaavalla
        laitteella, tulostaa siitä osia ja välittää aineistoa eteenpäin.
        Palvelun sisällön käyttö muuhun kuin ei-kaupalliseen tarkoitukseen on
        kiellettyä, ellei tähän ole Palveluntarjoajan kirjallista
        etukäteislupaa.
      </p>
      <p>
        Sivuston sisältö ja kuvamateriaali ovat Palveluntarjoajan tai sen
        yhteistyökumppanien omaisuutta ja tekijänoikeuslain suojaamia, ellei
        toisin ole ilmoitettu.
      </p>
      <p>
        Palvelun sisältämän aineiston luvaton käyttö tai levitys saattaa loukata
        tekijänoikeutta, tavaramerkkiin perustuvaa oikeutta ja muuta
        suojaoikeutta sekä johtaa rangaistukseen ja aiheuttaa
        vahingonkorvausvelvollisuuden.
      </p>

      <h2>
        Palveluntarjoajan verkkosivujen toiminnallisuus, sisältö ja
        Palveluntarjoajan vastuu vahingoista
      </h2>
      <p>
        Palveluntarjoaja tarjoaa Palvelun sellaisena kuin se on sekä pidättää
        itsellään oikeuden milloin tahansa muuttaa palvelun sisältöä ja
        rajoittaa siihen pääsyä. Palveluntarjoaja ei takaa palvelun virheetöntä
        ja keskeytyksetöntä käyttöä eikä vastaa palvelun käytöstä mahdollisesti
        aiheutuvista välillisistä tai välittömistä vahingoista.
      </p>
      <p>
        Palveluntarjoaja ei myönnä takuita siitä, että Palvelun sisältö soveltuu
        johonkin käyttötarkoitukseen eikä se vastaa mahdollisesta vahingosta,
        jonka sivustojen sisältämän tiedon käyttäminen voi aiheuttaa.
      </p>

      <h2>Linkit Palvelussa</h2>
      <p>
        Mikäli Palvelussa on linkkejä kolmansien osapuolten verkkosivuille tai
        palveluun, ei Palveluntarjoaja vastaa kolmannen osapuolen sivujen
        sisältämästä aineistosta tai palvelusta. Kolmannen osapuolen sivujen
        käyttö tapahtuu täysin käyttäjän omalla vastuulla. Tutustu sivujen
        käyttöehtoihin ja hyväksy ne ennen käytön aloittamista.
      </p>

      <h2>Henkilötietosuoja</h2>
      <p>Palvelu ei kerää palvelun käyttäjiltä henkilötietoja.</p>

      <h2>Tietoa Palvelun evästeistä</h2>
      <p>
        Evästeitä käytetään Palvelussa myös käyttökokemuksen parantamiseksi.
        Evästeisiin tallentuva tieto on nimetöntä, näin ollen käyttäjää ei voi
        tietojen perusteella yksilöidä. Jollet halua vastaanottaa evästeitä,
        voit estää niiden käytön selaimeen tehtävällä asetuksella. Tällöin on
        mahdollista, ettet kävijänä voi hyödyntää kaikkia sivujemme osia ja
        käyttökokemus heikkenee.
      </p>
      <h3>Analytiikan evästeet</h3>
      <p>
        Käytämme ilmaista ja avoimen lähdekoodin kävijän seurantaohjelmaa
        Matomoa. Matomo tekee käyttäjästä anonyymin, mikä varmistaa, ettei
        kolmansia osapuolia ole sivullamme evästeiden kanssa. Matomon ansiosta
        kaikki data pysyy meillä eikä sitä luovuteta kolmansille osapuolille.
        Lue lisää Matomosta seuraavasta linkistä: https://matomo.org/
      </p>

      <h2>
        Palveluntarjoajan ja sen yhteistyökumppanien logojen ja tavaramerkkien
        käyttöehdot
      </h2>
      <p>
        Palvelussa esiintyvät nimet, kuviot, logot ja tavaramerkit ovat
        Palveluntarjoajan tai sen yhteistyökumppanien omaisuutta. Niiden
        kopioiminen, siirtäminen, jakeleminen, tallentaminen tai muu
        hyödyntäminen on kiellettyä, ellei tähän ole Palveluntarjoajan tai sen
        yhteistyökumppanin kirjallista etukäteislupaa.
      </p>

      <h2>Käyttöehtojen päivittyminen</h2>
      <p>
        Kehittäessämme palveluitamme ja lainsäädännön muuttuessa myös nämä
        käyttöehdot saattavat joiltain osin muuttua. Suosittelemme tutustumaan
        käyttöehtoihin säännöllisin väliajoin. Olennaisista muutoksista
        ilmoitamme sähköpostitse ja/tai palveluidemme verkkosivuilla.
      </p>
      <p>Nämä käyttöehdot ovat viimeksi päivitetty 15.6.2020.</p>

      <h2>Muut ehdot</h2>
      <p>
        Näihin käyttöehtoihin sovelletaan Suomen lakia. Ellei näihin
        käyttöehtoihin liittyviä erimielisyyksiä pystytä ratkaisemaan
        neuvottelemalla, ratkaistaan ne Helsingin käräjäoikeudessa.
      </p>
    </div>
  );
};

export default TermsOfService;
