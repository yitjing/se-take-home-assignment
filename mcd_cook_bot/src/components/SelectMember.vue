<!-- to allow users to select its member privilege -->
<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'

    // to store the selected member privilege (Normal, VIP, Manager)
    const orderMembers = ref('') 
    const router = useRouter()

    // called when the login button is pressed
    const loginMember = () => {
        if(orderMembers.value === 'Manager'){
            // redirect to the botController page if Manager is selected
            router.push({
                path: '/botController',
                // pass the member type to the botController page as query parameter
                query: { memberType: orderMembers.value }
            })
        }else{
            // redirect to orderForm page if Normal and VIP is selected
            router.push({ 
                path: '/orderForm', 
                // pass the member type to the orderForm page as query parameter
                query: { memberType: orderMembers.value } 
            })
        }
    }
</script>
  
<template>
    <!-- calls loginMember methods after login button is pressed -->
    <form @submit.prevent="loginMember">
        <div>
            <label for="orderMembers">Select Member: </label>
            <select v-model="orderMembers" id="orderMembers" required>
                <option value="" disabled>Select</option>
                <option value="Normal">Normal</option>
                <option value="VIP">VIP</option>
                <option value="Manager">Manager</option>
            </select>
        </div>

        <button type="submit">Login</button>
    </form>
</template>