---
type: note
title: Setting up Jekyll with Obsidian
status: queued
tags: ["note"]
---



# Setting up Jekyll with Obsidian

This comes from a [request for help](https://community.nesslabs.com/c/digital-gardening/the-best-way-to-create-a-digital-garden#comment_wrapper_1353438) in the NessLab community.

Which in turn led to [Mike Tannenbaum's Obsidian Jekyll workflow](https://refinedmind.co/obsidian-jekyll-workflow). But before I can even review that, I have to follow the [steps provided by Max Vaillancourt](https://maximevaillancourt.com/blog/setting-up-your-own-digital-garden-with-jekyll) to set my computer up appropriately.

## Max: setting up your own digital garden with Jekyll

Max walks through installing required software, and then forking and cloning his template repository.

As I have previously worked with Jekyll, and therefore have the prerequisites installed, I jumped to stage 2 and forked his repo.

His instructions for cloning don't reflect the options available on the forked repo page (has github redesigned their layout?). It's a small thing because I know my way around github, but I imagine it's harder for an absolute beginner.

### 0. Prerequisites
- Ruby 3.0.0
- RubyGems
- Git

#### 1. Create a fork of the template repository

#### 2. Clone your repository locally
Max's route to clone the repository locally uses SSH, which I don't expect a beginner to have installed on their machine, especially if they're following his instructions (which don't mention it), so I cloned via HTTPS.

Attempting via SSH printed out an error message that included the statement `Permission denied (publickey)`. That's the giveaway: I don't have SSH keys connected to github.

I tried again with the HTTPS URL, and it worked fine, quickly downloading the project:

`git clone https://github.com/hoardinghopes/digital-garden-jekyll-template.git`

#### 3. Test out the site locally
`bundle` blew up :-(

It turns out that I have Ruby 2.5.1 installed, and that looks to be out of date for this project. Back to 0. Prerequisites!

#### 0. Prerequisites
I have installed and upgraded Ruby several times over the last 10 years, and I always look for a better/simpler way of doing it. This means that I have [installed by compiling it](https://www.ruby-lang.org/en/downloads/), [installed via RVM](https://rvm.io/), and used [HomeBrew](https://brew.sh/). But which is the latest version that I'm using?

With a bit of picking through shell scripts, I found that my latest version is provided by RVM, so I updated that way too.

It should be a simple `rvm install 3.0.0`, but reading through the splurge of output that followed, I realised that the process hadn't completed.

Once again I needed to update the Mac's `xcode` libraries: `xcode-select --install`. This opened a prompt and license agreement before installing. It was a large download - time for lunch *en famille*.

Once that had completed I ran `rvm install 3.0.0` again, which completed happily this time. So back to running the project scripts!

`bundle` started installing lots of packages before breaking on `eventMachine`, complaining of a lack of `openssl`. Now I *know* that I have openssl installed on my machine, so simple installation wasn't the answer.

[I asked the web](https://duckduckgo.com/?t=ffab&q=rvm+eventmachine+opensell+not+found) and got sent to [this page](https://izziswift.com/gem-eventmachine-fatal-error-openssl-ssl-h-file-not-found/). I chose solution #2.

```
bundle config build.eventmachine --with-cppflags=-I$(brew --prefix openssl)/include
```

This little command did its stuff silently, which I suppose is better than splurging errors, but I didn't really know whether it had worked, until I tried `bundle` again.

This time, `bundle` output lots of lines saying it had already installed most things, and then highlighted the new things it could install courtesy of my detour, starting with the `eventMachine` package.

Thereafter: `bundle exec jekyll serve` generated and served the project at [http://localhost:4000](http://localhost:4000).