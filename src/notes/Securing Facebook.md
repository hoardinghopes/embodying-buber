---
date: 2021-04-06
draft: true
title: Securing Facebook
tags: [facebook, security, breach]
status: seedling
---

Last night I read that [Facebook security had been breached](https://www.howtogeek.com/722194/everything-you-need-to-know-about-the-facebook-data-breach/) and that over 533 million users had been affected. The data leak includes full name, phone number, locations, birthday, email address, relationship status, etc.



So I decided (at 1am, always the best time for involved technical decisions) to check and upgrade my Facebook security.

- [[Using a password manager]]
- [[Email security]]
- [[Multi-factor authentication]]




 > *The best Facebook security is not to have joined Facebook, ever.*



The second-best security is to ensure that your account is as safe as it can be.



I'm going to walk through what I did. However, the cause of this breach was not someone gaining access to my account via my slack security. It was a vulnerability coded into a particular Facebook component (that was fixed some time ago, so this newly-released data is a couple of years old).

My view is that if the software is secure, then I am the potential insecurity and I should act accordingly. But if the software itself isn't secure, I am not the vulnerability that needs to be fixed.

In any other part of my life, if the technology isn't secure, I won't use it. However, Facebook (Those of you that use it will understand. Those that don't, won't).

So let's just say this: if you don't already have a Facebook account, don't get one! Stay off it. And that includes Messenger, Instagram and Whatsapp.






1. Login to Facebook (I'm doing this on a desktop, so my description of icons and locations will differ if you're trying this on a mobile/tablet device).
2. Click on the top-right icon (with a down arrow) which opens a "See your profile" panel.
3. Select "Settings & Privacy", then "Settings". You may notice "privacy checkup" and "privacy shortcuts" options, and choose to follow them. I'm telling you the route I took last night, not the authoritative route.
4. Select "Security & Login" on the left-hand panel
5. Login > Change your password (you do [[Using a password manager|use a password manager]], don't you?)
6. Save your login info - this allows anyone with access to your computer to get into Facebook as you. Do you really want that convenience?
7. Two-factor authentication. This is really important. We should act as if our passwords are compromised, because if not today…. Facebook will ask you for a code if they think you're trying to login from an unrecognised device. I strongly recommend using an Authentication App, rather than relying on SMS[^fn-no2fasms].
8. Authorized logins: remove any devices that you don't use daily.
9. Get alerts about unrecognised logins. Do this, by email. (If someone has compromised your account, they will also receive your Messenger notifications)
10. Choose friends to contact if you get locked out. What? I don't understand.







[^fn-no2fasms]:People who are seeking to hack you in particular will be able to get hold of your phone details and fake your SIM in order to receive any text messages sent to you. You may not be the [CEO of Twitter](https://www.bbc.co.uk/news/technology-49532244), but that doesn't mean you shouldn't care. Authentication apps live on your smart phone and don't require interaction from the website to you. You read the code that the app produces on your phone, and type it into the website. Ta-da!






