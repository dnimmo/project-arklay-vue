import { mount } from '@vue/test-utils'
import Message from '../Message'

describe(
    'Message', 
    () => {
        test(
            'renders text that has been passed in', 
            () => {
              const testText = "Whoop whoop"

              const message = 
                mount(
                  Message, 
                  { 
                    propsData: {
                        text: testText
                    }
                  })

              expect(message.text())
                .toBe(testText)
        })
    })

