---
date: 2021-04-08
draft: true
title: Email digital signatures
tags: [email, security]
status: seedling
---
# What are they?
According to [Wikipedia](https://en.wikipedia.org/wiki/Digital_signature):
> A **digital signature** is a mathematical scheme for verifying the authenticity of digital messages or documents. A valid digital signature, where the prerequisites are satisfied, gives a recipient very strong reason to believe that the message was created by a known sender (_authentication_), and that the message was not altered in transit (_integrity_).



## What's the point?
In other words,  whilst [[End-to-end ecryption]] protects the privacy of your message, digital signatures provide three additional security attributes:
- _sender verification_: the sender is who they claim to be
- _integrity_: the message was not altered in transit
- _non-repudiation_: the sender cannot deny having sent the message



## How does it work?
Let's say that Alice wants to send a signed message to Bob. She already has [[Cryptographic keys]] set up. She signs the message using her private key, and Bob verifies it by checking it against her public key.

![[assets/491px-Private_key_signing.png]]

This has the effect of verifying Alice as the sender and prevents her from denying it, because only she has the private key that signed the message. Also, because of the way signing works, this proves that the content has not be altered since signing.



## What *actually* happens?
When Alice signs her message, her private key _and the message's content_ are passed through a hashing algorithm, to produce a large number called a _digest_. For this message to be verified, the message is hashed with the public key. If this hash number matches the original digest, the content has not been altered. If the numbers don't match, it can't be verified.

The mathematical relationship between the private and public keys is such that, given the same content, they will produce the same hash.


## Why is this important?
Really? Okay. Let's start again: it verifies that the sender is who they claim to be, and verifies that the content you receive is what they sent you. Consider how often you receive spam from people you know – their contact lists have been hacked (or given away) to supply the spammers with email addresses. The spammers then send emails claiming to be from your friends. It's infuriating.
If your friends automatically digitally signed their emails, then you would know to ignore unsigned emails from them, and not have to ponder whether it really is them who's contacted you.