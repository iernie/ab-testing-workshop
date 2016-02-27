# ab-testing-workshop

## Installasjon
1. Klon repo lokalt på din maskin og `cd` inn i mappen
2. Kjør `npm install`
3. Lag en gratis [heroku](https://www.heroku.com/) konto hvis du ikke har en
4. Last ned [heroku toolbelt](https://toolbelt.heroku.com) til ditt operativsystem og installer denne
5. Kjør `heroku login` og login i kontoen du lagde eller hadde
6. Kjør `heroku create` for å lage en enkel nettside på heroku
7. Publiser nettsiden med `git push heroku master` og `heroku ps:scale web=1`
8. Åpne nettsiden med `heroku open`

**Note**
Hver gang du vil oppdatere nettsiden er det bare å `git commit` endringene og kjøre `git push heroku master` for å pushe endringene til heroku.

**Note**
Vil du kjøre nettsiden lokalt kan du gjøre dette med `npm start`. Den vil ta kjøre på [localhost:3000](http://localhost:3000).

## Oppgave 1: A/B testing i Google Analytics
Med Google Analytics kan vi A/B teste hele sider og kjøre såkalte experiments for å finne ut av hvilken side som yter best.

## Oppgave 2: A/B testing i Google Tag Manager
