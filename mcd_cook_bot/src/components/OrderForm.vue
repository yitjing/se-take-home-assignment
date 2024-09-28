<!-- to allow customers to choose menu and submit the order -->
<script setup>
  // create reactive reference that allows Vue to track for changes and update to DOM or trigger reaction
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  // access the route query to get the memberType
  const route = useRoute()
  const router = useRouter()

  // retrieve the memberType from the route query params
  // if no query was retrieved from the route then Normal value is set as default
  const memberType = ref(route.query.memberType || 'Normal') 

  // define state for the pending order details
  const pendingOrders = ref([])
  let orderIdCounter = ref(1)

  onMounted(() => {
    // retrieve the submitted orders data from the local storage
    const storedPendingOrders = localStorage.getItem('pendingOrders')

    // checks if the data exist
    if(storedPendingOrders){
      // parse in the data from the local storage to the Javascript value
      pendingOrders.value = JSON.parse(storedPendingOrders)
      // updating the order id counter
      orderIdCounter.value = pendingOrders.value.length + 1
    }
  })

  const changeToNormal = () => {
    memberType.value = 'Normal'
    router.push({
      path: '/orderForm', 
      // pass the member type to the orderForm page as query parameter
      query: { memberType: 'Normal' } 
    })
  }

  const changeToVIP = () => {
    memberType.value = 'VIP'
    router.push({
      path: '/orderForm', 
      // pass the member type to the orderForm page as query parameter
      query: { memberType: 'VIP' } 
    })
  }

  // send the user back to the select member page
  const goToHome = () => {
    router.push('/')
  }

  const submitOrder = () => {
    // order data
    const newOrder = {
      id: orderIdCounter.value++,
      type: memberType.value,
      status: 'Pending'
    }

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

    // save the pendingOrders data to the local storage
    localStorage.setItem('pendingOrders', JSON.stringify(pendingOrders.value))

    // redirect to the order list page after submit the order
    router.push({
      path: '/orderList',
      query: { memberType: memberType.value }
    })
  }

  const clearOrders = () => {
    pendingOrders.value = []
    orderIdCounter.value = 1
    localStorage.removeItem('pendingOrders')
    console.log('Pending orders cleared')
  }
</script>
  
<template>
  <button @click="changeToNormal">Normal Member</button>
  <button @click="changeToVIP">VIP Member</button>
  <button @click="goToHome">Home</button>
  <button @click="clearOrders">Clear All Orders</button>

  <h2>Create Order ({{ memberType }} Member)</h2>
  <form @submit.prevent="submitOrder">
    <div>
      <!-- Menu -->
      <!-- images is taken from Unsplash -->
      <img src="../assets/Images/amirali-mirhashemian-88YAXjnpvrM-unsplash.jpg" alt="" width="200"/>
      <button type="submit">Submit Order</button>
    </div>
    <div>
      <!-- Menu -->
      <!-- images is taken from Unsplash -->
      <img src="../assets/Images/amirali-mirhashemian-jh5XyK4Rr3Y-unsplash.jpg" alt="" width="200"/>
      <button type="submit">Submit Order</button>
    </div>
    <div>
      <!-- Menu -->
      <!-- images is taken from Unsplash -->
      <img src="../assets/Images/food-photographer-E94j3rMcxlw-unsplash.jpg" alt="" width="200"/>
      <button type="submit">Submit Order</button>
    </div>
  </form>
</template>