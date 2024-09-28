<!-- manage the numbers of cooking bots -->
<script setup>
    import { ref, defineProps } from 'vue'

    const props = defineProps({
        pendOrders: Array,
        compOrders: Array,
    });

    // define reactive references for the pending, completed orders and bots
    const pendingOrders = ref(props.pendOrders);
    const completedOrders = ref(props.compOrders);
    const bots = ref([])

    // to keep track of the number of bots available for processing the order
    let botIdCounter = 0

    // add new cooking bot to process the pending order
    const addBot = () => {
        const bot = {
            id: ++botIdCounter,
            status: 'Idle',
            order: null,
            timeoutId: null,
        }

        // add new bot data to the reactive ref
        bots.value.push(bot)
        // process with the first pending order on the list
        processNextOrder(bot)
    }

    // to remove the most recent cooking bot added by the manager to process the pending order
    const removeBot = () => {
        // remove the bot from the array
        const botToRemove = bots.value.pop()

        if(botToRemove){
            // if the bot is processing then stop its process and return the order back to pending
            // use startsWith bcs the bot status is `Processing Order #${order.id}`
            if(botToRemove.status.startsWith('Processing')){
                // to clear the timeout to stop the current processing and prevent the order from 
                // continuing processing even without any bot
                clearTimeout(botToRemove.timeoutId)

                // return the order back to the pending state
                pendingOrders.value.unshift(botToRemove.order)
            }
        }
    }

    // to process the next pending order in the list
    const processNextOrder = (bot) => {
        // checks if there is still any order in the pending list
        if(pendingOrders.value.length > 0){
            // removes the first element in the array for the bot to process
            const order = pendingOrders.value.shift()
            // update the order id to the bot to allow manager to identify 
            // which order the bot is processing
            bot.status = `Processing Order #${order.id}`
            // update the order data to help the manager from keeping track of the specific order
            // process by the bot
            bot.order = order

            // set the processing time to 10 seconds to complete the order
            bot.timeoutId = setTimeout(() => {
                completeOrder(bot)
            }, 10000)

        }else{
            // when there is no more pending order in the list and
            // when all orders has been completed by the bot
            bot.status = 'Idle'
        }
    }

    // to complete an order made by the bot
    const completeOrder = (bot) => {
        // to change the status of order from 'Pending' to 'Complete'
        bot.order.status = 'Completed'
        // insert the completed order data to the array
        completedOrders.value.push(bot.order)

        // set the bot data when it complete processing an order
        bot.status = 'Idle'
        bot.order = null
        bot.timeoutId = null

        // after completing it will check if there are more orders 
        // that need to be processing
        processNextOrder(bot)
    }
</script>

<template>
    <div class="bot-controller">
        <h1>Cooking Bot Controller (Manager)</h1>

        <div class="orders-list">
            <!-- Pending Orders List -->
            <h2>Pending Orders</h2>
            <!-- display the pending orders data in a list -->
            <!-- checks if the array have value-->
            <ul v-if="pendingOrders.length">
                <li v-for="order in pendingOrders" :key="order.id">
                    Order #{{ order.id }} - {{ order.type }} - Status: {{ order.status }}
                </li>
            </ul>
            <p v-else>No pending orders.</p>

            <!-- Completed Orders List -->
            <h2>Complete Orders</h2>
            <!-- display the complete orders data in a list -->
            <!-- checks if the array have value-->
            <ul v-if="completedOrders.length">
                <li v-for="order in completedOrders" :key="order.id">
                    Order #{{ order.id }} - {{ order.type }} - Status: {{ order.status }}
                </li>
            </ul>
            <p v-else>No completed orders yet.</p>
        </div>

        <!-- Bot Management Section -->
        <h2>Bots</h2>
        <div>
            <!-- display the total available working bot -->
            <p>Total Bots: {{ bots.length }}</p>
            <!-- add and remove bot button -->
            <button @click="addBot">Add Bot (+)</button>
            <button @click="removeBot" :disabled="bots.length === 0">Remove Bot (-)</button>
        </div>

        <!-- Active Bots Status -->
        <h2>Bot Status</h2>
        <!-- display a list of active bot -->
        <ul>
            <!-- key attribute was included to give of the order an unique identifier -->
            <li v-for="(bot, index) in bots" :key="index">
                Bot #{{ bot.id }} - 
                <span v-if="bot.order">
                    Processing Order #{{ bot.order.id }}
                </span>
                <span v-else>
                    {{ bot.status }}
                </span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .bot-controller{
        max-width: 750px;
        padding: 20px;
    }
    h1{
        margin-bottom: 10px;
    }
    .orders-list{
        margin-bottom: 20px;
    }
    ul{
        list-style-type: none;
        margin-bottom: 10px;
        padding: 0;
    }
    li{
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid grey;
    }
    button{
        margin: 0px 15px 15px 0px;
        padding: 5px;
        font-size: 18px;
        border-radius: 2px;
    }
</style>
