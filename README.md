# Community Rewards Token

## Description
A platform that rewards the developers with tokens which can incentivize their effort and motivate them to contribute more.

## Authors
* Elanie Quiambao
* Littbarski Adeh
* Nidusha Hewawilladdara
* Pradeep Kumar Prakasam
* Saiju Mathew Stephen

## Project Plan [(link)](https://georgebrowncollege.sharepoint.com/sites/BCDV1010-WINTER2021copy-Community/Lists/ProjectPlan/gantt.aspx?IsDlg=1)
![](https://github.com/nidushahw/Design-patterns-community-reward-token/blob/main/artifacts/ProjectPlan.JPG?raw=true)

## Problem
Currently, there are no decentralized platforms which is available for organizations where they can post rewards the developers for their contribution either technical or non-technical to the development. 

## Mechanism
* Creating an account to connect with the community (it will be done using their public address)
* Rewards will be issued through a token (ERC 20 Fungible)
* Token will be listed in an exchange - maybe later
* 1 token = ___ wei or Ether (TBD) (Oracle contract to fetch value of token) - maybe later
* Tokens will be minted when an user creates an account (mint function will be called)
* 50 tokens will be issued to everyone who creates an account
* Developers can post the questions to the forum with the corresponding reward (in tokens) in the platform
* Other registered users can submit their answers to claim the reward
* Other users can vote if the answer is right
* Reward will be issued to answer with max votes and minimum of 5 votes after a certain period say 1 week
* The owner can receive a refund if he feels that no answer is correct
* Developers can collect the reward tokens and exchange it with the platform after a vesting period of 2 years

## Stakeholders
* Developers
* Educators
* Students
### Optional 
* Exchange
* API provider of the exchange

## Restrictions
* Each address can have only one account
* Each question can have only one correct answer

## Architecture
![](https://github.com/nidushahw/Design-patterns-community-reward-token/blob/main/artifacts/CommunityRewardsTokenArchitecture.jpeg?raw=true)

## Further Development
* Publishing to main network
* Making the application more secure
