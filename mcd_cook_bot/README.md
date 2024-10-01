# FeedMe Software Engineer Take Home Assignment, UI Application (By Soo Yit Jing)
Developed an order controller which handles the order flow from 'Normal' and 'VIP' member by using the **Vue.js**. Whereas allows the 'Manager' to manage the numbers of cooking bots.

## Features:
- Submit Normal Order to the 'Pending' list
- Submit VIP Order to the 'Pending' list
  - Normal order will be first come first serve order in the 'Pending' list
  - VIP order will be placed infront of all normal order but queue behind an existing VIP order
- Add cooking bot
  - Create a bot to process the order from the 'Pending' list
  - The bot only can process one order at a time (proccessing time 10 seconds)
  - After 10 seconds, the order will be move to the 'Complete' list
  - Start processing another order on the 'Pending' list
- Remove cooking bot
  - Remove the newest bot
  - When a bot is remove before completing the order, the order will be return back to the pending list
  - When there is no pending order left in the list, the bot will be 'Idle'

## Technologies Used:
Vue.js, Node.js, npm, HTML, CSS, Javascript
### Testing(Unit Testing): 
Jest, Vue Test Utils, Babel jest, Jest-DOM
### Version Control: 
Git
### Code Editor: 
Visual Studio Code
