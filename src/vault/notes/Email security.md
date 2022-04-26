---
date: 2021-04-08
draft: true
title: Email security
tags: [email, security]
status: seedling
---

Last night I read that [Facebook security had been breached](https://www.howtogeek.com/722194/everything-you-need-to-know-about-the-facebook-data-breach/) and that over 533 million users had been affected. The data leak includes full name, phone number, locations, birthday, email address, relationship status, etc.


So I decided (at 1am, always the best time for involved technical decisions) to check and upgrade my [[Securing Facebook | Facebook security]]. The security settings offer to send encrypted emails out[^fn-broken], which got me thinking a bit more about **email security**[^fn-passwords].

[^fn-passwords]: And thence into [[Using a password manager| password security]].

[^fn-broken]: However, I haven't been able to get this working, and other users have reported similar problems – the form doesn't accept my public key as valid :-(



## What's the point?
- I want to write messages that can't be read by others in transit
- I want to know that the emails I receive are really from their senders
- I don't want [gmail parsing my content](https://easydns.com/blog/2019/06/03/googles-gmail-scans-parses-analyzes-and-catalogs-your-email/) for advertising or other purposes[^fn-gscan]



[^fn-gscan]: I also found an article that suggested (as of 2017) that [_consumer gmail content will not be used or scanned for ads_](https://www.zdnet.com/article/google-will-stop-scanning-gmail-content-for-ad-targeting/). I don't know whether I believe that statement, or whether google are simply scanning for other equally monetisable purposes.


## What is it?
There are 3 types of security available in sending and receiving emails:



### 1. Email transport protocol
When we shop online, the browser encryptes our payment details using SSL so that no-one can steal them by snooping. There is a similar protocol available for sending emails to and from the mail server which encrypts the mail as it travels from your computer to the server.

However, the mail server itself has the keys to decrypt the message once it arrives at the server which means it only offers momentary security. Imagine, for example, I want to send you an email. I write the email on my computer, and then it is encrypted as it travels from my computer to my mail server. Thence it is sent to your mail server where it waits to be sent to your computer when you open it. By using a secure transport protocol I am only controlling the first part of the journey. From my mail server to yours, or from yours to your computer may all be unsecured.



### 2. End-to-end encryption
[In this method](/notes/end-to-end-encryption/) email is encrypted by the sender so that it can only be opened by the intended recipient. In this case, it cannot be decrypted on the mail server because the recipient's identity has been tied into the encryption process. It will remain encrypted wherever it goes, until the recipient uses their key to open it.



### 3. Digital signatures
[[Email digital signatures | A digital signature]] in this case does not refer to the visible signature some people like to add at the bottom of their emails. Rather, it is a way of using encryption to ensure that the sender's identity is verified and that the email content has not changed since they sent it. If it is changed en-route, the digital signature will no longer work, highlighting that the message has changed. the existance of an invalid digital signature alone does not prevent you reading the email, but it warns you that the email has not been sent by its apparent sender.





## How does it work?
Both end-to-end encryption and digital signatures use [[Cryptographic keys | public key encryption]], also known as asymmetric encryption. This method requires that each user have a private and a public key. These two keys verify each other, but only the public key is shared around. So, when I verify an email from you using my copy of your public key, it will prove that the email was encrypted with your private key, which verifies that it came from you.



## Why do it?

The vast majority of us rely upon large service providers to ensure our security, without fully understanding what security measures they are taking. Gmail will use secure transport protocols, but does not encrypt the emails because they want access to the email contents.

Larger businesses that want to keep their discussions and plans confidential will likely have considered how to encrypt their emails, but this potentially time-consuming and complex process breaks down when we get to smaller companies and individuals.

We should decide that it's time to take these responsibilities upon ourselves: just as we look after our wallets and we lock the front door when leaving the house.

**By failing to secure our online lives we are leaving our bank accounts and front doors wide open**. People can walk in and take our money. Worse, they can steal our identities[^fn-idtheft], and that is far, far harder to rectify.

[^fn-idtheft]: [Action Fraud](https://www.actionfraud.police.uk/a-z-of-fraud/identity-fraud-and-identity-theft), the UK's national cyber crime reporting centre, lists examples of criminal activity that starts with identity theft: opening bank accounts; obtaining credit cards, loans, and benefits in your name; taking over your existing accounts; obtaining passports and driving licences in your name. The first thing you may know about it is when companies try to collect debts that aren't yours, and then the onus is on you to prove that it wasn't you.


