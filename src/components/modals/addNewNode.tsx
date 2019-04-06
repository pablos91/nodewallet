import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { GlobalContext } from '../../contexts/global';
import { FullNode } from '../../models/FullNode';
import { useTranslation } from 'react-i18next';


const AddNewModal = () => {
    const {t} = useTranslation();
    const [state, setState] = React.useState<FullNode>({});

    React.useEffect(() => {
        // component did mount or did update
        console.log(state.name);

        // cleanup function
        return () => {
            console.log('cleanup');
            //setState({});
        };
    });

    const tryAddNewNode = () => {

    }
    const doCleanup = () => {
        setState({});
    }

    return (
        <GlobalContext.Consumer>
            {({isNewNodeModalOpen, toggleNewNodeModal}) => (
                <Modal isOpen={isNewNodeModalOpen} onClosed={doCleanup} centered unmountOnClose={true}>
                    <ModalHeader>{t("add_new_node")}</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary">Do Something</Button>{' '}
                        <Button onClick={toggleNewNodeModal} color="secondary">Cancel</Button>
                    </ModalFooter>
                </Modal>
            )}
        </GlobalContext.Consumer>
    );
}

export default AddNewModal;