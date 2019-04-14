import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlusCircle, faCopy, faQrcode, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { GlobalContext } from '../../contexts/global';
import { useTranslation } from 'react-i18next';
import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { RPCRequest } from '../../models/rpcrequest';
import { FullNodeConfig } from '../../models/fullNodeConfig';
import { RPCResponse } from '../../models/rpcresponse';
import { NodeResolver } from '../../models/nodes/noderesolver';
import { Card, CardBody, CardTitle, Nav, NavItem, NavLink as ReactNavLink, ListGroup, ListGroupItem, CardFooter, Button, UncontrolledTooltip } from 'reactstrap';
import CardHeader from 'reactstrap/lib/CardHeader';

interface NodeAddressesProps {
    node: FullNodeConfig;
}

const NodeAddresses = ({ node }: NodeAddressesProps) => {
    const { t, i18n } = useTranslation();
    const global = React.useContext(GlobalContext);
    const [addresses, setAddresses] = React.useState<string[]>([]);
    const [labels, setLabels] = React.useState<string[]>([]);
    const [state, setState] = React.useState({
        selectedLabel: ""
    })

    const getAddresses = (label: string = "") => {
        NodeResolver(node).getAddresses(label).then(resp => {
            setAddresses(resp);
        }).catch((reason) => alert(reason));
    }

    React.useEffect(() => {
        getAddresses();

        if (node.type == "bitcoin") {
            NodeResolver(node).getLabels().then(resp => {
                setLabels(resp);
            }).catch((reason) => alert(reason));
        }
    }, [node]); // load new data on node props change

    React.useEffect(() => {
        getAddresses(state.selectedLabel);
    }, [state.selectedLabel])

    return (
        <div>
            <Card>
                {node.type == "bitcoin" &&
                    <CardHeader>
                        <Nav tabs card={true}>
                            <NavItem className="d-flex align-items-center pr-3 pl-2">
                                {t("addresses")}:
                            </NavItem>
                            {
                                labels.map((elem, key) => (
                                    <NavItem key={"label_" + key}>
                                        <ReactNavLink active={state.selectedLabel == elem} href="javascript:void(0);" onClick={() => setState({ ...state, selectedLabel: elem })}>{elem == "" ? t("default") : elem}</ReactNavLink>
                                    </NavItem>
                                ))
                            }
                            <NavItem>
                                <ReactNavLink href="#"><FontAwesomeIcon icon={faPlusCircle} /> {t("add_new_label")}</ReactNavLink>
                            </NavItem>
                        </Nav>
                    </CardHeader>
                }

                {addresses.length > 0 ?
                    <ListGroup flush>
                        {addresses.map((elem, index) => (
                            <ListGroupItem className="d-flex align-items-center" key={"address_" + index} tag="div">
                                {elem}
                                <div className="ml-auto">
                                    <a href="#" id={"clipboard_" + index}><FontAwesomeIcon icon={faCopy} /></a>
                                    <a className="ml-2" href="#" id={"details_" + index}><FontAwesomeIcon icon={faInfoCircle} /></a>
                                    <UncontrolledTooltip placement="bottom" target={"details_" + index}>
                                        {t("show_address_details")}
                                    </UncontrolledTooltip>
                                    <UncontrolledTooltip placement="bottom" target={"clipboard_" + index}>
                                        {t("copy_to_clipboard")}
                                    </UncontrolledTooltip>
                                </div>

                            </ListGroupItem>
                        ))}
                    </ListGroup> : <p>No results</p>
                }

                <CardFooter className="d-flex">
                    <Button className="ml-auto"><FontAwesomeIcon icon={faPlusCircle} /> {t("add_new_address")}</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default NodeAddresses;