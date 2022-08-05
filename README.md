<p align="center">
    <img src="resources/img/logo.png">
</p>
<div align="center">
  <h1 align="center">Kaaper</h1>
  <p align="center">
    <a href="https://discord.gg/onlydust">
        <img src="https://img.shields.io/badge/Discord-6666FF?style=for-the-badge&logo=discord&logoColor=white">
    </a>
    <a href="https://twitter.com/intent/follow?screen_name=onlydust_xyz">
        <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white">
    </a>
    <a href="https://contributions.onlydust.xyz/">
        <img src="https://img.shields.io/badge/Contribute-6A1B9A?style=for-the-badge&logo=notion&logoColor=white">
    </a>
  </p>
  
  <h3 align="center">Documentation generator for Cairo projects.</h3>
</div>

> ## ⚠️ WARNING! ⚠️
>
> This repo contains highly experimental code.
> Expect rapid iteration.

## 🎟️ Description

Kaaper is a tool to generate documentation for Cairo projects.

## 🎗️ Prerequisites
[Node JS](https://nodejs.org/), preferably 16.xx  
[Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)


## 📦 CLI Installation
Navigate to CLI directory
```
cd cli
```

Then you can use any commands defined abbove

```
yarn
yarn install
```

## 🔬 Usage
Install CLI Locally
```
npm run create
npm run local
```

To see available commands
```
kaaper
```

## Generate docs
```
kaaper generate <rootdir> <outdir>
```

Generate docs (comment only)
```
kaaper generate --comment <rootdir> <outdir>
```

## Check comment compliancy
```
kaaper check-compliance <rootdir>
```

## 🌡️ Testing
```
yarn test
```

## 📦 VSCode Extension Installation
The extension is not on the marketplace yet, so the only way to use it is by building it from source. Dont forget to open up the vscode on this directory.

Open vscode-extension directory
```
code vscode
```

```
yarn
yarn install
```

- Press Ctrl+Shift+B to start compiling the client and server in [watch mode](https://code.visualstudio.com/docs/editor/tasks#:~:text=The%20first%20entry%20executes,the%20HelloWorld.js%20file.).
- Switch to the Run and Debug View in the Sidebar (Ctrl+Shift+D).
- Select `Launch Client` from the drop down (if it is not already).
- Press ▷ to run the launch config (F5).
- If you want to debug the server as well, use the launch configuration `Attach to Server`
- In the [Extension Development Host](https://code.visualstudio.com/api/get-started/your-first-extension#:~:text=Then%2C%20inside%20the%20editor%2C%20press%20F5.%20This%20will%20compile%20and%20run%20the%20extension%20in%20a%20new%20Extension%20Development%20Host%20window.) instance of VSCode, open a document in 'plain text' language mode.
  - Type `j` or `t` to see `Javascript` and `TypeScript` completion.
  - Enter text content such as `AAA aaa BBB`. The extension will emit diagnostics for all words in all-uppercase.



## 🫶 Contributing

## 📄 License

**kaaper** is released under the [MIT](LICENSE).

## ❓ Reference 

Kaaper, also commonly known as Sheikh el-Beled, was an ancient Egyptian scribe and priest who lived between the late 4th Dynasty and the early 5th Dynasty (around 2500 BCE).

The job of a scribe was to record in writing the everyday life and extraordinary happenings in ancient Egypt.

A documentation generator has pretty much the same duties as a scribe, right?
