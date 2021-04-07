---
type: note
title: Twitter browser extension
status: queued
tags: ["note", "twitter", "browser extension"]
---

I don't remember quite how, but I came across [this tweet announcing a beta browser extension](https://twitter.com/round/status/1138244047540228100). It promised a useful Chrome extension that looks sites up on Twitter to see if they've been mentioned.

- [[Using a password manager]]
- [[Setting up Jekyll with Obsidian]]
- [[Facebook breach]]

But I use Firefox.

The project repository seemed simple enough, so I decided to take the project on.

## Manners first
I tweeted the original author to say I'd cloned his repository, and then downloaded and built it.

## Test first
I fired up the Chrome browser, installed the extension and saw it work. I then saw it fail in Firefox.

## Where to start?
With [MDN's Web Extensions docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions) open, I updated the project files so that it worked in Firefox, thinking to create a Firefox extension whilst the original author had the Chrome version.

## What changed?
Short answer: very little. Having said that, the manifest.json format is slightly different for each browser, they have different top-level objects (`browser` in Firefox, `chrome` in Chrome), and certain API calls that return Promises in Firefox require callbacks in Chrome.

## Second thoughts
Now I have a working Firefox extension, and [Maxim Leyzerovich](https://twitter.com/round) has a working Chrome extension. Both in *beta*. That means two codebases in two projects for a single piece of functionality. Surely this could be re-written to be a single project spitting out two extensions?

## Cross-browser extension: first run
I decided to lean on some other wisdom, and took a look at how the [Treeverse extension](https://github.com/houshuang/Treeverse) handles cross-browser coding.

## Change only one thing at a time
Treeverse is a typescript project. That means it uses webpack to transpile to Javascript. That means it builds on top of various Node libraries. Time to go node!

## First things first
Having downloaded the project I ran `yarn` and there was my first problem: I had Node v.14.15.4 installed globally, and the project did not like that. 

## NVM to the rescue
Thankfully I had installed NVM a while ago, which allows me to specify different Node versions for different projects. I dropped an .nvmrc file in the project and that set the Node version to v12.19.0. Calling `yarn` set up the project fine this time.

## Test project as is
After a lot of unsuccessful fiddling about, I dropped the Treeverse code into the project and sidelined the Twitter-links code. The Treeverse code needed some packages added to `package.json` in order for the build scripts to run, and then it was good in both browsers.

## Typescript is not my friend
The Treeverse project has keeps a minimum of browser-specific code separate, and draws in common code to built each extension. This is great, but it's all Typescript, and that gives me vertigo at the moment. It's very much on my list to learn, but not today.

## Back to Javascript
By ditching the Typescript, I was able to ditch `webpack` for transpiling too. There are so few lines of code in this extension that modularising it is not worth the effort. Really.

## De-NPM-ing
Well, once the project is this small, it makes precious little sense for the supporting packages to hang around. Yes, I could lint the files. I could. Yes, I could modularise the common lines out into a separate shared file. Yes, I could build out separate manifest.json files. But really? Not worth it.
I removed the Typescript packages from package.json. Then webpack. Then everything else. Then I went back to shell scripts and could remove the final dev-dependency, `npm-run-all`.
