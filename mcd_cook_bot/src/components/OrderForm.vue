<!-- to allow customers to choose menu and submit the order -->
<script setup>
  // create reactive reference that allows Vue to track for changes and update to DOM or trigger reaction
  import { ref } from 'vue'
  import BotController from './BotController.vue'

  // define reactive references for the member type of the user (Normal or VIP)
  const memberType = ref('')

  // define reactive references for the pending and completed order details
  const pendingOrders = ref([])
  const completedOrders = ref([])
  let orderIdCounter = ref(1)

  // submit normal order
  const submitNormalOrder = () => {
    memberType.value = 'Normal'

    submitOrder()
  }

  // submit VIP order
  const submitVIPOrder = () => {
    memberType.value = 'VIP'

    submitOrder()
  }

  // submit order selected by the customers
  const submitOrder = () => {
    // order data
    const newOrder = {
      id: orderIdCounter.value++,
      type: memberType.value,
      status: 'Pending'
    }

    // conditions where it sorts the order according to the member privilege
    if(memberType.value === 'VIP'){
      // the VIP orders will be placed before all Normal orders but it will queue behind the existed VIP order
      const firstNormalIndex = pendingOrders.value.findIndex(order => order.type === 'Normal')
    
      if(firstNormalIndex === -1){
        // if there is no Normal orders, the VIP order will be push to the end
        pendingOrders.value.push(newOrder)
      }else{
        // if there is a normal order in the list, it will be insert behind it
        pendingOrders.value.splice(firstNormalIndex, 0, newOrder)
      }
    }else{
      // normal orders will be push to the end of the list
      pendingOrders.value.push(newOrder)
    }
  }
</script>
  
<template>
  <div class='order-form'>
    <h1>Create Order</h1>

    <div class='function-buttons'>
      <button data-testid='normalOrderButton' @click='submitNormalOrder'>New Normal Order</button>
      <button data-testid='vipOrderButton' @click='submitVIPOrder'>New VIP Order</button>
    </div>

    <!-- Pending Orders List -->
    <h2>Pending Orders</h2>
    <!-- display the pending orders data in a list -->
    <!-- checks if the array have value-->
    <ul v-if='pendingOrders.length'>
        <li v-for='order in pendingOrders' :key='order.id'>
          Order #{{ order.id }} - {{ order.type }} - {{ order.status }}
        </li>
    </ul>
    <p v-else>No pending orders.</p>

    <!-- Complete Orders List -->
    <h2>Complete Orders</h2>
    <!-- display the completed orders data in a list -->
     <!-- checks if the array have value-->
    <ul v-if='completedOrders.length'>
        <li v-for='order in completedOrders' :key='order.id'>
          Order #{{ order.id }} - {{ order.type }} - {{ order.status }}
        </li>
    </ul>
    <p v-else>No completed orders yet.</p>
  </div>

  <!-- Cooking Bot Controller (Manager) -->
  <BotController :pendOrders='pendingOrders' :compOrders='completedOrders'/>
</template>

<style scoped>
  .order-form{
    max-width: 900px;
    padding: 20px;
  }
  .function-buttons{
    display: flex;
    margin-top: 10px;
    margin-bottom: 15px;
    gap: 10px;
  }
  button{
    margin: 0px 15px 15px 0px;
    padding: 5px;
    font-size: 18px;
    border-radius: 3px;
  }
  .menu-details{
    padding: 10px;
    border: 1px solid grey;
  }
</style>