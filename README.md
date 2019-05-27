# Project

## Omschrijving
Een app waarmee je groepen kunt vinden door te swipen. Je kunt ook als persoon swipen op groepen. 

## Werkwijze
**Coding**
- camelCase
- Arrow functions
- let, const
- Comments schrijven (JSDoc, PyDoc)
- Atomic functies

**git**
- Alles op master
- Regelmatig pullen
- regelmatig committen
- git push aan eind van de dag

**Algemeen**
- Trello bijhouden

## Opbouw frontend
- Angular
- NodeJS
- *Geen CSS Frameworks* **Die schrijft joost wel**
- 

## Opbouw backend
- Django
- MySQL

## modules
|Module|contents|
|-|-|
| HomeModule | `NavModule`, `WelcomeComponent` |
| NavModule | `LoginButtonComponent`, `LogoutButtonComponent`, `SignupButtonComponent`  | 
| CreateAccountModule | `AuthenticationInfoComponent`, `EditBasicInfoComponent`, `EditInterestsComponent`, `EditPhotosComponent` | 
| LoginAccountModule | `LoginComponent` | 
| ViewAccountModule | `ViewBasicInfoComponent`, `EditInterestsComponent`, `EditPhotosComponent`  |


## Pagina's
- create account
- edit account
- create group
- edit group
- choose how you swipe
- swipe as group
- swipe as loner
- Prikbord
- prikbord create item
- prikbord view item
- prikbord edit item
- prikbord datumprikker

## API

### Authentication
| function | method | endpoint | fields | returns |
|-|-|-|-|-|
| signup | POST | `/signup` | `String username`<br> `String password` <br> `/user/create` | `String name`<br> `Base64 profilePicture`<br>  `String description`<br> `Base64[] photos`<br> `String[<InterestID>] interests` |
| login | POST | `/login` | `String username`<br> `String password` | `JWT<{userID: <userID>}> token` |

### Interests
| function | method | endpoint | fields | returns |
|-|-|-|-|-|
| get all | GET | `/interests` |  | `InterestObject[] interests` | 

### Users
| function | method | endpoint | fields | returns |
|-|-|-|-|-|
| get user | GET | `/user/<userID>` | | `String name`<br> `Base64 profilePicture`<br>  `String description`<br> `Base64[] photos`<br> `String[] interests`<br>|
| edit user | POST | `/user/<userID>/edit` | `String name`<br> `Base64 profilePicture`<br> `String location` |
| set photo at slot | POST | `/user/<userID>/photos/<slotID>` | `base64 photo` |
| remove photo at slot | POST | `/user/<userID>/photos/<slotID>/remove` | `base64 photo` |
| add interest | POST | `/user/<userID>/interests/add` | `String InterestID` |  |
| get interests | GET | `/user/<userID>/interests` | `Interest[] interests` |
| remove interest | POST | `/user/<userID>/interests/<interestID>/remove` | 
| get next group | GET | `/user/<userID>/match/next` | `String groupID`<br> `boolean like` | **a group object**<br>`Group` |
| get all matched groups | GET | `/user/<userID>/match/all` |  | **A list of groups**<br>`Group[]` |
| get a matched groups | GET | `/user/<userID>/match/<groupID>` |  | **a group object**<br>`Group` |


### Groups
| function | method | endpoint |  fields | returns |
|-|-|-|-|-|
| create group| POST | `/group/create` | `String name`<br> `Base64 profilePicture`<br>  `String description`<br> `Base64[] photos`<br> `String[] interests`<br> `String[] members` <br> `String location`
| get group| GET | `/group/<groupID>` | | `String name`<br> `Base64 profilePicture`<br>  `String description`<br> `Base64[] photos`<br> `String[] interests`<br> `String[] members`<br> `String location` |
| edit group| POST | `/group/<groupID>/edit` | `String name`<br> `Base64 profilePicture`<br>  `String description`<br> `Base64[] photos`<br> `String[] interests`<br> `String[] members` |
| set photo at slot | POST | `/group/<groupID>/photos/<slotID>` | `base64 photo` |
| remove photo at slot | POST | `/group/<groupID>/photos/<slotID>/remove` | |
| add interest | POST | `/group/<groupID>/interests/add` | `String InterestID` |  |
| get interests | GET | `/group/<groupID>/interests` | `Interest[] interests` |
| remove interest | POST | `/group/<groupID>/interests/<interestID>/remove` | 
| add admin | POST | `/group/<groupID>/admins/add` | `String userID` | 
| remove admin | POST | `/group/<groupID>/admins/remove` | `String userID` | 
| add member | POST | `/group/<groupID>/members/add` | `String userID` | 
| remove member | POST | `/group/<groupID>/members/remove` | `String userID` | 
| get next profile | GET | `/group/<groupID>/match/next` | `String profileID`<br> `boolean like` | **a group object**<br>`Group` |
| get all matched profiles | GET | `/group/<groupID>/match/all` |  | **A list of users**<br>`User[]` |
| get a matched profiles | GET | `/group/<groupID>/match/<userID>` |  | **A list of users**<br>`User` |
| remove group | POST | `/group/<groupID>/delete` | 


### Group prikbord
| function | method | endpoint |  fields | returns |
|-|-|-|-|-|
| create a boardItem | POST | `/group/<groupID>/board/add` | `String name`<br> `String createdBy`<br> `String description`<br> `String date` | 
| edit a boardItem | POST | `/group/<groupID>/board/<boadItemID>` | `String description`<br> `String date` |  | 
| get a boardItem | GET | `/group/<groupID>/board/<boardItemID>` |  | **A boarditem**<br> `BoardItem` | 
| remove a boardItem | POST | `/group/<groupID>/board/<boardItemID>/remove` |  |  | 
| get a list of all board items | GET | `/group/<groupID>/board/all` |  | **A list of board items**<br> `BoardItem[]` |
| comment on a boardItem | POST | `/group/<groupID>/board/<boardItemID>/comment/add` | `String userID`, `String comment` |  |
| edit a comment | POST | `/group/<groupID>/board/<boardItemID>/comment/<commentID>` | `String comment` | |
| remove a comment | POST | `/group/<groupID>/board/<boardItemID>/comment/remove` | | |


## Planning
// todo

## Usecases:
**Een gebruiker kan:**
- Een account aanmaken
- Een groep aanmaken
- Een lijst van getmatchte groepen zien
- Profiel aanpassen
- Swipen op groepen

**Een groeps beheerder kan:**
- De titel, afbeelding en beschrijving van de groep aanpassen
- Beheerders toevoegen
- Mensen toevoegen
- Mensen verwijderen
- Swipen op profielen
- Een lijst van getmatchte profielen zien

**Een groeps lid kan:**
- Uit de groep stappen
- Het prikbord bekijken
- Reageren prikbord items
- Een nieuw prikbord item aanmaken
- Een datumprikker aanmaken
- Reageren op een datumprikker

## Todo's
- Schermontwerpen maken
- Klassendiagram maken
- Backend opzetten
- Frontend opzetten

