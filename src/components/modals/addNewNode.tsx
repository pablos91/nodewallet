import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form, FormGroup, Label, FormFeedback } from 'reactstrap';
import { GlobalContext } from '../../contexts/global';
import { FullNodeConfig } from '../../models/fullNode';
import { useTranslation } from 'react-i18next';
import * as validator from 'validator'
import useValidator, { createRule } from "react-use-validator";
import { isUrl, required } from '../../helpers/validators';
import * as _ from 'lodash';
import config from '../../helpers/config';
import { Redirect } from 'react-router';

const AddNewModal = () => {
    const defaults: FullNodeConfig = {
        name: '',
        type: 'bitcoin',
        url: '',
        rpcpassword: '',
        rpcuser: ''
    };
    const { t } = useTranslation();
    const [state, setState] = React.useState<FullNodeConfig>(defaults);

    const [messages, validate] = useValidator({
        name: [required],
        url: [required, isUrl],
        rpcuser: [required],
        rpcpassword: [required]
    });
    const globalContext = React.useContext(GlobalContext);

    const tryAddNewNode = async () => {
        var msg: string[] = await validate(state);
        if (_.size(msg) > 0) {
            return;
        } else {
            console.log(state);
            config.saveNodeToConfig(state).then((node)=>{
                globalContext.toggleNewNodeModal();
            })
        }
    }

    return (
        <GlobalContext.Consumer>
            {({ toggleNewNodeModal }) => (
                <Modal isOpen={true} centered>
                    <ModalHeader>{t("add_new_node")}</ModalHeader>
                    <ModalBody>
                        <p>{t("add_new_node_desc")}</p>
                        <Form onSubmit={tryAddNewNode}>
                            <FormGroup>
                                <Label>{t("nodename")}</Label>
                                <Input invalid={messages.name} value={state.name} onChange={(e) => setState({...state, name: e.target.value })} />
                                <FormFeedback>{messages.name}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label>{t("nodetype")}</Label>
                                <Input onChange={(e) => setState({...state, type: e.target.value })} type="select">
                                    <option value="bitcoin">Bitcoin</option>
                                    <option value="litecoin">Litecoin</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>{t("url")}</Label>
                                <Input invalid={messages.url} value={state.url} onChange={(e) => setState({...state, url: e.target.value })} />
                                <FormFeedback>{messages.url}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label>{t("rpcuser")}</Label>
                                <Input invalid={messages.rpcuser} value={state.rpcuser} onChange={(e) => setState({...state, rpcuser: e.target.value })} />
                                <FormFeedback>{messages.rpcuser}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label>{t("rpcpass")}</Label>
                                <Input type="password" invalid={messages.rpcpassword} value={state.rpcpassword} onChange={(e) => setState({...state, rpcpassword: e.target.value })} />
                                <FormFeedback>{messages.rpcpassword}</FormFeedback>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={tryAddNewNode} color="primary">{t("add")}</Button>{' '}
                        <Button onClick={toggleNewNodeModal} color="secondary">{t("cancel")}</Button>
                    </ModalFooter>
                </Modal>
            )}
        </GlobalContext.Consumer>
    );
}

export default AddNewModal;