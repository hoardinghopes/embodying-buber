---
date: 2021-04-08
tags: [security, encryption, ee2e]
title: End to end encryption
status: seedling
---

## What is end-to-end encryption?
End-to-end encryption (ee2e) is a method of transmitting data where **only the sender and recipient can read the message**. The data is encrypted on the sender's system, and only the intended recipient is able to decrypt it. **Nobody in between can read or tamper with it**. I am interested in ee2e in relation to [[Email security | email security]].

## What isn't it?
When you set up an email account, you will often use `SSL/TLS` or `STARTTLS` to communicate with the mail server.

`SSL` is the security protocol that is used by shopping and payment websites. It encrypts the data transferred between your computer and the mail  server. But your data may be decrypted on the server. You have no control of what happens to your email afterwards - does gmail parse your content in order to display related adverts? does your mail server forward the email to the recipient's mail server securely? does the intended recipient have a secure connection to their server? So `SSL` and `STARTTLS` only cover the network between your computer and your mail server.

## How does it work?
End-to-end email encryption requires both sender and recipient to have a pair of [[Cryptographic keys | cryptographic keys]]. There is one private key and one public key. The sender encrypts the message locally on his device using the recipient’s public key. The receiver decrypts it on his device using his private key. The process works as follows:

1.  Alice (sender) and Bob (recipient) both generate their key pairs and share their public keys with each other. They keep their private key ‘private’ as the name suggests. You only need to generate your keys once when creating an encrypted email account.
2.  Alice encrypts the message using Bob’s public key in her device and sends it to Bob.
3.  Bob receives the encrypted message on his device and decrypts it using his private key.
4.  Nothing can read the message between Alice encrypting it on her computer and Bob decrypting it on his.

## Advantages of end-to-end encryption
- **privacy**: the contents are hidden from anyone other than the intended recipients
- **greater authenticity**: combined with [[Email digital signatures | digital signing]], you know who it's from and that it hasn't been tampered with
- **prevents mass surveillance**: there's a reason government's don't like the public using end-to-end encryption


![[/assets/e2ee.png]]

![](/assets/e2ee.png)