// unit test using Jest and Vue Test Utils for BotController.vue file functionality
// This page contains adding and removing cooking bots that helps to process the pending order
import { mount } from '@vue/test-utils';
import BotController from '@/components/BotController.vue';

describe('BotController.vue', () => {
    const pendingOrders = [
        { id: 1, type: 'VIP', status: 'Pending' },
        { id: 2, type: 'Normal', status: 'Pending' },
    ];

    const completedOrders = [];

    it('initializes with no bots', () => {
        // to pass the props to the BotController component
        const wrapper = mount(BotController, {
            props: {
                pendOrders: pendingOrders,
                compOrders: completedOrders,
            },
        });

        // check if there is no bots at the start of the page
        expect(wrapper.find('[data-testid="botsNumber"]').text()).toContain('Total Bots: 0');
    });

    it('removes a bot and returns its order back to the pending list', async () => {
        // to pass the props to the BotController component
        const wrapper = mount(BotController, {
            props: {
                pendOrders: pendingOrders,
                compOrders: completedOrders,
            },
        });

        // trigger the "+ Bot" button to add a new bot to process the pending orders
        await wrapper.find('[data-testid="addBotButton"]').trigger('click');
        // trigger the "- Bot" button to add a new bot to process the pending orders
        await wrapper.find('[data-testid="removeBotButton"]').trigger('click');

        // check if there is 0 bots left 
        expect(wrapper.vm.bots.length).toBe(0);
        // check if the pending orders list length is back to 2 after stop processing the order
        expect(wrapper.vm.pendingOrders.length).toBe(2);
        // check if the order will be placed back to the first order of the pending list
        expect(wrapper.vm.pendingOrders[0].id).toBe(1);
    });

    it('adds a new bot and process the first pending order', async () => {
        // to pass the props to the BotController component
        const wrapper = mount(BotController, {
            props: {
                pendOrders: pendingOrders,
                compOrders: completedOrders,
            },
        });

        // trigger the "+ Bot" button to add a new bot to process the pending orders
        await wrapper.find('[data-testid="addBotButton"]').trigger('click');

        // checks if the bot length is 1
        expect(wrapper.vm.bots.length).toBe(1);
        // check if the bot is processing the order of id 1
        expect(wrapper.vm.bots[0].status).toBe('Processing Order #1');
        // check if one bot only processing one order
        expect(wrapper.vm.pendingOrders.length).toBe(1);
    });

    it('displays "No pending orders." when there are no pending orders', async () => {
        // to pass the props to the BotController component
        const wrapper = mount(BotController, {
            props: {
                pendOrders: [],
                compOrders: completedOrders,
            },
        });

        // if there is no pending order left on the list I expect there is 'No pending orders.'
        // text display on the screen
        expect(wrapper.text()).toContain('No pending orders.');
    });

    it('displays "No completed orders yet." when there are no completed orders', async () => {
        // to pass the props to the BotController component
        const wrapper = mount(BotController, {
            props: {
                pendOrders: pendingOrders,
                compOrders: [],
            },
        });

        // if there is no completed order I expect there is 'No completed orders yet.'
        // text display on the screen
        expect(wrapper.text()).toContain('No completed orders yet.');
    });
});
