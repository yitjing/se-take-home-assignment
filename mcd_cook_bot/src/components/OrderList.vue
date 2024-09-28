<!-- to display the pending and complete order lists from the customer -->
<script setup>
    // create reactive reference that allows Vue to track for changes and update to DOM or trigger reaction
    import { ref, onMounted } from 'vue'

    // define the state for the pending and completed orders data
    const pendingOrders = ref([])
    const completedOrders = ref([])

    onMounted(() => {
        // retrieve the submitted orders data from the local storage
        const storedPendingOrders = localStorage.getItem('pendingOrders')

        // checks if the data exist
        if(storedPendingOrders){
            // parse in the data from the local storage to the Javascript value
            pendingOrders.value = JSON.parse(storedPendingOrders)
        }

        // retrieve the completed orders data from the local storage
        const storedCompletedOrders = localStorage.getItem('completedOrders')

        // checks if the data exist
        if(storedCompletedOrders){
            // parse in the data from the local storage to the Javascript value
            completedOrders.value = JSON.parse(storedCompletedOrders)
        }
    })
</script>

<template>
    <!-- display the pending orders data in a list -->
    <h3>Pending Orders</h3>
    <ul>
        <li v-for="order in pendingOrders" :key="order.id">
        Order #{{ order.id }} - {{ order.type }} - {{ order.status }}
        </li>
    </ul>

    <!-- display the completed orders data in a list -->
    <h3>Completed Orders</h3>
    <ul>
        <li v-for="order in completedOrders" :key="order.id">
        Order #{{ order.id }} - {{ order.type }} - {{ order.status }}
        </li>
    </ul>
</template>
  