import { mount } from '@vue/test-utils'
import ActionButton from '../ActionButton'

describe(
    'ActionButton', 
    () => {
        const defaultProps = {
            text: 'default', 
            action: () => {},
            active: true,
        }

        test(
            'renders text that has been passed in', 
            () => {
                const testText = "Hello poppet"
                const actionButton = 
                    mount(
                        ActionButton, 
                        { 
                            propsData: {
                                ...defaultProps,
                                text: testText
                            }
                        })

                expect(actionButton.text())
                    .toBe(testText)
        })

        test(
            'calls the action that is passed in when pressed', 
            () => {
                // Obviously I don't condone direct mutation like this!
                // But this was an easy way to test if an action was fired
                const testFunction = 
                    (obj) => 
                        { obj.hasBeenMutated = true }

                const testObj = {} 

                const testAction = 
                    () =>
                        testFunction(testObj)

                const actionButton = 
                    mount(
                        ActionButton, 
                        { 
                            propsData: {
                                ...defaultProps,
                                action: testAction
                            }
                        })

                actionButton.trigger('click')

                expect(testObj.hasBeenMutated)
                    .toBe(true)
        })

        describe(
            'when inactive', 
            () => {
                test(
                    'is denoted as `inactive`', 
                    () => {
                        const actionButton = 
                            mount(
                                ActionButton, 
                                { 
                                    propsData: {
                                        ...defaultProps,
                                        active: false
                                    }
                                })

                        expect(actionButton.classes('inactive'))
                            .toBe(true)
                })
        })
    })

