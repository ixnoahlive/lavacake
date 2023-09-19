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

## Introduction
Lavacake is a Hypixel API webserver that's built on [Bun](https://bun.sh/), making it *lightning-fast*! Lavacake also wraps parts of the API, removing most of the junk & doing the math for you!

If you want to open a feature request or work on a feature, check out our [issues](/issues) and [pull requests](/pulls)!

|    | Feature         
|----|-----------------
| ✅ | Basic Player Info
| ✅ | Rank Formatting
| ✅ | Housing Wrapping
| 🛠️ | Level Calculations

## Installation
This installation guide is intended for Linux servers. There may be small differences or incompatibility issues for macOs and Windows.

First, install Bun using this command. Or check out [their website](https://bun.sh/)!
```bash
curl -fsSL https://bun.sh/install | bash
```

Now, get the latest release from the releases tab or copy of the codebase through <kbd><> Code</kbd>.

Unzip it wherever, then open your command line. Navigate into the folder and run this commands to get all packages:
```bash
bun install
```

Create a new folder called `token.json`. Here you will paste your tokens! If you don't have an application token or developer token, they can be obtained at [the Hypixel developer portal](https://developer.hypixel.net/). These will then be pasted in their respective values. Set the active token to either `devToken` or `appToken` for which token to use.
```json
{
    "devToken":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "appToken":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "active":"devToken"
}
```

We recommend hosting it on a screen or tmux session. You can then type the following command to get it all running! 
The app will start on Port 9753

```bash
bun index.ts
```

## Data Sample
Unavailable