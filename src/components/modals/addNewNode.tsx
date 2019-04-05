import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import store from '../../stores/globalStore';

export interface AddNewModalProps {
    test:string;
}

const AddNewModal = (props: AddNewModalProps) => {
    return (
        <Modal isOpen={store.isNewNodeModalOpen} centered>
            <ModalHeader>{props.test}</ModalHeader>
            <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
            <ModalFooter>
                <Button color="primary">Do Something</Button>{' '}
                <Button color="secondary" onClick={() => store.isNewNodeModalOpen = false}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default AddNewModal;