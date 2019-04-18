import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form, FormGroup, Label, FormFeedback, Alert, InputGroup, InputGroupText, InputGroupAddon } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { NodeContext } from '../../pages/node';
import { SendToAddressForm } from '../../models/sendToAddressForm';
import { required, overZero } from '../../helpers/validators';
import useValidator, { createRule } from "react-use-validator";
import _ = require('lodash');
import { NodeResolver } from '../../models/nodes/noderesolver';
import { FullNodeConfig } from '../../models/fullNodeConfig';

interface SendToAddressModalProps {
    node: FullNodeConfig;
}

const SendToAddressModal = ({ node }: SendToAddressModalProps) => {
    const dispatch = React.useContext(NodeContext);
    const [form, setForm] = React.useState({
        address: '',
        amount: '0',
        comment: '',
        loading: false,
        walletPass: ''
    })
    const { t } = useTranslation();
    const [messages, validate] = useValidator({
        address: [required],
        amount: [overZero],
        walletPass: [required]
    });

    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState("");
    const resolvedNode = NodeResolver(node);

    const trySendToAddress = async () => {
        setError('');
        setSuccess('');

        var msg: string[] = await validate(form);
        if (_.size(msg) > 0) {
            return;
        } else {
            NodeResolver(node).unlockWallet(form.walletPass).then((resp) => {
                NodeResolver(node).sendToAddress(form).then((resp) => {
                    setSuccess(t("amount_sent_to_address") + " " + form.address);
                }).catch(error => {
                    setError(error);
                })
            }).catch(error => {
                setError(t("wrong_wallet_pass"));
            })
        }
    }

    return (
        <Modal isOpen={true} centered>
            <ModalHeader>{t("send_to_address")}</ModalHeader>
            <ModalBody>
                {error &&
                    <Alert color="danger">
                        {error}
                    </Alert>
                }
                {success &&
                    <Alert color="success">
                        {success}
                    </Alert>
                }
                {/* <p>{t("send_to_address_desc")}</p> */}
                <Form onSubmit={trySendToAddress}>
                    <FormGroup>
                        <Label>{t("address")}</Label>
                        <Input invalid={messages.address} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                        <FormFeedback>{messages.address}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label>{t("amount")}</Label>
                        <InputGroup>
                            <Input type="number" min="0" step="0.001" invalid={messages.amount} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>{resolvedNode.symbol}</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        <FormFeedback>{messages.amount}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label>{t("comment")}</Label>
                        <Input invalid={messages.comment} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
                        <FormFeedback>{messages.comment}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label>{t("wallet_password")}</Label>
                        <Input type="password" invalid={messages.walletPass} value={form.walletPass} onChange={(e) => setForm({ ...form, walletPass: e.target.value })} />
                        <FormFeedback>{messages.walletPass}</FormFeedback>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button disabled={form.loading} onClick={trySendToAddress} color="primary">{t("send")}</Button>{' '}
                <Button onClick={() => dispatch({type: 'CLOSE_SEND_MODAL'})} color="secondary">{t("cancel")}</Button>
            </ModalFooter>
        </Modal>
    )

}

export default SendToAddressModal;