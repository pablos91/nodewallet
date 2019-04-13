import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form, FormGroup, Label, FormFeedback } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { NodeContext } from '../../pages/node';

const SendToAddressModal = (props) => {
    const {toggleSendToAddressModal} = React.useContext(NodeContext);
    const { t } = useTranslation();

    return (
        <Modal isOpen={true} centered>
            <ModalHeader>{t("send_to_address")}</ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
                <Button color="primary">{t("send")}</Button>{' '}
                <Button onClick={toggleSendToAddressModal} color="secondary">{t("cancel")}</Button>
            </ModalFooter>
        </Modal>
    )

}

export default SendToAddressModal;