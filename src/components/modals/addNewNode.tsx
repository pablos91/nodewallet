import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form } from 'reactstrap';
import { GlobalContext } from '../../contexts/global';
import { FullNode } from '../../models/FullNode';
import { useTranslation } from 'react-i18next';
import * as Validator from 'simple-react-validator';

const AddNewModal = () => {
    const defaults = {
        name: ''
    };
    const {t} = useTranslation();
    const [state, setState] = React.useState<FullNode>(defaults);
    const validator = new Validator();

    React.useEffect(() => {
        // component did mount or did update
        console.log(state.name);
    });

    const tryAddNewNode = () => {
    }
    
    const doCleanup = () => {
        setState(defaults);
    }

    return (
        <GlobalContext.Consumer>
            {({isNewNodeModalOpen, toggleNewNodeModal}) => (
                <Modal isOpen={isNewNodeModalOpen} onClosed={doCleanup} centered>
                    <ModalHeader>{t("add_new_node")}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <Input required value={state.name} onChange={(e)=>setState({name: e.target.value})}/>
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