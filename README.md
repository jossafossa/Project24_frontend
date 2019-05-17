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
| signup | POST | `/signup` | `String username`<br> `String password` |
| login | POST | `/login` | `String username`<br> `String password` | `String token` |


### Users
| function | method | endpoint | fields | returns |
|-|-|-|-|-|
| create user | POST | `/user/create` | `String name`<br> `Base64 profilePicture`<br>  `String description`<br> `Base64[] photos`<br> `String[] interests`<br> |
| get user | GET | `/user/<userID>` | | `String name`<br> `Base64 profilePicture`<br>  `String description`<br> `Base64[] photos`<br> `String[] interests`<br>|
| edit user | POST | `/user/<userID>/edit` | `String name`<br> `Base64 profilePicture`<br>  `String description`<br> `Base64[] photos`<br> `String[] interests`<br> |
| get next group | GET | `/user/<userID>/match/next` | `String groupID`<br> `boolean like` | **a group object**`Group` |
| get all matched users | GET | `/user/<userID>/match/all` |  | **A list of groups**<br>`Group[]` |
| get a matched user | GET | `/user/<userID>/match/<groupID>` |  | **a group object**<br>`Group` |

### Groups
| function | method | endpoint |  fields | returns |
|-|-|-|-|-|
| create group| POST | `/group/create` | `String name`<br> `Base64 profilePicture`<br>  `String description`<br> `Base64[] photos`<br> `String[] interests`<br> `String[] members`
| get group| GET | `/group/<groupID>` | | `String name`<br> `Base64 profilePicture`<br>  `String description`<br> `Base64[] photos`<br> `String[] interests`<br> `String[] members` |
| edit group| POST | `/group/<groupID>/edit` | `String name`<br> `Base64 profilePicture`<br>  `String description`<br> `Base64[] photos`<br> `String[] interests`<br> `String[] members` |
| get next profile | GET | `/group/<groupID>/match/next` | `String profileID`<br> `boolean like` | **a group object**<br>`Group` |
| get all matches groups | GET | `/group/<groupID>/match/all` |  | **A list of users**<br>`User[]` |
| get a matched user | GET | `/group/<groupID>/match/<userID>` |  | **A list of users**<br>`User` |


### Group prikbord
| function | method | endpoint |  fields | returns |
|-|-|-|-|-|
| create a boardItem | POST | `/group/<groupID>/board/add` | `String name`<br> `String createdBy`<br> `String description`<br> `String date` | 
| edit a boardItem | POST | `/group/<groupID>/board/<boadItemID>` | `String name`<br> `String createdBy`<br> `String description`<br> `String date` |  | 
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

