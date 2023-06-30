import { mount } from '@vue/test-utils';
import UserForm from './UserForm.vue';

describe('UserForm', () => {
  it('renders the component', () => {
    const wrapper = mount(UserForm);
    expect(wrapper.exists()).toBe(true);
  });

  it('updates the user name on input', async () => {
    const wrapper = mount(UserForm);
    const input = wrapper.find('#name');
    await input.setValue('John Doe');
    expect(wrapper.vm.name).toBe('John Doe');
  });

  it('toggles dropdown for equipment options', async () => {
    const wrapper = mount(UserForm);
    const button = wrapper.find('#dropdownSearchButton');
    await button.trigger('click');
    expect(wrapper.vm.isActiveEquipment).toBe(true);
    await button.trigger('click');
    expect(wrapper.vm.isActiveEquipment).toBe(false);
  });

  it('updates the user location on input', async () => {
    const wrapper = mount(UserForm);
    const input = wrapper.find('#location');
    await input.setValue('New York');
    expect(wrapper.vm.location).toBe('New York');
  });

  it('updates the user interests on textarea input', async () => {
    const wrapper = mount(UserForm);
    const textarea = wrapper.find('#interests');
    await textarea.setValue('Hiking, Cooking');
    expect(wrapper.vm.interests).toBe('Hiking, Cooking');
  });
});
