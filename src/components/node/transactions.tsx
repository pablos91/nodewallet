import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlusCircle, faCopy } from '@fortawesome/free-solid-svg-icons'
import { GlobalContext } from '../../contexts/global';
import { useTranslation } from 'react-i18next';
import { FullNodeConfig } from '../../models/fullNodeConfig';
import { NodeResolver } from '../../models/nodes/noderesolver';
import { Card, Nav, NavItem, NavLink as ReactNavLink, ListGroup, ListGroupItem, CardFooter, Button, UncontrolledTooltip } from 'reactstrap';
import CardHeader from 'reactstrap/lib/CardHeader';
import * as _ from 'lodash';
import Scrollbars from 'react-custom-scrollbars';

const { clipboard } = require('electron')

interface NodeTransactionsProps {
    node: FullNodeConfig;
}

const NodeTransactions = ({ node }: NodeTransactionsProps) => {
    const { t, i18n } = useTranslation();
    const global = React.useContext(GlobalContext);
    const [transactions, setTransactions] = React.useState<string[]>([]);
    const [state, setState] = React.useState({

    })
    const resolvedNode = NodeResolver(node);

    React.useEffect(() => {

    }, [node]); // load new data on node props change

    return (
        <div>
            <Card>
                <Scrollbars style={{'height': '15rem'}}>
                    {transactions.length > 0 ?
                        <ListGroup flush>
                            {transactions.map((elem, index) => {
                                return (
                                    <ListGroupItem className="d-flex align-items-center" key={"address_" + index} tag="div">
                                        {elem}
                                    </ListGroupItem>
                                )
                            })}
                        </ListGroup> : <p className="d-flex text-center align-items-stretch">No results</p>
                    }
                </Scrollbars>
            </Card>
        </div>
    );
}

export default NodeTransactions;