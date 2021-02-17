# Community Rewards Token

## Description
A platform that rewards the developers with tokens which can incentivize their effort and motivate them to contribute more.

## Authors
* Elanie Quiambao
* Littbarski Adeh
* Nidusha Hewawilladdara
* Pradeep Kumar Prakasam
* Saiju Mathew Stephen

## Project Plan
[Project Plan](https://georgebrowncollege.sharepoint.com/sites/BCDV1010-WINTER2021copy-Community/Lists/ProjectPlan/gantt.aspx?IsDlg=1)

### Project Tasks and Responsibilites

| ID | TASK                                    | RESPONSIBILITY             | DESCRIPTION                                                                                  | DEPENDENCIES | START DATE | DUE DATE | DURATION (Days) |
|----|-----------------------------------------|----------------------------|----------------------------------------------------------------------------------------------|--------------|------------|----------|-----------------|
| 1  | Create   project plan                   | Littbarski                 | Create   a plan by identifying tasks to be completed and assigning resources to each   task  |              |   01-Feb   |  03-Feb  |        2        |
| 2  | Requirements   elicitation and analysis | Pradeep, Nidusha                    | Gather   and develop system requirements                                                     |       1      |   02-Feb   |  04-Feb  |        2        |
| 3  | Create   data flow, State diagrams      | Elanie                     | Conceptualise   and design data architecture                                                 |       2      |   03-Feb   |  06-Feb  |        3        |
| 4  | Design   system architecture            | Saiju                      | Design   system architecture for rewards token - identify relevant technologies to be   used |       3      |   04-Feb   |  07-Feb  |        3        |
| 5  | Create   UI wireframes/mockups          | Littbarski                 | Create   UI wireframes/mockups for frontend                                                  |       2      |   05-Feb   |  07-Feb  |        2        |
| 6  | Develop   smart contract(s)             | Nidusha, Pradeep           | Develop   Solidity smart contract according to requirements                                  |       2      |   06-Feb   |  10-Feb  |        4        |
| 7  | Audit   and test smart contract         | Elanie,   Littbarski,Saiju | Audit   and test functionality of Solidity smart contract(s)                                 |       6      |   07-Feb   |  09-Feb  |        2        |
| 8  | Develop   web front-end                 | Littbarski,Elanie,Pradeep,Nidusha  | Develop   and integrate React frontend                                                       |       5      |   08-Feb   |  12-Feb  |        4        |
| 9  | Develop   REST service                  | Saiju, Nidusha             | Develop   and integrate NodeJs REST service with Ethereum testnet                            |       6      |   09-Feb   |  10-Feb  |        1        |
| 10 | Integration   and Testing               | Team                       | Integration   of UI with backend services and testing                                        |       9      |   10-Feb   |  16-Feb  |        6        |
| 11 | Deployment                              | Team                       | Deployment   for rewards token                                                               |      10      |   11-Feb   |  12-Feb  |        1        |

#
![GanttChart](https://github.com/nidushahw/Design-patterns-community-reward-token/blob/main/artifacts/GanttChart.PNG)

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
