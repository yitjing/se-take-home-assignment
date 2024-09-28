<!-- to allow customers to choose menu and submit the order -->
<script setup>
  // create reactive reference that allows Vue to track for changes and update to DOM or trigger reaction
  import { ref } from 'vue'
  import BotController from './BotController.vue'

  // retrieve the memberType from the route query params
  // if no query was retrieved from the route then Normal value is set as default
  const memberType = ref('Normal')

  // define reactive references for the pending order details
  const pendingOrders = ref([])
  const completedOrders = ref([])
  let orderIdCounter = ref(1)

  const changeToNormal = () => {
    memberType.value = 'Normal'
  }

  const changeToVIP = () => {
    memberType.value = 'VIP'
  }

  // submit order selected by the customers to the local storage
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
        // if there is a VIP order in the list, it will be insert behind it
        pendingOrders.value.splice(firstNormalIndex, 0, newOrder)
      }
    }else{
      // normal orders will be push to the end of the list
      pendingOrders.value.push(newOrder)
    }
  }

  const clearPendingOrders = () => {
    pendingOrders.value = []
    orderIdCounter.value = 1
    console.log('Pending orders cleared')
  }
  const clearCompletedOrders = () => {
    completedOrders.value = []
    orderIdCounter.value = 1
    console.log('Completed orders cleared')
  }
</script>
  
<template>
  <div class="order-form">
    <h1>Create Order ({{ memberType }} Member)</h1>

    <div class="function-buttons">
      <button @click="changeToNormal">Normal Member</button>
      <button @click="changeToVIP">VIP Member</button>
      <button @click="clearPendingOrders">Clear All Orders</button>
      <button @click="clearCompletedOrders">Clear All Completed Orders</button>
    </div>

    <!-- Menu -->
    <form @submit.prevent="submitOrder">
      <div class="menu-details">
        Burger A
        <button type="submit">Submit Order</button>
      </div>
      <div class="menu-details">
        Burger B
        <button type="submit">Submit Order</button>
      </div>
      <div class="menu-details">
        Burger C
        <button type="submit">Submit Order</button>
      </div>
    </form>

    <!-- Pending Orders List -->
    <h2>Pending Orders</h2>
    <!-- display the pending orders data in a list -->
    <!-- checks if the array have value-->
    <ul v-if="pendingOrders.length">
        <li v-for="order in pendingOrders" :key="order.id">
          Order #{{ order.id }} - {{ order.type }} - {{ order.status }}
        </li>
    </ul>
    <p v-else>No pending orders.</p>

    <!-- Complete Orders List -->
    <h2>Complete Orders</h2>
    <!-- display the completed orders data in a list -->
     <!-- checks if the array have value-->
    <ul v-if="completedOrders.length">
        <li v-for="order in completedOrders" :key="order.id">
          Order #{{ order.id }} - {{ order.type }} - {{ order.status }}
        </li>
    </ul>
    <p v-else>No completed orders yet.</p>
  </div>

  <!-- Cooking Bot Controller (Manager) -->
  <BotController :pendOrders="pendingOrders" :compOrders="completedOrders"/>
</template>

<style scoped>
  .order-form{
    max-width: 900px;
    padding: 20px;
  }
  .function-buttons{
    display: flex;
    margin-top: 10px;
    gap: 10px;
  }
  form{
    display: flex;
    margin-top: 10px;
    margin-bottom: 25px;
    gap: 40px;
  }
  .menu-details{
    padding: 10px;
    border: 1px solid grey;
  }
</style>