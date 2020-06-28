import { mount } from '@vue/test-utils'
import Inventory from '../Inventory'

describe(
  'Inventory', 
  () => {
    const defaultProps = {
      closeFunction: () => {},
      items: [],
      useItemFunction: () => {},
      message: ""
    }

    test(
      'renders each item', 
      () => {
        const itemKey1 = 'TestItem1'
        const itemKey2 = 'TestItem2'

        const inventory = 
          mount(
            Inventory, 
            { 
              propsData: {
                ...defaultProps,
                items: [ 
                  { key: itemKey1, name: 'Test item 1' },
                  { key: itemKey2, name: 'Test item 2' }
                ]
            }
          })

          const item1 = 
            inventory.find(`button[data-test=${itemKey1}`)

          const item2 =
            inventory.find(`button[data-test=${itemKey2}`)
          
          expect(item1.exists() && item2.exists())
            .toBe(true)
      })
  })

