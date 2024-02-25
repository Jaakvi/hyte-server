# Hyte servu

Node.js + Express

Start dev server: `npm run dev` / `npm start`

# API Endpoint Documentation

## Päivitä käyttäjän profiili

`PUT /api/users/`

Tämä reitti mahdollistaa käyttäjän profiilin päivityksen. Ainoastaan kirjautuneella käyttäjällä on oikeus päivittää omaa profiiliaan.

### Ehdot:

- Käyttäjän tulee olla kirjautunut sisään järjestelmään.
- Päivityspyyntöön on sisällytettävä kaikki tarvittavat kentät: `username`, `password` ja `email`.
- Päivityspyyntöön on sisällytettävä käyttäjän oma `user_id`, joka vastaa kirjautuneen käyttäjän tunnistetta (`req.user.user_id`).
- Päivitys suoritetaan ainoastaan, jos kaikki tarvittavat kentät ovat mukana ja `user_id` vastaa kirjautuneen käyttäjän tunnistetta.

## Poista kirjaus

`DELETE /api/entries/:entry_id`

Tämä reitti mahdollistaa kirjauksen poiston. Ainoastaan kirjautuneella käyttäjällä on oikeus poistaa oma kirjauksensa.

### Ehdot:

- Käyttäjän tulee olla kirjautunut sisään järjestelmään.
- Pyyntöön on sisällytettävä oikea kirjauksen `entry_id`.
- Poisto suoritetaan ainoastaan, jos pyynnön mukana toimitetun `entry_id`-arvo vastaa kirjautuneen käyttäjän omistaman kirjauksen tunnistetta.

## Hae kirjaukset

`GET /api/entries/`

Tämä reitti mahdollistaa kaikkien kirjauksien hakemisen. Ainoastaan kirjautuneella käyttäjällä on oikeus hakea omia kirjauksiaan.

### Ehdot:

- Käyttäjän tulee olla kirjautunut sisään järjestelmään.
- Vain kirjautuneen käyttäjän omat kirjaukset palautetaan pyynnön tuloksena.
