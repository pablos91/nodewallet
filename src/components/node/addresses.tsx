import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { GlobalContext } from '../../contexts/global';
import { useTranslation } from 'react-i18next';
import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { RPCRequest } from '../../models/rpcrequest';
import { FullNodeConfig } from '../../models/fullNodeConfig';
import { RPCResponse } from '../../models/rpcresponse';
import { NodeResolver } from '../../models/nodes/noderesolver';
import { Card, CardBody, CardTitle, Nav, NavItem, NavLink as ReactNavLink, ListGroup, ListGroupItem, CardFooter, Button } from 'reactstrap';
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
                            {
                                labels.map((elem, key) => (
                                    <NavItem key={"label_"+key}>
                                        <ReactNavLink active={state.selectedLabel == elem} href="javascript:void(0);" onClick={()=> setState({...state, selectedLabel: elem })}>{elem == "" ? t("default") : elem}</ReactNavLink>
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
                        {addresses.map((elem,index) => (
                            <ListGroupItem key={"address_" + index} tag="span">{elem}</ListGroupItem>
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