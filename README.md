<div align="center">
    <img src="https://img.shields.io/badge/made%20for-bun-peru">
    <img src="https://img.shields.io/badge/license-Apache_2.0-blue">
    <img src="https://img.shields.io/github/stars/NoahTheNerd/lavacake">
    <br/><br/>
    <img src="https://cdn.discordapp.com/attachments/1071274344019398748/1153760402799349760/lavacake.png" height="100">
    <br/>
    <b>Lavacake</b><br>
    <i>A freshly baked Hypixel webserver!</i>
</div>

## 🍰 Introduction
Lavacake is an easily deployable Hypixel API webserver, so you can rest easy knowing you
- **It's fast!** Lavacake runs on Bun, making it lightning fast for users & developers alike.
- **It's clean!** Lavacake cleans up the Hypixel API, adding more wrapping & removing the [junk.](#-faq)
- **Very tasty!** Every instance of Lavacake is guaranteed to taste good. Make sure to enjoy!

Looking for something with a broken scrollwheel? Check these links out to quickly jump:

- [Installation Guide](#-installation)
- [Contributing](#-contributing)
- [FAQ](#-faq)

## 🗺️ Roadmap
|  ?  | Feature                |
| --- | ---------------------- |
| ✅ | Network XP Wrapping
| ✅ | Housing Wrapping
| ⌛ | Bed Wars Wrapping
| ⌛ | SkyWars Wrapping
| ⌛ | Pit Wrapping

## 💖 Contributing
Contributing is simple, make a fork & merge it when you're done. We do request you to please run `bun run pretty` to format your code to be in line with our style guidelines.

- [Open a pull request](/pulls)
- [Make a fork](/fork)

## 📦 Installation
This installation guide is intended for Linux servers as they are most common and also the best place performance-wise for Lavacake. There may be incompatibility issues for macOS and Windows.

### Prerequisites
Lavacake is best run through a reverse proxy (such as NGINX) software, this is due to the extra headers provided by said software allowing ratelimits to work. Of course, a reverse proxy is **not required**. See the second link for disabling user ratelimits.

You also need Bun, Lavacake **cannot** be used with Node.js & uses native Bun features! Installing Bun only takes 10 seconds, so make sure to get it installed!

- [👉 Install Bun](https://bun.sh/)
- [Installing NGINX](https://ubuntu.com/tutorials/install-and-configure-nginx)
- [Configuring Lavacake](#configuring-lavacake)

### Installing Lavacake
You can either grab the latest release of Lavacake from the [releases](/releases) tab, or get a copy of the codebase with the <kbd><> Code</kbd> button.

Navigate into Lavacake's directory using your command line. If you are using the same command line process as you did when installing Bun, you might have to restart the process or start a new process.

Once in the main directory containing the `package.json` file, run the following command to get all the packages:

```bash
bun install
```

You can start Lavacake using the following command, but first look at [configuring Lavacake](#configuring-lavacake).

```bash
bun start
```

### Configuring Lavacake
Lvacake has two configuration files, one containing your tokens & the other containing your config.

First, create a new file called `token.json` and paste in the following:

```json
{
    "devToken":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "appToken":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "active":"devToken"
}
```

These tokens should be replaced with your as seen on the [Hypixel Developer Portal](https://developer.hypixel.net/). You should request an Application Token, and then copy that token into the `appToken` field. If you do not have an approved application yet, use a developer token and paste in in the `devToken` field. You can change the `active` field to `devToken` or `appToken` for which token to use.

Now, please open config.json and we'll explain what all the funky values mean.

- **apiLimit**
    - reqAmount: The amount of requests you can handle in a certain time period. Please check the developer portal for these ratelimits.
    - timeSec: The time period of the reqAmount in seconds.
- **userRatelimit** (NGINX only)
    - reqAmount: The amount of requests a user may send before being ratelimited. This is to prevent malicious API scraping & spam requests.
    - expires: The time in seconds before a request is removed from the ratelimit.
    - enabled: Whether or not user ratelimiting is enabled. If you do not use NGINX, this should be set to false.
- **port**
    - The port to run Lavacake on, e.g. `9753`. Please check [this Wikipedia article](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers) for a list of port standards to prevent conflicts.

## ❓ FAQ
- What "junk" is being removed by Lavacake?
    - At the minute, we're looking at only implementing core statistics for games & wrapping what's most used (e.g. levels & coins). It might seem generic to say junk, but not enough people will be checking the Mega SkyWars Quit Count for it to be wrapped. If there's anything missing that you would like included in Lavacake you can open an [issue](/issues) at our issues page.
- How do I access the raw, unwrapped API data?
    - Just put "raw" before an endpoint name, e.g. player -> rawPlayer (camelCase)
