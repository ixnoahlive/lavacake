<div align="center">
    <img src="https://img.shields.io/badge/made%20for-bun-peru">
    <img src="https://img.shields.io/github/stars/NoahTheNerd/lavacake">
    <img src="https://img.shields.io/github/forks/NoahTheNerd/lavacake">
    <br/><br/>
    <img src="https://cdn.discordapp.com/attachments/1071274344019398748/1153760402799349760/lavacake.png" height="100">
    <br/>
    <b style="font-size: 1.5em">Lavacake</b><br>
    <i>A freshly baked Hypixel webserver!</i>
</div>

## 🍰 Introduction
Lavacake is a Hypixel API webserver that's built on [Bun](https://bun.sh/), making it *lightning-fast*! Lavacake also wraps parts of the API, removing most of the junk & doing the math for you!

If you want to open a feature request or work on a feature, check out our [issues](/issues) and [pull requests](/pulls)!

|     | Feature            |
|-----|--------------------|
| ✅   | Basic Player Info  |
| ✅   | Rank Formatting    |
| ✅   | Housing Wrapping   |
| 🛠️ | Level Calculations |

## 📦 Installation
This installation guide is intended for Linux servers as they are most common and also the best place performance-wise for Lavacake. There may be incompatibility issues for macOs and Windows.

### Prerequisites
Lavacake is best run through an NGINX-like software, this is due to the extra headers provided by said software allowing ratelimits to work. Of course, NGINX is **not required**. See the second link for disabling user ratelimits.

- [Installing NGINX](https://ubuntu.com/tutorials/install-and-configure-nginx)
- [Configuring Lavacake](#configuring-lavacake)

### Installing Bun
Lavacake uses native Bun functions, and **cannot be used with Node**. Thankfully, installing Bun is easy!
```bash
curl -fsSL https://bun.sh/install | bash
```
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
Bun has two configuration file, one containing your tokens & the other containing your config.

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

## 🧪 Data Sample
A sample of a Lavacake data object.

Currently unavailable.