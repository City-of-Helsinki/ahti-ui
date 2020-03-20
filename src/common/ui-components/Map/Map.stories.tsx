// @ts-ignore

import React from 'react';

import Map from './Map';

export default {
  title: 'Map',
  component: Map
};

export const MapComponent = () => {
  const mapFeatures = [
    {
      type: 'Feature',
      properties: {
        fi: {
          name: 'Isosaaren vierasvenesatama',
          header: 'Päivä- ja yöpaikkoja yksityisveneille',
          description:
            'Isosaareen pääsataman ja laguunin vierasvenepaikoilla on tällä hetkellä vierasvenepaikat noin 35 yksityiskäytössä olevalle retki- ja matkaveneelle. Paikat ovat pääasiassa peräpoijupaikkoja, mutta jonkin verran on myös kylkikiinnitystilaa. Isosaareen ei voi varata venepaikkoja etukäteen, joten suosittelemme maksua vasta satamaan saapumisen yhteydessä. Muistathan maksaa satamamaksusi ennen laiturialueelta poistumista!',
          free_text_1: 'Päiväpaikka 10 €',
          free_text_2: 'Yöpaikka alk. 25 €'
        },
        en: {
          name: 'Isosaari guest harbour',
          header: 'Day and overnight parking for private boats',
          description:
            'Approx 35 slots for private boats. No reservations. Please remember to pay parking before leaving the harbour.',
          free_text_1: 'Day parking 10 €',
          free_text_2: 'Overnight parking from 25 €'
        },
        website: 'https://visitisosaari.fi/vierasvenesatama/',
        phone_number: '+358 600 390 111',
        address: 'Isosaari,  00860 Helsinki',
        imageId: '10',
        type: 'visitor'
      },
      geometry: {
        type: 'Point',
        coordinates: [25.061657, 60.105354]
      }
    },
    {
      type: 'Feature',
      properties: {
        fi: {
          name: 'Katajanokan vierasvenesatama',
          header: 'Paikkoja suurillekin veneille Helsingin keskustassa',
          description:
            'Helsingin ydinkeskustassa voi omalla veneellä liikkuva rantautua Katajanokan vierassatamaan (noin 100 paikkaa), aivan Kauppatorin ja palvelujen lähettyville. (paikkojen leveys 2,5 m - 3 m), valaistus, sähkö, vesi, jäte, lukittu laituriportti, jollaluiska',
          free_text_1: 'Poijupaikka alk. 32 €',
          free_text_2: 'Premium-paikka alk. 55€'
        },
        en: {
          name: 'Katajanokka guest harbour',
          header: 'Spots for even large boats in the Helsinki city centre',
          description:
            'Katajanokka guest harbour in Helsinki city centre has capacity for 100 boats with quality services.',
          free_text_1: 'Buoy parking from 32€',
          free_text_2: 'Premium parking from 55€'
        },
        website: 'http://www.helsinkimarina.fi/homepage/prices.php',
        phone_number: '+358 40 3342050',
        address: 'Kanavaranta 4, 00160 Helsinki',
        imageId: '10',
        type: 'visitor'
      },
      geometry: {
        type: 'Point',
        coordinates: [24.96347, 60.16929]
      }
    },
    {
      type: 'Feature',
      properties: {
        fi: {
          name: 'Suomenlinnan vierasvenesatama',
          header: '',
          description:
            'Suosittu Suomenlinnan vierassatama tarjoaa veneilijöille upeat puitteet historiallisen merilinnoituksen suojissa. Satamaisäntä ohjaa veneet paikoilleen ja opastaa käytännön asioissa. Vanhaan ammusvalimoon kunnostetuissa tiloissa sijaitsee satamaravintola ja samasta rakennuksesta löytyvät kaikki sataman palvelut.',
          free_text_1: '4h alk. 6 €',
          free_text_2: '24h alk. 24 €'
        },
        en: {
          name: 'Suomenlinna guest harbour',
          header: '',
          description:
            'Parking in the magnificent surroundings of Suomenlinna sea fortress with ferry connections to Helsinki city centre.',
          free_text_1: '4h from 6 €',
          free_text_2: '24h from 24 €'
        },
        website: 'http://www.valimo.org/vierassatama/',
        phone_number: '+358 41 510 1060',
        address: 'Suomenlinnan Varvilahti, 00190 Helsini',
        imageId: '10',
        type: 'visitor'
      },
      geometry: {
        type: 'Point',
        coordinates: [24.98228, 60.14624]
      }
    },
    {
      type: 'Feature',
      properties: {
        fi: {
          name: 'Valkosaaren vierasvenesatama (NJK)',
          header:
            'Vierasvenepaikkoja huvilasaarella Helsingin keskustan edustalla',
          description:
            'Saarella on 125 laituripaikkaa, seuran jäsenille 75 paikkaa ja loput vieraileville pursille.',
          free_text_1: 'Satamamaksu alk. 35 €',
          free_text_2: 'Kylkikiinnitys 65 €'
        },
        en: {
          name: 'Valkosaari guest harbour (NJK)',
          header:
            'Guest parking on a villa island just outside Helsinki city centre',
          description:
            'The Valkosaari island just outside Helsinki city centre hosts 50 spots for visitors.',
          free_text_1: 'Parking from 35 €',
          free_text_2: 'Longside from 65 €'
        },
        website: 'http://www.njk.fi/vierassatama/',
        phone_number: '+358 9 636 047',
        address: 'Valkosaari, 00140 Helsinki',
        imageId: '10',
        type: 'visitor'
      },
      geometry: {
        type: 'Point',
        coordinates: [24.964687, 60.160988]
      }
    },
    {
      type: 'Feature',
      properties: {
        fi: {
          name: 'Liuskasaaren vierasvenesatama (HSS)',
          header: 'Täyden palvelun vierasvenesatama Kaivopuiston edustalla',
          description:
            'HSS tarjoaa täyden palvelun vierasvenesataman koko kesäkauden ajan kotisatamassaan Liuskaluodolla. Vieraspaikat ovat betonilaiturilla poijukiinnityksellä. Kaikkiin vieraspaikkoihin tulee vettä ja maasähköä.',
          free_text_1: 'Päiväpaikka 15 €',
          free_text_2: 'Vuorokausipaikka 35 €'
        },
        en: {
          name: 'Liuskasaari guest harbour (HSS)',
          header:
            'Full-service guest harbour just outside Kaivopuisto in central Helsinki.',
          description:
            'HSS offers a full-service guest parking on a small island next to Helsinki city centre.',
          free_text_1: 'Day parking 15 €',
          free_text_2: 'Overnight parking 35 €'
        },
        website: 'http://helsinkisailing.com/satama/',
        phone_number: '+358 9 633 637',
        address: 'Liuskasaari, 00140 Helsinki',
        imageId: '10',
        type: 'visitor'
      },
      geometry: {
        type: 'Point',
        coordinates: [24.948694, 60.15158]
      }
    },
    {
      type: 'Feature',
      properties: {
        fi: {
          name: 'Tervasaaren vierasvenesatama (HMVK)',
          header:
            'Ympärivuotinen vierasvenesatama Tervasaaressa Kruununhaan edustalla',
          description:
            'Yli 30 ympärivuotista vierasvenepaikkaa Helsingin keskustassa.',
          free_text_1: 'Vuorokausi alk. 20 €',
          free_text_2: 'Auki vuoden ympäri'
        },
        en: {
          name: 'Tervasaari guest harbour (HMVK)',
          header: 'Guest parking outside Kruununhaka in Helsinki city centre',
          description:
            'Over 30 visitor spots within walking distance from Helsinki city centre. Open around the year.',
          free_text_1: 'Overnight parking from 20 €',
          free_text_2: 'Open around the year'
        },
        website: 'http://marina.hmvk.fi/vierasvenepaikat-berth-reservations/',
        phone_number: '+358 40 508 8344',
        address: 'Tervasaarenkannas 1, 00170 Helsinki',
        imageId: '10',
        type: 'visitor'
      },
      geometry: {
        type: 'Point',
        coordinates: [24.965073, 60.173992]
      }
    },
    {
      type: 'Feature',
      properties: {
        fi: {
          name: 'Finfly - Vetovarjo',
          header: 'Koe unohtumattomia elämyksiä vetovarjolla',
          description:
            'Vetovarjo on pyöreä nousuvarjo, jota voidaan vetää muun muassa veneen perässä. Varjo nostaa käyttäjän liitämään 60-140 metrin korkeuteen taivaalle ja antaa hänen nauttia vauhdista ja ihastella maisemia ilmasta käsin. Finfly haluaa antaa asiakkailleen ainutlaatuisia merielämyksiä vetovarjoilun parissa. Ensimmäisenä Suomessa tarjoamme mahdollisuuden päästä lentämään vetovarjolla meren päälle Helsingin edustan upeisiin merimaisemiin. Vetovarjoilu sopii kaikenikäisille ja on hieno tapa irtautua arjesta. Se on mainio aktiviteetti niin yrityksen virkistyspäivään, lapsiperheen viikonloppuun kuin kaveriporukan ajanviettoonkin.',
          free_text_1: 'Helppoa ja turvallista',
          free_text_2: 'info@finfly.fi'
        },
        en: {
          name: 'Finfly - Parasailing',
          header: 'Unforgettable Parasailing experience',
          description: '<missing>',
          free_text_1: 'Easy and safe',
          free_text_2: 'info@finfly.fi'
        },
        website: 'https://www.finfly.fi',
        phone_number: '040 662 6330',
        address: 'Mustikkamaantie 2, 00570 Helsinki',
        type: 'experience',
        tag: ['Parasailing', 'vetovarjoilu'],
        imageId: '12'
      },
      geometry: {
        type: 'Point',
        coordinates: [24.998547434806824, 60.18190936231506]
      }
    }
  ];

  // @ts-ignore
  return <Map features={mapFeatures} />;
};

MapComponent.story = {
  name: 'Map'
};
