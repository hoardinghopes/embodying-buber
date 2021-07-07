---
date: 2021-04-11
title: Multi-factor authentication
tags: [passwords, security, authentication]
status: seedling
---

## What is it?
Also known as MFA and two-factor authentication or 2FA, multi-factor authentication adds a second step to the login process, allowing a user to authenticate themselves with two or more pieces of evidence (factors). The evidence includes knowledge (something you know, like a password), possession (something you have, like a phone), and inherence (something you are, like a fingerprint).


![](/assets/2fa.jpg)

![](/assets/mfa.jpg)

## How does it work?
That depends. Some versions will send a confirmation link to an alterrnative email address; some will send you a code in a text; some will ask you to input a number randomly generated on your phone.

## Why should I use it?
Most hacking attempts throw possible passwords at the login form. With a second step that's off the computer (e.g. on your phone), you've made it much harder for the hacker.

Any website that stores your payment details should have MFA switched on. Sadly, there are still plenty of websites that don't offer it (when I think they should).

Accounts with banking details (e.g. Amazon, Paypal, online shops), social media accounts with lots of personal details, email providers (such as gmail and yahoo) should all offer MFA. If they do, I strongly recommend that you set it up.

## How do I access it?
This depends on the website you're wanting to add it to. Most offer MFA under account security.

## Can it be compromised?
Yes, it can be compromised, and some versions are more easily compromised than others. Let's see.

- If a hacker also has access to your email account, then the confirmation email can be seen by them.
- It is fairly easy to duplicate a SIM to pretend to be your phone (sim-swapping), so that the hacker receives the confirmation code in an SMS meant for you.

Because of this, security experts recommend using authenticator apps (such as Google Authenticator or LastPass Authenticator) to generate the random codes on your phone.
