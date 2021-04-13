---
date: 2021-04-09
draft: true
title: Using a password manager
tags: ["note", "security", "password"]
---


## What is it?
A password manager is a (cloud-based) application that securely stores all your passwords in one place. It requires you to input a _master password_ to access the store. The application works with your browser, automatically filling in password fields in (login) forms. This means that you only need to remember the master password.

Most password managers also offer to generate long, complex passwords for you, as you will never need to remember them.

## How does it work?
The password manager sets up a password vault on your local machine, in which it encrypts all your passwords. Once encrypted, those passwords are also stored on the manager's servers so that you can access them from other devices.

However, your master password and the keys used to encrypt and decrypt the data are never sent to the manager's servers, so they can never access your passwords.

## What's the purpose?
A password manager will generate complex passwords for all your accounts, and keep them securely, prroducing them when you need to log in to the accounts. This alllows you to have long and different passwords for every single account.

## What actually happens?

## Why do it?

You use a password manager, right? Right?

If you don't, how on earth do you manage to remember your passwords?

I started using LastPass about 10 years ago, I think, just as the number of accounts I had started to get away from me. Once you know how to use it, it's a no-brainer.

I now remember one single password, which is my master-password[^fn-master] into LastPass. That means I don't know hundreds of my passwords. That, in turn, means I am free to make them long and totally unintelligable.

[^fn-master]: Apparently it will take around 5389762 years _and 2 months_ to crack my master password. [How long will it take to crack yours?](https://random-ize.com/how-long-to-hack-pass/)



The fact is that computers *will* break into our passwords, given enough time. As the computers become more powerful, they take less time, so their chances of cracking the passwords are higher. However [the longer the password, the exponentially harder it is to crack](https://kennymuli.medium.com/password-cracking-is-easy-heres-how-to-do-it-875806a1e42a).

[How easy is it to crack your password?](https://resources.infosecinstitute.com/topic/easy-hacker-crack-password/)

## Your password is only as good as it is secure(i)
Of course, if you leave your password on a post-it note stuck to your monitor, you have might as well have left your computer unlocked. Therefore, we are all told to make our password difficult to imagine (at the same time as making it easily memorable).

It gets harder if you work in an organisation that requires you to change your password every few months. The irony of this approach is that it tends to encourage users to create simpler passwords or to write them down.

## Your password is only as good as it is secure(ii)
Now we're talking about passwords for social media accounts and online shopping. I have to keep these safe at my end, and the online business has to keep my password safe at their end. And this points to something we all intuitively know: bad actors want to get into the online business' database of passwords, so that they have access to thousands or millions of passwords (which means user details), much more than they want to break into _your_ computer because of _you_.

Back in the early days of the internet, passwords could be stored in plain text format, that meant that if you could find the password, you could read it and use it as is. An extra level of security was brought in by _encrypting_ passwords, which meant that you might find the password _hash_ but that you couldn't use it because it wasn't the actual password.

Different encryption methods created different _hashes_, so you had to know (a) the encryption method and (b) the salt used to create it.

For example, if I encrypt my name (_James_) this is what I get with the different encryption methods:
- **plain text (i.e. no encryption)**: James
- **CRC-32**: c672c084
- **MD4**: 5e58c711525042313f5309b119ac34b7
- **MD5**: d52e32f3a96a64786814ae9b5279fbe5
- **SHA256**: 9345a35a6fdf174dff7219282a3ae4879790dbb785c70f6fff91e32fafd66eab
- **SHA512**: 123c86e1f2ac255ba31f1ad742defe23d194269669d2aac0d2572e20e9378e3
95976f84db305caeba1f91e7996463031d4c49365a7a9f4c7dc404873ad330974

Most of these different methods were responses to the easier methods being too easy to crack.

According to [this website](https://random-ize.com/how-long-to-hack-pass/), my plain text password would take less than one second to crack[^fn-1second]. That is how long it takes a random computer to work through all the possible combinations of letters, digits, and punctuation to find _James_ as a possible answer.

[^fn-1second]: Less than one second for a 5-letter English word with one capital letter. If I add a single letter (e.g. _Jamesk_) it takes 6 seconds. If I add two letters (e.g. _JamesKK_), it takes just over 6 minutes. If I add one letter and one number (e.g. _Jamesk1_) it takes over 20 minutes. _Jame$k1_ takes 6 hours, 20 minutes.

Now, if I use encryption to obfuscate my password, the computer has to decipher  32 characters (in the case of MD5) to represent my original 5-letter _James_, which apparently will take years.

## Passwords

- MD5, SHA250, (plain text) etc.

- Reverse engineering a hashed password (not really possible)



## Multi-factor security (MFA, 2FA)

- get yourself an app
- text messages to phones are not secure
- emails are not secure
- [[Multi factor authentication]]



## The future of passwords?

- [Zero login aka passive authentication](https://www.infosecurity-magazine.com/opinions/goodbye-passwords-authentication/)
- [Biometrics and possession authentication](https://www.itproportal.com/features/passwordless-authentication-the-future-is-here/)
- [Four reasons passwords are becoming a thing of the past](https://www.weforum.org/agenda/2020/01/4-reasons-passwords-are-becoming-a-thing-of-the-past/)
- [And for a really cyber read…](https://blogcd.com/future-of-password-security/)



