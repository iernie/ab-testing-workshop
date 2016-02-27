# ab-testing-workshop

## Installasjon
1. Klon repo lokalt på din maskin og `cd` inn i mappen
2. Kjør `npm install`
3. Lag en gratis [heroku](https://www.heroku.com/) konto hvis du ikke har en
4. Last ned [heroku toolbelt](https://toolbelt.heroku.com) til ditt operativsystem og installer denne
5. Kjør `heroku login` og logg inn i kontoen du lagde eller hadde
6. Kjør `heroku create` for å lage en enkel nettside på heroku
7. Publiser nettsiden med `git push heroku master` og `heroku ps:scale web=1`
8. Åpne nettsiden med `heroku open`

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
*Med Google Tag Manager kan vi A/B teste deler av en side uten å gjøre endringer på siden.*
