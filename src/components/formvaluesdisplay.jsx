import { FormDataConsumer } from "react-admin";

export const FormValuesDisplay = () => (	
    <FormDataConsumer>
        {({ formData }) => <pre>{JSON.stringify(formData, null, 2)}</pre>}
    </FormDataConsumer>
);