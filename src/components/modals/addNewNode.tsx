import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { GlobalContext } from '../../contexts/global';
import { FullNode } from '../../models/FullNode';
import { useTranslation } from 'react-i18next';
import { StrapInput } from '../inputs/input';
import { form, control, button } from 'react-validation';
import { email as emailValidation, required, email } from '../../helpers/validations';
import Form from 'react-validation/build/form';

const AddNewModal = () => {
    const {t} = useTranslation();
    const [state, setState] = React.useState<FullNode>({});
    const MyValidationInput = control(StrapInput);
    //const MyValidationForm = form(Form);

    React.useEffect(() => {
        // component did mount or did update
        console.log(state.name);
    });

    const tryAddNewNode = () => {

    }
    const doCleanup = () => {
        setState({});
    }

    return (
        <GlobalContext.Consumer>
            {({isNewNodeModalOpen, toggleNewNodeModal}) => (
                <Modal isOpen={isNewNodeModalOpen} onClosed={doCleanup} centered>
                    <ModalHeader>{t("add_new_node")}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <MyValidationInput value={state.name} validations={[required, emailValidation]} onChange={(e)=> setState({name: e.target.value})}/>
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