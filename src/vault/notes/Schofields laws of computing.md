---
title: Laws of computing
date: 2021-07-07
tags: [computing, security]
status: seedling
---


Schofield's Laws of Computing are principles that anyone who works with computers should know. They're focused on data portability, integrity, and security.

## Jack Schofield
A prolific journalist (writing for The Guardian) who covered tech for four decades. His _Laws_ are the accumulation of "discoveries" during his career.


## First law
> Never put data into a program unless you can see exactly how to get it out (2003).

When you depend on an organisation, you should verify that it'll be easy to move your data to another organisation.

Why?
- a change in the terms of service
- another company with a different vision takes the original organisation over
- price hikes or a less favourable business model
- the service shuts down or becomes _abandonware_

**Data portability is an essential feature for software and services**.

Vendor lock-in looks like:
- not allowing you to export personal data or user-generated content
- not allowing files to be exported to open or human-readable formats
- making software incompatible with existing open standards

GDPR has helped with this by requiring organisations to enable users to export their content.


## Second law
> Data doesn't really exist unless you have at least two copies of it (2008).

Unless you have _at least_ 2 copies of your data, you should treat it like it doesn't exist. These copies should be kept in different physical locations (i.e. countries, not just devices or rooms). This includes keeping copies of cloud-based data, especially for services that don't take responsibility for backing up your data or which close your account after a period of inactivity.

Note also that solutions that sync your data will automatically send all changes including user-errors or malware/ransomware changes. Regular cold storage backups resolve this.



## Third law
> The easier it is for you to access your data, the easier it is for someone else to access your data (2008).

Protecting data requires a balance between security and convenience. We want our data easy for us to access, hard for others.

Attack types:
- _brute-force attacks_: betting on short passwords, as they're easier to type
- _credential stuffing_: betting on password reuse, as it's more convenient
- _dictionary attacks_: bet on logical (word-based) passwords, as it's easier to remember
- generally, rely on users not enabling 2FA and the data not being encrypted

Conclusions:
- use a password manager
- enable 2FA
- encrypt data before sending it to third-party servers
- remove data that is no longer relevant/necessary



### References
(From [FreeCodeCamp](https://www.freecodecamp.org/news/schofields-laws-of-computing/)).

* [First law, original article](https://www.theguardian.com/technology/2003/jul/24/onlinesupplement.columnists)
* [Second law, original article](https://www.theguardian.com/technology/2008/feb/14/email.yahoo)
* [Third law, original article](https://www.theguardian.com/technology/2008/jul/10/it.security)