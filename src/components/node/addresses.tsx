import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlusCircle, faCopy, faQrcode } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import { FullNodeConfig } from '../../models/fullNodeConfig';
import { NodeResolver } from '../../models/nodes/noderesolver';
import { Card, Nav, NavItem, NavLink as ReactNavLink, ListGroup, ListGroupItem, CardFooter, Button, UncontrolledTooltip, CardBody, Modal, ModalBody } from 'reactstrap';
import CardHeader from 'reactstrap/lib/CardHeader';
import * as _ from 'lodash';
import Scrollbars from 'react-custom-scrollbars';
import CardTitle from 'reactstrap/lib/CardTitle';
import NodeContext from '../../contexts/nodecontext';
import BlockUi from 'react-block-ui';
import * as QRCode from 'qrcode'
import { useObservable } from 'mobx-react-lite';

const { clipboard } = require('electron')

interface NodeAddressesProps {
    node: FullNodeConfig;
}

const NodeAddresses = ({ node }: NodeAddressesProps) => {
    const { t, i18n } = useTranslation();
    const { isReachable } = React.useContext(NodeContext);
    const [addresses, setAddresses] = React.useState<string[]>([]);
    const [labels, setLabels] = React.useState<string[]>([]);
    const [state, setState] = React.useState({
        selectedLabel: "",
        copiedAddress: "",
        newestAddress: "",
        loading: true
    })
    const [isQrCodeOpen, showQrCode] = React.useState(false);
    const [qrCodeAddress, setQrCodeAddress] = React.useState("");

    const toggleQrCode = (address?) => {
        if (address) {
            QRCode.toDataURL(address, {
                errorCorrectionLevel: 'H',
                type: 'image/jpeg',
                rendererOpts: {
                  quality: 1
                },
                scale: 10
              })
                .then(url => {
                    setQrCodeAddress(url)
                })
        }
        showQrCode(!isQrCodeOpen);
    }

    const resolvedNode = NodeResolver(node);

    const getAddresses = (label: string = "") => {
        setState({ ...state, loading: true });
        resolvedNode.getAddresses(label).then(resp => {
            setAddresses(resp);
        }).finally(() => {
            setState({ ...state, loading: false });
        })
    }

    const getNewAddress = () => {
        resolvedNode.getNewAddress(state.selectedLabel).then(resp => {
            setState({ ...state, newestAddress: resp });
            let addr = [...addresses, resp];
            setAddresses(_.sortBy(addr, [function (o) { return o; }]));
        }).catch((reason) => alert(reason));
    }

    React.useEffect(() => {
        getAddresses();

        if (node.type == "bitcoin" || node.type == "litecoin") {
            resolvedNode.getLabels().then(resp => {
                setLabels(resp);
            }).catch((reason) => void (0));
        }
    }, [node]); // load new data on node props change

    React.useEffect(() => {
        getAddresses(state.selectedLabel);
    }, [state.selectedLabel])

    return isReachable ? (
        <BlockUi tag="div" blocking={state.loading}>
            <Card>
                {(node.type == "bitcoin" || node.type == "litecoin") ?
                    <CardHeader>
                        <Nav tabs card={true}>
                            <NavItem className="d-flex align-items-center pr-3 pl-2">
                                <strong>{t("addresses")}:</strong>
                            </NavItem>
                            {
                                labels.map((elem, key) => (
                                    <NavItem key={"label_" + key}>
                                        <ReactNavLink active={state.selectedLabel == elem} href="javascript:void(0);" onClick={() => setState({ ...state, selectedLabel: elem })}>{elem == "" ? t("default") : elem}</ReactNavLink>
                                    </NavItem>
                                ))
                            }
                            {
                                state.loading && <NavItem><ReactNavLink href="#">&nbsp;</ReactNavLink></NavItem>
                            }
                            {/* it's impossible to add new label without adding new address.
                             <NavItem>
                                <ReactNavLink href="#"><FontAwesomeIcon icon={faPlusCircle} /> {t("add_new_label")}</ReactNavLink>
                            </NavItem> */}
                        </Nav>
                    </CardHeader>
                    :
                    <CardHeader>
                        <CardTitle>{t("addresses")}</CardTitle>
                    </CardHeader>
                }

                {addresses.length > 0 ?
                    <Scrollbars style={{ 'height': '15rem' }}>
                        <ListGroup flush>
                            {addresses.map((elem, index) => {
                                return (
                                    <ListGroupItem color={elem == state.newestAddress ? "warning" : ""} className="d-flex align-items-center" key={"address_" + index} tag="div">
                                        {elem}
                                        <div className="ml-auto">
                                            <a href="javascript:void(0)" onClick={e => toggleQrCode(elem)}><FontAwesomeIcon icon={faQrcode} /></a>
                                        </div>
                                        <div className="ml-2">
                                            <a href="javascript:void(0)" onClick={() => { clipboard.writeText(elem); setState({ ...state, copiedAddress: elem }) }} id={"clipboard_" + index}><FontAwesomeIcon icon={faCopy} /></a>

                                            <UncontrolledTooltip placement="bottom" target={"clipboard_" + index}>
                                                {state.copiedAddress == elem ? t("copied") : t("copy_to_clipboard")}
                                            </UncontrolledTooltip>
                                        </div>
                                    </ListGroupItem>
                                )
                            })}
                        </ListGroup>

                    </Scrollbars>
                    : <CardBody style={{ 'height': '15rem' }} className="d-flex align-items-center text-center"><p className="flex-fill">{t("no_data")}</p></CardBody>}

                <CardFooter className="d-flex">
                    <Button onClick={getNewAddress} className="ml-auto"><FontAwesomeIcon icon={faPlusCircle} /> {t("add_new_address")}</Button>
                </CardFooter>
            </Card>
            <Modal size="sm" isOpen={isQrCodeOpen} centered toggle={() => toggleQrCode()}>
                <ModalBody>
                    <img src={qrCodeAddress} style={{width: "100%"}}/>
                </ModalBody>
            </Modal>
        </BlockUi>
    ) : (<div></div>);
}

export default NodeAddresses;