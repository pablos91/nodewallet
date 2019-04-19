import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form, FormGroup, Label, FormFeedback } from 'reactstrap';
import GlobalContext from '../../contexts/mobxglobal';
import { FullNodeConfig } from '../../models/fullNodeConfig';
import { useTranslation } from 'react-i18next';
import * as validator from 'validator'
import useValidator, { createRule } from "react-use-validator";
import { isUrl, required } from '../../helpers/validators';
import * as _ from 'lodash';
import config from '../../helpers/config';
import { Redirect } from 'react-router';
import { NodeResolver } from '../../models/nodes/noderesolver';
import BlockUi from 'react-block-ui';

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
    const [loading, setLoading] = React.useState(false);

    const [messages, validate] = useValidator({
        name: [required],
        url: [required, isUrl],
        rpcuser: [required],
        rpcpassword: [required]
    });
    const { toggleNewNodeModal } = React.useContext(GlobalContext);

    const tryAddNewNode = async () => {
        setLoading(true);
        var msg: string[] = await validate(state);
        if (_.size(msg) > 0) {
            setLoading(false);
            return;
        } else {
            //console.log(state);
            NodeResolver(state).getBalance().then(() => {
                config.saveNodeToConfig(state).then((node) => {
                    toggleNewNodeModal();
                })
                setLoading(false);
            }).catch((err) => {
                // couldn't connect to node
                alert(err);
                setLoading(false);
            });
        }

    }

    return (
        <Modal size="lg" isOpen={true} centered>
            <ModalHeader>{t("add_new_node")}</ModalHeader>
            <ModalBody>
                {/* <p>{t("add_new_node_desc")}</p> */}
                <BlockUi tag="div" blocking={loading}>
                    <Form onSubmit={tryAddNewNode}>
                        <FormGroup>
                            <Label>{t("nodename")}</Label>
                            <Input invalid={messages.name} value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} />
                            <FormFeedback>{messages.name}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label>{t("nodetype")}</Label>
                            <Input onChange={(e) => setState({ ...state, type: e.target.value })} type="select">
                                <option value="bitcoin">Bitcoin</option>
                                <option value="litecoin">Litecoin</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>{t("url")}</Label>
                            <Input invalid={messages.url} value={state.url} onChange={(e) => setState({ ...state, url: e.target.value })} />
                            <FormFeedback>{messages.url}</FormFeedback>
                        </FormGroup>
                        <div className="row">
                            <div className="col">
                                <FormGroup>
                                    <Label>{t("rpcuser")}</Label>
                                    <Input invalid={messages.rpcuser} value={state.rpcuser} onChange={(e) => setState({ ...state, rpcuser: e.target.value })} />
                                    <FormFeedback>{messages.rpcuser}</FormFeedback>
                                </FormGroup>
                            </div>
                            <div className="col">
                                <FormGroup>
                                    <Label>{t("rpcpass")}</Label>
                                    <Input type="password" invalid={messages.rpcpassword} value={state.rpcpassword} onChange={(e) => setState({ ...state, rpcpassword: e.target.value })} />
                                    <FormFeedback>{messages.rpcpassword}</FormFeedback>
                                </FormGroup>
                            </div>
                        </div>


                    </Form>
                </BlockUi>
            </ModalBody>
            <ModalFooter>
                <Button disabled={loading} onClick={tryAddNewNode} color="primary">{t("add")}</Button>{' '}
                <Button disabled={loading} onClick={toggleNewNodeModal} color="secondary">{t("cancel")}</Button>
            </ModalFooter>
        </Modal>
    );
}

export default AddNewModal;