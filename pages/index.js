import React, {useCallback, useState} from 'react'
import {
    Button,
    Card,
    ChoiceList,
    FooterHelp,
    FormLayout,
    Layout,
    Link,
    Page,
    SettingToggle,
    TextField,
    TextStyle,
} from '@shopify/polaris'


export default function App() {
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [email, setEmail] = useState('')
    const [checkboxes, setCheckboxes] = useState([0, 1, 2])
    const [allowed, setAllowed] = useState(false)
    const handleFirstChange = useCallback((value) => setFirst(value), [])
    const handleLastChange = useCallback((value) => setLast(value), [])
    const handleEmailChange = useCallback((value) => setEmail(value), [])
    const handleCheckboxesChange = useCallback(
        (value) => setCheckboxes(value),
        [],
    )

    const toggleConnection = useCallback(
        () => {
            setAllowed(!allowed)
        },
        [allowed],
    )

    const primaryAction = {content: 'New product'}

    const choiceListItems = [
        {label: 'Stars', value: 0},
        {label: 'Mosaic', value: 1},
        {label: 'Frames', value: 2},
    ]

    const customizationDescription = allowed
        ? 'Customers are now allowed to edit their photos when they submit orders'
        : 'Turn on to allow customers to edit their photos when they submit'
    const allowMarkup = allowed ? (
        <DisallowEdit onAction={toggleConnection}/>
    ) : (
        <AllowEdit onAction={toggleConnection}/>
    )

    return (
        <Page
            title='Photo Edit'
        >
            <Layout>

                <Layout.AnnotatedSection
                    title="Photo Customization"
                    description={customizationDescription}
                >
                    {allowMarkup}
                </Layout.AnnotatedSection>


                <Layout.AnnotatedSection
                    title="Customization Items"
                    description="Turn on and off effects customers can choose from"
                >
                    <Card sectioned>
                        <ChoiceList
                            allowMultiple
                            choices={choiceListItems}
                            selected={checkboxes}
                            onChange={handleCheckboxesChange}
                            disabled={!allowed}
                            title={"Allowed Effects"}/>
                    </Card>
                </Layout.AnnotatedSection>

                <Layout.AnnotatedSection
                    title="Receiving Address"
                    description="Which email do you wish to receive user photos?"
                >
                    <Card sectioned>
                        <FormLayout>

                            <TextField
                                value={email ? email : "szhao5@ualberta.ca"}
                                label="Email"
                                placeholder="example@email.com"
                                onChange={handleEmailChange}
                            />

                            <Button primary>Submit</Button>
                        </FormLayout>

                    </Card>

                </Layout.AnnotatedSection>

            </Layout>
        </Page>
    )
}


function AllowEdit({onAction}) {
    return (
        <SettingToggle
            action={{content: 'Press to turn on', onAction}}
        >
            Photo customization is <TextStyle variation="strong">disabled</TextStyle>.
        </SettingToggle>
    )
}

function DisallowEdit({onAction}) {
    return (
        <SettingToggle
            connected
            action={{content: 'Press to turn off', onAction}}
            enabled={true}
        >
            Photo customization is <TextStyle variation="strong">enabled</TextStyle>.
        </SettingToggle>
    )
}