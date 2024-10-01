# FeedMe Software Engineer Take Home Assignment, UI Application (By Soo Yit Jing)
Developed an order controller which handles the order flow from 'Normal' and 'VIP' member by using the **Vue.js**.

## Features:
- Submit Normal Order to the 'Pending' list
- Submit VIP Order to the 'Pending' list
  - Normal order will be first come first serve order in the 'Pending' list
  - VIP order will be placed infront of all normal order but queue behind an existing VIP order
- Add cooking bot
- Remove cooking bot
  - A bot only can process one order at a time (proccessing time 10 seconds)
  - The bot will process the first order on the pending list
  - When a bot is remove before completing the order, the order will be return back to the pending list
  - When a bot completing an order, it will be send to the 'Complete' list area
  - When there is no pending order left in the list, the bot will be 'Idle'

## Technologies Used:
Vue.js, Node.js, npm, HTML, CSS, Javascript
### Testing: 
Jest, Vue Test Utils, vue add unit-jest, Babel jest, Jest-DOM
### Version Control: 
Git
### Code Editor: 
Visual Studio Code
