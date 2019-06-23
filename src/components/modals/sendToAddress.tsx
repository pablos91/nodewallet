import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form, FormGroup, Label, FormFeedback, Alert, InputGroup, InputGroupText, InputGroupAddon } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { SendToAddressForm } from '../../models/sendToAddressForm';
import { required, overZero } from '../../helpers/validators';
import useValidator, { createRule } from "react-use-validator";
import _ = require('lodash');
import { NodeResolver } from '../../models/nodes/noderesolver';
import { FullNodeConfig } from '../../models/fullNodeConfig';
import NodeContext from '../../contexts/nodecontext';
import { useObservable, observer } from 'mobx-react-lite';

interface SendToAddressModalProps {
    node: FullNodeConfig;
    isOpen: boolean;
}

const SendToAddressModal = observer(({ node, isOpen }: SendToAddressModalProps) => {
  const {toggleSendModal, balance} = React.useContext(NodeContext);

  const defaults = {
        address: '',
        amount: '0',
        comment: '',
        loading: false,
        walletPass: ''
    }

    const form = useObservable(defaults)

    const { t } = useTranslation();

    const [messages, validate] = useValidator({
        address: [required],
        amount: [overZero],
        walletPass: [required]
    });

    const [error, setError] = React.useState("");
    const resolvedNode = NodeResolver(node);

    const trySendToAddress = async () => {
        setError('');

        var msg: string[] = await validate(form);
        if (_.size(msg) > 0) {
            return;
        } else {
            NodeResolver(node).unlockWallet(form.walletPass).then((resp) => {
                NodeResolver(node).sendToAddress(form).then((resp) => {
                    toggleSendModal();
                }).catch(error => {
                    setError(error);
                })
            }).catch(error => {
                setError(t("wrong_wallet_pass"));
            })
        }
    }

    const getMaxValue = () => {
        form.amount = balance.toString();
    }

    React.useEffect(()=>{
        validate.reset();
        Object.assign(form, defaults);
    },[isOpen])

    return (
        <Modal isOpen={isOpen} centered>
            <ModalHeader>{t("send_to_address")}</ModalHeader>
            <ModalBody>
                {error &&
                    <Alert color="danger">
                        {error}
                    </Alert>
                }
                <Form onSubmit={trySendToAddress}>
                    <FormGroup>
                        <Label>{t("address")}</Label>
                        <Input invalid={messages.address} value={form.address} onChange={(e) => form.address = e.target.value } />
                        <FormFeedback>{messages.address}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label>{t("amount")}</Label>
                        <InputGroup>
                            <Input type="number" min="0" step="0.001" invalid={messages.amount} value={form.amount} onChange={(e) => form.amount = e.target.value } />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>{resolvedNode.symbol}</InputGroupText>
                            </InputGroupAddon>
                            <InputGroupAddon addonType="append">
                                <Button onClick={getMaxValue} color="secondary">MAX</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <FormFeedback>{messages.amount}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label>{t("comment")}</Label>
                        <Input invalid={messages.comment} value={form.comment} onChange={(e) => form.comment = e.target.value } />
                        <FormFeedback>{messages.comment}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label>{t("wallet_password")}</Label>
                        <Input type="password" invalid={messages.walletPass} value={form.walletPass} onChange={(e) => form.walletPass = e.target.value } />
                        <FormFeedback>{messages.walletPass}</FormFeedback>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button disabled={form.loading} onClick={trySendToAddress} color="primary">{t("send")}</Button>{' '}
                <Button onClick={() => toggleSendModal()} color="secondary">{t("cancel")}</Button>
            </ModalFooter>
        </Modal>
    )

})

export default SendToAddressModal;