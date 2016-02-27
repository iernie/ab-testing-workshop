# ab-testing-workshop

## Installasjon
1. Last ned og installer [node](https://nodejs.org/) hvis du ikke har det fra før av
2. Klon repo lokalt på din maskin og `cd` inn i mappen
3. Kjør `npm install`
4. Lag en gratis [heroku](https://www.heroku.com/) konto hvis du ikke har en
5. Last ned [heroku toolbelt](https://toolbelt.heroku.com) til ditt operativsystem og installer denne
6. Kjør `heroku login` og logg inn i kontoen du lagde eller hadde
7. Kjør `heroku create` for å lage en enkel nettside på heroku
8. Publiser nettsiden med `git push heroku master` og `heroku ps:scale web=1`
9. Åpne nettsiden med `heroku open`

**Note**
Hver gang du vil oppdatere nettsiden er det bare å `git commit` endringene og kjøre `git push heroku master` for å pushe endringene til heroku.

**Note**
Vil du kjøre nettsiden lokalt kan du gjøre dette med `npm start`. Den vil da kjøre på [localhost:3000](http://localhost:3000).

## Oppgave 1: A/B testing i Google Analytics
*Med Google Analytics kan vi A/B teste hele sider og kjøre såkalte experiments for å finne ut av hvilken side som yter best.*

1. Logg inn i din [Google Analytics](https://analytics.google.com/) konto
2. Lag en ny account hvis du ikke har en passende
3. Lag en ny property. Skriv inn `Free Money` som navn og URLen du fikk fra heroku. Pass på at du velger `https://` foran URLen.
4. HTML-snutten du får må du legge til i nettsiden. Dette kan du gjøre i filen `views/layout.hbs`. Legg snutten rett før `</head>`-taggen.

**Note**
Husk å pushe endringene til heroku.

Før vi kan lage ett eksperiment trenger vi å definere en goal.

1. Gå inn i Goals i [Google Analytics](https://analytics.google.com/) under Admin og trykk `New Goal`
2. Under `Goal setup` velg `template`
3. Under `Goal description`, gi den navnet `Form submitted` og velg type `Destionation`
4. Under `Goal details` velg `Begins with` under `Destionation` og skriv `/thanks` i feltet. Hak av for `Value` og skriv inn en verdi. Dette ville i realiteten vært ferdien av at noen fullfører det du er ute etter å teste.
5. Trykk `Save`

Nå som vi har en goal kan vi lage ett eksperiment. Nettsiden har to forskjellige views som finnes på `/` og `/variant`. Begge nettsidene ender opp på siden `/thanks`, det er derfor vi valgte denne som destination på goalen og det er disse to sidene vi skal teste mot hverandre nå.

1. Gå inn til Reporting i [Google Analytics](https://analytics.google.com/)
2. I sidemenyen finner du Experiments under Behaviour. Gå inn her og velg `Create experiment`
3. Gi den navnet `AB Test` og velg `Form submitted` goalen du lagde under `Objective for this experiment`. Her kan du under Advanced også velge andre ting som lengden på eksperimentet og om trafikken skal sendes jevnt til alle variantene.
4. På neste steg, skriv inn URLen du har fra heroku under `Original` (husk `https://`) og under `Variation 1` legg til `/variant` etter URLen. Her kan du legge til enda flere variants skulle du ha det.
5. I neste steg kommer du til å få en ny HTML-snutt. Denne er det viktig at du bare legger til `Original` siden din rett etter `<head>`-taggen. Jeg har gjort dette enkelt for deg. Gå til `views/partials/one.hbs` og legg snutten i mellom `{{#contentFor "pageScripts"}} {{/contentFor}}`-blokkene. Da vil denne snutten kun dukke opp på originalsiden og ingen av de andre. Husk å pushe endringene til heroku før du går videre.
6. Siste steg validerer at den finner snuttene på nettsiden og du kan trykke `Start Experiment`

Nå kjører eksperimentet og du vil se resultatet etter den angitte tiden du valgte eksperimentet skulle kjøre. Dessverre kan man ikke se noe før først neste dag. Du kan derimot teste at det fungerer ved å gå inn på siden i Inkognito-vindu. Åpne ett nytt vindu hver gang og man burde fra tid til annen komme inn på den andre varianten. Du kan også fullføre formen ved å favorisere enn av variantene og du vil kunne se dette etterpå i eksperimentet. Du kan også få litt live feedback ved å gå til Conversions under Real-Time og trykke på goalen du lagde. Her vil du live se når folk er inne og hvilken variant de brukte.

## Oppgave 2: A/B testing i Google Tag Manager
*Med Google Tag Manager kan vi A/B teste deler av en side uten å gjøre endringer i kildekoden.*

1. Slett Google Analytics-snutten fra `views/layout.hbs` og experiments-snutten fra `views/partials/one.hbs` som ble lagt til i oppgave 1.
2. Logg inn i din [Google Tag Manager](https://tagmanager.google.com/) konto
3. Lag en account hvis du ikke har en passende
4. Lag en container. Gi den URLen fra heroku som navn og typen `Web`
5. Du kommer til å få en HTML-snutt. Legg den til i `views/layout.hbs` rett etter `<body>`-taggen. Dette er den eneste endringen du må gjøre i selve kildekoden heretter. Husk å pushe endringen til heroku.

Før vi kan sette opp A/B testen må vi opprette noen variabler i Google Tag Manager.

1. Gå til Variables
2. Hak av alle under Clicks samt `Random Number` under Utilities
3. Vi trenger også en cookie som skal lagre hvilken variant brukeren er på. Trykk på `New` under User-Defined Variables
4. Gi variabelen navnet `Cookie`
5. Velg `1st Party Cookie` som type
6. Sett `variant` under Cookie name
7. Trykk  `Save Variable`

Vi trenger også en trigger som skal sende ett event til Google Analytics

1. Gå til Triggers og trykk på `New`
2. Gi den navnet `submitButton Clicked`
3. Velg typen `Click`
4. Velg `All Elements` under Targets
5. Under Fire On velg `Click ID > equals > submitButton`

Denne vil da kun trigges når en lenke med IDen `submitButton` blir trykket. Nå på tide å lage en variant av siden.

1. Gå til Tags og trykk på `New`
2. Velg `Custom HTML Tag` som Product
3. Under neste steg kopier og lim inn snutten nedenfor
4. Under Fire On velg `All Pages`

```
<script>
  var submitButton = document.getElementById("submitButton");
  var original = "original";
  var variant = "variant";

  var selected = original;

  function setVariant() {
    submitButton.className += " big-button";
    return variant;
  }

  function setCookie() {
    var d = new Date();
    d.setTime(d.getTime() + 1000 * 60 * 60 * 24 * 730);
    var expires = "expires=" + d.toGMTString();
    document.cookie = "variant=" + selected + "; " + expires + "; path=/";
  }

  if (submitButton) {
    if (!{{Cookie}}) {
      if ({{Random Number}} < 1073741824) {
        selected = setVariant();
      }
      setCookie();
    } else if ({{Cookie}} === variant) {
      selected = setVariant();
    }
  }
</script>
```

Det dette skriptet gjør er å finne knappen med id `submitButton`. Hvis knappen finnes sjekker den om det finnes en `Cookie` som er satt. Hvis ikke, velges det 50/50 sjanse om man får originalsiden eller variantsiden. Det er det vi trengte `Random Number` til. Så settes det en cookie med hvilken variant man er på. Skulle man gå inn i siden igjen får man samme variant. Varianten i dette tilfellet legger til classen `.big-button` til knappen.

Nå trenger vi bare sende resultatet til Google Analytics.

1. Lag en ny tag og gi den navnet `AB Test`
2. Velg `Google Analytics` under Products
3. Velg `Universal Analytics` under Tag type
4. Under `Tracking ID` legg til IDen du lagde i Google Analytics
5. Track type er `Event` med Category og Action henholdsvis `submit-form` og `{{Cookie}}`. Her er Category navnet vi kategoriserer eventene under. Action er varianten vi er på som vi får fra `Cookie` variabelen vi lagde. Du finner den ved å trykke på knappen ved siden av inputfeltet. Alternativt kunne du lagt til enda mer informasjon i eventet som blir sendt under Label og Value.
6. Under Fire On velg `Click` og velg `submitButton Clicked` triggeren du lagde tidligere.

Nå er det bare å trykke `Publish` for å få endringene ut på nettsiden. Du kan sjekke at den fungerer ved å åpne siden ett Inkognito-vindu. Før eller siden burde du få en stor rosa knapp i stedet for den lille svarte. Du kan trykke på knappen og velge om du vil favorisere enn av variantene.

Går du tilbake til Google Analytics nå under Real-Time Events burde du se `submit-form` kategorien du lagde. Trykker du deg inn på den kan du se både hvor mange av eventene som er av hver variant og hvilken som er mest brukt.
