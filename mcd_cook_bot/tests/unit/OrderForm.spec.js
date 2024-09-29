// unit test using Jest and Vue Test Utils for OrderForm.vue file functionality
// This page contains add new normal orders and new VIP orders
// I wanted to test whether their logics works as expected
// normal order queue as first come first serve
// VIP order queue infront of all normal order but queue behind an existed VIP order

import { mount } from '@vue/test-utils'
import OrderForm from '@/components/OrderForm.vue';

describe('OrderForm.vue', () => {
    it('adds normal order to the pending list', async () => {
        const wrapper = mount(OrderForm);

        // trigger the "New Normal Order" button to submit the normal order
        await wrapper.find('[data-testid="normalOrderButton"]').trigger('click');

        // check if the normal order has been add to the pending list
        expect(wrapper.vm.pendingOrders.length).toBe(1);
        expect(wrapper.vm.pendingOrders[0].type).toBe('Normal');
    });

    it('adds VIP order infront of normal orders', async () => {
        const wrapper = mount(OrderForm);

        // add a normal order to the pending list first
        await wrapper.find('[data-testid="normalOrderButton"]').trigger('click');

        // then trigger the "New VIP Order" button to submit VIP order
        await wrapper.find('[data-testid="vipOrderButton"]').trigger('click');

        // check if the VIP order is infront of the normal order in the pending list
        expect(wrapper.vm.pendingOrders[0].type).toBe('VIP');
    });

    it('displays "No pending orders" message if no orders', () => {
        const wrapper = mount(OrderForm);

        // if there is no order being submitted I expect there is 'No pending orders.'
        // text display on the screen
        expect(wrapper.text()).toContain('No pending orders.');
    });

    it('displays "No completed orders" message if no completed orders', () => {
        const wrapper = mount(OrderForm);

        // if there is no completed order I expect there is 'No completed orders yet.'
        // text display on the screen
        expect(wrapper.text()).toContain('No completed orders yet.');
    });
});
