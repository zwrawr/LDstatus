# LDstatus

## Gitter
[![Gitter](https://badges.gitter.im/LDstatus/Lobby.svg)](https://gitter.im/LDstatus/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Seen as this integrates with Gitter it makes sense that it has it's own Gitter chat.
I've been using it as a place to test the behaviour of this project, whilst it's being developed.
But your welcome to come and chat!

## Setup

### config.json
You need to create a config.json file in the root directory, this is where you will place your api tokens/keys.

I.E. config.json should be
```json
{
  "UPTIMEROBOT_TOKEN" : "<TOKEN_YOU_GENERATE_FOR_UPTIMEROBOT>",

  "GITTER_PAT_TOKEN" : "<YOUR_GITTER_BOTS_PERSONAL_ACCESS_TOKEN>",
}
```

Up time robot does not provide you with a token, i suggest using [](random.org).
I used them to generate a 16byte token via this [link](https://www.random.org/cgi-bin/randbyte?nbytes=32&format=h).

### uptime robot

#### Alert contact
To create a web hook from the uptime robot dashboard you need to go to the settings page, and add an alert contact.
An alert contact of type `webhook` is needed.

The url to notify needs to be to url to wherever your hosting your handler with a `?` on the end.
I'm using Google Cloud Functions, But Amazon AWS Lambda or another "Serverless" provider should work with a little tweaking.

The POST data should be
```json
{
  "provider":"uptimerobot",
  "token":"<TOKEN_YOU_GENERATE_FOR_UPTIMEROBOT>",
  "room":"<GIITER_ROOM/NAME>",
  "statuspageurl":"status.test.zakwest.tech"
}
```

statspageurl is an optional param.

#### Enabling the webhook for a monitorURL

To enable the web hook for a specific monitor, go it it's edit page and tick the box next to the name of your web hook.
