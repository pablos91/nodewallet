import { } from 'react-validation';
import * as React from 'react';
import { FormGroup, Label, Input, FormFeedback, FormText, InputProps, Form } from 'reactstrap';

interface ValidatedInputProps extends InputProps {
    error: string;
    isChanged: boolean;
    isUsed: boolean;
}

export const StrapInput = ({ error, isChanged, isUsed, ...props }: ValidatedInputProps) => (
    <FormGroup>
        <Label>Input without validation</Label>
        <Input {...props} invalid={isChanged && isUsed && error && error.length > 0} />
        {/* <FormFeedback>{isChanged && isUsed && error}</FormFeedback> */}
    </FormGroup>
);

export const StrapForm = ({ getValues, validate, validateAll, showError, hideError, children, ...props }) => (
    <Form {...props}>{children}</Form>
);