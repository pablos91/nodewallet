import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form, FormGroup, Label, FormFeedback } from 'reactstrap';
import { GlobalContext } from '../../contexts/global';
import { FullNode } from '../../models/FullNode';
import { useTranslation } from 'react-i18next';
import * as validator from 'validator'
import useValidator, { createRule } from "react-use-validator";
import { isUrl, required } from '../../helpers/validators';

const AddNewModal = () => {
    const defaults = {
        name: ''
    };
    const { t } = useTranslation();
    const [state, setState] = React.useState<FullNode>(defaults);
    const [messages, validate] = useValidator({
        name: [required]
    });

    React.useEffect(() => {
        // component did mount or did update
        //console.log(state.name);
    });

    const tryAddNewNode = () => {
        validate(state);
    }

    const doCleanup = () => {
        setState(defaults);
    }

    return (
        <GlobalContext.Consumer>
            {({ isNewNodeModalOpen, toggleNewNodeModal }) => (
                <Modal isOpen={isNewNodeModalOpen} onClosed={doCleanup} centered>
                    <ModalHeader>{t("add_new_node")}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>{t("nodename")}</Label>
                                <Input invalid={messages.name} value={state.name} onChange={(e) => setState({ name: e.target.value })} />
                                <FormFeedback>{messages.name}</FormFeedback>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={tryAddNewNode} color="primary">Do Something</Button>{' '}
                        <Button onClick={toggleNewNodeModal} color="secondary">Cancel</Button>
                    </ModalFooter>
                </Modal>
            )}
        </GlobalContext.Consumer>
    );
}

export default AddNewModal;